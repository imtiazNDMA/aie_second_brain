---
title: Instagram Content OS
type: content-hub
tags: [instagram, content-system, ai-engineering, education]
sources: ["Artem Novitckii — AI Content Systems.md"]
created: 2026-09-11
updated: 2026-09-11
---

# Instagram Content OS

Operating system for turning this second brain into rigorous Instagram education for aspiring AI engineers.

## Mission

Teach AI engineering from first principles through production, while building a reputation for explanations that are clear, technically accurate, visual, and useful enough to save.

The editorial promise is:

> Understand the system. See how it works. Know when to use it. Learn what breaks in production.

## Content loop

```text
Wiki concept -> audience problem -> carousel lesson -> visual anchor -> publish -> measure -> improve wiki
```

Every carousel starts from one or more existing wiki pages. Research gaps discovered during writing return to the wiki rather than being hidden by confident copy.

## System

- [[Instagram Audience and Positioning]] defines who the content serves and why they should follow.
- [[AI Engineering Content Curriculum]] organizes the subject into a teachable sequence.
- [[Carousel Writing Standard]] defines hooks, slide structure, technical depth, and quality gates.
- [[Carousel Production Workflow]] turns approved copy into a visually consistent deck.
- [[AI Engineering Carousel Backlog]] is the prioritized publishing queue.
- [[Instagram Carousel Template]] is duplicated for every new draft.
- [[Instagram Publishing Log]] records output and learning after publication.
- [[calander|30-Day AI Engineering Content Calendar]] schedules the first campaign and provides copy-ready generation briefs.
- [[analytics-report|Instagram Analytics Report - Baseline]] diagnoses account performance and defines the next controlled growth experiment.

## Directory convention

```text
wiki/insta/
  drafts/       carousel copy under development
  published/    final copy and retrospective after publishing
  templates/    reusable production documents
```

Use filenames that begin with a sequence number while drafting, such as `001 - What AI Engineering Actually Is.md`. Preserve the number when moving a post to `published/`.

## Editorial rules

1. One carousel teaches one transformation, not an entire textbook chapter.
2. Start with the learner's misconception or costly problem, not a dictionary definition.
3. Explain the mechanism before listing tools.
4. Include a concrete example, architecture, decision rule, or failure mode.
5. Separate established facts from opinion and prediction.
6. Never imply personal production experience that is not documented.
7. Link the source wiki pages in the draft so every claim can be checked.
8. Prefer durable education over news unless the news reveals a durable engineering lesson.
9. Use plain language without removing the technical substance.
10. End with a useful action, diagnostic question, or next concept, not empty engagement bait.

## Weekly cadence

Start with three posts per week:

| Day | Role | Example |
|---|---|---|
| Monday | Foundation | What embeddings actually store |
| Wednesday | System | A production RAG request from query to answer |
| Friday | Failure or decision | Why your agent loop never terminates |

One weekly batch should produce three approved scripts. Design only begins after the scripts pass [[Carousel Writing Standard]].

## Success measures

Measure whether the content creates learning and authority, not only reach:

- Saves per reach: practical reference value
- Shares per reach: clarity and relevance
- Qualified comments and DMs: audience fit
- Profile visits to follows: positioning strength
- Completion or last-slide reach: narrative quality
- Questions generated: input for future posts
- Concept coverage: progress through [[AI Engineering Content Curriculum]]

Review results in [[Instagram Publishing Log]] after 48 hours and again after 14 days.

## Definition of done

A carousel is ready to publish when:

- the reader outcome is one sentence
- every technical claim resolves to a wiki source
- the cover has at least five tested hook variants
- each slide contains one idea and reads quickly on a phone
- the deck includes a mechanism, example, or decision rule
- the final slide gives a concrete next action
- slide 1 is approved as the visual anchor
- all slides match the anchor and use exact approved copy
- the caption adds context instead of repeating the deck

## Initial drafts

- [[001 - What AI Engineering Actually Is]]
- [[002 - RAG Is a System, Not a Feature]]
- [[003 - Why AI Agents Fail in Production]]
