---
title: Hallucination
type: concept
tags: [llm, evaluation, faithfulness, safety, rag]
sources: [2026-04-29-vera, 2026-04-12-rag-driven-generative-ai, 2026-04-29-self-rag]
created: 2026-05-09
updated: 2026-05-09
---

# Hallucination

## Definition

A **hallucination** is an LLM-generated statement that is fluent, confident, and grammatically well-formed but factually wrong, unsupported by retrieved evidence, or fabricated outright. The term is widely used despite its anthropomorphic connotations because no better name has stuck — what's actually happening is that the model is sampling from a distribution where the highest-probability continuation is *plausible* rather than *true*.

## Two failure modes

| Type | What it means | Typical context |
| --- | --- | --- |
| **Intrinsic hallucination** | Output contradicts the input/context the model was given | RAG, summarization, translation |
| **Extrinsic hallucination** | Output asserts facts that may or may not be true but cannot be verified from input | Open-ended generation, Q&A without retrieval |

In RAG systems, intrinsic hallucination is often called **unfaithfulness** — the answer isn't grounded in the retrieved chunks. The fix is grounding-aware decoding plus per-claim attribution (see [[RARR]], [[Self-RAG]], [[VERA]]).

## Why it happens

- **Training objective is likelihood, not truth** — the model is trained to predict plausible next tokens, with no built-in mechanism for "I don't know"
- **Long-tail facts are sparse in pretraining** — rare entities and events lack grounded representation
- **Sampling temperature trades fluency for accuracy** — higher temperature increases creative-sounding wrong answers
- **Prompt under-specification** — vague queries invite the model to fill gaps with plausible filler
- **Reasoning chains compound errors** — each step's small inaccuracy multiplies through subsequent steps
- **Sycophancy / RLHF artifacts** — models learn to produce confident-sounding answers because they're rated higher

## Detection methods

| Method | Mechanism | Cost |
| --- | --- | --- |
| LLM-as-Judge | Strong model rates faithfulness on a rubric | Per-response inference |
| Atomic-claim decomposition | Split response into individual claims, verify each | Per-claim retrieval + check |
| [[FactScore]] | Atomic claims scored against an external knowledge source | Heavy |
| [[RARR]] | Per-claim attribution + minimal rewrite | Heavy; produces revised output |
| Self-consistency check | Sample K answers; flag if they disagree | K× cost |
| Citation verification | Check that cited sources actually contain the cited fact | Per-citation lookup |
| Confidence elicitation | Ask the model to score its own confidence; flag low-confidence outputs | Light; calibration weak |

For RAG systems, the standard production setup combines [[Response Adherence]] scoring, citation verification, and a sampled human review queue.

## Mitigation strategies

- **Grounding in retrieved context** — the substrate of [[Retrieval-Augmented Generation]]
- **Lower temperature / nucleus sampling** — fewer creative-sounding wrong answers
- **Self-correction loops** — see [[Self-Correcting RAG Patterns]]
- **Constrained decoding** — force outputs to match a schema or cite specific evidence
- **Calibration training** — RLHF/DPO on (correct, incorrect) preference pairs
- **Refusal training** — teach the model to say "I don't know" when uncertain (a form of [[RLHF]] / safety training)
- **Reasoning models** — [[Reasoning Models]] reduce hallucination on verifiable tasks; less effective on open-ended

## Operational treatment

Treat hallucination as an **SLI** (see [[SLI SLO SLA]] and [[Reliability for LLM Systems]]):

- Sample online traffic, score with LLM-as-Judge
- Set an SLO (e.g., hallucination rate < 5%)
- Alert on regression; gate deploys on shadow-eval scores
- Track by domain — hallucination rate varies massively across topics

## Why it's hard to eliminate

The fundamental issue is that a generative model doesn't know what it doesn't know. Retrieval augments coverage but doesn't solve the calibration problem. Reasoning models reduce errors on verifiable tasks but can produce confident-wrong reasoning chains. The 2026 frontier ships with hallucination rates of 5–20% on factual benchmarks — meaningful improvement, not solved.

## Related Concepts

- [[Retrieval-Augmented Generation]] — the dominant grounding mitigation
- [[Self-Correcting RAG Patterns]] — pipeline-level mitigation
- [[Self-RAG]], [[Corrective RAG]], [[RARR]], [[VERA]] — specific correction patterns
- [[FactScore]] — atomic-claim measurement
- [[Response Adherence]], [[Response Relevance]], [[Context Relevance]] — RAG triad
- [[LLM-as-Judge]] — the substrate detector
- [[Reasoning Models]] — partial mitigation for verifiable tasks
- [[RLHF]], [[Direct Preference Optimization]] — calibration via preference training
- [[Reliability for LLM Systems]] — operational treatment

## Sources

- [[2026-04-29-vera]] — VERA validator system explicitly built to flag low-faithfulness outputs
- [[2026-04-12-rag-driven-generative-ai]] — practical retrieval-grounding patterns
- [[2026-04-29-self-rag]] — reflection-token approach to grounding

## Open Questions

- Can a model be trained to *abstain* reliably rather than confabulate?
- How well does hallucination detection on one domain transfer to another?
- What's the relationship between reasoning-model confidence and hallucination rate?
