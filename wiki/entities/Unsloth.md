---
title: Unsloth
type: entity
tags: [fine-tuning, library, training, peft, qlora]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-05-10
updated: 2026-05-10
---

# Unsloth

## Definition

**Unsloth** is an open-source library for fast, memory-efficient fine-tuning of LLMs on consumer and prosumer GPUs. Created by Daniel & Michael Han (the Han Brothers), Unsloth re-implements key training operations — particularly attention, RoPE, and the LoRA forward/backward passes — in hand-tuned Triton kernels, achieving roughly **2× faster training** with **50% less memory** than vanilla Hugging Face Transformers + PEFT, with no quality regression. Unsloth has become the practical default for **single-GPU [[QLoRA]]** fine-tuning in 2024–2026.

## Why it matters

Fine-tuning a 7B model with QLoRA on a 24 GB GPU was already possible with HF Transformers + bitsandbytes + PEFT — but slow and memory-tight. Unsloth's hand-tuned kernels:

- Cut peak memory by ~50% — same model fits with twice the batch size or twice the context length
- Speed up training by ~2× on the same hardware
- Add no learned-quality regression (verified on standard benchmarks)
- Drop into existing HF Transformers-style training loops

The result: a 7B model fine-tunes overnight on a 12–16 GB GPU; a 13B model fits on a single 24 GB card; even Llama-3-70B QLoRA on 80 GB H100 becomes practical.

## What it supports

- **Models**: Llama 2/3/3.1/3.3, Mistral, Phi, Qwen, Gemma, DeepSeek, and most modern open-weights
- **Methods**: [[Low-Rank Adaptation|LoRA]], [[QLoRA]], full fine-tuning (less optimized), [[Direct Preference Optimization|DPO]], [[ORPO]], [[KTO]]
- **Quantization**: 4-bit (NF4, FP4), 8-bit, 16-bit
- **Hardware**: NVIDIA (CUDA / Triton); AMD ROCm support added in 2024–2025

## Where it fits in the wiki

- [[Parameter-Efficient Fine-Tuning]] — synthesis where Unsloth is the practical implementation choice
- [[QLoRA]] — primary training recipe Unsloth accelerates
- [[Direct Preference Optimization]], [[ORPO]], [[KTO]] — alignment methods Unsloth implements
- [[LLM Alignment and Post-Training]] — broader alignment landscape
- [[Hugging Face Hub]] — integration target for trained adapters
- [[Comet ML]], [[ZenML]] — typical experiment-tracking / orchestration companions

## How to think about it

Unsloth is a *performance-engineering* library, not a methodological library. It doesn't change what you train — it changes how fast and on what hardware. For the local single-GPU target this repo cares about, Unsloth is essentially the "this is what you'd use" answer for QLoRA / PEFT workflows. For multi-GPU / multi-node, vanilla HF + DeepSpeed / FSDP still dominates.

## Limitations

- Single-GPU focus — multi-GPU support is improving but isn't the primary design target
- Triton kernel maintenance burden — new model architectures need kernel updates; the Han Brothers move fast but there's lag
- Less mature for full fine-tuning compared to QLoRA / LoRA paths
- AMD support trails NVIDIA

## Sources

- [[2026-04-12-ultimate-guide-fine-tuning]] — covers the broader PEFT tooling landscape

## Related Pages

- [[Parameter-Efficient]], [[Low-Rank Adaptation]], [[QLoRA]] — methods
- [[Direct Preference Optimization]], [[ORPO]], [[KTO]] — alignment methods supported
- [[Hugging Face Autotrain]], [[NVIDIA NeMo]], [[Optimum]] — adjacent training tooling
- [[Parameter-Efficient Fine-Tuning]], [[LLM Alignment and Post-Training]] — syntheses
