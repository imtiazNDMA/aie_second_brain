---
title: PyTorch Tensor
type: concept
tags: [pytorch, tensor, data-structure]
sources: [2026-04-12-deep-learning-with-pytorch.md, 2026-04-29-hands-on-ml-python.md]
created: 2026-04-29
updated: 2026-04-29
---

# PyTorch Tensor

A multi-dimensional array class in PyTorch that provides GPU-accelerated computing and automatic differentiation support.

## Definition

Tensors are the fundamental data structure in PyTorch, similar to NumPy arrays but with additional capabilities for automatic differentiation and GPU acceleration. They form the foundation for building and training neural networks.

## Key Concepts

- **Multi-dimensional Arrays**: Support for 0D to N-dimensional data
- **GPU Acceleration**: Seamless transfer between CPU and CUDA devices
- **Gradient Tracking**: `requires_grad=True` enables automatic differentiation
- **Broadcasting**: Automatic shape alignment for element-wise operations
- **In-place Operations**: Methods ending with `_` modify tensors directly

## Related Concepts

- [[PyTorch]] — Framework that provides tensor operations
- [[Autograd]] — Automatic differentiation engine for tensors
- [[Torch NN Module]] — Neural network layers built on tensors
- [[Linear Regression]] — Often uses tensors for data representation

## Sources

- [[2026-04-12-deep-learning-with-pytorch.md]]: Core data structure in Deep Learning with PyTorch
- [[2026-04-29-hands-on-ml-python.md]]: Used for representing training data in Hands-on ML with Python

## Open Questions

- When to use tensor operations vs. NN module abstractions?
- How does memory management work with large tensors on GPU?
