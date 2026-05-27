---
title: AlpacaEval
type: concept
tags: [evaluation, benchmark, llm-as-judge, chat]
sources: [2026-04-29-hands-on-llms]
created: 2026-05-10
updated: 2026-05-10
---

# AlpacaEval

## Definition

**AlpacaEval** is an automated benchmark for instruction-following LLMs that uses [[LLM-as-Judge]] to compute pairwise win rates against a reference model (originally `text-davinci-003`, later GPT-4 Turbo). Cheap to run (~\$10), well-correlated with Chatbot Arena Elo, and a standard "quick capability check" in 2024–2026 model releases.

## How it works

1. A fixed prompt set (805 prompts in v1, 805 in v2) is sent to the model under test and to the reference baseline.
2. A judge model (originally GPT-4) is asked to choose which response is better.
3. The model's score is the percentage of prompts where its response wins.

**AlpacaEval 2.0** added **length-controlled win rate (LC)** to neutralize the well-known length bias in LLM judges — longer answers tend to win regardless of quality. LC scoring fits a logistic regression that controls for response length, producing a calibrated win-rate that correlates much better with Chatbot Arena.

## Why it's useful

- **Fast** — 805 prompts × 2 generations + judging finishes in under an hour
- **Cheap** — typically <\$10 per evaluation
- **Pairwise** — comparison against a fixed baseline produces stable rankings
- **LC scoring** — version 2.0 mitigates the dominant judge-bias

## Failure modes

- **Length bias** (mostly fixed in v2 LC scoring) — judges still favor long answers absent length normalization
- **Self-preference** — using GPT-4 to judge GPT-4-family models inflates scores; rotate judge family
- **Prompt-set saturation** — top models all score >95% LC, ceiling effect emerging
- **Style over substance** — judges score fluent-but-wrong over rough-but-correct
- **Dataset overlap with training** — public prompts may be in training data

## When to use

- **Quick capability check** during model development
- **Variant comparison** — A/B test prompts, fine-tunes, sampling configs
- **Sanity check before more expensive evals** (Chatbot Arena, custom rubric)

Pair with [[MT-Bench]] for chat capability, [[GSM8K]] / [[MMLU]] for reasoning/knowledge, and a custom rubric for production fitness.

## Related Concepts

- [[LLM-as-Judge]] — the substrate detector
- [[MT-Bench]] — sister chat benchmark
- [[MMLU]], [[GSM8K]] — knowledge / reasoning complements
- [[LLM Evaluation Benchmark Map]] — synthesis placing AlpacaEval in the eval landscape

## Open Questions

- LC scoring with non-GPT-4 judges — does the calibration transfer?
- Saturation timeline — when does AlpacaEval stop discriminating between frontier models?
