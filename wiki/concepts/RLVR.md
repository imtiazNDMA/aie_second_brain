---
title: RLVR
type: concept
tags: [reinforcement-learning, alignment, reasoning-models, paradigm]
sources: [2026-05-09-deepseek-r1]
created: 2026-05-09
updated: 2026-05-09
---

# RLVR

## Definition

**Reinforcement Learning from Verifiable Rewards (RLVR)** is the paradigm of training LLMs via RL where the reward signal comes from **rule-based verification of model output** rather than from a learned reward model trained on human preferences. It is the training paradigm behind [[DeepSeek-R1]] (Nature 2025), Kimi-1.5, and the open replications of OpenAI's o-series.

## Why "verifiable"

In RLHF, the reward $r(x, y)$ is computed by a neural reward model trained on preference pairs $(y^+, y^-) \sim \text{humans}$. This works for subjective qualities (helpfulness, tone, safety) but suffers from reward hacking, distribution shift, and annotation cost.

In RLVR, the reward is computed by a **deterministic verifier**:

- **Math** — does the final answer match ground truth?
- **Code** — do the unit tests pass?
- **Logic puzzles** — is the solution consistent with the constraints?
- **Format** — does the output conform to a structural template?

The verifier is not a model — it's a function. This eliminates the reward model entirely from the training loop.

## Why this matters

### Eliminates reward hacking on the reward axis
A learned reward model can be exploited; a unit-test runner cannot. The model either solves the problem or it doesn't.

### Removes the preference-annotation bottleneck
RLHF requires hundreds of thousands of human preference judgments. RLVR requires task instances with checkable answers — which are far more abundant (every olympiad problem, every Codeforces submission, every formal proof).

### Enables open-ended exploration
With learned rewards, the policy is bounded by the reward model's training distribution. With rule-based rewards, the policy can discover any solution path, however unusual, as long as the answer checks out.

### Unlocks emergent reasoning
DeepSeek-R1-Zero showed that pure RLVR — no SFT cold-start — produces self-verification, backtracking, and "aha moment" behaviors. These were not in the training data; they emerged because the verifier rewarded any path that worked.

## Where RLVR fails

RLVR is bounded by where verification is cheap and reliable:

- **Subjective writing** — no verifier exists for "is this essay good"
- **Open-ended dialogue** — helpfulness has no closed-form check
- **Long-horizon planning** — verifying intermediate steps requires a planner that's already as smart as what we're training
- **Safety / harmlessness** — rule-based safety checks are notoriously incomplete

For these domains, RLHF/DPO/ORPO/KTO remain the right tools. RLVR is a complement, not a replacement.

## RLVR + algorithms

RLVR is a **reward design** paradigm; it composes with multiple RL algorithms:

- **GRPO + RLVR** — DeepSeek-R1's recipe; group-relative z-scores remove the value critic
- **PPO + RLVR** — older recipe (e.g., parts of the original o-series replications)
- **REINFORCE + RLVR** — viable for low-variance verified rewards

The choice of algorithm trades off compute, memory, and stability. The verifier is shared.

## RLVR vs. RLHF — head-to-head

| Property | RLHF | RLVR |
|----------|------|------|
| Reward signal | learned RM trained on preferences | rule-based verifier |
| Annotation cost | high (preference pairs) | zero (checkable instances) |
| Reward hacking | endemic | rare (verifier is exact) |
| Distribution generalization | bounded by RM training data | bounded by verifier coverage |
| Best for | subjective alignment | objective correctness |
| Compute profile | RM forward + policy + value | policy only |

## Production patterns

In production reasoning systems, RLVR and RLHF coexist:

1. **Stage 1** — SFT cold-start on curated reasoning traces (e.g., from a teacher model)
2. **Stage 2** — RLVR on math/code with rule-based rewards (R1's "reasoning RL")
3. **Stage 3** — Rejection sampling against a reward model for non-reasoning tasks
4. **Stage 4** — RLHF/DPO for helpfulness, harmlessness, format

DeepSeek-R1 explicitly uses this four-stage pipeline. RLVR drives the reasoning capability; RLHF polishes the user-facing behavior.

## Related Concepts

- [[GRPO]] — algorithm most associated with RLVR
- [[RLHF]] — paradigm-level counterpart (preference-based)
- [[Direct Preference Optimization]] — preference-based, off-policy alternative
- [[Reasoning Models]] — primary product of RLVR
- [[DeepSeek-R1]] — flagship RLVR model
- [[Fine-Tuning]] — broader hub
- [[Test-Time Compute Scaling]] — capability that RLVR-trained reasoning enables

## Sources

- [[2026-05-09-deepseek-r1]] — DeepSeek-R1, Nature 2025; demonstrates RLVR feasibility

## Open Questions

- Can RLVR be extended to weakly-verifiable domains (semi-formal math, partially-checkable code)?
- Optimal balance of training instances across difficulty levels
- Whether emergent reasoning from RLVR transfers to non-verifiable domains
- Verifier design: how robust must the checker be to prevent gaming?
