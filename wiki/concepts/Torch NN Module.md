---
tags: [pytorch, neural-networks, module]
sources: [2026-04-12-deep-learning-with-pytorch, 2026-04-16-deep-learning-with-pytorch-step-by-step]
created: 2026-04-12
updated: 2026-04-16
---

# Torch NN Module

## Definition

`torch.nn` is [[PyTorch]]’s neural-network toolkit. It provides reusable building blocks—layers, activation functions, loss functions—and the `nn.Module` base class for composing custom models.

## Capabilities

- **Layers** — Linear, convolutional, recurrent, normalization, dropout, embeddings, etc.
- **Module subclassing** — Override `__init__`/`forward` to define arbitrary architectures while leveraging [[Autograd]].
- **Utilities** — `torch.utils.data.Dataset`/`DataLoader` for feeding data, `torch.nn.DataParallel` and `torch.distributed` for multi-device scaling.
- **Training loop integration** — Works with `torch.optim` optimizers and standard for-loops/Jupyter notebooks.

## Related Concepts

- [[PyTorch]]
- [[PyTorch Tensor]]
- [[Autograd]]
