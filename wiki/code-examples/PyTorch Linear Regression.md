---
title: PyTorch Linear Regression
type: code-example
tags: [pytorch, tensors, autograd, tutorial]
sources: []
created: 2026-04-12
updated: 2026-04-12
---

# PyTorch Linear Regression

Hands-on notebook-style walkthrough showing how to use [[PyTorch]] tensors, [[Autograd]], and `torch.nn` modules to fit a simple linear model. Copy/paste the code blocks into a Jupyter notebook or Python script.

## 1. Setup

```python
import torch
from torch import nn

# Reproducibility
torch.manual_seed(42)

# Device selection (CPU fallback)
print(f"Using {device}")
```

## 2. Create Synthetic Data

```python
# y = 3x + 2 + Gaussian noise
num_samples = 1024
x = torch.linspace(-2, 2, num_samples).unsqueeze(1)
y = 3 * x + 2 + 0.2 * torch.randn_like(x)

x_train = x.to(device)
```

## 3. Define the Model (`nn.Module`)

```python
class LinearRegressor(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, features):
        return self.linear(features)

model = LinearRegressor().to(device)
print(model)
```

## 4. Loss Function and Optimizer

```python
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)
```

## 5. Training Loop

```python
epochs = 200
for epoch in range(epochs):
    preds = model(x_train)
    loss = criterion(preds, y_train)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 40 == 0:
        w = model.linear.weight.item()
        b = model.linear.bias.item()
        print(f"Epoch {epoch+1:03d} | Loss={loss.item():.4f} | w={w:.3f}, b={b:.3f}")
```

Expected output shows the learned slope/intercept converging near 3 and 2 respectively while loss approaches zero. This demonstrates tensors flowing through `nn.Module`, gradients tracked via [[Autograd]], and optimizer updates.

## 6. Using the Trained Model

```python
model.eval()
with torch.no_grad():
    test_x = torch.tensor([[1.5]], device=device)
    pred = model(test_x)
print(f"Prediction for x=1.5: {pred.item():.3f}")
```

This snippet can be extended to experiment with [[Torch NN Module]] patterns (adding nonlinearities, batching with `DataLoader`, etc.).
