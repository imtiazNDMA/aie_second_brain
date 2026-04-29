---
title: Remember-Formulate-Predict Framework
type: concept
tags: [machine-learning, framework, reasoning]
sources: [2026-04-29-grokking-ml]
created: 2026-04-29
updated: 2026-04-29
---

# Remember-Formulate-Predict Framework

## Definition
A human-inspired cognitive framework for machine learning where models learn by: (1) **Remembering** past situations, (2) **Formulating** general rules from experience, and (3) **Predicting** future outcomes using those rules.

## The Three Steps

### 1. Remember
Collect and store past data (examples, experiences, observations) that form the training set.

### 2. Formulate
Process the remembered data to extract patterns and create a model (set of rules) that represents reality.

### 3. Predict
Use the formulated model to make predictions about new, unseen data.

## Mathematical Representation
Given training data $D = \{(x_1, y_1), ..., (x_n, y_n)\}$, the framework:
1. **Remembers** $D$
2. **Formulates** model $f: \mathcal{X} \rightarrow \mathcal{Y}$ by minimizing loss $\mathcal{L}(f(x), y)$
3. **Predicts** $\hat{y} = f(x_{\text{new}})$

## Applications
- Linear regression: remember data points → formulate line → predict new values
- Classification: remember labeled examples → formulate decision boundary → predict classes
- Neural networks: remember training examples → formulate weights → predict outputs

## Connections
- [[Grokking Machine Learning]] — source introducing the framework
- [[Linear Regression]] — example application
- [[Logistic Regression]] — classification application
- [[Decision Trees]] — rule-based formulation

## Sources
- [[2026-04-29-grokking-ml]]
