# ADR 0006: MongoDB Persistence

Status: Accepted

Date: 2026-08-19

Supersedes: ADR 0002 (SQLite-First Persistence)

## Context

ADR 0002 chose SQLite for MVP persistence. Since then the repository has grown a
second, complete persistence implementation: `api/src/repositories/mongo/` with
Mongoose models and passing tests, driven by `docs/roadmaps/mern-production-migration-plan.md`
and executed through `docs/roadmaps/phase-1-backend-extraction-log.md`. Neither
document acknowledged ADR 0002, leaving the repository with committed code on
both sides of an unresolved fork.

The live state is also split: the 21-table SQLite schema in `api/src/db/schema.sql`
exists but holds zero rows, while runtime state actually lives in
`api/data/app-state.json`. A `repositoryBackend: "auto"` mode attempts Mongo and
silently falls back to local on failure.

The fork was resolved deliberately in favour of MongoDB, accepting the MERN
direction already under way and the hosted future it enables.

## Decision

Use MongoDB via Mongoose as the single persistence backend for the application.

Finish the MERN migration: the Mongoose models under `api/src/repositories/mongo/`
become the authoritative schema. `api/src/db/schema.sql` and the SQLite client
are retired once feature parity is reached.

Remove the silent `auto` fallback. A configured backend that cannot be reached
must fail loudly at startup rather than degrading to a different, empty datastore.

Keep the repository interface in `api/src/repositories/types.ts`. It stays
valuable as a testing seam and as insurance against a future backend change, even
though only one implementation is now maintained.

## Consequences

- A MongoDB server becomes a runtime dependency. It must be started by the same
  single command as the app (Docker Compose or an equivalent) so PRD user story 62
  still holds.
- Relational constructs in the retired schema need Mongo equivalents. In particular
  `concept_edges` traversal moves to `$graphLookup`, and foreign-key cascades
  become explicit application-level cleanup.
- Review scheduling (date-range queries), mastery aggregation over
  `lesson_attempts`, and weekly XP rollups need indexes designed deliberately
  rather than inherited from a relational schema.
- Removing the silent fallback converts a class of silent progress-loss bugs into
  loud startup failures.
- ADR 0002's rationale still holds for a hypothetical offline-only build; it is
  superseded, not proven wrong.

## Quality Gates

- Exactly one persistence backend is exercised by the app in normal operation.
- A missing or unreachable MongoDB fails at startup with an explicit error, never
  a silent fallback.
- Progress, attempts, mastery, reviews, hearts, freezes, and streak state round-trip
  through storage.
- Source-derived wiki records retain `body_hash` for sync decisions (see ADR 0010).
- Indexes exist for the review-due query, concept-mastery lookup, and weekly XP
  aggregation.
- Destructive reset operations require clear confirmation.
