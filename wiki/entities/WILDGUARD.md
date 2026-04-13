---
title: WILDGUARD
type: entity
tags: [safety, moderation, llm]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-13
updated: 2026-04-13
---

# WILDGUARD

## Summary

Safety classifier from the WildGuardMix researchers combining synthetic and human-labeled datasets to detect hallucinations, jailbreaks, and policy violations. Referenced in *The Ultimate Guide to Fine-Tuning* as a red-teaming aid for PEFT pipelines.

## Capabilities

- Benchmarked on adversarial prompts (jailbreaks, toxic combos) for coverage beyond mainstream filters.
- Provides per-category confidence scores helpful for tooling like [[Prompt Flow]] and [[AgentOps]].
- Complementary to [[Llama Guard]]/[[Shield Gemma]] ensembles.

## Usage

- Evaluate tuned checkpoints before deployment.
- Monitor live agent outputs (chatbots, RAG assistants) for regression detection.

## Sources

- [[2026-04-12-ultimate-guide-fine-tuning]] — Highlights WILDGUARD within the safety tooling set.
