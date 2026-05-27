---
title: VERA
type: concept
tags: [rag, evaluation, validation]
sources: [2026-04-29-vera]
created: 2026-04-29
updated: 2026-04-29
---

# VERA

## Definition
**V**alidation and **E**nhancement for **R**etrieval **A**ugmented systems — a system that evaluates and enhances both retrieved context and LLM-generated responses using an evaluator-cum-enhancer LLM.

## Key Components

### 1. Retrieval Requirement Check
Determines if external context is needed:
- Knowledge-intensive queries → retrieve
- Simple queries → use model's internal knowledge

### 2. Context Evaluation and Correction
After retrieval, evaluates context quality:
- Splits context into atomic statements
- Scores each: $r(s_i) = 1$ if relevant, $0$ if not
- Removes redundant information
- Computes retrieval relevance score: $R_{\text{retrieval}} = \frac{|C'|}{|C|}$

### 3. Response Relevance Evaluation
Ensures response contains only pertinent information:
- Splits response into atomic statements
- Keeps only statements relevant to query
- Preserves original style and structure

### 4. Response Adherence Evaluation
Checks if response is grounded in context:
- Classifies statements as:
  - **Directly derivable** from context
  - **Logically inferable** from context
  - **Inaccurate** / not grounded
- Corrects or removes inaccurate statements

## Metrics Tracked

| Metric | Definition |
|--------|------------|
| Response Adherence | Extent response is grounded in context |
| Response Relevance | Amount of response relevant to query |
| Context Relevance | Amount of retrieved context pertinent to query |

## Results
- Mistral-7B: +20% accuracy on SQuAD, +15% on DROP
- GPT-4o: +5% on SQuAD, +10% on DROP
- Significant improvements in adherence and relevance scores

## Connections
- [[Retrieval-Augmented Generation]] — system being enhanced
- [[Self-RAG]] — related evaluation approach
- [[RAG Evaluation]] — broader evaluation context

## Sources
- [[2026-04-29-vera]]
