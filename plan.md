# AI Engineering Learning Platform Plan

> **Revised 2026-08-19.** Several decisions in this document were superseded on
> that date. Authoritative sources are ADR 0006 (MongoDB), 0007 (visual identity),
> 0008 (gated track tree), 0009 (content generation), and 0010 (lesson versioning).
> The sections below have been updated to match; where this file and an ADR
> disagree, the ADR wins.

## Goal

Turn this second brain into a Duolingo-style learning platform for AI Engineering: short lessons, progressive skill paths, spaced review, streaks, XP, practice drills, projects, and mastery gates.

This should copy the learning mechanics and the broad interaction style, not Duolingo's brand, mascot, copy, protected artwork, characters, exact color palette, iconography, or proprietary screens. The product identity should be original.

## UI Direction

The UI should feel as attractive and habit-forming as a modern consumer learning app:

- mobile-first
- bright and approachable
- path-based progression
- large lesson nodes
- immediate visual feedback
- celebratory completion states
- short animated transitions
- friendly empty states
- clear daily goal and streak surfaces
- compact practice cards
- polished sound/haptic-ready interaction states
- immersive Lottie animations related to AI Engineering

The product should not look like a dry LMS, documentation site, or admin dashboard. It should feel like a game-like learning app for serious AI Engineering practice.

### Lottie Animation Requirement

The UI must use Lottie animations to make the local app feel immersive and alive. Animations should reinforce AI Engineering concepts and learning states, not act as random decoration.

Use original, properly licensed, or custom-created Lottie files. Do not copy proprietary Duolingo animation assets or characters.

Recommended animation themes:

- chatbot typing and responding
- neural network activation
- embeddings clustering
- vector search / retrieval
- document chunks flowing into context
- RAG pipeline assembly
- agent using tools
- multi-agent collaboration
- eval checklist passing or failing
- deployment pipeline / containers
- streak celebration
- lesson completion
- weak-skill repair
- project checkpoint unlock

Where to use Lottie:

- onboarding welcome panel
- unit intro screens
- lesson start cards
- correct answer feedback
- lesson completion modal
- streak screen
- review queue empty state
- project checkpoint screens
- loading states for lesson generation or wiki sync

Implementation notes:

- Use `lottie-react` or `@lottiefiles/react-lottie-player`.
- Store animation JSON files locally under `public/lottie/`.
- Keep file sizes small; lazy-load animations per screen.
- Provide reduced-motion fallback for accessibility.
- Avoid continuous high-motion loops in lesson questions.
- Prefer short 1-3 second loops for feedback states.
- Use Lottie alongside clean UI, not as a replacement for clear learning content.

### Original Visual Identity

Create a unique brand system:

- Original product name, not Duolingo-adjacent.
- Original mascot or no mascot.
- Original illustration style.
- Original color palette.
- Original icons and achievement badges.
- Original lesson node shapes and map decorations.
- Original copywriting voice.

The safest target is "consumer-grade gamified learning" rather than "Duolingo clone."

### Visual Style Proposal

Use an original science-and-builder identity:

- Primary color: electric teal or signal green, not Duolingo green.
- Secondary colors: graphite, sky, amber, coral, and violet accents.
- Background: soft off-white or very light cool gray.
- Shapes: rounded but not identical to Duolingo's exact buttons or node style.
- Mascot option: an original small robot, spark, circuit sprite, or abstract companion.
- Lesson map: vertical or branching path with AI-themed environments such as data garden, model lab, retrieval mine, agent workshop, and deployment tower.

### Screen Principles

- First screen should show the active learning path, not a marketing page.
- Every screen should have one obvious next action.
- Avoid dense wiki text in lessons; turn pages into short cards and interactive checks.
- Show progress constantly: XP, streak, current unit, mastery, and review debt.
- Make wrong answers useful: explain, tag the weak concept, and schedule repair.
- Keep serious project work visually distinct from quick drills, but still part of the same path.

## Product Thesis

The wiki already contains the knowledge graph. The platform should convert that graph into a daily learning loop:

1. Learn one small concept.
2. Practice it immediately.
3. Recall it later through spaced repetition.
4. Apply it in a project.
5. Unlock the next skill only after demonstrated mastery.

The target user is an aspiring or working AI engineer who wants practical capability across LLMs, RAG, agents, evaluation, deployment, fine-tuning, and systems reliability.

## Core Experience

### Home Screen

- Daily goal progress
- Current streak
- XP earned today
- Active path: AI Engineering
- Next lesson button
- Review queue
- Current project milestone
- Weak skills needing repair

### Learning Path

Use a vertical progression map similar to a skill tree:

1. Foundations
2. Transformers and LLMs
3. Prompting and Reasoning
4. RAG
5. Evaluation
6. Agents
7. Fine-Tuning
8. Inference and Serving
9. LLMOps and Reliability
10. Capstone Projects

Each unit contains nodes. Each node maps to one or more wiki pages.

### Lesson Loop

Each lesson should take 3-7 minutes:

1. Micro-explanation from a wiki page
2. Recognition question
3. Recall question
4. Scenario judgment
5. Tiny implementation or design drill
6. Summary card
7. XP and mastery update

### Review Loop

Use spaced repetition for:

- Definitions
- Tradeoffs
- Architecture choices
- Failure modes
- Equations
- Tool selection
- Debugging patterns

Review items should be generated from wiki pages and tagged by concept.

## Content Model

### Wiki Page to Lesson Unit

A lesson is `explain` -> 8-12 ramped question steps -> `summary`. Steps ramp
fast-to-heavy: quick recognition items open the lesson, one or two scenario or
drill items close it. This keeps the 3-7 minute target while giving the lesson a
rapid-fire cadence rather than a quiz-at-the-end-of-a-chapter feel.

Nine question types:

| Type              | Weight | Purpose                                  |
| ----------------- | ------ | ---------------------------------------- |
| `match_pairs`     | light  | term to definition                       |
| `order_steps`     | light  | sequence a pipeline correctly            |
| `cloze`           | light  | fill the gap in a definition             |
| `true_false`      | light  | fast claim checking                      |
| `multiple_choice` | medium | recognition                              |
| `multi_select`    | medium | recognition with partial credit          |
| `recall`          | medium | free recall, no answer choices           |
| `scenario`        | heavy  | practical engineering tradeoff judgment  |
| `drill`           | heavy  | small implementation or design exercise  |

The four light types are new; each needs a runtime validator, a UI component, and
a generator prompt.

Each page can also produce:

- `summary`: 1-2 paragraph explanation
- `learning_objectives`: 2-5 measurable goals
- `prerequisites`: required prior concepts
- `unlocks`: next concepts

### Example

Page: `Retrieval-Augmented Generation`

Lesson cards:

- Define RAG.
- Identify when RAG is better than fine-tuning.
- Choose chunking strategy for a given corpus.
- Diagnose low context relevance.
- Explain retriever, generator, and evaluator roles.

Scenario:

> A support bot answers with correct tone but stale policy details. Should you use prompt engineering, fine-tuning, or RAG?

Expected answer:

Use RAG if the issue is changing external knowledge. Fine-tuning may help style or behavior but is a poor fit for frequently updated facts.

## Learning Mechanics

### XP

- Lesson complete: 10 XP
- Perfect lesson: +5 XP
- Review complete: 5 XP
- Project checkpoint: 25-100 XP
- Repair weak skill: 10 XP

### Streaks

- Daily learning goal: 10-30 XP.
- Streak freezes are **earned, not bought**: hit 2x the daily goal to bank one.
- Hold at most 2 freezes. A freeze is consumed automatically on a missed day, and
  the next session states plainly that it was used.
- No gem or currency system. Over-study is the only way to earn protection.
- Weekly review still matters more than raw streak length.

### Mastery

Each concept has mastery from 0 to 5:

- 0: unseen
- 1: introduced
- 2: recognized
- 3: recalled
- 4: applied
- 5: project-proven

Mastery decays over time unless reinforced.

### Hearts / Attempts

Hearts carry real stakes, but failure routes into review rather than into a paywall
or a timer:

- 5 hearts per lesson; a wrong answer costs one.
- Reaching zero ends the lesson, which must be retried.
- **Hearts refill by clearing due review items** — not by waiting and not by paying.
- Wrong answers still create review cards.
- Repeated errors still trigger a repair lesson.

This deliberately replaces the earlier "mistakes reduce score, not access" rule.
The point is to make failure feed spaced repetition, which is where a
mastery-focused system wants the learner anyway.

### Leagues

Ghost leagues. The leaderboard is populated by the learner's own previous weeks,
not by other people and not by synthetic rivals.

- Full league presentation: ranked rows, promotion zone, demotion cutoff, weekly
  reset, tier badges.
- Each row is a prior week's XP total.
- Requires no multi-user infrastructure and fabricates nothing.
- Personal weekly goals and capability badges remain alongside it.

## Curriculum Structure

Five discipline tracks in a gated DAG with Machine Learning as the sole root
(ADR 0008). The earlier single path of eight sequential units is superseded; its
content is redistributed across the tracks below.

```
                Machine Learning
                       |
          +------------+------------+
          |                         |
   LLM Engineering                MLOps
          |                         |
   Agent Engineering              AIOps
```

Track depth measured from wiki frontmatter tags:

| Track             | Approx. pages | Role                          |
| ----------------- | ------------- | ----------------------------- |
| LLM Engineering   | ~175          | Richest; ships first          |
| Machine Learning  | ~138          | Root of the graph             |
| Agent Engineering | ~50           | Leaf under LLM Engineering    |
| MLOps             | ~43           | Leaf-ward under ML            |
| AIOps             | ~12           | Thinnest; ships last          |

### Track: Machine Learning (root)

Foundations the other tracks assume: learning paradigms, model families, neural
networks, transformers and attention, embeddings, training dynamics, evaluation
basics, and the PyTorch material in the vault.

### Track: LLM Engineering

Prompting and reasoning, RAG systems, retrieval quality, reranking, evaluation of
LLM systems, fine-tuning and alignment, inference and serving. The existing
`rag-foundations` content (3 units, 10 hand-authored lessons) becomes this
track's opening units.

### Track: Agent Engineering

Agent architectures, tool use, planning and reflection, multi-agent systems,
orchestration, agent failure taxonomy, and agent operations.

### Track: MLOps

Model registry, deployment, pipelines, train-serving skew, drift, monitoring,
observability, and LLMOps practice.

### Track: AIOps

Event correlation, root cause analysis, incident response, and reliability
engineering for AI systems. Thinnest track on current material — needs wiki growth
before it is credible as a full track.

### Capstones

Capstones are no longer a separate unit. Project checkpoints live inside each
track and are required for level 5 (project-proven) mastery.

### Gating

A gate opens by completing named gateway units in the prerequisite track, or by
passing a test-out exam drawn from that track's review items. **Gates are deferred
out of v1** — see Platform Features below.

## Platform Features

### Localhost Scope

For the first version, this is a local web app running on the user's machine.

Implications:

- No hosted deployment required.
- No production auth required.
- The app can read this vault's `wiki/` directory directly.
- Persistence can start with SQLite or local JSON files.
- Lesson generation can be run as a local admin action.
- The user should start it with one command and open it in the browser.
- The UI should still feel polished and app-like, even though the runtime is local.

Recommended local-first stack:

- Next.js or Vite/React for the frontend.
- SQLite for progress, lessons, cards, and attempts.
- Local markdown parser for the wiki.
- Optional local API route/server process for lesson generation.
- Environment variables for any LLM API keys.

Local URL target:

- `http://localhost:3000` for Next.js
- or `http://localhost:5173` for Vite

### MVP

Vertical slice, not horizontal. Ship **LLM Engineering only**, with gates deferred
and the other four tracks rendered on the track map as locked.

- Wiki sync for the pages that track needs
- Concept graph
- Lesson generation pipeline (Ollama + source validation + review queue)
- Lesson runtime with the ramped 8-12 step schema
- Nine question types, including the four lightweight ones
- Review scheduler
- Hearts with review-refill
- XP, daily goal, earned streak freezes
- Ghost leagues
- Mastery model with concept-scoped state
- Track map and unit path screens

Deferred out of MVP: gate enforcement, gateway units, test-out exams, and the
other four tracks' content.

### V1

- Project checkpoints
- Code exercises
- LLM-generated explanations with source citations
- Adaptive weak-skill repair
- User notes
- Admin content editor

### V2

- Cohorts
- Public portfolio evidence
- AI tutor chat grounded in the wiki
- Skill diagnostics
- Personalized roadmaps
- Mobile app

## Technical Architecture

### Data Layer

MongoDB via Mongoose (ADR 0006). Collections cover:

- `wiki_pages`, `wiki_links`
- `concepts`, `concept_edges`
- `learning_paths`, `path_units`, `lessons`, `lesson_steps`
- `lesson_sessions`, `lesson_attempts`
- `review_items`, `review_attempts`
- `concept_mastery`
- `xp_events`, `streak_days`
- `projects`, `project_checkpoints`, `project_progress`
- `animation_assets`

Lessons carry `version` and `stale`; sessions and attempts record the lesson
version they ran against. `concept_mastery` is scoped to concepts and is never
reset by lesson regeneration (ADR 0010).

The earlier Postgres recommendation is superseded.

### Content Pipeline

1. Parse markdown and frontmatter.
2. Extract wikilinks and prerequisites.
3. Generate lesson drafts from pages.
4. Validate questions against source text.
5. Store lessons as editable JSON.
6. Publish approved lessons.

### App Stack

Actual stack:

- **Frontend**: Vite + React 19 + TypeScript, react-router, Tailwind CSS,
  Framer Motion for interaction physics, TanStack Query for server state,
  lottie-react for set-piece animation
- **Backend**: Node + Express + TypeScript (ESM)
- **Database**: MongoDB via Mongoose
- **Content generation**: local Ollama, no cloud provider
- **Wiki input**: local markdown/frontmatter parser with a manual "sync wiki" button

Deferred until hosting is a real target: auth, background workers, multi-user.

## Lesson Schema

```json
{
  "id": "rag-basics-001",
  "title": "What RAG Solves",
  "source_pages": ["Retrieval-Augmented Generation"],
  "objectives": [
    "Define RAG",
    "Explain when RAG beats fine-tuning",
    "Identify retriever and generator roles"
  ],
  "steps": [
    {"type": "explain", "body": "..."},
    {"type": "multiple_choice", "question": "...", "choices": []},
    {"type": "scenario", "prompt": "..."},
    {"type": "recall", "prompt": "..."}
  ],
  "xp": 10,
  "prerequisites": ["Embeddings"],
  "unlocks": ["Advanced RAG"]
}
```

## Duolingo-Style Mapping

| Duolingo Mechanic | AI Engineering Platform Equivalent |
|---|---|
| Language path | AI Engineering path |
| Skill node | Concept cluster |
| Lesson | Micro-lesson from wiki page |
| Hearts | Mistake budget / repair queue |
| XP | Learning effort and project progress |
| Streak | Daily engineering habit |
| Legendary level | Project-proven mastery |
| Practice hub | Spaced review queue |
| Stories | Real-world architecture scenarios |
| Unit test | Mastery gate |
| League | Optional cohort/project leaderboard |

## Important Product Difference

AI Engineering is not a language-learning domain. The platform must add project-based proof, because recognition questions alone can produce false confidence.

Every major unit should end with:

- build task
- evaluation task
- debugging task
- written design explanation
- portfolio artifact

## Implementation Roadmap

### Phase 1: Content Extraction

- Build markdown parser for `wiki/`
- Extract titles, types, tags, links, and summaries
- Build prerequisite graph
- Create first 50 lesson drafts manually or semi-automatically

### Phase 2: MVP Web App

- Build single local learner profile
- Build path screen
- Build lesson player
- Build question engine
- Build XP/streak/mastery tracking
- Build review queue

### Phase 3: Adaptive Learning

- Track missed concepts
- Generate repair lessons
- Add spaced repetition decay
- Add mastery gates
- Add personalized next lesson selection

### Phase 4: Projects

- Convert existing read-implement trackers into capstone modules
- Add checklists, rubric scoring, and evidence uploads
- Add project XP and mastery level 5

### Phase 5: AI Tutor

- Ground tutor answers in wiki pages
- Restrict answers to indexed knowledge unless web lookup is explicitly enabled
- Let tutor recommend lessons and reviews based on weak concepts

## First Build Slice

Build only this first:

1. Parse 20 core pages.
2. Create one path: RAG Foundations.
3. Create 10 lessons.
4. Add XP, streak, and mastery.
5. Add review queue.
6. Add one mini-project: build and evaluate a toy RAG system.

This proves the learning loop before scaling to the whole wiki.

## Success Metrics

- User completes 5 lessons in first session.
- User returns next day.
- User can answer recall questions after 7 days.
- User completes one project checkpoint within 2 weeks.
- Weak-skill repair improves future accuracy.
- Lessons cite source wiki pages correctly.

## Risks

- Too much content becomes overwhelming.
- LLM-generated questions may be shallow or wrong.
- Gamification may reward activity instead of competence.
- Copying Duolingo too literally creates legal and product-design risk.
- AI Engineering requires hands-on work; quizzes alone are insufficient.

## Principle

Make the platform addictive for practice, but rigorous for mastery.

The daily loop should feel light. The mastery gates should be serious.
