---
tags: [source, book, vision-language-models, multimodal, hugging-face]
sources: ["Vision Language Models - Building VLMs with Hugging Face.pdf"]
created: 2026-09-12
updated: 2026-09-12
---

# Vision Language Models: Building VLMs with Hugging Face

**Source:** Vision Language Models- Building VLMs with Hugging Face -- Merve Noyan, Miquel Farré, Andrés Marafioti, Orr Zohar -- 1, 2026 -- O'Reilly Media -- isbn13 9788341624048
**Date ingested:** 2026-09-12
**Type:** book

## Summary

Hands-on technical book covering VLM architecture, training, post-training, multimodal RAG, video understanding, any-to-any generation, and VLM-based agents/robotics. Central thesis: production VLM design is mostly about selective specialization — using embeddings for broad retrieval and expensive generative models only on top candidates.

## Key Claims

- Architecture matters less once backbones can adapt; unified-sequence wins when backbones are adapted
- Data composition is effectively a model hyperparameter; mixture tested on 2-4B models transfers to 7B+
- Token management is the recurring systems problem; packing reduced padding waste from 60% to 5.4%
- Post-training is a stack: SFT → LoRA/DoRA → RLHF/DPO/GRPO
- Production VLM design is mostly about selective specialization
- Visual tokens persist in KV cache; FlashAttention reduces HBM traffic; quantization only helps with suitable fused kernels

## Entities Mentioned

- [[Merve Noyan]] — co-author, Hugging Face
- [[Miquel Farré]] — co-author, Hugging Face
- [[Andrés Marafioti]] — co-author, Hugging Face
- [[Orr Zohar]] — co-author, Hugging Face
- [[SmolVLM]] — compact VLM architecture
- [[Idefics 2]] — VLM with cross-attention and unified-sequence variants
- [[Qwen3-VL]] — large VLM
- [[Qwen2.5-Omni]] — multimodal model
- [[Janus-Pro]] — any-to-any model
- [[ColPali]] — visual late-interaction retrieval
- [[OlmOCR]] — OCR-focused VLM
- [[SmolDocling]] — document understanding VLM
- [[VideoLLaMA3]] — video understanding VLM
- [[VideoAgent]] — video agent with frame retrieval
- [[SmolVLA]] — vision-language-action model
- [[GR00T N1.5]] — humanoid robot foundation model
- [[π0.6]] — flow-matching action model
- [[vLLM]] — serving engine
- [[Hugging Face Transformers]] — model library
- [[Hugging Face TRL]] — training library
- [[Hugging Face PEFT]] — parameter-efficient fine-tuning
- [[WebDataset]] — data loading
- [[LeRobot]] — robotics learning

## Concepts Covered

- [[Vision Language Models]] — gated cross-attention vs unified-sequence architectures
- [[Modality-as-Tokens]] — visual tokens in unified sequence with text tokens
- [[Multimodal Tokenization]] — pixel shuffle, visual token compression, tiling
- [[Visual Tokens]] — persistent KV cache cost, token management strategies
- [[Multimodal RAG]] — ColPali/late interaction/MaxSim, single-vector vs multivector
- [[Factorized Temporal Attention]] — video token reduction from 3.4B to 17M comparisons
- [[Any-to-Any Generation]] — unified vocabularies, hybrid autoregressive/diffusion
- [[Low-Rank Adaptation]] — LoRA, DoRA, QLoRA for VLM fine-tuning
- [[Direct Preference Optimization]] — DPO/MPO/GRPO for preference optimization
- [[Flow Matching]] — action experts for robotics control
