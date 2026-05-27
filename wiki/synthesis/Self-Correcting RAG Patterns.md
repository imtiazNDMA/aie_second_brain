---
title: Self-Correcting RAG Patterns
type: synthesis
tags: [rag, self-correction, evaluation, reflection, agentic-rag]
sources: [2026-04-29-self-rag, 2026-04-29-vera, 2026-04-12-14-types-of-rag, 2026-04-12-rag-driven-generative-ai]
created: 2026-05-09
updated: 2026-05-09
---

# Self-Correcting RAG Patterns

Vanilla RAG retrieves once, generates once, and ships. That's adequate for FAQ-shaped workloads but fails on ambiguous queries, contradictory sources, and high-stakes outputs (legal, medical, financial). Self-correcting RAG patterns insert evaluation and revision loops inside the pipeline — the model checks its own work, decides whether retrieval was sufficient, and re-retrieves or rewrites until confidence passes a bar. This synthesis maps the seven patterns with explicit correction loops in the wiki and tells you which to reach for when.

## Where in the pipeline does correction happen?

A RAG pipeline has five phases, and self-correction can plug into any of them:

```
[Query] → [Retrieval] → [Reranking] → [Generation] → [Output]
   1         2            3              4              5
```

| Pattern | Hooks at | Loop type |
| --- | --- | --- |
| [[Self-RAG]] | 1, 2, 4 (and decides *whether* to retrieve) | Reflection-token branching |
| [[Corrective RAG]] | 2 → 4 (grades retrieval, rewrites query if low) | Threshold-gated re-retrieve |
| [[Adaptive RAG]] | 1 (classifies query type, routes) | Routing |
| [[Speculative RAG]] | 4 (drafts answer, verifies with another model) | Parallel verify |
| [[Reflexion]] | 5 (post-hoc critique → retry) | Verbal RL |
| **RARR** ([[RARR]]) | 5 (atomic-claim attribution + minimal rewrite) | Post-hoc revision |
| [[VERA]] | 3, 5 (validates retrieved evidence + final answer) | External validator |

## The seven patterns compared

| Pattern | Mechanism | Cost | Latency | Quality lift | When to use |
| --- | --- | --- | --- | --- | --- |
| [[Self-RAG]] | Special **reflection tokens** in the model's vocabulary signal "retrieve?", "relevant?", "supported?", "useful?" | Trained-in; one model | +20–50% inference | Strong on long-form open-ended QA | You can fine-tune; want fewest moving parts |
| [[Corrective RAG]] | Lightweight retrieval grader scores chunks; if low → rewrite query, retry, optionally fall back to web search | Grader + retry | +30–80% on bad-retrieval queries (free on good ones) | Robust against retrieval failure | Production; query distribution is heterogeneous |
| [[Adaptive RAG]] | Query-complexity classifier routes between (no retrieval / single-step / multi-step) | Classifier overhead | Variable — saves on easy queries | Cost-efficiency lift more than quality lift | Mixed workloads; cost-sensitive |
| [[Speculative RAG]] | Small "drafter" generates K candidates; large "verifier" picks/refines | Drafter + verifier | Often net-faster (drafter is fast; verifier validates one) | Lift on factual accuracy | Latency-sensitive with quality bar |
| [[Reflexion]] | Run, evaluate, write natural-language critique, prepend critique, retry | K× per attempt | K× | Strong on agentic tasks with feedback | Agent-shaped RAG (multi-step, tool-using) |
| [[RARR]] | After draft: decompose into atomic claims, retrieve evidence per claim, minimally rewrite contradicted spans | Per-claim retrieve | +50–200% | Best-in-class attribution | High-stakes outputs requiring citations |
| [[VERA]] | External validator scores retrieval and answer on rubric; gate or revise | Validator model | +30–60% | Defensible audit trail | Compliance / regulated domains |

## Decision flow

```
What's failing?
├── Bad retrieval (low precision/recall)
│   └── Corrective RAG (grade + retry + web fallback)
│
├── Ambiguous queries (retrieve when shouldn't, miss when should)
│   └── Self-RAG (reflection-token gating)  OR  Adaptive RAG (router)
│
├── Hallucinated final answers
│   └── RARR (atomic-claim revision)  OR  Speculative RAG (verifier)
│
├── Need provable citations / audit trail
│   └── RARR + VERA (per-claim attribution + external validation)
│
└── Agent does multi-step retrieval/tool-use and gets stuck
    └── Reflexion (verbal critique → retry)
```

## Composability

These patterns compose cleanly because they hook at different phases:

- **Adaptive RAG (route)** + **Corrective RAG (verify retrieval)** + **RARR (verify generation)** is the canonical "industrial-strength" stack.
- **Self-RAG** subsumes parts of Adaptive + Corrective inside one model — you trade composability for a cleaner runtime.
- **Reflexion** is the agent-loop wrapper; any of the above can sit inside the action a Reflexion agent retries.
- **VERA** is orthogonal — it's an external validator that wraps any of the above for compliance.

## Cost / quality / latency trade-offs

| Goal | Cheapest pattern | Highest quality pattern |
| --- | --- | --- |
| Better retrieval | Adaptive RAG | Corrective RAG |
| Better generation | Speculative RAG | RARR |
| Less hallucination | Speculative RAG | RARR + VERA |
| Provable attribution | (none cheap) | RARR |
| Best-on-easy-queries throughput | Adaptive RAG | Adaptive RAG (it's a router) |

The cost dimension matters because every correction loop multiplies inference. On the local 48GB target with free-of-cost constraints, **Adaptive RAG + lightweight Corrective RAG grader** is the right starting point — both are mostly classifier-shaped, not LLM-rollout-shaped.

## Implementation considerations

### Grader / verifier choice

- **Same-model grader** — cheapest, but a model can be over-confident in its own retrieval; not ideal
- **Smaller-model grader** — different model class catches different errors; the [[Corrective RAG]] paper uses a T5-large grader and shows clear lift
- **External rule-based grader** — works for verifiable facts (dates, numbers); brittle for prose
- **LLM-as-Judge grader** — see [[LLM-as-Judge]]; standard for RAG triad metrics

### Retrieval grading metrics

- **Context Relevance** ([[Context Relevance]]) — share of retrieved chunks pertinent to the query
- **Response Adherence** ([[Response Adherence]]) — share of response grounded in retrieved context
- **Response Relevance** ([[Response Relevance]]) — share of response that addresses the query
- **FactScore** ([[FactScore]]) — atomic-claim factuality

These four metrics are the contract for any self-correction loop — see [[RAG Evaluation Playbook]] for instrumentation.

### Latency budgeting

A correction loop turns single-pass RAG into multi-pass. Budget conservatively:

- Adaptive RAG router classifier: ~50ms
- Corrective RAG retrieval grader: ~100–300ms
- Self-RAG reflection-token decoding: built into generation
- Speculative drafter pass: ~200ms (typically saves time net)
- RARR per-claim retrieve+verify: ~500ms × N claims (heavy)
- Reflexion full retry: full generation latency × K

For an interactive chat surface, RARR and Reflexion are usually too slow; reserve them for offline or async-human-review pipelines.

### Failure modes

- **Loop divergence** — model keeps re-retrieving; cap iterations and fall back
- **Confidence-hacking** — if the same model both generates and grades, it may confidently mis-grade. Use a different model class for graders.
- **Reward / grader hacking** — see [[LLM Alignment and Post-Training]] for the same problem in a training context
- **Cost blowup** — RARR + verifier on every query is unaffordable; gate on a confidence signal

## What this synthesis doesn't cover

The *input-side* improvements that go *before* retrieval — query rewriting, HyDE, step-back prompting, RAG-Fusion — are a separate cluster. See [[Pre-Retrieval Techniques for RAG]].

The *architecture-level* choice (Naïve vs Advanced vs Modular vs Graph vs CAG) is the [[RAG Architecture Decision Guide]].

The *evaluation* of these correction loops is the [[RAG Evaluation Playbook]].

## Related pages

- [[Self-RAG]], [[Corrective RAG]], [[Adaptive RAG]], [[Speculative RAG]], [[Reflexion]], [[RARR]], [[VERA]] — atomic patterns
- [[RAG Architecture Decision Guide]] — sibling synthesis (architecture-level)
- [[Pre-Retrieval Techniques for RAG]] — sibling synthesis (input-side)
- [[RAG Evaluation Playbook]] — how to measure these loops
- [[LLM Evaluation Benchmark Map]] — broader eval taxonomy that situates the RAG triad metrics
- [[LLM-as-Judge]] — common grader pattern
- [[Reflection]], [[Reflective Intelligence]], [[Reflection Tokens]] — reflection family
- [[Retrieval-Augmented Generation]] — broader hub
