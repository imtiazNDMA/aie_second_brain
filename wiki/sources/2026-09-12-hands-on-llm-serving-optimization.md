---
tags: [source, book, llm-serving, inference, optimization, gpu]
sources: ["Hands-On LLM Serving and Optimization.pdf"]
created: 2026-09-12
updated: 2026-09-12
---

# Hands-On LLM Serving and Optimization: Hosting LLMs at Scale

**Source:** Hands-On LLM Serving and Optimization- Hosting LLMs at Scale -- Chi Wang, Peiheng Hu -- 1, 2026 apr 27 -- O'Reilly Media -- isbn13 9788341621498
**Date ingested:** 2026-09-12
**Type:** book

## Summary

Production LLM inference and systems engineering guide covering prefill/decode workloads, KV-cache management, quantization, speculative decoding, distributed serving, and build-vs-buy decisions. Central thesis: optimization is workload-specific, not a checklist; prefill and decode are materially different workloads requiring distinct treatment.

## Key Claims

- Prefill and decode are materially different workloads: prefill is compute-bound, decode is memory-bandwidth-bound
- KV-cache capacity and movement are central constraints; Llama-2-7B cache ~32GB for batch-16 at 4K tokens
- Optimization is workload-specific: chunked prefill improves ITL but worsens TTFT; W4A16 favors bandwidth-bound decode; speculative decoding helps decode-bound workloads
- More GPUs don't automatically mean better performance; PCIe vs NVLink matters enormously
- Production serving is a layered system: public API → resource management → model selection → distributed serving → inference → optimization
- CAG vendor-pricing example finds CAG ~$0.013/request vs RAG ~$0.007/request despite lower TTFT

## Entities Mentioned

- [[Chi Wang]] — co-author
- [[Peiheng Hu]] — co-author
- [[vLLM]] — serving engine with PagedAttention
- [[TensorRT-LLM]] — NVIDIA inference optimization
- [[SGLang]] — structured generation serving
- [[llama.cpp]] — CPU/edge inference
- [[NVIDIA Triton Inference Server]] — model serving platform
- [[Ray Serve]] — distributed serving
- [[LMCache]] — tiered KV-cache storage
- [[NVIDIA Dynamo]] — distributed inference
- [[Kubernetes]] — container orchestration
- [[Amazon Bedrock]] — managed model hosting
- [[SageMaker JumpStart]] — model deployment

## Concepts Covered

- [[Inference Optimization]] — workload-specific optimization, not a checklist
- [[KV Cache]] — capacity constraints, tiered storage (CPU/SSD/distributed)
- [[Paged Attention]] — logical-to-physical KV blocks, fragmentation reduction
- [[Continuous Batching]] — complementary but separable from PagedAttention
- [[Speculative Decoding]] — n-gram drafting, EAGLE, Medusa; benefits vary by concurrency
- [[FlashAttention]] — attention-intermediate HBM traffic reduction; primarily prefill benefit
- [[Prefill-Decode Disaggregation]] — separating compute-bound and memory-bound phases
- [[Prefix Caching]] — avoiding repeated prefill for shared prefixes
- [[Tensor Parallelism]] — interconnect-sensitive multi-GPU serving
- [[Pipeline Parallelism]] — layer-splitting across GPUs
- [[Cache-Augmented Generation]] — cost depends on cached-token pricing, residency, invalidation
