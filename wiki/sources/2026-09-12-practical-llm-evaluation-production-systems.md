---
tags: [source, book, llm-evaluation, production-ml]
sources: ["Practical LLM Evaluation for Production Systems.pdf"]
created: 2026-09-12
updated: 2026-09-12
---

# Practical LLM Evaluation for Production Systems

**Source:** Practical LLM Evaluation for Production Systems- Measure, -- Ammar Mohanna, Indrajit Kar, Zonunfeli Ralte -- 1, 2026 -- Packt Publishing -- isbn13 9781807423896
**Date ingested:** 2026-09-12
**Type:** book

## Summary

A production-focused evaluation manual covering 11 chapters on training-time data quality, inference-time control systems, multimodal/VLM evaluation, MoE-specific evaluation, computer-using agent evaluation, OCR-NER pipeline evaluation, reasoning-model process validity, and specialized systems (Text2SQL, guardrail SLMs, embedding SLMs). Central thesis: evaluation is a decision system connecting evidence → uncertainty → threshold → action, not a score.

## Key Claims

- Production evaluation connects evidence → uncertainty → threshold → action (ship/block/investigate/rollback); a single metric is reporting, not evaluation
- Q/S/C/R framework defines "working" across Quality, Safety, Cost, Reliability; release readiness requires all relevant axes to meet product-defined decision thresholds
- Slice-based gating defeats aggregate-metric false confidence; a model at 4.7% hallucination masked 12% on high-line-item documents
- Inference-time evaluation is a complete control system: input validation → prompt governance → output contract → safety gates → monitoring → incident loop
- Agent evaluation (CUA/LAM) must capture what agent saw, selected, called, changed, failed, recovered, and whether final outcome was safe
- Reasoning models need process validity measured separately from final-answer accuracy
- LLM-as-judge is one layer in a layered evaluator stack; deterministic validators and trace-based checks come first

## Entities Mentioned

- [[Ammar Mohanna]] — co-author, PhD in LLM evaluation/MLOps
- [[Indrajit Kar]] — co-author, MD and Head of AI-native Business
- [[Zonunfeli Ralte]] — co-author, AI entrepreneur, RastrAI
- [[Shield Gemma]] — guardrail SLM referenced for policy enforcement
- [[DeepSeek-R1]] — reasoning model used for process validity examples
- [[O'Reilly Media]] — publisher context

## Concepts Covered

- [[LLM Evaluation Rubrics]] — production evaluation as decision system, not score
- [[Slice-Based Evaluation]] — test suites tagged by intent/risk/locale/segment
- [[LLM-as-Judge]] — one layer in layered evaluator stack, not first line of defense
- [[Agent Trust and Safety Controls]] — CUA/LAM evaluation requiring environment interaction
- [[Process Validity]] — measuring intermediate reasoning step soundness
- [[Inference Optimization]] — inference-time control system with stations
- [[Hallucination]] — slice-based gating to defeat aggregate-metric false confidence
- [[Vision Language Models]] — VLM grounding fidelity and visual drift evaluation
- [[Mixture of Experts]] — MoE-specific evaluation for routing and expert collapse
- [[LLM Evaluation Benchmark Map]] — benchmarks as insufficient for production decisions
