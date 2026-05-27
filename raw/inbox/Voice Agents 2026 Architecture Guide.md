# Voice Agents — 2026 Architecture Compilation

**Compiled:** 2026-05-28
**Type:** Multi-source web research compilation
**Topic:** Voice Agents (Speech-to-Speech, Realtime)
**Primary sources:**
- *OpenAI Realtime API: Production Voice Agents (2026)* — forasoft.com
- *Best Speech-to-Speech APIs in 2026* — inworld.ai
- *Best Speech-to-Speech Voice Agent API in 2026* — assemblyai.com
- *Real-Time (Speech-to-Speech) vs Turn-Based (Cascading STT/TTS) Voice Agent Architecture* — softcery.com
- *Realtime vs. Pipeline Voice Agent: Architecture Guide 2026* — famulor.io

---

## What a Voice Agent Is

A **voice agent** is a conversational AI system whose primary I/O is spoken audio. The agent listens to a user's audio stream, optionally reasons (with tool use), and produces an audio response in roughly real-time.

The defining design choice is **architecture**:

1. **Cascaded / Pipelined** — STT → LLM → TTS chained as discrete services.
2. **Native end-to-end** — single model trained to accept audio tokens and emit audio tokens, sometimes without an intermediate text representation.

## Architecture A: Cascaded (STT → LLM → TTS)

```
Mic → [STT model] → text → [LLM + tools] → text → [TTS model] → Speaker
                                  ↑
                          (function calling)
```

**Pros:**
- Model-agnostic — swap any component.
- LLM cost is half of S2S (text in, text out).
- Better function-calling stability (mature text-only tools).
- Easier to log, audit, redact — text is searchable.
- Compliance/telephony-friendly (PCI, HIPAA).

**Cons:**
- Latency stacks: STT (~150–300ms) + LLM TTFT + TTS first chunk.
- Loses prosody — text bottleneck strips emotion, pauses, laughter.
- Barge-in / interruption requires careful coordination across three services.

**Examples:** Inworld Realtime API, Cartesia Line, Vocode pipelines, Pipecat, LiveKit Agents, Twilio Voice Intelligence.

## Architecture B: Native Speech-to-Speech

```
Mic → audio tokens → [single S2S model] → audio tokens → Speaker
```

**Pros:**
- Preserves prosody, emotion, laughter, paralinguistic cues.
- Lower end-to-end latency in best case.
- More natural turn-taking — the model decides when to interrupt.

**Cons:**
- Vendor lock-in (the major S2S models are closed).
- Higher token cost (audio tokens are dense).
- Function-calling and tool use less mature than text LLMs.
- Hard to debug — no inspectable text layer.

**Examples:** OpenAI Realtime API (gpt-realtime), Gemini Live, Hume EVI, Amazon Nova Sonic, xAI Grok Voice.

## Latency Benchmarks (April 2026, Artificial Analysis)

End-to-end Time-to-First-Token across hosted S2S APIs:

| API | TTFT |
|---|---|
| xAI Grok Voice Agent | 0.78s |
| OpenAI gpt-realtime-1.5 | 0.82s |
| Amazon Nova 2 Sonic | 1.14s |
| Gemini 3.1 Flash Live | 2.98s |

**Sub-1-second TTFT is now table stakes.** Differentiation has moved to prosody, function-calling, language coverage, and pricing.

## TTS Leaders (May 2026)

| Provider | Model | TTFA | ELO | Notable |
|---|---|---|---|---|
| Inworld | Realtime TTS 1.5 Max | P90 < 250ms | ~1208 (#1) | Voice cloning, model-agnostic LLM |
| Cartesia | Sonic 3.5 | 40ms | ~1054 | State Space Model architecture |
| Hume | Octave 2 | < 300ms e2e | n/a | Emotional prosody control without tags |
| Google | Gemini TTS | n/a | n/a | 75+ languages, natural-language voice control |
| ElevenLabs | Multilingual v3 | competitive | strong | Voice library + cloning |
| OpenAI | tts-1-hd / gpt-realtime voices | n/a | n/a | 9 voices, bundled with Realtime API |

## STT Leaders (May 2026)

- **Deepgram Nova-3** — streaming ASR, ~150ms latency
- **AssemblyAI Universal-2** — streaming + diarization
- **OpenAI Whisper-large-v4** — batch ASR gold standard
- **Google Speech-to-Text Chirp 2** — broad language coverage
- **NVIDIA Parakeet / Canary** — open-weight streaming ASR

## Critical Engineering Concerns

### Barge-in (Interruption Handling)

User interrupts mid-response. Must:
1. Stop TTS audio playback within ~100ms.
2. Cancel in-flight LLM generation.
3. Reset conversation state — including partial assistant turn in context.
4. Re-anchor to the user's new input.

Native S2S models often handle this natively; pipelines need explicit logic.

### Endpointing (Turn Detection)

When does the user finish speaking?

- **VAD (Voice Activity Detection)** — silence-based; cheap but fooled by pauses-mid-thought.
- **Prosody-based endpointing** — detects sentence-final intonation (used by Hume).
- **Model-based** — small classifier predicts turn-end probability per chunk (LiveKit's smart-turn).
- **Push-to-talk** — explicit user signal; bypasses the problem.

### Transport

- **WebSocket** — easier to debug; works through restrictive networks.
- **WebRTC** — media-grade jitter handling, NAT traversal, encrypted by default; harder to debug.
- **SIP / PSTN** — required for telephony; usually proxied via WebRTC bridge.

### Function Calling in Realtime

Tool calls inject latency. Patterns:
- **Speculative speech** — speak "let me check..." while tool runs.
- **Parallel tool calls** — fire multiple tools at once when independent.
- **Cached / pre-computed responses** — for common FAQ.

## When to Use Which Architecture

| Need | Architecture |
|---|---|
| Maximum naturalness, conversational warmth | Native S2S |
| Function-calling heavy, complex tool use | Cascaded |
| Telephony, IVR, compliance (PCI/HIPAA) | Cascaded |
| Low cost at scale | Cascaded (LLM cost halved) |
| Emotional AI, companions, coaching | Native S2S (Hume) or cascaded + Hume Octave |
| Multilingual (40+ languages) | Cascaded with Google STT/TTS |
| Ultra-low latency telephony | Cartesia Sonic + lightweight LLM |
| Fastest implementation | OpenAI Realtime or Inworld Realtime |

## Notable Entities

- **OpenAI** — Realtime API, gpt-realtime, Whisper
- **Google DeepMind** — Gemini Live, Chirp 2
- **Hume AI** — EVI (Empathic Voice Interface), Octave 2 TTS
- **Inworld AI** — Realtime API, TTS 1.5 Max
- **Cartesia** — Sonic 3.5 TTS, Ink STT, Line Agent, SSM architecture
- **ElevenLabs** — voice cloning, multilingual TTS
- **Deepgram** — Nova-3 streaming ASR
- **AssemblyAI** — Universal-2 ASR, real-time transcription
- **xAI** — Grok Voice Agent
- **Amazon** — Nova Sonic
- **Microsoft** — Azure Speech, Custom Neural Voice
- **NVIDIA** — Parakeet, Canary, Riva
- **LiveKit** — agents framework, WebRTC infrastructure
- **Pipecat** — open-source pipeline framework
- **Vapi, Bland.ai, Retell** — telephony-focused voice agent platforms

## URLs

- https://www.forasoft.com/blog/article/openai-realtime-api-voice-agent-production-guide-2026
- https://inworld.ai/resources/best-speech-to-speech-apis
- https://www.assemblyai.com/blog/best-speech-to-speech-voice-agent-api
- https://softcery.com/lab/ai-voice-agents-real-time-vs-turn-based-tts-stt-architecture
- https://www.famulor.io/blog/realtime-vs-pipeline-voice-agent-architecture-guide-2026
- https://www.assemblyai.com/blog/best-api-models-for-real-time-speech-recognition-and-transcription
- https://gradium.ai/content/best-text-to-speech-api-voice-agents
