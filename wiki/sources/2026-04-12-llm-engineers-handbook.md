---
title: LLM Engineer's Handbook
type: source
tags: [llm, engineering, handbook]
sources: [LLM Engineers Handbook.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# LLM Engineer's Handbook

**Authors:** [[Paul Iusztin]], [[Maxime Labonne]]  
**Publisher:** Packt (2024)  
**Date ingested:** 2026-04-12  
**Type:** book

## Summary

Practical manual for shipping production-grade large language models via the “[[LLM Twin]]” exemplar project. The book organizes work around the Feature-Training-Inference (FTI) architecture: collect personal corpora, build logical feature stores, run supervised [[Fine-Tuning]] + DPO alignment, and deploy optimized inference stacks backed by RAG, monitoring, and CI/CD. Tooling coverage spans [[ZenML]] stacks, Hugging Face Hub, Comet ML tracking, [[Opik]] prompt monitoring, SageMaker/Bedrock deployments, and inference optimizations (quantization, speculative decoding, vector databases).

## Key Claims

- A well-scoped MVP ([[LLM Twin]]) grounds architecture choices and keeps teams focused on measurable user value.
- FTI architecture cleanly separates data engineering, training/adaptation, and inference/serving, enabling independent iteration.
- High-quality data pipelines (scrapers, ETL, logical feature stores) are prerequisites for reliable [[Fine-Tuning]] and RAG.
- Alignment requires both supervised [[Fine-Tuning]] and preference optimization (DPO) plus rigorous evaluation suites.
- Deployments must combine inference optimization (quantization, spec decoding) with observability (Comet, [[Opik]]) and LLMOps practices.

## Structure

- **Chapter 1 — [[LLM Twin]] concept:** Defines objectives, scope, and FTI blueprint.
- **Chapter 2 — Tooling & installation:** Sets up Python/Poetry, [[ZenML]], MongoDB, Qdrant, Comet, [[Opik]], and cloud credentials.
- **Chapter 3 — Data engineering:** Builds scrapers/ETLs for LinkedIn, Medium, Substack, GitHub; standardizes storage in a logical [[Feature Store]].
- **Chapter 4 — RAG feature pipeline:** Generates embeddings, populates vector stores, and optimizes retrieval quality.
- **Chapter 5 — Supervised [[Fine-Tuning]]:** Creates instruction datasets and fine-tunes Llama 3.1 8B (full/LoRA/[[QLoRA]]) via Hugging Face + [[ZenML]].
- **Chapter 6 — Preference alignment:** Applies [[Direct Preference Optimization]] (with Unsloth) to match the Twin’s tone.
- **Chapter 7 — Evaluation:** Designs quantitative/qualitative eval plans, benchmark harnesses, and custom TwinLlama tests.
- **Chapter 8 — Inference optimization:** Covers quantization, speculative decoding, batching, and runtime selection (vLLM, Text Generation Inference).
- **Chapter 9 — RAG inference pipeline:** Implements advanced search (self-query, rerankers) and custom retrieval modules.
- **Chapter 10 — Deployment:** Packages endpoints on AWS SageMaker, exposes FastAPI services, and secures access.
- **Chapter 11 — MLOps & LLMOps:** Operationalizes CT/CI/CD, registry promotion, prompt monitoring ([[Opik]]), and governance.
- **Appendix — MLOps principles:** Summarizes reproducibility, automation, observability, and collaboration guidelines.

## Entities Mentioned

- [[Paul Iusztin]] — Co-author specializing in data and inference pipelines.
- [[Maxime Labonne]] — Co-author emphasizing tooling and democratization.
- [[ZenML]] — Workflow orchestrator for pipelines and stacks.
- [[Comet ML]] — Experiment tracker and lineage store.
- [[Opik]] — Prompt monitoring and evaluation layer.

## Concepts Covered

- [[LLM Twin]] — Personalized assistant MVP anchoring the book.
- [[Feature-Training-Inference Architecture]] — Structural blueprint for LLM systems.
- [[Direct Preference Optimization]] — Alignment technique applied to TwinLlama.
- [[Low-Rank Adaptation]] and [[QLoRA]] — PEFT strategies for constrained hardware.
- [[Adaptive RAG]] — Retrieval pipelines fed by logical feature stores.
- [[LLM Application Loop]] — Feedforward/evaluation framing for app UX.
