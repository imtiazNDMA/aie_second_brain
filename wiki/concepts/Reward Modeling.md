---
title: Reward Modeling
type: concept
tags: [rlhf, alignment, post-training, preferences]
sources: [2026-04-12-llm-engineers-handbook, 2026-04-12-ultimate-guide-fine-tuning]
created: 2026-05-10
updated: 2026-05-10
---

# Reward Modeling

## Definition

**Reward Modeling** is the practice of training a separate neural network — the *reward model* (RM) — to predict a scalar score representing how "good" a response is to a given prompt. The RM is the central piece of [[RLHF]]: it converts pairwise human preferences (or other signals) into a continuous reward function that an RL algorithm (PPO) can optimize. Reward modeling is what made RLHF practical at scale — humans can compare two responses far more reliably than they can score one in absolute terms.

## How it works

### Data shape

`(prompt, chosen_response, rejected_response)` — pairwise preferences.

### Training objective

Bradley-Terry preference model:

$$P(y_w \succ y_l \mid x) = \sigma(r_\theta(x, y_w) - r_\theta(x, y_l))$$

Loss is negative log-likelihood:

$$\mathcal{L}_\text{RM} = -\mathbb{E}_{(x, y_w, y_l)}[\log \sigma(r_\theta(x, y_w) - r_\theta(x, y_l))]$$

The RM is initialized from the SFT model with a scalar head replacing the LM head; trained for 1–2 epochs.

### Use in RLHF

Once trained, the RM scores rollouts during PPO:

1. Sample response $y$ from policy $\pi_\theta$ given prompt $x$
2. Score $r = r_\phi(x, y)$ with the frozen RM
3. Compute KL penalty against reference model
4. PPO update on $r - \beta \cdot \text{KL}$

## The reference-free alternative

The 2023–2025 wave of preference-optimization methods ([[Direct Preference Optimization|DPO]], [[ORPO]], [[KTO]]) **eliminate the explicit RM** — they bake the Bradley-Terry derivation into a single closed-form loss directly on the policy. This drops the most expensive RLHF stage (training and serving an RM during PPO rollouts).

| Method | Has explicit RM? | Why it matters |
| --- | --- | --- |
| [[RLHF]] | Yes | Standard pipeline; highest ceiling but most expensive |
| [[Direct Preference Optimization]] | No | Same data; closed-form loss; simpler infra |
| [[ORPO]] | No | Single-stage; even simpler |
| [[KTO]] | No (uses ref model) | Pointwise data; production logs friendly |
| [[RLVR]] | Replaces RM with rule-based grader | Verifiable tasks; eliminates learned reward |

The trend is clear: **explicit reward models have been deprecated in most open-source RLHF replacements**. They persist in frontier-lab pipelines (OpenAI, Anthropic) where the reward-model-driven exploration still has the highest ceiling.

## Failure modes

- **Reward hacking** — policy learns to exploit weaknesses in the RM rather than producing truly better outputs
- **Distribution shift** — RM trained on responses from one policy degrades when used to score responses from a different policy (the policy moves away from RM training distribution as RL progresses)
- **Reward-model overoptimization** — Goodhart's law in action: chasing the RM score past the point where it correlates with human preference
- **Calibration drift** — the RM's score scale isn't stable across prompt distributions

Mitigations: KL anchor against reference model, RM ensembles, periodic RM refresh on newly-collected preference data.

## Process Reward Models (the 2024–2025 development)

Standard reward models score the *whole response*. **[[Process Reward Model]]** (PRM) variants score *each step* of a reasoning chain — providing per-step supervision that helps with multi-step reasoning tasks (math, code). PRMs are an active research area for [[Reasoning Models]].

## Related Concepts

- [[RLHF]] — the primary consumer of reward models
- [[Direct Preference Optimization]], [[ORPO]], [[KTO]] — reference-free alternatives
- [[RLVR]] — replaces learned RM with rule-based grader
- [[Process Reward Model]] — per-step supervision variant
- [[LLM Alignment and Post-Training]] — synthesis covering the full preference-optimization landscape
- [[Reasoning Models]] — area where PRMs matter

## Sources

- [[2026-04-12-llm-engineers-handbook]] — practical RLHF coverage
- [[2026-04-12-ultimate-guide-fine-tuning]] — pipeline-stage view

## Open Questions

- Practical PRM data-collection economics for new domains
- Reward-model ensembles vs. RM refresh cadence trade-offs
- When DPO/ORPO/KTO will fully displace RLHF in frontier labs
