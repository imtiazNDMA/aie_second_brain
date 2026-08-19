# ADR 0008: Gated Track Tree

Status: Accepted

Date: 2026-08-19

## Context

`plan.md` originally described a single learning path of eight sequential units
(Foundations, Prompting, RAG, Evaluation, Agents, Fine-Tuning, Inference,
Capstones). The product owner has since asked for multiple discipline tracks:
MLOps, AIOps, LLM Engineering, Agent Engineering, and Machine Learning.

Two structures were considered. The reference product uses independent courses
with no prerequisites between them and global XP and streak. That model was
rejected because engineering disciplines have genuine dependencies that language
courses do not.

Track depth was measured from wiki frontmatter tags to ground the graph shape:

| Track            | Approx. dedicated pages |
| ---------------- | ----------------------- |
| LLM Engineering  | ~175                    |
| Machine Learning | ~138                    |
| Agent Engineering| ~50                     |
| MLOps            | ~43                     |
| AIOps            | ~12                     |

A linear chain would have placed the two thinnest tracks in the critical path,
gating ~175 pages of the richest material behind ~55 pages of the weakest — the
strongest predictor of early abandonment.

## Decision

Model tracks as a directed acyclic graph with Machine Learning as the sole root
and an immediate branch:

```
                Machine Learning
                       |
          +------------+------------+
          |                         |
   LLM Engineering                MLOps
          |                         |
   Agent Engineering              AIOps
```

Richest content sits one gate from the root; both thin tracks sit at leaves where
shallow content does least harm; the learner always has a choice of two.

A gate opens by either of two independent routes:

1. Completing a small named set of gateway units inside the prerequisite track,
   not the whole track.
2. Passing a test-out exam assembled from the prerequisite track's review items.

Two routes are required because the sole learner authored the source material.
A completion-only gate would force them to grind content they wrote.

Gates are **deferred out of the first release**. v1 ships LLM Engineering alone,
with the full diamond rendered on the track map and the other four tracks shown
as locked. Gate enforcement, gateway-unit selection, and test-out exams land in a
later release.

## Consequences

- `learning_paths` gains a prerequisite relation. The existing flat `sort_order`
  list is insufficient once gates are enforced.
- The home surface becomes two-level: a track map showing the diamond, and a unit
  path inside the active track.
- Because v1 defers gates, the existing `rag-foundations` content remains directly
  reachable as LLM Engineering's opening units. Enforcing gates in v1 would have
  locked the only authored content behind a track with no lessons.
- AIOps at ~12 pages cannot sustain a full track on current material. It ships
  last, and needs wiki growth before it is credible.
- This is a deliberate departure from the reference product, which has no
  inter-course gating. It is accepted as more honest for engineering material.

## Quality Gates

- The track graph is acyclic and has exactly one root.
- The track map renders locked tracks legibly, showing what unlocks them.
- No track's content is reachable only through a track with zero published lessons.
- When gates are enabled, both unlock routes are implemented and either alone
  suffices.
- Test-out exams draw only from review items already tied to the prerequisite's
  concepts.
