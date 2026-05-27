---
title: Large Language Models
type: concept
tags: [llm, transformer, foundational, hub]
sources: [2026-04-12-ai-engineering, 2026-04-12-build-llm-from-scratch, 2026-04-12-llm-engineers-handbook, 2026-05-09-deepseek-r1, 2026-05-09-llm-aiops-survey]
created: 2026-05-09
updated: 2026-05-09
---

# Large Language Models

## Definition

**Large Language Models (LLMs)** are transformer-based neural networks trained on broad corpora of text (and increasingly multi-modal data) to predict tokens — typically scaled to billions or trillions of parameters and trillions of training tokens. They are the substrate of the modern AI engineering field this wiki catalogues.

This is a hub page; deep treatment of specific aspects lives on the dedicated subtopic pages linked below.

## Defining technical properties

- **[[Transformer]] architecture** — attention-based, parallelizable training, near-universal as of 2025
- **[[Pretraining]] at scale** — next-token prediction on hundreds of billions to trillions of tokens
- **Emergent capabilities** — properties (in-context learning, [[Chain-of-Thought]], instruction following) that appear at scale rather than being explicitly trained
- **Post-training alignment** — [[Fine-Tuning]] + [[RLHF]] / [[Direct Preference Optimization]] / [[ORPO]] / [[KTO]] / [[RLVR]] to make raw pretrained models useful and safe

## Three layers of capability

### Architecture layer
- [[Self-Attention]], [[Multi-Head Attention]], [[Scaled Dot-Product Attention]]
- [[Positional Encoding]], [[Rotary Position Embeddings]]
- [[Encoder]] / [[Decoder]] / decoder-only variants
- [[Tokenization]]

### Training layer
- [[Pretraining]] objectives (causal LM, MLM, span corruption)
- [[Fine-Tuning]], [[Low-Rank Adaptation]], [[QLoRA]], [[DoRA]]
- [[RLHF]], [[Direct Preference Optimization]], [[ORPO]], [[KTO]]
- [[RLVR]], [[GRPO]] (reasoning-model training, 2025)

### Inference / serving layer
- [[KV Cache]], [[Paged Attention]], [[FlashAttention]]
- [[Speculative Decoding]], [[Grouped-Query Attention]]
- [[Inference Optimization]], [[Long Context Models]]
- [[Test-Time Compute Scaling]] (deliberately spending more compute per query)

## Capability paradigms

- **Base / Foundation models** — raw pretrained capability ([[2026-04-12-build-llm-from-scratch]])
- **Instruction-tuned chat models** — aligned for dialogue and helpfulness
- **[[Reasoning Models]]** — RL-trained to spend test-time compute (see [[DeepSeek-R1]], s1)
- **Agentic LLMs** — composed with [[Tool Use]], memory, and orchestration (see [[Agentic Systems]])
- **Multimodal LLMs** — text + vision + audio (e.g., [[Vision Transformer]] integration)

## Production concerns

- **Operations**: [[LLMOps]], [[LLMSecOps]], [[LLM4AIOps]] (LLMs as operators)
- **Evaluation**: [[LLM-as-Judge]], [[MMLU]], [[MT-Bench]], [[GSM8K]], [[LLM Evaluation Rubrics]]
- **Cost / latency**: [[Inference Optimization]], [[Cache-Augmented Generation]], [[Compound AI Systems]]
- **Architectural patterns**: [[Retrieval-Augmented Generation]], [[Cache-Augmented Generation]], [[Compound AI Systems]]

## See also

- [[AI Engineering]] — applied discipline of building LLM-powered systems
- [[LLM Architecture]] — structural details
- [[LLM Application Loop]] — design pattern for LLM-powered apps

## Sources

This page is a hub; many wiki sources contribute. Notable:

- [[2026-04-12-ai-engineering]] — Chip Huyen
- [[2026-04-12-build-llm-from-scratch]] — Sebastian Raschka
- [[2026-04-12-llm-engineers-handbook]] — Iusztin & Labonne
- [[2026-05-09-deepseek-r1]] — reasoning-model paradigm shift
- [[2026-05-09-llm-aiops-survey]] — LLMs in production operations
