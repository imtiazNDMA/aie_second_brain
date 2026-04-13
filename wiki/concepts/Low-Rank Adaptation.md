---
title: Low-Rank Adaptation
type: concept
tags: [fine-tuning, peft, efficiency]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-12
updated: 2026-04-13
---

# Low-Rank Adaptation

## Definition

[[Parameter-Efficient]] [[Fine-Tuning]] (PEFT) method that injects trainable low-rank matrices into [[Transformer]] weight updates, drastically reducing the number of adjusted parameters.

## Mathematical Formulation

### LoRA Architecture

For a pre-trained weight matrix $\mathbf{W}_0 \in \mathbb{R}^{d \times k}$, LoRA adds a low-rank update:

$$\mathbf{W} = \mathbf{W}_0 + \mathbf{B}\mathbf{A}$$

where:
- $\mathbf{A} \in \mathbb{r}^{r \times k}$ — down projection
- $\mathbf{B} \in \mathbb{R}^{d \times r}$ — up projection
- $r \ll \min(d, k)$ — rank (typically 8, 16, 32, 64)

The forward pass with LoRA:
$$\mathbf{h} = \mathbf{W}_0 \mathbf{x} + \mathbf{B}\mathbf{A}\mathbf{x}$$

### Gradient Flow

Only $\mathbf{A}$ and $\mathbf{B}$ are trainable. Gradients during backprop:

$$\frac{\partial \mathcal{L}}{\partial \mathbf{A}} = \mathbf{B}^\top \frac{\partial \mathcal{L}}{\partial \mathbf{h}} \mathbf{x}^\top$$
$$\frac{\partial \mathcal{L}}{\partial \mathbf{B}} = \frac{\partial \mathcal{L}}{\partial \mathbf{h}} \mathbf{x}^\top \mathbf{A}^\top$$

### Parameter Count

| Matrix | Dimensions | Parameters |
|--------|------------|------------|
| Full fine-tune | $d \times k$ | $dk$ |
| LoRA | $d \times r + r \times k$ | $r(d + k)$ |

For $d=k=4096$ (Llama-7B):
- Full fine-tune: $16,777,216$ parameters
- LoRA ($r=16$): $131,584$ parameters (99.2% reduction)

### Combined with Quantization (QLoRA)

QLoRA adds quantized backbone:
$$\mathbf{W}_0 = Q(\mathbf{W}_0^{\text{4-bit}}), \quad \text{train } \mathbf{A}, \mathbf{B}$$

The gradient requires dequantization during backward pass.

### Variants

- **LoRA+:** Sets different learning rates for $\mathbf{A}$ and $\mathbf{B}$
- **DoRA:** Combines LoRA with weight decomposition
- **LoRA $^:$** SVD-based rank adaptation

## Related Concepts

- [[QLoRA]]
- [[Half Fine-Tuning]]
