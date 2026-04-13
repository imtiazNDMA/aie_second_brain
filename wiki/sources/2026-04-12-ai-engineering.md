title: [[AI Engineering]]
type: source
tags: [book, mlops, production-ml, engineering]
sources: [AI ENGINEERING by Chip Huyen (PDF)(Nonfiction).pdf]
created: 2026-04-12
updated: 2026-04-12
---

# [[AI Engineering]]

**Author:** [[Chip Huyen]]  
**Published:** 2024  
**Source:** [[AI Engineering]] by [[Chip Huyen]] (PDF)(Nonfiction).pdf  
**Date ingested:** 2026-04-12  
**Type:** book

## Summary

[[AI Engineering]] focuses on production ML — the "after the model works" part. Unlike Kaggle-style ML, production systems must handle data drift, monitoring, continuous retraining, and cross-team coordination. The hardest problems in AI aren't model architecture — they're data pipelines, deployment, and keeping systems running in production.

## Key Claims

- Success metrics must be user- and business-driven, not benchmark-driven.
- Data work (collection, labeling, feature quality) dominates the cost of production AI.
- Deployment patterns should match latency/availability budgets (batch vs real time).
- [[Continuous Training]], monitoring, and incident response keep models trustworthy after launch.

## Structure

- **Part 1: Introduction** — Data pipelines, feature stores
- **Part 2: Data** — Collection, labeling, cleaning, augmentation
- **Part 3: Training** — [[Distributed Training]], [[Fine-Tuning]], evaluation
- **Part 4: Deployment** — Batch vs real-time, inference optimization
- **Part 5: Operations** — Monitoring, [[Continuous Training]], tooling strategy

## Entities Mentioned

- [[Chip Huyen]] — Author and practitioner establishing the [[AI Engineering]] discipline

## Concepts Covered

- [[Data Pipeline]] — Blueprint for moving data from source to training/serving
- [[Feature Store]] — Governs canonical features across teams
- [[Data Collection]] — Drives continuous improvement loops
- [[Data Labeling]] — Handles quality assurance and vendor workflows
- [[Data Cleaning]] — Tackles drift, anomalies, and bias
- [[Data Augmentation]] — Expands small datasets for robustness
- [[Distributed Training]] — Enables large-scale model fitting
- [[Fine-Tuning]] — Tailors pretrained models to use cases
- [[Model Evaluation]] — Links offline metrics to product KPIs
- [[Batch Deployment]] — Fits async jobs (reports, scoring)
- [[Real-Time Deployment]] — Powers interactive products with SLAs
- [[Inference Optimization]] — Keeps latency and cost within budgets
- [[ML Monitoring]] — Alerts on drift and degradation
- [[Continuous Training]] — Automates retraining and rollout
- [[MLOps]] — Cultural/technical practices for production ML
