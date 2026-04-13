---
title: Reranking
type: concept
tags: [nlp, retrieval, rag, ranking, reranker]
created: 2026-04-13
updated: 2026-04-13
---

# Reranking

Reranking is a two-stage retrieval process where an initial retrieval pass using efficient but less accurate methods (typically bi-encoders) is followed by a more precise but computationally expensive reranking stage that re-orders the candidate set. This architecture balances recall and computational cost.

## The Retriever-Reranker Architecture

### Stage 1: Initial Retrieval

Given a query $q$ and document collection $\mathcal{D}$, the initial retriever produces a candidate set:

$$\mathcal{C} = \text{Top}_k(\{ \text{score}(q, d) : d \in \mathcal{D} \})$$

where typically $k \in [50, 1000]$. The retriever uses:
- Dense embeddings (bi-encoders)
- Sparse methods (BM25)
- Hybrid combinations

### Stage 2: Reranking

The reranker re-orders $\mathcal{C}$ using a more expressive scoring function:

$$\mathcal{R} = \text{Top}_m(\{ \text{rerank}(q, c) : c \in \mathcal{C} \})$$

where typically $m \in [5, 20]$ and $m \ll k$.

## Reranker Architectures

### Cross-Encoders

Cross-encoders process query-document pairs jointly:

$$s = f_\theta([\text{CLS}]; q; [\text{SEP}]; d; [\text{SEP}])$$

Where the full transformer attends to both query and document simultaneously, enabling rich cross-attention between query terms and document terms.

**Advantages:**
- Captures fine-grained query-document interactions
- Higher accuracy than bi-encoders
- Handles term overlap, negation, and complex relevance signals

**Disadvantages:**
- $O(k)$ inference cost per query (cannot pre-compute)
- Slower than bi-encoder retrieval

### Bi-Encoders (for comparison)

Bi-encoders encode query and document separately:

$$s = f(q) \cdot f(d)$$

**Advantages:**
- Pre-compute document embeddings for fast retrieval
- $O(1)$ scoring per document

**Disadvantages:**
- Cannot capture query-document term interactions
- Suffers from the "embedding space collapse" for fine-grained ranking

### Cross-Encoder Variants

#### MonoBERT / MonoT5

Fine-tuned BERT or T5 models for pointwise reranking:

$$\text{score}(q, d) = P(\text{relevant} | q, d)$$

#### ListNet / LambdaMART

Learning-to-rank approaches that optimize listwise objectives:

$$\mathcal{L} = -\sum_{i=1}^{k} \text{perm}_i \log \text{perm}_i$$

where $\text{perm}_i$ is the probability of ranking document $i$ at position 1.

## Mathematical Framework

### Cross-Attention Mechanism

In cross-encoders, the attention computation differs from bi-encoders:

$$A_{ij} = \text{Attention}(Q_i, K_j, V_j)$$

where query tokens from the query attend to all key-value pairs from the document, enabling:

$$\text{Attention}_{\text{cross}}(Q_q, K_d, V_d) = \text{softmax}\left(\frac{Q_q W^Q (K_d W^K)^\top}{\sqrt{d_k}}\right) V_d W^V$$

This allows query term "phone" to directly attend to document term "telephone" even in different positions.

### Score Decomposition

For complex queries, cross-encoders can capture:

1. **Exact match**: Query term found verbatim in document
2. **Synonymy**: Query term has semantic match in document  
3. **Paraphrase**: Query rewritten matches document content
4. **Negation**: Query negates document content (e.g., "no cheap hotels")

## Practical Implementation

### Cascade Pipeline

```
Query → [BM25/Dense Retrieval] → Top-100 candidates → [Cross-Encoder Reranker] → Top-10 → LLM
```

### Reranker Models

| Model | Type | Dimensions | Context | Notes |
|-------|------|------------|---------|-------|
| BGE-reranker-base | Cross-Encoder | 768 | 512 | High quality |
| BGE-reranker-v2-m3 | Cross-Encoder | 1024 | 8192 | Longer context |
| Cohere-rerank | Cross-Encoder | - | 4096 | API-based |
| monoT5 | Sequence-to-sequence | - | 512 | Generative |

## Integration with RAG

### Where Reranking Fits

1. **Before LLM dispatch**: Reduces token usage by selecting most relevant context
2. **After retrieval**: Re-orders initial results for better context selection
3. **Multi-stage**: Multiple reranking passes for complex information needs

### Impact on RAG Metrics

| Metric | Without Reranker | With Reranker |
|--------|------------------|---------------|
| Recall@10 | ~65% | ~85% |
| Precision@10 | ~40% | ~75% |
| Context length | 50k tokens | 15k tokens |

## Related Concepts

- [[Embeddings]]
- [[Retrieval-Augmented Generation]]
- [[Vector Database]]
- [[Scaled Dot-Product Attention]]

## Open Questions

- How to efficiently rerank when $k > 1000$?
- Can small language models replace cross-encoders?
- What is the optimal cascade (k, m) for different corpus sizes?
