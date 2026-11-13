---
title: Test-Time Compute Scaling
type: concept
tags: [reasoning-models, test-time-compute, inference, scaling-laws, cluster/reasoning-prompting]
sources: [2026-05-09-s1-test-time-scaling, 2026-05-09-deepseek-r1, 2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-05-09
updated: 2026-11-13
---

# Test-Time Compute Scaling

## Definition

**Test-time compute scaling** is the empirical phenomenon — and engineering discipline — of trading more inference computation per query for higher accuracy. Unlike pretraining or post-training scaling (which improve the base model), test-time scaling improves answers by *spending more compute at the moment of answering* — through longer thinking traces, multiple samples, search, or iterative refinement.

It is the third axis of LLM scaling, alongside pretraining-compute (Kaplan/Chinchilla) and post-training-compute (RLHF/DPO).

## The empirical regularity

For a fixed model, accuracy on hard tasks (math, code, reasoning) increases monotonically — often log-linearly — as a function of inference compute. This is the same qualitative shape as pretraining scaling laws, but the lever is at inference time.

Concrete evidence:
- [[2026-05-09-s1-test-time-scaling]] — s1-32B on AIME24: 50% (no thinking budget) → 57% (forced longer thinking)
- [[2026-05-09-deepseek-r1]] — R1-Zero's response length grows monotonically through training as rewards drive it to think longer
- OpenAI o1 (closed) — original demonstration of clean accuracy-vs-thinking-tokens curves

## Mechanisms

Test-time compute can be spent in several ways. Common families:

### Sequential — single-stream thinking
Generate a long internal chain-of-thought before producing the answer. Compute scales linearly with thinking-token budget.
- [[Budget Forcing]] — controlled by truncating or extending generation
- Reasoning-model defaults — trained to think for the right duration

### Parallel — sample many, aggregate
Generate K candidate answers and select/aggregate.
- [[Self-Consistency]] — majority vote across K CoT samples
- Best-of-N with verifier — sample K, score with a verifier or judge, return the best
- [[RAG-Fusion]] — multiple query rewrites, retrieve and merge

### Search — explicit tree exploration
Treat reasoning as search; compute scales with tree size.
- [[Tree-of-Thought]] — branching, evaluation, pruning at intermediate nodes
- MCTS-style for math / code (e.g., AlphaCode, AlphaGeometry)

### Iterative — revise until satisfied
Generate, critique, regenerate.
- [[Reflexion]] — verbal-RL style self-critique loop
- [[Corrective RAG]] — retrieve, score relevance, retry if poor
- Self-refine — N rounds of edit-then-evaluate

## Why this is a real scaling law

The relationship is not just "more is better." Three properties make it law-like:

1. **Diminishing returns are smooth** — there's no cliff; doubling compute gives a predictable accuracy bump
2. **Substitutes for parameters** — small models with large test-time budgets can match large models with small budgets (s1-32B vs o1-preview is the canonical demonstration)
3. **Composes with training** — reasoning-model training (RLVR/GRPO) makes the model *better at spending* test-time compute, raising the entire curve

## Engineering implications

### Budget allocation becomes a first-class decision

Production systems now choose:
- *Train-time compute* — better defaults, lower per-query cost
- *Test-time compute* — higher peak accuracy, paid per query
- *Mix* — small fast model for easy queries, reasoning model for hard ones (compound systems)

### Cost models shift

A reasoning model query may cost 10–100× a non-reasoning query. Pricing, SLA design, and rate limiting need to account for variable per-query compute.

### Latency vs. accuracy trade-off becomes user-visible

Chat applications cap thinking budgets; offline analysis can spend minutes per query. The right budget is task-dependent and increasingly UI-exposed (e.g., "thinking" indicators).

### Caching becomes more valuable

Reasoning is expensive enough that caching answers — and even caching partial reasoning chains — pays back faster than for short-answer queries.

## Measured on a small model: *Build a Reasoning Model (From Scratch)*

Raschka (2026) groups reasoning methods into three families (p8–9):
- **Inference-time compute scaling** (also called test-time scaling): no weight change.
- **Reinforcement learning:** see [[RLVR]].
- **[[Distillation]].**

He covers three inference-time methods out of more than 10 he evaluated across thousands of experiments (p96–97):
- **[[Chain-of-Thought]] prompting:** a longer response, a *sequential* technique.
- **[[Self-Consistency]]:** many responses, a *parallel* technique.
- **[[Self-Refinement]]:** iterative.

**Results on [[MATH-500]] with [[Qwen3]] 0.6B:**

| Method | Base model | Reasoning model |
|---|---|---|
| Greedy | 15.2% (10.1 min) | 48.2% (182.1 min) |
| + CoT | 40.6% (84.5 min) | — |
| + SC n=10 + CoT | 52.0% (862.6 min) | — |
| + SC n=3 + CoT | — | 55.2% (544.4 min) |
| + self-refinement, no scorer, 1 iteration | 25.0% | 56.6% |
| + self-refinement, heuristic scorer, 1 iteration | 21.6% | 57.8% (498.6 min) |

Sources: Table 4.1 (p133) and Table 5.1 (p176).

The book's takeaway is "better accuracy for more compute" (p134). Two cautions come with it:
- **Temperature and top-p alone are not inference scaling.** They only control diversity: 17.8% against 15.2% greedy (p134).
- **CoT prompting mostly helps base models.** Trained reasoning models "don't need or benefit from" it (p102, p137).

**Why reasoning costs more** (p14–15):
1. Every output token is a forward pass, so twice the length is roughly twice the passes.
2. Many tasks need several model calls: sampled candidates, tool calls, verifiers.

On MATH-500 the reasoning model's answers averaged 1361.21 tokens against 96.74 for the base model, about 10× longer (Table B.1, p319).

**Overthinking.** On simple problems CoT can hurt: the model generates erroneous explanations and misleads itself (p102). Reasoning is not needed for summarization, translation or knowledge QA (p14).

**Adaptive budgets as a future direction** (p301). Not every answer should be the same length. Application-layer controllers can decide whether to answer briefly, spend more budget or stop early. The book's example is OpenAI's GPT-5 "auto" mode (2025), which steers reasoning effort and trace length.

**Combining with training** (p180, p302). Inference scaling can be applied on top of RL- or distillation-trained models. The book recommends distillation, then RLVR, then inference-time scaling at deployment.

## Limitations

- **Off-distribution decay** — test-time compute helps most on tasks the model was trained to think about; gains are weaker on novel domains
- **Confident wrong reasoning** — models can spend more tokens reaching a plausible-but-wrong conclusion
- **Latency floors** — user-facing chat has a wall-clock budget that hard-caps useful thinking time
- **Verification dependence** — best-of-N is bounded by the quality of the verifier; if the verifier is bad, more samples just amplifies bias

## Related Concepts

- [[Budget Forcing]] — simplest control method
- [[Reasoning Models]] — models trained to spend test-time compute well
- [[DeepSeek-R1]] — RL-trained exemplar
- [[Self-Consistency]] — parallel sampling strategy
- [[Self-Refinement]] — iterative critique-and-revise strategy
- [[Tree-of-Thought]] — search-based variant
- [[Reflexion]] — iterative variant
- [[Chain-of-Thought]] — substrate
- [[Inference Optimization]] — historically focused on *reducing* compute; test-time scaling deliberately spends it
- [[Compound AI Systems]] — production architecture that routes between cheap and expensive paths

## Sources

- [[2026-05-09-s1-test-time-scaling]] — Muennighoff et al., EMNLP 2025
- [[2026-05-09-deepseek-r1]] — DeepSeek-AI, Nature 2025
- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026; CoT, self-consistency and self-refinement measured on Qwen3 0.6B / MATH-500

## Open Questions

- What's the functional form of the scaling law? (log-linear? power-law? task-specific?)
- Optimal split between train-time and test-time compute for a fixed total budget
- Generalization of test-time gains across task families
- Composability with RAG / tool use / memory at long horizons
