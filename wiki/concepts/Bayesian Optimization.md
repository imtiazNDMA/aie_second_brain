---
title: Bayesian Optimization
type: concept
tags: [optimization, hyperparameters]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-12
updated: 2026-04-13
---

# Bayesian Optimization

## Definition

Global optimization method that models an objective function with a surrogate (often Gaussian process) and selects next evaluations via acquisition functions.

## Mathematical Formulation

### The Optimization Problem

Find:
$$\mathbf{x}^* = \arg\min_{\mathbf{x} \in \mathcal{X}} f(\mathbf{x})$$

where $f$ is expensive to evaluate (e.g., training a neural network).

### Gaussian Process Surrogate

Model $f(\mathbf{x})$ as GP:
$$f(\mathbf{x}) \sim \mathcal{GP}(\mu(\mathbf{x}), k(\mathbf{x}, \mathbf{x}'))$$

Prior mean typically $\mu(\mathbf{x}) = 0$. Common kernels:

**Squared Exponential:**
$$k(\mathbf{x}, \mathbf{x}') = \exp\left(-\frac{\|\mathbf{x} - \mathbf{x}'\|^2}{2\ell^2}\right)$$

**Matern:**
$$k_{\nu}(\mathbf{x}, \mathbf{x}') = \frac{1}{\Gamma(\nu) 2^{\nu-1}} \left(\frac{\sqrt{2\nu}\|\mathbf{x} - \mathbf{x}'\|}{\ell}\right)^\nu K_\nu\left(\frac{\sqrt{2\nu}\|\mathbf{x} - \mathbf{x}'\|}{\ell}\right)$$

where $K_\nu$ is Bessel function. Common $\nu = 3/2, 5/2$.

### Posterior Predictive

After observing $\mathcal{D} = \{(\mathbf{x}_i, y_i)\}_{i=1}^n$, the posterior:

$$f(\mathbf{x}) | \mathcal{D} \sim \mathcal{N}(\mu_n(\mathbf{x}), \sigma_n^2(\mathbf{x}))$$

where:
$$\mu_n(\mathbf{x}) = \mathbf{k}(\mathbf{x})^\top \mathbf{K}^{-1} \mathbf{y}$$
$$\sigma_n^2(\mathbf{x}) = k(\mathbf{x}, \mathbf{x}) - \mathbf{k}(\mathbf{x})^\top \mathbf{K}^{-1} \mathbf{k}(\mathbf{x})$$

### Acquisition Functions

**Expected Improvement (EI):**
$$EI(\mathbf{x}) = \mathbb{E}[\max(0, f_{best} - f(\mathbf{x}))]$$
$$EI(\mathbf{x}) = (f_{best} - \mu_n(\mathbf{x}))\Phi(z) + \sigma_n(\mathbf{x})\phi(z)$$
$$z = \frac{f_{best} - \mu_n(\mathbf{x})}{\sigma_n(\mathbf{x})}$$

where $\Phi$ is CDF and $\phi$ is PDF of standard normal.

**Upper Confidence Bound (UCB):**
$$UCB(\mathbf{x}) = \mu_n(\mathbf{x}) + \beta \sigma_n(\mathbf{x})$$

where $\beta$ balances exploration/exploitation.

**Probability of Improvement (PI):**
$$PI(\mathbf{x}) = P(f(\mathbf{x}) < f_{best}) = \Phi(z)$$

### Algorithm

```
for t = 1, 2, ...:
    1. Observe f at X_t points
    2. Update GP posterior with all observations
    3. Compute acquisition α(x) for all x
    4. Select x_{t+1} = argmax α(x)
    5. Evaluate f(x_{t+1})
```

### Applications

- Hyperparameter tuning loops for ML models as covered in chapter 7.
- Efficient search when evaluations are expensive.

## Related Concepts

- [[Active Learning]]
- [[Gaussian Mixture Model]]
- [[Variational Inference]]
