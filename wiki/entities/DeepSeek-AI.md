---
title: DeepSeek-AI
type: entity
tags: [organization, ai-research, china, open-weights]
sources: [2026-05-09-deepseek-r1]
created: 2026-05-09
updated: 2026-05-09
---

# DeepSeek-AI

## Identity

Chinese AI research organization based in Hangzhou, focused on open-weights frontier models. Best known in 2025 for **DeepSeek-V3** (efficient mixture-of-experts base model) and **DeepSeek-R1** (the first peer-reviewed reasoning model published in *Nature*).

## Significance

DeepSeek's 2025 trajectory reshaped two industry assumptions:

1. **Frontier reasoning is reproducible from open base models** — DeepSeek-R1 matched OpenAI-o1-1217 on AIME, MATH-500, and Codeforces using a publicly described recipe ([[GRPO]] + rule-based rewards on DeepSeek-V3-Base).
2. **Reasoning capability distills into small dense models** — six R1 distillations (Qwen-1.5B/7B/14B/32B, Llama-8B/70B) substantially outperform their non-reasoning peers and in some cases beat o1-mini.

Together with the open release of weights, training recipes, and distilled variants, DeepSeek's 2025 work effectively democratized the reasoning-model paradigm.

## Key contributions

- **DeepSeek-V3** — open MoE base model with strong general capability
- **DeepSeek-R1-Zero** — pure-RL reasoning model (no SFT cold-start), demonstrates emergent reasoning
- **DeepSeek-R1** — four-stage refinement of R1-Zero matching o1-1217
- **R1 distilled family** — six dense models with strong reasoning at small parameter counts
- **GRPO algorithm** — popularized as the practical RL backbone for verifiable-reward training

## Open-source posture

DeepSeek has consistently released model weights under permissive licenses (MIT for R1 weights), training recipes in detail, and distilled variants. This is the most aggressive open-release stance among frontier-tier model labs.

## Related Pages

- [[DeepSeek-R1]] — flagship 2025 model
- [[GRPO]] — algorithm popularized
- [[RLVR]] — paradigm operationalized
- [[Reasoning Models]] — class of model

## Sources

- [[2026-05-09-deepseek-r1]] — DeepSeek-R1, Nature 645:633-638 (2025)
