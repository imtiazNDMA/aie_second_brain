---
title: Supervised Fine-Tuning
type: concept
tags: [fine-tuning, post-training, sft, alignment]
sources: [2026-04-12-llm-engineers-handbook, 2026-04-12-ultimate-guide-fine-tuning, 2026-05-09-s1-test-time-scaling]
created: 2026-05-09
updated: 2026-05-09
---

# Supervised Fine-Tuning

## Definition

**Supervised Fine-Tuning (SFT)** is the post-pretraining step that teaches a base language model to follow instructions by training on `(prompt, response)` pairs with a standard next-token-prediction loss. It's the simplest, cheapest, and most reliable post-training stage — and the foundation that every preference-optimization method ([[RLHF]], [[Direct Preference Optimization]], [[ORPO]], [[KTO]]) builds on top of.

## Mechanics

Given a dataset $\mathcal{D} = \{(x_i, y_i)\}_{i=1}^N$ of prompts and target responses:

$$\mathcal{L}_\text{SFT}(\theta) = -\sum_{i=1}^N \sum_{t=1}^{|y_i|} \log p_\theta(y_{i,t} \mid x_i, y_{i,<t})$$

This is identical to the pretraining loss restricted to the response tokens. Implementation details that matter:

- **Loss masking** — typically only the response tokens contribute to the loss, not the prompt
- **Packing** — pack multiple short examples into one context window for efficiency
- **Learning rate** — much lower than pretraining (typically 1e-5 to 1e-4)
- **Epochs** — usually 1–3; more causes overfitting on small SFT datasets
- **Sequence length** — match expected production prompts; truncating long examples costs information

## Where SFT fits in the lifecycle

```
Pretrained base model
  → SFT (instruction following)
    → Preference optimization (DPO / RLHF / ORPO / KTO) — optional but standard
      → RLVR (reasoning models) — optional
        → Aligned model
```

[[ORPO]] is the exception that collapses SFT and preference into one stage — most other methods keep them separate.

## Data sources

| Source | Quality | Scale |
| --- | --- | --- |
| Curated public datasets (Alpaca, ShareGPT, Open-Orca, FLAN) | Mixed | 10K–1M examples |
| Distillation from a stronger model | High if teacher is strong | 1K–100K examples |
| Hand-written by domain experts | Highest | 100–10K examples |
| Production logs (with human review) | High; expensive | Variable |
| Synthetic via Self-Instruct / Evol-Instruct | Variable; risk of teacher's blind spots | 10K–100K examples |

The 2024–2025 trend: **smaller, higher-quality SFT datasets beat larger noisy ones**. The [[2026-05-09-s1-test-time-scaling|s1]] paper trained a state-of-the-art reasoning model on **1,000** carefully curated examples — a "less is more" demonstration that matched costly RL recipes.

## Failure modes

- **Catastrophic forgetting** — SFT can erase pretraining capabilities; mitigated with low learning rates and short training
- **Overfitting** — small SFT datasets lead to memorization rather than generalization; held-out eval essential
- **Style collapse** — the model adopts the SFT distribution's style, which may be narrower than desired
- **Length bias** — if SFT examples are uniformly long, the model produces long answers regardless of question
- **Mode-seeking** — SFT pushes the model to one acceptable answer; preference optimization later helps reintroduce diversity

## SFT with parameter-efficient methods

SFT composes cleanly with [[Parameter-Efficient]] adapters — see [[Parameter-Efficient Fine-Tuning]]:

- **[[Low-Rank Adaptation|LoRA]] SFT** — freeze base weights; train low-rank adapters; 1–10% trainable params
- **[[QLoRA]] SFT** — 4-bit base + LoRA; consumer-GPU territory
- **Full-parameter SFT** — only when adapters underperform on the target task

For most production use cases, LoRA-SFT is the right starting point.

## Evaluation

SFT models are evaluated against:

- **Held-out instruction-following** — does the model do what it's told?
- **Capability preservation** — [[MMLU]], [[GSM8K]] etc. compared to base; check for catastrophic forgetting
- **Style consistency** — domain-rubric scoring (see [[LLM Evaluation Rubrics]], [[SOMA Evaluation Framework]])
- **Pre-preference baseline** — SFT scores set the floor for subsequent DPO/RLHF improvements

## Related Concepts

- [[Fine-Tuning]] — broader hub
- [[Parameter-Efficient]], [[Low-Rank Adaptation]], [[QLoRA]] — adapter overlay
- [[Direct Preference Optimization]], [[RLHF]], [[ORPO]], [[KTO]] — what comes after SFT
- [[RLVR]] — reasoning-model post-SFT step
- [[Distillation]] — where most modern SFT data comes from
- [[Seven-Stage Fine-Tuning Pipeline]] — full lifecycle
- [[LLM Alignment and Post-Training]] — synthesis
- [[Parameter-Efficient Fine-Tuning]] — synthesis

## Sources

- [[2026-04-12-llm-engineers-handbook]] — practical SFT recipes for [[LLM Twin]]
- [[2026-04-12-ultimate-guide-fine-tuning]] — Stage 4 of the pipeline
- [[2026-05-09-s1-test-time-scaling]] — 1K-example SFT for reasoning capability

## Open Questions

- Optimal SFT dataset size as a function of base model capability
- How much SFT data is needed to recover from catastrophic forgetting?
- Can SFT alone match preference-optimization results given good enough data?
