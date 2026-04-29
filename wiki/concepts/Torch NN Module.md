---
title: Torch NN Module
type: concept
tags: [pytorch, neural-networks, abstraction]
sources: [2026-04-12-deep-learning-with-pytorch.md, 2026-04-29-hands-on-ml-python.md]
created: 2026-04-29
updated: 2026-04-29
---

# Torch NN Module

PyTorch's base class for all neural network modules, providing a standardized interface for layer definitions, parameter management, and forward passes.

## Definition

`torch.nn.Module` is the base class for all neural network components in PyTorch. It provides mechanisms for parameter registration, device management, and defining the forward pass logic that transforms input tensors to outputs.

## Key Concepts

- **Forward Method**: Defines the computation performed when calling the module
- **Parameters**: Tensors that are automatically registered and can be optimized
- **Modules**: Nested modules are properly registered for parameter tracking
- **state_dict()**: Method to save/load model parameters
- **to(device)**: Moves module and parameters to specified device (CPU/GPU)

## Related Concepts

- [[PyTorch Tensor]] — Input/output data structure for modules
- [[Autograd]] — Enables gradient computation through module operations
- [[PyTorch]] — Framework providing the nn.Module class
- [[Linear Regression]] — Simple neural network can be built with nn.Linear

## Sources

- [[2026-04-12-deep-learning-with-pytorch.md]]: Fundamental building block in Deep Learning with PyTorch
- [[2026-04-29-hands-on-ml-python.md]]: Used to define custom neural network architectures

## Open Questions

- When to use nn.Module vs. functional API (nn.functional)?
- How to properly implement custom modules with learnable parameters?
