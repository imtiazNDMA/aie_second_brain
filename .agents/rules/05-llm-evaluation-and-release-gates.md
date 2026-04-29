# LLM Evaluation and Release Gates

This file defines how to evaluate model behavior before shipping.

## Evaluation Sets

- Maintain a small gold set for each surface:
  - ingest extraction
  - search relevance
  - chat grounded answers
- Include easy, medium, hard, and adversarial prompts.

## Core Metrics

- Groundedness: answer claims supported by cited chunks.
- Citation precision: citations actually back the linked statements.
- Retrieval recall@k: relevant chunks appear in retrieved top-k.
- Hallucination rate: unsupported factual claims.
- Latency p50/p95 for search and chat.

## Offline Release Gates

- No regression in hallucination rate.
- No regression in retrieval recall@k.
- Citation precision above defined minimum.
- p95 latency inside release budget.

## Online Safeguards

- Feature flag all prompt/model changes.
- Canary model updates on a small percentage first.
- Capture user feedback with "helpful/not helpful" and issue tags.

## Prompt and Model Versioning

- Track:
  - prompt version
  - model tag
  - parser schema version
  - embedding model version
- Persist versions in `ingest_runs` and chat telemetry.

## Rollback Criteria

Rollback immediately if:

- hallucination spikes,
- citation precision drops materially,
- p95 latency breaches SLO for sustained intervals,
- or parse failure rates exceed threshold.
