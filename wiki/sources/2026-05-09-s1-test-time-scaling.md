---
title: "s1: Simple test-time scaling"
type: source
authors: [Niklas Muennighoff, Zitong Yang, Weijia Shi, Xiang Lisa Li, Li Fei-Fei, Hannaneh Hajishirzi, Luke Zettlemoyer, Percy Liang, Emmanuel Candès, Tatsunori Hashimoto]
tags: [reasoning-models, test-time-compute, sft, distillation, math-reasoning]
sources: [arxiv:2501.19393]
venue: EMNLP 2025
created: 2026-05-09
updated: 2026-05-09
---

# s1: Simple test-time scaling

**arXiv:** [2501.19393](https://arxiv.org/abs/2501.19393)
**Date submitted:** January 31, 2025
**Venue:** EMNLP 2025 (Main Conference)
**Code/data:** [github.com/simplescaling/s1](https://github.com/simplescaling/s1)
**Affiliations:** Stanford, University of Washington, Allen Institute for AI

## Summary

Shows that the test-time compute scaling behavior popularized by OpenAI's o1 can be reproduced with **1,000 carefully curated training examples** and a one-line inference trick called **budget forcing**. The result, s1-32B (Qwen2.5-32B-Instruct fine-tuned on s1K), exceeds o1-preview by up to 27% on MATH and AIME24. The paper democratizes the reasoning-model paradigm: no proprietary RL, no million-sample dataset, no closed pipeline.

## Key Takeaways

### s1K — 1,000 questions, three criteria

Curated from a 59K-question pool by ablating against three axes:
- **Difficulty** — keep only problems the model gets wrong without thinking
- **Diversity** — span 50 mathematical and STEM domains
- **Quality** — clean formatting, verified solutions, traceable provenance

Reasoning traces sourced by sampling from Gemini Flash Thinking. Final dataset: 1,000 (question, reasoning, answer) triples.

### Budget forcing — the inference trick

Two operations applied at inference time:
- **Force end**: when the cumulative thinking-token budget is reached, append `</think>` to terminate reasoning and request the answer.
- **Force continue**: when the model emits `</think>` early, suppress it and append the literal token `Wait` to extend reasoning.

That's the entire intervention. No new objective, no RL, no auxiliary head — just a generation-time string controller.

### Why "Wait" works

Appending `Wait` triggers the model to re-examine its work. The paper shows error correction frequently happens after a forced extension — the model identifies and fixes mistakes that would have made it into the final answer.

### Results

- **AIME24**: 50% (no budget forcing) → **57%** (with budget forcing); exceeds o1-preview's 44%.
- **MATH-500**: matches o1-preview within 1-2 percentage points.
- **GPQA Diamond**: meaningful gains over base Qwen2.5-32B.

### Test-time scaling curve

s1 produces a clean monotonic relationship between thinking-token budget and accuracy across multiple benchmarks — replicating the qualitative behavior OpenAI reported for o1 but using SFT-only training.

### Cost/openness profile

Total training cost: **under \$50** (cited by authors). Full data, code, and weights released open-source. This is the most reproducible reasoning-model recipe published.

## Why this matters for the wiki

s1 establishes that **test-time compute scaling is the new dimension of model improvement** — orthogonal to parameter count and pretraining tokens. Pairs with [[DeepSeek-R1]] for the RL view, but also as the simpler SFT-distillation path. Your wiki's [[Inference Optimization]] page covers latency reduction techniques but has no entry for *deliberately spending more inference compute* — that gap is closed by [[Test-Time Compute Scaling]] and [[Budget Forcing]].

## Connections

- [[Niklas Muennighoff]] — lead author, Stanford (new entity)
- [[Tatsunori Hashimoto]] — senior author, Stanford (new entity)
- [[Hannaneh Hajishirzi]] — co-author (existing entity, update sources)
- [[Percy Liang]] — co-author, Stanford (new entity)
- [[Li Fei-Fei]] — co-author, Stanford (new entity)
- [[Test-Time Compute Scaling]] — concept (new)
- [[Budget Forcing]] — concept (new)

## Related Concepts

- [[Test-Time Compute Scaling]] (new — primary contribution)
- [[Budget Forcing]] (new — inference technique)
- [[Reasoning Models]] (new — broader category)
- [[Chain-of-Thought]] (the substrate s1 amplifies)
- [[Self-Consistency]] (related sampling strategy at test time)
- [[DeepSeek-R1]] (parallel approach via RL)
- [[Distillation]] (s1 distills Gemini reasoning traces)
- [[Inference Optimization]] (counterpoint — s1 deliberately spends compute, not saves it)
