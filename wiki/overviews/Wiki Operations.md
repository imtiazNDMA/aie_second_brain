---
title: Wiki Operations
type: overview
tags: [operations, ingest, lint, maintenance]
sources: []
created: 2026-04-29
updated: 2026-04-29
---

# Wiki Operations

Operational hub for maintaining wiki quality, ingest cadence, and graph health.

## Core artifacts

- [[index]] — Canonical catalog of entities, concepts, sources, syntheses, and overviews.
- [[log]] — Chronological record of ingest, lint, synthesis, and maintenance passes.

## Standard operating loop

1. Ingest new sources into `wiki/sources/`.
2. Create or update related concept/entity pages.
3. Add synthesis pages when cross-source patterns emerge.
4. Update `wiki/index.md` counts and entries.
5. Append operation notes to [[log]].
6. Run link/lint checks and fix issues.

## Quality guardrails

- Keep frontmatter complete (`title`, `type`, `tags`, `sources`, `created`, `updated`).
- Prefer explicit wikilinks over plain text references.
- Track measurable improvements (coverage, link integrity, and issue counts).
- Keep source provenance explicit for each source page.

## Operational KPIs

- **Weekly ingest throughput**: Number of new source pages added per week (`wiki/sources/`).
- **Broken-link count**: Number of unresolved wikilinks found in scheduled link checks.
- **Orphan-page count**: Number of pages with zero inbound links (excluding intentionally standalone operational logs).
- **Coverage ratio**: Share of ingested sources that have at least one linked concept update and one linked entity update.
- **Refinement velocity**: Number of quality-improvement passes (lint/refactor/cross-link) completed per week.

## KPI targets (initial)

- Weekly ingest throughput: **>= 2** source pages/week.
- Broken-link count: **0** after each maintenance pass.
- Orphan-page count: **<= 1** (allowing [[log]] as intentional standalone page).
- Coverage ratio: **100%** for newly ingested sources.
- Refinement velocity: **>= 1** focused quality pass/week.
