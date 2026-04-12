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

## Related Concepts

- [[Prompt Flow]] — Automates experiments comparing strategies.
- [[Agentic Behavior Trees]] — Provide a structural analog for tree-of-thought planning.
