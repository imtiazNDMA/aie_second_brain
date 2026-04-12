---
tags: [attention, transformer, nlp]
sources: [2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-12
---

# Scaled Dot-Product Attention

## Definition

Computes attention weights by taking dot products between queries (Q) and keys (K), scaling by 1/√d_k, applying softmax to form weights, and multiplying by values (V). Forms the core attention primitive in the [[Transformer]].

## Formula

```
Attention(Q, K, V) = softmax((Q Kᵀ) / √d_k) V
```

## Motivation

- Scaling prevents very large dot products from saturating the softmax when d_k is large, preserving gradient quality.
- Easily vectorized via matrix multiplications, yielding high GPU efficiency.

## Variants

- **Additive attention:** Uses learned feed-forward networks instead of dot products.
- **Masked attention:** Sets disallowed positions to −∞ before softmax to enforce causality.

## Related Concepts

- [[Multi-Head Attention]]
- [[Self-Attention]]
- [[Attention Mechanism]]
