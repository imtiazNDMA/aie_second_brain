---
title: CLIP
type: concept
tags: [vision-language, multimodal, embeddings, contrastive]
sources: [2026-05-28-vision-language-models-2026]
created: 2026-05-10
updated: 2026-05-28
---

# CLIP

## Definition

**CLIP** (Contrastive Language–Image Pre-training) is a vision-language model from OpenAI (Radford et al., 2021) that learns a shared embedding space for images and text via contrastive training on 400M (image, caption) pairs scraped from the web. The result is a pair of encoders — one for images, one for text — that produce vectors so that semantically related images and captions end up near each other. CLIP is the substrate underneath modern text-to-image generation (Stable Diffusion, DALL·E 2/3), zero-shot image classification, and most multimodal retrieval systems.

## Architecture and training

- **Image encoder** — Vision Transformer ([[Vision Transformer|ViT]]) or ResNet
- **Text encoder** — Transformer ([[Transformer]])
- **Training objective** — symmetric InfoNCE contrastive loss over a batch of $N$ pairs:

$$\mathcal{L} = -\frac{1}{2N} \sum_i \left[\log \frac{\exp(s_{ii}/\tau)}{\sum_j \exp(s_{ij}/\tau)} + \log \frac{\exp(s_{ii}/\tau)}{\sum_j \exp(s_{ji}/\tau)}\right]$$

where $s_{ij}$ is the cosine similarity between image $i$'s embedding and text $j$'s embedding, and $\tau$ is a learned temperature. Each batch element's image is paired with its caption (positive); all other captions in the batch are negatives.

Larger batches give more negatives, which is why CLIP-like models train with very large batch sizes (32K+).

## What it enables

| Capability | How |
| --- | --- |
| Zero-shot image classification | Embed candidate class names as text, embed image, pick nearest text |
| Image-to-image retrieval | Use image encoder; nearest-neighbor over the corpus |
| Text-to-image retrieval | Use both encoders; nearest-neighbor across modalities |
| Conditioning text-to-image generation | Use the text encoder as the conditioning signal in [[Diffusion Models]] (Stable Diffusion, DALL·E 2) |
| Multimodal embeddings for RAG | Same model, both modalities → shared vector space |

## Variants and successors

- **OpenCLIP** — open-source reproductions; ViT-B/32 through ViT-G/14
- **SigLIP** (Google) — sigmoid loss instead of softmax; more sample-efficient
- **EVA-CLIP** — scaled versions with strong benchmarks
- **MetaCLIP** — improved data curation
- **CLIP-Reward** — used for RL training of image generators

For 2026 production, **OpenCLIP ViT-L/14** or **SigLIP** are the standard open-weights choices.

## Failure modes

- **Bag-of-words bias** — CLIP embeddings represent what's *in* an image but struggle with relations ("dog left of cat" ≈ "cat left of dog")
- **Counting and spatial reasoning** — weak
- **Long captions** — text encoder is short-context; truncated
- **Distribution shift** — strong on web-scraped imagery; weaker on specialized domains (medical, satellite)
- **Demographic bias** — inherits skews from web-scraped pairs

## Where CLIP appears in this wiki

- [[Diffusion Models]] use CLIP text embeddings as the conditioning signal in classifier-free guidance
- [[Stable Diffusion 3]] uses CLIP-G + T5-XXL jointly (pooled CLIP for guidance, T5 sequence for cross-attention)
- [[Vision Transformer]] is the image-encoder architecture
- [[Vision Language Models]] use CLIP-style encoders as the visual front-end (LLaVA, Qwen2.5-VL)
- Multimodal RAG systems use CLIP for cross-modal retrieval

## SigLIP and the modern successors

By 2025–2026, **SigLIP** (Google, 2023) and **SigLIP-2** have largely displaced vanilla CLIP as the vision encoder of choice in new VLMs:

- **Sigmoid loss** replaces softmax → each (image, text) pair scored independently → no normalization across the batch.
- **More sample-efficient** at the same training scale.
- Adopted by [[Vision Language Models|VLMs]] including Gemini, PaliGemma, Idefics2/3.

**Other modern encoders** in the [[Vision Language Models|VLM]] stack: **InternViT** (Shanghai AI Lab, 6B params), **SAM encoder** (segmentation-pretrained, strong spatial), **DINOv2** (self-supervised, no text), **Qwen2-VL's dynamic-resolution encoder** (native-resolution patches via 2D-RoPE).

## Related Concepts

- [[Vision Transformer]] — image encoder architecture
- [[Transformer]] — text encoder architecture
- [[Embeddings]] — what CLIP produces
- [[Multimodal Tokenization]] — CLIP is essentially an "image-tokenize-then-pool" pipeline
- [[Vision Language Models]] — primary 2024–2026 consumer
- [[Diffusion Models]] — uses CLIP text embeddings for classifier-free guidance
- [[Stable Diffusion 3]] — uses CLIP-G + T5-XXL jointly
- [[Vector Database]] — substrate for storing CLIP embeddings
- [[Sequence Modeling Evolution]] — synthesis on architecture lineage
- [[Modality-as-Tokens]] — synthesis: CLIP foreshadowed the modality-token convergence

## Open Questions

- CLIP's relevance vs. modern multimodal LLMs (GPT-4o, Gemini, Llama 4 Vision) for retrieval
- Best-in-class open-weights choice for 2026 multimodal RAG — SigLIP-2 vs InternViT vs DINOv2
- Practical mitigation of demographic / cultural biases inherited from web data
- When CLIP is *necessary* vs when a VLM's internal vision features are enough for retrieval
