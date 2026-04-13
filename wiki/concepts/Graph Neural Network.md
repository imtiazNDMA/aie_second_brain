---
title: Graph Neural Network
type: concept
tags: [deep-learning, graphs]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-12
updated: 2026-04-13
---

# Graph Neural Network

## Definition

Neural architectures that operate on graph-structured data using message passing among nodes/edges.

## Mathematical Formulation

### Graph Representation

A graph $\mathcal{G} = (\mathcal{V}, \mathcal{E})$ with:
- $\mathcal{V} = \{v_1, ..., v_N\}$ — nodes
- $\mathcal{E} \subseteq \mathcal{V} \times \mathcal{V}$ — edges
- $\mathbf{A} \in \{0, 1\}^{N \times N}$ — adjacency matrix
- $\mathbf{X} \in \mathbb{R}^{N \times d}$ — node features

### Message Passing Framework

For node $v$, at layer $l$:

$$h_v^{(l+1)} = \text{UPDATE}\left(h_v^{(l)}, \text{AGG}\left(\{m(u \to v) : u \in \mathcal{N}(v)\}\right)\right)$$

where $m(u \to v)$ is message from neighbor $u$ to $v$.

### Graph Convolutional Network (GCN)

$$h_v^{(l+1)} = \sigma\left(\mathbf{W}^{(l)} \cdot \text{AGG}\left(\{h_u^{(l)} : u \in \mathcal{N}(v) \cup \{v\}\}\right)\right)$$

**Mean aggregation:**
$$h_v^{(l+1)} = \sigma\left(\mathbf{W}^{(l)} \cdot \frac{1}{|\mathcal{N}(v)|+1} \sum_{u \in \mathcal{N}(v) \cup \{v\}} h_u^{(l)}\right)$$

**Matrix form:**
$$\mathbf{H}^{(l+1)} = \sigma\left(\tilde{\mathbf{D}}^{-\frac{1}{2}} \tilde{\mathbf{A}} \tilde{\mathbf{D}}^{-\frac{1}{2}} \mathbf{H}^{(l)} \mathbf{W}^{(l)}\right)$$

where $\tilde{\mathbf{A}} = \mathbf{A} + \mathbf{I}}$ and $\tilde{D}_{ii} = \sum_j \tilde{A}_{ij}$.

### GraphSAGE

Learn aggregation functions from data:

$$h_v^{(l+1)} = \sigma\left(\mathbf{W}^{(l)} \cdot \text{CONCAT}(h_v^{(l)}, \text{AGG}(\{h_u^{(l)} : u \in \mathcal{N}(v)\})\right)$$

**Aggregation options:**

| Aggregator | Formula |
|------------|---------|
| Mean | $\frac{1}{|\mathcal{N}|} \sum_{u \in \mathcal{N}} h_u$ |
| LSTM | $\text{LSTM}(\{h_u : u \in \mathcal{N}\})$ |
| Pool | $\max(\mathbf{W} h_u)$ |

### Graph Attention Networks (GAT)

Attention-weighted aggregation:

$$h_v^{(l+1)} = \sigma\left(\sum_{u \in \mathcal{N}(v) \cup \{v\}} \alpha_{vu} \mathbf{W}^{(l)} h_u^{(l)}\right)$$

where:
$$\alpha_{vu} = \frac{\exp(\text{LeakyReLU}(a^T [\mathbf{W} h_v \| \mathbf{W} h_u]))}{\sum_{w \in \mathcal{N}(v) \cup \{v\}} \exp(\text{LeakyReLU}(a^T [\mathbf{W} h_v \| \mathbf{W} h_w]))}$$

### Spectral Graph Convolution

Using graph Fourier transform:

$$g_\theta * \mathbf{x} = g_\theta(\mathbf{L}) \mathbf{x} = \mathbf{U} g_\theta(\mathbf{\Lambda}) \mathbf{U}^\top \mathbf{x}$$

where:
- $\mathbf{L} = \mathbf{I} - \mathbf{D}^{-\frac{1}{2}} \mathbf{A} \mathbf{D}^{-\frac{1}{2}}$ — normalized Laplacian
- $\mathbf{L} = \mathbf{U} \mathbf{\Lambda} \mathbf{U}^\top$ — eigendecomposition
- $g_\theta(\mathbf{\Lambda})$ — learned filter in spectral domain

### Variants

- **GCN:** Spectral method with mean aggregation
- **GraphSAGE:** Inductive learning with learnable aggregators
- **GAT:** Attention-based message weighting
- **Message Passing Neural Networks:** General framework

## Related Concepts

- [[Transformer]]
- [[Scaled Dot-Product Attention]]
- [[Variational Inference]]
