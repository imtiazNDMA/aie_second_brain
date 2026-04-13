---
title: Shield Gemma
type: entity
tags: [safety, moderation, llm]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-13
updated: 2026-04-13
---

# Shield Gemma

## Summary

Google’s Gemma-based safety model designed to detect policy violations and risky outputs. Mentioned in *The Ultimate Guide to Fine-Tuning* as part of the evaluation toolkit for tuned LLMs.

## Capabilities

- Multilingual moderation across violence, self-harm, sexual content, and sensitive attributes.
- Works as a second opinion alongside [[Llama Guard]] to reduce false negatives.
- Can run on modest hardware thanks to compact Gemma checkpoints.

## Usage

- Integrate into CI pipelines for [[Fine-Tuning]] projects before model promotion.
- Provide offline scoring for [[RAG Evaluation]] and prompt audits.

## Sources

- [[2026-04-12-ultimate-guide-fine-tuning]] — Lists Shield Gemma among recommended safety evaluators.
