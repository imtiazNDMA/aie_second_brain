---
title: 002 - RAG Is a System, Not a Feature
type: carousel-draft
tags: [instagram, rag, retrieval, ai-engineering]
sources: [Retrieval-Augmented Generation, RAG Architecture Decision Guide, RAG Evaluation Playbook, Pre-Retrieval Techniques for RAG]
created: 2026-09-11
updated: 2026-09-11
status: drafting
---

# 002 - RAG Is a System, Not a Feature

## Brief

- Content level: Explain
- Content pillar: RAG and knowledge systems
- Audience problem: Beginners reduce RAG to "connect an LLM to a vector database."
- Reader outcome: Trace the full request and identify where quality can fail.
- Primary wiki concept: [[Retrieval-Augmented Generation]]
- Supporting wiki sources: [[RAG Architecture Decision Guide]], [[RAG Evaluation Playbook]], [[Pre-Retrieval Techniques for RAG]]
- Thesis: RAG quality is the product of several independently fallible stages.
- Desired action: Diagnose the failing pipeline stage before changing prompts or models.

## Hook candidates

1. RAG is not "an LLM plus a vector database."
2. Your RAG answer can fail before the LLM sees a single token.
3. Most RAG diagrams hide the stages that decide answer quality.
4. A vector database does not make an answer grounded.
5. Debug RAG as a pipeline, not as one prompt.

**Selected hook:** Your Retrieval-Augmented Generation system can fail before the model sees a single token.

## Slide script

### Slide 1 - Cover

**Exact text:**

Your Retrieval-Augmented Generation (RAG) system can fail before the large language model (LLM) sees a single token.

**Visual direction:** A request moving toward an LLM but breaking at several upstream checkpoints.

### Slide 2 - The weak model

**Exact text:**

The beginner diagram:

Question -> Vector database -> LLM -> Answer

Useful for orientation. Dangerous for debugging.

**Visual direction:** Minimal four-block pipeline stamped "incomplete."

### Slide 3 - The reframe

**Exact text:**

Retrieval-Augmented Generation is a chain of decisions.

Each stage can lose, distort, or misuse the evidence.

**Visual direction:** Expand the four blocks into a longer modular pipeline.

### Slide 4 - Prepare knowledge

**Exact text:**

1. Ingest
2. Clean
3. Chunk
4. Attach metadata
5. Create searchable representations

Bad boundaries here can make the right answer impossible to retrieve.

**Visual direction:** A document decomposed into chunks, with one key fact split across a bad boundary.

### Slide 5 - Understand the query

**Exact text:**

The query may need rewriting, decomposition, or expansion before search.

Search the wrong representation and the database returns the wrong evidence.

**Visual direction:** One vague query branching into rewritten and decomposed queries.

### Slide 6 - Retrieve and select

**Exact text:**

Dense search finds semantic similarity.
Keyword search finds exact terms.
Reranking chooses what deserves context space.

Retrieval is not one algorithm.

**Visual direction:** Dense and keyword result streams merging into a reranker.

### Slide 7 - Generate with evidence

**Exact text:**

The LLM must use the retrieved context, reject unsupported claims, and cite evidence the user can verify.

Relevant context does not guarantee a faithful answer.

**Visual direction:** Evidence blocks feeding generated claims, with visible supported and unsupported links.

### Slide 8 - Evaluate by stage

**Exact text:**

Low recall? Fix retrieval.
Irrelevant context? Fix ranking.
Unsupported answer? Fix generation and grounding.
Slow or expensive? Fix the system budget.

**Visual direction:** Diagnostic table mapping symptom to stage.

### Slide 9 - Close

**Exact text:**

Treat RAG as a pipeline of testable contracts.

Do not tune the prompt for a retrieval failure.

Next: the stage-specific metrics that reveal which part broke.

**Visual direction:** Each pipeline boundary shown as an explicit test gate.

## Caption

RAG becomes easier to improve when you stop treating it as one feature. Ingestion, chunking, query processing, retrieval, reranking, context construction, and generation all have different failure modes.

That means they need different evidence. End-to-end answer quality alone can tell you the system is bad, but not which component to fix.

Where does your current RAG pipeline fail most often: retrieval or generation?

## Review

- Writing score: pending
- Claims verified: yes
- Copy frozen: no
