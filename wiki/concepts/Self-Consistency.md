---
title: Self-Consistency
type: concept
tags: [prompting, reasoning, sampling]
sources: [2026-04-12-ai-agents-in-action, 2026-04-12-prompt-engineering-llms]
created: 2026-04-30
updated: 2026-04-30
---

# Self-Consistency

## Definition

**Self-Consistency** is a decoding strategy for [[Chain-of-Thought]] introduced by Wang et al. 2022. Instead of generating one greedy reasoning chain, sample $K$ chains with non-zero temperature, then pick the answer that the **majority** of chains agree on. The intuition: there are many valid reasoning paths to a correct answer but each *wrong* answer tends to be wrong in its own way — so correct answers cluster, wrong answers scatter.

## Algorithm

```python
def self_consistency(prompt, model, K=40, temperature=0.7):
    samples = [model.generate(prompt + COT_TRIGGER,
                              temperature=temperature) for _ in range(K)]
    answers = [extract_final_answer(s) for s in samples]
    return collections.Counter(answers).most_common(1)[0][0]
```

The trigger is the same as zero-shot CoT (`Let's think step by step.`) or a few-shot CoT block.

## Why it works — Marginalization

Recall the marginal in [[Chain-of-Thought]]:

$$p_\theta(y \mid x) = \sum_{z} p_\theta(y \mid x, z) \, p_\theta(z \mid x)$$

Greedy CoT picks one $z$. Self-consistency is a Monte-Carlo estimate of this marginal:

$$\hat{p}(y \mid x) = \frac{1}{K} \sum_{k=1}^{K} \mathbb{1}[y_k = y]$$

Picking $\arg\max_y \hat{p}(y \mid x)$ approximates $\arg\max_y p_\theta(y \mid x)$ — the *posterior mode over answers* rather than the *mode of one chain*. When the model is well-calibrated on its reasoning, the posterior is sharper than any single chain.

## Empirical gains

| Task | Greedy CoT | Self-Consistency $K{=}40$ | Δ |
|---|---|---|---|
| GSM8K (PaLM 540B) | 56.5% | 74.4% | +17.9 |
| MultiArith | 92.6% | 99.3% | +6.7 |
| ARC-Challenge | 85.2% | 88.7% | +3.5 |
| StrategyQA | 75.3% | 81.6% | +6.3 |

Gains grow with problem difficulty and saturate around $K=20$–40.

## Variants

### 1. Weighted self-consistency
Weight each chain by its log-probability (sum of token logprobs of the answer span). Penalizes very low-probability chains that voted by chance.

### 2. Universal self-consistency (USC)
For tasks without a discrete answer, ask a *judge* model to pick the most consistent free-form response among the $K$ samples. Extends self-consistency to open-ended generation.

### 3. Iterative self-consistency
Treat the majority answer as a hint; re-prompt the model with that hint and sample again. Compounds gains on hard problems but can cement errors.

### 4. Adaptive sampling
Stop sampling once one answer has clear majority (e.g., 60% of $K_{\min}$). Saves compute on easy questions.

## When self-consistency helps

- **Discrete-answer tasks** — math, multiple choice, classification, code with a unique output.
- **Tasks where wrong answers are diverse** — the disagreement penalty kicks in.
- **High-stakes / low-throughput** queries where extra latency is acceptable.

## When it doesn't

- **Open-ended generation** — no obvious quantization step (use USC instead).
- **Tasks where the model is *confidently wrong*** — every sample agrees on the same wrong answer.
- **Tight latency budgets** — $K{=}40$ inflates cost 40×.

## Practical knobs

| Knob | Typical | Notes |
|---|---|---|
| $K$ (samples) | 5–40 | Diminishing returns past 20 |
| Temperature | 0.5–0.7 | Too low → samples collapse; too high → reasoning degrades |
| Top-$p$ | 0.9–1.0 | Truncates tail without forcing exploration |
| Stop sequence | `Q:` or task-specific | Prevents run-on |
| Answer extractor | Regex / structured tag | Critical: malformed extraction = silent failure |

## Failure mode: confidently wrong

If the model's *systematic* bias matches the wrong answer (e.g., a known math illusion), all $K$ samples agree on the wrong thing. Self-consistency cannot fix this — only [[Reflexion]] (or external verification) can.

## Compute trade-off

Self-consistency typically needs 10–40× the compute of greedy CoT for ~10–20 absolute-percentage gains on reasoning. For production RAG pipelines, use $K=3$–5 with temperature 0.5 as a cheap floor.

## Test-time compute framing

Self-consistency is the canonical **parallel** form of [[Test-Time Compute Scaling]] — spending K× more inference compute by sampling K reasoning chains in parallel. Compare to [[Budget Forcing]] (sequential extension of one chain) and [[Tree-of-Thought]] (search-based) — the three families of test-time compute spending. For [[Reasoning Models]] (DeepSeek-R1, s1), self-consistency composes with the model's native long-form thinking for additional gains.

## Connections

- [[Chain-of-Thought]] — the substrate
- [[Tree-of-Thought]] — replaces flat sampling with structured search
- [[Test-Time Compute Scaling]] — Self-Consistency is the parallel-sampling family member
- [[Reasoning Models]] — composes with native long-form reasoning
- [[Budget Forcing]] — sequential alternative for spending test-time compute
- [[ReAct]] — self-consistency layered over agent trajectories
- [[Reflexion]] — adds memory-guided retries on top
- [[Reasoning Strategies]] — taxonomy
- [[Beam Search]] — token-level analog
- [[Inference Optimization]] — compute considerations
