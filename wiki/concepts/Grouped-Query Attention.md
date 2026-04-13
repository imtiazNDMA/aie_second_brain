---
title: Grouped-Query Attention
type: concept
tags: [transformer, attention, inference]
sources: [2026-04-12-build-llm-from-scratch]
created: 2026-04-13
updated: 2026-04-13
---

# Grouped-Query Attention

## Definition

Attention variant where multiple query heads share the same key/value projections to reduce memory bandwidth during decoding. Instead of having $H_q$ separate K/V sets, grouped-query attention (GQA) maps queries into $G$ groups, each reusing one K/V head while retaining independent query projections.

## Motivation

- During autoregressive inference, caching K/V tensors per head dominates memory. Sharing K/V across query groups shrinks cache size without collapsing all heads (as in multi-query attention).
- Enables higher throughput on GPUs while keeping richer attention patterns than single-head KV setups.

## Mechanics

- Choose group size $r = H_q / H_{kv}$.
- Apply unique $W_q$ matrices per head, but reuse shared $W_k$ and $W_v$ for every $r$ queries.
- Store one K/V cache per group; when decoding, each query head attends over the shared K/V but uses its own query vector, preserving diversity.

## Related Concepts

- [[Multi-Head Attention]]
- [[Rotary Position Embeddings]]
- [[Transformer]]
