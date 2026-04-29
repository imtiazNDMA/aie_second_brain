# Delivery Workflow

Standard execution flow for OpenCode when implementing features.

## 1) Discover

- Read related docs in `.agents/` first.
- Identify impacted layers: frontend, backend, database, design.
- List assumptions and risks.

## 2) Design

- Define API contract and data model updates.
- Define test plan before writing code.
- Choose rollout strategy (direct, flag, staged).

## 3) Build

- Implement from inner layers to outer layers:
  1. database
  2. backend
  3. frontend
  4. docs
- Keep commits focused and reversible.

## 4) Verify

- Run tests for touched layers.
- Validate happy path and one failure path.
- Confirm no regression in ingest, search, chat, graph routes.

## 5) Explain

- Document what changed, where, and why.
- Include upgrade notes for schema or config changes.
- Provide next-step recommendations.

## PR Template Guidance

- Problem: one paragraph.
- Solution: key decisions and trade-offs.
- Verification: commands/tests and outcomes.
- Risks: known limitations and follow-up tasks.
