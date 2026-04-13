---
title: RLHF
type: concept
tags: [alignment, training, llm]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-prompt-engineering-llms, 2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-12
updated: 2026-04-13
---

# RLHF

Reinforcement Learning from Human Feedback — alignment technique to make models follow instructions and have better helpfulness/safety.

## Mathematical Formulation

### The Alignment Objective

We want to optimize a policy $\pi_\theta$ to maximize human preferences. Given a prompt $x$ and generated response $y$, the reward $r(x, y)$ measures preference quality.

The RLHF objective:
$$\mathcal{L}_{\text{RLHF}} = \mathbb{E}_{x \sim \mathcal{D}, y \sim \pi_\theta(\cdot|x)}[r(x, y)] - \beta \text{KL}(\pi_\theta || \pi_{\text{ref}})$$

The KL term prevents the policy from drifting too far from the reference model $\pi_{\text{ref}}$.

### Reward Model Training

Given preference pairs $(y^+, y^-)$ where $y^+$ is preferred over $y^-$, we train a reward model $r_\phi$ using the Bradley-Terry model:

$$P(y^+ > y^- | x) = \sigma(r_\phi(x, y^+) - r_\phi(x, y^-))$$

where $\sigma$ is the sigmoid. The loss:
$$\mathcal{L}_{RM} = -\mathbb{E}_{(y^+, y^-) \sim \mathcal{D}}[\log \sigma(\Delta r_\phi)]$$
$$\Delta r_\phi = r_\phi(x, y^+) - r_\phi(x, y^-)$$

### PPO Optimization

Proximal Policy Optimization maximizes the reward while constraining policy updates:

$$\mathcal{L}_{\text{PPO}} = \mathbb{E}\left[\min(r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t)\right]$$

where the policy ratio:
$$r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\text{old}}(a_t|s_t)}$$

The clipped objective prevents catastrophic policy updates.

### Complete RLHF Pipeline

1. **Pretrained model** $\pi_{\text{base}}$ → fine-tune on instruction data → $\pi_{\text{SFT}}$
2. **Reward model** $r_\phi$ trained on preferences from $\pi_{\text{SFT}}$ samples
3. **PPO** maximizes $r_\phi(\pi_\theta)$ with $\pi_{\text{SFT}}$ as reference

## Process

1. **Collect preference data:** humans rank model outputs (or synthetic constitutions provide feedback).
2. **Train reward model:** predict human/constitutional preferences.
3. **Optimize policy:** run RL (typically PPO) to maximize reward scores.

## Considerations

- **Alignment tax:** *[[Prompt Engineering]] for LLMs* highlights how RLHF-imposed safety policies can reduce responsiveness or add latency; teams must monitor UX impact.
- **Safety evaluators:** *Ultimate Guide to [[Fine-Tuning]]* recommends guard models (Llama Guard, Shield Gemma, WILDGUARD) plus human audits during/after RLHF.
- **Variants:** DPO/ORPO provide lighter-weight alternatives without explicit reward models.

## Variants

- **DPO ([[Direct Preference Optimization]]):** Simpler — directly optimizes on preference pairs without reward model
- **Constitutional AI:** Uses AI feedback instead of human feedback

## Related Concepts

- [[Pretraining]]
- [[Fine-Tuning]]
- [[Direct Preference Optimization]]
