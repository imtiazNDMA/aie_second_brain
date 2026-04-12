---
tags: [pytorch, deployment, graph]
sources: [2026-04-12-deep-learning-with-pytorch]
created: 2026-04-12
updated: 2026-04-12
---

# TorchScript

## Definition

PyTorch’s deferred-execution format that captures eager `nn.Module` operations into an intermediate representation (IR) that can run without the Python interpreter.

## Highlights

- **Two entry points:** tracing (record operations with example inputs) and scripting (compile directly from Python code)—mirrored in [[PyTorch TorchScript Export]].
- **Deployment:** Generates `.pt` artifacts consumable from C++/LibTorch, TorchServe, or mobile runtimes, reducing latency and dependency on Python.
- **Optimization:** Enables operator fusion, JIT transforms, and hardware-specific backends.

## Related Concepts

- [[PyTorch]]
- [[PyTorch TorchScript Export]]
- [[Inference Optimization]]
