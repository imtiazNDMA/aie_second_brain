---
title: Transformer
type: concept
tags: [deep-learning, architecture, nlp]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-13
---

# Transformer

Deep learning architecture relying entirely on attention mechanisms — no recurrence or convolution. Introduced in "Attention Is All You Need" (2017).

## Mathematical Foundation

### Input Representation

Given input sequence $\mathbf{X} = (x_1, x_2, ..., x_n)$ of tokens, each token $x_i$ is embedded:

$$\mathbf{e}_i = \mathbf{E}[x_i] + \mathbf{PE}_i$$

where $\mathbf{E} \in \mathbb{R}^{|V| \times d}$ is the learned embedding matrix and $\mathbf{PE}_i$ is the positional encoding.

### Encoder Block

Each encoder layer $l$ applies:

$$\mathbf{z}_l = \text{LayerNorm}(\mathbf{z}_{l-1} + \text{MHA}(\mathbf{z}_{l-1}))$$
$$\mathbf{z}_l' = \text{LayerNorm}(\mathbf{z}_l + \text{FFN}(\mathbf{z}_l))$$

where MHA is multi-head attention and FFN is the position-wise feed-forward network.

### Decoder Block

Decoder layers include encoder-decoder cross-attention:

$$\mathbf{z}_l = \text{LayerNorm}(\mathbf{z}_{l-1} + \text{MaskMHA}(\mathbf{z}_{l-1}))$$
$$\mathbf{z}_l = \text{LayerNorm}(\mathbf{z}_l + \text{CrossAttn}(\mathbf{z}_l, \mathbf{z}_{L}))$$
$$\mathbf{z}_l' = \text{LayerNorm}(\mathbf{z}_l + \text{FFN}(\mathbf{z}_l))$$

where $\mathbf{z}_{L}$ is the final encoder output.

### Feed-Forward Network

$$\text{FFN}(\mathbf{x}) = \mathbf{W}_2 \sigma(\mathbf{W}_1 \mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2$$

where $\sigma$ is ReLU activation. Typically $d_{\text{model}} = 512$, $d_{\text{ff}} = 2048$.

### Layer Normalization

$$\text{LayerNorm}(\mathbf{x}) = \gamma \odot \frac{\mathbf{x} - \mu}{\sqrt{\sigma^2 + \epsilon}} + \beta$$

where $\mu = \frac{1}{d} \sum_i x_i$ and $\sigma^2 = \frac{1}{d} \sum_i (x_i - \mu)^2$. Parameters $\gamma, \beta$ are learned.

## Architecture

- **Encoder:** Stack of [[Self-Attention]] + feed-forward blocks with residual connections and layer norm.
- **Decoder:** [[Self-Attention]] (masked) plus encoder-decoder attention, followed by feed-forward blocks.
- **Multi-Head Attention:** Parallel scaled dot-product heads capture different subspaces.
- **Feed-Forward Networks:** Position-wise MLPs applied to each token independently.
- **Residual Connections & Layer Norm:** Applied around each sub-layer to stabilize training.
- **Positional Encodings:** Sinusoidal or learned signals added to embeddings for order awareness.

## Computational Complexity

| Operation | Complexity | Sequential Operations |
|-----------|------------|----------------------|
| Self-Attention | $O(n^2 \cdot d)$ | $O(1)$ |
| Recurrent | $O(n \cdot d^2)$ | $O(n)$ |
| Convolution | $O(k \cdot n \cdot d)$ | $O(\log_k n)$ |

where $n$ is sequence length, $d$ is dimension, $k$ is kernel size.

## Variants

- **Encoder-only (BERT):** Masked language modeling [[Pretraining]]
- **Decoder-only (GPT):** Autoregressive next-token prediction
- **Encoder-Decoder (T5, BART):** Seq2seq tasks

## Related Concepts

- [[Attention Mechanism]]
- [[Self-Attention]]
- [[Multi-Head Attention]]
- [[Scaled Dot-Product Attention]]
- [[Positional Encoding]]
- [[Pretraining]]
- [[Fine-Tuning]]
