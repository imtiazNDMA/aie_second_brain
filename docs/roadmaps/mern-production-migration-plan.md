# MERN Production Migration Plan

Status: Draft

Date: 2026-07-08

## Purpose

This document captures the current-state review of the project and a phased plan to evolve it into a production-ready full stack web app using a MERN-style architecture.

Use this as the primary continuation document for future sessions.

## Executive Summary

The project is already beyond a pure second-brain wiki. It has a working local web app with:

- React + Vite frontend
- Fastify + TypeScript API
- SQLite local persistence
- seed lesson content for one RAG path
- wiki scanning and sync reporting
- basic lesson, review, XP, mastery, and project checkpoint flows

That said, the current implementation is still a prototype vertical slice, not a scalable learning platform.

The main issue is not UI polish. The main issue is that the learning runtime, content pipeline, and persistence model are still MVP-grade and partially hard-coded.

The recommended path is a phased migration from the current local-first prototype to a production-ready MERN application without rewriting everything at once.

## Current State Review

### What Exists Today

Product shape already present:

- one playable learning path: `RAG Foundations`
- path map UI
- lesson player
- review queue
- project checkpoint flow
- wiki sync button
- local animation support

Technical shape already present:

- workspace repo with `api` and `web`
- backend routes for health, wiki sync, learning, reviews, projects, animations
- authored JSON content under `content/`
- schema file that describes a richer persistence model than the runtime currently uses
- smoke test proving the RAG MVP loop

### What The Codebase Is Doing

The app currently behaves like a polished seed-driven learning demo:

- it loads one hard-coded path from JSON seed files
- it scans the wiki and reports pages/links
- it allows a learner to progress through lessons
- it awards XP and marks progress
- it allows review item completion
- it allows project checkpoint completion

This proves the product direction, but not yet the production architecture.

### Major Gaps

#### 1. Seed-driven content instead of wiki-driven curriculum

The backend currently loads one path, one lesson set, one review set, and one project from `content/` seed files.

Implication:

- the app is not yet truly transforming the second brain into a dynamic curriculum
- adding more tracks manually will become expensive and brittle

#### 2. Persistence model is not production-grade yet

Although there is a rich SQL schema, much of the runtime state is effectively stored in one blob-like application state record.

Implication:

- this will not scale cleanly to multiple users, multiple tracks, analytics, authoring workflows, or adaptive progression

#### 3. Progression logic is linear and simplified

The curriculum files express richer rules, but runtime unlock behavior is mostly linear next-lesson unlocking.

Implication:

- mastery gates are not truly enforced
- serious skill progression is not yet reliable

#### 4. Review, streak, XP, and mastery logic are placeholders

Current implementations are good enough for MVP proof, but not good enough for a real learning product.

Examples:

- streak logic is oversimplified
- review scheduling is not truly due-date driven
- review completion behavior is simplistic
- mastery updates are coarse

Implication:

- the gamification loop is not yet trustworthy

#### 5. Freeform answer evaluation is too weak

Some scenario/drill evaluation is effectively length-based.

Implication:

- users can game the system
- applied mastery signals are noisy

#### 6. Frontend is still a large prototype shell

The current frontend is one large app-level screen managing many concerns at once.

Implication:

- future additions like auth, track selection, authoring, analytics, and richer lesson types will become harder to maintain

#### 7. Test coverage is too thin

There is a useful smoke test, but not enough automated coverage around domain behavior.

Implication:

- refactoring safely into production architecture will be difficult without adding tests first

## Target Product Direction

The target product is a production-ready learning platform with:

- track selection
- subtracks and unit progression
- short interactive lessons
- review scheduling
- mastery and repair loops
- project-based skill proof
- source-grounded content generation and editing
- multi-user support
- hosted deployment
- production auth, observability, and CI/CD

Initial flagship track:

- `AI Engineering`

Initial subtracks:

- `RAG`
- `Prompting`
- `Evaluation`
- `Agents`

Possible future main tracks:

- `ML Engineering`
- `Data Engineering for AI`
- `LLMOps`

## Target MERN Architecture

Note: the project will still likely remain TypeScript-first, which is the right choice.

### Frontend Module

- React
- Vite initially
- React Router
- TanStack Query
- Zustand or Redux Toolkit for client state
- React Hook Form + Zod for forms
- reusable UI primitives and design tokens

### Backend Module

- Node.js
- Express
- TypeScript
- Zod validation
- structured logging with Pino
- JWT auth with refresh tokens
- rate limiting and security middleware

### Database Module

- MongoDB
- Mongoose or native Mongo driver

### Supporting Infra

- Redis for cache, rate limiting, jobs, and queues later
- BullMQ for background jobs later
- Docker
- CI/CD
- monitoring and error reporting

## Recommended Production Modules

The current backend should be split into deeper modules before or during migration.

### 1. Wiki Ingestion Module

Responsibilities:

- read markdown pages
- parse frontmatter
- extract wikilinks
- normalize wiki page records
- store page/link sync metadata

### 2. Curriculum Module

Responsibilities:

- define tracks, units, lessons, prerequisites, unlocks
- map concepts to tracks
- support both authored and generated lesson structures

### 3. Lesson Runtime Module

Responsibilities:

- create lesson sessions
- move step by step through lesson flow
- validate answers
- emit lesson outcomes

### 4. Review Scheduling Module

Responsibilities:

- compute due review items
- reschedule items after attempts
- drive spaced repetition behavior deterministically

### 5. Mastery Module

Responsibilities:

- track concept mastery levels per learner
- update mastery from lesson, review, repair, and project events
- support decay and reinforcement later

### 6. Gamification Module

Responsibilities:

- XP event recording
- daily goal tracking
- streak tracking
- achievement logic later

### 7. Project Checkpoint Module

Responsibilities:

- represent project tasks and evidence
- gate project-proven mastery
- support rubric-based completion

### 8. Content Authoring Module

Responsibilities:

- review generated lessons
- edit lesson drafts
- validate source grounding
- publish approved content

## Proposed MongoDB Collections

Core learner and auth data:

- `users`
- `learnerProfiles`
- `sessions` or refresh token store

Content and curriculum:

- `tracks`
- `units`
- `lessons`
- `lessonSteps`
- `projects`
- `projectCheckpoints`
- `wikiPages`
- `wikiLinks`
- `concepts`
- `conceptEdges`
- `generatedLessonDrafts`
- `contentSyncRuns`

Runtime and progress:

- `lessonSessions`
- `lessonAttempts`
- `reviewItems`
- `reviewAttempts`
- `masteryStates`
- `xpEvents`
- `streakDays`
- `projectProgress`
- `repairQueueItems`

## High-Level API Direction

### Auth Routes

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /me`

### Learner Routes

- `GET /tracks`
- `GET /tracks/:trackId`
- `GET /tracks/:trackId/progress`
- `GET /lessons/:lessonId`
- `POST /lessons/:lessonId/start`
- `POST /lesson-sessions/:sessionId/steps/:stepId/answer`
- `POST /lesson-sessions/:sessionId/complete`
- `GET /reviews/due`
- `POST /reviews/:reviewId/attempt`
- `GET /projects`
- `GET /projects/:projectId`
- `POST /projects/:projectId/checkpoints/:checkpointId/complete`
- `GET /progress/summary`
- `GET /progress/mastery`
- `GET /progress/xp`
- `GET /progress/streak`

### Content/Admin Routes

- `POST /wiki/sync`
- `GET /wiki/pages`
- `GET /wiki/graph`
- `POST /content/generate-lessons`
- `GET /content/drafts`
- `PATCH /content/drafts/:draftId`
- `POST /content/drafts/:draftId/publish`

## Frontend Product Screens

The current frontend should evolve into separate screens/modules.

### Learner Screens

- Login / Signup
- Onboarding
- Track Selection
- Home Dashboard
- Path Map
- Lesson Player
- Review Queue
- Project Workspace
- Progress / Profile

### Author/Admin Screens

- Wiki Sync Status
- Content Draft Review
- Lesson Editor
- Curriculum Manager
- Analytics / Content Quality Dashboard

## Phased Approach

## Phase 0: Scope and Domain Lock

Target duration:

- 3 to 5 days

Goal:

- lock the MVP-to-production scope before doing migration work

Tasks:

- define v1 main track and subtracks
- define user roles and permissions
- freeze lesson step types and progression semantics
- define mastery levels formally
- define which current prototype behavior is acceptable to carry forward and which must be replaced
- define production non-functional requirements

Deliverables:

- architecture decision summary
- domain model document
- production backlog

## Phase 1: Extract Domain Modules From Prototype

Target duration:

- 1 to 2 weeks

Goal:

- turn the current prototype logic into deeper modules with clear seams

Tasks:

- split runtime logic out of storage code
- isolate answer validation logic
- isolate review scheduling logic
- isolate mastery transitions
- isolate gamification logic
- isolate project checkpoint logic
- add tests around module interfaces

Why this phase matters:

- it reduces migration risk
- it improves locality
- it prevents re-implementing prototype mistakes in Express and MongoDB

Deliverables:

- modularized backend domain layer
- interface-level tests for learning behavior

## Phase 2: Build Production Backend Foundation

Target duration:

- 2 to 3 weeks

Goal:

- move to an Express + TypeScript backend that is production-ready in shape

Tasks:

- scaffold Express app
- add security middleware
- add structured logging
- add request validation with Zod
- add centralized error handling
- add health and readiness endpoints
- define repository interfaces and adapters for MongoDB
- add config management for environments

Deliverables:

- production-oriented API skeleton
- MongoDB-connected backend foundation

## Phase 3: Migrate Persistence to MongoDB

Target duration:

- 1 to 2 weeks

Goal:

- replace blob-like app state with durable document persistence

Tasks:

- model lessons, sessions, reviews, mastery, XP, projects, and content syncs as real collections
- implement migration path for existing seed content
- persist runtime events individually
- remove dependence on a single app-state blob

Deliverables:

- production-grade persistence layer
- end-to-end RAG MVP running on MongoDB

## Phase 4: Build the Real Wiki-to-Curriculum Pipeline

Target duration:

- 2 to 4 weeks

Goal:

- make the wiki a true source of curriculum data instead of just a sync report

Tasks:

- persist normalized wiki pages
- persist wiki graph and concept graph
- define concept clustering and track mapping
- generate editable lesson drafts from source pages
- support human review before publishing
- track draft provenance and source grounding

Deliverables:

- content ingestion pipeline
- lesson draft workflow
- source-grounded publishing model

## Phase 5: Frontend Productization

Target duration:

- 2 to 3 weeks

Goal:

- replace the single-screen prototype shell with a scalable learner app

Tasks:

- add routing
- split app into screens and reusable modules
- add auth flow
- add track selection flow
- add dashboard and path views
- preserve original brand-safe game-like identity
- keep reduced-motion and local asset discipline

Deliverables:

- production-ready frontend shell
- multi-screen learner experience

## Phase 6: Real Learning Mechanics

Target duration:

- 2 to 3 weeks

Goal:

- make the progression and gamification loop rigorous enough for real learning

Tasks:

- implement due-date review scheduling correctly
- implement real streak logic by day
- implement XP events properly
- implement weak-skill repair triggers
- implement prerequisite and mastery gates
- implement partial credit or rubric coverage for freeform answers
- require project evidence for level 5 mastery

Deliverables:

- trustworthy learning engine
- better signal quality for mastery and progression

## Phase 7: Production Readiness and Operations

Target duration:

- 2 weeks

Goal:

- make the app deployable and operable in production

Tasks:

- Dockerize frontend and backend
- add CI/CD pipeline
- add unit, integration, and E2E test gates
- add rate limiting and auth hardening
- add monitoring and error reporting
- add environment-specific configuration
- add backup and restore strategy
- review security posture

Deliverables:

- production deployment baseline
- operational readiness checklist

## Phase 8: Hosted Beta Launch

Target duration:

- 1 week

Goal:

- ship the first hosted beta for real users

Possible stack:

- frontend: Vercel or similar
- backend: Render, Railway, Fly.io, or equivalent
- database: MongoDB Atlas
- cache/jobs: Redis service if needed

Deliverables:

- hosted beta
- seeded production track content
- QA signoff

## Suggested 8-Week Delivery Sequence

### Week 1

- lock product scope
- define target data model
- define module seams
- create engineering backlog

### Week 2

- extract backend domain modules
- add tests for lesson, review, mastery, and XP behavior

### Week 3

- scaffold Express backend
- wire MongoDB schemas and repositories

### Week 4

- migrate RAG MVP persistence to MongoDB
- preserve current end-to-end behavior

### Week 5

- build wiki ingestion persistence
- add content sync and graph storage

### Week 6

- refactor frontend into screen-based product shell
- add auth and track selection

### Week 7

- implement rigorous learning mechanics
- add admin/content review flows

### Week 8

- finish CI/CD, observability, QA, and deployment
- launch beta

## Testing Strategy

### Priority Unit Tests

- lesson answer validation
- review scheduling rules
- mastery transition rules
- XP and streak calculations
- prerequisite and unlock logic
- project checkpoint gating
- wiki parsing normalization

### Priority Integration Tests

- auth flow
- lesson start / answer / complete flow
- review attempt flow
- project checkpoint completion flow
- wiki sync flow
- draft publish flow

### Priority E2E Tests

- login and onboarding
- track selection
- complete a lesson
- clear a review item
- complete a project checkpoint
- view updated progress summary

## Key Risks

### Risk 1: Rewriting too early

If the app is rewritten into Express + MongoDB before extracting the learning logic into modules, the same architectural problems will be recreated.

### Risk 2: Confusing wiki sync with curriculum generation

Parsing markdown is only the first step. Curriculum generation and content review are separate problems.

### Risk 3: UI-first development

If more polish is added before progression, review, mastery, and content systems are made reliable, the product will look mature while still behaving like a prototype.

### Risk 4: Going broad too early

The safest launch path is:

- one main track: `AI Engineering`
- one highly polished subtrack: `RAG`
- one or two additional subtracks after the learning engine is stable

## Recommended Immediate Next Steps

### First milestone

Convert the current RAG MVP into a production-shaped vertical slice before expanding content breadth.

### Recommended next implementation sequence

1. Extract learning domain modules from the current backend.
2. Add interface-level tests for lesson runtime, review scheduling, mastery, and XP.
3. Define MongoDB schemas and repository interfaces.
4. Scaffold Express backend and migrate the RAG slice.
5. Split frontend into route-level screens.
6. Only then add auth, track selection, and more tracks.

## Open Decisions

These should be resolved early:

1. Is the first hosted version single-user beta or multi-user from day one?
2. Should the backend remain TypeScript + Vite frontend, or should the frontend also move to Next.js later?
3. Should freeform grading remain deterministic in v1, or include grounded LLM-assisted evaluation?
4. Will content publishing be author-reviewed only, or partially automated?
5. Is admin/content tooling part of v1 or v1.1?

## Definition of Success for First Production Version

The first production version should be considered successful if it can:

- support authenticated users
- let a learner choose a track and continue progress across sessions
- run a complete polished subtrack such as `RAG`
- store lessons, reviews, mastery, XP, streaks, and projects durably in MongoDB
- generate or manage content from wiki-derived source material with human review
- provide a reliable progression loop
- deploy safely in a hosted environment with monitoring and CI/CD

## Continuation Notes for Future Sessions

When resuming work, start from this order:

1. Re-read this file.
2. Confirm which phase is active.
3. Identify whether the next task is domain extraction, backend migration, content pipeline, frontend productization, or operations.
4. Avoid broad rewrites that skip Phase 1 module extraction.

If a future session needs implementation detail, derive it from this plan into:

- ADRs for major decisions
- backlog issues/tasks per phase
- detailed schema docs
- API contract docs
- frontend route/component maps
