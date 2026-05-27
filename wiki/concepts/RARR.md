---
title: RARR
type: concept
tags: [rag, attribution, hallucination, post-hoc]
sources: [2026-04-29-vera]
created: 2026-04-30
updated: 2026-04-30
---

# RARR

## Definition

**RARR** — *Researching and Revising what language models say, using language models* (Gao et al. 2023) — is a **post-hoc attribution** framework. It takes an unedited LLM response and rewrites it minimally so that every claim is supported by retrieved evidence. The output is a pair $(y', E)$: a revised answer $y'$ and a set of evidence snippets $E$ that attribute each claim. The goal is *attribution without retraining* — bolt RARR onto any black-box LLM.

It is the post-generation counterpart to [[Self-RAG]]'s in-generation reflection and [[VERA]]'s pre-emptive context editing.

## Why post-hoc?

In-generation grounding (e.g., RAG, Self-RAG) requires modifying the inference loop. RARR is appealing in three production scenarios:

1. **Closed-source generators** where you can't change the prompt-time pipeline (e.g., a hosted GPT-4 endpoint).
2. **Long-form generation** where retrieving up-front for every claim is impractical.
3. **Audit-driven workflows** (legal, medical, journalism) where compliance demands an explicit evidence trail.

The trade-off: RARR is reactive — it fixes errors that already exist in the draft. Aggressive in-generation grounding (e.g., Self-RAG) prevents many errors instead.

## Pipeline

RARR has three stages, all driven by LLMs:

```
draft y → [Research stage] → claims & queries
                  ↓
        [Retrieval over claims]
                  ↓
draft y → [Agreement check] → conflicting claims & evidence
                  ↓
        [Revision stage] → revised y' + evidence E
```

### 1. Research

Decompose the draft into atomic claims (one fact per claim). For each claim, generate one or more search queries that would verify it.

```
Draft: "Marie Curie won two Nobel Prizes, the first in physics in 1903 
       and the second in chemistry in 1911."
       
Atomic claims:
  c1: "Marie Curie won a Nobel Prize in physics in 1903."
  c2: "Marie Curie won a Nobel Prize in chemistry in 1911."
  c3: "Marie Curie won two Nobel Prizes total."
  
Queries:
  q1: "Marie Curie Nobel Prize physics year"
  q2: "Marie Curie Nobel Prize chemistry year"
  q3: "How many Nobel Prizes did Marie Curie win?"
```

### 2. Agreement Check

For each claim, retrieve top-$k$ evidence and ask the LLM:

> "Does the evidence support, contradict, or fail to address this claim?"

Three labels: `supported / contradicted / unrelated`. Contradicted claims trigger revision.

### 3. Revision

For each contradicted claim, prompt the LLM to rewrite *minimally*:

> "Edit the draft so this claim is consistent with evidence E. Change only what is necessary; preserve fluency and other claims."

The output preserves voice, structure, and supported claims; only the contradicted span is modified.

## Pseudocode

```python
def rarr(draft, retriever, llm):
    claims = llm.decompose(draft)            # Stage 1a
    queries = [llm.querygen(c) for c in claims]  # Stage 1b
    evidence_per_claim = [retriever.search(q, k=5) for q in queries]
    
    revised = draft
    attributions = []
    for claim, evidence in zip(claims, evidence_per_claim):
        verdict = llm.agreement(claim, evidence)
        if verdict == "contradicted":
            revised = llm.revise(revised, claim, evidence)
        if verdict in ("supported", "contradicted"):
            attributions.append((claim, evidence))
    
    return revised, attributions
```

## Evaluation: attribution quality

RARR introduced two metrics that have become standard in attribution research:

### Preservation
Fraction of the original draft preserved character-by-character (typically 80–95%). Low preservation = the rewrite hallucinated new content; high preservation = surgical edits.

$$\text{Preservation} = \frac{|\text{LCS}(y, y')|}{|y|}$$

(LCS = longest common subsequence.)

### Attribution
Fraction of revised claims that are entailed by the cited evidence (typically measured by an entailment classifier or human judgment).

$$\text{Attribution} = \frac{|\{c \in y' : E_c \models c\}|}{|y'|}$$

The two are in tension: aggressive revision boosts attribution but cuts preservation. RARR's hyperparameters trade them off.

## Empirical results (Gao 2023)

| Generator | Without RARR (Attribution) | With RARR | Preservation |
|---|---|---|---|
| GPT-3 davinci | 41.0% | 80.5% | 92.4% |
| LaMDA | 50.0% | 79.9% | 89.1% |
| PaLM | 56.4% | 84.0% | 88.6% |

RARR roughly **doubles attribution** while preserving 85–92% of the original text — surgical, not destructive.

## Comparison

| System | When applied | Modifies | Preserves draft |
|---|---|---|---|
| **RARR** | After generation | Black-box, post-hoc | Yes (>85%) |
| [[Self-RAG]] | During generation | In-loop reflection | N/A (no draft) |
| [[VERA]] | During generation | Context + response edits | Partial |
| [[Corrective RAG]] | During retrieval | Retrieval + web fallback | N/A |
| Naive grounding | During generation | Append citations only | High (no edits) |

## When RARR helps

- **Long-form generation** (essays, summaries, reports).
- **Closed-source generators** where you can't intervene during inference.
- **Audit workflows** demanding explicit evidence chains.
- **Drafts containing many factual claims** — high attribution lift per LLM call.

## When it doesn't

- **Short answers** — overhead of decomposition + retrieval + revision dwarfs gain.
- **Subjective content** (opinions, narratives) — claim decomposition fails.
- **Tightly latency-bound** UIs — RARR adds 3–5× generation cost.
- **High-precision factual tasks** — Self-RAG or pre-retrieval grounding prevents errors RARR can only patch.

## Failure modes

- **Atomic-claim under-decomposition** — coupled claims slip through agreement check together.
- **Evidence laundering** — evidence appears to support a claim while subtly contradicting it; agreement classifier misses the nuance.
- **Over-revision** — preservation drops; the revised text is shorter or stiffer than the original.
- **Citation theatre** — attached evidence isn't actually used by the revision; downstream readers trust unjustified citations.

## Connections

- [[Retrieval-Augmented Generation]] — base pattern; RARR is a post-hoc grounding overlay
- [[Self-RAG]] — in-generation alternative to RARR
- [[VERA]] — production-oriented validation/enhancement framework that builds on RARR ideas
- [[Corrective RAG]] — retrieval-side counterpart to RARR's generation-side fix
- [[RAG Evaluation]] — preservation + attribution metrics live here
- [[Reflection]] — RARR is a structured form of self-critique
- [[Hallucination]] — the failure RARR mitigates
