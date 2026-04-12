---
title: RLHF
type: concept
tags: [alignment, training, llm]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-prompt-engineering-llms, 2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-12
updated: 2026-04-12
---

# RLHF

Reinforcement Learning from Human Feedback — alignment technique to make models follow instructions and have better helpfulness/safety.

## Process

1. **Collect preference data:** humans rank model outputs (or synthetic constitutions provide feedback).
2. **Train reward model:** predict human/constitutional preferences.
3. **Optimize policy:** run RL (typically PPO) to maximize reward scores.

## Considerations

- **Alignment tax:** *[[Prompt Engineering]] for LLMs* highlights how RLHF-imposed safety policies can reduce responsiveness or add latency; teams must monitor UX impact.
- **Safety evaluators:** *Ultimate Guide to [[Fine-Tuning]]* recommends guard models (Llama Guard, Shield Gemma, WILDGUARD) plus human audits during/after RLHF.
- **Variants:** DPO/ORPO provide lighter-weight alternatives without explicit reward models.

## Variants

- **DPO ([[Direct Preference Optimization]]):** Simpler — directly optimizes on preference pairs without reward model
- **Constitutional AI:** Uses AI feedback instead of human feedback

## Related Concepts

- [[Pretraining]]
- [[Fine-Tuning]]
- [[Direct Preference Optimization]]
