---
title: "Artem Novitckii — AI Content Systems"
source: "https://www.novitckii.com/resources/carousel-system/#steps"
author:
published:
created: 2026-09-06
description: "How I make Instagram carousels that look designed (not AI) in 15 minutes. Visual-anchor workflow, the exact prompts, the copywriter skill that drafts the slides."
tags:
  - "clippings"
---
40%CopySlide list + text. If this is bad, nothing saves you.

50%Slide 1 anchorSets typography, color, mood. Spend until you love it.

10%Rest of slidesThe anchor does most of the work. You just pick winners.

Most people invert this — they sprint through copy, generate all six slides at once, and spend an hour fixing the mess.

### Visual anchor, not one-shot

Image models can only make one good slide at a time. Nail slide 1, attach it as a reference to every other slide. Now every new slide is forced to match.

### Copy first, design second

Bad copy + great design = a pretty post that dies. Run the slide list through the copywriter skill before you touch the image model. 40% of your time lives here.

### Works for LinkedIn too

Same workflow ships LinkedIn infographics that print in comments + leads. Paste an example, ask for a recreation, attach as visual anchor.

CopyChatGPT Project

Loaded with the carousel-copy skill — drafts the slides.

VisualsChatGPT Image 2

Generates each slide. One slide at a time, never the full deck.

InspoPinterest

Book covers, posters, editorial scans — anything but Instagram.

PolishCanva Magic Layers

Turns the generated image back into editable layers for tiny fixes.

01

### Write the copy first

Open ChatGPT and create a new **Project** called *Instagram Carousel Copywriter*. Drop in the two skill files below as project knowledge, then paste this as the project instructions:

```shell
You are an expert in writing copy for viral Instagram carousels.

Use carousel-copy-skill.md and slide-count.md to help you write copy for each slide.
```

Drop your two files into the project's knowledge:

Now hand it the topic. Example: *"make me a carousel about my morning routine"*. It'll come back with a slide count, multiple hook variants, body copy per slide, a caption, and hashtags. Iterate until the copy is sharp.

i **This step costs 40% of your time**. If the copy isn't right, no amount of visual polish saves the carousel. Spend it.

02

### Find a visual reference (not on Instagram)

Open Pinterest. Search for editorial book covers, indie magazine spreads, vintage posters — anything that has the mood you want. **Avoid Instagram**: if you look there you'll end up making the same carousel everyone else is making.

Save one image. That's your visual reference for the whole deck.

iThe reference doesn't need to be a carousel. A book cover, an album sleeve, a takeout menu — anything with a strong visual identity works.

### Generate slide 1 — your visual anchor

In ChatGPT (with Image 2 on), attach your reference image and paste this prompt. Swap the carousel topic and the text for slide 1 with yours:

```shell
Create 5 different versions of slide 1 for an Instagram carousel.

Use the attached references as visual inspiration only.

Borrow from the references:
- typography hierarchy
- spacing
- colour treatment
- texture
- visual pacing
- layout logic

Do not copy:
- exact text
- exact branding
- exact compositions

Carousel topic:
[YOUR TOPIC]

Slide type:
Cover / hook slide.

Slide goal:
Stop the scroll and make people want to swipe.

Text for slide 1:
[EXACT HOOK COPY FROM STEP 01]

Visual direction:
[DESCRIBE WHAT SHOULD BE ON THE SLIDE]

Style direction:
Make it feel raw, editorial, clear, useful, and highly readable.
It should feel designed, but not overly polished or corporate.

Format:
4:5 vertical Instagram carousel slide, 1080x1350.

Rules:
- keep the exact text only
- make all text readable
- do not add random words
- do not copy the references directly
- make each version visually distinct
```

It returns 5 distinct versions. Pick one or regenerate until something hits. **This is 50% of your time** — don't move on until you love it. The anchor sets the mood for every other slide.

### Generate the rest using the anchor as reference

For every other slide, attach the slide-1 anchor and paste this prompt. Swap `[x]` for the slide number, and fill in the text and goal from your copywriter project:

```shell
Create 3 versions of slide [x] of my Instagram carousel.

Use slide 1 as the visual anchor.

Match slide 1 in:
- typography feel
- spacing
- colour treatment
- texture
- raw editorial mood
- utility details
- visual hierarchy
- overall design language

Do not copy the references directly.
Do not make this slide feel like a new carousel.
It must feel like the same visual family as slide 1.

Carousel topic:
[YOUR TOPIC]

Slide type:
[SLIDE TYPE FROM COPYWRITER]

Slide goal:
[SLIDE GOAL FROM COPYWRITER]

Text on slide:
[EXACT SLIDE TEXT]

Visual direction:
[DESCRIBE WHAT SHOULD BE ON THE SLIDE]

Format:
4:5 vertical Instagram carousel slide, 1080x1350.

Rules:
- keep the exact text only
- make all text readable
- do not add random extra words
- keep it visually consistent with slide 1
- one clear idea only
```

Three versions per slide is the sweet spot — enough that one usually hits, not so many that you drown in revisions. Repeat until you have the full deck.

\+ **The 95% trick:** if a slide is almost perfect but one element is off, drag it into **Canva → Magic Layers**. It rebuilds the slide as editable layers so you can fix the text in 10 seconds instead of regenerating.

### Morning-routine carousel

The exact deck from the walkthrough — 'My dopamine-proof morning'. 8 slides, raw editorial mood, hit nearly 100K views.

### LinkedIn infographic

Same prompts, different aspect ratio. Recreate any trending infographic — works for product breakdowns, frameworks, and listicles.

### Repurpose a viral reel

Two-slide hook playbook from the slide-counter. Pull the cover from the reel transcript, drop the punchline on slide 2. Easiest carousel you'll ever ship.

Why not just generate the whole carousel in one prompt?

Because image models don't 'see' the other slides while generating each one. One-shot prompts ship 6 unrelated images that happen to share a topic. The visual-anchor approach forces each new slide to reference slide 1 — same fonts, same colors, same mood, every time.

Do I need ChatGPT Plus?

Yes — ChatGPT Image 2 (the model behind these slides) ships on the paid plans. Free tier has hard rate limits and an older image model that won't hit this quality. Nano Banana on Google works too if you're already on Gemini.

Can I use this for other platforms?

Yes — same workflow, swap the format. 4:5 (1080×1350) for Instagram, 1:1 for LinkedIn, 9:16 for TikTok stills. The visual-anchor rule is the same on every platform.

What if a slide is 95% right but one thing is wrong?

Drop it into Canva → Magic Layers. It rebuilds the image as editable layers so you can fix the text or move an element without regenerating. Anything more than a small fix, let ChatGPT do the heavy lifting — it's faster than fighting Canva.