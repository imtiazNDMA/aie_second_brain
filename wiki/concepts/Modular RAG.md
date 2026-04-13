---
title: Modular RAG
type: concept
tags: [rag, architecture, modularity]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Modular RAG

## Definition

An architectural style that decomposes retrieval-augmented generation into swappable components—retrievers, rerankers, generators, evaluators, memory stores—so teams can evolve each part independently. Modular RAG emphasizes interface contracts and observability between modules.

## Characteristics

- Multiple retrievers (keyword, dense, graph) feeding a reranker.
- Generator options (hosted APIs, open weights) selected per workload.
- Feedback channels (human evals, critics) wired into both retrievers and generators.
- Tooling integration (LangChain, LangGraph, custom orchestrators) that enforces module boundaries.

## Benefits

- Easier experimentation: swap rerankers or models without rebuilding pipelines.
- Governance: audit logs per module simplify compliance reviews.
- Scalability: allocate infrastructure according to each module’s latency/cost needs.

## Related Concepts

- [[Adaptive RAG]]
- [[Agent Memory]]
- [[Dynamic RAG Collections]]
