---
title: PyTorch Tensor Basics
type: code-example
tags: [pytorch, tensors, tutorial]
sources: []
created: 2026-04-12
updated: 2026-04-12
---

# PyTorch Tensor Basics

Quick reference notebook for creating/manipulating tensors, moving them across devices, interoperating with NumPy, and saving/loading. Useful companion to [[PyTorch Tensor]].

## 1. Imports + Device

```python
import torch
import numpy as np

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Running on {device}")
```

## 2. Creation & Dtypes

```python
scalar = torch.tensor(3.14)
vector = torch.tensor([1, 2, 3], dtype=torch.float32)
zeros = torch.zeros((2, 3))
random = torch.randn((4, 4), dtype=torch.float64)
print(vector.dtype, random.dtype)
```

## 3. Shape, Strides, Views

```python
matrix = torch.arange(12).reshape(3, 4)
print(matrix)
print("Shape:", matrix.shape)
print("Strides:", matrix.stride())

view = matrix.view(6, 2)  # shares storage
view[0, 0] = 999
print(matrix)
```

## 4. Indexing & Broadcasting

```python
batch = torch.arange(1, 13).reshape(3, 4)
print(batch[0])        # first row
print(batch[:, 1:3])   # columns 1-2

bias = torch.tensor([1.0, -1.0, 0.5, 0.0])
print(batch.float() + bias)
```

## 5. NumPy Interop

```python
np_array = np.random.rand(2, 2)
print(tensor_from_np)

back_to_np = tensor_from_np.numpy()
print("Shares storage:", np.shares_memory(back_to_np, np_array))
```

## 6. Device Moves

```python
print(t_gpu.device)

```

## 7. Saving & Loading

```python
payload = {
    "weights": torch.randn(2, 3),
    "bias": torch.zeros(3),
}

PATH = "tensor-demo.pt"
restored = torch.load(PATH)
print(restored["weights"].shape)
```

## 8. Automatic Differentiation Toggle

```python
x = torch.tensor(2.0, requires_grad=True)
print(y)
print("dy/dx:", x.grad)

```

Use these snippets as a scratchpad when experimenting with tensor behaviors described in the book excerpt.
