# AI Engineering Learning Platform TODOs

## Status Legend

- [x] Done
- [ ] Not started
- [~] In progress
- [!] Blocked / needs decision

## Planning and Product

- [x] Create `plan.md` for the AI Engineering learning platform.
- [x] Define the product as a Duolingo-style learning experience without copying Duolingo brand assets.
- [x] Scope the MVP as a localhost web app.
- [x] Add UI direction for a polished consumer-grade learning app.
- [x] Add Lottie animation requirements for AI Engineering concepts and learning states.
- [x] Create PRD from `plan.md`.
- [x] Publish PRD to GitHub issue with `ready-for-agent` label.
- [x] Save local PRD copy under `docs/prds/`.
- [x] Create system architecture document.
- [x] Create project TODO checklist.
- [ ] Decide final product name.
- [x] Decide mascot approach: abstract geometric companion, Lottie shape layers (ADR 0007).
- [ ] Decide final visual identity and color palette.
- [x] Decide exact MVP stack: Vite + React frontend plus Node/Express API.
- [x] Decide track structure: five tracks in a gated diamond DAG, ML at the root (ADR 0008).
- [x] Decide first slice: LLM Engineering only, gates deferred, other tracks locked.
- [x] Decide hearts: deplete, lesson ends at zero, refill by clearing review items.
- [x] Decide streaks: freezes earned by hitting 2x the daily goal, max 2 held.
- [x] Decide leagues: ghost leagues ranked against the learner's own prior weeks.
- [x] Decide lesson shape: explain + 8-12 ramped steps + summary, nine question types.
- [x] Decide wiki-change handling: version lessons, mastery stays concept-scoped (ADR 0010).
- [x] Decide frontend approach: rebuild on Vite with router, Tailwind, Framer Motion, TanStack Query.
- [x] ~~SQLite-first schema~~ superseded: MongoDB via Mongoose is the target backend (ADR 0006).
- [x] ~~Manual/offline seed content first~~ superseded: hybrid — 10 hand-authored lessons as few-shot exemplars, then local Ollama generation behind a source-validation gate and human review (ADR 0009).

## Repository and Documentation

- [x] Existing wiki available under `wiki/`.
- [x] Existing `plan.md` created.
- [x] Existing PRD created.
- [x] Existing GitHub issue created: `PRD: AI Engineering Learning Platform`.
- [ ] Add issue tracker configuration docs if using more engineering skills.
- [x] Add ADR for local-first architecture.
- [x] Add ADR for original gamified UI constraints and brand safety.
- [x] Add ADR for SQLite-first persistence.
- [x] Add ADR for lesson/mastery domain model.
- [x] Add ADR for Lottie asset governance.
- [x] Add MVP QA checklist.

## App Scaffold

- [x] Create frontend app.
- [x] Create backend app.
- [x] Add TypeScript configuration.
- [x] Add linting and formatting.
- [x] Add test runner.
- [x] Add local SQLite database.
- [~] Add database migration workflow.
- [x] Add one-command dev script.
- [x] Add health endpoint.
- [x] Add environment variable template.

## Backend

### Wiki Content Ingestion

- [x] Implement wiki scanner.
- [x] Parse markdown frontmatter.
- [x] Parse page title, type, tags, sources, body hash, and excerpt.
- [x] Parse wikilinks.
- [x] Store resolved and unresolved links.
- [x] Skip catalog/log files by default.
- [x] Add sync report.
- [x] Add manual sync endpoint.
- [ ] Add optional file watcher.
- [x] Add parser fixtures and tests.

### Concept Graph

- [x] Create concept records from wiki pages.
- [x] Create concept edges from wikilinks.
- [ ] Add curated prerequisite support.
- [x] Add unlock relationship support.
- [ ] Add related concept lookup.
- [x] Add graph endpoint.
- [x] Add concept graph tests.

### Lessons

- [x] Define lesson schema.
- [x] Define lesson step schema.
- [x] Seed RAG Foundations path.
- [x] Create first 10 lessons.
- [ ] Add lesson draft status.
- [ ] Add lesson publish flow.
- [x] Add source references on lesson steps.
- [ ] Add lesson validation report.
- [x] Add lesson API endpoints.

### Lesson Runtime

- [x] Start lesson session.
- [x] Serve lesson steps.
- [x] Submit answer.
- [x] Validate answer.
- [x] Record step attempt.
- [x] Complete lesson.
- [x] Emit XP event.
- [x] Emit mastery event.
- [~] Emit review scheduling event.
- [x] Add lesson runtime smoke test.

### Question Engine

- [x] Support explanation steps.
- [x] Support multiple choice.
- [x] Support multi-select.
- [x] Support free recall.
- [x] Support scenario judgment.
- [x] Support mini design drill.
- [x] Add deterministic answer validation.
- [ ] Add tests for each question type.

### Review Scheduler

- [x] Define review item schema.
- [ ] Create review items from wrong answers.
- [ ] Create review items from lesson completion.
- [x] Return due reviews.
- [x] Record review attempts.
- [x] Reschedule reviews.
- [ ] Add simple spaced repetition intervals.
- [x] Add weak-skill repair queue.
- [x] Add review scheduler tests.

### Mastery

- [ ] Define mastery levels 0-5.
- [ ] Update mastery after lesson introduction.
- [ ] Update mastery after recognition.
- [ ] Update mastery after recall.
- [ ] Update mastery after application.
- [x] Update mastery after project checkpoint.
- [ ] Add mastery decay.
- [ ] Add weak concept lookup.
- [ ] Add mastery tests.

### Gamification

- [x] Define XP events.
- [x] Award lesson XP.
- [x] Award perfect lesson bonus.
- [x] Award review XP.
- [ ] Award repair XP.
- [x] Award project checkpoint XP.
- [x] Track daily goal.
- [x] Track streak.
- [ ] Add completion event state.
- [x] Add gamification tests.

### Projects

- [x] Define project schema.
- [x] Define checkpoint schema.
- [x] Create toy RAG evaluation project.
- [x] Add checkpoint completion endpoint.
- [x] Store evidence notes.
- [x] Award project XP.
- [x] Apply project-proven mastery.
- [x] Add project tests.

### Lottie Asset Registry

- [x] Define animation asset schema.
- [ ] Create local asset manifest.
- [x] Map animation states to assets.
- [x] Add reduced-motion fallback metadata.
- [x] Add animation endpoint.
- [x] Add tests for asset lookup.

## Database

- [x] Create `learner_profiles` table.
- [x] Create `wiki_pages` table.
- [x] Create `wiki_links` table.
- [x] Create `concepts` table.
- [x] Create `concept_edges` table.
- [x] Create `learning_paths` table.
- [x] Create `path_units` table.
- [x] Create `lessons` table.
- [x] Create `lesson_steps` table.
- [x] Create `lesson_sessions` table.
- [x] Create `lesson_attempts` table.
- [x] Create `review_items` table.
- [x] Create `review_attempts` table.
- [x] Create `concept_mastery` table.
- [x] Create `xp_events` table.
- [x] Create `streak_days` table.
- [x] Create `projects` table.
- [x] Create `project_checkpoints` table.
- [x] Create `project_progress` table.
- [x] Create `animation_assets` table.
- [x] Add indexes for common lookups.
- [ ] Add migration tests or schema smoke test.

## Frontend

### UI Foundation

- [x] Create design tokens.
- [x] Create typography scale.
- [x] Create color palette.
- [x] Create button styles.
- [x] Create card styles.
- [x] Create progress meter styles.
- [ ] Create icon strategy.
- [x] Add responsive shell.
- [x] Add reduced-motion handling.

### Lottie UI

- [x] Install Lottie React package.
- [x] Add `public/lottie/` folder.
- [ ] Add onboarding animation.
- [ ] Add chatbot animation.
- [x] Add RAG pipeline animation.
- [ ] Add agent tool-use animation.
- [ ] Add eval checklist animation.
- [ ] Add deployment animation.
- [ ] Add streak animation.
- [ ] Add lesson completion animation.
- [ ] Add review empty-state animation.
- [ ] Add lazy loading.
- [x] Add reduced-motion fallback.

### Screens

- [x] Home / active path screen.
- [x] Learning path map.
- [x] Lesson player.
- [x] Review queue.
- [x] Project checkpoint screen.
- [x] Wiki sync/admin screen.
- [x] Settings screen.

### Components

- [x] Lesson node.
- [x] Unit section.
- [x] XP meter.
- [x] Streak badge.
- [x] Daily goal card.
- [x] Review card.
- [x] Question card.
- [x] Source citation link.
- [x] Project checkpoint card.
- [x] Animation player wrapper.
- [ ] Mastery badge.
- [ ] Answer feedback.
- [ ] Completion modal.

### Frontend Behavior Tests

- [x] Home screen renders active path and daily progress.
- [x] Path map renders lesson states.
- [x] Lesson player advances through steps.
- [x] Correct answer shows positive feedback.
- [x] Wrong answer shows explanation and repair scheduling.
- [x] Lesson completion shows XP and animation.
- [x] Review queue shows due items.
- [x] Reduced-motion mode disables animation playback.

## Content

- [ ] Select 20 core pages for MVP.
- [x] Define RAG Foundations path.
- [x] Define RAG Foundations units.
- [x] Create 10 RAG Foundations lessons.
- [x] Create review cards for each lesson.
- [x] Create scenario questions for each lesson.
- [x] Create toy RAG evaluation project.
- [x] Map lessons to source wiki pages.
- [~] Validate all generated lesson content against wiki sources.

## QA and Release

- [x] Run backend unit tests.
- [x] Run frontend behavior tests.
- [x] Run wiki sync smoke test.
- [x] Run full local lesson completion smoke test.
- [x] Run review scheduling smoke test.
- [x] Run project checkpoint smoke test.
- [ ] Verify local app starts with one command.
- [ ] Verify app runs without network after assets are installed.
- [ ] Verify Lottie assets are local.
- [x] Verify reduced-motion mode.
- [ ] Verify no Duolingo protected assets, mascot, copy, or exact UI are used.

## Duolingo Pivot Work (added 2026-08-19)

Derived from ADRs 0006-0010. These supersede or extend the items above.

### Persistence (ADR 0006)

- [ ] Reach feature parity on the Mongoose repositories.
- [ ] Remove the silent `auto` fallback; fail loudly when the backend is unreachable.
- [ ] Retire `api/src/db/schema.sql` and the better-sqlite3 client.
- [ ] Add indexes for review-due, concept-mastery lookup, and weekly XP rollup.
- [ ] Replace `concept_edges` traversal with `$graphLookup`.
- [ ] Start MongoDB from the same single command as the app.

### Curriculum (ADR 0008)

- [ ] Add a prerequisite relation to learning paths.
- [ ] Build the track-map screen showing the diamond with locked tracks.
- [ ] Reshape `rag-foundations` into LLM Engineering's opening units.
- [ ] Author the LLM Engineering unit sequence beyond RAG.
- [ ] Defer: gateway-unit selection, test-out exams, gate enforcement.

### Lesson shape

- [ ] Add `match_pairs` type: validator, UI component, generator prompt.
- [ ] Add `order_steps` type: validator, UI component, generator prompt.
- [ ] Add `cloze` type: validator, UI component, generator prompt.
- [ ] Add `true_false` type: validator, UI component, generator prompt.
- [ ] Extend the runtime to 8-12 ramped steps with fast-to-heavy ordering.

### Content generation (ADR 0009)

- [ ] Build the Ollama generation pipeline seeded by the 10 exemplars.
- [ ] Build the source-validation gate; reject unsupported claims before review.
- [ ] Exclude `stub`-tagged pages from generation input.
- [ ] Build the human review queue surface.

### Gamification

- [ ] Hearts: 5 per lesson, zero ends the lesson, refill by clearing review items.
- [ ] Streak freezes: earn at 2x daily goal, cap 2, auto-consume, notify on use.
- [ ] Ghost leagues: weekly XP snapshots, ranked board, promotion/demotion zones.

### Versioning (ADR 0010)

- [ ] Add `version` and `stale` to lessons.
- [ ] Record lesson version on sessions and attempts.
- [ ] Mark lessons stale on `body_hash` change during sync.
- [ ] Surface an "updated" affordance and partial-XP replay.
- [ ] Guarantee regeneration never mutates `concept_mastery`.

### Frontend rebuild

- [ ] Add react-router, Tailwind, Framer Motion, TanStack Query.
- [ ] Build six screens: track map, unit path, lesson player, review queue, league, profile.
- [ ] Harvest `App.tsx`, then retire it.
- [ ] Author the abstract geometric companion across the 11 animation states.
- [ ] Spring physics on node taps, XP bars, and completion states.
- [ ] Reduced-motion fallbacks throughout.

### Still undecided

- [ ] Decide final product name.
- [ ] Decide final visual identity and colour palette.

## Done So Far

- [x] Comprehensive AI Engineering second brain exists.
- [x] `plan.md` created.
- [x] PRD created at `docs/prds/ai-engineering-learning-platform.md`.
- [x] GitHub issue created: `https://github.com/imtiazNDMA/aie_second_brain/issues/1`.
- [x] Local-first scope clarified.
- [x] UI direction clarified.
- [x] Lottie animation requirement clarified.
- [x] Architecture document created.
- [x] TODO checklist created.
