---
title: Hybrid Search
type: concept
tags: [retrieval, search, rag, bm25, vector-search, hybrid]
sources: [2026-04-29-rag-survey, 2026-04-12-rag-driven-generative-ai]
created: 2026-05-09
updated: 2026-05-09
---

# Hybrid Search

## Definition

**Hybrid search** combines lexical (sparse, keyword-based) retrieval — typically [[BM25]] — with semantic (dense, embedding-based) retrieval over the same corpus, then fuses the two ranked lists into a single result. Hybrid search exists because pure vector retrieval loses on exact-match queries (acronyms, version numbers, error codes, person names) while pure lexical retrieval loses on paraphrases and synonyms. Hybrid bypasses the choice.

## Why neither side alone is enough

| Query | Lexical (BM25) | Semantic (vector) |
| --- | --- | --- |
| "Llama 3.1 8B context length" | Wins — exact term match | Often misses; embeddings smear version numbers |
| "How do I prevent the model from making things up?" | Loses — no overlapping terms with "hallucination mitigation" docs | Wins — paraphrase-tolerant |
| "ERROR: CUDA OOM" | Wins — error-code match | Often loses — embedding may not preserve string |
| "What's the best way to fine-tune for my domain?" | Mixed | Wins — semantic |

Production corpora typically contain both query types. Without hybrid, you ship a system that systematically fails on one class.

## Fusion methods

### Reciprocal Rank Fusion (RRF)

The simplest and most popular fusion method. For a document $d$ appearing at rank $r_i(d)$ in retriever $i$:

$$\text{RRF}(d) = \sum_i \frac{1}{k + r_i(d)}$$

where $k$ is a constant (typically 60). RRF is rank-based, requires no score calibration, and works robustly across retrievers with very different score scales. It's the substrate of [[RAG-Fusion]].

### Score normalization + linear combination

$$\text{score}(d) = \alpha \cdot \tilde{s}_\text{lex}(d) + (1 - \alpha) \cdot \tilde{s}_\text{vec}(d)$$

where $\tilde{s}$ are min-max or z-score normalized. Tunable but sensitive to score-scale drift; needs validation per corpus.

### Learned fusion (cross-encoder rerank)

Run both retrievers, take union of top-K from each, rerank everything with a strong cross-encoder. Strictly better than score combination at higher cost. Standard production pattern when latency budget allows.

## Implementation patterns

| Vector store | Built-in hybrid? | How |
| --- | --- | --- |
| [[Weaviate]] | Yes (first-class) | Configure schema; weighted alpha parameter |
| [[Qdrant]] | Yes | Sparse vectors + dense vectors in one collection |
| [[Pinecone]] | Yes (sparse-dense) | Separate sparse encoder (e.g., SPLADE); both indexed |
| [[Meilisearch]] | Yes | Native both modes |
| [[Chroma]] | Limited | DIY |
| [[Faiss]] | Library — DIY | Combine with separate inverted index |
| Postgres + pgvector | DIY | `pg_trgm` / `tsvector` + pgvector; combine with RRF in SQL |

For Postgres + pgvector deployments (this repo's stack), the standard recipe is:
1. Maintain a `tsvector` column for full-text search
2. Maintain an `embedding` column with pgvector
3. Run two queries; merge with RRF in application code (or a SQL window function)

## Sparse-vector encoders (the modern lexical side)

Classical [[BM25]] is the strongest baseline. Modern sparse-vector encoders (SPLADE, SPLADE++, uniCOIL) learn term-weight vectors that capture some semantic information while remaining sparse — narrowing the lexical/semantic gap. They can plug into vector stores with sparse-vector support.

## When hybrid is required

- **Technical documentation** — version numbers, API names, error codes
- **Code search** — function names, identifiers
- **Legal / medical** — exact terminology matters
- **Product catalogs** — SKUs, model numbers, brand names
- **Q&A with specific entities** — named entities should match exactly

## When pure vector is fine

- **Conceptual / academic content** — paraphrases dominate
- **Conversational FAQs** — semantic match is the point
- **Cross-lingual retrieval** — vectors carry meaning across languages

For most production RAG systems the answer is "use hybrid by default, the cost is small."

## Cost / latency

- **Indexing cost** — roughly 2× a vector-only setup (two indices to maintain)
- **Query latency** — typically +10–30ms; both indices queried in parallel
- **Storage** — ~2× (sparse index is small; vector index dominates)

The latency overhead is small enough that most production systems run hybrid permanently.

## Related Concepts

- [[BM25]] — the canonical lexical scoring function
- [[Vector Database]] — the substrate for the dense side
- [[Embeddings]] — the representation behind vector retrieval
- [[Reranking]] — the layer that often sits on top of hybrid retrieval
- [[RAG-Fusion]] — multi-query variant that uses RRF for paraphrase fusion
- [[Retrieval-Augmented Generation]] — the parent system
- [[Pre-Retrieval Techniques for RAG]] — synthesis covering input-side improvements
- [[Vector Database Selection Guide]] — synthesis covering substrate choice

## Sources

- [[2026-04-29-rag-survey]] — Gao et al. emphasize hybrid as production default
- [[2026-04-12-rag-driven-generative-ai]] — practical RAG recipes

## Open Questions

- Optimal RRF $k$ for technical-document corpora
- When learned sparse encoders (SPLADE) beat BM25 in practice
- Hybrid + cross-encoder rerank vs. just cross-encoder over a wider lexical-recall pool
