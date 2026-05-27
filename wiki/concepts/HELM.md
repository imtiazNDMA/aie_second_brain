---
title: HELM
type: concept
tags: [evaluation, benchmark, llm, holistic-evaluation]
sources: []
created: 2026-05-10
updated: 2026-05-10
---

# HELM

## Definition

**HELM** (Holistic Evaluation of Language Models) is Stanford CRFM's multi-metric, multi-scenario benchmark suite for LLMs, introduced by Liang et al. (2022, "Holistic Evaluation of Language Models"). HELM's goal is to *holistically* evaluate models across many capabilities (accuracy, calibration, robustness, fairness, bias, toxicity, efficiency) over many scenarios (Q&A, summarization, classification, code, reasoning) instead of distilling capability to a single number like [[MMLU]].

## What HELM measures

The original HELM evaluated models along seven metric axes:

| Metric | What it measures |
| --- | --- |
| Accuracy | Standard task performance |
| Calibration | Whether confidence matches accuracy |
| Robustness | Performance under input perturbations |
| Fairness | Performance disparity across demographic groups |
| Bias | Stereotype representation in outputs |
| Toxicity | Generation of harmful content |
| Efficiency | Inference cost / latency |

These were applied across 42 scenarios (Q&A, summarization, sentiment, knowledge, etc.), producing a multi-dimensional evaluation matrix rather than a single score.

## HELM's place in the benchmark ecosystem

| Benchmark | Strength | Weakness |
| --- | --- | --- |
| [[MMLU]] | Easy to interpret single number | Knowledge-only; saturating |
| [[MT-Bench]] / [[AlpacaEval]] | Open-ended chat capability | LLM-as-judge biases |
| [[GSM8K]] / [[HumanEval]] | Verifiable | Narrow scope |
| **HELM** | Multi-axis, holistic | Heavy to run; harder to summarize |

HELM is the **academic-standard** holistic evaluation; production teams typically don't run full HELM but draw scenarios from it for specific capability checks.

## Variants

- **HELM Classic** — original 2022 evaluation
- **HELM Instruct** — instruction-following variant
- **HELM Lite** — smaller compute footprint
- **HELM MMLU**, HELM Math, etc. — focused benchmarks under the same framework

## When to use

- **Comparing many models systematically** — HELM produces a comparable matrix across model families
- **Identifying capability holes** — multi-axis reporting surfaces weaknesses single-number benchmarks miss
- **Academic / research evaluation** — the de-facto standard for paper-grade LLM evaluation

For production deployment decisions, HELM is heavier than necessary — pair faster benchmarks ([[MT-Bench]], [[AlpacaEval]]) with a custom rubric.

## Related Concepts

- [[MMLU]], [[MT-Bench]], [[AlpacaEval]], [[GSM8K]], [[HumanEval]] — sibling benchmarks
- [[LLM Evaluation Benchmark Map]] — synthesis placing HELM in the eval landscape
- [[Percy Liang]] — HELM lead author and CRFM director

## Open Questions

- HELM's relevance as MMLU saturates — does the multi-axis story become more important?
- Best subsets of HELM for production deployment decisions
