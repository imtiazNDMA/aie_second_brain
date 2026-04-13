---
title: DoRA (Dimension-wise Offset of Residual Adapter)
type: concept
tags: [fine-tuning, adapters, peft]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-13
updated: 2026-04-13
---

# DoRA (Dimension-wise Offset of Residual Adapter)

## Definition

DoRA augments LoRA-style adapters by learning separate direction and magnitude parameters for each dimension of the weight update. Instead of a single low-rank matrix, DoRA factorizes updates into normalized direction vectors and per-dimension scaling coefficients, capturing richer adaptations without full-rank fine-tuning.

## Mechanics

- Decompose a weight delta $\Delta W$ into direction $\mathbf{u}$ (unit norm) and element-wise magnitude $\mathbf{s}$.
- Train $\mathbf{u}$ via low-rank adapters (similar to LoRA) while learning $\mathbf{s}$ as a lightweight diagonal matrix.
- Combine during inference: $W' = W + \operatorname{diag}(\mathbf{s}) \cdot \mathbf{u}$.
- Enables finer control over feature dimensions, improving accuracy on instruction tuning and domain adaptation reported in [[2026-04-12-ultimate-guide-fine-tuning]].

## When to Use

- Hardware-constrained scenarios where LoRA is baseline but higher fidelity is needed.
- Tasks requiring small but precise adjustments (alignment, safety, instruction following).
- Pipelines mixing multiple adapters (Mixture-of-Experts / Mixture-of-Agents) needing orthogonalized updates.

## Related Concepts

- [[Low-Rank Adaptation]]
- [[Half Fine-Tuning]]
- [[Parameter-Efficient]]
