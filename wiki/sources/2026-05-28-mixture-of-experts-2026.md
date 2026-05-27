---
title: "Mixture of Experts — DeepSeek-V3 and the 2026 Open MoE Landscape (multi-source compilation)"
type: source
authors: [DeepSeek-AI, Sebastian Raschka, PyImageSearch editorial, Fireworks AI editorial, localaimaster editorial]
tags: [moe, mixture-of-experts, sparse-models, deepseek, llm-architecture]
sources: [Mixture of Experts DeepSeek-V3 Architecture.md]
venue: PyImageSearch · Fireworks AI · Sebastian Raschka LLMs-from-scratch ch.04 · web compilation
created: 2026-05-28
updated: 2026-05-28
---

# Mixture of Experts — DeepSeek-V3 and the 2026 Open MoE Landscape

**Source artifact:** `raw/inbox/Mixture of Experts DeepSeek-V3 Architecture.md`
**Date ingested:** 2026-05-28
**Type:** Multi-source web research compilation
**Primary sources:**
- *DeepSeek-V3 from Scratch: Mixture of Experts* — [PyImageSearch](https://pyimagesearch.com/2026/03/23/deepseek-v3-from-scratch-mixture-of-experts-moe/)
- *DeepSeek v3 and R1 Model Architecture* — [Fireworks AI](https://fireworks.ai/blog/deepseek-model-architecture)
- *Mixture of Experts (MoE)* — [Sebastian Raschka, LLMs-from-scratch ch.04](https://sebastianraschka.com/llms-from-scratch/ch04/07_moe/)
- *DeepSeekMoE: Advanced Mixture-of-Experts Models* — [emergentmind.com](https://www.emergentmind.com/topics/deepseekmoe-models)
- *Mixture of Experts (MoE) Explained: How DeepSeek & Llama 4 Work* — [localaimaster.com](https://localaimaster.com/blog/mixture-of-experts-explained)
- *Best Open-Source LLMs in 2026* — [featherless.ai](https://featherless.ai/blog/best-open-source-llms-2026)

## Summary

A consolidated 2026 snapshot of the [[Mixture of Experts]] field, with [[DeepSeek-V3]] as the canonical reference architecture. Covers the **fine-grained-expert + shared-expert recipe**, **auxiliary-loss-free load balancing**, the open MoE landscape (DeepSeek-V3.2/V4, Llama 4, Mixtral, Qwen-MoE), and the operational tradeoffs that determine when MoE wins vs dense.

## Key Claims

- MoE replaces the FFN block with **N parallel expert FFNs + a router**; only **top-k experts** activate per token. Total params grow with N; active params stay constant.
- The 2024–2026 trend is **fine-grained experts**: DeepSeek-V3 uses **256 routed experts + 1 shared expert** per layer with **top-8 routing**, replacing Mixtral's 8 large experts + top-2.
- **Shared experts** (always-on) capture universal patterns; **routed experts** specialize on rare/domain-specific features.
- **Auxiliary-loss-free load balancing**: DeepSeek-V3 replaces the classic balance loss with **per-expert learnable biases** that dynamically adjust based on usage. Cleaner, no quality/balance tradeoff.
- DeepSeek-V3 also introduces **Multi-head Latent Attention (MLA)** for ~10× KV cache compression, **node-limited routing** for cluster efficiency, **FP8 training**, and **multi-token prediction**.
- **DeepSeek-V3.2** (94.2% MMLU, MIT-licensed) is widely considered the best open LLM in 2026.
- **MoE scaling laws** differ from dense: at fixed FLOPs MoE wins; at fixed params dense wins. FLOPs-matched is the right comparison.
- MoE loses when **memory-bound** (whole model must be resident) or **latency-critical small** (routing overhead dominates).

## Entities Mentioned

- [[DeepSeek-AI]] — DeepSeek-V3/V3.2/V4, DeepSeekMoE
- [[DeepSeek-V3]] — flagship 671B/37B MoE
- [[Mistral AI]] — Mixtral 8x7B, 8x22B
- [[Mixtral]] — model entity
- [[Llama 4]] — Meta's MoE multimodal flagship
- [[Alibaba]] — Qwen2.5-MoE
- [[Google DeepMind]] — GShard, Switch Transformer (early open MoE)

## Concepts Covered

- [[Mixture of Experts]] — model class (new concept hub)
- [[Multi-head Latent Attention]] — DeepSeek's KV-cache compression
- [[Auxiliary-Loss-Free Load Balancing]] — DeepSeek's routing innovation
- [[Fine-Grained Experts]] — sub-recipe (covered in MoE page)
- [[Shared Experts]] — sub-recipe (covered in MoE page)

## Why this matters for the wiki

MoE was missing entirely as a concept page despite [[DeepSeek-R1]] being a wiki citizen and [[Mixture of Agents]] (a completely different concept — multi-agent ensemble) being the only nearby page. This source seeds the [[Mixture of Experts]] concept and the [[DeepSeek-V3]] entity, plus the surrounding model entities.

## Related Pages

- [[Mixture of Experts]] (new concept)
- [[DeepSeek-V3]] (new entity — distinct from existing [[DeepSeek-R1]])
- [[Mixtral]], [[Mistral AI]], [[Llama 4]] (new entities)
- [[Modality-as-Tokens]] (new synthesis — references MoE as the scaling answer)
- [[LLM Architecture]] (existing — should reference MoE)
