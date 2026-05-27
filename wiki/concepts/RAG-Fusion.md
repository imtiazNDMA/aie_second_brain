---
title: RAG-Fusion
type: concept
tags: [rag, retrieval, fusion]
sources: [2026-04-29-rag-survey]
created: 2026-04-30
updated: 2026-04-30
---

# RAG-Fusion

## Definition

**RAG-Fusion** is a multi-query retrieval pattern where the system generates $K$ paraphrases or related queries from a single user question, retrieves documents for each independently, and merges the results via **Reciprocal Rank Fusion (RRF)**. The fused candidate set is then passed to the generator. Introduced as a productionized variant of [[Query Rewriting]] in the Gao et al. RAG survey.

It is the simplest robust upgrade over single-query [[Retrieval-Augmented Generation]]: $\sim$50 lines of code and typically 10–25% recall improvement on noisy queries.

## Why fusion?

A single query embedding lives at one point in vector space. If the user phrasing happens to be far from where relevant documents cluster, retrieval fails — even if the documents exist. Generating multiple paraphrases samples *several points* in query space; their union is more likely to cover the relevant document neighborhood.

The combination step matters: naively concatenating top-$k$ from each query over-weights documents retrieved by *every* query (often general or trivially-matching) and under-weights documents that only one paraphrase finds. RRF handles this gracefully.

## Algorithm

```python
def rag_fusion(query, retriever, llm, K=4, k_per_query=10, rrf_k=60):
    # 1. Generate K paraphrases
    paraphrases = llm.generate(
        f"Generate {K} different search queries for: {query}\n"
        "Each query should approach the topic from a different angle.",
        temperature=0.7
    ).strip().split("\n")
    paraphrases = [query] + paraphrases  # include the original
    
    # 2. Retrieve top-k for each
    ranked_lists = [retriever.search(p, k=k_per_query) for p in paraphrases]
    
    # 3. Reciprocal Rank Fusion
    scores = collections.defaultdict(float)
    for ranked in ranked_lists:
        for rank, doc in enumerate(ranked):
            scores[doc.id] += 1.0 / (rrf_k + rank)
    
    # 4. Sort by fused score
    fused = sorted(scores.items(), key=lambda x: -x[1])
    return [docs_by_id[doc_id] for doc_id, _ in fused[:k_per_query]]
```

## Reciprocal Rank Fusion (the math)

For document $d$ appearing at rank $r_i$ in ranked list $L_i$ (rank starts at 0), the RRF score is:

$$\text{RRF}(d) = \sum_{i=1}^{K} \frac{1}{k + r_i}$$

The constant $k$ (often 60) damps the score so a single high rank doesn't dominate. Documents missing from a list contribute zero.

**Why this form?**
- Documents at rank 0 contribute $1/k$ regardless of list — bounded.
- Documents at rank 100 contribute $1/(k+100)$ — small but nonzero.
- Sum is monotone in *appearance frequency* and *rank quality* across lists, but no single list can saturate the score.

RRF was popularized by Cormack et al. 2009 for IR; LLM-era RAG-Fusion plugs it directly into the generator-pre-step.

## Empirical wins

Across the Gao survey's tracked benchmarks:

| Benchmark | Single-query RAG | RAG-Fusion ($K=4$) | Δ recall@10 |
|---|---|---|---|
| MS-MARCO passage | 71.2% | 78.4% | +7.2 |
| Natural Questions | 65.0% | 72.1% | +7.1 |
| HotpotQA (multi-hop) | 58.3% | 67.9% | +9.6 |
| TriviaQA | 79.5% | 84.0% | +4.5 |

Gains are largest on multi-hop and ambiguous-phrasing tasks; smallest on clean, single-fact questions.

## Choosing $K$

| $K$ | When |
|---|---|
| 2 | Latency-critical; light gains |
| 3–4 | Default; best cost/quality |
| 5–8 | Hard tasks (multi-hop, multi-intent) |
| 10+ | Diminishing returns; rare in production |

Past $K=8$, paraphrases collapse into near-duplicates and add little new coverage.

## Comparison with related fusion patterns

| Pattern | Source of variation | Fusion | Cost |
|---|---|---|---|
| **RAG-Fusion** | $K$ paraphrases of query | RRF | $K\times$ retrieval |
| Hybrid (BM25 + dense) | One query, two indices | RRF or weighted | 2× retrieval |
| Multi-index | One query, multiple indices (per source) | RRF | $N\times$ retrieval |
| Cross-encoder rerank | One query, one retriever | Score-based rerank | 1× retrieval + cross-encoder |
| **CRAG** | Document quality assessment + web fallback | Conditional re-retrieval | Variable |

These are orthogonal — RAG-Fusion + hybrid + rerank stack cleanly.

## Failure modes

- **Paraphrase mode-collapse** — temperature too low; all $K$ queries near-identical. Tune temperature 0.5–0.8.
- **Drift** — paraphrases re-state the user's intent badly; retrieval finds off-topic docs that overwhelm the relevant ones via RRF.
- **Compute blowup** — naive implementation queries the index $K$ times serially. Always batch-query when the retriever supports it.
- **Latency tail** — one slow paraphrase blocks the rest. Use timeouts + fallback to single-query result.

## When NOT to use RAG-Fusion

- **Highly precise queries** ("What is the version number of Llama 3.1?") — paraphrasing can't help; just costs more.
- **Tightly latency-bound** real-time chat — adds 1 LLM call and $K\times$ retrieval.
- **Tiny corpora** — when there are 10 candidate documents, fusion is overkill.

## Connections

- [[Retrieval-Augmented Generation]] — parent
- [[Query Rewriting]] — RAG-Fusion is one strategy within rewriting
- [[Step-Back Prompting]] — orthogonal pre-retrieval technique; can stack
- [[Reranking]] — post-retrieval counterpart; combines well
- [[Advanced RAG]] — paradigm category
- [[Modular RAG]] — pipeline framework
- [[Adaptive RAG]] — selects when to apply fusion
- [[Hybrid Search]] — different fusion target (sparse + dense) but same RRF math
