---
title: Instagram Analytics Report - Baseline
type: analytics-report
tags: [instagram, analytics, growth, ai-engineering]
sources: [Views.csv, Reach.csv, Interactions.csv, Visits.csv, Follows.csv]
created: 2026-09-11
updated: 2026-09-11
period_start: 2026-08-14
period_end: 2026-09-10
---

# Instagram Analytics Report - Baseline

Baseline analysis for the daily account-level exports in `analytics/raw/`.

## Executive diagnosis

The export contains a two-day spike that has not repeated within the available observation window.

- August 29-30 generated 82.1% of summed daily reach, 81.2% of views, 77.4% of interactions, 72.9% of profile visits, and 76.0% of recorded follows in the export.
- After that spike, reach declined sharply while interactions per unit of summed daily reach increased. The files do not establish whether this reflects content quality, audience composition, repeat activity, posting frequency, or another cause.
- The latest seven days produced 285 summed daily reach. `Follows.csv` records one follow during that window but ends on September 7, so follows for September 8-10 are unavailable rather than confirmed zero.
- The available data does not identify which content caused the spike. Post-level content analytics are required before changing topic strategy with confidence.

The immediate strategy is therefore:

1. Identify what was published or promoted on August 29-30.
2. Test whether repeatable publishing and packaging can restore reach without abandoning technical depth.
3. Test whether tighter profile positioning improves post-attributed follows.
4. Instrument every new carousel by topic, hook, format, saves, shares, and completion.

## Export totals

| Metric | Export total |
|---|---:|
| Views | 9,713 |
| Summed daily reach | 7,155 |
| Content interactions | 487 |
| Profile visits | 59 |
| Recorded follows | 50 |
| Interactions / summed daily reach | 6.81% |
| Profile visits / summed daily reach | 0.82% |

These totals are sums of daily values. Summed daily reach is not unique period reach because the same account can be reached on multiple days.

`Follows.csv` contains only seven dated rows from August 29 through September 7. The 50 value is the sum of those recorded rows, not a confirmed complete daily series for August 14 through September 10. Missing rows may represent omitted zeroes or unavailable data; this report does not choose between those interpretations.

Do not treat `follows / profile visits` as profile conversion. The series contains recorded follows on days with zero same-day profile visits, which proves that these daily aggregates cannot establish a visit-to-follow sequence.

## Period comparison

| Period | Views | Summed daily reach | Interactions | Visits | Recorded follows | Interactions / reach | Views / reach | Follows / 1,000 reach |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Aug 29-30 spike | 7,883 | 5,877 | 377 | 43 | 38 | 6.41% | 1.34 | 6.47 |
| Post-spike: Aug 31-Sep 10 | 1,822 | 1,276 | 110 | 14 | 12 recorded through Sep 7 | 8.62% | 1.43 | N/A - incomplete follow coverage |
| Latest seven days: Sep 4-10 | 554 | 285 | 34 | 7 | 1 recorded through Sep 7 | 11.93% | 1.94 | N/A - incomplete follow coverage |

Interpret ratios directionally. This export does not establish unique people across a multi-day period or isolate organic, paid, follower, and non-follower distribution.

## What the data supports

### 1. Distribution is highly concentrated

The August 29-30 reach spike did not repeat within the observation window and is followed by substantially lower daily values. This could reflect one or more strong posts, a launch, external sharing, promotion, collaboration, posting frequency, or simply the decay of a distribution event. The current files cannot distinguish those causes.

### 2. Interaction density increased as observed reach fell

Post-spike interactions per summed daily reach were higher than during the spike. The latest seven-day ratio is also higher, although it is based on a small denominator, counts interaction events rather than interacting people, and may include repeat exposure.

This observation does not establish audience-interest quality or interaction propensity. It supports testing whether reach can be increased while preserving the current event-to-reach ratio.

### 3. Recent follower acquisition cannot be measured completely

The latest seven-day window contains one recorded follow, but the follows export ends three days before the other files. The August 29-30 spike contains 38 recorded follows. This difference is notable but cannot support a complete recent conversion comparison until follow coverage and post-level attribution are available.

### 4. Repeat viewing may be present

Views per summed daily reach rose from 1.34 during the spike to 1.94 in the latest seven days. This can indicate repeat viewing, multiple content views per account, or differences in how Meta counts the exported metrics. Without post-level and format-level data, it should not be interpreted as carousel completion.

## What the data cannot answer

- Which post or topic caused the August 29-30 spike
- Which content, if any, contributed to the spike and whether it was a carousel, reel, story, or another format
- Follower versus non-follower reach
- Organic versus paid distribution
- Likes, comments, saves, and shares separately
- Carousel first-slide to last-slide retention
- Which title psychology mechanism worked
- Current follower total, net follower growth, unfollows, or complete daily follow coverage after September 7
- Whether posting frequency changed during the period

Do not rank content pillars or revise the 30-day curriculum from these aggregate files alone.

## Growth plan

### Priority 1: recover the missing attribution

Export post-level content data covering August 24 through September 10. Include:

- publication date and time
- post title or first-line caption
- content format
- reach and views
- follower and non-follower reach
- likes, comments, saves, and shares
- profile visits, follows, and link actions attributed to the post when available
- carousel navigation or first-to-last-slide reach when available
- whether the post was boosted, collaborative, or externally shared

Map every post to a topic, content pillar, Explain/Apply/Judge level, and hook mechanism from [[calander|30-Day AI Engineering Content Calendar]].

### Priority 2: reproduce the August 29-30 conditions as controlled tests

First identify the posts and distribution conditions on those dates. If post-level evidence indicates that topic, utility, or packaging contributed, create three variants while changing only one major variable at a time. If promotion or external distribution explains the spike, test that distribution mechanism separately instead of attributing the result to content.

- Test A: same topic family, stronger cover promise
- Test B: same hook structure, adjacent AI engineering topic
- Test C: same lesson, more useful artifact such as a checklist, architecture, or diagnostic

Do not copy the post blindly. Separate topic effect, packaging effect, format effect, and external-distribution effect.

### Priority 3: design for shares and saves

For aspiring AI engineers, each carousel should provide at least one reason to keep or send it:

- a decision tree
- a system diagram
- a comparison table
- a diagnostic checklist
- a failure-mode map
- a build sequence
- a compact reference model

Use the psychological title to earn the first swipe, then resolve it with practical value. A strong hook without a saveable artifact can produce reach without durable authority.

### Priority 4: test the follow conversion path

The aggregate exports cannot diagnose the profile as the conversion problem. Test whether making the profile promise match the content improves post-attributed follows:

> AI engineering from model to production. RAG, agents, evaluation, inference, and systems. One practical visual lesson at a time.

Use three pinned posts:

1. Start here: what AI engineering actually includes
2. Roadmap: the sequence an aspiring AI engineer should learn
3. Proof: the strongest architecture, evaluation, or build case study

End carousels with a specific series promise rather than a generic follow request. Example:

> Next: how to tell whether retrieval or generation broke your RAG pipeline.

This gives the right reader a reason to return.

### Priority 5: create connected series

Avoid isolated topic jumps. Test whether short connected sequences build anticipation and increase profile browsing:

- Transformer series: tokenization -> transformer path -> attention -> position -> mixture of experts -> key-value cache
- RAG series: pipeline -> chunking -> hybrid retrieval -> reranking -> advanced patterns -> evaluation
- Agent series: agent decision -> ReAct -> tool design -> memory -> failure taxonomy -> trajectory evaluation

Use consistent series labels and slide-one visual structure while varying the central image and composition.

### Priority 6: use a sustainable experimental cadence

Quality and measurement matter more than completing 30 posts in 30 rushed days. Use the calendar as a queue and begin with four or five strong posts per week if daily production reduces technical accuracy or visual quality.

For each week:

- Publish two broad-access posts for discovery.
- Publish two practical system or failure posts for saves and shares.
- Publish one proof-oriented post tied to a real implementation, evaluation, or architecture artifact.

Do not change topic, hook, format, slide count, and posting time simultaneously. Controlled variation makes the analytics useful.

## Next 10-post experiment

| Post | Role | Primary measure | Test |
|---:|---|---|---|
| 1 | Broad foundation | Non-follower reach | Consequence-based title versus neutral title baseline |
| 2 | Mechanism | Completion and saves | One visual mechanism across 7 slides |
| 3 | Decision guide | Saves and shares | Decision tree as final artifact |
| 4 | Failure diagnosis | Shares and comments | Specific costly mistake hook |
| 5 | Build evidence | Profile visits and follows | Architecture plus measured result |
| 6 | Broad foundation | Non-follower reach | Misconception-correction title |
| 7 | System pipeline | Completion and saves | Progressive architecture reveal |
| 8 | Comparison | Saves | Explicit quality, cost, latency, and complexity axes |
| 9 | Failure diagnosis | Shares | Symptom-to-fix table |
| 10 | Build evidence | Profile visits and follows | Failure, correction, and verified improvement story |

Review after all ten posts have comparable 48-hour snapshots. Avoid strategic conclusions from one winner.

## Measurement requirements for new posts

Record these fields at 48 hours and 14 days:

- content ID and title
- publication timestamp
- format and slide count
- pillar and Explain/Apply/Judge level
- title psychology mechanism
- reach and non-follower reach
- views or impressions
- likes, comments, saves, and shares
- profile visits and follows attributed to the post
- first-slide and last-slide reach when available
- whether promotion, collaboration, or external sharing occurred

Calculate:

```text
Interaction rate = (likes + comments + saves + shares) / reach
Save rate = saves / reach
Share rate = shares / reach
Profile-interest rate = profile visits / reach
Attributed follow rate = post-attributed follows / reach
Completion proxy = last-slide reach / first-slide reach
```

Use `N/A` when a value is unavailable or the denominator is zero.

## Current strategic verdict

The export shows one large distribution event and continued interaction events afterward, but not enough post-level evidence to identify a repeatable content strategy. Observed reach fell substantially after the August 29-30 spike; whether that reflects distribution performance, posting supply, promotion, format, or content is unknown. The best next move is to recover attribution for the spike, publish a controlled ten-post test, test profile positioning, and optimize against saves, shares, qualified profile visits, and attributed follows.
