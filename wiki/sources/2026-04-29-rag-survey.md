---
title: RAG Survey for Large Language Models
type: source
authors: [Yunfan Gao, Yun Xiong, Xinyu Gao, Kangxiang Jia, Jinliu Pan, Yuxi Bi, Yi Dai, Jiawei Sun, Meng Wang, Haofen Wang]
tags: [rag, llm, survey, evaluation]
created: 2026-04-29
updated: 2026-04-29
---

# Retrieval-Augmented Generation for Large Language Models: A Survey

## Summary
Comprehensive survey mapping RAG evolution through three paradigms: Naive RAG, Advanced RAG, and Modular RAG. Covers 100+ studies, 26 tasks, 50 datasets.

## Key Takeaways

### RAG Paradigm Evolution

#### 1. Naive RAG
**Components**: Indexing → Retrieval → Generation ("Retrieve-Read")
**Limitations**:
- Retrieval: Poor precision/recall, missing crucial info
- Generation: Hallucinations, irrelevance, toxicity
- Augmentation: Redundancy, disjointed outputs

#### 2. Advanced RAG
**Pre-retrieval optimizations**:
- Query rewriting, expansion, step-back prompting
- Indexing: Sliding window, fine-grained segmentation, metadata

**Post-retrieval optimizations**:
- Reranking (Cohere, bge-reranker)
- Context compression (LLMLingua, PRCA, RECOMP)

#### 3. Modular RAG
**New modules**:
- **Search**: Adapts to search engines, databases, KGs
- **RAG-Fusion**: Multi-query with parallel searches
- **Memory**: Unbounded memory pool from LLM outputs
- **Adapter**: Task-specific prompt retrieval

**New patterns**:
- Rewrite-Retrieve-Read, Generate-Read, Recite-Read
- Hybrid retrieval (keyword + semantic + vector)
- Iterative and adaptive flows

### Retrieval Source Types
- **Unstructured**: Text (Wikipedia, corpora)
- **Semi-structured**: PDF (tables + text)
- **Structured**: Knowledge Graphs (verified, precise)
- **LLM-generated**: Model creates its own context

### Retrieval Granularity
- **Fine**: Token, Phrase, Sentence, Proposition
- **Coarse**: Chunk, Document
- **KG-based**: Entity, Triplet, Sub-Graph

### RAG vs. Other Methods

| Aspect | Prompt Engineering | Fine-Tuning | RAG |
|--------|-------------------|---------------|------|
| External Knowledge | Minimal | Internalized | Dynamic |
| Model Adaptation | Low | High (retraining) | Medium |
| Best For | Model capabilities | Style/format | Knowledge tasks |

### Evaluation Framework
**26 tasks, ~50 datasets** covering:
- **QA tasks**: SQuAD, DROP, HotpotQA, NQ
- **Reasoning**: Multi-hop, discrete reasoning
- **Generation**: Long-form, summarization

**Metrics**:
- **Retrieval**: Precision, recall, NDCG
- **Generation**: F1, ROUGE, BLEU, factual accuracy
- **RAG-specific**: Response adherence, relevance, context relevance

## Modular RAG Architectures
- ** restructuredRAG**: New module arrangements
- **RAG-Fusion**: Multiple query perspectives
- **AdaptiveRAG**: Autonomous retrieval decisions
- **Self-RAG**: Reflection tokens for control

## Connections
- [[Yunfan Gao]] — lead author, Fudan/Tongji University
- [[Haofen Wang]] — co-author, Tongji University professor
- [[Retrieval-Augmented Generation]] — core topic
- [[Modular RAG]] — new paradigm (see page)

## Related Concepts
- [[Naive RAG]] (early paradigm)
- [[Advanced RAG]] (enhanced paradigm)
- [[Modular RAG]] (new page created)
- [[RAG Evaluation]] (comprehensive coverage)
- [[Adaptive Retrieval]] (fits in Modular RAG)
