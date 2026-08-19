# PRD: AI Engineering Learning Platform

> **Amended 2026-08-19 (v2).** The problem statement and user stories below still
> hold. Several implementation decisions do not. Superseded by ADRs 0006-0010:
>
> | Original decision | Now |
> | --- | --- |
> | Prefer SQLite for local persistence | MongoDB via Mongoose (ADR 0006) |
> | Do not copy Duolingo's lesson node design or screens | Mechanics and layout conventions replicated deliberately; all assets original (ADR 0007) |
> | RAG Foundations as the first build slice | LLM Engineering track, with RAG as its opening units (ADR 0008) |
> | Single path of units | Five tracks in a gated diamond DAG (ADR 0008) |
> | Start with 20 core pages and 10 lessons | ~130 generated lessons behind a validation gate (ADR 0009) |
> | Question engine: 5 types | 9 types; lessons run 8-12 ramped steps |
> | Mistakes never block access | Hearts deplete; zero ends the lesson; refill via review |
> | Leagues out of scope | Ghost leagues against the learner's own prior weeks |
>
> Out-of-scope items remain out of scope, with one exception: public leaderboards
> stay excluded, but a single-player league surface is now in.

Labels: ready-for-agent

## Problem Statement

The user has built a comprehensive second brain for AI Engineering, but the current experience is still a knowledge vault: powerful for reference, weak for daily guided learning. The user wants to turn this vault into a local web app that feels like a polished consumer learning platform: short lessons, progression paths, streaks, XP, mastery, review, immersive animations, and project-based proof.

The user specifically wants a Duolingo-style experience because that interaction model is attractive and habit-forming. However, the product must not copy Duolingo's brand, mascot, protected artwork, exact screens, proprietary UI, copy, or identity. The desired result is an original AI Engineering learning platform with similar learning mechanics and a similarly engaging level of polish.

The first version should run on localhost. It should read from the existing wiki, convert wiki pages into structured lessons and practice items, and let a single local learner progress through AI Engineering skills.

## Solution

Build a local-first web app that converts the AI Engineering wiki into a gamified learning path. The app presents a path-based curriculum, short interactive lessons, spaced repetition reviews, XP, streaks, mastery levels, weak-skill repair, and capstone project checkpoints.

The first implementation should be a localhost MVP with no hosted deployment, no production auth, and a single local learner profile. It should feel polished and consumer-grade, with original visual identity and Lottie animations for AI Engineering concepts such as chatbots, neural networks, embeddings, RAG pipelines, agents, evaluations, and deployment.

The platform should treat the wiki as the canonical source of knowledge. Each lesson, question, review card, and scenario should trace back to one or more wiki pages. The app should prioritize the RAG Foundations path first, then scale across prompting, agents, evaluation, fine-tuning, inference, LLMOps, reliability, and capstone projects.

## User Stories

1. As a learner, I want to open a local web app in my browser, so that I can study my AI Engineering second brain without leaving my machine.
2. As a learner, I want the app to read from my existing wiki, so that I do not need to duplicate content manually.
3. As a learner, I want a polished path-based learning map, so that I know what to study next.
4. As a learner, I want the first screen to show my current lesson path, so that the app feels like a learning product rather than a documentation site.
5. As a learner, I want short lessons that take 3-7 minutes, so that I can study daily without a large time commitment.
6. As a learner, I want each lesson to explain one concept clearly, so that I can build understanding incrementally.
7. As a learner, I want each lesson to include immediate practice, so that I can test whether I actually understood the concept.
8. As a learner, I want recognition questions, so that I can build familiarity with new terms.
9. As a learner, I want recall questions, so that I can strengthen memory without always seeing answer choices.
10. As a learner, I want scenario judgment questions, so that I can learn practical engineering tradeoffs.
11. As a learner, I want tiny implementation or design drills, so that learning maps to real AI Engineering work.
12. As a learner, I want lesson completion feedback, so that progress feels satisfying.
13. As a learner, I want XP for completing lessons, so that effort is visible and motivating.
14. As a learner, I want bonus XP for strong performance, so that careful learning is rewarded.
15. As a learner, I want a daily goal, so that I have a clear minimum study target.
16. As a learner, I want a streak counter, so that I build a consistent learning habit.
17. As a learner, I want streak mechanics to be supportive rather than punishing, so that missing a day does not destroy motivation.
18. As a learner, I want concept mastery levels, so that I can distinguish seen concepts from concepts I can apply.
19. As a learner, I want mastery to range from introduced to project-proven, so that the app values real competence.
20. As a learner, I want mastery to decay over time, so that old knowledge returns to review.
21. As a learner, I want wrong answers to create review cards, so that mistakes become useful.
22. As a learner, I want repeated mistakes to trigger repair lessons, so that weak concepts are addressed directly.
23. As a learner, I want a review queue, so that spaced repetition is built into the daily workflow.
24. As a learner, I want review items for definitions, tradeoffs, equations, tools, failure modes, and architecture choices, so that review matches AI Engineering reality.
25. As a learner, I want unit intro screens, so that each learning area feels distinct and purposeful.
26. As a learner, I want a RAG Foundations path first, so that the MVP proves the loop on a valuable AI Engineering topic.
27. As a learner, I want later units for prompting, evaluation, agents, fine-tuning, inference, LLMOps, and reliability, so that the full second brain becomes a curriculum.
28. As a learner, I want capstone project checkpoints, so that I can prove skills through implementation.
29. As a learner, I want the RAG Evaluation System to become a project module, so that I can build portfolio-grade evidence.
30. As a learner, I want project checkpoints to award XP and mastery, so that hands-on work is part of progression.
31. As a learner, I want the app to cite source wiki pages, so that I can trace every lesson back to the knowledge base.
32. As a learner, I want to jump from a lesson to its source page, so that I can go deeper when needed.
33. As a learner, I want an AI tutor grounded in the wiki in a later version, so that I can ask questions without losing source discipline.
34. As a learner, I want the app to recommend the next lesson based on weak skills, so that learning becomes adaptive.
35. As a learner, I want a local single-profile setup, so that I can start without account creation.
36. As a learner, I want my progress stored locally, so that my data stays on my machine.
37. As a learner, I want a manual wiki sync button, so that I can update lessons after editing the wiki.
38. As a learner, I want loading states when syncing the wiki, so that the app feels responsive.
39. As a learner, I want Lottie animations for chatbot, RAG, agent, eval, and deployment states, so that the product feels immersive.
40. As a learner, I want reduced-motion support, so that animations do not harm accessibility.
41. As a learner, I want animations to reinforce learning states, so that motion is meaningful rather than distracting.
42. As a learner, I want original branding and visuals, so that the platform is distinct and not a Duolingo copy.
43. As a learner, I want an original mascot or companion, so that the app feels friendly without using protected characters.
44. As a learner, I want a bright, mobile-first, consumer-grade interface, so that the platform feels attractive and habit-forming.
45. As a learner, I want the product to avoid a dry LMS feel, so that I actually want to return.
46. As a learner, I want serious project gates despite playful UI, so that the app does not reward shallow quiz completion.
47. As a content author, I want wiki pages to generate lesson drafts, so that content creation scales.
48. As a content author, I want generated lessons to be editable, so that I can correct shallow or incorrect outputs.
49. As a content author, I want each generated question validated against source text, so that the app does not teach hallucinated material.
50. As a content author, I want the app to extract page titles, frontmatter, tags, wikilinks, and summaries, so that the curriculum graph uses existing wiki structure.
51. As a content author, I want lesson prerequisites and unlocks, so that the learning path is coherent.
52. As a content author, I want to start with 20 core pages and 10 lessons, so that the MVP stays small enough to finish.
53. As a developer, I want deep modules for wiki parsing, content generation, lesson playback, review scheduling, mastery, and gamification, so that each can be tested independently.
54. As a developer, I want a local persistence layer, so that progress and lesson artifacts survive browser refreshes.
55. As a developer, I want a clear lesson schema, so that frontend and backend can evolve independently.
56. As a developer, I want a question engine that supports multiple question types, so that lessons can mix recognition, recall, scenario, and drill formats.
57. As a developer, I want a review scheduler, so that spaced repetition is handled consistently.
58. As a developer, I want a mastery service, so that lesson attempts and project checkpoints update concept mastery consistently.
59. As a developer, I want a Lottie asset catalog, so that animations are managed deliberately.
60. As a developer, I want all Lottie assets stored locally, so that the localhost app works reliably.
61. As a developer, I want the MVP to avoid hosted auth, cloud deployment, and multi-user complexity, so that the first version ships quickly.
62. As a developer, I want the first implementation to run with one command, so that local use is frictionless.
63. As a developer, I want tests around external behavior rather than implementation details, so that refactors remain safe.
64. As a future user, I want the platform to support hosted deployment later, so that the local MVP can grow into a broader product if desired.

## Implementation Decisions

- Build the first version as a localhost-only web app.
- Use a single local learner profile for the MVP.
- Do not implement production authentication in the MVP.
- Treat the existing wiki as the canonical content source.
- Parse markdown frontmatter, titles, tags, page types, source references, and wikilinks.
- Build a concept graph from wiki pages and wikilinks.
- Generate structured lesson drafts from wiki pages.
- Store lessons, cards, questions, attempts, mastery, reviews, projects, and profile data locally.
- Prefer SQLite for local persistence in the MVP.
- Use a frontend stack suitable for rich local UI, with React and TypeScript as the baseline.
- Use Tailwind-style utility styling or an equivalent design system to move quickly.
- Build an original visual identity inspired by consumer gamified learning, not by Duolingo's protected brand.
- Do not copy Duolingo's mascot, exact color palette, copywriting, lesson node design, artwork, or proprietary screens.
- Use AI Engineering-themed environments for the learning map, such as data garden, model lab, retrieval mine, agent workshop, and deployment tower.
- Make the first screen the active learning path.
- Build a lesson player with explanation, recognition, recall, scenario, drill, summary, XP, and mastery updates.
- Build a question engine that supports multiple choice, multi-select, free recall, scenario judgment, and short design drills.
- Build an XP service that awards baseline lesson XP, bonus XP, review XP, project checkpoint XP, and weak-skill repair XP.
- Build a streak service that tracks daily learning goals while avoiding overly punitive behavior.
- Build a mastery service with levels 0-5: unseen, introduced, recognized, recalled, applied, and project-proven.
- Make mastery decay over time unless reinforced.
- Build a spaced repetition review scheduler for definitions, tradeoffs, failure modes, equations, tools, debugging patterns, and architecture choices.
- Build weak-skill repair that turns repeated mistakes into targeted practice.
- Make project gates necessary for highest mastery.
- Use the RAG Foundations path as the first build slice.
- Seed RAG Foundations from core wiki pages on RAG, Advanced RAG, Hybrid Search, Reranking, RAG Evaluation, and Self-Correcting RAG.
- Include one MVP mini-project: build and evaluate a toy RAG system.
- Add Lottie animations as a first-class UI requirement.
- Use original, licensed, or custom Lottie files only.
- Store Lottie JSON assets locally.
- Use Lottie for onboarding, unit intros, lesson starts, correct answer feedback, lesson completion, streaks, empty review queue, project checkpoints, wiki sync, and lesson generation loading states.
- Provide reduced-motion fallbacks.
- Lazy-load animations and avoid large always-running loops in question screens.
- Keep animations concept-reinforcing, not random decoration.
- Keep project work visually distinct from quick drills while retaining the same progression system.
- Defer hosted deployment, multi-user profiles, cohorts, public leaderboards, portfolio publishing, and mobile app packaging until after the local MVP.

Major modules:

- Wiki content ingestion module: parses markdown and produces normalized page and concept records.
- Concept graph module: resolves wikilinks, prerequisites, unlocks, and curriculum graph relationships.
- Lesson generation module: converts selected wiki pages into editable lesson drafts.
- Lesson runtime module: serves lesson steps, validates responses, and emits attempt outcomes.
- Question engine module: handles question types and answer validation.
- Review scheduler module: computes due review items and decay.
- Mastery module: updates concept mastery from attempts, reviews, repairs, and project checkpoints.
- Gamification module: manages XP, streaks, achievements, daily goals, and completion feedback.
- Project checkpoint module: represents build tasks, rubrics, evidence, and project-proven mastery.
- Local persistence module: stores profile, lessons, attempts, reviews, and mastery locally.
- Lottie asset module: maps app states and units to local animation assets with accessibility fallbacks.
- UI shell module: renders the path map, home screen, lesson player, review queue, and project screens.

Deep-module opportunities:

- The wiki parser should expose a small interface that returns normalized content records independent of UI.
- The review scheduler should expose deterministic scheduling functions independent of storage.
- The mastery engine should expose a small event-to-mastery update interface.
- The lesson runtime should emit typed attempt outcomes that the gamification, mastery, and review systems consume.
- The Lottie asset registry should keep animation decisions separate from lesson logic.

## Testing Decisions

Good tests should assert external behavior: given inputs, the module returns the expected visible or persisted result. Tests should avoid coupling to internal implementation details such as private helper names, component nesting, or exact CSS class lists.

Modules that should be tested:

- Wiki content ingestion: parses frontmatter, titles, page types, tags, wikilinks, and summaries from representative wiki pages.
- Concept graph: resolves valid wikilinks, handles missing links gracefully, and produces expected prerequisites/unlocks for selected fixtures.
- Lesson generation: produces lesson drafts with objectives, steps, source references, and supported question types from sample wiki pages.
- Question engine: validates multiple choice, multi-select, recall, and scenario answers according to expected behavior.
- Lesson runtime: completes lessons, records attempts, and emits XP/mastery/review events.
- Review scheduler: schedules due cards, applies decay, and reschedules based on correct/incorrect outcomes.
- Mastery module: updates concept mastery across introduction, recognition, recall, application, and project-proven events.
- Gamification module: awards XP, handles streak updates, and records repair completion.
- Project checkpoint module: records checkpoint completion and updates project-proven mastery.
- Local persistence: stores and reloads profile, progress, lesson attempts, review queue, and mastery state.
- Lottie asset module: returns correct local assets for known states and respects reduced-motion mode.
- UI behavior: path screen shows active path, lesson player advances through steps, review queue shows due items, and completion state appears after lesson success.

Prior art for tests in this repo:

- Existing repo guidance references parser tests and smoke tests against the wiki.
- The same testing style should be reused: fixture-driven parser tests, deterministic local data, and smoke tests against representative real wiki pages.
- For frontend behavior, use component or browser-level tests that verify visible user behavior rather than implementation internals.

## Out of Scope

- Hosted deployment.
- Production authentication.
- Multi-user account management.
- Payment, subscriptions, or SaaS billing.
- Public leaderboards for the MVP.
- Cohort management for the MVP.
- Mobile native app packaging.
- Exact Duolingo branding, mascot, art, copy, colors, sounds, or proprietary screen replication.
- Using Duolingo animation assets.
- Full AI tutor chat in the MVP.
- Full automatic conversion of the entire wiki in the first build slice.
- Cloud sync.
- Portfolio publishing.
- Admin team workflows.
- Full LLM-based content generation without human review.

## Further Notes

The core product tension is playful practice versus serious mastery. The UI should feel light, friendly, animated, and habit-forming, but mastery gates should remain rigorous. AI Engineering cannot be learned through recognition questions alone. The platform must include scenario judgment, design drills, and project checkpoints.

The MVP should prove the smallest complete loop: sync a subset of wiki pages, present a RAG Foundations path, run 10 lessons, track XP/streak/mastery, schedule reviews, and complete a toy RAG evaluation project.

The product should use the phrase "Duolingo-style" internally only as a shorthand for learning mechanics and consumer-grade polish. The shipped product should have an original name, original visual identity, original mascot or companion, original Lottie animation set, and AI Engineering-specific interaction patterns.
