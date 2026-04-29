---
title: Linear Regression
type: concept
tags: [machine-learning, supervised-learning, regression]
sources: [2026-04-29-grokking-ml.md, 2026-04-29-hands-on-ml-python.md]
created: 2026-04-29
updated: 2026-04-29
---

# Linear Regression

A supervised learning algorithm that models the relationship between input features and a continuous output by fitting a linear equation to observed data.

## Definition

Linear regression predicts a continuous target variable by computing a weighted sum of input features plus a bias term. The goal is to find the line (or hyperplane) that minimizes the sum of squared errors between predictions and actual values.

## Key Concepts

- **Simple Linear Regression**: One input feature, fit y = mx + b
- **Multiple Linear Regression**: Multiple input features, fit y = w₁x₁ + w₂x₂ + ... + b
- **Ordinary Least Squares (OLS)**: Minimizes sum of squared residuals
- **Gradient Descent**: Iterative optimization when OLS is computationally expensive
- **Regularization**: Ridge (L2) and Lasso (L1) prevent overfitting

## Related Concepts

- [[Logistic Regression]] — Linear regression adapted for classification
- [[Remember-Formulate-Predict Framework]] — Linear regression as a formulate-and-predict algorithm
- [[Decision Trees]] — Non-linear alternative to linear regression
- [[Overfitting]] — Issue that regularization addresses

## Sources

- [[2026-04-29-grokking-ml.md]]: Introduced as a fundamental ML algorithm in Grokking Machine Learning
- [[2026-04-29-hands-on-ml-python.md]]: Covered in Hands-on Machine Learning with Python using scikit-learn

## Open Questions

- When to choose linear regression vs. tree-based methods?
- How does feature scaling affect linear regression with regularization?
