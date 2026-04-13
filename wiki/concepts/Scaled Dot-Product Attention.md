---
title: Scaled Dot-Product Attention
type: concept
tags: [attention, transformer, nlp]
sources: [2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-13
---

# Scaled Dot-Product Attention

## Definition

Computes attention weights by taking dot products between queries (Q) and keys (K), scaling by 1/√d_k, applying softmax to form weights, and multiplying by values (V). Forms the core attention primitive in the [[Transformer]].

## Mathematical Formulation

### Core Attention Computation

$$\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^\top}{\sqrt{d_k}}\right)\mathbf{V}$$

where:
- $\mathbf{Q} \in \mathbb{R}^{n_q \times d_k}$ — Query matrix
- $\mathbf{K} \in \mathbb{R}^{n_k \times d_k}$ — Key matrix
- $\mathbf{V} \in \mathbb{R}^{n_k \times d_v}$ — Value matrix
- $d_k$ — Key/query dimension (typically 64)

### The Scaling Factor

The scale $\sqrt{d_k}$ normalizes the variance:

$$\text{Var}[q \cdot k] = \mathbb{E}[q^2 k^2] - \mathbb{E}[qk]^2 = d_k \cdot \text{Var}[q] \cdot \text{Var}[k]$$

If $q, k \sim \mathcal{N}(0, 1)$, then $q \cdot k \sim \mathcal{N}(0, d_k)$. Without scaling, the softmax operates in the saturated regime where gradients vanish.

### Softmax as Attention Weights

$$\text{softmax}(\mathbf{x})_i = \frac{e^{x_i}}{\sum_{j=1}^{n} e^{x_j}}$$

The attention weights $a_i$ sum to 1, forming a weighted average of values.

### Matrix Form Derivation

For batch $b$ with sequences:
$$\mathbf{A} = \text{softmax}\left(\frac{1}{\sqrt{d_k}} \mathbf{Q}_b \mathbf{K}_b^\top\right)$$
$$\mathbf{O}_b = \mathbf{A} \mathbf{V}_b$$

Each row $i$ of $\mathbf{O}_b$ is: $\mathbf{o}_i = \sum_{j} a_{ij} \mathbf{v}_j$

## Motivation

- Scaling prevents very large dot products from saturating the softmax when d_k is large, preserving gradient quality.
- Easily vectorized via matrix multiplications, yielding high GPU efficiency.
- Enables parallel computation across all query positions.

## Variants

- **Additive attention:** Uses learned feed-forward networks instead of dot products.
- **Masked attention:** Sets disallowed positions to −∞ before softmax to enforce causality.

## Related Concepts

- [[Multi-Head Attention]]
- [[Self-Attention]]
- [[Attention Mechanism]]
- [[Transformer]]
