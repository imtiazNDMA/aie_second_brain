---
title: Logistic Regression
type: concept
tags: [machine-learning, classification, statistics]
sources: [2026-04-29-grokking-ml, 2026-04-12-ml-algorithms-in-depth]
created: 2026-04-29
updated: 2026-04-29
---

# Logistic Regression

## Definition
A statistical model that uses a logistic function to model a binary dependent variable. Despite its name, it's used for classification rather than regression.

## Mathematical Foundation

### The Sigmoid Function
$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

### Model Formulation
Given input $x$, the probability of class 1 is:
$$P(y=1|x) = \sigma(w^T x + b) = \frac{1}{1 + e^{-(w^T x + b)}}$$

### Decision Boundary
Classify as 1 if $P(y=1|x) > 0.5$, which corresponds to $w^T x + b > 0$.

## Training via Maximum Likelihood

The negative log-likelihood (cross-entropy loss):
$$\mathcal{L}(w, b) = -\sum_{i=1}^{n} [y_i \log(\hat{y}_i) + (1-y_i) \log(1-\hat{y}_i)]$$

where $\hat{y}_i = \sigma(w^T x_i + b)$.

## Comparison with Linear Regression

| Aspect | Linear Regression | Logistic Regression |
|--------|-------------------|---------------------|
| Output | Continuous | Probability (0-1) |
| Function | Linear | Sigmoid |
| Loss | MSE | Cross-Entropy |
| Use Case | Regression | Binary Classification |

## Regularization
- **L1 (Lasso)**: Adds $\lambda \sum |w_j|$ — can zero out features
- **L2 (Ridge)**: Adds $\lambda \sum w_j^2$ — shrinks weights

## Connections
- [[Remember-Formulate-Predict Framework]] — applied here
- [[Linear Regression]] — regression counterpart
- [[Support Vector Machines]] — alternative classifier
- [[Naive Bayes]] — probabilistic alternative

## Sources
- [[2026-04-29-grokking-ml]]
- [[2026-04-12-ml-algorithms-in-depth]]
