---
title: Attention Mechanism
type: concept
tags: [deep-learning, transformer, nlp]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-12
---

# Attention Mechanism

Allows models to dynamically focus on relevant parts of input sequence when computing outputs. Core innovation behind transformers.

## Types

- **Scaled Dot-Product Attention:** Core mechanism — Q, K, V matrices compute attention scores scaled by √d_k.
- **Multi-Head Attention:** Multiple attention heads in parallel, concatenating results.
- **Causal (Masked) Attention:** Prevents attending to future tokens — essential for language modeling
- **Cross-Attention:** Queries from one sequence, Keys/Values from another — used in encoder-decoder
- **Grouped-Query Attention (GQA):** Fewer K/V heads than Q heads — reduces memory while maintaining quality

## Related Concepts

- [[Scaled Dot-Product Attention]]
- [[Multi-Head Attention]]
- [[Self-Attention]]
- [[Transformer]]
- [[Positional Encoding]]

## Related Concepts

- [[Transformer]]
- [[Positional Encoding]]
