title: Designing Machine Learning Systems
type: source
tags: [book, mlops, production-ml, system-design]
sources: [Designing Machine Learning Systems.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Designing Machine Learning Systems

**Author:** [[Chip Huyen]]  
**Published:** 2022  
**Source:** Designing Machine Learning Systems.pdf  
**Date ingested:** 2026-04-12  
**Type:** book

## Summary

This book covers the end-to-end lifecycle of production ML systems. Unlike research-focused ML, designing for production requires balancing multiple concerns: data pipelines, model training infrastructure, deployment strategies, latency constraints, and business metrics. The author emphasizes that most ML projects fail not because of model performance, but due to engineering and operational challenges.

## Key Claims

- Product requirements, not model SOTA, determine architecture choices.
- Data work (collection, labeling, quality) dominates time and risk.
- Deployment and monitoring strategies must be planned alongside modeling.
- System design principles (latency budgets, redundancy, user tolerance) apply directly to ML features.

## Structure

- **Frameworks** — Tooling and library choices
- **Data** — Data pipelines, feature stores, data preparation
- **Modeling** — Introduction, Interpretability, Model validation, Evaluation, Experiment tracking
- **Training** — [[Distributed Training]] patterns, Training at scale
- **Deployment** — Hardware, Inference optimization, Edge deployment
- **Scaling** — System design trade-offs, user tolerance for loss/latency

## Entities Mentioned

- [[Chip Huyen]] — Author sharing production war stories and templates

## Concepts Covered

- [[Data Pipeline]] — Core infrastructure for ML products
- [[Feature Store]] — Contract for feature reuse and governance
- [[Data Collection]] — Drives dataset freshness and coverage
- [[Data Labeling]] — Handles annotation quality at scale
- [[Data Cleaning]] — Addresses drift, anomalies, and bias
- [[Distributed Training]] — Scaling models on clusters
- [[Model Evaluation]] — Offline vs online metrics alignment
- [[Inference Optimization]] — Hardware, quantization, caching
- [[MLOps]] — Cultural practices for ML teams
- [[Real-Time Deployment]] — Online serving design
- [[Batch Deployment]] — Offline scoring and pipelines
