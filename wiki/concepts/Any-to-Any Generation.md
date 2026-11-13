---

tags: [concept, multimodal, generation, architecture, cluster/generative-models]
sources: ["2026-09-12-vision-language-models-building-vlms"]
created: 2026-09-12
updated: 2026-09-12
---


# Any-to-Any Generation

Multimodal architecture capable of taking any modality as input and producing any modality as output — text, images, audio, video, and actions. Represents the convergence of VLMs, diffusion models, and autoregressive generation into unified systems.

## Architectural Families

| Family | Approach | Example |
|---|---|---|
| **Unified vocabularies** | Single token vocabulary across modalities | VQ-VAE/RVQ encoding |
| **Factorized heads** | Separate output heads per modality | Qwen Thinker-Talker |
| **Hybrid autoregressive/diffusion** | Autoregressive for text, diffusion for images | Janus-Pro |
| **Late conditioning** | Generate tokens then condition generation | Block-causal multimodal attention |

## Key Techniques

- **VQ-VAE / RVQ** — vector quantization for discretizing continuous modalities into tokens
- **Block-causal attention** — preventing information leakage between modalities
- **Flow-matching action experts** — converting visual understanding into robot actions
- **Unified token streams** — treating all modalities as token sequences (connects to [[Modality-as-Tokens]])

## The Narrow vs. Umbrella Question

Wiki [[Vision Language Models]] defines VLMs strictly as text-output models. The any-to-any perspective treats VLMs as one component in a broader multimodal generation system. Both definitions are valid but serve different purposes — clarify which is being used.

## Related

- [[Modality-as-Tokens]] — the convergence thesis
- [[Vision Language Models]] — text-output VLM foundation
- [[Diffusion Models]] — image generation component
- [[Flow Matching]] — action generation for robotics
- [[Generative Adversarial Network]] — alternative generation paradigm
- [[Factorized Temporal Attention]] — video-specific temporal modeling
