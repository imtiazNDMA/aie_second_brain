---
title: Multimodal Tokenization
type: concept
tags: [multimodal, tokenization, vision, audio, embeddings, foundation-models]
sources: [2026-05-28-vision-language-models-2026, 2026-05-28-voice-agents-2026, 2026-05-28-diffusion-models-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Multimodal Tokenization

## Definition

**Multimodal Tokenization** is the family of techniques that convert non-text modalities — images, video, audio, point clouds — into discrete or continuous token sequences that a transformer can attend over. It is the unsung primitive behind every modern [[Vision Language Models|VLM]], [[Voice Agents|voice agent]], video model, and any "modality-as-tokens" architecture.

The core question is: **given a chunk of pixels / audio samples / 3D points, what does the transformer see as input?**

## Why tokenization choices matter

- The token sequence length determines compute cost (quadratic in attention).
- The token vocabulary determines what the model can "remember" and "produce".
- The tokenization must preserve enough information for downstream reasoning.
- Cross-modal tokenization (sharing a vocab across modalities) enables truly multimodal trunks.

## Image tokenization

### Continuous patches (the standard)

[[Vision Transformer|ViT]] / DiT pattern: split the image into non-overlapping $P \times P$ patches, flatten each to $P^2 \cdot C$ floats, linear-project to embedding dimension. No quantization — patches are continuous vectors.

A $1024 \times 1024$ image with patch size 16 produces 4096 patch tokens. With 14×14 patches (CLIP's default): 5184 tokens.

**When used**: VLMs, [[Diffusion Transformer|DiT]], most encoder-side multimodal models.

### Discrete tokens (VQ-VAE / VQGAN)

For generative models that emit images, discretize patches via a learned codebook:
- **VQ-VAE** (van den Oord et al. 2017) — encoder + codebook + decoder; image becomes a grid of codebook indices.
- **VQGAN** (Esser et al. 2021) — adds a GAN discriminator for sharper reconstruction.
- **FSQ** (Finite Scalar Quantization) — simpler quantization without learned codebook.
- **MagViT-v2** — modern video tokenizer.

A 512×512 image at 16× downsampling → 32×32 = 1024 tokens per image.

**When used**: autoregressive image generation (Parti, Muse, Chameleon, recent Llama 4 multimodal).

### Latent patches (latent diffusion)

Compromise: a [[Variational Inference|VAE]] compresses 512×512 image → 64×64 latent. [[Diffusion Models|Latent diffusion]] then patches that latent (4×4 patches → 256 patch tokens). Diffusion happens on continuous latent patches.

**When used**: Stable Diffusion family, Flux.1, Qwen-Image.

### Dynamic-resolution tokenization

Older VLMs resize images to fixed resolution (e.g., 336×336). Modern VLMs (Qwen2-VL, Qwen2.5-VL) use **dynamic resolution**:
- Accept arbitrary input size.
- Tokenize at native aspect ratio.
- Use 2D-RoPE for position encoding that generalizes across sizes.

Significant improvement for documents, high-res charts, screens.

## Video tokenization

### Frame-by-frame

Treat video as a sequence of independently-tokenized frames. Simple, but ignores temporal redundancy.

### Spatiotemporal patches (3D)

Patchify across (T, H, W). A common pattern:
- 8-frame chunks → tube of $(T, H, W) = (8, 16, 16)$ patches.
- Each tube → one token.

**Sora** uses this. Token count: an 8-second 720p clip at 24fps with $(8, 16, 16)$ tubes → ~16k tokens.

### Causal 3D VAE

Compress (T, H, W, C) → (T/4, H/8, W/8, C') latent via a 3D VAE, then patchify the latent.

**HunyuanVideo, CogVideoX, Mochi 1, Sora** all use 3D VAE compression.

## Audio tokenization

### Continuous mel-spectrogram patches

Convert audio to mel-spectrogram → treat as image, patchify. Used by Whisper, AudioMAE.

### Neural audio codecs (the modern recipe)

Compress raw audio into a sequence of discrete tokens via a neural codec:
- **EnCodec** (Meta, 2022) — multi-scale residual VQ codec.
- **DAC** (Descript Audio Codec, 2023) — improved EnCodec; higher quality at lower bitrate.
- **SoundStream** (Google, 2021) — predecessor.
- **Mimi** (Kyutai Moshi codec) — optimized for real-time S2S.

Typical: 24kHz audio → 12.5–75 tokens per second per codebook, with 4–8 residual codebooks. So 1 second of audio ≈ 50–600 audio tokens.

**When used**: native [[Voice Agents|speech-to-speech]] models (OpenAI Realtime, Kyutai Moshi), MusicLM, AudioGen, audio-LLMs.

### Semantic + acoustic dual tokens

Some modern audio LLMs split into:
- **Semantic tokens** — coarse, language-content-bearing (HuBERT, w2v-BERT).
- **Acoustic tokens** — fine, prosody/voice-character-bearing (EnCodec, Mimi).

The LLM decodes semantic tokens first (the "what"), then conditions acoustic tokens (the "how it sounds"). Used by VALL-E, Tortoise, recent speech-LLMs.

## Cross-modal tokenization

The frontier ambition: **a single tokenizer that maps text, image, audio, video into one shared discrete vocabulary**, so a single transformer can ingest and emit any modality.

- **Chameleon** (Meta, 2024) — text + image into one early-fusion vocab.
- **Gemini family** — natively multimodal; tokenization undisclosed.
- **AnyGPT** — research model with shared codebook.
- **Llama 4 multimodal** — early-fusion image tokens shared with text vocab.

This is the **modality-as-tokens** thesis: once everything is a token, transformers don't care about modality. (See [[Modality-as-Tokens]] for the synthesis.)

## Connections

- [[Vision Language Models]] — primary consumer of image tokenization
- [[Voice Agents]] — primary consumer of audio tokenization
- [[Diffusion Transformer]] — uses latent patch tokenization
- [[CLIP]] — its encoder is itself a tokenization-then-pool pipeline
- [[Vision Transformer]] — defined the canonical image-patch tokenization
- [[Embeddings]] — what continuous tokens are
- [[Variational Inference]] — VAE encoders for latent tokenization
- [[Modality-as-Tokens]] — the synthesis covering why this matters
- [[2026-05-28-vision-language-models-2026]], [[2026-05-28-voice-agents-2026]], [[2026-05-28-diffusion-models-2026]] — sources

## Open Questions

- Single unified tokenizer across all modalities — feasible, or always a tradeoff?
- Optimal token rate for audio — speech LLMs vs music LLMs need different rates.
- Continuous vs discrete — when does each win? (Continuous is current VLM default; discrete is current generative default.)
- 3D / point-cloud tokenization — far less mature than image/audio.
