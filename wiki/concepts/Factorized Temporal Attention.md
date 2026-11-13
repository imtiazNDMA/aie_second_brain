---

tags: [concept, video, attention, multimodal, efficiency, cluster/generative-models]
sources: ["2026-09-12-vision-language-models-building-vlms"]
created: 2026-09-12
updated: 2026-09-12
---


# Factorized Temporal Attention

Video understanding technique that decomposes joint spatial-temporal attention into separate spatial and temporal components. Reduces computational complexity from quadratic in total tokens to linear or near-linear, enabling processing of long video sequences.

## The Problem

For a video with F frames and P patches per frame, joint attention requires $O((F \times P)^2)$ computations. For 300 frames with 256 patches each, this is $O(3.4B)$ comparisons — infeasible for most hardware.

## Factorization Approach

| Component | Attention Over | Complexity |
|---|---|---|
| **Spatial** | Patches within each frame | $O(F \times P^2)$ |
| **Temporal** | Same patch across frames | $O(P \times F^2)$ |
| **Total** | Sum of components | $O(F \times P^2 + P \times F^2)$ |

For the 300-frame example: $O(17M)$ comparisons — 200× reduction.

## Hierarchical Attention

Additional temporal pooling at multiple scales:
- Frame-level → clip-level → video-level
- Further reduces sequence length while preserving temporal structure

## Related

- [[Vision Language Models]] — VLM architectures for video
- [[Multimodal Tokenization]] — token management for video
- [[Attention Mechanism]] — foundation
- [[Long Context Models]] — handling long sequences
