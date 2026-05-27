---
title: Step-Back Prompting
type: concept
tags: [rag, prompting, retrieval, reasoning]
sources: [2026-04-29-rag-survey]
created: 2026-04-30
updated: 2026-04-30
---

# Step-Back Prompting

## Definition

**Step-Back Prompting** (Zheng et al. 2023) is a pre-retrieval and reasoning technique that asks the LLM to abstract a higher-level "step-back" question from a specific user query *before* answering or retrieving. The system retrieves and reasons over the abstracted question first, then uses the gathered context to answer the original specific question.

It is a [[Query Rewriting]] strategy that exploits a structural property of LLMs and document corpora: high-level *principles* are often easier to retrieve and remember correctly than *specific instances*.

## The intuition

Consider this physics question:

> "If the temperature of an ideal gas is doubled while keeping the pressure constant, by what factor does its volume change?"

The LLM might fumble specific numerics. But if we first ask:

> **Step-back:** "What physical law relates volume, temperature, and pressure of an ideal gas?"

The model retrieves "the ideal gas law: $PV = nRT$" — a clean principle. Now armed with $V \propto T$ at constant $P$, the original question becomes one substitution: volume doubles.

The same pattern applies in domains beyond physics: legal precedent, medical diagnosis, code refactoring, multi-hop QA. Specific questions are concrete enough to *fail* retrieval; abstracted questions hit principle-bearing documents reliably.

## Two-stage pipeline

```python
def step_back_rag(query, retriever, llm):
    # Stage 1: Abstract the question
    step_back_q = llm.generate(
        f"""You are an expert at world knowledge. Your task is to step back
        and paraphrase a question to a more generic step-back question, which
        is easier to answer.
        
        Original: "{query}"
        Step-back question:"""
    ).strip()
    
    # Stage 2: Retrieve for both questions
    docs_specific = retriever.search(query, k=5)
    docs_abstract = retriever.search(step_back_q, k=5)
    context = dedupe(docs_specific + docs_abstract)
    
    # Stage 3: Answer using both retrieval sets
    return llm.generate(
        f"""Use the context to answer the original question.
        Step-back context (general principles):
        {format_docs(docs_abstract)}
        
        Specific context:
        {format_docs(docs_specific)}
        
        Question: {query}
        Answer:"""
    )
```

## Why two retrievals beat one

1. **Coverage** — abstract docs cover the *why* (principle); specific docs cover the *what* (instance). Each is incomplete alone.
2. **Calibration** — when the retriever is trained on abstract corpora (textbooks, surveys), abstract queries hit them more reliably.
3. **Hallucination guard** — if the model later invents a principle, the abstract context contradicts it before generation finalizes.

## When abstraction helps

- **Multi-hop reasoning** where the bridge between facts is a principle the model knows but won't surface.
- **Domain-shift questions** where the user phrasing is specific (jargon-heavy) but textbook docs use general framing.
- **Tasks with implicit prerequisites** ("How do I tune LoRA rank?" → step back: "How does LoRA's rank parameter affect capacity?").
- **Knowledge work** where the right answer is "apply this principle, then compute" — physics, law, medicine.

## When it hurts

- **Already abstract questions** — step-back returns a near-identical query.
- **Trivial retrieval tasks** — adds LLM call latency for no recall gain.
- **Questions about specific entities** — step-back to a generic class loses the entity (e.g., "What is Sarah Smith's role at Anthropic?" → "What roles exist at AI companies?" — useless).

## Variants

| Variant | Difference |
|---|---|
| **Single-shot step-back** | One abstract question, one specific question (original) |
| **Chain step-back** | Multiple abstraction levels: specific → mid → abstract |
| **Step-back + decomposition** | Decompose into sub-questions, then step-back each |
| **Step-back self-consistency** | Generate $K$ step-back paraphrases, take majority context |

## Empirical numbers (Zheng 2023)

| Benchmark | PaLM-2L direct | + Step-back | Δ |
|---|---|---|---|
| TimeQA | 45.6% | 66.0% | +20.4 |
| MMLU (high-school physics) | 72.6% | 80.4% | +7.8 |
| MMLU (high-school chemistry) | 70.9% | 78.6% | +7.7 |
| Multi-hop QA | 51.2% | 65.4% | +14.2 |

Largest gains on tasks requiring principle-application; smallest on rote-recall tasks.

## Failure modes

- **Over-abstraction** — step-back becomes too generic; retrieved docs are all topic overviews. Mitigate with a "stay within the same concept family" instruction.
- **Wrong principle** — model picks an irrelevant abstract framing. Mitigate by retrieving for the original *and* the step-back, never just the step-back.
- **Latency** — one extra LLM call + one extra retrieval. Use only when the query type warrants it (route via [[Adaptive RAG]]).

## Comparison with related rewriting

| Technique | Direction of transformation | Cost |
|---|---|---|
| **Step-Back** | Specific → abstract | 1 LLM + 2 retrievals |
| [[HyDE]] | Question → hypothetical answer | 1 LLM + 1 retrieval (anchored on answer) |
| [[Query Rewriting]] (paraphrase) | Question → paraphrase | 1 LLM + 1 retrieval |
| [[RAG-Fusion]] | Question → $K$ paraphrases | 1 LLM + $K$ retrievals |
| [[Self-RAG]] | Question → reflect → re-query | $N$ LLM + $N$ retrievals |

Step-back is unique in changing the *abstraction level* rather than the surface form.

## Connections

- [[Query Rewriting]] — parent strategy
- [[Retrieval-Augmented Generation]] — base pipeline
- [[Advanced RAG]] — paradigm category
- [[Adaptive RAG]] — routes queries that benefit from step-back
- [[HyDE]] — alternate pre-retrieval transformation
- [[RAG-Fusion]] — composable with step-back
- [[Chain-of-Thought]] — step-back can be viewed as one-step abstraction CoT
- [[Modular RAG]] — pipeline framework
