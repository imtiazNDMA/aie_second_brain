---
title: Error Budget
type: concept
tags: [observability, sre, production, reliability, governance]
sources: [2026-04-16-system-design-on-aws]
created: 2026-04-30
updated: 2026-04-30
---

# Error Budget

## Definition

An **Error Budget** is the quantified amount of unreliability that an [[SLI SLO SLA|SLO]] permits in a given time window. If the SLO is "99.9% of requests succeed over 28 days," the error budget is the **0.1% you're allowed to fail** — typically expressed as a number of failed requests, minutes of downtime, or fraction of bad responses.

Error budgets turn reliability from a perpetual emergency into a **resource you spend deliberately**, balancing development velocity against user-perceived reliability.

## Why error budgets exist

Without an error budget, an organization has two failure modes:

1. **Reliability theatre** — every outage triggers an existential crisis even when the SLO is intact. Engineers stop shipping. Innovation crawls.
2. **Reliability blindness** — small failures accumulate; "we've always had a few errors" becomes "the service is broken." Customers leave.

The error budget creates a third option: **quantified risk-taking**. You know exactly how much unreliability you can absorb. Deploy until the budget burns; freeze when it's gone.

## Computation

For an SLO target $T$ over a window $W$:

$$B = (1 - T) \times N(W)$$

where $N(W)$ is the number of valid events in the window.

| SLO | Window | Total events | Error budget |
|---|---|---|---|
| 99.9% | 28 days | 1B requests | 1M failed requests |
| 99.95% | 30 days | 30 day-minutes | 21.6 minutes downtime |
| 99.99% | 1 year | 525,600 minutes | 52.6 minutes downtime |
| 99.999% | 1 year | 525,600 minutes | 5.26 minutes downtime |

Always use the **rolling** window, not calendar months. A bad event on day 28 leaves the budget on day 29 of the rolling window.

## Burn rate

The error budget can be exhausted slowly (chronic small failures) or quickly (one incident). The **burn rate** is the ratio:

$$\text{Burn rate} = \frac{\text{Errors observed in window}}{\text{Errors allowed in window}}$$

A burn rate of 1.0 means you'll exhaust the budget exactly at the end of the window. A burn rate of 10 means you'll exhaust it 10× faster than allowed — usually an active incident.

### Multi-window alerting

Mature SRE practice alerts on **multiple time windows simultaneously** to balance alert latency vs noise:

| Window | Burn rate threshold | Severity |
|---|---|---|
| 1 hour | > 14.4× | Page immediately (critical) |
| 6 hours | > 6× | Page (high) |
| 3 days | > 1× | Ticket (medium) |
| 30 days | > 1× | Email digest (low) |

The constants come from Google's recommended budget-burn formulas: alert when *short* windows show high burn (active incident) AND *long* windows confirm sustained drain (not noise).

## Operational policy

The crucial part of error budgets isn't the math — it's the **organizational policy** attached to budget state:

| Budget state | Allowed activities |
|---|---|
| Healthy (>50%) | Standard deployment cadence; risky experiments OK; chaos engineering encouraged |
| Half-burned (25–50%) | Tighten code review; slow staged rollouts; postmortem any new incidents |
| Burning fast (<25%) | Freeze risky changes; defer feature work; focus team on reliability work |
| Exhausted | Halt all non-critical deploys; run an emergency reliability sprint; reset only with reset of window |

This policy is the **contract between SRE and product**. SRE defends the SLO; product gets predictable velocity. When the budget runs out, product accepts the freeze; when it's healthy, SRE doesn't object to risky launches.

## Trade-off framing

An error budget is the dual of an SLO:

| Tighter SLO | Looser SLO |
|---|---|
| Smaller budget | Larger budget |
| Less risk-taking | More risk-taking |
| Higher infra cost | Lower infra cost |
| More conservative engineering culture | More experimental engineering culture |

A 99.99% SLO with no budget left looks reliable but is staggeringly expensive and innovation-hostile. A 99% SLO with budget to spare is cheaper and faster but riskier per-user. Pick the SLO that maps to actual user expectations, then live with the budget.

## Error budgets for ML / LLM systems

Standard SLO-based error budgets work for availability and latency. For ML-specific properties, extend the model:

### Quality budget

Measure prediction or generation quality (faithfulness, exact-match, factuality). Target a quality SLO; the budget is the allowed fraction of bad responses.

### Drift budget

Measure feature or output distribution shift over time (PSI, KL divergence). Budget = allowed cumulative drift before retrain.

### Refusal budget

For safety-aligned LLMs: target a refusal rate band (e.g., 0.5–2%). Both over-refusal and under-refusal burn budget. Spend the budget when shipping new prompts that change refusal behavior.

### Hallucination budget

Sample generated outputs, label by LLM-as-judge or human, measure hallucination rate. Budget = allowed rate before taking the model offline.

These extensions matter because LLM systems can fail in ways traditional services don't. A 200ms-fast 200-OK response that's wrong burns user trust the way a 500 doesn't burn a CDN.

## Pseudocode: budget tracker

```python
class ErrorBudget:
    def __init__(self, slo_target, window):
        self.slo_target = slo_target
        self.window = window
        self.events = deque()
    
    def observe(self, event):
        cutoff = now() - self.window
        while self.events and self.events[0].ts < cutoff:
            self.events.popleft()
        self.events.append(event)
    
    @property
    def total(self):
        return len(self.events)
    
    @property
    def errors(self):
        return sum(1 for e in self.events if not e.is_good)
    
    @property
    def budget(self):
        return (1 - self.slo_target) * self.total
    
    @property
    def burned_pct(self):
        return self.errors / self.budget if self.budget else 0.0
    
    @property
    def state(self):
        b = self.burned_pct
        if b < 0.5: return "healthy"
        if b < 0.75: return "warning"
        if b < 1.0: return "critical"
        return "exhausted"
```

## Pitfalls

- **No remediation action** — alerts fire but no one freezes deploys. Budget becomes ornamental.
- **Single SLI** — if you only measure availability, you miss latency and quality regressions.
- **Customer-invisible SLI** — burning budget on something users don't notice while real pain goes unmeasured.
- **No retrospective on budget violations** — recurring incidents indicate systemic issues; not learning from them wastes the signal.
- **Adversarial gaming** — teams selectively counting events to look healthy. Mitigate via independent telemetry pipelines.

## Connections

- [[SLI SLO SLA]] — parent vocabulary; budget is the dual of SLO
- [[High Availability]] — what error budgets quantitatively manage
- [[ML Monitoring]] — extends budgets to ML-specific SLIs
- [[AIOps]] — automation of budget-state response
- [[LLMOps]] — applies budgets to LLM-specific dimensions
- [[Circuit Breaker]] — pattern that protects budget from cascading failures
- [[Retry with Backoff]] — pattern that consumes budget if mistuned
- [[Fault Tolerance]] — engineering posture that earns budget
- [[Continuous Training]] — drift-budget breach triggers retraining
- [[RAG Evaluation]] — quality budgets for RAG
