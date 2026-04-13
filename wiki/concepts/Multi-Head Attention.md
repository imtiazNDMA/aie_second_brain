---
title: Multi-Head Attention
type: concept
tags: [attention, transformer, nlp]
sources: [2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-13
---

# Multi-Head Attention

## Definition

Extension of scaled dot-product attention where queries, keys, and values are linearly projected into multiple subspaces ("heads"). Each head performs attention independently; their outputs are concatenated and projected back to the model dimension.

## Mathematical Formulation

### Single Head Computation

For head $h$, we compute:
$$\mathbf{Q}_h = \mathbf{Q}\mathbf{W}_h^Q, \quad \mathbf{K}_h = \mathbf{K}\mathbf{W}_h^K, \quad \mathbf{V}_h = \mathbf{V}\mathbf{W}_h^V$$

where $\mathbf{W}_h^Q, \mathbf{W}_h^K \in \mathbb{R}^{d_{\text{model}} \times d_k}$ and $\mathbf{W}_h^V \in \mathbb{R}^{d_{\text{model}} \times d_v}$.

The attention output for head $h$:
$$\text{head}_h = \text{Attention}(\mathbf{Q}_h, \mathbf{K}_h, \mathbf{V}_h) = \text{softmax}\left(\frac{\mathbf{Q}_h \mathbf{K}_h^\top}{\sqrt{d_k}}\right) \mathbf{V}_h$$

### Multi-Head Concatenation

With $h$ heads, outputs are concatenated:
$$\text{MultiHead}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{Concat}(\text{head}_1, ..., \text{head}_h) \mathbf{W}^O$$

where $\mathbf{W}^O \in \mathbb{R}^{h \cdot d_v \times d_{\text{model}}}$ is the output projection.

### Parameter Budget

If $d_{\text{model}} = 512$ and $h = 8$:
- Per-head dimension: $d_k = d_v = 64$
- Total key/value dimensions: $h \cdot d_k = 512$
- This matches single-head attention's $O(n^2 \cdot d_{\text{model}})$ complexity

### Intuition: Multiple Representation Subspaces

Each head learns to attend to different aspects:

| Head Type | What it captures |
|-----------|-----------------|
| Local | Nearby tokens, phrases |
| Global | Long-range dependencies |
| Syntactic | Grammar, subject-verb relations |
| Semantic | Entity relationships, coreference |

The model can combine these through learned projections.

## Benefits

- Allows the model to capture relationships from different representation subspaces simultaneously.
- Mitigates averaging effects of single-head attention by letting heads focus on distinct positions or features.
- Keeps computation comparable to single-head attention by reducing per-head dimensionality (e.g., d_model/h).

## Usage

- Encoder [[Self-Attention]], decoder self-attention, and encoder-decoder cross-attention each use multi-head layers.
- Masking can be applied per head to enforce causality in decoders.

## Related Concepts

- [[Scaled Dot-Product Attention]]
- [[Self-Attention]]
- [[Transformer]]
