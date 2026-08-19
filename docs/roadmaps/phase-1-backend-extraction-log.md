# Phase 1 Backend Extraction Log

Status: In Progress

Date: 2026-07-08

## Purpose

Track the incremental extraction of learning-domain logic from `api/src/db/client.ts` into standalone modules.

This log should be updated as Phase 1 continues so future sessions can resume without re-discovering what was already done.

## Completed In This Session

Extracted deterministic learning rules into `api/src/domain/`:

- `api/src/domain/lesson-runtime.ts`
  - `validateLessonStepAnswer`
  - `scoreLessonSession`
  - `feedbackForLessonStep`
  - `perfectBonusXpForLesson`

- `api/src/domain/reviews.ts`
  - `dueReviewItems`
  - `applyReviewAttempt`
  - `buildRepairQueue`

- `api/src/domain/progress.ts`
  - `buildProgressSummary`
  - `buildStreakSummary`
  - `buildXpSummary`

- `api/src/domain/curriculum.ts`
  - `statusWhenStartingLesson`
  - `buildPathProgressSummary`
  - `applyLessonCompletionState`
  - `reviewItemsCreatedFromSession`

- `api/src/domain/projects.ts`
  - `listProjectSummaries`
  - `applyCheckpointCompletion`

- `api/src/domain/wiki.ts`
  - `slugify`
  - `parseFrontmatter`
  - `stripFrontmatter`
  - `extractTitle`
  - `scanWiki`

- `api/src/db/content-loader.ts`
  - `loadSeedContent`
  - seed lesson normalization
  - seed review/project bootstrapping

- `api/src/db/state-store.ts`
  - `createStateStore`
  - persisted app-state load/save adapter

`api/src/db/client.ts` now delegates to these modules instead of owning all deterministic runtime logic inline.

## Verified

Verification command:

- `npm test`

Result:

- build passed
- smoke test passed
- no behavior regression detected in the current RAG MVP flow

Backend domain tests now also pass.

## Added Test Coverage

Added a lightweight backend test harness using Node's built-in test runner through `tsx --test`.

Current backend test coverage added in this session:

- `api/src/domain/lesson-runtime.test.ts`
  - answer validation rules
  - scoring rules
  - feedback fallback behavior
  - perfect bonus behavior

- `api/src/domain/reviews-progress-curriculum.test.ts`
  - review scheduling outcomes
  - repair queue generation
  - progress summary behavior
  - streak summary behavior
  - XP summary behavior
  - curriculum progression behavior
  - mastery updates on lesson completion

- `api/src/domain/wiki-state-store.test.ts`
  - wiki frontmatter/title parsing helpers
  - wiki scan graph behavior
  - state store load/save/merge behavior

The API workspace now exposes:

- `npm run test --workspace api`

## HTTP Adapter Migration

Completed in this session:

- removed Fastify as the active HTTP adapter
- replaced it with Express
- converted route registration from Fastify plugins to Express routers
- converted error handling from Fastify handlers to Express middleware
- updated the smoke harness to hit a real ephemeral HTTP port

Files changed for the adapter migration:

- `api/src/app.ts`
- `api/src/server.ts`
- `api/src/errors.ts`
- `api/src/routes/*.ts`
- `scripts/smoke.mjs`
- `api/package.json`

Result:

- Fastify is no longer the serving layer for the API
- Express is now the active REST adapter
- full build, smoke test, and backend tests pass after the migration

## Repository Interface Layer

Completed in this session:

- introduced repository interfaces in `api/src/repositories/types.ts`
- introduced a local repository container in `api/src/repositories/local.ts`
- updated the Express app and routes to depend on repository interfaces instead of the local app-data adapter directly

Current repository groups:

- `system`
- `wiki`
- `learning`
- `reviews`
- `projects`
- `animations`

What this changes architecturally:

- route modules no longer depend directly on `createAppDataClient`
- the local SQLite-backed implementation now sits behind a container seam
- a future Mongo-backed repository container can be introduced incrementally without changing route signatures again

## Mongo Scaffolding

Completed in this session:

- added Mongo configuration fields to `api/src/config.ts`
  - `repositoryBackend`
  - `mongoUri`
  - `mongoDbName`
- added a Mongoose connection helper in `api/src/db/mongo.ts`
- added initial Mongoose model files:
  - `api/src/models/learner.ts`
  - `api/src/models/wiki.ts`
  - `api/src/models/learning.ts`
  - `api/src/models/reviews.ts`
  - `api/src/models/projects.ts`
- added repository factory wiring:
  - `api/src/repositories/index.ts`
  - `api/src/repositories/mongo.ts`

Current runtime behavior:

- the app still defaults to `repositoryBackend=local`
- the local adapter remains the active backend
- the Mongo path is scaffolded but intentionally not implemented yet

Why this is useful:

- the Mongoose model layer now exists for the main repository groups
- the repository factory seam can choose local or Mongo without changing routes
- repository-by-repository Mongo migration can begin next without another app-shell refactor

## First Mongo Repository Slice

Completed in this session:

- implemented the first real Mongo-backed repository group: `wiki`
- added `api/src/repositories/mongo/wiki.ts`
- updated `api/src/repositories/mongo.ts` to compose a hybrid container:
  - Mongo-backed `wiki`
  - local-backed `system`, `learning`, `reviews`, `projects`, and `animations`

Current behavior:

- the application still defaults to the local backend
- when the Mongo backend is selected, the repository factory can now serve the `wiki` group from Mongo while leaving the rest on the local adapter

Added test coverage:

- `api/src/repositories/mongo/wiki.test.ts`
  - validates Mongo wiki document-to-runtime mapping helpers

Why this matters:

- the first real repository group has crossed from scaffold to implementation
- the hybrid container pattern is now proven
- the remaining groups can be ported incrementally instead of through a full storage rewrite

## Second Mongo Repository Slice

Completed in this session:

- implemented the next Mongo-backed repository group: `learning`
- added `api/src/repositories/mongo/learning.ts`
- updated the hybrid repository container so Mongo can now back:
  - `wiki`
  - `learning`
- local repositories still back:
  - `system`
  - `reviews`
  - `projects`
  - `animations`

What the Mongo learning slice now covers:

- path reads
- lesson reads
- lesson session persistence
- lesson completion persistence
- mastery persistence
- XP event persistence

Notes:

- the current implementation still leans on local reviews for due-review counts in the progress summary
- projects remain the next main migration target

Added test coverage:

- `api/src/repositories/mongo/learning.test.ts`
  - validates helper behavior for Mongo learning naming/mapping support

## Third Mongo Repository Slice

Completed in this session:

- implemented the Mongo-backed `reviews` repository group
- added `api/src/repositories/mongo/reviews.ts`
- updated the hybrid repository container so Mongo can now back:
  - `wiki`
  - `learning`
  - `reviews`

Current remaining local-backed groups:

- `system`
- `animations`

What the Mongo reviews slice now covers:

- review item seeding from authored review prompts
- due review queue reads
- review attempt persistence
- repair queue generation

Added test coverage:

- `api/src/repositories/mongo/reviews.test.ts`
  - validates Mongo review item mapping into runtime review shapes

## Fourth Mongo Repository Slice

Completed in this session:

- implemented the Mongo-backed `projects` repository group
- added `api/src/repositories/mongo/projects.ts`
- updated the hybrid repository container so Mongo can now back:
  - `wiki`
  - `learning`
  - `reviews`
  - `projects`

Current remaining local-backed groups:

- `system`
- `animations`

What the Mongo projects slice now covers:

- project reads from Mongo
- checkpoint completion persistence
- project progress persistence
- mastery updates from project checkpoints
- XP event persistence for project checkpoint completion

Added test coverage:

- `api/src/repositories/mongo/projects.test.ts`
  - validates Mongo project mapping into runtime project shapes

## Backend Selection Hardening

Completed in this session:

- added repository-factory selection tests
- added health response enrichment for active backend selection and Mongo readiness state
- kept the smoke contract stable while expanding health metadata

Files added/updated:

- `api/src/repositories/index.test.ts`
- `api/src/routes/health.test.ts`
- `api/src/repositories/index.ts`
- `api/src/routes/health.ts`
- `api/src/db/mongo.ts`

Current health response now includes:

- `repositoryBackend`
- `persistence.activeBackend`
- `persistence.mongo.readyState`
- `persistence.mongo.state`

Why this matters:

- backend selection is now testable without requiring a live Mongo instance
- health output can distinguish local vs Mongo-backed operation
- the next step can safely focus on switching runtime defaults and adding true integration coverage

## Preferred Runtime Path

Completed in this session:

- changed backend selection semantics to support `repositoryBackend=auto`
- `auto` now prefers Mongo and falls back to local if Mongo initialization fails
- forced `mongo` mode still remains available for fail-fast environments

Additional runtime details:

- `api/src/config.ts` now defaults backend selection to `auto`
- `api/src/db/mongo.ts` now uses a short server selection timeout for practical fallback behavior
- health output now reports both:
  - requested backend
  - resolved active backend

Added test coverage:

- repository factory now has explicit tests for:
  - `local`
  - `mongo`
  - `auto` preferring Mongo
  - `auto` falling back to local

Why this matters:

- the app can now prefer Mongo without making local development brittle
- production environments can force `mongo`
- development environments can rely on `auto` until Mongo is guaranteed everywhere

## Live Mongo Integration Coverage

Completed in this session:

- added a true Express app integration test for Mongo-backed mode using `mongodb-memory-server`
- made `buildApp()` accept an injected config so test environments can boot isolated runtime modes safely

Files added/updated:

- `api/src/integration/mongo-app.test.ts`
- `api/src/app.ts`
- `api/src/server.ts`
- `api/package.json`

What the live Mongo integration test covers:

- app boot with `repositoryBackend=mongo`
- `/api/health`
- `/api/wiki/sync`
- `/api/paths/:id`
- lesson start and lesson completion
- review attempt flow
- project checkpoint completion

Additional hardening discovered and fixed in this session:

- Mongo wiki sync now deduplicates pages, concepts, and edges before insertion
- test cleanup is resilient to Windows temp-directory timing quirks

Why this matters:

- Mongo-backed mode is now exercised through a real request flow, not only unit-level repository tests
- the migration path has crossed from scaffolded to integration-tested

## Backend Production Hardening

Completed in this session:

- added config validation
- added structured request logging with request IDs
- added baseline security middleware
- added response compression

Files added/updated:

- `api/src/config-validation.ts`
- `api/src/config-validation.test.ts`
- `api/src/logger.ts`
- `api/src/app.ts`
- `api/src/errors.ts`
- `api/src/config.ts`
- `api/package.json`

What was added:

- `helmet` middleware
- `compression` middleware
- request ID propagation via `x-request-id`
- structured JSON request completion logs
- structured error logs for server-side failures
- validation for runtime config invariants

Why this matters:

- the backend now has a more production-shaped operational baseline
- request-level debugging is easier
- broken runtime configuration fails early instead of producing vague downstream behavior

## Why This Was The First Seam

This was the best first extraction because it had:

- high leverage
- low migration risk
- no required API contract changes
- immediate improvement in locality

It creates a cleaner seam between persistence and learning behavior.

## Remaining High-Value Extraction Targets

### 1. Curriculum Module

Partially extracted. Still embedded in `api/src/db/client.ts`:

- path assembly
- seed-path to runtime-path mapping

Candidate module:

- `api/src/domain/curriculum.ts`

### 2. Project Checkpoint Module

Status:

- extracted in this session

### 3. Wiki Ingestion Module

Status:

- extracted in this session into `api/src/domain/wiki.ts`

### 4. State Adapter / Repository Seam

Status:

- initial extraction completed in this session

What remains in `api/src/db/client.ts`:

- SQLite bootstrap and learner profile initialization
- in-memory runtime assembly from loaded state
- app-level orchestration across extracted modules

Future direction:

- introduce repository-style interfaces before Express + MongoDB migration

## Suggested Next Step

The next Phase 1 implementation step should be:

1. add auth scaffolding and protected-route seams
2. add rate limiting and more explicit production security configuration
3. decide whether `system` should remain a thin local/system adapter or become repository-agnostic

That sequence keeps the remaining non-storage behavior moving out of `client.ts` before the persistence migration begins.

## Security Seams and Rate Limiting

Completed in this session:

- added config-driven admin auth scaffolding
- protected the wiki sync mutation behind an admin-auth seam
- added lightweight in-memory request rate limiting
- extended config validation for security-related runtime settings

Files added/updated:

- `api/src/security.ts`
- `api/src/security.test.ts`
- `api/src/app.ts`
- `api/src/routes/wiki.ts`
- `api/src/config.ts`
- `api/src/config-validation.ts`
- `api/src/config-validation.test.ts`
- `.env.example`

What was added:

- optional `ADMIN_TOKEN` support using `x-admin-token` or `Authorization: Bearer ...`
- `401` for missing admin credentials when admin auth is enabled
- `403` for invalid admin credentials
- in-memory rate limiting with `429` and `retry-after`
- rate-limit response headers for operational visibility
- integration coverage for both admin protection and rate limiting

Verification:

- `npm run test --workspace api`

Result:

- API tests pass, including existing Mongo integration coverage
- new auth and rate-limit coverage passes

Suggested next step now:

1. decide whether `system` should remain a thin local/system adapter or become repository-agnostic
2. tighten production security defaults further if hosted deployment becomes a real target
3. optionally expand protected-route seams to future admin-only endpoints as they are added

## Repository-Agnostic System Adapter

Completed in this session:

- extracted `system` health behavior into a standalone shared repository module
- removed the remaining dependency on local app-data health logic for Mongo-backed mode
- made health content counts come from shared seed content rather than a local persistence adapter

Files added/updated:

- `api/src/repositories/system.ts`
- `api/src/repositories/system.test.ts`
- `api/src/repositories/types.ts`
- `api/src/repositories/local.ts`
- `api/src/repositories/mongo.ts`

What changed architecturally:

- `system` is no longer an incidental byproduct of the local repository container
- both local and Mongo containers now compose the same `system` repository implementation
- health metadata still includes backend-specific database details, but the repository itself is no longer storage-coupled to SQLite runtime state

Verification:

- `npm run test --workspace api`

Result:

- API tests pass
- Mongo integration coverage still passes after the `system` seam extraction

Suggested next step now:

1. expand protected-route seams to any future admin or content-mutation endpoints
2. tighten production security defaults further if hosted deployment becomes a real target
3. continue extracting app-level orchestration that still lives in `api/src/db/client.ts`

## Seed Learning Runtime Extraction

Completed in this session:

- extracted seed-based concept bootstrap logic from `api/src/db/client.ts`
- extracted seed-path runtime assembly from `api/src/db/client.ts`
- reused the shared concept-title helper from Mongo learning code so concept naming lives in one place

Files added/updated:

- `api/src/domain/seed-learning.ts`
- `api/src/domain/seed-learning.test.ts`
- `api/src/db/client.ts`
- `api/src/repositories/mongo/learning.ts`

What changed architecturally:

- local seed-content runtime assembly is less embedded in the SQLite client
- concept bootstrap and seed-path construction now live in a shared domain module
- Mongo and local learning flows now share the same concept title normalization logic

Verification:

- `npm run test --workspace api`

Result:

- API tests pass
- Mongo integration coverage still passes

Suggested next step now:

1. continue extracting app-level orchestration from `api/src/db/client.ts`, especially lesson-session mutation flow and local review/project state helpers
2. expand protected-route seams to any future admin or content-mutation endpoints
3. tighten production security defaults further if hosted deployment becomes a real target

## Local Lesson Session Mutation Extraction

Completed in this session:

- extracted local lesson-session start flow into a shared helper
- extracted local lesson-step answer mutation flow into a shared helper
- extracted local lesson completion mutation flow into a shared helper

Files added/updated:

- `api/src/domain/local-learning-runtime.ts`
- `api/src/domain/local-learning-runtime.test.ts`
- `api/src/db/client.ts`

What changed architecturally:

- `api/src/db/client.ts` now delegates more lesson-session mutation rules to domain helpers instead of holding them inline
- start, answer, and complete flows for the local runtime are now easier to reason about and test in isolation
- the SQLite client is moving closer to a stateful adapter role instead of an all-in-one domain owner

Verification:

- `npm run test --workspace api`

Result:

- API tests pass
- Mongo integration coverage still passes

Suggested next step now:

1. extract local review/project state helper flows from `api/src/db/client.ts`
2. expand protected-route seams to any future admin or content-mutation endpoints
3. tighten production security defaults further if hosted deployment becomes a real target

## Local Review And Project Helper Extraction

Completed in this session:

- extracted local review-attempt mutation glue into a shared helper
- extracted local project lookup helper into a shared helper
- extracted local project checkpoint completion glue into a shared helper

Files added/updated:

- `api/src/domain/local-review-project-runtime.ts`
- `api/src/domain/local-review-project-runtime.test.ts`
- `api/src/db/client.ts`

What changed architecturally:

- `api/src/db/client.ts` now delegates more local review and project adapter behavior instead of mutating those flows inline
- project lookup and checkpoint completion glue are now isolated from the SQLite client wrapper
- the remaining `client.ts` code is narrower and more adapter-shaped

Verification:

- `npm run test --workspace api`

Result:

- API tests pass
- Mongo integration coverage still passes

Suggested next step now:

1. extract remaining local helper logic from `api/src/db/client.ts`, especially persistence/state-serialization glue such as `persistState`, `totalXp`, and local animation registry handling
2. expand protected-route seams to any future admin or content-mutation endpoints
3. tighten production security defaults further if hosted deployment becomes a real target

## Remaining Local Adapter Helper Extraction

Completed in this session:

- extracted local total-XP aggregation into a shared helper
- extracted persisted-state serialization glue into a shared helper
- extracted the local animation registry and lookup helper

Files added/updated:

- `api/src/domain/local-adapter-support.ts`
- `api/src/domain/local-adapter-support.test.ts`
- `api/src/db/client.ts`

What changed architecturally:

- `api/src/db/client.ts` now delegates nearly all non-bootstrap helper logic
- local adapter persistence-shape assembly is isolated from the SQLite client wrapper
- the animation registry is no longer embedded inline in the app-data client

Verification:

- `npm run test --workspace api`

Result:

- API tests pass
- Mongo integration coverage still passes

Suggested next step now:

1. review whether `api/src/db/client.ts` should stay as the remaining local bootstrap/state adapter or be split further into bootstrap vs runtime-state assembly
2. expand protected-route seams to any future admin or content-mutation endpoints
3. tighten production security defaults further if hosted deployment becomes a real target
