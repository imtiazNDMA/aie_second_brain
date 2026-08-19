# AI Engineering Learning Platform Architecture

> **Revised 2026-08-19.** Persistence moved from SQLite to MongoDB via Mongoose
> (ADR 0006). The curriculum moved from a single path to five gated tracks
> (ADR 0008). Lessons are versioned and mastery is concept-scoped (ADR 0010).
> Diagrams and sections below that still say SQLite, Drizzle, Prisma, or Postgres
> predate that change; `docs/adr/` is authoritative where they disagree.

## Scope

This architecture describes the local-first AI Engineering learning platform defined in `plan.md` and `docs/prds/ai-engineering-learning-platform.md`.

The first version is a localhost web app. It reads the existing Obsidian-style wiki, turns selected wiki pages into structured lessons and review items, tracks a single local learner, and presents a polished gamified learning experience with original branding and AI Engineering-themed Lottie animations.

## Architecture Goals

- Run locally with one command.
- Use the existing `wiki/` vault as the canonical knowledge source.
- Avoid production auth, cloud sync, billing, and multi-user complexity in the MVP.
- Keep backend domain logic testable outside the UI.
- Keep frontend UI state separate from learning-domain state.
- Store progress locally and durably.
- Support eventual migration to a hosted version without rewriting the core learning model.
- Provide a consumer-grade, animated, path-based learning UI without copying Duolingo's protected brand, mascot, copy, artwork, or exact screens.

## High-Level System

```text
+-----------------------------------------------------------------+
|                         Browser UI                              |
|  Path Map | Lesson Player | Review Queue | Projects | Settings  |
+-------------------------------+---------------------------------+
                                | HTTP / local API
+-------------------------------v---------------------------------+
|                       Local Backend API                          |
|  Content Sync | Lesson Runtime | Review | Mastery | XP/Streaks  |
+---------------+-------------------------------+-----------------+
                |                               |
+---------------v--------------+   +------------v----------------+
|       Local MongoDB          |   |       Wiki Filesystem        |
| progress, lessons, attempts   |   | wiki/, index, frontmatter    |
+-------------------------------+   +-----------------------------+
```

## Recommended MVP Stack

### Frontend

- Vite + React + TypeScript
- Tailwind CSS
- `lottie-react` or `@lottiefiles/react-lottie-player`
- Zustand or React context for UI-only state
- React Router if routing is needed beyond a single page shell

### Backend

- Node.js + Fastify or Express
- TypeScript
- MongoDB through Mongoose (ADR 0006)
- `gray-matter` for markdown frontmatter
- `remark` / `unified` for markdown parsing where needed
- `chokidar` for optional file watching

### Database

- MongoDB for localhost MVP and beyond
- Same MongoDB schema if the app becomes hosted or multi-user

### Runtime

- Local URL: `http://localhost:5173` for Vite
- Backend URL: `http://localhost:8787` or proxied behind Vite
- One command should eventually start frontend and backend together

## Backend Architecture

### Backend Responsibilities

The backend owns durable learning state and all domain decisions:

- Parse and sync wiki content.
- Normalize wiki pages into content records.
- Build concept graph and prerequisite/unlock relationships.
- Store lesson drafts and published lessons.
- Serve lesson sessions.
- Validate answers.
- Record attempts.
- Update XP, streaks, review queues, and mastery.
- Track project checkpoint progress.
- Provide local Lottie asset metadata.

The backend should not own visual presentation. It returns state and domain events; the frontend decides how to render them.

### Backend Modules

#### 1. Content Ingestion Module

Purpose: turn markdown files into normalized content records.

Inputs:

- `wiki/**/*.md`
- frontmatter
- wikilinks
- headings
- page body

Outputs:

- pages
- concepts
- source references
- outbound links
- source snippets for lesson generation

Interface:

```text
syncWiki(vaultPath) -> SyncResult
getPage(pageId) -> PageRecord
listPages(filters) -> PageRecord[]
```

Notes:

- Skip catalog/log files unless explicitly configured.
- Preserve source page references.
- Do not mutate wiki files during sync.
- Missing wikilinks should be reported, not fatal.

#### 2. Concept Graph Module

Purpose: represent wiki concepts as a learnable graph.

Responsibilities:

- Resolve page-to-page links.
- Infer concept clusters.
- Store prerequisites and unlocks.
- Support path generation.
- Support weak-skill neighborhood lookup.

Interface:

```text
getConceptGraph() -> ConceptGraph
getPrerequisites(conceptId) -> Concept[]
getUnlocks(conceptId) -> Concept[]
getRelatedConcepts(conceptId) -> Concept[]
```

Initial prerequisite inference can be simple and curated. Automatic inference can come later.

#### 3. Lesson Generation Module

Purpose: transform wiki pages into editable lesson drafts.

Responsibilities:

- Create learning objectives.
- Create explanation cards.
- Create question steps.
- Create review cards.
- Attach source citations.
- Keep generated content editable before publishing.

Interface:

```text
generateLessonDraft(sourcePageIds, options) -> LessonDraft
publishLesson(draftId) -> Lesson
validateLesson(lessonId) -> ValidationReport
```

MVP can seed a small hand-authored lesson set for RAG Foundations and leave automated generation as a local admin action.

#### 4. Lesson Runtime Module

Purpose: run a lesson session and emit learning events.

Responsibilities:

- Start lesson session.
- Return current step.
- Accept answer submissions.
- Return correctness and explanation.
- Complete lesson.
- Emit attempt, mastery, review, XP, and streak events.

Interface:

```text
startLesson(lessonId, learnerId) -> LessonSession
submitStepAnswer(sessionId, stepId, answer) -> StepResult
completeLesson(sessionId) -> LessonCompletion
```

The lesson runtime should not directly update all downstream systems. It should emit typed events that downstream modules consume.

#### 5. Question Engine

Purpose: validate answer types consistently.

Supported MVP step types:

- explanation
- multiple choice
- multi-select
- recall
- scenario judgment
- mini design drill

Interface:

```text
validateAnswer(step, answer) -> AnswerResult
```

Answer validation should be deterministic for MVP. LLM-judged freeform answers can come later and must cite rubrics.

#### 6. Review Scheduler

Purpose: spaced repetition and weak-skill repair.

Responsibilities:

- Schedule review cards.
- Reschedule based on correctness.
- Apply forgetting/decay rules.
- Prioritize weak concepts.
- Generate repair queues.

Interface:

```text
getDueReviews(learnerId, now) -> ReviewItem[]
recordReviewAttempt(reviewItemId, result) -> ReviewScheduleUpdate
getRepairQueue(learnerId) -> RepairItem[]
```

MVP scheduling can use simple intervals. Later versions can use FSRS or SM-2.

#### 7. Mastery Module

Purpose: track concept mastery from learning events.

Mastery levels:

- 0: unseen
- 1: introduced
- 2: recognized
- 3: recalled
- 4: applied
- 5: project-proven

Interface:

```text
applyMasteryEvent(event) -> MasteryUpdate
getConceptMastery(learnerId, conceptId) -> MasteryState
listWeakConcepts(learnerId) -> ConceptMastery[]
```

Project checkpoints are required for level 5.

#### 8. Gamification Module

Purpose: XP, streaks, achievements, daily goals, and completion feedback.

Responsibilities:

- Award XP.
- Track daily goal.
- Track streak.
- Track lesson perfect score.
- Track project checkpoint rewards.
- Emit celebration states.

Interface:

```text
applyXpEvent(event) -> XpUpdate
getDailyProgress(learnerId, date) -> DailyProgress
getStreak(learnerId) -> StreakState
```

The backend returns the event state; frontend controls the animation and visual celebration.

#### 9. Project Checkpoint Module

Purpose: integrate real build work into the learning path.

Responsibilities:

- Define project checkpoints.
- Track completion state.
- Store evidence notes or links.
- Apply project-proven mastery.
- Award project XP.

Initial project:

- Build and evaluate a toy RAG system.

Interface:

```text
getProject(projectId) -> Project
completeCheckpoint(projectId, checkpointId, evidence) -> ProjectProgress
```

#### 10. Lottie Asset Module

Purpose: map app states to local animation assets.

Responsibilities:

- Register animation metadata.
- Return animation by state and theme.
- Provide reduced-motion fallback.
- Keep Lottie concerns out of learning logic.

Interface:

```text
getAnimation(state, options) -> AnimationAsset
listAnimations() -> AnimationAsset[]
```

Assets live under `public/lottie/`.

## API Design

### Health

```text
GET /api/health
```

Returns backend status and database connectivity.

### Wiki Sync

```text
POST /api/wiki/sync
GET /api/wiki/pages
GET /api/wiki/pages/:id
GET /api/wiki/graph
```

### Learning Path

```text
GET /api/paths
GET /api/paths/:id
GET /api/paths/:id/progress
```

### Lessons

```text
GET /api/lessons/:id
POST /api/lessons/:id/start
POST /api/lesson-sessions/:sessionId/steps/:stepId/answer
POST /api/lesson-sessions/:sessionId/complete
```

### Reviews

```text
GET /api/reviews/due
POST /api/reviews/:id/attempt
GET /api/repairs
```

### Progress

```text
GET /api/progress/summary
GET /api/progress/mastery
GET /api/progress/streak
GET /api/progress/xp
```

### Projects

```text
GET /api/projects
GET /api/projects/:id
POST /api/projects/:id/checkpoints/:checkpointId/complete
```

### Lottie Assets

```text
GET /api/animations
GET /api/animations/:state
```

## Frontend Architecture

### Frontend Responsibilities

- Render the learning experience.
- Keep the app playful, polished, and responsive.
- Use original visual identity and AI Engineering-themed Lottie animations.
- Consume backend state through typed API clients.
- Keep transient UI state local.
- Avoid embedding learning-domain rules in components.

### Screens

#### 1. Home / Active Path

Purpose: first screen and daily command center.

Contains:

- active path
- next lesson button
- daily XP goal
- streak
- due review count
- weak concepts
- current project checkpoint
- Lottie state for welcome, progress, or review debt

#### 2. Learning Path Map

Purpose: path-based progression.

Contains:

- unit sections
- large lesson nodes
- locked/unlocked/completed states
- mastery gates
- project nodes
- original AI-themed environment art

#### 3. Lesson Player

Purpose: run a 3-7 minute lesson.

Contains:

- step progress
- explanation card
- question step
- answer feedback
- source page link
- completion modal
- Lottie feedback for correct, incorrect, and complete states

#### 4. Review Queue

Purpose: spaced repetition.

Contains:

- due cards
- weak concepts
- repair prompts
- empty-state Lottie

#### 5. Project Checkpoint

Purpose: hands-on mastery.

Contains:

- project overview
- checkpoint tasks
- evidence input
- completion rubric
- project XP
- mastery changes

#### 6. Wiki Sync / Admin

Purpose: local content management.

Contains:

- sync wiki button
- sync report
- generated lesson drafts
- validation warnings
- missing wikilinks

#### 7. Settings

Purpose: local app preferences.

Contains:

- vault path
- reduced motion toggle
- animation preference
- daily goal
- reset local progress

### Frontend Modules

#### UI Shell

Owns:

- app layout
- navigation
- responsive frame
- mobile-first constraints

#### Path Components

Own:

- unit map
- lesson node
- locked/unlocked/completed states
- project nodes

#### Lesson Components

Own:

- lesson step rendering
- question controls
- answer feedback
- source citation UI

#### Review Components

Own:

- review card UI
- repair queue UI
- due item list

#### Progress Components

Own:

- XP meter
- streak meter
- mastery badges
- daily goal progress

#### Lottie Components

Own:

- animation loading
- reduced-motion fallback
- state-to-animation rendering
- lazy loading

### UI Design Rules

- Mobile-first layout.
- One obvious next action per screen.
- Bright, original visual identity.
- Rounded, friendly surfaces without copying a specific proprietary style.
- Use icons and Lottie for feedback, not long explanatory UI text.
- Avoid dense wiki pages inside lesson screens.
- Use cards for lessons and repeated items only.
- Keep project screens slightly more serious but still inside the same progression system.
- Do not copy Duolingo's mascot, assets, exact colors, exact node designs, copy, or proprietary screen structure.

## Database Architecture

MongoDB is the database (ADR 0006). Keep schema changes explicit and versioned so the model can evolve predictably.

### Tables

#### learner_profiles

One local learner for MVP.

Fields:

- id
- display_name
- daily_goal_xp
- reduced_motion
- created_at
- updated_at

#### wiki_pages

Normalized wiki page records.

Fields:

- id
- slug
- title
- page_type
- file_path
- tags_json
- sources_json
- frontmatter_json
- body_hash
- excerpt
- created_at
- updated_at
- synced_at

#### wiki_links

Resolved and unresolved wikilinks.

Fields:

- id
- from_page_id
- target_title
- to_page_id
- link_text
- is_resolved

#### concepts

Learnable concept records.

Fields:

- id
- page_id
- slug
- title
- concept_type
- description
- tags_json

#### concept_edges

Graph relationships.

Fields:

- id
- from_concept_id
- to_concept_id
- edge_type
- confidence
- source

Edge types:

- prerequisite
- unlocks
- related
- source_link
- project_dependency

#### learning_paths

Path definitions.

Fields:

- id
- slug
- title
- description
- status
- sort_order

#### path_units

Units inside a path.

Fields:

- id
- path_id
- slug
- title
- description
- sort_order

#### lessons

Published lessons.

Fields:

- id
- unit_id
- slug
- title
- description
- estimated_minutes
- xp_reward
- status
- source_page_ids_json
- prerequisite_concept_ids_json
- unlock_concept_ids_json
- sort_order

#### lesson_steps

Steps inside a lesson.

Fields:

- id
- lesson_id
- step_type
- prompt
- body
- choices_json
- correct_answer_json
- explanation
- source_refs_json
- sort_order

Step types:

- explain
- multiple_choice
- multi_select
- recall
- scenario
- drill
- summary

#### lesson_sessions

In-progress or completed lesson attempts.

Fields:

- id
- learner_id
- lesson_id
- status
- started_at
- completed_at
- score
- xp_awarded

#### lesson_attempts

Step-level answers.

Fields:

- id
- session_id
- lesson_step_id
- answer_json
- is_correct
- feedback
- answered_at

#### review_items

Spaced repetition items.

Fields:

- id
- learner_id
- concept_id
- source_lesson_step_id
- prompt
- answer
- card_type
- due_at
- interval_days
- ease
- lapses
- status

#### review_attempts

Review history.

Fields:

- id
- review_item_id
- learner_id
- result
- answered_at
- next_due_at

#### concept_mastery

Learner mastery per concept.

Fields:

- id
- learner_id
- concept_id
- mastery_level
- confidence
- last_practiced_at
- last_mastery_event
- updated_at

#### xp_events

XP event ledger.

Fields:

- id
- learner_id
- event_type
- amount
- source_type
- source_id
- created_at

#### streak_days

Daily streak tracking.

Fields:

- id
- learner_id
- date
- xp_earned
- goal_met

#### projects

Project definitions.

Fields:

- id
- slug
- title
- description
- status
- source_page_ids_json

#### project_checkpoints

Project tasks.

Fields:

- id
- project_id
- title
- description
- rubric_json
- xp_reward
- sort_order

#### project_progress

Learner project progress.

Fields:

- id
- learner_id
- project_id
- checkpoint_id
- status
- evidence
- completed_at

#### animation_assets

Local Lottie registry.

Fields:

- id
- state
- theme
- file_path
- reduced_motion_fallback
- description

## Data Flow

### Wiki Sync Flow

1. User clicks sync.
2. Backend scans `wiki/`.
3. Backend parses frontmatter, body, headings, and wikilinks.
4. Backend computes body hash.
5. Backend upserts `wiki_pages`.
6. Backend upserts `wiki_links`.
7. Backend updates `concepts` and concept graph.
8. Backend returns sync report.

### Lesson Flow

1. Frontend requests lesson.
2. Backend returns lesson steps and source refs.
3. Learner answers step.
4. Backend validates answer.
5. Backend records attempt.
6. Backend returns feedback.
7. Lesson completion emits XP, review, and mastery events.
8. Frontend renders completion animation and progress update.

### Review Flow

1. Frontend requests due reviews.
2. Backend returns due cards ordered by priority.
3. Learner answers.
4. Backend records result.
5. Backend reschedules card.
6. Backend updates mastery and repair queue.

### Project Flow

1. Learner opens project checkpoint.
2. Learner completes task and records evidence.
3. Backend stores checkpoint progress.
4. Backend awards XP.
5. Backend applies mastery level 5 for mapped concepts.

## Local Content Generation

MVP can start with manually authored lessons. Automated generation should be introduced as a local admin workflow.

Generation pipeline:

1. Select source pages.
2. Extract summary and key sections.
3. Generate objectives.
4. Generate lesson steps.
5. Generate review cards.
6. Validate source references.
7. Save as draft.
8. User reviews and publishes.

Generated content must be editable before publishing.

## Lottie Architecture

### Asset Storage

Store local animation JSON files under:

```text
public/lottie/
```

Suggested subfolders:

```text
public/lottie/chatbot/
public/lottie/rag/
public/lottie/agents/
public/lottie/eval/
public/lottie/deployment/
public/lottie/rewards/
```

### Animation States

Recommended states:

- onboarding
- unit_intro
- lesson_start
- correct_answer
- incorrect_answer
- lesson_complete
- streak
- review_empty
- repair_needed
- project_unlocked
- project_complete
- wiki_sync_loading
- lesson_generation_loading

### Accessibility

- Respect reduced motion.
- Lazy-load animations.
- Avoid aggressive loops during questions.
- Provide static fallback artwork or icon.

## Security and Privacy

MVP is local-only, but still needs basic guardrails:

- Do not expose the backend on public network interfaces by default.
- Do not send wiki content to an LLM provider unless the user explicitly triggers generation and configures an API key.
- Store API keys in environment variables, not database rows.
- Avoid loading remote Lottie assets at runtime; keep assets local.
- Add clear warnings before deleting local progress.

## Testing Strategy

### Backend Tests

- Wiki parser fixtures.
- Concept graph construction.
- Lesson answer validation.
- Review scheduling.
- Mastery updates.
- XP and streak events.
- Project checkpoint completion.
- Local persistence round trip.

### Frontend Tests

- Home screen renders daily progress.
- Path map renders locked/unlocked/completed nodes.
- Lesson player advances through steps.
- Correct and incorrect answers show appropriate feedback.
- Review queue shows due items.
- Completion modal appears after lesson completion.
- Reduced-motion mode avoids animation playback.

### Integration Tests

- Sync a small fixture wiki.
- Publish a lesson.
- Complete a lesson.
- Confirm XP, mastery, and review items update.
- Complete a project checkpoint and confirm project-proven mastery.

## Build Phases

### Phase 0: Documentation and Planning

- `plan.md`
- PRD
- architecture
- todos

### Phase 1: Local App Scaffold

- Create frontend app.
- Create backend app.
- Add local MongoDB.
- Add one-command dev script.
- Add basic health endpoint.

### Phase 2: Wiki Sync

- Parse wiki pages.
- Store pages and links.
- Show sync report.

### Phase 3: RAG Foundations MVP

- Create learning path shell.
- Add 10 lessons.
- Add lesson player.
- Add XP and mastery.
- Add review queue.

### Phase 4: Immersive UI

- Add original design system.
- Add Lottie asset registry.
- Add onboarding, unit intro, answer feedback, and completion animations.

### Phase 5: Projects

- Add toy RAG evaluation project.
- Add checkpoint progress.
- Add project-proven mastery.

### Phase 6: Adaptive Learning

- Add weak-skill repair.
- Add mastery decay.
- Add next-lesson recommendation.

## Open Decisions

- Final product name.
- Original mascot or no mascot.
- Exact local backend framework: Fastify vs Express.
- ~~Exact SQLite ORM~~ resolved: Mongoose on MongoDB (ADR 0006).
- Whether to keep `plan.md`, PRD, architecture, and todos at repo root or move all planning artifacts under `docs/`.
- Whether lesson generation should use a local model first or API provider first.

## Non-Goals for MVP

- Hosted deployment.
- Multi-user auth.
- Cloud sync.
- Payment.
- Public leaderboards.
- Mobile app packaging.
- Full AI tutor.
- Exact Duolingo clone.
