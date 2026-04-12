---
tags: [prompting, evaluation, workflow]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# Prompt Flow

## Definition

Microsoft’s workflow tooling (VS Code extension + CLI) for designing, testing, and deploying prompt pipelines with configurable inputs, profiles, and evaluators.

## Capabilities

- Build flows composed of Jinja2 prompt templates, tool nodes, and evaluation nodes.
- Run local apps to preview conversations, capture traces, and tweak profile variables.
- Deploy flows as APIs, run batch jobs, and attach evaluation flows that compare prompt variants with rubric-driven scoring.

## Related Concepts

- [[Prompt Engineering]] — Prompt Flow operationalizes systematic prompt iteration.
- [[LLM Evaluation Rubrics]] — Provide the criteria powering evaluation nodes.
