---
title: "Don't Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks"
type: source
authors: [Brian J Chan, Chao-Ting Chen, Jui-Hung Cheng, Hen-Hsen Huang]
tags: [cag, rag, kv-cache, long-context, retrieval, inference-optimization]
sources: [arxiv:2412.15605]
venue: WWW 2025 (Companion Proceedings)
created: 2026-05-09
updated: 2026-05-09
---

# Don't Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks

**arXiv:** [2412.15605](https://arxiv.org/abs/2412.15605)
**Date submitted:** December 20, 2024 (v1); February 23, 2025 (v2)
**Venue:** Companion Proceedings of the ACM Web Conference 2025 (WWW '25)
**Code:** [github.com/hhhuang/CAG](https://github.com/hhhuang/CAG)

## Summary

Proposes **Cache-Augmented Generation (CAG)** as a paradigm-level alternative to [[Retrieval-Augmented Generation]] for knowledge tasks where the corpus is small enough to fit in an LLM's extended context window. Instead of fetching documents per query at runtime, CAG preloads the entire corpus into context once, captures the resulting [[KV Cache]], and reuses that cache across all subsequent queries — eliminating retrieval latency and selection error.

## Key Takeaways

### Core Innovation: Three-phase paradigm

1. **External Knowledge Preloading** — Concatenate the entire reference corpus, run the LLM forward once, store the resulting key-value tensor cache (`C_KV`) on disk.
2. **Inference** — At query time, load `C_KV` and append the user query; the model attends to the cached state without recomputing it.
3. **Cache reset** — Truncate the appended query tokens (not the preloaded knowledge) between turns, restoring the cache for the next query in O(append-only) time.

### What CAG eliminates

- **Retrieval latency** — no embedding lookup, no vector index, no chunking pipeline at request time.
- **Document-selection error** — the model attends over the *whole* corpus, so it cannot mis-retrieve.
- **System complexity** — no vector store, no reranker, no orchestration layer; one forward pass.

### Where CAG works (and where it doesn't)

- **Works**: bounded knowledge bases — product manuals, internal docs, codebases, regulatory texts, customer-support corpora that fit within (e.g.) 128K–2M tokens.
- **Fails**: large or unbounded corpora (general web, all of Wikipedia), highly dynamic knowledge that changes faster than cache rebuild time, multi-tenant systems where each user has different document scopes.

### Empirical claim

For knowledge tasks within these constraints, CAG achieves **comparable or superior** answer quality to RAG with reduced complexity and lower per-query latency. Authors note the trade-off shifts as long-context model quality and KV-cache compression improve.

## Why this matters for the wiki

This is the first paradigm-level alternative to RAG to gain serious traction. Your wiki has deep RAG coverage but no CAG entry — closing this gap is essential for [[RAG Architecture Decision Guide]] discussions.

## Connections

- [[Brian J Chan]] — lead author (NTU)
- [[Hen-Hsen Huang]] — corresponding author (Academia Sinica, Taiwan)
- [[Cache-Augmented Generation]] — concept page (new)
- [[KV Cache]] — foundational mechanism (new)

## Related Concepts

- [[Cache-Augmented Generation]] (new — primary contribution)
- [[KV Cache]] (new — foundational substrate)
- [[Retrieval-Augmented Generation]] (paradigm-level counterpart)
- [[Long Context Models]] (enabling assumption)
- [[Inference Optimization]] (latency framing)
- [[RAG Architecture Decision Guide]] (decision criterion: corpus size threshold)
