---
title: Overfitting
type: concept
tags: [machine-learning, generalization, regularization]
sources: [2026-04-29-grokking-ml.md, 2026-04-29-hands-on-ml-python.md]
created: 2026-04-29
updated: 2026-04-29
---

# Overfitting

A modeling error where a machine learning model learns the training data too well, including noise and outliers, resulting in poor generalization to new data.

## Definition

Overfitting occurs when a model captures patterns specific to the training set that don't generalize to the broader population. The model performs exceptionally well on training data but poorly on unseen test data.

## Key Concepts

- **High Variance**: Model is too sensitive to training data fluctuations
- **Regularization**: Techniques (L1/L2) to penalize model complexity
- **Cross-Validation**: Detecting overfitting by testing on held-out data
- **Early Stopping**: Halting training when validation performance degrades
- **Data Augmentation**: Increasing effective training set size to reduce overfitting

## Related Concepts

- [[Linear Regression]] — Prone to overfitting with too many features
- [[Decision Trees]] — Highly prone to overfitting without pruning
- [[Ensemble Methods]] — Bagging reduces overfitting
- [[Bias-Variance Tradeoff]] — Overfitting is the variance side of the tradeoff

## Sources

- [[2026-04-29-grokking-ml.md]]: Explained as key ML challenge in Grokking Machine Learning
- [[2026-04-29-hands-on-ml-python.md]]: Techniques to detect and prevent overfitting

## Open Questions

- How to detect overfitting in production without labeled test data?
- What's the relationship between model size and overfitting tendency?
