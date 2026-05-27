---
title: Advanced RAG
type: concept
tags: [rag, llm, optimization]
sources: [2026-04-29-rag-survey]
created: 2026-04-29
updated: 2026-04-29
---

# Advanced RAG

## Definition
The second paradigm of Retrieval-Augmented Generation that introduces specific optimizations to overcome Naive RAG limitations through pre-retrieval and post-retrieval strategies.

## Key Optimizations

### Pre-Retrieval Process
Improve the quality of indexed content and queries:

1. **Indexing Optimization**:
   - Sliding window approach for chunk overlap
   - Fine-grained segmentation
   - Metadata enhancement (timestamps, page numbers, categories)
   - Alignment optimization

2. **Query Optimization**:
   - **Query Rewriting**: Use LLM to reformulate unclear queries
   - **Query Expansion**: Multi-query generation via LLM
   - **Step-Back Prompting**: Abstract to high-level concepts
   - **HyDE**: Generate hypothetical documents for embedding similarity

### Post-Retrieval Process
Effectively integrate retrieved context:

1. **Reranking**: Use cross-encoders (BGE-reranker, Cohere) to reorder chunks
2. **Context Compression**:
   - LLMLingua: Remove unimportant tokens
   - PRCA: Train information extractor
   - RECOMP: Contrastive learning for compression
3. **Context Selection**: Filter to essential information only

## Comparison with Naive RAG

| Aspect | Naive RAG | Advanced RAG |
|--------|------------|---------------|
| Retrieval | Once, simple similarity | Optimized, multi-stage |
| Indexing | Fixed chunks | Enhanced with metadata |
| Query | Original query | Rewritten/expanded |
| Post-processing | None | Rerank, compress |

## Improvements Over Naive RAG
- Higher retrieval precision and recall
- Reduced hallucination
- Better handling of complex queries
- More relevant context selection

## Connections
- [[Retrieval-Augmented Generation]] — foundation
- [[Naive RAG]] — predecessor paradigm
- [[Modular RAG]] — next evolution
- [[Reranking]] — post-retrieval technique
- [[RAG Evaluation]] — measuring improvements

## Sources
- [[2026-04-29-rag-survey]]
