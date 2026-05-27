---
title: FlashAttention
type: concept
tags: [inference, training, attention, gpu, optimization]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-llm-engineers-handbook]
created: 2026-04-30
updated: 2026-04-30
---

# FlashAttention

## Definition

**FlashAttention** (Dao et al. 2022; v2 2023; v3 2024) is an IO-aware exact-attention algorithm that recomputes the [[Scaled Dot-Product Attention]] without materializing the full $N \times N$ attention matrix in GPU high-bandwidth memory (HBM). It tiles Q, K, V into SRAM, computes attention block-by-block, and uses an online-softmax trick to avoid storing intermediate values.

The output is **mathematically identical** to standard attention (no approximation). The win is wall-clock — typically 2–4× faster end-to-end training and inference on long sequences, and asymptotically lower memory ($O(N)$ instead of $O(N^2)$).

## The problem it solves

Standard attention computes:

$$O = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right) V$$

The naive implementation materializes three $N \times N$ matrices: $S = QK^\top$, $P = \text{softmax}(S)$, and writes them to HBM. For sequence length $N=8192$ and $d_k=128$:

- $QK^\top$: $8192 \times 8192 \times 4$ bytes = **256 MB** per head per batch.
- For 32 heads, batch 4: **32 GB** just for one attention layer's intermediate. This dominates HBM bandwidth.

Modern GPUs have:
- **HBM** (40–80 GB) — large but slow (~1.5–2 TB/s).
- **SRAM / shared memory** (~100 KB per SM, hundreds of SMs) — tiny but ~10× faster (~19 TB/s on H100).

Standard attention is *memory-bandwidth-bound*: it spends most of its time moving the materialized $S$ and $P$ matrices between HBM and the compute units. Compute is idle.

## The core trick: tiling + online softmax

FlashAttention loads small blocks of Q, K, V into SRAM, computes a block of $O$, and writes only $O$ to HBM. The catch: softmax requires the *global* row max for numerical stability, but tiling sees only one block at a time.

**Online softmax** (Milakov & Gimelshein 2018) solves this. Maintain running statistics:

$$m_i = \max_{j \leq i} S_{ij} \quad \text{(running row max)}$$
$$\ell_i = \sum_{j \leq i} \exp(S_{ij} - m_i) \quad \text{(running normalizer)}$$

When a new block arrives with new max $m_{\text{new}}$, rescale:

$$m^* = \max(m_i, m_{\text{new}})$$
$$\ell^* = \exp(m_i - m^*) \cdot \ell_i + \exp(m_{\text{new}} - m^*) \cdot \ell_{\text{new}}$$
$$O^* = \exp(m_i - m^*) \cdot O_i + \exp(m_{\text{new}} - m^*) \cdot \tilde{O}_{\text{new}}$$

By induction, after seeing all blocks, $\ell$ is the correct full normalizer and $O$ is the correct full output — no $N \times N$ matrix needed.

## Algorithm sketch

```
Input: Q, K, V in HBM, sequence length N, head dim d
Output: O = softmax(QK^T / sqrt(d)) V in HBM

Block sizes: B_r (rows of Q), B_c (cols of K)

for i = 1 to N/B_r:                   # outer loop: row blocks of Q
    Load Q_i (B_r × d) into SRAM
    Initialize O_i = 0, m_i = -inf, l_i = 0
    for j = 1 to N/B_c:                # inner loop: col blocks of K, V
        Load K_j, V_j (B_c × d) into SRAM
        S_ij = Q_i @ K_j^T / sqrt(d)   # block of attention scores
        m_new = max(m_i, rowmax(S_ij))
        P_ij = exp(S_ij - m_new)
        l_new = exp(m_i - m_new) * l_i + rowsum(P_ij)
        O_i = exp(m_i - m_new) * O_i + P_ij @ V_j
        m_i = m_new
        l_i = l_new
    O_i = O_i / l_i                    # final normalization
    Write O_i to HBM
```

Each Q block is loaded once. K and V blocks are loaded $N/B_r$ times. The $N \times N$ matrix is never materialized.

## Memory complexity

| Quantity | Standard attention | FlashAttention |
|---|---|---|
| HBM reads/writes | $O(Nd + N^2)$ | $O(N^2 d^2 / M)$ where $M$ = SRAM size |
| Peak HBM occupancy | $O(N^2)$ | $O(N)$ |
| FLOPs | $O(N^2 d)$ | $O(N^2 d)$ (same) |
| Wall-clock (typical) | $1\times$ | $2$–$4\times$ faster |

Because $M / d^2 \gg 1$ for modern GPUs (H100 SRAM is ~256 KB, $d=128$ → ratio ~16), the IO term collapses dramatically.

## Versions

| Version | Year | Key innovation |
|---|---|---|
| **FlashAttention** | 2022 | Original tiled IO-aware algorithm |
| **FlashAttention-2** | 2023 | Better parallelism: parallelize across sequence dim, not just heads; reduce non-matmul FLOPs |
| **FlashAttention-3** | 2024 | H100-specific: TMA async copy, FP8 support, warp-specialization, matrix-multiply-and-softmax overlap |

Each version yields ~2× over the previous on long sequences.

## What FlashAttention is not

- **Not an approximation.** Output is bit-exact equal to standard attention (modulo floating-point rounding).
- **Not a replacement for sparse attention.** Sparse attention reduces FLOPs; FlashAttention reduces IO. Stack them.
- **Not free.** Implementation requires custom CUDA / Triton kernels; the algorithm is short, the kernel is hard.
- **Not a memory cure-all.** Activations from other layers still grow with $N$.

## Where it matters

- **Training long-context models.** GPT-NeoX, Llama, Mistral, etc. use FlashAttention-2 by default.
- **Inference at long context.** Especially with KV cache + prompt prefill.
- **Vision transformers** with high-resolution patches.
- **Diffusion models** with large attention layers in denoising U-Nets.

## Where it doesn't help

- **Tiny sequences** ($N \leq 512$) — overhead of tiling beats the IO savings.
- **MQA / GQA models** at very small key-head counts — already memory-cheap.
- **Attention-light architectures** (state-space models like Mamba) — irrelevant.

## Practical adoption

Most modern stacks ship FlashAttention by default:

- **PyTorch**: `torch.nn.functional.scaled_dot_product_attention` with `backend="flash"` (≥ 2.0).
- **xformers**: `xformers.ops.memory_efficient_attention`.
- **Hugging Face Transformers**: `attn_implementation="flash_attention_2"`.
- **vLLM, TGI, TensorRT-LLM**: built-in.

You almost never write the kernel yourself; you just turn the flag on and verify the speedup.

## Connections

- [[Scaled Dot-Product Attention]] — the operation FlashAttention computes
- [[Multi-Head Attention]] — wraps SDPA; FlashAttention works per-head
- [[Inference Optimization]] — broader topic
- [[KV Cache]] — interacts with FlashAttention during inference prefill
- [[Speculative Decoding]] — orthogonal inference acceleration
- [[Paged Attention]] — different attention kernel; addresses memory fragmentation, not IO
- [[Grouped-Query Attention]] — reduces the size of K/V; multiplicative with FlashAttention
- [[CUDA]] — substrate
- [[Transformer]] — the architecture using attention
