---
title: PyTorch TorchScript Export
type: code-example
tags: [pytorch, torchscript, deployment]
sources: []
created: 2026-04-12
updated: 2026-04-12
---

# PyTorch TorchScript Export

Demonstrates tracing/scripting a simple `nn.Module`, saving it to disk, and loading it in a Python-free runtime. Complements the TorchScript discussion in [[PyTorch]].

## 1. Define & Train Quick Model

```python
import torch
from torch import nn

class TinyMLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.seq = nn.Sequential(
            nn.Linear(4, 8),
            nn.ReLU(),
            nn.Linear(8, 3)
        )

    def forward(self, x):
        return self.seq(x)

model = TinyMLP().eval()
```

## 2. Trace vs Script

```python
example_input = torch.randn(1, 4)
traced = torch.jit.trace(model, example_input)
print(traced.code)

scripted = torch.jit.script(model)
print(scripted.code)
```

## 3. Save TorchScript Module

```python
traced.save("tiny_mlp_traced.pt")
scripted.save("tiny_mlp_scripted.pt")
```

## 4. Load & Run (Python API)

```python
loaded = torch.jit.load("tiny_mlp_traced.pt")
loaded.eval()
with torch.no_grad():
    out = loaded(torch.ones(1, 4))
print(out)
```

## 5. Optional: C++ Inference Stub

Compile/run outside Python using LibTorch:

```cpp
#include <torch/script.h>
#include <iostream>

int main() {
  torch::jit::script::Module module = torch::jit::load("tiny_mlp_traced.pt");
  torch::Tensor input = torch::ones({1, 4});
  torch::Tensor output = module.forward({input}).toTensor();
  std::cout << output << std::endl;
}
```

Build with:

```
clang++ tiny.cpp -std=c++17 -I${LIBTORCH}/include -I${LIBTORCH}/include/torch/csrc/api/include ^
  -L${LIBTORCH}/lib -ltorch -ltorch_cpu -lc10 -o tiny
```

This workflow exercises the production path described in the excerpt: eager experimentation → TorchScript serialization → deployment.
