---
title: AI Operations Priorities
type: overview
tags: [ai-engineering, operations, aiops, mlops, llmops, agentops, roadmap]
sources: []
created: 2026-07-10
updated: 2026-08-22
---

# AI Operations Priorities

This page prioritizes the wiki's four core operational areas while aligning them with the broader [[AI Engineering Wiki Plan]]. The goal is to build the production spine rather than add more isolated model-architecture pages.

## Priority order

1. [[LLMOps]]
2. [[AIOps]]
3. [[MLOps]]
4. [[Agent Operations]]

## Why this order

### 1. [[LLMOps]]

This is already the strongest operational pillar in the wiki and the most central to modern AI Engineering. It connects directly to agents, RAG, evaluation, inference, reliability, and deployment.

Current strength:

- strong hub page
- multiple syntheses
- good links into reliability, inference, and evaluation

Main gaps to close next:

- [[Prompt Versioning]]
- [[AI Release Management]]
- [[Canary and Shadow Deployment]]
- [[Online Evaluation for LLM Systems]]
- [[Model Routing and Fallback]]

### 2. [[AIOps]]

This is the strongest adjacent field for production AI operations, especially where AI systems interact with telemetry, incidents, and remediation loops.

Current strength:

- solid discipline page
- strong `[[LLM4AIOps]]` extension
- good convergence synthesis with [[LLMOps]]

Main gaps to close next:

- [[Event Correlation]]
- anomaly-detection methods for ops telemetry
- [[Root Cause Analysis for AIOps]]
- remediation orchestration
- benchmarks and evaluation design

### 3. [[MLOps]]

This is foundational but currently underdeveloped relative to the importance of the field. The wiki needs a stronger classical ML operations substrate so LLMOps has a solid parent discipline.

Current strength:

- present as a discipline hub
- partially supported by [[ML Monitoring]] and [[Data Engineering for AI]]

Main gaps to close next:

- [[Model Registry]]
- [[Train-Serving Skew]]
- CI/CD/CT for ML systems
- deployment rollback patterns
- experiment lineage and reproducibility

### 4. [[Agent Operations]]

This branch is now established as a first-class discipline, but it needs runtime depth and production evaluation.

Current strength:

- [[Agent Operations]] discipline hub exists
- [[Agent Failure Taxonomy]] provides failure labels
- tooling references and agent traces exist

Main gaps to close next:

- tool-call and memory tracing patterns
- autonomy levels and approval gates
- cost, latency, and loop-control scorecards
- durable execution, replay, cancellation, and idempotent tool calls

## Recommended page backlog

### Highest leverage pages

1. [[Online Evaluation for LLM Systems]]
2. [[AI Release Management]]
3. [[Threat Modeling LLM and Agent Systems]]
4. [[Durable Agent Execution]]

### Next wave

1. Production inference APIs
2. Train-serving skew
3. Root-cause analysis for AIOps
4. Canary deployments for AI systems
5. Full-stack AI application architecture

## Build principle

Deepen the wiki in this order:

1. discipline hubs
2. atomic operational concepts
3. syntheses and decision guides
4. worked examples and project artifacts

## Success condition

The operations branch of the wiki is strong when each area has:

- one clear discipline hub
- 5 to 10 atomic concepts
- at least one synthesis page
- explicit evaluation and reliability thinking
- links to deployable project work
