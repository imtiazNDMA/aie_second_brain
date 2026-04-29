---
title: Autograd
type: concept
tags: [pytorch, automatic-differentiation, backpropagation]
sources: [2026-04-12-deep-learning-with-pytorch.md, 2026-04-29-hands-on-ml-python.md]
created: 2026-04-29
updated: 2026-04-29
---

# Autograd

PyTorch's automatic differentiation engine that automatically computes gradients for tensor operations, enabling backpropagation for neural network training.

## Definition

Autograd records all operations on tensors with `requires_grad=True` in a computational graph, then uses reverse-mode automatic differentiation (backpropagation) to compute gradients when `.backward()` is called.

## Key Concepts

- **Computational Graph**: Dynamic graph built during forward pass
- **requires_grad**: Flag that enables gradient tracking for a tensor
- **backward()**: Triggers gradient computation and storage in `.grad` attributes
- **torch.no_grad()**: Context manager to disable gradient tracking during inference
- **Detach**: Creates a new tensor without gradient history

## Related Concepts

- [[PyTorch Tensor]] — Tensors that autograd operates on
- [[PyTorch]] — Framework containing autograd engine
- [[Backpropagation]] — Algorithm that autograd implements
- [[Torch NN Module]] — Uses autograd for training neural networks

## Sources

- [[2026-04-12-deep-learning-with-pytorch.md]]: Core differentiation mechanism in Deep Learning with PyTorch
- [[2026-04-29-hands-on-ml-python.md]]: Used for training neural networks with gradient descent

## Open Questions

- How does autograd handle in-place operations and why are they problematic?
- What are the memory implications of storing the computational graph?
