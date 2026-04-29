---
title: Support Vector Machines
type: concept
tags: [machine-learning, supervised-learning, classification, kernel-methods]
sources: [2026-04-29-grokking-ml.md, 2026-04-29-hands-on-ml-python.md]
created: 2026-04-29
updated: 2026-04-29
---

# Support Vector Machines

A supervised learning algorithm that finds an optimal hyperplane to separate classes with maximum margin between decision boundary and data points.

## Definition

Support Vector Machines (SVMs) construct a hyperplane in a high-dimensional space that maximally separates different classes. The algorithm identifies support vectors—data points closest to the decision boundary—and optimizes the margin around them.

## Key Concepts

- **Maximum Margin**: SVM finds the hyperplane with the largest distance to nearest training points
- **Support Vectors**: Critical data points that define the decision boundary
- **Kernel Trick**: Maps data to higher-dimensional space to find non-linear decision boundaries
- **C Parameter**: Controls trade-off between smooth decision boundary and classifying training points correctly
- **Soft Margin**: Allows some misclassification to improve generalization

## Related Concepts

- [[Logistic Regression]] — Linear alternative for classification
- [[Kernel Methods]] — Mathematical foundation for SVM kernels
- [[Overfitting]] — Regularization parameter C helps control overfitting
- [[Ensemble Methods]] — Can combine multiple SVMs

## Sources

- [[2026-04-29-grokking-ml.md]]: Introduced as a powerful classification algorithm in Grokking Machine Learning
- [[2026-04-29-hands-on-ml-python.md]]: Implementation with scikit-learn's SVC and different kernel options

## Open Questions

- How to choose the right kernel function for a given problem?
- What are computational limitations of SVMs on large datasets?
