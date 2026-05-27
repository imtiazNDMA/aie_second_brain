---
title: Pre-Retrieval Techniques for RAG
type: synthesis
tags: [rag, retrieval, query-rewriting, hyde, step-back]
sources: [2026-04-29-rag-survey, 2026-04-12-14-types-of-rag, 2026-04-29-graph-rag-survey]
created: 2026-05-09
updated: 2026-05-09
---

# Pre-Retrieval Techniques for RAG

A retriever's recall ceiling is set before the index is touched: it depends on what you give the embedding model. User queries are vague, conversational, lexically mismatched with corpora, and frequently multi-intent. Pre-retrieval techniques — **query rewriting**, **HyDE**, **step-back prompting**, **RAG-Fusion**, **adaptive retrieval**, and **reranking** — restructure the input before (and immediately after) similarity search to make retrieval do less of the heavy lifting. This synthesis ranks them by where they hook in and the cost/lift trade-off.

## Why pre-retrieval matters

The embedding-model bottleneck cannot be optimized away — you can't beat the model's intrinsic representation. But you can change *what* you embed:

- **Vague queries** ("how do I do this?") have low information for similarity search → rewrite to add context
- **Multi-intent queries** ("compare X and Y on Z") need multiple retrievals → decompose
- **Lexical mismatch** (user says "cheap", docs say "low-cost") → expand or paraphrase
- **Specific-vs-abstract gap** (specific question, abstract docs) → step back
- **Conversational pronouns** ("what about for that?") → rewrite with referent

Every pattern below addresses one of those failure modes.

## The pattern map

```
[Raw user query]
   │
   ├── [[Query Rewriting]] — expand, paraphrase, decompose, normalize
   │     └── [[HyDE]] — draft a hypothetical answer, embed *that*
   │     └── [[Step-Back Prompting]] — abstract to a higher-level question first
   │     └── [[RAG-Fusion]] — generate K paraphrases, retrieve all, RRF-merge
   │     └── Conversational pronoun resolution (with chat history)
   │
   ├── [[Adaptive Retrieval]] — decide *whether* to retrieve at all
   │
   ├── [Embedding + similarity search] ([[Embeddings]], [[Vector Database]])
   │
   └── [[Reranking]] — fast retrieve → strong cross-encoder rescore
```

## Comparison table

| Technique | Mechanism | Latency cost | Recall lift (typical) | When |
| --- | --- | --- | --- | --- |
| [[Query Rewriting]] (paraphrase/decompose) | LLM rewrites query into 1+ better forms | 1 LLM call (~200ms) | 5–15% | Conversational interfaces; vague queries |
| [[HyDE]] | LLM generates hypothetical answer; embed answer not query | 1 LLM call (~300ms) | 10–25% on hard semantic gaps | Abstract concepts, lexical mismatch |
| [[Step-Back Prompting]] | LLM produces an abstract step-back question first | 1 LLM call (~200ms) | 5–20% on knowledge-graph-shaped queries | Reasoning over principles, not facts |
| [[RAG-Fusion]] | K paraphrases × retrieval + Reciprocal Rank Fusion | K retrieval calls (~100–300ms total) | 10–30% on ambiguous queries | High-recall use cases |
| [[Adaptive Retrieval]] | Classifier or self-token decides retrieve / skip / depth | Classifier (~50ms) | Negative — saves cost on no-retrieval branch | Mixed workloads, chat |
| [[Reranking]] (cross-encoder) | Top-K from ANN → cross-encoder rescores → top-N | ~50–500ms for K=20–100 | 10–25% — improves precision | Always (basically free improvement) |

## Decision flow

```
Are queries conversational?
├── Yes → Query Rewriting (pronoun resolution, history-aware)
└── No → next

Is there a lexical gap between queries and corpus?
├── Yes → HyDE (embed hypothetical answer, not query)
└── No → next

Are queries abstract / principle-level over a fact-rich corpus?
├── Yes → Step-Back Prompting
└── No → next

Are queries ambiguous (multi-intent or under-specified)?
├── Yes → RAG-Fusion (K paraphrases + RRF)
└── No → next

Is some traffic actually retrieve-able-without and you're paying for retrieval anyway?
└── Adaptive Retrieval (gate retrieval)

Always: Reranking on the top-K. It's almost free precision lift.
```

## Composition recipes

These layer cleanly:

### Recipe A — "Industrial RAG default"

1. [[Query Rewriting]] (rewrite for clarity, resolve pronouns)
2. Vector retrieval (top-50)
3. [[Reranking]] (cross-encoder, top-5)
4. Generation

Cheap, robust, the right baseline.

### Recipe B — "High-recall research RAG"

1. [[RAG-Fusion]] — generate 4 paraphrases
2. Each paraphrase → vector retrieval (top-25)
3. Reciprocal Rank Fusion → top-50
4. [[Reranking]] → top-10
5. Generation

Higher cost, much higher recall — the right answer when missing a relevant doc is expensive.

### Recipe C — "Abstract knowledge work"

1. [[Step-Back Prompting]] — produce abstract question
2. Retrieve for both original and step-back
3. Concatenate context
4. Generation references both layers

Right for legal, scientific, philosophical workloads where principles + specifics both matter.

### Recipe D — "Lexical-gap corpus"

1. [[HyDE]] — generate hypothetical answer
2. Embed the hypothetical answer
3. Retrieve, rerank, generate

Right when the corpus uses different vocabulary than user queries (technical docs, domain jargon).

## Cost economics

Pre-retrieval techniques add LLM calls *before* the main generation. The trick is to use a *small* model for the rewrite/step-back/HyDE step:

- A 3B–7B local model handles rewriting/HyDE adequately
- The big generator is invoked only once on the better-retrieved context
- Net: small extra cost, larger reduction in failed retrievals (which are the most expensive failure mode — they look successful but produce wrong answers)

For local A6000-Ada deployment with Ollama, run a small Gemma/Qwen for pre-retrieval steps and reserve the larger generator for final synthesis. The latency cost of a 3B-model rewrite is typically <100ms.

## Reranking deserves its own moment

[[Reranking]] is the most underrated upgrade in this list because it's almost universally beneficial:

- ANN retrieval (HNSW, IVF, ScaNN) is fast but uses **bi-encoder** similarity — embeddings encoded independently
- Cross-encoders score (query, doc) jointly — much more accurate, much slower per pair
- Two-stage retrieval: bi-encoder gets top-100 fast, cross-encoder rescores → top-10

The 2025 default is **bge-reranker-v2-m3** via FlashRank (the choice this repo's `CLAUDE.md` specifies), or Cohere Rerank if API access is allowed. Always run with reranking; it pays for itself.

## Sources of recall failure to test for

When evaluating pre-retrieval, instrument these explicitly:

- **Conversational misses** — query depends on prior turns; retrieval treats it standalone
- **Lexical-gap misses** — query and doc use different words for the same concept
- **Multi-intent partial misses** — one of two intents is satisfied, the other is missed
- **Abstraction-level misses** — query asks "why X" but corpus has only "what X is"
- **Long-tail misses** — query covers a topic underrepresented in the index

Each pattern above targets one or more of these — pre-retrieval failure analysis tells you which to add.

## Related pages

- [[Query Rewriting]], [[HyDE]], [[Step-Back Prompting]], [[RAG-Fusion]], [[Adaptive Retrieval]], [[Reranking]] — atomic techniques
- [[RAG Architecture Decision Guide]] — sibling synthesis (architecture-level)
- [[Self-Correcting RAG Patterns]] — sibling synthesis (correction-side)
- [[RAG Evaluation Playbook]] — measuring retrieval quality
- [[Vector Database Selection Guide]] — substrate that retrieval runs on top of
- [[Embeddings]] — the upstream representation
- [[Retrieval-Augmented Generation]] — broader hub
