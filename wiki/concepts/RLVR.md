---

title: RLVR
type: concept
tags: [reinforcement-learning, alignment, reasoning-models, paradigm, cluster/training-alignment]
sources: [2026-05-09-deepseek-r1, 2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-05-09
updated: 2026-11-13
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

## Hands-on findings from *Build a Reasoning Model (From Scratch)*

Raschka (2026) runs RLVR with [[GRPO]] on [[Qwen3]] 0.6B base, using a [[MATH-500]] verifier. Page numbers refer to that book.

**RLVR as RLHF with the reward model replaced.**
- **RLHF has two steps:** train a reward model on human rankings, then use its scalar scores in the RL objective (p183–185).
- **RLVR swaps the learned reward model for a deterministic verifier.** For math, the reward is 1 for a correct answer and 0 otherwise. This collapses the two steps into a single generate → score → update loop (p185).
- **Advantages** (p186):
  - No separate reward model, which is often comparable in size and cost to the base LLM.
  - Rewards are reproducible and free of annotation noise.
  - Training scales to large datasets automatically.
  - The cost: it is restricted to verifiable domains such as math and code.
- **Popularity.** RLVR's popularity is traced to DeepSeek-R1 (arXiv 2501.12948), whose rewards were math correctness checks plus code compilation and execution. Code rewards need sandboxed execution (p186).

**Avoiding data leakage.** MATH has about 12,500 problems. Training uses the 12,000 that do not overlap with the 500 MATH-500 test problems (p193).

**Don't reward the worked solution.** The dataset's worked-solution field is deliberately *not* used to reward intermediate steps. Doing so would constrain the model and risk overfitting to one solution style; the model should explore the solution space freely (p195). The DeepSeek-R1 team also tried process reward models during training without success, and concluded that final-answer rewards were better (p201). See [[Process Reward Model]].

**Reward-shaping experiments** (all scored on MATH-500):

| Variant | Result | Source |
|---|---|---|
| Strict reward: correct *and* boxed | 47.4% | Table 6.1 |
| Partial credit: 0.5 for a correct but unboxed answer | 37.8%, lower than strict | Table B.5, p329 |
| Extra `<think>` format reward, weight 1.0 | Accuracy rose, then dropped sharply while average reward stayed flat | p261–263 |
| Format reward conditional on correctness (`format_reward *= rlvr_reward`) | Dropped, then recovered; more stable | p331 |

The format reward at weight 1.0 paid out for format alone, so the model stopped focusing on correctness. The book suggests a weight of 0.1 or making the format reward conditional on correctness.

> **Nuance on "reward hacking is rare" (table above).** The verifier itself is exact. But the book's format-reward run shows that RLVR is still exposed to reward *mis-specification*: auxiliary reward terms can be optimized at the expense of correctness. "A correctness-only reward is sufficient for RLVR in practice" (p256).

**Compute.** A comparable full DeepSeek-R1-Zero-style run would cost "several hundred thousand dollars in GPU compute" (p186). The book's runs:
- **GRPO:** a few rounds took about 12 h and 70 GB of RAM on a DGX Spark (p268).
- **Distillation:** about 3 h and 15 GB (p268). See [[Distillation]].

**Recommended combination** (p302): distill from a strong teacher, continue with RLVR, then apply inference-time scaling at deployment.

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
- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026; from-scratch RLVR on Qwen3 0.6B with MATH-500 verifier and reward-shaping ablations

## Open Questions

- Can RLVR be extended to weakly-verifiable domains (semi-formal math, partially-checkable code)?
- Optimal balance of training instances across difficulty levels
- Whether emergent reasoning from RLVR transfers to non-verifiable domains
- Verifier design: how robust must the checker be to prevent gaming?
