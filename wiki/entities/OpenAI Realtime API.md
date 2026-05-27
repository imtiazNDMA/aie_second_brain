---
title: OpenAI Realtime API
type: entity
tags: [product, voice-agent, speech-to-speech, api, openai, realtime]
sources: [2026-05-28-voice-agents-2026]
created: 2026-05-28
updated: 2026-05-28
---

# OpenAI Realtime API

## Identity

OpenAI's **native speech-to-speech API** — a single WebSocket / WebRTC endpoint that accepts a user's audio stream and emits the assistant's audio response, with reasoning, function calling, and TTS all collapsed into one model. Launched in late 2024 with **gpt-4o-realtime**, refreshed in 2025–2026 as **gpt-realtime** and **gpt-realtime-1.5**. The defining example of the **native S2S** voice-agent architecture.

## Key features

- **Single-model audio in / audio out** — no intermediate STT or TTS stage.
- **WebSocket and WebRTC transports**.
- **Server-side VAD** with configurable thresholds.
- **Function calling in realtime** — model can invoke tools mid-conversation.
- **SIP integration** — official telephony support.
- **9 voices** at launch; configurable per session.
- **Sub-1s TTFT** as of 2026 (gpt-realtime-1.5: 0.82s).

## Strengths

- **Lowest-friction native S2S** in production.
- **Unified experience** — prosody, emotion, interruption all handled in one model.
- **Function calling maturity** — strongest of the native S2S providers.

## Limitations

- **Closed-weight, vendor lock-in** — can't self-host.
- **9 voices only** — no zero-shot voice cloning.
- **No on-premise deployment**.
- **Higher cost** than cascaded — audio tokens are dense.

## Significance

- **Defined the modern voice-agent API contract** — single endpoint, audio-in/audio-out, function calling, barge-in.
- **Industry pivot from cascaded to native S2S** for high-end use cases tracks back to this launch.
- Competitors (Gemini Live, Hume EVI, Amazon Nova Sonic, xAI Grok Voice) directly emulate the API shape.

## Related Pages

- [[Voice Agents]] — model class
- [[Speech-to-Speech Models]] — architectural class
- [[OpenAI]] — parent org
- [[Hume AI]] — emotional-prosody competitor
- [[Inworld AI]] — cascaded competitor (Realtime API endpoint pattern)
- [[Cartesia]] — ultra-low-latency cascaded competitor
- [[Modality-as-Tokens]] — synthesis

## Sources

- [[2026-05-28-voice-agents-2026]]
