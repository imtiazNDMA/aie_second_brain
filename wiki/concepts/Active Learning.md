---
title: Active Learning
type: concept
tags: [supervised-learning, efficiency]
sources: [2026-04-12-ml-algorithms-in-depth]
created: 2026-04-12
updated: 2026-04-13
---

# Active Learning

## Definition

Strategy where a model queries an oracle (human annotator) for labels on the most informative samples, reducing annotation cost.

## Mathematical Formulation

### The Active Learning Cycle

Given unlabeled pool $\mathcal{U}$ and small labeled set $\mathcal{L}$, select $x \in \mathcal{U}$ to query:

$$x^* = \arg\max_{x \in \mathcal{U}} I(x; y | \mathcal{L})$$

where $I$ is mutual information between unlabeled point and its label.

### Uncertainty Sampling

Select point with highest prediction entropy:

$$x^* = \arg\max_{x \in \mathcal{U}} H(y | x, \mathcal{L})$$

For softmax predictions $p(y | x)$:

$$H(y | x) = -\sum_{c=1}^{C} p_c \log p_c$$

**Least confident:**
$$x^* = \arg\max_{x \in \mathcal{U}} (1 - \max_c p_c)$$

**Margin sampling:**
$$x^* = \arg\min_{x \in \mathcal{U}} (p_{(1)} - p_{(2)})$$

where $p_{(1)}, p_{(2)}$ are top two class probabilities.

### Query by Committee (QBC)

Maintain committee $\mathcal{C} = \{h_1, ..., h_m\}$ of models trained on $\mathcal{L}$. Select points committee disagrees on:

$$x^* = \arg\max_{x \in \mathcal{U}} \text{Disagree}_{\mathcal{C}}(x)$$

**Vote entropy:**
$$\text{Disagree}(x) = -\sum_{c} \frac{V_c}{m} \log \frac{V_c}{m}$$

where $V_c$ is number of voters predicting class $c$.

### Expected Model Change

Select point that would cause largest gradient change:

$$x^* = \arg\max_{x \in \mathcal{U}} \|\nabla_\theta \mathcal{L}(x, y)\|^2$$

For logistic regression with features $\phi(x)$:

$$\|\nabla_\theta \mathcal{L}\|^2 \propto \|\phi(x)\|^2 \cdot \text{entropy}(p(y|x))$$

### Pool-Based Sampling

The full pool-based active learning loop:

```
repeat:
    Train h on labeled set L
    Compute uncertainty score for all u in U
    Query oracle for x* with highest score
    L = L ∪ {x*, y*}
    U = U \ {x*}
```

### Expected Error Reduction

Select point minimizing expected future error:

$$x^* = \arg\min_{x \in \mathcal{U}} \mathbb{E}_{y \sim p(y|x)} [R(h_{L \cup (x,y)})]$$

where $R$ is generalization risk and $h_{L \cup (x,y)}$ is model retrained with new label.

## Techniques

- Uncertainty sampling, query-by-committee, expected model change.
- Particularly useful for imbalanced datasets discussed in chapter 7.

## Related Concepts

- [[Bayesian Optimization]]
- [[Ensemble Methods]]
- [[Model Evaluation]]
