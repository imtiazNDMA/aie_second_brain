---
title: NoPE
type: concept
tags: [positional-encoding, attention, architecture-primitive, no-position]
sources: [2026-05-28-raschka-llm-architecture-gallery]
created: 2026-05-28
updated: 2026-05-28
---

# NoPE

## Definition

**NoPE** ("No Position Embedding," Haviv et al. 2022; Kazemnejad et al. 2023) is the technique of **omitting positional encoding entirely** from selected transformer layers. Causal-masked attention is implicitly position-aware (a token at position $t$ only sees positions $\leq t$), so position information can be learned without explicit encoding.

NoPE has been adopted as a **selective layer-level choice** — applied in some layers, with [[Rotary Position Embeddings|RoPE]] in others — in models like **SmolLM3** (2025), **Sarvam-105B** (2026), and **Gemma 4 E-variants** (2026).

## The original observation

The original NoPE paper showed that decoder-only transformers **trained without any positional encoding** can match or beat RoPE/ALiBi baselines on standard benchmarks, especially on length generalization (extrapolating beyond training length).

Mechanism: causal attention masks combined with multi-layer stacking implicitly encode position through the *order* of attended tokens. The model learns to use this signal.

## Selective NoPE in 2026 models

Pure NoPE underperforms RoPE in modern frontier models. But **mixing NoPE with RoPE** — applying NoPE only to a subset of layers — gives the length-generalization benefit without sacrificing performance at training length.

| Model | NoPE usage |
|---|---|
| **SmolLM3 (3B)** | Periodic NoPE layers (every Kth layer) |
| **Sarvam-105B** | NoPE + RoPE combination across layers |
| **Gemma 4 (E2B / E4B)** | KV-shared layers without positional encoding |

The intuition: layers near the input benefit from explicit positional encoding (RoPE) for short-range structure; layers higher up benefit from NoPE for length generalization.

## How NoPE looks in a model

```
Layer 1:   [Attn + RoPE] + FFN          ← position-aware
Layer 2:   [Attn + RoPE] + FFN
Layer 3:   [Attn (no pos encoding)] + FFN  ← NoPE layer
Layer 4:   [Attn + RoPE] + FFN
Layer 5:   [Attn + RoPE] + FFN
Layer 6:   [Attn (no pos encoding)] + FFN  ← NoPE layer
...
```

The NoPE layer's attention computes $\text{softmax}(QK^T / \sqrt{d})V$ without any rotary modification of Q and K.

## Length extrapolation

The biggest practical win for NoPE: **generalization to sequences longer than training**.

RoPE-only models often degrade past training context length because the rotary positions become out-of-distribution. NoPE layers, having no positional inductive bias, generalize more gracefully — they don't have a "training length" to extrapolate from.

This is critical for models targeting very long context (1M+ tokens) where training at the full length is infeasible.

## Connections

- [[Positional Encoding]] — broader topic
- [[Rotary Position Embeddings]] — typical companion (RoPE in some layers, NoPE in others)
- [[Attention Mechanism]] — what implicitly encodes position via causal masking
- [[LLM Architecture]] — hub
- [[2026-05-28-raschka-llm-architecture-gallery]] — source

## Open Questions

- Optimal NoPE-to-RoPE ratio across layers.
- Why NoPE layers must be specifically *interspersed* rather than concentrated.
- Does NoPE compose with [[Sliding Window Attention]] (currently uncommon)?
