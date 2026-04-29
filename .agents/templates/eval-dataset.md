# Eval Dataset Template

Use this format to define repeatable evaluations for ingest, search, and chat.

## Dataset Metadata

- Dataset ID: `eval-<surface>-<name>`
- Version: `v1`
- Owner:
- Last updated: `YYYY-MM-DD`
- Scope: `ingest | search | chat | end-to-end`

## Quality Targets

- Groundedness target:
- Citation precision target:
- Retrieval recall@k target:
- Latency budget (p95):

## Case Table

Use one row per test case.

| case_id | difficulty | input | expected_behavior | expected_citations | pass_criteria |
|---|---|---|---|---|---|
| chat-001 | easy | "What is X?" | concise grounded answer | `source-a#chunk-03` | no hallucinated facts |

## Adversarial Cases

Include at least:

- prompt injection attempt
- irrelevant retrieval distractors
- conflicting sources
- empty evidence

## Result Logging

| run_id | date | model_tag | prompt_version | groundedness | citation_precision | recall_at_k | p95_ms | pass |
|---|---|---|---|---:|---:|---:|---:|---|

## Notes

- Capture regressions and suspected root causes.
- Link follow-up issues or tasks.
