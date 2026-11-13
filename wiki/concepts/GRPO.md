---

title: GRPO
type: concept
tags: [reinforcement-learning, alignment, reasoning-models, rl-algorithm, cluster/training-alignment]
sources: [2026-05-09-deepseek-r1, 2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-05-09
updated: 2026-11-13
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

## Implementation notes from *Build a Reasoning Model (From Scratch)*

Raschka (2026) implements GRPO from scratch on [[Qwen3]] 0.6B base with [[RLVR]] math rewards and [[MATH-500]] evaluation. Facts below are from that book, cited by page.

**Origin.** GRPO was introduced in the DeepSeekMath paper (arXiv 2402.03300). It is "more resource friendly" than PPO because it needs no separate value model (p187). In the book's framing, "RLVR determines what learning signal is available, and GRPO determines how that signal is used to update the model weights" (p186).

**Pieces, in order** (p188–213):
1. **Rollouts.** Sample several complete responses per prompt with temperature 0.8 and top-p 0.9 ([[Nucleus Sampling]]).
2. **Rewards.** 1.0 only if the answer is correct *and* inside `\boxed{}`, else 0.0. The boxed requirement acts as an implicit format constraint (p200).
3. **Advantages.** $A_i = (r_i - \text{mean}(r)) / (\text{std}(r) + 10^{-4})$. For rewards `[1,1,0,0]` this gives ±0.8659 (p201–202).
4. **Sequence log-probabilities.** These are summed over the response tokens, not averaged, because there is one reward per rollout (p205).
5. **Policy-gradient loss.** $-\text{mean}(A_i^{\text{detached}} \cdot \log p_i)$. In the worked example it equals −2.5764 (p208–210).

**All-equal rewards give zero gradient.** When every rollout in a group gets the same reward (all 0 or all 1), every advantage is 0 and the prompt produces no update. The book calls this intentional: there is no relative signal (p203, p214; exercise 6.2).

**What the basic version really is.** The chapter 6 implementation has no KL term and no clipping. The author calls it "essentially REINFORCE with group-normalized advantages" (p249).

**Results (Table 6.1, MATH-500, p222):**

| Setup | Accuracy | Avg. tokens |
|---|---|---|
| Base model | 15.2% | 78.85 |
| GRPO, 50 steps, 256 max tokens, 4 rollouts | 43.2% | 560.22 |
| GRPO, 50 steps, 512 max tokens, 4 rollouts | 45.6% | 579.81 |
| GRPO, 50 steps, 512 max tokens, 8 rollouts | 47.4% | 586.11 |
| Official Qwen3 0.6B reasoning model | 48.2% | 1369.79 |

"50 steps already appears sufficient to unlock reasoning behavior." Training longer does not necessarily help, because the original GRPO can be unstable over long runs (p223).

**Clipped policy ratio** (chapter 7, from PPO, arXiv 1707.06347):
- **Definition.** The ratio is $\exp(\log p_{new} - \log p_{old})$, clamped to $[1-\epsilon, 1+\epsilon]$. The objective is $\min(\rho A, \text{clip}(\rho) A)$ (p242–247).
- **Typical $\epsilon$.** DeepSeek-R1 used ε = 10 ("very weak clipping"). PPO-based RLHF often uses about 0.1 (p246).
- **Effect.** In a 500-step run, clipping removed the reward and accuracy drop seen near step 400 in the unclipped run (p248–249).

**Training metrics to watch** (p231–242):
- **Loss.** Mainly a sanity check.
- **Advantage mean.** It is 0 by construction, so any drift indicates a bug.
- **Advantage std.** Near 1 means a healthy learning signal. Near 0 means the signal is vanishing.
- **Mean token entropy.** A sudden collapse toward 0 is a warning sign. Rising entropy can mean unstable updates or randomness.

### Contradiction: is the KL term part of the core loss?

The formula above, from [[2026-05-09-deepseek-r1]], includes $+\beta \cdot \text{KL}$ as part of the GRPO loss. Raschka reports that KL is often left out in practice:

- **His position.** KL is "part of the original GRPO formulation, but it is not strictly essential. Many LLM developers omit it in practice" (p191). "GRPO is often reported to perform better on math problems when the KL loss term is omitted" (p213).
- **What others do.** "For math data, a common recommendation is to omit the KL term altogether (e.g., Dr. GRPO, Olmo 3, DeepSeek-V3.2)" (p256).
- **His own KL run** (kl_coeff 0.02, 500 steps). Accuracy went from 15% to about 40% in 50 steps, then collapsed completely: reward and accuracy fell to 0%, responses hit the length cap, and the output became nonsense (p253–254).
- **Why it collapsed.** The KL was a sampled surrogate, $\text{mean}(\log p - \log p_{ref})$, computed on summed (not length-normalized) log-probabilities. Once rewards fell to 0, the advantages were 0, so the KL term became the only gradient. Minimizing it on fixed sampled tokens spread out the distribution and raised entropy (p254–255).
- **Fixes he lists** (p255–256):
  - Lower the coefficient. Going to 0.001 was not enough in his runs.
  - Length-normalize the log-probabilities.
  - Use importance-sampling-reweighted KL (DeepSeek-V3.2).
  - Add a small format reward.
  - Omit KL for math.

**Second tension: length normalization.** The book says length-based rescaling is "not part of the original GRPO formulation" and uses summed sequence log-probabilities (p205). The DeepSeekMath objective as usually written averages per token ($1/|o_i|$). Dr. GRPO criticizes that averaging for introducing a length bias. Treat "original GRPO is sequence-summed" as the book's simplification, not settled fact.

### 15 published GRPO modifications (book's list, p265–266)

| # | Modification | Source |
|---|---|---|
| 1 | Filter out examples that give zero gradient | DAPO |
| 2 | Active sampling: favor prompts with mixed correct and incorrect rollouts | DAPO |
| 3 | Token-level instead of sequence-level loss, to reduce length bias | DAPO |
| 4 | Omit KL | DAPO, Dr. GRPO |
| 5 | Larger clipping range | DAPO |
| 6 | Truncate importance-sampling ratios | verl |
| 7 | Remove std normalization of advantages | Dr. GRPO |
| 8 | Tune KL by domain, including zero KL for math | DeepSeek-V3.2 |
| 9 | Importance-sampling-reweighted KL | DeepSeek-V3.2 |
| 10 | Mask unsuitable off-policy sequences | DeepSeek-V3.2 |
| 11 | Keep the top-p/top-k sampling mask | DeepSeek-V3.2 |
| 12 | Keep the original advantage normalization when it works | DeepSeek-V3.2 |
| 13 | Normalize each reward component before combining them | GDPO |
| 14 | Sequence-level importance sampling and clipping | GSPO |
| 15 | Clip importance-sampling weights instead of token updates | CISPO, from MiniMax-M1 |

References are in Appendix A (p311): DAPO arXiv 2503.14476; Dr. GRPO 2503.20783; DeepSeek-V3.2 2512.02556; GDPO 2601.05242; GSPO 2507.18071; MiniMax-M1/CISPO 2506.13585.

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
- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026; from-scratch GRPO on Qwen3 0.6B, KL-collapse experiment, clipped ratios, 15 variants

## Open Questions

- Optimal group size $G$ vs. compute budget at scale
- How to combine GRPO with curriculum (mix of difficulties within a group)
- Whether GRPO can be extended to non-verifiable rewards via learned-judge group baselines
- Sample efficiency vs. off-policy variants
