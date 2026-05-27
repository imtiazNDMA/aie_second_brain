---
title: DeepSeek-V3
type: entity
tags: [model, llm, moe, open-weights, deepseek, mit-license]
sources: [2026-05-28-mixture-of-experts-2026]
created: 2026-05-28
updated: 2026-05-28
---

# DeepSeek-V3

## Identity

The flagship base/instruct LLM family of [[DeepSeek-AI]], released late 2024 and iterated through 2025–2026 (V3, V3.1, V3.2). **DeepSeek-V3.2** (94.2% MMLU, MIT-licensed) is widely considered the **best open-weight LLM in 2026**. The architecture pioneered fine-grained [[Mixture of Experts|MoE]] with shared experts and auxiliary-loss-free load balancing — the recipe now widely copied.

DeepSeek-V3 is also the **base model** for [[DeepSeek-R1]] (its reasoning-RL fine-tune that broke open the RLVR paradigm).

## Architecture

- **Total / Active parameters**: 671B / 37B (~5.5% active per token).
- **Layers**: 61 transformer blocks.
- **Experts per layer**: 256 routed + 1 shared.
- **Routing**: top-8 of 256 routed experts.
- **Attention**: **Multi-head Latent Attention (MLA)** — compresses KV cache ~10× via a learned latent projection.
- **Activation**: SwiGLU in expert FFNs.
- **Load balancing**: **auxiliary-loss-free** — learnable per-expert biases adjusted by usage statistics.
- **Communication**: **node-limited routing** — caps cluster nodes per token to reduce all-to-all overhead.
- **Precision**: **FP8 training** — first major open MoE trained natively in FP8.
- **Auxiliary objective**: **Multi-Token Prediction (MTP)** — predict future tokens during training; improves training signal.

## Training

- Trained on ~14.8T tokens (text + code; multilingual heavy on Chinese and English).
- Total training cost: ~$5.5M reported (very low for the scale, thanks to FP8 + MoE efficiency).
- Post-training: supervised fine-tuning + reinforcement learning from preference (separate from the R1 RLVR pipeline).

## Variants

| Variant | Notes |
|---|---|
| **DeepSeek-V3-Base** | The pretrained base. The substrate for R1's RL pipeline. |
| **DeepSeek-V3** | Instruct-tuned. General-purpose chat / agent model. |
| **DeepSeek-V3.1 / V3.2** | Iterative updates; V3.2 reaches 94.2% MMLU. |
| **DeepSeek-V4-Pro** | 1.6T total / 49B active, multimodal flagship (2026). |
| **DeepSeek-V4-Flash** | 284B / 13B active, cost-efficient. |

## Benchmarks (DeepSeek-V3.2)

| Benchmark | Score |
|---|---|
| MMLU | 94.2% |
| MATH-500 | strong |
| HumanEval | strong |
| MMLU-Pro | competitive with GPT-4o |
| AlignBench | strong (Chinese) |

## License

**MIT** — the most permissive frontier-tier open LLM in 2026.

## Significance

- **Fine-grained-MoE recipe** is now the dominant frontier architecture; DeepSeek-V3 is the canonical reference.
- **Auxiliary-loss-free load balancing** is its single most-copied innovation.
- **MLA** (Multi-head Latent Attention) is a key serving-time advantage — small KV cache means cheap long-context inference.
- The base model for [[DeepSeek-R1]], which itself defined the reasoning-RL paradigm.
- Matches or beats GPT-4o on most public benchmarks at a fraction of the inference cost.

## Where it appears in this wiki

- [[Mixture of Experts]] — DeepSeek-V3 is the canonical 2026 MoE
- [[DeepSeek-R1]] — uses V3-Base as the RL substrate
- [[DeepSeek-AI]] — organization
- [[Multi-head Latent Attention]] — DeepSeek's KV-cache compression
- [[Modality-as-Tokens]] — synthesis

## Sources

- [[2026-05-28-mixture-of-experts-2026]]
- DeepSeek-V3 Technical Report (arXiv:2412.19437)
