---
title: Inworld AI
type: entity
tags: [organization, voice-agent, tts, realtime-api, startup]
sources: [2026-05-28-voice-agents-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Inworld AI

## Identity

Voice / AI-NPC startup originally focused on game characters, pivoted to broader voice-agent infrastructure. Products: **Inworld Realtime API** (model-agnostic LLM routing wrapped around STT/TTS), **Inworld Realtime TTS 1.5 Max** (top-of-leaderboard TTS), zero-shot voice cloning. Headquartered in Mountain View.

## Products

| Product | What |
|---|---|
| **Realtime API** | Cascaded STT → LLM → TTS exposed as a single WebSocket; model-agnostic LLM (OpenAI, Anthropic, Google) |
| **Realtime TTS 1.5 Max** | P90 < 250ms TTFA; #1 Artificial Analysis ELO (~1208) |
| **Realtime TTS 1.5 Mini** | Cheaper, P90 < 130ms TTFA |
| **Zero-shot voice cloning** | Voice replication from a short audio sample |

## Strengths

- **#1 TTS quality** on the Artificial Analysis leaderboard (May 2026).
- **Model-agnostic LLM routing** — pick any text LLM for the reasoning step.
- **Voice cloning** built in.
- **Built-in cancellation** for barge-in.

## Limitations

- **15 languages** (smaller than Google's 75+).
- **Emotion tags experimental** and English-only.
- **Cascaded architecture** — gives up native-S2S prosody preservation.

## Significance

- **Demonstrates the cascaded architecture can beat native S2S on TTS quality** when each component is best-in-class.
- **Realtime API endpoint pattern** competes directly with OpenAI Realtime on integration ergonomics, while offering model flexibility.

## Related Pages

- [[Voice Agents]] — model class
- [[OpenAI Realtime API]] — main competitor
- [[Hume AI]] — competitor (emotion-focused)
- [[Cartesia]] — competitor (low-latency SSM)
- [[ElevenLabs]] — competitor (voice cloning)

## Sources

- [[2026-05-28-voice-agents-2026]]
