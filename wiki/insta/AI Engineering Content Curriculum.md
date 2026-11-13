---
title: AI Engineering Content Curriculum
type: content-curriculum
tags: [instagram, curriculum, ai-engineering, content-pillars]
sources: []
created: 2026-09-11
updated: 2026-09-11
---

# AI Engineering Content Curriculum

This curriculum converts the wiki into a progressive public course. It follows the same lifecycle as [[AI Engineering Wiki Plan]]:

```text
Concept -> Implementation -> Evaluation -> Deployment -> Monitoring -> Security -> Iteration
```

## Learning path

### 1. Foundations

Goal: give learners the vocabulary and mental models required for later systems content.

- [[AI Engineering]] versus ML engineering, data science, and app development
- [[Artificial Intelligence]], machine learning, deep learning, and generative AI
- [[Linear Regression]], [[Logistic Regression]], loss, optimization, and generalization
- [[Bias-Variance Tradeoff]], overfitting, data leakage, and evaluation splits
- [[Backpropagation]], [[Autograd]], tensors, and training loops
- [[Embeddings]], similarity, dimensions, and representation
- [[Tokenization]] and why token budgets shape product behavior

### 2. LLM architecture and inference

Goal: explain what happens between text input and generated output.

- [[Transformer Architecture Anatomy]]
- [[Self-Attention]], [[Multi-Head Attention]], and [[Grouped-Query Attention]]
- [[Positional Encoding]], [[Rotary Position Embeddings]], [[RMSNorm]], and [[SwiGLU]]
- [[Mixture of Experts]] and [[LLM Architecture Landscape 2026]]
- [[Pretraining]], [[Fine-Tuning]], [[Direct Preference Optimization]], and [[RLHF]]
- [[KV Cache]], [[Continuous Batching]], [[FlashAttention]], and [[Paged Attention]]
- [[LLM Inference Optimization Stack]]

### 3. RAG and knowledge systems

Goal: move from naive retrieval demos to measurable knowledge systems.

- [[Retrieval-Augmented Generation]] request lifecycle
- chunking, [[Embeddings]], [[Vector Database]], [[BM25]], and [[Hybrid Search]]
- [[Reranking]], [[Query Rewriting]], [[HyDE]], and [[RAG-Fusion]]
- [[Advanced RAG]], [[Modular RAG]], and [[Graph RAG]]
- [[Self-RAG]], [[Corrective RAG]], and [[Adaptive RAG]]
- [[RAG Evaluation Playbook]] and [[Self-Correcting RAG Patterns]]
- [[Cache-Augmented Generation]] versus RAG

### 4. Agents and compound systems

Goal: distinguish controlled workflows from useful autonomy.

- [[Agentic Systems]], [[Agent Components]], and [[Tool Use]]
- [[ReAct]], [[Reflection]], [[Agent Memory]], and planning
- [[Planner-Executor-Evaluator Pattern]]
- [[Multi-Agent Systems]] and [[Multi-Agent Collaboration Taxonomy]]
- [[Compound AI Systems]] and deterministic escape hatches
- [[Agent Failure Taxonomy]], [[Agent Trust and Safety]], and [[Agent Operations]]
- [[AI Coding Agents]] as a concrete system case study

### 5. Evaluation, reliability, and security

Goal: make evaluation the center of AI engineering rather than an afterthought.

- [[Evaluation]], [[Model Evaluation]], and task-specific metrics
- [[LLM-as-Judge]], judge calibration, and benchmark contamination
- [[RAG Evaluation]], faithfulness, relevance, and retrieval metrics
- [[LLM Evaluation Benchmark Map]]
- [[SLI SLO SLA]], [[Error Budget]], and [[Reliability for LLM Systems]]
- [[Circuit Breaker]], retries, fallback, and graceful degradation
- [[LLMSecOps]], prompt injection, permissions, and auditability

### 6. Production and operations

Goal: connect model behavior to software and infrastructure decisions.

- [[LLMOps]], [[MLOps]], and [[AIOps]]
- [[Model Registry]], [[Prompt Versioning]], tracing, and experiment tracking
- [[Batch Deployment]], online inference, queues, and streaming
- [[Caching]], [[Rate Limiting]], and [[Load Balancing]]
- [[Fault Tolerance]], [[Event-Driven Architecture]], and distributed-systems foundations
- [[LLM Ops Toolchain]] and [[AIOps-LLMOps Convergence for Agent Operations]]
- Cloud architecture and cost-quality-latency tradeoffs

### 7. Build and career proof

Goal: turn knowledge into credible public artifacts.

- [[RAG Evaluation System Read-Implement Tracker]]
- [[Agentic Workflow Engine Read-Implement Tracker]]
- [[Fine-Tuning Lab Read-Implement Tracker]]
- [[Inference API and Ops Read-Implement Tracker]]
- [[AI Engineer Portfolio Blueprint]]
- Architecture reviews, build logs, failure postmortems, and benchmark reports

## Coverage model

Every important concept should eventually appear at three levels:

| Level | Reader outcome | Carousel form |
|---|---|---|
| Explain | Understand what it is and how it works | Mental model or visual mechanism |
| Apply | Know when and how to use it | Tutorial, checklist, or architecture |
| Judge | Compare alternatives and diagnose failure | Decision guide or teardown |

A concept is not considered fully taught after one definition post. High-value concepts should receive all three treatments.

## Publishing balance

Use this mix over each 20-post cycle:

| Pillar | Share | Posts |
|---|---:|---:|
| Foundations and architecture | 25% | 5 |
| RAG and knowledge systems | 20% | 4 |
| Agents and compound systems | 20% | 4 |
| Evaluation, reliability, security | 20% | 4 |
| Production and operations | 10% | 2 |
| Build and career proof | 5% | 1 |

## Sequencing rule

Alternate accessibility and depth. Do not publish five advanced posts in a row.

```text
Broad misconception -> mechanism -> practical system -> failure mode -> build evidence
```

Each post should name the next concept to learn, creating a path through the account rather than a collection of disconnected tips.
