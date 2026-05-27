---
title: Cache-Augmented Generation
type: concept
tags: [cag, rag, kv-cache, long-context, inference-optimization]
sources: [2026-05-09-cache-augmented-generation]
created: 2026-05-09
updated: 2026-05-09
---

# Cache-Augmented Generation

## Definition

**Cache-Augmented Generation (CAG)** is an alternative to [[Retrieval-Augmented Generation]] for knowledge tasks where the entire reference corpus fits within a long-context model's window. Instead of retrieving documents per query, CAG preloads the corpus once, captures the resulting [[KV Cache]], and reuses that cache as a frozen substrate for all subsequent queries.

## The three-phase paradigm

Following [[2026-05-09-cache-augmented-generation]] (Chan et al., WWW 2025):

### 1. External knowledge preloading

Concatenate the entire reference corpus $D = \{d_1, d_2, ..., d_n\}$ into a single sequence. Run the LLM forward once over this sequence:

$$C_{KV} = M(D)$$

where $M$ is the model and $C_{KV}$ is the resulting key-value tensor cache (one $(K, V)$ pair per attention layer per token). Persist $C_{KV}$ to disk.

### 2. Inference

For each query $q$:

$$y = M(q \mid C_{KV})$$

The model attends over $C_{KV}$ as if it had just generated it, then produces the answer over the appended query tokens. **No retrieval, no embedding lookup, no document selection.**

### 3. Cache reset

After answering, truncate the appended query tokens (keeping only $C_{KV}$ for the corpus). The cache is reusable across an arbitrary number of queries; only the per-query suffix is recomputed.

## What CAG eliminates vs. RAG

| RAG cost | CAG status |
|----------|------------|
| Vector index build | not needed |
| Per-query embedding | not needed |
| Top-k retrieval latency | not needed |
| Reranking | not needed |
| Chunking strategy choice | not needed (no chunks) |
| Document-selection error | impossible (model sees everything) |

What CAG adds:
- One-time corpus encoding (often minutes to hours for large corpora)
- KV-cache storage (proportional to corpus length × model layers × hidden dim × 2)
- Long-context model requirement (typically ≥128K tokens, often more)

## When CAG is the right choice

CAG dominates RAG when **all** of these hold:

1. **Bounded corpus** — fits within the model's context window (≤2M tokens for current frontier models).
2. **Stable corpus** — knowledge changes rarely enough that full cache rebuild is acceptable.
3. **High query volume** — amortizes the one-time encoding cost.
4. **Sensitivity to retrieval errors** — the cost of mis-retrieving a critical document outweighs the cost of long-context inference.

Examples: product manuals, internal documentation, codebase Q&A, regulatory texts, customer-support corpora, clinical guidelines for a specific specialty.

## When RAG remains required

- Open-domain web search
- Multi-tenant systems with per-user document scopes
- Highly dynamic knowledge (news, real-time data)
- Corpora exceeding any feasible context window

## Hybrid patterns

The space between RAG and CAG is not binary. Practical systems can combine:

- **CAG + light RAG** — preload core docs, retrieve only for tail topics
- **Hierarchical CAG** — multiple cached scopes selected by a routing query
- **CAG with cache-tier** — frequently-accessed sub-caches in faster memory

## Mathematical view: amortized cost

Let $L_{prefill}$ be the cost to encode the corpus once and $L_{per\_query}$ the cost to attend over the cached state plus generate the answer. Over $N$ queries:

$$\text{CAG total} = L_{prefill} + N \cdot L_{per\_query}$$
$$\text{RAG total} = N \cdot (L_{retrieve} + L_{rerank} + L_{generate})$$

CAG wins when $L_{prefill} / N + L_{per\_query} < L_{retrieve} + L_{rerank} + L_{generate}$. As $N$ grows the prefill amortizes to zero; the comparison reduces to whether the long-context inference path is cheaper than the retrieval-plus-short-context path.

## Failure modes

- **Context dilution** — at very long contexts, attention quality degrades and answers drift toward generic responses. The "lost in the middle" effect can cause CAG to miss information that RAG (with its top-k filter) would surface explicitly.
- **Cache invalidation** — if a single document changes, the entire cache must be rebuilt. Differential rebuild is an open research problem.
- **Memory cost** — KV caches for million-token corpora exceed 100 GB at full precision; quantization and offload strategies become essential.

## Related Concepts

- [[Retrieval-Augmented Generation]] — paradigm-level counterpart
- [[KV Cache]] — foundational substrate
- [[Long Context Models]] — enabling assumption
- [[Inference Optimization]] — broader latency framing
- [[Paged Attention]] — KV-cache management technique
- [[Modular RAG]] — alternative composition style
- [[RAG Architecture Decision Guide]] — selection criterion (corpus size threshold)

## Sources

- [[2026-05-09-cache-augmented-generation]] — Chan et al., "Don't Do RAG: When Cache-Augmented Generation is All You Need", WWW 2025

## Open Questions

- What's the practical corpus-size ceiling at which CAG becomes infeasible on commodity hardware?
- Can KV-cache compression bring CAG within reach of larger corpora without quality loss?
- How does CAG quality degrade as the corpus approaches the context-window limit?
- For mixed-stable / dynamic corpora, what's the right hybrid CAG+RAG composition?
