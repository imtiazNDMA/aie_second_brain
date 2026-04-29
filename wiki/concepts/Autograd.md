---
tags: [autograd, gradients, pytorch]
sources: [2026-04-12-deep-learning-with-pytorch, 2026-04-16-deep-learning-with-pytorch-step-by-step]
created: 2026-04-12
updated: 2026-04-16
---

# Autograd

## Definition

[[PyTorch]]’s automatic differentiation engine. It records tensor operations during eager execution and, on `.backward()`, traverses the dynamic graph to compute gradients with respect to inputs/parameters.

## Mechanics

- Builds the computation graph incrementally as tensors participate in operations.
- Supports dynamic control flow: each forward pass can generate a different graph.
- Provides `.grad` fields on tensors and integrates with optimizers in `torch.optim`.
- TorchScript can capture the graph for optimized execution while preserving gradient semantics.

## Related Concepts

- [[PyTorch]]
- [[PyTorch Tensor]]
- [[Torch NN Module]]
