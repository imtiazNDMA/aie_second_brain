---
title: Embeddings
type: concept
tags: [nlp, machine-learning, vectors, retrieval]
created: 2026-04-13
updated: 2026-04-13
---

# Embeddings

Embeddings are dense, low-dimensional vector representations of discrete objects (words, sentences, documents, images, entities) that capture semantic meaning in a continuous vector space. The fundamental principle is that similar items should have similar vectors.

## Mathematical Foundation

### The Embedding Function

An embedding function $f: \mathcal{X} \rightarrow \mathbb{R}^d$ maps objects from some discrete domain $\mathcal{X}$ to a $d$-dimensional real vector space. The goal is to learn $f$ such that:

$$\text{similarity}(x_1, x_2) \approx \cos(\theta) = \frac{f(x_1) \cdot f(x_2)}{\|f(x_1)\| \|f(x_2)\|}$$

where $\cos(\theta)$ is the cosine similarity between the embedding vectors.

### Training Objectives

#### Skip-gram and CBOW (Word2Vec)

Given a center word $w_t$ and context words $w_{t-j}, ..., w_{t+j}$, the **Skip-gram** objective maximizes:

$$\mathcal{L} = \sum_{j=-c}^{c} \log P(w_{t+j} | w_t)$$

where $P(w_{t+j} | w_t) = \sigma(v_{w_{t+j}} \cdot u_{w_t})$ and $\sigma(x) = \frac{1}{1 + e^{-x}}$ is the sigmoid function.

The **CBOW** objective maximizes:

$$\mathcal{L} = \log P(w_t | w_{t-c}, ..., w_{t+c})$$

#### Contrastive Learning

Modern embedding models often use contrastive loss. Given positive pairs $(i, j)$ and negative pairs $(i, k)$:

$$\mathcal{L} = -\log \frac{\exp(\text{sim}(z_i, z_j) / \tau)}{\sum_{k \neq i} \exp(\text{sim}(z_i, z_k) / \tau)}$$

where $\tau$ is a temperature parameter and $\text{sim}(a, b) = \frac{a \cdot b}{\|a\| \|b\|}$.

### Embedding Spaces

#### Orthogonality and Basis

In a $d$-dimensional embedding space, we can express any embedding vector as a linear combination of basis vectors:

$$\mathbf{v} = \sum_{i=1}^{d} v_i \mathbf{e}_i$$

where $\{ \mathbf{e}_1, \mathbf{e}_2, ..., \mathbf{e}_d \}$ forms an orthonormal basis. The embedding dimensions represent learned semantic features, though often not interpretable individually.

#### Distance Metrics

Common distance/similarity measures in embedding space:

| Metric | Formula | Use Case |
|--------|---------|----------|
| Cosine Similarity | $\frac{A \cdot B}{\|A\|\|B\|}$ | Semantic similarity |
| Euclidean Distance | $\sqrt{\sum (a_i - b_i)^2}$ | Absolute proximity |
| Dot Product | $A \cdot B$ | Relevance scoring |

## Types of Embeddings

### Dense Embeddings

Modern NLP uses dense embeddings where most dimensions have non-zero values. Examples:

- **BERT-based**: $\text{BERT}_{\text{base}}$ produces 768-dimensional vectors
- **Specialized**: BGE, E5, Voyage AI produce optimized semantic vectors

### Sparse Embeddings

Traditional methods like TF-IDF and BM25 produce sparse vectors (high dimensional, mostly zeros). Often combined with dense embeddings in hybrid retrieval systems.

## Retrieval Applications

In RAG pipelines, embeddings enable semantic retrieval:

1. **Indexing**: $\text{documents} \xrightarrow{f} \text{vectors} \xrightarrow{\text{index}} \text{vector database}$
2. **Query**: $\text{query} \xrightarrow{f} \text{query vector}$
3. **Retrieval**: $\text{argtop}_k \cos(\text{query vector}, \text{document vectors})$

### Approximate Nearest Neighbors (ANN)

For large-scale retrieval, exact search is expensive. ANN algorithms trade recall for speed:

- **HNSW**: Hierarchical Navigable Small World graphs
- **IVF**: Inverted File indexes with clustering
- **PQ**: Product Quantization for compression

## Related Concepts

- [[Vector Database]]
- [[Retrieval-Augmented Generation]]
- [[Transformer]]
- [[Scaled Dot-Product Attention]]
- [[Reranking]]

## Open Questions

- How to handle embedding drift over time as models update?
- What is the optimal dimension count for specific use cases?
- How to effectively compress embeddings for edge deployment?
