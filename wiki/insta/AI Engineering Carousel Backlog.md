---
title: AI Engineering Carousel Backlog
type: content-backlog
tags: [instagram, backlog, ai-engineering]
sources: []
created: 2026-09-11
updated: 2026-09-11
---

# AI Engineering Carousel Backlog

Prioritized seed queue for [[Instagram Content OS]]. Status values are `idea`, `drafting`, `review`, `designed`, and `published`.

## Launch sequence

| ID | Status | Level | Carousel promise | Primary wiki material |
|---:|---|---|---|---|
| 001 | drafting | Explain | What AI engineering actually is | [[AI Engineering]], [[AI Engineering Wiki Plan]] |
| 002 | drafting | Explain | See RAG as a system, not a feature | [[Retrieval-Augmented Generation]], [[RAG Architecture Decision Guide]] |
| 003 | drafting | Judge | Diagnose why AI agents fail in production | [[Agent Failure Taxonomy]], [[Agent Operations]] |
| 004 | idea | Explain | Understand embeddings without hand-waving | [[Embeddings]] |
| 005 | idea | Explain | Follow one token through a transformer | [[Transformer Architecture Anatomy]], [[Tokenization]] |
| 006 | idea | Apply | Evaluate RAG in the right order | [[RAG Evaluation Playbook]] |
| 007 | idea | Judge | Decide whether a task needs an agent | [[Agentic Systems]], [[Compound AI Systems]] |
| 008 | idea | Explain | Understand the KV cache and its memory cost | [[KV Cache]], [[LLM Inference Optimization Stack]] |
| 009 | idea | Apply | Build an evaluation dataset before prompts | [[Evaluation]], [[Prompt Evaluation Workflows]] |
| 010 | idea | Judge | Know when fine-tuning is the wrong solution | [[Fine-Tuning]], [[Parameter-Efficient Fine-Tuning]] |
| 011 | idea | Explain | Self-attention as a routing mechanism | [[Self-Attention]], [[Scaled Dot-Product Attention]] |
| 012 | idea | Apply | Choose chunk size using failure evidence | [[Retrieval-Augmented Generation]] |

## Foundations

| ID | Status | Level | Carousel promise | Primary wiki material |
|---:|---|---|---|---|
| 013 | idea | Explain | Separate machine learning, deep learning, and generative AI | [[Generative AI]], [[2026-04-29-hands-on-ml-python]], [[2026-04-12-deep-learning-with-pytorch]] |
| 014 | idea | Explain | Understand what a loss function tells training | [[PyTorch Linear Regression]], [[Autograd]] |
| 015 | idea | Explain | See why overfitting is a system problem | [[Overfitting]], [[Bias-Variance Tradeoff]] |
| 016 | idea | Explain | Understand tokens before counting token costs | [[Tokenization]] |
| 017 | idea | Explain | Understand gradient descent visually | [[Autograd]] |
| 018 | idea | Apply | Read a confusion matrix without guessing | [[Confusion Matrix]] |
| 019 | idea | Judge | Know when accuracy is the wrong metric | [[Model Evaluation]], [[Confusion Matrix]] |
| 020 | idea | Apply | Build the smallest useful PyTorch training loop | [[PyTorch Linear Regression]] |

## LLM architecture and inference

| ID | Status | Level | Carousel promise | Primary wiki material |
|---:|---|---|---|---|
| 021 | idea | Explain | Multi-head attention: why one head is not enough | [[Multi-Head Attention]] |
| 022 | idea | Explain | Why positional encoding is required | [[Positional Encoding]], [[Rotary Position Embeddings]] |
| 023 | idea | Explain | How mixture-of-experts models stay sparse | [[Mixture of Experts]], [[LLM Architecture Landscape 2026]] |
| 024 | idea | Judge | Compare MHA, GQA, and MLA by memory and quality | [[Grouped-Query Attention]], [[Multi-head Latent Attention]] |
| 025 | idea | Explain | Why FlashAttention is exact, not approximate | [[FlashAttention]] |
| 026 | idea | Explain | How continuous batching increases throughput | [[Continuous Batching]] |
| 027 | idea | Judge | Separate model latency from system latency | [[Inference Optimization]], [[LLM Inference Optimization Stack]] |
| 028 | idea | Judge | Compare quantization, distillation, and pruning | [[Inference Optimization]], [[Distillation]] |
| 029 | idea | Explain | How reasoning models spend test-time compute | [[Reasoning Models]], [[Test-Time Compute Scaling]] |
| 030 | idea | Judge | Compare DPO, RLHF, GRPO, and RLVR | [[LLM Alignment and Post-Training]] |

## RAG and knowledge systems

| ID | Status | Level | Carousel promise | Primary wiki material |
|---:|---|---|---|---|
| 031 | idea | Explain | Follow a query through a vector search pipeline | [[Vector Database]], [[Embeddings]] |
| 032 | idea | Judge | Compare semantic search with BM25 | [[BM25]], [[Hybrid Search]] |
| 033 | idea | Apply | Add reranking where it actually helps | [[Reranking]] |
| 034 | idea | Apply | Rewrite weak queries before retrieval | [[Query Rewriting]], [[Pre-Retrieval Techniques for RAG]] |
| 035 | idea | Judge | Compare naive, advanced, and modular RAG | [[Advanced RAG]], [[Modular RAG]] |
| 036 | idea | Explain | How Graph RAG adds relational context | [[Graph RAG]], [[Knowledge Graphs]] |
| 037 | idea | Judge | Choose Self-RAG, Corrective RAG, or Adaptive RAG | [[Self-Correcting RAG Patterns]] |
| 038 | idea | Judge | Know when long context beats RAG | [[Cache-Augmented Generation]], [[Long Context Models]] |
| 039 | idea | Apply | Debug low retrieval recall step by step | [[RAG Evaluation]] |
| 040 | idea | Apply | Design citations users can actually verify | [[Response Adherence]], [[Context Relevance]] |

## Agents and compound systems

| ID | Status | Level | Carousel promise | Primary wiki material |
|---:|---|---|---|---|
| 041 | idea | Explain | Separate an agent from a workflow and chatbot | [[Agentic Systems]], [[Agent Components]] |
| 042 | idea | Explain | Understand ReAct as a loop, not a magic prompt | [[ReAct]], [[Tool Use]] |
| 043 | idea | Apply | Design tools an LLM can use reliably | [[Tool Use]], [[OpenAI Function Calling]] |
| 044 | idea | Judge | Decide what belongs in agent memory | [[Agent Memory]], [[Agent Memory Architectures]] |
| 045 | idea | Apply | Stop infinite loops with budgets and termination rules | [[Agent Failure Taxonomy]] |
| 046 | idea | Judge | Know when multiple agents make a system worse | [[Multi-Agent Systems]], [[Multi-Agent Collaboration Taxonomy]] |
| 047 | idea | Apply | Use planner, executor, and evaluator roles | [[Planner-Executor-Evaluator Pattern]] |
| 048 | idea | Explain | Why coding agents need a harness, not only an LLM | [[AI Coding Agents]], [[Claude Code]] |
| 049 | idea | Apply | Evaluate an agent trajectory instead of its final answer | [[Agent Operations]], [[LLM Evaluation Rubrics]] |
| 050 | idea | Judge | Bound agent permissions before adding autonomy | [[Agent Trust and Safety Controls]] |

## Production, evaluation, and reliability

| ID | Status | Level | Carousel promise | Primary wiki material |
|---:|---|---|---|---|
| 051 | idea | Explain | Separate offline, online, and human evaluation | [[Evaluation]], [[LLM Evaluation Benchmark Map]] |
| 052 | idea | Judge | Use LLM-as-judge without trusting it blindly | [[LLM-as-Judge]] |
| 053 | idea | Explain | Translate SLI, SLO, and error budgets to AI | [[SLI SLO SLA]], [[Error Budget]] |
| 054 | idea | Apply | Add retry, fallback, and circuit-breaker boundaries | [[Reliability for LLM Systems]], [[Circuit Breaker]] |
| 055 | idea | Apply | Version prompts like production artifacts | [[Prompt Versioning]], [[Model Registry]] |
| 056 | idea | Judge | Distinguish MLOps, LLMOps, and AIOps | [[MLOps]], [[LLMOps]], [[AIOps]] |
| 057 | idea | Explain | See why observability needs traces, not only logs | [[Agent Operations]], [[Event Correlation]] |
| 058 | idea | Apply | Design a cost-quality-latency scorecard | [[Inference Optimization]], [[Evaluation]] |
| 059 | idea | Judge | Recognize prompt injection as a system threat | [[LLMSecOps]], [[Agent Trust and Safety]] |
| 060 | idea | Apply | Turn one AI demo into portfolio evidence | [[AI Engineer Portfolio Blueprint]], [[AI Engineer Project Tracker]] |

## Backlog intake rule

Add a new item when it comes from an uncovered curriculum concept, repeated audience question, comment misconception, production failure exposed by a build, or important source update.

Do not add an idea only because a tool is trending. First identify the durable engineering lesson.
