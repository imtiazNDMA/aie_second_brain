---
title: Positional Encoding
type: concept
tags: [deep-learning, transformer, nlp]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-13
---

# Positional Encoding

Injects sequence position information into token embeddings since attention has no inherent order understanding.

## Mathematical Formulation

### Sinusoidal Positional Encoding

The original Transformer uses fixed sinusoidal encodings:

$$\text{PE}_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$
$$\text{PE}_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

where $pos$ is position, $i$ is dimension index, $d_{\text{model}}$ is embedding dimension.

### Encoding as Rotation

The sinusoidal encoding can be viewed as rotation matrices:

$$\mathbf{PE}(pos) = \begin{bmatrix} \sin(\omega_0 \cdot pos) \\ \cos(\omega_0 \cdot pos) \\ \sin(\omega_1 \cdot pos) \\ \cos(\omega_1 \cdot pos) \\ \vdots \end{bmatrix}$$

where $\omega_k = \frac{1}{10000^{2k/d}}$. Frequencies form a geometric progression: $\omega_0 = \frac{1}{10000}$, $\omega_1 = \frac{1}{10000^{2/d}}$, etc.

### Properties

**Linear independence:** Each dimension uses a different frequency, enabling unique position representations.

**Extrapolation:** Sin/cos functions extend beyond training positions, allowing inference on longer sequences.

**Relative positions:** Using $\sin(pos - k)$ instead of $\sin(pos)$ enables relative position encoding.

### Rotary Position Embedding (RoPE)

RoPE encodes relative positions by rotating query and key vectors:

$$\mathbf{q}_i = \mathbf{W}_q \mathbf{x}_i \cdot \mathbf{R}_{\theta_i}, \quad \mathbf{k}_j = \mathbf{W}_k \mathbf{x}_j \cdot \mathbf{R}_{\theta_j}$$

where $\mathbf{R}_{\theta} = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$ is a 2D rotation matrix.

The attention score becomes:
$$\mathbf{q}_i \cdot \mathbf{k}_j = \mathbf{x}_i^\top \mathbf{W}_q^\top \mathbf{R}_{\theta_i - \theta_j} \mathbf{W}_k \mathbf{x}_j$$

This depends only on relative position $i-j$.

## Methods

- **Sinusoidal:** Fixed embeddings using sin/cos at different frequencies ([[Transformer]] uses wavelengths forming a geometric progression, enabling extrapolation to longer sequences).
- **Learned:** Trainable position embeddings added to token embeddings during training.
- **RoPE (Rotary Position Embedding):** Applies rotations in query/key space — used in LLaMA, Mistral.
- **Absolute vs Relative encodings:** Later [[Transformer]] variants incorporate relative positions to improve generalization.

## Related Concepts

- [[Transformer]]
- [[Attention Mechanism]]
- [[Embeddings]]
