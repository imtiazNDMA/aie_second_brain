---
title: "LLM Architecture Landscape 2026"
type: synthesis
tags: [llm-architecture, comparative, transformer, moe, ssm, hybrid, synthesis]
sources: [2026-05-28-raschka-llm-architecture-gallery, 2026-05-28-mixture-of-experts-2026]
created: 2026-05-28
updated: 2026-05-28
---

# LLM Architecture Landscape 2026

A comparative atlas of LLM architectures from **GPT-2 (2019)** through the **2026 frontier**. The thesis: the transformer **skeleton** hasn't changed in seven years — `Embed → N × (Norm + Attn + Norm + FFN with residuals) → LM head` — but **every component inside it** has been swapped or augmented. This page maps the swaps so an AI engineer can read off "what makes model X different from model Y" at a glance.

For per-model deep dives with block diagrams, see the [[LLM Architecture]] hub.

## The seven recipe axes

Every modern LLM is defined by choices along **seven architectural axes**:

| Axis | Common 2024–2026 choices |
|---|---|
| **Position encoding** | [[Rotary Position Embeddings\|RoPE]] · [[NoPE]] (selective) · iRoPE (alternating) |
| **Normalization type** | [[RMSNorm]] · LayerNorm (legacy) · [[QK-Norm]] (overlay) |
| **Norm placement** | Pre-norm (default) · Post-norm ([[OLMo 2]]/[[OLMo 3]]) |
| **Attention** | [[Multi-Head Attention\|MHA]] · [[Grouped-Query Attention\|GQA]] · MQA · [[Multi-head Latent Attention\|MLA]] · [[Linear Attention]] · [[Mamba]] |
| **FFN sparsity** | Dense · Sparse [[Mixture of Experts\|MoE]] (with or without shared expert) |
| **FFN activation** | [[SwiGLU]] · GeGLU · GELU (legacy) |
| **Window pattern** | All global · All [[Sliding Window Attention\|SWA]] · Alternating (5:1, 3:1, 1:1) |

Plus optional **training-time augments**:
- [[Multi-Token Prediction]] (MTP)
- Aux-loss-free balancing (MoE)
- FP8 / FP4 training precision

## The grand comparison table (recipe matrix)

| Model | Year | Total/Active | Norm | QK-Norm | Attn | FFN | Window | Position |
|---|---|---|---|---|---|---|---|---|
| [[GPT-2]] | 2019 | 1.5B | LayerNorm | — | MHA | Dense GELU | Global | Learned abs |
| [[Mixtral]] 8x7B | 2023 | 47B / 12.9B | RMSNorm | — | GQA | MoE 8 (top-2) | SWA | RoPE |
| [[Llama 3]] 8B | 2024 | 8B | RMSNorm | — | GQA | Dense SwiGLU | Global | RoPE |
| [[OLMo 2]] 7B | 2024-11 | 7B | RMSNorm | **Yes** | MHA | Dense SwiGLU | Global | RoPE |
| [[DeepSeek-V3]] | 2024-12 | 671B / 37B | RMSNorm | — | **MLA** | **MoE 256+1 shared (top-8)** | Global | RoPE+decoupled |
| [[Phi-4]] | 2024-12 | 14B | RMSNorm | — | GQA | Dense SwiGLU | Global | RoPE |
| [[Gemma 3]] 27B | 2025-03 | 27B | RMSNorm | **Yes** | GQA | Dense SwiGLU | **5:1 SWA:Global** | RoPE |
| [[xLSTM]] 7B | 2025-03 | 7B | RMSNorm | — | **mLSTM (no attn)** | SwiGLU | n/a | n/a (recurrent) |
| [[Mistral Small 3]] | 2025-03 | 24B | RMSNorm | — | GQA | Dense SwiGLU | Global | RoPE |
| [[Llama 4]] Maverick | 2025-04 | ~400B / 17B | RMSNorm | — | GQA + chunked | MoE 128 (top-1) | Chunked+Global | **iRoPE** |
| [[Qwen3]] 235B-A22B | 2025-04 | 235B / 22B | RMSNorm | **Yes** | GQA | MoE (no shared) | Global | RoPE |
| [[Kimi K2]] | 2025-07 | 1T / 32B | RMSNorm | — | **MLA** | MoE | Global | RoPE+decoupled |
| [[GLM-4.5]] | 2025-07 | 355B | RMSNorm | **Yes** | GQA | MoE (dense prefix) | Global | RoPE |
| [[GPT-OSS]] 120B | 2025-08 | 120B | RMSNorm | — | GQA | MoE | **Alt SWA:Global** | RoPE |
| [[Grok 2.5]] | 2025-08 | 270B | RMSNorm | — | GQA | MoE + always-on SwiGLU | Global | RoPE |
| Qwen3 Next 80B | 2025-09 | 80B / 3B | RMSNorm | — | **Gated DeltaNet + Gated Attn (hybrid)** | MoE | n/a (linear) | RoPE |
| Kimi Linear | 2025-10 | 48B / 3B | RMSNorm | — | **Linear + MLA hybrid** | MoE | n/a | RoPE |
| [[MiniMax-M2]] | 2025-10 | 230B / 10B | RMSNorm | **Yes** | GQA | MoE | Global | RoPE |
| [[OLMo 3]] 32B | 2025-11 | 32B | RMSNorm + **post-norm** | **Yes** | GQA | Dense SwiGLU | **3:1 SWA:Global** | RoPE |
| [[Nemotron 3]] Nano | 2025-12 | 30B / 3B | RMSNorm | — | **Mostly Mamba-2 + transformer** | MoE | n/a | n/a |
| [[GLM-5]] | 2026-02 | 744B | RMSNorm | **Yes** | **MLA + sparse attn** | MoE | Global | RoPE+decoupled |
| [[Gemma 4]] 31B | 2026-04 | 31B | RMSNorm | **Yes** | GQA | Dense SwiGLU | **5:1 SWA:Global** | RoPE |
| [[Gemma 4]] 26B-A4B | 2026-04 | 26B / 4B | RMSNorm | **Yes** | GQA | MoE | 5:1 SWA:Global | RoPE |
| DeepSeek-V4 Pro | 2026-04 | 1.6T / 49B | RMSNorm | — | **CSA/HCA compressed attn** | MoE | n/a | RoPE |
| [[Command A]]+ | 2026 | 218B / 25B | RMSNorm | — | GQA | MoE | Global | RoPE; **parallel blocks** |

## The architectural arc by axis

### Axis 1: Position encoding — RoPE wins, NoPE creeps in selectively

- **GPT-2 era**: learned absolute embeddings.
- **2023 onward**: [[Rotary Position Embeddings|RoPE]] universal default.
- **2025–2026**: selective [[NoPE]] layers added for length generalization (SmolLM3, Sarvam-105B, Gemma 4 E-variants).
- **iRoPE** ([[Llama 4]]): alternating RoPE and no-RoPE layers — the same idea in regular pattern.

### Axis 2: Normalization — RMSNorm + QK-Norm overlay

- **GPT-2 era**: LayerNorm.
- **2022 onward**: [[RMSNorm]] universal default (Llama 1 popularized).
- **2024 onward**: [[QK-Norm]] overlay on top of RMSNorm (OLMo 2 popularized; Gemma 3/4, Qwen3, GLM-4.5/5, MiniMax-M2 all adopted).
- **DeepSeek hold-out**: DeepSeek family avoids QK-Norm, gets stability from other choices.

### Axis 3: Norm placement — pre-norm dominant, post-norm revival

- **GPT-2 era**: post-norm originally; quickly switched to pre-norm.
- **2022 onward**: pre-norm universal default.
- **2024–2025**: [[OLMo 2]] / [[OLMo 3]] revisit post-norm with QK-Norm for stability gains — a minority but active counter-current.

### Axis 4: Attention — GQA dominant, MLA spreading, linear emerging

- **GPT-2 era**: MHA.
- **2023**: GQA introduced (Llama 2 70B); becomes default by 2024.
- **2024-12**: **[[Multi-head Latent Attention|MLA]]** from [[DeepSeek-V3]] — KV cache ~10× smaller than GQA; adopted by Kimi K2, Mistral Large 3, GLM-5, Sarvam, Ling, LongCat.
- **2025**: **Linear-attention hybrids** emerge — Qwen3 Next (Gated DeltaNet), Kimi Linear, Ling (Lightning Attention).
- **2025-12**: DeepSeek-V3.2 introduces **sparse attention on top of MLA**; GLM-5 adopts.
- **2026**: DeepSeek-V4's **CSA/HCA (Compressed Sparse / Hierarchical Compressed Attention)** — next-gen successor.

### Axis 5: FFN sparsity — MoE wins above 30B active

- **GPT-2 era**: dense FFN.
- **2023**: [[Mixtral]] popularizes open-weight MoE (8 experts, top-2).
- **2024**: [[DeepSeek-V3]] establishes **fine-grained MoE + shared expert + aux-loss-free balancing** as the new standard.
- **2025–2026**: virtually every frontier-scale model is MoE: Llama 4, Qwen3 MoE variants, GLM-4.5/5, Kimi K2, Grok 2.5, MiniMax-M2, GPT-OSS, Mistral Large 3, Command A.
- **Dense persists** for <30B parameters (Llama 3 8B, Qwen3 dense, Gemma 3, Phi-4, Mistral Small 3, OLMo).

### Axis 6: FFN activation — SwiGLU universal

- **GPT-2 era**: GELU dense FFN.
- **2022**: PaLM introduces SwiGLU.
- **2023 onward**: [[SwiGLU]] universal default; experts in MoE are also SwiGLU.

### Axis 7: Window pattern — alternating local/global mainstream

- **GPT-2 era**: all global.
- **2023**: Mistral 7B introduces pure SWA.
- **2025–2026**: **alternating SWA / global** is mainstream — Gemma 3/4 (5:1), OLMo 3 (3:1), GPT-OSS (1:1), Tiny Aya (3:1), Laguna (3:1), Xiaomi MiMo (5:1).
- **DeepSeek hold-out**: DeepSeek family uses all-global attention with MLA's KV compression substituting for window.

## Pattern: convergence and divergence

### The "modern dense recipe" (mid-2024 default for <30B models)
```
RMSNorm + SwiGLU + RoPE + GQA + pre-norm + dense + global attention
```
Used by: Llama 3, Mistral Small 3, Phi-4, Qwen3 dense, OLMo (with QK-Norm), Gemma 3 dense (with QK-Norm + SWA).

### The "DeepSeek MoE recipe" (mid-2024 default for >100B)
```
RMSNorm + SwiGLU + RoPE+decoupled + MLA + pre-norm + fine-grained MoE (256+1 shared, top-8) + aux-loss-free + MTP + FP8
```
Used by: DeepSeek-V3/V3.2/V4, Kimi K2, Mistral Large 3 / Small 4, Sarvam-105B, GLM-5, LongCat.

### The "Google Gemma recipe" (Mar 2025 default)
```
RMSNorm + QK-Norm + SwiGLU + RoPE + GQA + 5:1 SWA:Global + pre-norm + dense
```
Used by: Gemma 3, Gemma 4 dense; influenced OLMo 3, Tiny Aya, Laguna, Xiaomi MiMo.

### The "Meta Llama 4 recipe" (April 2025)
```
RMSNorm + SwiGLU + iRoPE + GQA + chunked attn + MoE (top-1) + native multimodal
```
Distinctive but not widely copied yet.

### The "hybrid" recipe (late 2025+)
```
RMSNorm + SwiGLU + RoPE + (Mamba-2 OR Gated DeltaNet OR Lightning Attn) + transformer islands + MoE
```
Used by: Nemotron 3, Qwen3 Next, Qwen3.5, Kimi Linear, Ling 2.5/2.6.

## Decision guide for AI engineers

**You need a <10B dense LLM for fine-tuning / on-device:**
→ Llama 3.2 / Qwen3 4B/8B / Phi-4 / OLMo 2 / Gemma 3 4B-12B. Modern dense recipe; pick by license and ecosystem.

**You need a 20–35B model:**
→ Llama 3 70B (dense, mature), Qwen3 32B, Gemma 3 27B, Mistral Small 3, OLMo 3 32B. Most are dense; QK-Norm / SWA differences are minor at this scale.

**You need maximum quality, multi-GPU serving budget:**
→ DeepSeek-V3.2 / V4-Pro (MoE + MLA), Kimi K2 (MoE + MLA), GLM-5 (MoE + MLA). DeepSeek lineage is dominant in 2026.

**You need 1M+ token context:**
→ Kimi K2.6, Llama 4 Scout (10M), Ling 2.6, Nemotron 3 hybrid. Linear-attention or hybrid recipes shine here.

**You need an open-license enterprise-trustworthy LLM:**
→ Granite 4.1 (IBM, Apache 2.0, IP indemnification), OLMo (Apache 2.0, full data trail), Mistral Small 3 (Apache 2.0).

**You want maximum architectural diversity (research):**
→ xLSTM (non-transformer), Mamba/Mamba-2 (SSM), Jamba (hybrid), Nemotron 3 (Mamba+transformer+MoE), Qwen3 Next (Gated DeltaNet hybrid).

## What didn't catch on

Architectural ideas that briefly appeared but failed to spread:
- **MQA** at frontier scale — GQA always preferred.
- **Sigmoid attention** (Apple research) — not adopted in major releases.
- **Diff attention** (Microsoft research) — research-only.
- **Performer** / **Linformer** — first-wave linear attention; killed by quality gap.
- **ALiBi** — beaten by RoPE.
- **Post-norm** broadly — except OLMo's recent revival.

## Open Questions for late 2026

1. **Will dense models survive at >30B?** Llama 5, Mistral, Cohere are the main labs still investing in dense at large scale.
2. **Mamba-2 vs Linear Attention vs MLA + sparse attn** — which non-quadratic-attention family wins for 1M+ context?
3. **Best norm overlay** — QK-Norm everywhere, or something new in 2026 H2?
4. **MoE top-k optimization** — top-1 (Llama 4), top-2 (Mixtral), top-8 (DeepSeek). Empirical answer is unsettled.
5. **Native multimodal trunks** vs adapter-style — Llama 4 / Gemini / GPT-4o are pushing the early-fusion direction. Will Llama 5 / Qwen 4 follow?
6. **FP4 training** — successor to FP8 (DeepSeek-V3); when does it become viable?

## Connections

### Hub & sources
- [[LLM Architecture]] — hub (primitives + models)
- [[2026-05-28-raschka-llm-architecture-gallery]] — source
- [[2026-05-28-mixture-of-experts-2026]] — MoE deep-dive source
- [[Transformer Architecture Anatomy]] — block-by-block primitive walkthrough
- [[Sequence Modeling Evolution]] — pre-transformer history
- [[Modality-as-Tokens]] — adjacent multimodal-convergence synthesis
- [[Reasoning Models Landscape]] — layered on top of base architecture

### Primitive concept pages (all referenced above)
- [[RMSNorm]], [[QK-Norm]]
- [[SwiGLU]]
- [[Rotary Position Embeddings]], [[NoPE]]
- [[Multi-Head Attention]], [[Grouped-Query Attention]], [[Multi-head Latent Attention]]
- [[Sliding Window Attention]], [[Linear Attention]], [[Mamba]], [[State Space Models]]
- [[Mixture of Experts]]
- [[Multi-Token Prediction]]
- [[Parallel Attention and FFN]]

### All model architecture pages
- [[GPT-2]]
- [[Llama 3]], [[Llama 4]]
- [[OLMo 2]], [[OLMo 3]]
- [[Gemma 3]], [[Gemma 4]]
- [[Qwen3]]
- [[Mistral Small 3]], [[Mixtral]]
- [[Phi-4]]
- [[GPT-OSS]]
- [[Kimi K2]]
- [[GLM-4.5]], [[GLM-5]]
- [[Grok 2.5]]
- [[MiniMax-M2]]
- [[Granite 4.1]]
- [[Command A]]
- [[xLSTM]]
- [[Nemotron 3]]
- [[DeepSeek-V3]] (model-architecture page; complement to entity page)
