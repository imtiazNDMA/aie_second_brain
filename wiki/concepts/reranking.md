---
title: Reranking
type: concept
tags: [retrieval, ranking, rag]
sources: [2026-04-12-rag-driven-generative-ai, 2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Reranking

## Definition

Two-stage retrieval strategy: run a fast approximate nearest-neighbor search to fetch top-K candidates, then apply a heavier cross-encoder or scoring model to reorder and prune results before passing context to the generator. Reranking improves precision, reduces hallucinations, and appears throughout the 14 Types of RAG taxonomy.

## Common Approaches

- **Cross-encoders** — encode query+document jointly (e.g., `bge-reranker`, Cohere Rerank) to produce a relevance score. Highest accuracy but highest latency.
- **Lightweight scoring** — lexical BM25, dense dot products, Maximal Marginal Relevance (MMR) for diversity.
- **Hybrid** — combine lexical score with semantic similarity (weighted sum, LambdaRank).

## Implementation Tips

- Limit first-stage K to what the reranker budget allows (e.g., 50-200 docs) to maintain throughput.
- Cache frequent reranker inputs for FAQ-style workloads.
- Log reranker scores to drive [[RAG Evaluation]] dashboards and [[Adaptive RAG]] loops.

## Related Concepts

- [[Embeddings]]
- [[Vector Database]]
- [[Retrieval-Augmented Generation]]
