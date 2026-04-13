---
title: vLLM
type: entity
tags: [inference, runtime, optimization]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-13
updated: 2026-04-13
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

## Sources

- [[2026-04-12-ultimate-guide-fine-tuning]] — References vLLM in the deployment chapter.
