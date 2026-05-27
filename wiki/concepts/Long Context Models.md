---
title: Long Context Models
type: concept
tags: [transformer, attention, llm, inference]
sources: [2026-05-09-cache-augmented-generation]
created: 2026-05-09
updated: 2026-05-09
---

# Long Context Models

## Definition

**Long context models** are LLMs whose effective context window extends well beyond the 2K–8K-token regime of early transformer-based models — typically ≥128K tokens, with 2025-era frontier models reaching 1M–10M tokens. The shift was enabled by a stack of attention-mechanism, [[KV Cache]], and positional-encoding innovations, and it underlies new application paradigms like [[Cache-Augmented Generation]], multi-document analysis, and long-form code understanding.

## Why context length is hard

Standard scaled dot-product attention is $O(N^2)$ in sequence length: for $N = 1{,}000{,}000$ tokens that's $10^{12}$ pairwise scores per layer per head. Both compute and memory become impractical. Long-context capability is the result of attacking this on multiple fronts simultaneously.

## Enabling techniques

### Memory and IO
- **[[FlashAttention]]** — IO-aware kernel; never materializes the full $N \times N$ attention matrix
- **[[Paged Attention]]** — paging-style KV-cache management; eliminates fragmentation
- **[[KV Cache]] quantization** — 4-bit / 8-bit storage for cache tensors
- **[[Grouped-Query Attention]]** — fewer KV heads → smaller cache per layer

### Positional encoding
- **[[Rotary Position Embeddings]]** (RoPE) — position-aware via complex rotation; extrapolation tricks (NTK-aware, YaRN, position interpolation) push trained 4K context to 128K+ at inference
- **ALiBi** — linear-bias positional scheme that extrapolates more naturally than absolute position embeddings

### Training tricks
- **Two-stage training** — pretrain on short, fine-tune on long
- **Sliding-window attention with global tokens** (Mistral, Longformer) — local attention plus a few global anchors
- **Sparse attention patterns** — block-sparse, BigBird, Reformer's LSH

## What long context unlocks

- **[[Cache-Augmented Generation]]** — preload entire corpus into context once
- **Multi-document reasoning** — reason across whole textbooks, codebases, regulatory documents
- **Long-horizon dialogue** — conversation memory without summarization
- **Code-base navigation** — entire repositories in context
- **Few-shot at scale** — hundreds of demonstration examples

## "Lost in the middle" — the quality caveat

A persistent finding (Liu et al. 2023; widely replicated): models attend most strongly to the **beginning** and **end** of long contexts, with quality degrading for content in the middle. This means the *theoretical* context window and the *effective* one diverge. Mitigations:

- Place critical content at the start or end
- Use retrieval to surface key passages even within long context (hybrid CAG + RAG)
- Train explicitly on long-context tasks to flatten the U-shape

## Frontier-tier context lengths (representative, mid-2025)

| Model | Context | Notes |
|-------|---------|-------|
| Claude 4 family | 200K (1M for paying tiers) | Strong middle-context performance |
| GPT-4.1 | 1M | API tier |
| Gemini 1.5/2 | 1M–2M | Multimodal long context |
| Llama 3.1 / 3.3 | 128K | Open weights |
| Qwen 2.5 / 3 | 128K–1M | Open weights with extension |

## Related Concepts

- [[KV Cache]] — substrate that long context stresses
- [[FlashAttention]] — IO-aware kernel
- [[Paged Attention]] — KV cache management
- [[Grouped-Query Attention]] — KV reduction
- [[Rotary Position Embeddings]] — positional extrapolation
- [[Cache-Augmented Generation]] — application
- [[Retrieval-Augmented Generation]] — alternative approach for very long corpora
- [[Inference Optimization]]

## Sources

- [[2026-05-09-cache-augmented-generation]] — relies on long-context capability as the enabling assumption
