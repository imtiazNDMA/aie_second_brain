---
title: Decision Trees
type: concept
tags: [machine-learning, supervised-learning, tree-models]
sources: [2026-04-29-grokking-ml.md, 2026-04-29-hands-on-ml-python.md]
created: 2026-04-29
updated: 2026-04-29
---

# Decision Trees

A non-parametric supervised learning algorithm that recursively partitions data based on feature thresholds to make predictions.

## Definition

Decision trees split data into subsets based on feature values, creating a tree-like model of decisions. Each internal node tests a feature, each branch represents an outcome, and each leaf node assigns a prediction (class or value).

## Key Concepts

- **Root Node**: Top node containing the entire dataset
- **Splitting**: Choosing the best feature and threshold to divide data
- **Leaf Nodes**: Terminal nodes that provide predictions
- **Gini Impurity / Entropy**: Measures used to find optimal splits for classification
- **Variance Reduction**: Splitting criterion for regression trees
- **Pruning**: Technique to reduce tree depth and prevent overfitting

## Related Concepts

- [[Linear Regression]] — Linear alternative for regression tasks
- [[Random Forest]] — Ensemble of decision trees
- [[Ensemble Methods]] — Techniques that combine multiple trees
- [[Overfitting]] — Decision trees are prone to overfitting without pruning

## Sources

- [[2026-04-29-grokking-ml.md]]: Explained with intuitive visual examples in Grokking Machine Learning
- [[2026-04-29-hands-on-ml-python.md]]: Implementation using scikit-learn's DecisionTreeClassifier/Regressor

## Open Questions

- How to choose between depth-based and cost-complexity pruning?
- When do decision trees outperform linear models?
