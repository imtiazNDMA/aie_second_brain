---
tags: [tensor, data-structure, pytorch]
sources: [2026-04-12-deep-learning-with-pytorch]
created: 2026-04-12
updated: 2026-04-12
---

# [[PyTorch]] Tensor

## Definition

Multidimensional array data structure in [[PyTorch]] with storage, stride, dtype, and device metadata that supports GPU acceleration and automatic differentiation.

## Key Properties

- **Storage & Strides** — Backing storage is a contiguous memory buffer; strides describe indexing jumps, enabling slicing/reshaping without copies.
- **NumPy Interop** — Tensors can view/convert to NumPy arrays (and vice versa) sharing memory when possible.
- **Serialization & Devices** — Save/load tensors, move across CPU ↔ GPU via `.to(device)`; GPU tensors leverage CUDA.
- **Indexing & Broadcasting** — Support advanced indexing, broadcasting, and vectorized math similar to NumPy.

## Related Concepts

- [[PyTorch]]
- [[Autograd]] (tensors can track gradients)
- [[Torch NN Module]] (layers consume/produce tensors)
