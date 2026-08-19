# ADR 0002: SQLite-First Persistence

Status: Superseded by ADR 0006

Date: 2026-07-07

## Context

The MVP needs durable local state for lessons, attempts, reviews, mastery, XP, streaks, project progress, and the local learner profile. The app is single-user and local-only, but the data model should not be throwaway.

## Decision

Use SQLite as the MVP persistence layer, with migrations from the start. Store generated learning artifacts and learner progress in SQLite while keeping the wiki as the canonical source for knowledge content.

Postgres can be introduced later if the product becomes hosted or multi-user.

## Consequences

- Progress survives browser refreshes and local server restarts.
- The database remains easy to inspect, back up, and reset locally.
- Domain modules can be tested with deterministic local fixtures.
- The schema must distinguish source-derived records from learner-owned progress.
- Hosted migration will require schema compatibility review and data export/import support.

## Quality Gates

- Migrations create all MVP tables reproducibly.
- Progress, attempts, mastery, reviews, and streak state round-trip through storage.
- Source-derived wiki records include hashes or timestamps for sync decisions.
- Destructive reset operations require clear confirmation.
- Tests cover at least one persistence round trip for the core lesson flow.
