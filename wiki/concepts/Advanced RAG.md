---

title: Advanced RAG
type: concept
tags: [rag, llm, optimization, cluster/rag-retrieval]
sources: [2026-04-29-rag-survey, 2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]
created: 2026-04-29
updated: 2026-07-07
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

## Practical Failure Modes

[[2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]] frames advanced RAG as a response to concrete production failures:

- relevant chunks not retrieved because indexing, embedding choice, or document parsing is weak
- relevant chunks retrieved but pushed out of the top-k set
- correct evidence present but lost in excessive or noisy context
- answer format, specificity, citation, or completeness not matching the user's need
- stale knowledge bases, redundant corpora, privacy constraints, and scaling bottlenecks

It emphasizes a pipeline response: hierarchical indexing, hypothetical questions, [[HyDE]], context enrichment, query transformation, [[Hybrid Search]], query routing, reranking, citation tracking, chat-history handling, and context compression.

## Connections
- [[Retrieval-Augmented Generation]] — foundation
- [[Naive RAG]] — predecessor paradigm
- [[Modular RAG]] — next evolution
- [[Reranking]] — post-retrieval technique
- [[RAG Evaluation]] — measuring improvements

## Sources
- [[2026-04-29-rag-survey]]
