# ADR 0004: Lesson and Mastery Domain Model

Status: Accepted

Date: 2026-07-07

## Context

AI Engineering cannot be learned through passive reading or recognition quizzes alone. The app must convert wiki knowledge into short lessons, immediate practice, spaced review, weak-skill repair, and project-based proof.

## Decision

Model learning around concepts, lessons, lesson steps, attempts, review items, mastery states, XP events, streak days, projects, and project checkpoints.

Mastery uses six levels:

- 0: unseen
- 1: introduced
- 2: recognized
- 3: recalled
- 4: applied
- 5: project-proven

Lesson completion should emit typed outcomes consumed by mastery, review, XP, and streak services. Project checkpoints are required for level 5 mastery.

## Consequences

- The domain model supports both quick practice and serious capability proof.
- Mastery can decay and recover through reviews or repair lessons.
- Lesson runtime stays separate from gamification and visual feedback.
- Freeform and scenario answers need deterministic MVP validation or explicit human/LLM review later.

## Quality Gates

- Each lesson cites one or more source wiki pages.
- Lessons include explanation plus practice, not only reading.
- Wrong answers create review or repair signals.
- Mastery level 5 cannot be reached without project evidence.
- Unit tests cover recognition, recall, application, review rescheduling, and project-proven mastery updates.
