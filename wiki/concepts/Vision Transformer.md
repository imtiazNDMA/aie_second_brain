---
title: Vision Transformer
type: concept
tags: [transformer, computer-vision, deep-learning, vit]
sources: [2026-04-16-deep-learning-with-pytorch-step-by-step, 2026-05-28-vision-language-models-2026, 2026-05-28-diffusion-models-2026]
created: 2026-04-16
updated: 2026-05-28
---

# Vision Transformer

## Definition

A **Vision Transformer (ViT)** is a [[Transformer]] applied directly to images by treating non-overlapping image patches as a sequence of tokens. Introduced by Dosovitskiy et al. (ICLR 2021, "An Image is Worth 16x16 Words"), ViT showed that convolution is **not** a necessary inductive bias for image classification — given enough data and scale, pure transformers match or beat ResNet/CNN baselines.

ViT is now the **default image encoder for VLMs** ([[CLIP]], [[SigLIP]], [[InternViT]]), the backbone of **[[Diffusion Transformer]]** generative models (PixArt, SD3, Flux.1), and the substrate underneath modern vision foundation models (DINOv2, SAM).

## How ViT works

```
Image (H × W × 3)
   ↓ split into P × P patches (non-overlapping)
Patches (N = H·W/P² patches, each P²·3 floats)
   ↓ linear projection
Patch embeddings (N × D)
   ↓ prepend [CLS] token + add positional encoding
Token sequence (N+1 × D)
   ↓ stack of transformer encoder blocks
Output sequence
   ↓ take [CLS] embedding (for classification) or pool/use sequence
Output (logits or features)
```

For a $224 \times 224$ image with patch size $P=16$: $N = (224/16)^2 = 196$ patches → 197 tokens including CLS.

## Variants

| Variant | Innovation | Notes |
|---|---|---|
| **ViT-B/16, ViT-L/14, ViT-G/14** | Original sizing | "B"/"L"/"H"/"G" = Base/Large/Huge/Giant; suffix = patch size |
| **DeiT** | Data-efficient training (knowledge distillation) | Works on ImageNet alone |
| **Swin Transformer** | Hierarchical + windowed attention | Pyramid features for detection/segmentation |
| **SigLIP encoder** | Sigmoid contrastive objective | Better sample efficiency than CLIP |
| **InternViT** | Scaled to 6B params | Multilingual vision encoder |
| **DINOv2** | Self-supervised pretraining | Strong frozen features without text supervision |
| **EVA / EVA-02** | Masked image modeling pretrain | Improved ImageNet/COCO |
| **SAM encoder** | Segmentation pretraining | Strong spatial understanding |
| **2D-RoPE ViT** | Rotary position embeddings in 2D | Resolution-flexible (Qwen2-VL, dynamic resolution) |

## Why ViT mattered

- **Scaling laws hold for vision.** Bigger ViT + more data = monotonic improvement.
- **One architecture for all modalities.** Unified the vision codebase with NLP.
- **Strong transfer.** Self-supervised ViTs (DINOv2, MAE, EVA) produce frozen features rivaling specialized models.
- **Unlocks multimodal.** Every modern [[Vision Language Models|VLM]] uses a ViT as its visual front-end.

## ViT vs CNN

| Aspect | CNN (ResNet, ConvNeXt) | ViT |
|---|---|---|
| Inductive bias | Locality, translation equivariance | None — learns from data |
| Sample efficiency at small scale | Higher | Lower (needs more data) |
| Sample efficiency at large scale | Plateaus | Keeps improving |
| Compute | Roughly linear in pixels | Quadratic in patches |
| Receptive field | Grows with depth | Global from layer 1 |
| Fine-grained spatial | Better at small models | Better at large models (with right pretraining) |

The verdict by 2024: **ViT wins at scale and pairs naturally with multimodal training.** CNNs persist for edge / mobile / small-data scenarios.

## ViT in VLMs

In a [[Vision Language Models|VLM]] pipeline, ViT is the front-end:

```
image → ViT-L/14 → patch token features → [Projection MLP / Q-Former] → LLM trunk
```

Choices that matter:

- **Frozen vs unfrozen** — most VLMs freeze the ViT in stage 1, unfreeze in later stages.
- **Native resolution** — fixed (CLIP's 224×224 / 336×336) vs dynamic (Qwen2-VL's native-resolution + 2D-RoPE).
- **Multi-stage features** — some VLMs concatenate features from multiple ViT layers for richer spatial detail.

## ViT in diffusion (DiT)

[[Diffusion Transformer|DiT]] replaces U-Net with a ViT-style architecture on latent patches. Key adaptations:

- **adaLN-zero conditioning** — scale/shift LayerNorm based on (timestep, text embedding).
- **Predict noise or velocity** at each patch position (rather than a class label).
- **MMDiT** — double-stream transformer (separate weights for text and image) with bidirectional cross-attention.

See [[Diffusion Transformer]] for the full treatment.

## Failure modes

- **Fine-grained spatial reasoning** — patch-level granularity loses sub-patch details unless patch size is small (cost grows quadratically).
- **High-resolution images** — token count explodes; need windowed attention or hierarchical designs.
- **Data hunger** — ViT-L from scratch needs JFT-300M or equivalent.
- **Position encoding generalization** — absolute positional encodings break at unseen resolutions; 2D-RoPE fixes this.

## Connections

- [[Transformer]] — the underlying primitive
- [[Attention Mechanism]] — the core operator
- [[Positional Encoding]] — 2D variants critical for ViT
- [[CLIP]] — ViT is CLIP's image encoder
- [[Vision Language Models]] — primary consumer in 2024–2026
- [[Diffusion Transformer]] — ViT generalized for generation
- [[Multimodal Tokenization]] — how images become tokens (patch tokenization is canonical ViT input)
- [[Transfer Learning]] — pretrained ViTs as feature extractors
- [[CNN]] — the predecessor architecture ViT largely displaced for foundation models
- [[Modality-as-Tokens]] — synthesis on the "patches-as-tokens" trick generalizing to all modalities

## Open Questions

- Optimal patch size at 4K+ resolution (smaller patches → quadratic cost; bigger → information loss).
- Best self-supervised pretraining recipe for ViT in 2026 (DINOv2 vs MAE vs CLIP).
- ViT for video — spatiotemporal patches (ViViT) vs frame-by-frame.
- When does CNN still win — edge inference, ultra-fast classification, small data.
