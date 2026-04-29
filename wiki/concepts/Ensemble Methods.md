---
title: Ensemble Methods
type: concept
tags: [machine-learning, ensemble, bagging, boosting]
sources: [2026-04-29-grokking-ml.md, 2026-04-29-hands-on-ml-python.md, 2026-04-12-ml-algorithms-in-depth.md]
created: 2026-04-29
updated: 2026-04-29
---

# Ensemble Methods

Techniques that combine multiple machine learning models to produce a more accurate and robust prediction than any single model.

## Definition

Ensemble methods train multiple base models (often weak learners) and aggregate their predictions to improve overall performance. The key principle is that a group of models can correct each other's errors and reduce overfitting.

## Key Concepts

- **Bagging (Bootstrap Aggregating)**: Trains models on random subsets with replacement, reduces variance (e.g., Random Forest)
- **Boosting**: Sequentially trains models where each tries to correct predecessor's errors, reduces bias (e.g., AdaBoost, Gradient Boosting)
- **Stacking**: Trains a meta-model to combine predictions from diverse base models
- **Voting**: Simple aggregation by majority vote (classification) or averaging (regression)
- **Random Forest**: Bagging with decision trees plus random feature selection

## Related Concepts

- [[Decision Trees]] — Common base model for ensemble methods
- [[Overfitting]] — Ensembles help reduce overfitting through aggregation
- [[Bias-Variance Tradeoff]] — Ensembles can address both bias and variance
- [[Gradient Boosting]] — Popular boosting algorithm (XGBoost, LightGBM)

## Sources

- [[2026-04-29-grokking-ml.md]]: Explained as advanced ML technique in Grokking Machine Learning
- [[2026-04-29-hands-on-ml-python.md]]: Implementation with scikit-learn's ensemble module
- [[2026-04-12-ml-algorithms-in-depth.md]]: Discussed in context of Bayesian ensemble methods

## Open Questions

- When does boosting overfit compared to bagging?
- How to interpret ensemble model predictions?
