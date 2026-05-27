---
title: "LLM Architecture Gallery — 2019–2026 visual reference (Sebastian Raschka)"
type: source
authors: [Sebastian Raschka]
tags: [llm-architecture, model-gallery, transformer-variants, reference]
sources: [Raschka LLM Architecture Gallery.md]
venue: sebastianraschka.com (continuously updated)
created: 2026-05-28
updated: 2026-05-28
---

# LLM Architecture Gallery — 2019–2026 visual reference

**URL:** [https://sebastianraschka.com/llm-architecture-gallery/](https://sebastianraschka.com/llm-architecture-gallery/)
**Author:** [[Sebastian Raschka]]
**Type:** Living reference document (continuously updated)
**Date ingested:** 2026-05-28

## Summary

A continuously-updated visual gallery of large-language-model architectures from **GPT-2 (2019)** through the 2026 frontier. As of the May 2026 snapshot, the gallery catalogues ~72 model variants from 30+ organizations. Each entry shows the model's block diagram annotated with concrete architectural choices: normalization placement and type, FFN activation, positional encoding scheme, attention variant, sparsity (dense vs MoE), and window-vs-global attention pattern.

The gallery's value is **comparison-by-eye**: laying GPT-2's pre-norm + LayerNorm + MHA next to DeepSeek-V3's MLA + sparse MoE + aux-loss-free balancing makes the 6-year architectural arc visually legible.

## What the gallery makes apparent

- **The transformer skeleton hasn't changed.** Every model is still `Embed → N × (Attention + FFN with residuals/norms) → LM head`. What changed is every *component inside* the block.
- **Convergence on a "modern dense recipe"** by 2024: RMSNorm + SwiGLU + RoPE + GQA + pre-norm. Llama 3, Qwen3 (dense), Phi-4, Mistral Small, Gemma 3, OLMo all share this skeleton.
- **MoE took over above ~30B active params.** DeepSeek-V3, Llama 4, Qwen3-MoE, Mixtral, GLM-4.5, Kimi K2, Grok 2.5, MiniMax-M2 — every frontier model in 2025–2026 ships with MoE FFNs.
- **MLA spread from DeepSeek to the field.** Multi-head Latent Attention is now in Kimi K2, Mistral Large 3, GLM-5, Sarvam, Ling, LongCat — the KV-cache-compression race is on.
- **Sliding-window attention is mainstream.** Gemma 3/4, OLMo 3, Mistral, GPT-OSS, Tiny Aya, Laguna XS all alternate local-window and global attention layers (typical ratio 3:1 or 5:1).
- **QK-Norm is the new training-stability default** — OLMo 2 popularized it; Gemma 3/4, Qwen3, MiniMax-M2, GLM-4.5/5, Sarvam adopt it.
- **Hybrid architectures emerge in late 2025.** Qwen3 Next mixes Gated DeltaNet with Gated Attention; Kimi Linear pairs linear attention with MLA; Nemotron 3 is mostly Mamba-2 with transformer islands; Ling pairs Lightning Attention with MLA. The "transformer-only" assumption is loosening.
- **xLSTM** (March 2025) is the standout non-transformer entry — a recurrent mLSTM revival with no self-attention.

## Architectural primitives the gallery exposes

The gallery references these primitives (each gets its own wiki page in this ingest):
- [[RMSNorm]] — universal in modern models; replaces LayerNorm
- [[SwiGLU]] — universal modern FFN activation
- [[Rotary Position Embeddings]] (RoPE) — already in wiki
- [[Grouped-Query Attention]] (GQA) — already in wiki
- [[Multi-head Latent Attention]] (MLA) — DeepSeek's innovation, now widespread
- [[QK-Norm]] — training stability
- [[Sliding Window Attention]] — local-attention block; alternated with full attention
- [[NoPE]] — No Position Embedding (used periodically in SmolLM3, Sarvam, Gemma 4 e-variants)
- [[Multi-Token Prediction]] (MTP) — auxiliary loss; DeepSeek-V3, Step 3.5, Nemotron 3 Super
- [[State Space Models]] — primitive family (S4, Mamba, Mamba-2)
- [[Mamba]] — selective state-space model
- [[Linear Attention]] (incl. Gated DeltaNet, Lightning Attention, Gated Attention)
- [[Parallel Attention and FFN]] — used in PaLM, Cohere Tiny Aya

## Model families covered (this ingest creates pages for)

Foundational / historical:
- [[GPT-2]] — pedagogical anchor (2019)

2024–2026 frontier (entity pages new in this ingest):
- [[Llama 3]] — Meta dense reference
- [[OLMo 2]] / [[OLMo 3]] — Allen AI open-data reference
- [[Gemma 3]] / [[Gemma 4]] — Google compact
- [[Qwen3]] — Alibaba broad family
- [[Phi-4]] — Microsoft small-model
- [[Mistral Small 3]] — modern Mistral dense
- [[GPT-OSS]] — OpenAI's 2025 open-weight return
- [[Kimi K2]] — Moonshot 1T MoE
- [[GLM-4.5]] / [[GLM-5]] — Zhipu MoE
- [[Grok 2.5]] — xAI MoE
- [[MiniMax-M2]] — agent-focused MoE
- [[Granite 4.1]] — IBM open enterprise
- [[Command A]] — Cohere flagship
- [[xLSTM]] — non-transformer recurrent
- [[Nemotron 3]] — NVIDIA Mamba hybrid

Pages updated with full architecture block diagrams:
- [[DeepSeek-V3]] — MLA + fine-grained MoE + shared expert
- [[Llama 4]] — MoE + native multimodal + 10M context
- [[Mixtral]] — first popular open MoE

## Why this matters for the wiki

The wiki had primitive pages ([[Attention Mechanism]], [[Multi-Head Attention]], [[Grouped-Query Attention]], [[Vision Transformer]]) and a hub page ([[LLM Architecture]]) but **no per-model architectural treatment** — readers had no way to ask "what makes Llama 3 architecturally different from Qwen3?" and get a wiki answer. This source seeds a complete per-model layer that complements the existing primitive layer.

## Connections

- [[LLM Architecture]] — main hub
- [[Transformer Architecture Anatomy]] — synthesis with deeper primitive walkthrough
- [[LLM Architecture Landscape 2026]] — comparative-grid synthesis derived from this gallery
- [[Modality-as-Tokens]] — adjacent synthesis on multimodal architecture convergence
- [[Sebastian Raschka]] — author
- [[2026-05-28-mixture-of-experts-2026]] — the MoE side of the architecture story

## Citation

Raschka, S. (2026). *LLM Architecture Gallery.* https://sebastianraschka.com/llm-architecture-gallery/ (continuously updated visual reference).
