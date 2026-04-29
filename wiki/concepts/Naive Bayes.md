---
title: Naive Bayes
type: concept
tags: [machine-learning, classification, probability]
sources: [2026-04-29-grokking-ml, 2026-04-12-ml-algorithms-in-depth]
created: 2026-04-29
updated: 2026-04-29
---

# Naive Bayes

## Definition
A family of probabilistic classifiers based on applying Bayes' theorem with strong (naive) independence assumptions between features.

## Mathematical Foundation

### Bayes' Theorem
$$P(y|x) = \frac{P(x|y)P(y)}{P(x)}$$

For multiple features $x = (x_1, x_2, ..., x_n)$:
$$P(y|x_1, ..., x_n) = \frac{P(y) \prod_{i=1}^{n} P(x_i|y)}{P(x_1, ..., x_n)}$$

The "naive" assumption is that features are conditionally independent given the class.

## Common Variants

### Multinomial Naive Bayes
Used for discrete counts (e.g., word counts in document classification):
$$P(x_i|y) = \frac{N_{yi} + \alpha}{N_y + \alpha d}$$
where $N_{yi}$ is count of feature $i$ in class $y$, $N_y$ is total count in class $y$, $d$ is vocabulary size, $\alpha$ is smoothing parameter.

### Gaussian Naive Bayes
For continuous features, assume $P(x_i|y) \sim \mathcal{N}(\mu_{y,i}, \sigma^2_{y,i})$.

### Bernoulli Naive Bayes
For binary/boolean features.

## Spam Detection Example

For email classification:
1. **Prior**: $P(\text{spam}) = 0.3$, $P(\text{ham}) = 0.7$
2. **Likelihood**: $P(\text{"buy"}|\text{spam}) = 0.4$, $P(\text{"buy"}|\text{ham}) = 0.05$
3. **Prediction**: Compute $P(\text{spam}|\text{"buy"})$ using Bayes' theorem

## Advantages and Disadvantages

**Advantages**:
- Fast training and prediction
- Works well with high-dimensional data (text classification)
- Requires little training data

**Disadvantages**:
- Independence assumption rarely holds in practice
- Cannot learn feature interactions

## Connections
- [[Bayesian Optimization]] — related Bayesian methods
- [[Logistic Regression]] — alternative classifier
- [[Remember-Formulate-Predict Framework]] — applied here

## Sources
- [[2026-04-29-grokking-ml]]
- [[2026-04-12-ml-algorithms-in-depth]]
