---
title: Query Rewriting
type: concept
tags: [rag, retrieval, prompting]
sources: [2026-04-29-rag-survey, 2026-04-29-vera, 2026-04-12-rag-driven-generative-ai]
created: 2026-04-30
updated: 2026-04-30
---

# Query Rewriting

## Definition

**Query Rewriting** (a.k.a. *query reformulation*, *query transformation*) is a pre-retrieval step in [[Retrieval-Augmented Generation]] that transforms a raw user query into one or more retrieval-friendly queries before hitting the index. The goal is to bridge the gap between *how users ask* (vague, conversational, under-specified) and *how documents are written* (technical, declarative, keyword-rich).

Query rewriting is one of the three pillars of "Advanced RAG" pre-retrieval optimization in the Gao et al. survey, alongside [[Step-Back Prompting]] and [[RAG-Fusion]].

## Why rewrite?

Raw queries fail retrieval for predictable reasons:

| Problem | Example |
|---|---|
| Vague references | "What did he say about it?" — no entities for retrieval |
| Implicit assumptions | "How fast does it run on a 4090?" — what is *it*? |
| Conversational filler | "Hey can you maybe tell me a bit about RAG?" |
| Multi-intent | "Compare DPO and PPO and tell me which to use for instruction tuning" |
| Under-specified | "RAG techniques" — too broad to rank documents |
| Lexical mismatch | User says "make it faster"; docs say "inference latency" |

Each failure has a distinct rewriting remedy.

## Strategies

### 1. Query Expansion

Add synonyms, hyponyms, or related terms to the query. Classical IR uses thesauri or WordNet; LLM-based rewriting prompts the model:

```
Original: How do I speed up my model?
Rewritten: How do I reduce inference latency / improve throughput / 
           optimize forward pass / quantize my LLM?
```

### 2. Query Decomposition

Split a multi-intent query into sub-queries; retrieve for each independently; merge results.

```
Original: Compare DPO and PPO and tell me which to use for instruction tuning.
Sub-queries:
  1. What is DPO and how does it work?
  2. What is PPO and how does it work?
  3. When is DPO preferred over PPO?
```

### 3. Hypothetical Document Embeddings (HyDE)

Have the LLM **answer** the question (often hallucinated), then retrieve documents similar to the *answer* rather than the question. Works because document-to-document similarity is often a stronger retrieval signal than question-to-document similarity. See [[HyDE]].

### 4. Step-Back Prompting

Generate a higher-level abstract question first, retrieve for it, then re-query for the specific. See [[Step-Back Prompting]].

### 5. Multi-Query / RAG-Fusion

Generate $K$ paraphrases of the original query; retrieve for each in parallel; aggregate via reciprocal rank fusion. See [[RAG-Fusion]].

### 6. Conversational Rewriting

Use chat history to resolve pronouns/ellipsis: `"What did he say about it?"` + history → `"What did Yann LeCun say about JEPA?"`. Critical for multi-turn RAG chatbots.

### 7. Self-Asking / Iterative Rewriting

After an initial retrieval, the LLM asks a follow-up question based on what it found, then retrieves again. Powers iterative-retrieval pipelines and [[Self-RAG]].

## Pseudocode

```python
def query_rewrite(user_query, history, llm):
    prompt = f"""Given the conversation history and current question,
    produce 1-3 standalone search queries optimized for a vector store.
    Resolve pronouns, expand abbreviations, and add likely keywords.
    
    History:
    {history}
    
    Question: {user_query}
    
    Search queries (one per line):"""
    response = llm.generate(prompt)
    return [q.strip() for q in response.split("\n") if q.strip()]
```

## Trade-offs

| Approach | Latency | Recall | Risk |
|---|---|---|---|
| No rewriting | Lowest | Depends on user | Misses good docs |
| Light expansion | +1 LLM call | Higher recall | Drift if expansion poor |
| Decomposition | +1 LLM call, $K\times$ retrieval | Best recall | $K\times$ cost; merging complexity |
| HyDE | +1 LLM call | Best for vague queries | Hallucinated retrieval anchors |
| Multi-query (RAG-Fusion) | +1 LLM call, $K\times$ retrieval | Robust | $K\times$ cost |
| Iterative | $N$ LLM calls + $N\times$ retrieval | Highest | Latency, runaway cost |

## Evaluation

Measure rewriting quality with:

- **Retrieval recall@$k$ before vs after rewriting** — primary metric.
- **End-to-end answer accuracy** — does the rewriter improve final responses?
- **Query drift** — is the rewritten query semantically faithful to the original? (LLM-as-judge or BERT-score against the user intent.)

Without these, rewriting silently degrades the system on long-tail queries.

## Failure modes

- **Over-expansion** — rewriting a precise technical query into a vague one ("LoRA rank" → "low-rank methods" — recall drops).
- **Hallucinated entities** — the rewriter invents proper nouns absent from the original.
- **History contamination** — pronoun resolution latches onto the wrong antecedent.
- **Cost explosion** — rewriting on every chat turn doubles compute for marginal gain on simple queries.

## Adaptive rewriting

Production systems route queries by classification:

```
if is_precise(query):       # technical, complete sentence
    return [query]
elif is_conversational(query):
    return [resolve_pronouns(query, history)]
elif is_ambiguous(query):
    return decompose(query) + [hyde_expand(query)]
```

This preserves latency on easy queries and reserves expensive rewriting for hard ones — see [[Adaptive RAG]].

## Connections

- [[Retrieval-Augmented Generation]] — parent technique
- [[Advanced RAG]] — paradigm where Query Rewriting is a key pre-retrieval step
- [[Adaptive RAG]] — query-routing variant
- [[Step-Back Prompting]] — abstraction-based rewriting
- [[RAG-Fusion]] — parallel multi-query rewriting
- [[HyDE]] — hypothetical-document rewriting
- [[Self-RAG]] — iterative-retrieval rewriting
- [[Reranking]] — post-retrieval counterpart
- [[Embeddings]] — what query/document representations are compared in
- [[Modular RAG]] — pipeline framework where rewriting is a swappable module
