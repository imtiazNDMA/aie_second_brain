# Mixture of Experts — 2026 State-of-the-Art Compilation

**Compiled:** 2026-05-28
**Type:** Multi-source web research compilation
**Topic:** Mixture of Experts (MoE), DeepSeek-V3, Sparse Models
**Primary sources:**
- *DeepSeek-V3 from Scratch: Mixture of Experts (MoE)* — PyImageSearch (2026-03-23)
- *DeepSeek v3 and R1 Model Architecture* — Fireworks AI Blog
- *DeepSeekMoE: Advanced Mixture-of-Experts Models* — emergentmind.com
- *Mixture of Experts (MoE)* — Sebastian Raschka, LLMs-from-scratch ch.04
- *Mixture of Experts (MoE) Explained: How DeepSeek & Llama 4 Work* — localaimaster.com
- *Best Open-Source LLMs in 2026* — featherless.ai, deploybase.ai

---

## What MoE Is

A **Mixture of Experts (MoE)** transformer replaces the standard FFN block in each layer with:
1. A bank of $N$ parallel FFN modules (the **experts**).
2. A small **router / gate** network that scores which experts to use per token.
3. Optionally a **shared expert** that processes every token regardless.

For each token, only **top-k** experts (typically k=1–8 out of N=8–256) are activated. This means:

- **Total parameters** grow with $N$ (large capacity).
- **Active parameters per token** stay roughly constant (cheap compute).

The total/active parameter gap is the entire economic argument for MoE.

## Why MoE Now

MoE has existed since the 1990s (Jacobs et al.); modern versions trace to:
- **GShard / Switch Transformer** (Google, 2020–2021) — first practical large-scale MoE.
- **Mixtral 8x7B / 8x22B** (Mistral, 2023–2024) — first popular open MoE.
- **DeepSeekMoE** (2024) — fine-grained experts + shared experts.
- **DeepSeek-V3 / V3.2 / V4** (2024–2026) — current SOTA recipe.
- **Llama 4 Maverick / Scout** (Meta, 2025) — Meta adopts MoE.

The 2024–2026 trend is **fine-grained experts**: instead of 8 big experts, use 256 small ones with top-8 routing. Argument: finer specialization, smoother load distribution, more recombinable computation.

## DeepSeek-V3 Architecture

**Total / Active**: 671B / 37B parameters per token (~5.5% active).

**Per layer**:
- 1 **shared expert** (always active).
- 256 **routed experts** (fine-grained, smaller per-expert FFN).
- **Top-8** routed experts per token.
- Each expert is a SwiGLU FFN.

**Architectural innovations over Mixtral**:
- **Multi-head Latent Attention (MLA)** — compresses KV cache via a learned latent projection, ~10× smaller KV cache.
- **Auxiliary-loss-free load balancing** — replaces the classic auxiliary balance loss with per-expert learnable biases.
- **Node-limited routing** — limits the number of nodes each token's experts can span (reduces all-to-all communication).
- **FP8 training** — first major open MoE trained natively in FP8.
- **Multi-token prediction (MTP)** — auxiliary loss predicting future tokens; improves training signal.

## Auxiliary-Loss-Free Load Balancing

Traditional MoE adds an auxiliary loss $\mathcal{L}_{\text{aux}} = \alpha \cdot \sum_i f_i \cdot P_i$ that penalizes uneven expert utilization. Side effects: balance loss conflicts with quality loss; tuning $\alpha$ is delicate.

DeepSeek-V3's approach (Wang et al. 2024):

1. Maintain a learnable bias $b_i$ for each expert $i$.
2. Router scores become $s_i + b_i$ (only for top-k selection, not for the final gating value).
3. After each step, update biases: if expert $i$ was over-used, decrease $b_i$ by a tiny step (e.g., 0.001); if under-used, increase.

Result: smooth balance without an auxiliary loss term in the gradient. Empirically achieves better quality at the same balance level.

## Fine-Grained Experts (DeepSeekMoE)

DeepSeekMoE (2024) introduced **fine-grained experts**:
- Split each "macro-expert" into $m$ smaller experts.
- Increase top-k correspondingly.
- Total active FLOPs constant; total parameters scale with $m$.

Intuition: smaller experts can specialize on finer-grained features; combinatorial routing over 256 small experts is richer than over 8 large ones.

## Shared Experts (DeepSeekMoE)

In addition to routed experts, add 1+ **shared experts** that process every token. Captures features that are universal across tokens (syntax, common patterns), freeing routed experts to specialize on rare or domain-specific patterns.

## Routing Strategies

| Strategy | Used by | Notes |
|---|---|---|
| **Top-1** | Switch Transformer | Maximally sparse, harder to balance |
| **Top-2** | GShard, Mixtral | Standard for years; balance via aux loss |
| **Top-8 (of 256)** | DeepSeek-V3 | Fine-grained; bias-based balance |
| **Expert Choice** | reverse routing — experts pick tokens | Better balance, but token-dropping |
| **Soft MoE** | weighted average over all experts | Dense activation, defeats sparsity |
| **Hash routing** | non-learned | Cheap baseline |

## Scaling Laws

Total parameter count rises ~linearly with expert count; active parameter count grows much more slowly (only top-k scales).

Krajewski et al. 2024 showed MoE follows different scaling laws than dense models — at fixed FLOPs, MoE achieves lower loss than dense; at fixed parameters, dense wins. The right comparison is **FLOPs-matched**, not param-matched.

## 2025–2026 Open MoE Landscape

| Model | Total | Active | Experts | Notes |
|---|---|---|---|---|
| **Mixtral 8x7B** | 47B | 12.9B | 8 (top-2) | Original Mistral MoE; 2023 |
| **Mixtral 8x22B** | 141B | 39B | 8 (top-2) | Mistral, 2024 |
| **DeepSeek-V3** | 671B | 37B | 256 + 1 shared (top-8) | DeepSeek, 2024 |
| **DeepSeek-V3.2** | 671B | 37B | 256 + 1 shared (top-8) | DeepSeek, 2025; best open LLM overall (MMLU 94.2%) |
| **DeepSeek-V4-Pro** | 1.6T | 49B | 384+? (top-8) | DeepSeek, 2026; multimodal |
| **DeepSeek-V4-Flash** | 284B | 13B | 128+? (top-4) | DeepSeek, 2026; cost-efficient |
| **Llama 4 Maverick** | ~400B | ~17B | 128 (top-1) | Meta, 2025; 1M context; multimodal |
| **Llama 4 Scout** | ~110B | ~17B | 16 (top-1) | Meta, 2025 |
| **Qwen2.5-MoE 14B** | 14B | 2.7B | 64 (top-8) | Alibaba |
| **DeepSeek-VL2** | varies | varies | MoE | Vision-language MoE |

DeepSeek-V3.2 (94.2% MMLU, matches GPT-4o, MIT-licensed) is widely considered the best open LLM in 2026.

## When MoE Wins

- **Capacity-bound tasks** (knowledge breadth, multilingual) — total params matter.
- **Compute-bound serving** — active params matter; MoE serves cheaply per-token.
- **Heterogeneous workloads** — experts specialize on domains/languages.

## When MoE Loses

- **Memory-bound serving** — all 671B params must be resident; can't run on single GPUs.
- **Latency-critical small models** — overhead of routing dominates at small N.
- **Fine-tuning** — expert imbalance during LoRA / SFT.
- **Edge / on-device** — total memory footprint kills.

## Notable Entities

- **DeepSeek-AI** (China) — DeepSeek-V3, DeepSeekMoE, MLA, aux-loss-free balancing
- **Mistral AI** (France) — Mixtral 8x7B, 8x22B
- **Meta AI** — Llama 4 (MoE flagship)
- **Alibaba Qwen team** — Qwen-MoE
- **Google DeepMind** — Gemini 1.5/2.0 (rumored MoE), GShard, Switch Transformer (open)
- **OpenAI** — GPT-4 (widely believed MoE; closed)
- **Anthropic** — Claude Opus/Sonnet (architecture undisclosed)

## URLs

- https://pyimagesearch.com/2026/03/23/deepseek-v3-from-scratch-mixture-of-experts-moe/
- https://fireworks.ai/blog/deepseek-model-architecture
- https://www.emergentmind.com/topics/deepseekmoe-models
- https://sebastianraschka.com/llms-from-scratch/ch04/07_moe/
- https://localaimaster.com/blog/mixture-of-experts-explained
- https://featherless.ai/blog/best-open-source-llms-2026
- https://medium.com/@prashantsahdev/deepseek-v3-blog-2-the-smartest-use-of-mixture-of-experts-moe-in-ai-yet-f72227d3a0e3
- https://ollama.com/library/deepseek-v3
- https://docs.clore.ai/guides/language-models/deepseek-v4
