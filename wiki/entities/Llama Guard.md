---
title: Llama Guard
type: entity
tags: [safety, moderation, llm]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-13
updated: 2026-04-13
---

# Llama Guard

## Summary

Meta’s safety classifier for filtering prompts and completions. Llama Guard ships as a lightweight LLM fine-tuned on policy-compliance datasets and is used in *The Ultimate Guide to Fine-Tuning* as a reference guardrail for PEFT pipelines.

## Capabilities

- Dual-stage moderation (prompt + response) with configurable severity levels.
- Provides structured violation categories that feed governance dashboards.
- Often paired with [[Shield Gemma]] or [[WILDGUARD]] for ensemble safety judgments.

## Usage

- Wrap LoRA/DoRA tuned checkpoints before public release.
- Integrate into [[Agent Trust and Safety]] workflows for red-teaming and regression tests.

## Sources

- [[2026-04-12-ultimate-guide-fine-tuning]] — Highlights Llama Guard in the safety tooling stack (Chapter 7 & 8).
