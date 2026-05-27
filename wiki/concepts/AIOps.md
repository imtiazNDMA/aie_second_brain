---
title: AIOps
type: concept
tags: [aiops, observability, sre, devops, incident-management]
sources: [2026-04-29-hands-on-aiops-best-practices-guide-to-implementing-aiops, 2026-05-09-llm-aiops-survey]
created: 2026-04-29
updated: 2026-05-09
---

# AIOps

## Definition

AIOps (Artificial Intelligence for IT Operations) applies machine learning and automation to operational telemetry so teams can reduce alert noise, accelerate incident response, and improve service reliability.

## Core workflow

1. Collect and normalize events, metrics, logs, and topology context.
2. Suppress and deduplicate noisy signals.
3. Correlate related events and infer probable causes.
4. Trigger assisted or automated remediation workflows.
5. Feed operator outcomes back into models and rules.

## Design principles

- Treat AIOps as an operations program, not a standalone model project.
- Connect AIOps outcomes to SLOs, toil reduction, and MTTR improvements.
- Use human-in-the-loop controls before fully autonomous remediation.
- Prioritize data quality (CMDB, ownership, dependencies) to improve correlation quality.

## Operational scorecard

- **MTTR**: Track median time to detect, diagnose, and resolve incidents; target sustained reduction over rolling 4-week windows.
- **Alert precision**: Measure actionable alerts / total alerts; reduce noisy or duplicate alert volume.
- **False-positive rate**: Monitor incidents triggered without real service impact; tighten correlation and suppression rules.
- **Incident recurrence**: Track repeat incidents by service or class; prioritize automation for high-recurrence failure modes.
- **Automation safety**: Track auto-remediation success rate and rollback frequency before raising autonomy level.

## Evaluation mapping

- Use [[ML Monitoring]] for drift and runtime telemetry baselines.
- Use [[RAG Evaluation]] and [[RAG Evaluation Playbook]] when AIOps workflows rely on retrieval-grounded agent reasoning.
- Use [[LLM Evaluation Rubrics]] for quality checks on agent-generated diagnostics and operator-facing explanations.
- Use [[AIOps-LLMOps Convergence for Agent Operations]] to align incident operations metrics with LLMOps governance.

## LLM-Era Reframe (per the 2025 ACM CSUR survey)

Per [[2026-05-09-llm-aiops-survey]] (Zhang et al., 183 papers reviewed), LLMs reshape AIOps along four dimensions — see [[LLM4AIOps]] for the full taxonomy:

- **New data sources unlocked**: runbooks, postmortems, ticket histories, Slack threads, internal wikis — previously unstructured text now usable as operational input
- **Tasks reframed as conversation**: failure-ticket triage, root-cause analysis, runbook generation, log analysis, anomaly diagnosis, code-fix suggestion all become natural-language tasks
- **Techniques deployed**: in-context learning + RAG over operational corpora + agentic loops with tool use (kubectl, Prometheus, log search) + occasional fine-tuning on log syntax
- **New tasks unlocked**: interactive incident-commander assistants, continuous runbook validation, postmortem auto-drafting

LLM-era AIOps risks specific to this transition: **hallucination is operationally dangerous** (fabricated runbook steps cited during incidents), **latency budgets** (slow LLMs miss the response window), **privacy/data residency** (logs contain PII/secrets), and **skill atrophy** in operators.

## Related concepts

- [[LLM4AIOps]] — LLM-era discipline applying LLMs to AIOps tasks
- [[MLOps]]
- [[LLMOps]]
- [[ML Monitoring]]
- [[Event-Driven Architecture]]
- [[Agentic Systems]]
- [[RAG Evaluation]]
- [[AIOps-LLMOps Convergence for Agent Operations]]

## Sources

- [[2026-04-29-hands-on-aiops-best-practices-guide-to-implementing-aiops]]
- [[2026-05-09-llm-aiops-survey]] — Zhang et al., ACM Computing Surveys (accepted), 2025
