---
title: Corrective RAG
type: concept
tags: [rag, evaluation, self-reflection]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Corrective RAG

## Definition

Retrieval-augmented generation pipelines that explicitly critique or grade intermediate answers, then regenerate responses after addressing detected flaws. A corrective loop typically compares retrieved evidence with the draft answer and enforces acceptance criteria before surfacing results to users.

## Mechanics

- Run a first-pass answer using standard retrieval + generation.
- Trigger a critic model or rubric check to spot unsupported claims, missing citations, or tone mismatches.
- Rewrite the query, adjust retrieval scope, or request additional documents based on the critique.
- Regenerate the answer with the refined context and return the corrected draft only when it passes guardrails.

## When to Use

- Regulated workflows (legal, healthcare, finance) where unsupported statements are unacceptable.
- Long-horizon research assistants that must reconcile conflicting documents.
- Agentic systems that escalate uncertain answers for self-review instead of looping blindly.

## Related Concepts

- [[Self-RAG]]
- [[Adaptive RAG]]
- [[RAG Evaluation]]
