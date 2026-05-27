---
title: Test-Time Compute Scaling
type: concept
tags: [reasoning-models, test-time-compute, inference, scaling-laws]
sources: [2026-05-09-s1-test-time-scaling, 2026-05-09-deepseek-r1]
created: 2026-05-09
updated: 2026-05-09
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
- [[Tree-of-Thought]] — search-based variant
- [[Reflexion]] — iterative variant
- [[Chain-of-Thought]] — substrate
- [[Inference Optimization]] — historically focused on *reducing* compute; test-time scaling deliberately spends it
- [[Compound AI Systems]] — production architecture that routes between cheap and expensive paths

## Sources

- [[2026-05-09-s1-test-time-scaling]] — Muennighoff et al., EMNLP 2025
- [[2026-05-09-deepseek-r1]] — DeepSeek-AI, Nature 2025

## Open Questions

- What's the functional form of the scaling law? (log-linear? power-law? task-specific?)
- Optimal split between train-time and test-time compute for a fixed total budget
- Generalization of test-time gains across task families
- Composability with RAG / tool use / memory at long horizons
