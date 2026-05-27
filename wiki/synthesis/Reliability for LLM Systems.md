---
title: Reliability for LLM Systems
type: synthesis
tags: [reliability, sre, slo, error-budget, llm-ops, production]
sources: [2026-04-16-system-design-on-aws, 2026-04-16-grokking-advanced-system-design-interview, 2026-04-29-hands-on-aiops-best-practices-guide-to-implementing-aiops, 2026-04-29-llmops-managing-large-language-models-in-production]
created: 2026-05-09
updated: 2026-05-09
---

# Reliability for LLM Systems

Classical SRE primitives — [[SLI SLO SLA]], [[Error Budget]], [[Blast Radius]], [[Circuit Breaker]], [[Saga Pattern]], [[Retry with Backoff]], [[Rate Limiting]] — were designed for stateless web services where failure is binary (request succeeded or didn't). LLM systems break those assumptions: outputs are *probabilistically wrong*, latency is multimodal, costs are non-trivial per call, and "correct" is fuzzy. This synthesis adapts the classical reliability toolkit to LLM-specific failure modes, points out which patterns transfer cleanly, and where new primitives are needed.

## What's different about LLM reliability

| Property | Classical service | LLM service |
| --- | --- | --- |
| Failure mode | Binary (200 vs 500) | Continuous (response is wrong, partially wrong, hallucinated, refused) |
| Latency profile | Tight distribution | Multimodal (cached vs cold; short vs long thinking) |
| Cost per request | Negligible | $0.0001 – $1.00 |
| Correctness check | Cheap (assertions, validators) | Expensive (LLM-as-judge, human review) |
| Determinism | Yes (modulo bugs) | No (sampling + non-determinism in CUDA kernels) |
| Throughput pattern | Flat | Bursty; capacity is GPU-bound |

These differences mean the *vocabulary* of reliability transfers but the *thresholds* and *response patterns* change.

## SLI / SLO / SLA reframed

[[SLI SLO SLA]] is the universal reliability vocabulary. For LLM systems, the SLI list is longer:

| SLI category | LLM-specific examples |
| --- | --- |
| Availability | Endpoint up, model loaded, inference returns at all |
| Latency | TTFT (time to first token), inter-token latency, total response latency |
| Quality | RAG triad scores, refusal rate, format-validity rate |
| Safety | Jailbreak rate, PII leakage rate, toxicity rate |
| Cost | $ per request, tokens per request, GPU utilization |
| Hallucination | Atomic-claim faithfulness, citation accuracy |

A production LLM SLO bundle typically looks like:

- **Availability:** 99.5% (lower than classical because GPU constraints make 99.99% expensive)
- **TTFT:** p99 < 2s
- **Total latency:** p99 < 30s for chat; p99 < 5min for reasoning
- **Refusal rate:** within target band ±5%
- **Quality (composite):** > internal eval threshold
- **Cost:** within budget envelope

The [[Error Budget]] derived from these SLOs governs how much you let the system experiment, deploy risky changes, or run hot.

## Where classical patterns transfer cleanly

### [[Retry with Backoff]]

LLM APIs return transient errors (rate limits, OOM, network) just like other services. Standard exponential backoff with jitter applies. **LLM-specific tweak:** distinguish *retry-safe* errors (rate limit, transient) from *retry-unsafe* (content policy refusal, model output that failed validation). Retrying a refusal won't help.

### [[Rate Limiting]]

LLM services are GPU-bound, not bandwidth-bound. Rate limiting is essential for cost control and capacity protection. Token-bucket per user + global concurrency cap. Per-tenant cost caps for multi-tenant. **LLM-specific tweak:** rate-limit by *tokens*, not requests — a 100K-token query is 1000× the cost of a 100-token one.

### [[Caching]]

LLM responses are highly cacheable when they're deterministic-ish:

- **Exact-match cache** — system prompts, FAQs, fixed-template responses
- **Semantic cache** — embed query, look up nearest cached response (lossy; great for product Q&A)
- **Prefix cache** — KV-cache prefix sharing for system prompts; see [[KV Cache]], [[Cache-Augmented Generation]]
- **Reasoning-output cache** — reasoning is deterministic-ish given seed; cache aggressively

A well-tuned cache can cut cost 50–90% on workloads with repetitive structure. Always layer it.

### [[Load Balancing]]

Standard L7 patterns apply. **LLM-specific tweaks:**

- Route by GPU memory headroom, not just request count
- Sticky sessions for prefix-cache hit rate (route same user / same conversation to same instance)
- Separate fast-path (small model) and slow-path (reasoning model) pools

### [[Circuit Breaker]]

Trip when downstream model service degrades. Same as classical. **LLM tweak:** trip on *quality regression* too, not just availability — if eval scores tank on a deploy, break the circuit and roll back automatically.

### [[Fault Tolerance]] / [[High Availability]]

Multi-region LLM serving is expensive (GPU stockpiles per region) and often skipped for non-critical chat. Standard reasoning otherwise. **LLM tweak:** falling back to a smaller model on a different region is often acceptable — quality degradation > unavailability.

## Where new primitives are needed

### Quality circuit breaker

Classical circuit breakers trip on availability. LLM systems need to trip on **quality regression**:

- Run shadow eval (golden set) on every deploy
- Block / roll back if scores drop > threshold
- Continuous online eval (sampled real traffic) feeds back into the breaker

This is the closest LLM-side analog to [[Continuous Training]] — but for runtime, not training time.

### Output validation gate

Every LLM response should pass a validation gate before reaching the user:

| Gate | Check | On failure |
| --- | --- | --- |
| Format | JSON schema, regex, structured-output validation | Retry / repair |
| Safety | Toxicity classifier, PII detector | Block / sanitize |
| Faithfulness (for RAG) | Atomic-claim ↔ context check | Re-retrieve / refuse |
| Relevance | Did response answer the query? | Retry |

[[Self-Correcting RAG Patterns]] formalizes the retrieval/generation gates; this synthesis is the broader version.

### Cost circuit breaker

Per-user, per-tenant, per-request cost caps. Hard cap (request rejected) and soft cap (downgrade to cheaper model) both useful.

### Hallucination rate as SLI

Treat hallucination like latency — measurable, alertable, budgeted. Sampling-based (LLM-as-judge on a sample) plus user-flagged complaints. Hard SLO: hallucination rate < target.

### Reasoning latency budget

[[Reasoning Models Landscape]] introduced minute-scale "thinking" latency. The new pattern:

- **Interactive tier:** < 1s — must use fast generalist
- **Deliberative tier:** 1–10s — can use larger generalist or short reasoning
- **Analytical tier:** 10s–10min — reasoning model with explicit "thinking" UI

UX must signal which tier the user is in; mixing them confuses users and breaks SLO interpretation.

## Failure-mode catalog (LLM-specific)

| Failure | Detection | Mitigation |
| --- | --- | --- |
| Model OOM | Health-check + retry on different instance | KV cache cap; model sharding |
| Quality regression on deploy | Shadow eval; canary | Quality circuit breaker; auto-rollback |
| Hallucination spike | Sampled LLM-as-judge | Re-run with lower temperature; tighten prompts; investigate |
| Refusal-rate creep | Refusal-rate dashboard | Prompt tuning; safety-filter tuning |
| Prompt injection / jailbreak | Pattern detectors + classifier; user-report channel | Input sanitization; output filter; ban repeat offenders |
| Cost blowup | Per-request token logging | Budget caps; model tiering |
| Cache invalidation cascade | Hit-rate dashboard | Versioned cache keys; gradual rollout |
| Vendor outage (third-party LLM) | Provider health API | Multi-vendor fallback; cached answers; graceful degradation |
| Long-tail latency from runaway reasoning | Token-budget cap | Hard token cap; user-visible "still thinking" UI |

## Saga / multi-step coordination

[[Saga Pattern]] applies cleanly to multi-step LLM workflows (especially agent loops). Each step has a forward action and a compensating action.

For an agent that:
1. Searches for documents
2. Drafts a response
3. Sends an email

The saga compensations are:
1. (no compensation; read-only)
2. (no compensation; in-memory)
3. (compensation: send a correction email if step 4 fails)

Most LLM agent failures are *read-then-think* — saga matters most when the agent reaches *write/act* tools (file edits, API calls, emails). [[AI Coding Agents]] discusses the same blast-radius concern from the agent angle.

## Observability essentials

| What to log | Why |
| --- | --- |
| Full prompt sent + full response | Reproducibility; debugging |
| Model version + temperature + seed | Pin variability; reproduce regressions |
| Token counts (prompt, response, cache hit) | Cost attribution |
| Eval scores per request (sample) | Quality SLO |
| User feedback (thumbs/ratings/edit-then-resend) | Online quality signal |
| Latency breakdown (TTFT, retrieval, rerank, generation) | Latency SLO |
| Tool calls + their I/O (for agents) | Agent debugging |

Tools: [[Opik]], [[AgentOps]] (atomic pages); LangSmith, Helicone, Arize Phoenix, Langfuse (broader ecosystem). The wiki's [[LLM Ops Toolchain]] synthesis maps these.

## Where this connects

- **[[AIOps-LLMOps Convergence for Agent Operations]]** — the operational discipline view; this synthesis is the SLO/circuit-breaker view of the same territory.
- **[[Data Engineering for AI]]** — the monitoring/continuous-training data flow.
- **[[LLM Inference Optimization Stack]]** — the latency/cost knobs.
- **[[Self-Correcting RAG Patterns]]** — the per-request quality-gate pattern.
- **[[Agent Trust and Safety Controls]]** — the safety-side of validation gates.

## Related pages

- [[SLI SLO SLA]], [[Error Budget]] — vocabulary
- [[Blast Radius]], [[Fault Tolerance]], [[High Availability]] — reliability concepts
- [[Circuit Breaker]], [[Retry with Backoff]], [[Rate Limiting]] — patterns
- [[Saga Pattern]], [[Caching]], [[Load Balancing]] — coordination + perf
- [[ML Monitoring]] — quality signal
- [[KV Cache]], [[Cache-Augmented Generation]] — caching substrate
- [[AIOps]], [[LLM4AIOps]] — incident-response discipline
- [[AIOps-LLMOps Convergence for Agent Operations]] — sibling synthesis
- [[LLM Inference Optimization Stack]] — sibling synthesis (perf)
- [[Self-Correcting RAG Patterns]] — sibling synthesis (per-request quality)
- [[AI Coding Agents]] — agent-side blast-radius case
