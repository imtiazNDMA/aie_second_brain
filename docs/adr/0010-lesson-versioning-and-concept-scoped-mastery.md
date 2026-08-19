# ADR 0010: Lesson Versioning and Concept-Scoped Mastery

Status: Accepted

Date: 2026-08-19

## Context

The wiki is actively maintained — 564 pages and growing. Any edit can invalidate
a lesson generated from that page. `wiki_pages` already carries `body_hash`, so
change detection was anticipated, but the consequence of a detected change was
never decided.

Three failure modes were identified:

1. **Silent corruption.** Regenerating a lesson in place while leaving sessions
   and attempts keyed to the same lesson id leaves recorded answers pointing at
   question ids that no longer exist. Nothing errors; the history simply stops
   meaning anything.
2. **Perverse incentive.** Resetting progress when a source page changes makes
   improving the wiki cost the learner progress — exactly backwards for a product
   built to encourage maintaining that wiki.
3. **Silent staleness.** Never regenerating lets the review queue drift away from
   what the wiki actually says.

The existing schema already contains most of the answer: `concept_mastery` is
scoped to concepts, not lessons. Mastery — the durable representation of learning
— is therefore already immune to lesson churn. Only `lesson_sessions` and
`lesson_attempts` reference lessons.

## Decision

Version lessons; keep mastery on concepts.

- A `body_hash` change on a source page marks derived lessons **stale**.
- Regeneration produces a new lesson **version** rather than mutating the existing
  record. Completed sessions and attempts stay attached to the version they were
  taken against, so history remains internally coherent.
- `concept_mastery` is never reset by regeneration. Mastery is earned against
  concepts and survives any amount of lesson churn.
- The path map surfaces an "updated" affordance on a lesson with a newer version.
  Replaying an updated lesson awards partial XP.

## Consequences

- Lessons gain `version` and `stale` fields; sessions and attempts record the
  lesson version they ran against.
- Old lesson versions are retained rather than deleted. Storage cost is trivial
  relative to the coherence gained.
- The learner can edit the wiki freely and indefinitely without any risk to
  recorded progress — the central property this ADR exists to guarantee.
- Review items derived from a stale lesson version stay valid, because they too
  are tied to concepts rather than to lesson rows.
- Reporting must be explicit about which version a statistic refers to when
  comparing attempts over time.

## Quality Gates

- Regenerating any lesson never mutates `concept_mastery`.
- A completed session always resolves to the exact lesson version it was taken
  against.
- Sync detects changed pages by `body_hash` and marks exactly the affected
  lessons stale.
- No attempt record can reference a question id absent from its lesson version.
- A learner who edits a wiki page and re-syncs loses no XP, mastery, streak, or
  review history.
