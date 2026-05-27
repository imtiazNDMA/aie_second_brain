---
title: SLI SLO SLA
type: concept
tags: [observability, sre, production, reliability]
sources: [2026-04-16-system-design-on-aws, 2026-04-16-grokking-advanced-system-design-interview]
created: 2026-04-30
updated: 2026-04-30
---

# SLI / SLO / SLA

## Definition

**SLI / SLO / SLA** is the three-tier vocabulary that Google SRE introduced for managing service reliability quantitatively. Each tier sharpens commitment:

| Tier | Stands for | Audience | Question it answers |
|---|---|---|---|
| **SLI** | Service Level **Indicator** | Engineers | *What are we measuring?* |
| **SLO** | Service Level **Objective** | Engineering + Product | *What value of the SLI is acceptable?* |
| **SLA** | Service Level **Agreement** | Customers + Legal | *What do we owe if we miss the SLO?* |

Without all three, "reliability" is a vibe. With all three, it's a budget you spend deliberately.

## Service Level Indicators (SLI)

An SLI is a **measurable quantity** that describes some aspect of service health. Good SLIs share three properties:

1. **User-centric** — measure something a user actually cares about (latency, errors), not internal counters (CPU%, memory%).
2. **Computable** — derive from observable telemetry without invasive instrumentation.
3. **Boolean per event** — for each request, the event either passed or didn't. Aggregations come later.

The standard SLI form is a ratio:

$$\text{SLI} = \frac{\text{good events}}{\text{valid events}}$$

### Common SLI families

| SLI family | Example |
|---|---|
| **Availability** | Fraction of HTTP 2xx + 3xx responses |
| **Latency** | Fraction of requests completing < 300 ms |
| **Quality** | Fraction of responses passing semantic correctness checks |
| **Throughput** | Requests/sec sustained without degradation |
| **Durability** | Fraction of stored objects readable after $T$ |
| **Correctness** | Fraction of computed results matching ground truth |

For LLM systems specifically:
- **Generation success rate** — fraction of requests returning a non-error completion.
- **Token-level latency** (TTFT, TPOT) — time-to-first-token, time-per-output-token.
- **Faithfulness** — fraction of RAG responses entailed by retrieved context (LLM-as-judge measured).
- **Refusal rate** — fraction of safety-triggered refusals. Both too high (over-refusal) and too low (unsafe) are bad.

## Service Level Objectives (SLO)

An SLO is a **target** for an SLI over a **rolling time window**:

```
SLO: 99.9% of HTTP requests complete in < 300 ms,
     measured over a rolling 28-day window.
```

Three elements: SLI definition, target value, and time window. All three are negotiated.

### Why SLOs are not 100%

Setting an SLO at 100% is the most common mistake. Reasons it's wrong:

- **Operational paralysis.** At 100%, every minor outage is a violation. Teams stop deploying.
- **Cost-prohibitive.** Each "9" of availability roughly multiplies infra cost by 3–10×.
- **Users don't notice.** Most users can't distinguish 99.9% from 99.99% — their internet connection is the bottleneck.
- **Innovation tax.** No room to experiment, refactor, or take controlled risks.

The SRE discipline insists: pick an SLO *below* current performance — typically 99.0–99.99% — and use the gap as your **error budget**.

### Choosing an SLO

| User-facing property | Typical SLO range |
|---|---|
| Internal admin tools | 99.0% |
| Standard B2B API | 99.9% (43m down/month) |
| Consumer-facing site | 99.95% (22m down/month) |
| Critical paid SaaS | 99.99% (4.3m down/month) |
| Banking transactions | 99.999% (26s down/month) |
| Pacemakers | as close to 100% as physics allows |

The right SLO is the one users would notice if you missed it.

## Service Level Agreements (SLA)

An SLA is the **contractual commitment** to a customer about an SLO and the **consequences of missing it** (refunds, credits, contract termination). SLAs typically:

- Are **looser than the internal SLO** (engineers manage to 99.95%; the contract promises 99.9%).
- Have **explicit exclusions** (planned maintenance, force majeure).
- Include **measurement details** (what counts as "down," who measures, dispute process).
- Specify **remediation** (service credit % for each tier of breach).

The SLA's looser target gives engineers a buffer to recover from rare incidents without triggering refunds. The internal SLO is the "early warning" target.

## Error Budget

The most operationally useful concept derived from SLOs is the **error budget**: the allowed amount of unreliability in the SLO window.

$$\text{Error Budget} = (1 - \text{SLO}) \times \text{Total Events}$$

Example: SLO 99.9% over 28 days, ~1B requests → error budget = 1M failed requests / month.

The budget is **spent by failures** and **replenished by time**. Operationally:

- **Budget remaining** → you can deploy risky changes, test in production, run chaos experiments.
- **Budget half-burned** → tighten review, slow rollouts.
- **Budget exhausted** → freeze non-critical changes until the window resets.

This makes reliability a **resource to manage**, not a perpetual emergency. See [[Error Budget]].

## Pseudo-code: computing an SLO

```python
from datetime import datetime, timedelta

def compute_slo(events, window=timedelta(days=28),
                slo_target=0.999):
    cutoff = datetime.now() - window
    recent = [e for e in events if e.timestamp >= cutoff]
    valid = [e for e in recent if e.is_valid()]
    good = [e for e in valid if e.is_good()]
    
    sli = len(good) / len(valid) if valid else None
    budget_used = (1.0 - sli) / (1.0 - slo_target) if valid else None
    
    return {
        "sli": sli,
        "slo_target": slo_target,
        "budget_used_pct": budget_used * 100 if budget_used else None,
        "events_in_window": len(valid),
    }
```

Production: replace the in-memory list with a streaming aggregation (Prometheus, Datadog, BigQuery rollup).

## Multi-SLI services

Real services have multiple SLIs and multiple SLOs:

| Service | Availability SLO | Latency SLO | Quality SLO |
|---|---|---|---|
| Search API | 99.9% non-5xx | 99% < 200ms | 99% relevance@10 > 0.7 |
| RAG endpoint | 99.5% non-5xx | 99% TTFT < 800ms | 95% faithfulness > 0.8 |
| Coding agent | 99% complete | 95% solve < 60s | 90% test-pass rate |

Each SLO has its own error budget; they're not fungible. A latency violation doesn't earn you availability slack.

## SRE's golden signals

Brendan Gregg's "USE method" and Google's "four golden signals" both prescribe a default SLI palette:

| Signal | What |
|---|---|
| **Latency** | Time to serve a request |
| **Traffic** | Requests / second |
| **Errors** | Failed-request rate |
| **Saturation** | Resource utilization headroom |

Plus, for stateful systems: **durability** and **consistency lag**.

## Pitfalls

- **Average-based SLOs** — averages hide tail latency. Always use percentiles (P95, P99, P99.9).
- **Single-window aggregation** — short windows are noisy; long windows hide regressions. Best practice: SLOs over 28 days, dashboards over 1h–24h.
- **SLI-SLO drift** — as the service evolves, the SLI definition becomes outdated. Review quarterly.
- **Customer-invisible SLOs** — measuring backend latency users never see; missing client-perceived latency.
- **Error-budget gaming** — burning budget on intentional outages to "prove" reliability claims.

## Connections

- [[Error Budget]] — the operational consequence of SLOs
- [[High Availability]] — what SLOs quantify
- [[ML Monitoring]] — extends SLO concept to model-quality metrics
- [[AIOps]] — automation of SLO-driven response
- [[LLMOps]] — applies SLOs to LLM-specific dimensions (faithfulness, refusal, drift)
- [[Fault Tolerance]] — engineering practice that earns the budget
- [[Circuit Breaker]] — pattern that protects budget from cascading failures
- [[Retry with Backoff]] — pattern that consumes budget if mistuned
- [[Real-Time Deployment]] — where SLOs live
- [[RAG Evaluation]] — produces quality SLIs for RAG systems
- [[LLM Evaluation Rubrics]] — produces quality SLIs for generation
