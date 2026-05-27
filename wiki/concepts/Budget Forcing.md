---
title: Budget Forcing
type: concept
tags: [test-time-compute, inference, decoding, reasoning-models]
sources: [2026-05-09-s1-test-time-scaling]
created: 2026-05-09
updated: 2026-05-09
---

# Budget Forcing

## Definition

**Budget forcing** is a generation-time control mechanism for [[Reasoning Models]] that lets a system explicitly set the model's thinking-token budget — either capping it (force end) or extending it (force continue). Introduced in s1 (Muennighoff et al., EMNLP 2025), budget forcing is the simplest known mechanism for [[Test-Time Compute Scaling]]: no new objective, no RL, no auxiliary head — just a string-controller around standard autoregressive generation.

## The two operations

Reasoning models emit a structured trace of the form:
```
<think>
... extended reasoning ...
</think>
Final answer: ...
```

Budget forcing applies two interventions to this stream:

### Force end
Once the cumulative thinking-token count reaches the budget, append `</think>` to the generation context and prompt the model for the answer. This **caps** thinking length, useful for latency-bounded applications.

### Force continue
When the model emits `</think>` *earlier* than the budget allows, suppress that token and append the literal token `Wait` to the context. The model treats this as a continuation of its own reasoning — typically returning to re-examine its work.

That's the entire technique. Implementation is a few dozen lines of decoding logic.

## Why "Wait" works

The model has been fine-tuned (in s1's case, on s1K reasoning traces) to interpret `Wait` as a re-examination cue. Empirically:

- The model frequently catches errors during the forced extension
- Final answers improve even when the model originally felt "done"
- The intervention works in the same direction across hard and medium-hard problems

The s1 paper reports that AIME24 accuracy rises from 50% (model decides when to stop) to 57% (forced to keep thinking up to the budget). The trick is sample-efficient: the SFT data only needs enough exposure to teach the model to use thinking time productively; budget forcing then *makes* the model use it.

## Why it matters

### Decouples training from inference

Reasoning-model training teaches the model *how* to think. Budget forcing controls *how long* it thinks. These are separate axes — the same trained model can be cheap (small budget) or accurate (large budget) at the operator's choice.

### Reproduces o1-style scaling without proprietary methodology

OpenAI's o-series demonstrated test-time scaling but did not disclose the inference-side mechanism. Budget forcing is a public, working, trivially-implementable mechanism that produces the same qualitative behavior — accuracy increases monotonically with thinking-token budget.

### Composable with reasoning-trained models

s1 applies budget forcing to a model trained via SFT on 1,000 examples. The same trick works on RLVR-trained models like [[DeepSeek-R1]] and its distilled variants — there is no architectural lock-in.

## Practical implementation

```python
# pseudocode
def generate_with_budget_forcing(model, prompt, thinking_budget):
    output = []
    in_thinking = True
    thinking_tokens = 0

    while True:
        token = model.next_token(prompt + output)

        if in_thinking and thinking_tokens >= thinking_budget:
            # Force end
            output.append("</think>")
            in_thinking = False
            continue

        if in_thinking and token == "</think>":
            # Force continue
            output.append("Wait")
            thinking_tokens += 1
            continue

        output.append(token)
        if in_thinking:
            thinking_tokens += 1
        if token == END_OF_SEQUENCE:
            break

    return output
```

## Variants

- **Multiple wait tokens** — `Hmm`, `Actually`, `Hold on` produce qualitatively different re-examinations
- **Adaptive budgets** — set budget based on problem-difficulty estimate from a small classifier
- **Stochastic forcing** — probabilistically append `Wait` rather than deterministically

These variants are largely uncatalogued in the literature; the canonical s1 implementation uses literal `Wait` and a fixed budget.

## Limitations

- **Linguistic specificity** — `Wait` works because it's in the model's training distribution. Non-English models or domain-specialized models may need different cues
- **Diminishing returns** — extending thinking past 2–4× the natural length yields little accuracy gain; budget forcing isn't free compute
- **Failure-mode amplification** — if the model is on a wrong reasoning path, forcing it to continue may just elaborate the error (the model talks itself into believing the wrong answer)

## Related Concepts

- [[Test-Time Compute Scaling]] — the broader phenomenon budget forcing exploits
- [[Reasoning Models]] — required substrate
- [[Chain-of-Thought]] — extended-thinking pattern that budget forcing controls
- [[Self-Consistency]] — parallel alternative (sample many, vote)
- [[Reflexion]] — iterative alternative (critique and retry)
- [[DeepSeek-R1]] — alternate reasoning model that responds well to budget forcing

## Sources

- [[2026-05-09-s1-test-time-scaling]] — Muennighoff et al., EMNLP 2025; original budget-forcing technique

## Open Questions

- Optimal thinking-budget for a given problem difficulty (open: difficulty estimation upstream)
- Generalization across model families and languages
- Whether forced extension can amplify reasoning errors and how to detect that
- Combination with parallel strategies (e.g., budget forcing per branch in self-consistency)
