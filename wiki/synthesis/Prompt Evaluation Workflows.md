---
title: Prompt Evaluation Workflows
type: synthesis
tags: [prompting, evaluation, workflows]
sources: [2026-04-12-prompt-engineering-llms, 2026-04-12-ai-agents-in-action, 2026-04-12-llm-engineers-handbook]
created: 2026-04-12
updated: 2026-04-12
---

# Prompt Evaluation Workflows

Combines the feedforward loop from *[[Prompt Engineering]] for LLMs*, [[Prompt Flow]] guidance from [[2026-04-12-ai-agents-in-action]], and the observability stack in the [[LLM Twin]] project.

## Loop Overview

1. **Problem framing** — Convert the user task into structured instructions (per the [[LLM Application Loop]]).
2. **Context triage** — Gather facts, exemplars, and retrieved snippets before assembling prompts.
3. **Generation** — Run the prompt via notebooks, pipelines, or [[Prompt Flow]] nodes.
4. **Evaluation** — Apply rubrics (e.g., [[SOMA Evaluation Framework]]), regression suites, and online telemetry.

## Tool Chain

- **[[Prompt Flow]]** — Build reproducible prompt DAGs and attach evaluator nodes so every run produces rubric scores.
- **Offline rubrics** — Encode SOMA or custom criteria into [[LLM Evaluation Rubrics]]. Sample outputs via GitHub Copilot-style prompts from [[2026-04-12-prompt-engineering-llms]].
- **Experiment tracking** — Log prompt profiles, datasets, and metrics to [[Comet ML]]; tie runs back to [[ZenML]] pipelines when prompts are part of training workflows.
- **Online monitors** — Pipe production traces into [[Opik]] to watch for drift, toxicity, or latency regressions.

## Recommended Workflow

| Step | Actions | Outputs |
| --- | --- | --- |
| Design | Draft instructions + delimiters; capture assumptions | Prompt profile doc, test plan |
| Simulate | Run [[Prompt Flow]] or notebook harness with synthetic/recorded inputs | Batch of candidate outputs with SOMA scores |
| Review | SMEs audit low-scoring outputs, leave rationales | Annotated dataset for further tweaking or fine-tuning |
| Ship | Deploy via [[Prompt Flow]] endpoint or app, wire telemetry into [[Opik]] | Live dashboard with pass/fail metrics |
| Iterate | Feed failures into updated prompts or [[Direct Preference Optimization]] runs | Versioned prompts + changelog |

## Tips From the Sources

- *[[Prompt Engineering]] for LLMs* stresses pairing offline SOMA testing with online A/B experiments so prompts don’t regress after deployment.
- *AI Agents in Action* shows [[Prompt Flow]] acting as the “profile authoring” IDE before GPT publication; carry over the same profiles into assistant builders.
- *LLM Engineer’s Handbook* closes the loop by recording prompt revisions beside [[Fine-Tuning]] experiments, ensuring the same success metrics govern both prompts and adapters.
