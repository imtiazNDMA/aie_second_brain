---
title: Ensemble Methods
type: concept
tags: [supervised-learning, robustness]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-12
updated: 2026-04-13
---

# Ensemble Methods

## Definition

Techniques that combine multiple models to improve accuracy and robustness (e.g., bagging, boosting, stacking).

## Mathematical Formulation

### Bias-Variance Decomposition

For a model $\hat{f}$ predicting $y = f(x) + \epsilon$:

$$\mathbb{E}[(y - \hat{f})^2] = \text{Bias}^2 + \text{Var} + \sigma^2$$

where:
$$\text{Bias} = \mathbb{E}[\hat{f}] - f$$
$$\text{Var} = \mathbb{E}[(\hat{f} - \mathbb{E}[\hat{f}])^2]$$

Ensembles reduce variance while potentially preserving or reducing bias.

### Bagging (Bootstrap Aggregating)

Train $M$ models on bootstrap samples, aggregate predictions:

$$\hat{f}_{bag}(x) = \frac{1}{M} \sum_{m=1}^{M} \hat{f}_m(x)$$

**Variance reduction:**
$$\text{Var}(\hat{f}_{bag}) = \frac{1}{M^2} \sum_{ij} \text{Cov}(\hat{f}_i, \hat{f}_j)$$

If models are i.i.d. with variance $\sigma^2$:
$$\text{Var}(\hat{f}_{bag}) = \frac{\sigma^2}{M}$$

If correlation $\rho$ between models:
$$\text{Var}(\hat{f}_{bag}) = \rho \sigma^2 + \frac{1-\rho}{M} \sigma^2$$

### Boosting (AdaBoost)

Iteratively train weak learners, weighted by errors:

**Training weights:**
$$w_i^{(t+1)} = w_i^{(t)} \exp(-\alpha_t y_i h_t(x_i))$$

where $\alpha_t = \frac{1}{2} \log \frac{1-\epsilon_t}{\epsilon_t}$ and $\epsilon_t$ is error rate.

**Final prediction:**
$$\hat{f}(x) = \text{sign}\left(\sum_{t=1}^{T} \alpha_t h_t(x)\right)$$

**Training error bound:**
$$\prod_{t} \sqrt{\epsilon_t(1-\epsilon_t)} \leq \exp\left(-2 \sum_t (\frac{1}{2} - \gamma_t)^2\right)$$

where $\gamma_t = \frac{1}{2} - \epsilon_t$ is the margin.

### Stacking

Train meta-learner on base model outputs:

**Level 0 (base models):**
$$z_i = \hat{f}_i(x)$$

**Level 1 (meta-learner):**
$$\hat{f}_{stack}(x) = g(z_1, ..., z_M)$$

where $g$ is learned using cross-validation to avoid overfitting.

### Random Forest

Bagging with feature subsampling at each split:

For each tree $m$:
1. Bootstrap sample of size $N$
2. At each node, randomly select $k$ features
3. Split on best feature among $k$

**Feature importance:**
$$\text{Imp}_j = \sum_{t} \sum_{n \in t} \text{IG}_j(n)$$

where IG is information gain at node $n$.

## Notes

- Provide variance reduction and bias correction benefits.
- Often paired with [[Active Learning]] and [[Bayesian Optimization]] for production systems.

## Related Concepts

- [[Active Learning]]
- [[Model Evaluation]]
