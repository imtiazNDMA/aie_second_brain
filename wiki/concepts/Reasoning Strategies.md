---
tags: [prompting, reasoning, evaluation]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# Reasoning Strategies

## Definition

Prompting techniques that encourage LLMs to articulate intermediate steps, explore alternatives, and verify results before finalizing an answer.

## Techniques

- **Chain of Thought (CoT)** — Provide exemplars showing step-by-step reasoning to improve math or logic accuracy.
- **Zero-shot CoT** — Add cues like “let’s think step by step” without examples.
- **Prompt Chaining** — Break a task into sequential prompts, feeding outputs forward (e.g., plan → execute → critique).
- **Self-Consistency** — Run multiple reasoning samples and vote on the best answer.
- **Tree of Thought** — Generate multiple branches of reasoning, evaluate each (often via Semantic Kernel evaluators), and expand the most promising branch.

## Prompted vs. Trained Reasoning

The strategies above are *prompted* — they elicit reasoning from a model that wasn't specifically trained to produce it. The 2024–2025 [[Reasoning Models]] paradigm goes further: train the model to *natively* emit extended reasoning via [[RLVR]] / [[GRPO]] on verifiable rewards (see [[DeepSeek-R1]]) or via SFT distillation of reasoning traces (see s1). This shifts compute from prompt-time crafting to [[Test-Time Compute Scaling]] — controlled by mechanisms like [[Budget Forcing]].

## Related Concepts

- [[Reasoning Models]] — trained-to-reason counterpart to these prompting techniques
- [[Test-Time Compute Scaling]] — empirical regularity that more inference compute ⇒ better reasoning
- [[Prompt Flow]] — Automates experiments comparing strategies.
- [[Agentic Behavior Trees]] — Provide a structural analog for tree-of-thought planning.
