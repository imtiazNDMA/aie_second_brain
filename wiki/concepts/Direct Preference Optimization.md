---
tags: [alignment, fine-tuning, preference]
sources: [2026-04-12-llm-engineers-handbook, 2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-12
updated: 2026-04-12
---

# Direct Preference Optimization

## Definition

Alignment technique that learns directly from ranked preference pairs, bypassing explicit reward models. Optimizes model logits so preferred completions score higher than rejected ones.

## Usage

- Applied to TwinLlama in *LLM Engineer’s Handbook* for persona alignment.
- Highlighted in *Ultimate Guide to [[Fine-Tuning]]* alongside PPO/ORPO as a lightweight RLHF alternative.

## Related Concepts

- [[Fine-Tuning]]
- [[Mixture of Agents]]
