---
title: Hume AI
type: entity
tags: [organization, voice-agent, emotion-ai, tts, startup]
sources: [2026-05-28-voice-agents-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Hume AI

## Identity

Voice / emotion-AI startup founded by Alan Cowen (former Google DeepMind researcher), focused on **emotional prosody** in both speech understanding and generation. Headquartered in New York. Products: **EVI** (Empathic Voice Interface), a native speech-to-speech LLM that detects vocal emotion and adapts response delivery; **Octave 2**, a frontier TTS model with prosody control. Used in companion / therapy / coaching applications.

## Products

| Product | What |
|---|---|
| **EVI v3 / v4** | Native S2S model with emotional prosody analysis |
| **Octave 2** | TTS with emotional control via natural-language voice prompts |
| **Hume Speech Prosody API** | Standalone prosody analysis |
| **Expression Measurement API** | Multimodal emotion (face, voice, language) |

## Differentiator

Hume **analyzes the user's tone of voice and adjusts response delivery accordingly** — handled internally rather than via explicit `<emotion>` tags or prompts. The model is trained on prosody-labeled data.

## Strengths

- **Most emotion-aware voice stack** in production.
- **Natural-language voice control** — prompt the TTS with "speak gently and slowly" without tags.
- **Sub-300ms end-to-end** latency target.
- **Use cases** that benefit from emotional warmth: therapy, coaching, companions, hospitality.

## Limitations

- **Not ranked on independent TTS leaderboards** (Artificial Analysis ELO).
- **Closed-weight, vendor lock-in**.
- **Premium pricing**.
- **English-heavy** prosody training data.

## Significance

- **First major voice-AI lab built around emotional prosody** as the differentiator.
- **EVI's prosody-based endpointing** (turn detection from sentence-final intonation rather than silence VAD) is independently influential.

## Related Pages

- [[Voice Agents]] — model class
- [[Speech-to-Speech Models]] — EVI is native S2S
- [[OpenAI Realtime API]] — main native S2S competitor
- [[Inworld AI]] — TTS leaderboard competitor
- [[Cartesia]] — low-latency competitor

## Sources

- [[2026-05-28-voice-agents-2026]]
