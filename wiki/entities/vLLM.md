---
title: vLLM
type: entity
tags: [llm-serving, inference-optimization, technology]
sources: [2026-04-12-ultimate-guide-fine-tuning, 2026-04-29-llmops-managing-large-language-models-in-production]
created: 2026-04-13
updated: 2026-04-29
---

# vLLM

## Summary

Open-source inference engine focused on high-throughput, low-latency serving of large language models. Uses PagedAttention to reduce KV-cache fragmentation, dynamic batching, and tensor-parallel support. Featured in *The Ultimate Guide to Fine-Tuning* as a production deployment option following PEFT or full fine-tuning.

## Capabilities

- PagedAttention: virtual memory system for KV caches, enabling larger batch sizes.
- Continuous batching with request scheduling for streaming responses.
- Supports popular checkpoints (Llama, Mistral, Gemma) plus adapter merging.

## Usage

- Deploy LoRA/DoRA tuned models with minimal code changes from Hugging Face transformers.
- Back [[RAG Architecture Decision Guide]] pipelines requiring deterministic latency.
- Combine with [[Inference Optimization]] tactics (quantization, tensor parallelism) for cost efficiency.

## Connections

- [[LLMOps]] — Mentioned as a technology for LLM serving
- [[Inference Optimization]] — Field of application

## Sources

- [[2026-04-12-ultimate-guide-fine-tuning]] — References vLLM in the deployment chapter
- [[2026-04-29-llmops-managing-large-language-models-in-production]] — Mentions vLLM as an LLM serving technology

## Timeline

- 2025: Referenced in "LLMOps: Managing Large Language Models in Production" as an emerging technology
