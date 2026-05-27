---
title: Continuous Batching
type: concept
tags: [inference-optimization, serving, throughput, llm]
sources: []
created: 2026-05-10
updated: 2026-05-10
---

# Continuous Batching

## Definition

**Continuous batching** (also called *iteration-level scheduling* or *in-flight batching*) is an LLM-serving technique that packs different requests at *different decode steps* into the same forward pass through the model. It replaces classical *static batching* — where N requests are batched together, all generated to completion, then a new batch is started — and is the single biggest throughput win in 2023–2026 inference engines like [[vLLM]] and TGI.

## The problem it solves

Static batching has two fatal weaknesses for LLM workloads:

1. **Request-length variance** — if one request needs 1,000 tokens and another needs 50, the GPU sits idle generating padding tokens for 950 steps. LLM responses vary by 10–100× in length; padding waste is enormous.
2. **Head-of-line blocking** — new requests must wait for the entire current batch to complete before they can start, increasing tail latency.

## The mechanism

At every decode step, the scheduler:

1. Examines all in-flight requests
2. Selects up to $B$ requests that need a next token (subject to GPU memory constraints)
3. Runs one forward pass that produces one token for each selected request
4. Removes any requests that just emitted EOS / hit max length
5. Admits new requests into freed slots

Each request occupies a "slot" only while it's actively decoding; finished requests release immediately, new requests join immediately. The batch composition can change every step.

## Why it works

- **No padding waste** — short requests finish and release; long ones continue
- **Responsive admission** — new requests start within one decode step of arrival
- **High GPU utilization** — the batch size stays close to the memory-bound maximum

Combined with [[Paged Attention]] for KV-cache management, continuous batching produces **5–24× throughput** improvements over static batching on real workloads (per the vLLM paper).

## Engines that implement it

| Engine | Implementation | Notes |
| --- | --- | --- |
| [[vLLM]] | Paged attention + continuous batching | Reference OSS implementation |
| TGI (HF Text Generation Inference) | Similar | HF ecosystem |
| TensorRT-LLM | NVIDIA's "in-flight batching" | Compiled, NVIDIA-only |
| SGLang | Continuous batching + RadixAttention prefix sharing | Newer, fast-evolving |

llama.cpp / Ollama do **not** implement continuous batching by default — they're designed for single-stream local serving where the win is moot.

## Interactions with other optimizations

- **[[Paged Attention]]** — required substrate; without paged KV management, continuous batching can't admit/evict requests cleanly
- **[[Speculative Decoding]]** — composes; speculate K tokens per request per step
- **Prefix sharing** — composes; common system prompts share KV cache across batch slots
- **[[Grouped-Query Attention]]** — reduces per-slot KV memory, allowing larger batch size

## Related Concepts

- [[Paged Attention]] — KV-cache management substrate
- [[KV Cache]] — what gets paged
- [[Speculative Decoding]] — composes for further throughput
- [[vLLM]] — reference engine
- [[LLM Inference Optimization Stack]] — synthesis where this slots in
- [[Inference Optimization]] — broader hub

## Open Questions

- Optimal admission policy under mixed short-prompt / long-output workloads
- Scheduling fairness when long-running requests compete with short ones
