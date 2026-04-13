---
title: QLoRA
type: concept
tags: [fine-tuning, quantization, peft]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-12
updated: 2026-04-13
---

# QLoRA

## Definition

Quantized Low-Rank Adaptation that combines 4-bit quantization with low-rank adapters, enabling [[Fine-Tuning]] of large models on commodity GPUs while preserving accuracy.

## Mathematical Formulation

### Quantization

Quantize weights from float32 to 4-bit using a quantization function $Q(\cdot)$:

$$\mathbf{W}_Q = Q(\mathbf{W}_{32}), \quad \mathbf{W}_Q \in \{0, 1, ..., 15\}^n$$

The 4-bit representation uses a codebook:
$$\mathbf{W}_{32} \approx \mathbf{c} \cdot \mathbf{L}^{-1}$$

where $\mathbf{c}$ contains the 16 codebook values and $\mathbf{L}$ contains the learned linear transformation.

### Dequantization for Forward Pass

During forward pass with LoRA, quantized weights are dequantized:
$$\mathbf{h} = \mathbf{W}_Q \mathbf{x} + \mathbf{B}\mathbf{A}\mathbf{x}$$

The gradient $\frac{\partial \mathcal{L}}{\partial \mathbf{W}_Q}$ requires:
$$\frac{\partial \mathcal{L}}{\partial \mathbf{W}_Q} = \frac{\partial \mathcal{L}}{\partial \mathbf{h}} \mathbf{x}^\top \cdot \frac{\partial \mathbf{W}_Q}{\partial \mathbf{W}_{32}}$$

### LoRA with Quantization

QLoRA trains only $\mathbf{A}$ and $\mathbf{B}$ while keeping $\mathbf{W}_Q$ frozen:

| Component | Precision | Parameters |
|-----------|-----------|------------|
| Base model $\mathbf{W}_Q$ | 4-bit | 0 (frozen) |
| LoRA $\mathbf{A}, \mathbf{B}$ | 16-bit float | $r(d + k)$ |
| Embeddings | 16-bit float | $\|V\| \cdot d$ |

### Memory Analysis

For a model with $N$ parameters at 4-bit:
- Quantized storage: $N \cdot \frac{4}{32} = \frac{N}{8}$ bytes
- For 70B model: 35GB → 8.75GB

Training memory with gradients:
- Activations: $O(\text{batch\_size} \cdot \text{seq\_len}^2 \cdot d_{\text{model}})$
- Optimizer states (Adam): $2 \cdot N \cdot 4$ bytes (float32)
- With QLoRA: Only LoRA params need optimizer states

### Quantization Error

The quantization error affects final accuracy:
$$\epsilon = \mathbf{W} - Q(\mathbf{W})$$

Training LoRA compensates for this error:
$$\mathbf{h} = (\mathbf{W} - \epsilon + \mathbf{B}\mathbf{A})\mathbf{x}$$

## Key Points

- Stores base model weights in low-bit precision, training only adapter parameters in higher precision.
- Recommended for constrained hardware scenarios before escalating to full fine-tunes.

## Related Concepts

- [[Low-Rank Adaptation]]
- [[Fine-Tuning]]
- [[Embeddings]]
