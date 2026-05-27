---
title: Paged Attention
type: concept
tags: [inference, serving, attention, memory]
sources: [2026-04-12-llm-engineers-handbook]
created: 2026-04-30
updated: 2026-04-30
---

# Paged Attention

## Definition

**Paged Attention** (Kwon et al. 2023; the core innovation of [[vLLM]]) is a memory-management technique for the KV cache during LLM serving. It borrows the *virtual memory paging* idea from operating systems: allocate the KV cache in fixed-size **blocks** (e.g., 16 tokens per block) and index them through a **block table**, instead of allocating one contiguous tensor per request. This eliminates external fragmentation, enables sharing across requests, and roughly **doubles serving throughput** at fixed memory.

It is orthogonal to [[FlashAttention]] (which optimizes the attention kernel) — Paged Attention optimizes the *memory layout* the kernel reads from.

## The problem: KV cache fragmentation

During inference, every token's keys and values from every layer are cached. For a 13B model with 40 layers, hidden dim 5120, FP16:

- KV cache per token: $2 \times 40 \times 5120 \times 2 = 800$ KB.
- A 2048-token request: ~1.6 GB of KV cache.

Naive serving allocates a contiguous tensor sized to `max_sequence_length` per request:

```
Request A (will use 800 tokens):  [████████░░░░░░░░░░░░]   60% wasted
Request B (will use 1500 tokens): [████████████████░░░░]   25% wasted
Request C (will use 200 tokens):  [██░░░░░░░░░░░░░░░░░░]   90% wasted
```

This **internal fragmentation** can waste 60–80% of GPU memory. **External fragmentation** (gaps between requests) compounds the waste. The net effect: low concurrent batch size → low throughput.

## The fix: paging

Allocate KV cache in fixed-size blocks (typical: 16 tokens). Each request gets a **block table** mapping logical token positions to physical block IDs:

```
Request A logical: [t0, t1, ..., t799]
Block size: 16 tokens
Block table:       [B17, B42, B3, ..., B91]   (50 blocks)
                    ↑    ↑    ↑
                 Physical block IDs in a global pool
```

Logical tokens 0–15 live in physical block B17 (wherever it is in HBM). Tokens 16–31 in B42. The blocks need not be contiguous.

When a request adds a new token:
- If the current block has room, append in place.
- If full, allocate a new block from the global free list, append its ID to the block table.

The attention kernel reads `block_table[layer][request][0..num_blocks]` and computes attention by gathering the right physical blocks. This requires a custom CUDA kernel (the original vLLM kernel) but the logic is straightforward gather + standard attention math.

## Memory savings

| Allocation strategy | Internal fragmentation | External fragmentation | Total waste |
|---|---|---|---|
| Per-request contiguous (HF default) | 50–80% | 5–20% | 55–90% |
| **Paged (16-token blocks)** | <5% (last block of each request) | 0% | <5% |

Equivalent to 2–4× more concurrent requests at the same VRAM budget.

## Bonus: KV sharing across requests

Paging enables **block-level sharing**. Two common cases:

### 1. Prefix sharing
Multi-turn chat: every request has the same system prompt. With paging, the system prompt's blocks are allocated once and pointed to by every request's block table. Memory cost: $1\times$ instead of $N\times$.

### 2. Beam search / parallel sampling
$K$ beams initially share the prompt. Diverging beams just allocate new blocks for the divergent suffix. Saves $\sim K\times$ on the prompt.

### 3. Prefix caching
The system caches the KV blocks for popular prompt prefixes (system messages, RAG-retrieved contexts). Subsequent requests with the same prefix skip prefill entirely — orders-of-magnitude latency win on cold queries.

A **reference count** per physical block tracks sharing; blocks free when their count drops to zero.

## Algorithm sketch

```
# Initialization
free_blocks = Stack(range(NUM_PHYSICAL_BLOCKS))
block_tables = {}  # request_id -> [block_ids]
ref_counts = {}    # block_id -> int

def append_token(req_id, key, value):
    table = block_tables[req_id]
    last_block = table[-1] if table else None
    pos_in_block = ...  # current token count % BLOCK_SIZE
    if last_block is None or pos_in_block == 0:
        # Need a new block
        new_block = free_blocks.pop()
        ref_counts[new_block] = 1
        table.append(new_block)
        last_block = new_block
    write_kv(last_block, pos_in_block, key, value)

def attention(req_id, query):
    table = block_tables[req_id]
    # Custom CUDA kernel gathers KV from blocks, computes attention
    return paged_attention_kernel(query, table)

def free(req_id):
    for block_id in block_tables[req_id]:
        ref_counts[block_id] -= 1
        if ref_counts[block_id] == 0:
            free_blocks.push(block_id)
```

## Throughput impact (Kwon 2023)

| Workload | Hugging Face TGI | vLLM (Paged Attention) | Speedup |
|---|---|---|---|
| OPT-13B serving | $\sim$140 tokens/s | $\sim$340 tokens/s | 2.4× |
| Llama-7B chat | $\sim$210 tokens/s | $\sim$700 tokens/s | 3.3× |
| Multi-turn (with prefix cache) | baseline | up to $24\times$ | 24× |

Most of the speedup comes from higher concurrent batch size (more requests fit in VRAM) rather than per-request acceleration.

## Choosing block size

| Block size | Memory waste | Block table size | Kernel overhead |
|---|---|---|---|
| 1 (per-token) | minimal | huge (one entry per token) | very high |
| 16 (vLLM default) | <5% | small | low |
| 32 | <10% | tiny | lowest |
| 64+ | rises sharply | tiny | lowest |

16 is the sweet spot for most workloads.

## When Paged Attention helps

- **High-concurrency serving** with variable-length requests.
- **Multi-turn chat** with shared system prompts.
- **RAG** where retrieved contexts repeat across requests.
- **Beam search / parallel sampling**.

## When it doesn't

- **Single-request, single-turn** tooling — there's no fragmentation to amortize.
- **Very short generation** (<32 tokens) — block bookkeeping overhead dominates.
- **Frameworks that already do block KV** (TensorRT-LLM, recent TGI).

## Comparison

| Technique | Optimizes | Stack with others |
|---|---|---|
| **Paged Attention** | KV cache memory layout | yes |
| [[FlashAttention]] | Attention kernel IO | yes — most servers run both |
| [[Speculative Decoding]] | Token-generation parallelism | yes |
| [[Continuous Batching]] | Request scheduling | yes — paging makes batching cheaper |
| [[Grouped-Query Attention]] | KV cache size per token | yes — multiplicative savings |

## Connections

- [[vLLM]] — the reference implementation
- [[KV Cache]] — what's being paged
- [[Inference Optimization]] — parent topic
- [[Continuous Batching]] — paging enables higher batch concurrency
- [[FlashAttention]] — orthogonal kernel optimization
- [[Speculative Decoding]] — orthogonal token-generation optimization
- [[Grouped-Query Attention]] — reduces per-token KV size
- [[Caching]] — the OS analog this technique borrows from
