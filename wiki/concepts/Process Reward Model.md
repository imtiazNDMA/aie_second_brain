---

title: Process Reward Model
type: concept
tags: [rlhf, reward-modeling, reasoning-models, alignment, cluster/training-alignment]
sources: [2026-05-09-deepseek-r1, 2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-05-10
updated: 2026-11-13
---


# Process Reward Model

## Definition

A **Process Reward Model (PRM)** is a [[Reward Modeling|reward model]] that scores **each intermediate step** of a reasoning chain rather than only the final answer. Where standard *outcome reward models (ORM)* answer "is this final response good?", PRMs answer "is this reasoning step on the right track?". PRMs are an active area of research for [[Reasoning Models]] because per-step supervision turns multi-step reasoning into a denser learning signal.

## ORM vs PRM

| Aspect | Outcome RM (standard) | Process RM |
| --- | --- | --- |
| Granularity | Whole response | Each reasoning step |
| Data shape | (prompt, response, score) | (prompt, step_1, ..., step_n, per-step labels) |
| Annotation cost | Lower (one label per response) | Much higher (label every step) |
| Signal density | Sparse | Dense |
| Training stability | Established | Active research |
| Reward hacking risk | Final-answer gaming | Per-step gaming + spurious "good-looking" steps |

## Why PRMs matter for reasoning models

A reasoning chain on a math problem might emit 50–500 tokens of intermediate reasoning before the final answer. With ORM-only supervision:

- The model gets one signal at the end
- Credit assignment to specific reasoning steps is implicit
- Errors mid-chain that don't affect the final answer are invisible

With PRM supervision:

- Every step gets its own signal
- The model can learn which *kinds* of reasoning steps lead to correct answers
- Search-based decoding (best-first, MCTS) can use PRM scores to prune branches in real time

## Data collection

PRM data is expensive. Two approaches:

- **Human annotation** — annotators label each step as correct, neutral, or incorrect (OpenAI's Let's Verify Step by Step, 2023, used this)
- **Automatic labeling** — run rollouts to completion, label each step by whether continuations from it succeed (Math-Shepherd, 2023)

The automatic approach is much cheaper and is what most 2024–2025 PRMs use, but it inherits the noise of the underlying solver.

## Use in inference

PRMs serve two roles:

1. **Training signal** — used in RL or as supervision during SFT for reasoning models
2. **Inference-time guidance** — score multiple candidate next-steps in [[Tree-of-Thought]]-style search, prune low-scoring branches

The 2024–2025 reasoning-model wave largely *bypassed* PRMs in favor of [[RLVR]] with rule-based outcome rewards (DeepSeek-R1's [[GRPO]] on rule-based correctness), demonstrating that strong reasoning could emerge from outcome-only signals at sufficient scale. PRMs remain an active research direction with potential for further gains.

## Notes from *Build a Reasoning Model (From Scratch)*

Raschka (2026) adds these points:

- **Step-level judges for training.** PRMs are learned "step-level judges" that give reward signals at each step during RL training. They are "predominantly developed for training rather than for pure evaluation." Verifiers, by contrast, check correctness symbolically and usually only at the outcome (Appendix F, p395–396).
- **Hard to scale.** "PRMs are difficult to train reliably at scale." DeepSeek-R1 did not adopt PRMs and used verifiers instead (p396). The R1 team tried PRMs for intermediate-step scoring during training without success and concluded that final-answer correctness rewards worked better (p201).
- **Mixed results in practice.** "Scoring the intermediate steps of a response remains an active research area"; PRMs "do not always yield better outputs in practice" (p142).
- **Where MATH-500 comes from.** The [[MATH-500]] split comes from OpenAI's "Let's Verify Step by Step" (arXiv 2305.20050). That work also released 800,000 step-level correctness labels for MATH solutions (p307–308).
- **Outlook.** Rewards that go beyond the final answer may give a richer signal. DeepSeekMath-V2 (arXiv 2511.22570) showed that judging the whole answer during training can meaningfully improve reasoning (p301).

## Related Concepts

- [[Reward Modeling]] — parent concept (outcome-style)
- [[RLVR]] — rule-based-verifier alternative that bypasses learned PRMs
- [[GRPO]] — RL algorithm used in DeepSeek-R1 with outcome rewards
- [[Reasoning Models]] — primary application area
- [[Tree-of-Thought]] — inference-time consumer of PRM-style step scoring
- [[GSM8K]] — canonical PRM evaluation domain
- [[LLM Alignment and Post-Training]] — synthesis on alignment methods
- [[Reasoning Models Landscape]] — synthesis where this fits

## Sources

- [[2026-05-09-deepseek-r1]] — discusses the choice to use rule-based outcome rewards instead of PRMs
- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026; PRMs as step-level judges, R1's unsuccessful PRM attempt

## Open Questions

- Will PRMs add meaningful gains beyond what rule-based RLVR already produces?
- Optimal granularity — token-level vs step-level vs phase-level labels
- Automatic-labeling noise tolerance for reliable PRM training
