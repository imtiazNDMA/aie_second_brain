---
name: design-md-brands
description: Load a real product's extracted design system (exact color tokens, type ramp, spacing, component rules) as the style basis for UI work. Use when the user names a brand as a visual reference — "make it look like Linear", "Stripe-style", "Vercel aesthetic", "dark like Claude" — or asks to browse available brand design systems. 74 brands vendored locally from VoltAgent/awesome-design-md.
metadata:
  source: https://github.com/VoltAgent/awesome-design-md
  vendored: 2026-08-19
  count: "74"
---

# Brand Design Systems (design-md)

74 real product design systems, reverse-engineered into structured `DESIGN.md`
files. Each contains YAML frontmatter with exact hex tokens, a typography ramp
(family / size / weight / line-height / letter-spacing per role), spacing scale,
radii, shadows, and prose rules on layout rhythm and component treatment.

Corpus lives at `.agents/design-md/<brand>/DESIGN.md`.

## How to use

1. Pick the brand that matches the user's reference. If they named one directly,
   use it. If they described a *feel* ("near-black developer tool", "warm
   editorial", "luxury automotive"), grep the descriptions to find the match:

   ```bash
   grep -l -i "<keyword>" .agents/design-md/*/DESIGN.md
   sed -n '1,10p' .agents/design-md/<brand>/DESIGN.md   # frontmatter description
   ```

2. **Read the full `DESIGN.md` before writing any UI code.** These files run
   400-600 lines; the frontmatter tokens are only half the value — the prose
   sections carry the layout rhythm and "never do X" rules that make the result
   read as the brand rather than as a palette swap.

3. Apply the tokens literally. Exact hex values, exact type ramp. Do not
   approximate or "improve" the palette — the point of the corpus is fidelity.

4. Tell the user which brand file you used, so the choice is reviewable.

## Available brands

**Dev tools / infra** — vercel, linear.app, cursor, warp, raycast, supabase,
sentry, posthog, hashicorp, clickhouse, mongodb, expo, framer, webflow, sanity,
mintlify, replicate, opencode.ai, composio, lovable, voltagent, resend, cal

**AI** — claude, cohere, mistral.ai, x.ai, elevenlabs, together.ai, minimax,
ollama, runwayml

**Fintech / crypto** — stripe, coinbase, binance, kraken, revolut, wise,
mastercard

**Consumer / social** — airbnb, uber, spotify, pinterest, slack, notion, figma,
miro, airtable, shopify, intercom, zapier, superhuman, meta, starbucks, nike

**Automotive** — bmw, bmw-m, ferrari, lamborghini, bugatti, tesla, renault,
vodafone

**Big tech / legacy** — apple, ibm, hp, nvidia, spacex, dell-1996,
nintendo-2001, playstation

**Editorial** — theverge, wired

Full list: `ls .agents/design-md`

## Notes

- `dell-1996` and `nintendo-2001` are deliberate period pieces — reach for them
  only when the user wants retro, not as general-purpose systems.
- Pairs with `stitch-design-taste`, which *generates* DESIGN.md files in this
  same format. These are pre-made references; that one authors new ones.
- Source README preserved at `.agents/design-md/_SOURCE-README.md`.
