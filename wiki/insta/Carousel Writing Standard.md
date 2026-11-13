---
title: Carousel Writing Standard
type: content-standard
tags: [instagram, carousel, copywriting, quality]
sources: ["Artem Novitckii — AI Content Systems.md"]
created: 2026-09-11
updated: 2026-09-11
---

# Carousel Writing Standard

Copy is the highest-leverage part of the carousel. It is finalized before visual production begins.

## Draft brief

Every draft declares:

- Audience problem
- Reader outcome
- Primary wiki concept
- Supporting wiki sources
- Content level: Explain, Apply, or Judge
- One-sentence thesis
- Desired action after reading

## Slide count

Default to 7-9 slides. Use 10 only when a one-to-one taxonomy or sequence would become less clear if compressed. Use fewer when the idea is simple; never pad a lesson to meet a count.

| Slide | Job |
|---|---|
| 1 | Stop the right reader with a specific promise or tension |
| 2 | Make the problem concrete and earn the swipe |
| 3 | Replace the weak mental model |
| 4-6 | Explain the mechanism in logical steps |
| 7 | Show an example, architecture, comparison, or failure |
| 8 | Give a decision rule or practical takeaway |
| 9 | Close with a useful action and next lesson |

## Hook standard

Write at least five hooks across different patterns:

- Misconception: "RAG is not a database feature. It is a system."
- Costly mistake: "Your agent is not unreliable because the model is weak."
- Contrast: "A demo answers. A production AI system proves why you can trust the answer."
- Outcome: "Understand self-attention in 8 slides, without skipping the math."
- Diagnostic: "If you cannot answer these 4 questions, your RAG evaluation is incomplete."

Choose the strongest truthful hook. Do not manufacture stakes, hide the topic, or promise an outcome the deck does not deliver.

## Slide copy rules

- One idea per slide.
- Lead with the conclusion; support it underneath.
- Prefer concrete nouns and active verbs.
- Define an acronym on first use.
- Keep headings short enough to scan instantly.
- Keep body copy concise enough for comfortable mobile reading.
- Use equations only when they improve the mental model; explain every symbol shown.
- Use tools as examples, not as substitutes for concepts.
- Use lists only when order or comparison matters.
- Never add facts during image generation. The approved draft is the exact text source.

## Technical teaching pattern

For most AI engineering concepts, use:

```text
Problem -> weak mental model -> correct mechanism -> example -> failure mode -> decision rule
```

For architecture posts, use:

```text
Input -> transformations -> state -> output -> bottleneck -> optimization
```

For comparison posts, compare on explicit axes such as quality, latency, cost, control, data needs, operational complexity, and failure behavior.

## Caption standard

The caption should add what did not fit on the slides:

1. Restate the practical context in one or two lines.
2. Add one nuance, limitation, or implementation note.
3. Cite the underlying source or linked wiki concept where appropriate.
4. Ask a specific question that reveals the audience's next problem.

Avoid repeating every slide or adding a generic "follow for more."

## Quality gate

Score each criterion from 0-2. Revise anything below 12/14.

| Criterion | 0 | 1 | 2 |
|---|---|---|---|
| Audience fit | unclear | broadly relevant | solves a named audience problem |
| Hook | generic | interesting | specific, truthful, high tension |
| Clarity | confusing | understandable | instantly teachable |
| Accuracy | unsupported | mostly sourced | claims trace to wiki evidence |
| Mechanism | absent | partial | explains how or why |
| Practicality | abstract | example included | usable rule or diagnostic |
| Narrative | disconnected | logical | every slide earns the next swipe |

## Anti-slop checklist

- No "In today's fast-paced world."
- No "AI is revolutionizing everything."
- No vague lists of benefits.
- No random robot imagery as the main idea.
- No glowing brain, circuit-board face, or generic blue-purple gradient by default.
- No wall of tiny text disguised as an infographic.
- No hook that withholds the actual subject.
- No unsupported benchmark flex.
- No carousel assembled from unrelated visual styles.
