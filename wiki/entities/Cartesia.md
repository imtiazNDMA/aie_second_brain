---
title: Cartesia
type: entity
tags: [organization, voice-agent, tts, stt, state-space-models, startup]
sources: [2026-05-28-voice-agents-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Cartesia

## Identity

Voice AI startup founded by Karan Goel and Albert Gu (creators of **Mamba** and **State Space Models**) along with the SSM research team. Headquartered in San Francisco. Products: **Sonic 3.5** (TTS), **Ink** (STT), **Line** (agent framework). The core architectural differentiator is using **State Space Models** instead of Transformers, giving linear-time inference and very low latency.

## Products

| Product | What |
|---|---|
| **Sonic 3.5** | TTS with **40ms TTFA** — lowest in the industry as of May 2026 |
| **Sonic Multilingual** | Sonic family across languages |
| **Ink** | Streaming STT |
| **Line Agent** | End-to-end voice agent framework |

## Architecture differentiator

Where other TTS models use transformers (quadratic attention), Cartesia uses **State Space Models** (linear-time recurrence). Result: dramatic latency reduction and better scaling at high concurrency. This is the **practical productization of Mamba research**.

## Strengths

- **Lowest TTFA** in the industry (40ms).
- **Linear-time inference** — scales to high concurrency.
- **Strong on telephony / IVR / embedded** — where latency dominates.

## Limitations

- **15 fully-deployed languages** (despite 40+ claimed).
- **Lower ELO than Inworld TTS 1.5 Max** on Artificial Analysis (~1054 vs ~1208).
- **Newer entrant** — smaller ecosystem.

## Significance

- **First major SSM-based commercial product** at scale.
- **Latency leader** for telephony and embedded voice agents.
- **Validates the SSM thesis** that linear-time architectures can match transformers on quality at lower compute.

## Related Pages

- [[Voice Agents]] — model class
- [[State Space Models]] — architectural primitive (link target)
- [[Mamba]] — predecessor research
- [[OpenAI Realtime API]], [[Inworld AI]], [[Hume AI]] — competitors

## Sources

- [[2026-05-28-voice-agents-2026]]
