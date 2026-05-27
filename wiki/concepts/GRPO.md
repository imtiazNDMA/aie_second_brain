---
title: GRPO
type: concept
tags: [reinforcement-learning, alignment, reasoning-models, rl-algorithm]
sources: [2026-05-09-deepseek-r1]
created: 2026-05-09
updated: 2026-05-09
---

# GRPO

## Definition

**Group Relative Policy Optimization (GRPO)** is a reinforcement-learning algorithm for LLM post-training that replaces PPO's per-token value-function critic with **group-relative advantage estimation**. For each prompt, sample a group of $G$ outputs, normalize their rewards to z-scores within the group, and use that normalized signal as the policy gradient. The value model is gone — halving optimizer memory and removing the credit-assignment burden of TD-style value learning.

GRPO was popularized by [[DeepSeek-R1]] (Nature 2025) as the RL backbone for training reasoning models on verifiable rewards.

## Mathematical formulation

### Group-relative advantage

For a prompt $x$, sample $G$ outputs $\{o_1, ..., o_G\}$ from the current policy $\pi_\theta$ and compute their rewards $\{r_1, ..., r_G\}$ (typically rule-based, e.g., correctness against ground truth).

The group-relative advantage for output $i$ is the z-score:

$$A_i = \frac{r_i - \mu_G}{\sigma_G}$$

where $\mu_G = \frac{1}{G}\sum_{j} r_j$ and $\sigma_G$ is the group standard deviation. This advantage is broadcast to every token in $o_i$.

### Policy objective

Let $\rho_i(\theta) = \pi_\theta(o_i \mid x) / \pi_{\theta_{old}}(o_i \mid x)$ be the importance ratio. The GRPO loss combines a clipped policy-gradient term (PPO-style) with a KL penalty against a reference policy $\pi_{\text{ref}}$:

$$\mathcal{L}_{\text{GRPO}}(\theta) = -\mathbb{E}\left[\frac{1}{G}\sum_{i=1}^{G} \min\left(\rho_i A_i, \text{clip}(\rho_i, 1-\epsilon, 1+\epsilon) A_i\right)\right] + \beta \cdot \text{KL}(\pi_\theta \,\Vert\, \pi_{\text{ref}})$$

### What disappears vs. PPO

| PPO | GRPO |
|-----|------|
| Policy network | Policy network |
| Value/critic network | (removed) |
| GAE advantage from value baselines | Group-relative z-score |
| Per-token TD residual | Per-output normalized reward |

The critic's role — providing a baseline to subtract from rewards — is taken over by the within-group mean. The cost: $G$ rollouts per prompt instead of 1 (typical $G \in \{8, 16, 64\}$). The benefit: ~50% memory savings, no critic-divergence pathology, simpler hyperparameter surface.

## Why "groups"?

The group acts as a self-normalizing baseline:
- If all $G$ outputs are bad, advantages are near zero — no update, model isn't punished for a hopeless prompt
- If outputs vary, the better ones get positive advantage, worse ones negative
- Variance reduction is exact: $\sum_i A_i = 0$ within each group by construction

This makes GRPO especially compatible with **rule-based / verifiable rewards** where reward is binary or sparse, and where a learned critic would struggle to attribute credit across tokens.

## When GRPO works

GRPO has been most successful in:

- **Mathematical reasoning** — correctness-checked rewards (DeepSeek-R1, s1's R1-distill variants)
- **Code generation** — unit-test-passing rewards
- **Tool-use trajectories** — task-completion rewards
- **Format adherence** — structured-output rewards (e.g., reward for `<think>...</think>` tags)

## When GRPO struggles

- **Sparse rewards over long horizons** — even group normalization can't manufacture signal where none exists; advantage approaches zero across the group
- **Subjective rewards** — without verifiable ground truth, the group baseline encodes the bias of the reward model
- **Single-token tasks** — group sampling overhead doesn't pay off

## GRPO vs. RLHF/PPO/DPO

| Property | RLHF (PPO) | DPO | GRPO |
|----------|-----------|-----|------|
| Reward source | learned reward model | preference pairs | rule-based / verifiable |
| Policy update | per-token TD with critic | implicit, contrastive | group-relative |
| Memory | policy + value + RM | policy only | policy only |
| Best for | helpful/harmless tuning | preference alignment | reasoning, code, math |

GRPO doesn't replace RLHF or DPO — it occupies a different niche: **objective-correctness training**, where rewards are checkable rather than inferred from human preference.

## Related Concepts

- [[RLVR]] — paradigm GRPO operationalizes
- [[RLHF]] — predecessor; PPO + learned reward model
- [[Direct Preference Optimization]] — alternative; preference pairs without RL
- [[ORPO]] — single-stage SFT + odds-ratio
- [[KTO]] — prospect-theory-derived alignment
- [[Reasoning Models]] — primary application domain
- [[DeepSeek-R1]] — flagship GRPO-trained model
- [[Fine-Tuning]] — broader hub

## Sources

- [[2026-05-09-deepseek-r1]] — Nature 2025; full GRPO algorithm and training pipeline

## Open Questions

- Optimal group size $G$ vs. compute budget at scale
- How to combine GRPO with curriculum (mix of difficulties within a group)
- Whether GRPO can be extended to non-verifiable rewards via learned-judge group baselines
- Sample efficiency vs. off-policy variants
