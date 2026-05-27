---
title: Voice Agents
type: concept
tags: [voice-agents, speech, audio, realtime, multimodal, agents]
sources: [2026-05-28-voice-agents-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Voice Agents

## Definition

A **voice agent** is a conversational AI system whose primary I/O is spoken audio. It listens to a user's audio stream, optionally reasons (with tool use), and produces an audio response in near-real-time. Voice agents power call-center automation, IVR replacement, in-app voice assistants, language-learning partners, accessibility tools, and embodied robots.

The defining design choice is **architecture**: cascaded pipeline vs native speech-to-speech.

## Two architectures

### Cascaded (STT → LLM → TTS)

```
Mic → [ASR / STT] → text → [LLM + tools] → text → [TTS] → Speaker
                                ↑
                       (function calling)
```

Each stage is a separate model. Most production voice agents in 2025–2026 still use this pattern.

**Strengths:**
- **Model-agnostic** — swap any component (use Claude as the LLM, Cartesia as TTS, Deepgram as STT).
- **Half the LLM cost** of native S2S (text-in, text-out instead of audio tokens).
- **Mature function calling** inherited from text LLMs.
- **Easy to log, audit, redact** — text is searchable; PCI/HIPAA-friendly.
- **Telephony-friendly** — SIP/PSTN integration via WebRTC bridges.

**Weaknesses:**
- **Latency stacks**: STT (~150–300ms) + LLM TTFT + TTS first chunk → easily 1.5–3s end-to-end.
- **Loses prosody** — emotion, laughter, pauses-mid-thought die at the text bottleneck.
- **Barge-in coordination** is harder — three services must agree to cancel.

**Frameworks:** [[Pipecat]], [[LiveKit]] Agents, Vapi, Bland, Retell, Twilio Voice Intelligence.

### Native Speech-to-Speech

```
Mic → audio tokens → [single S2S model] → audio tokens → Speaker
```

A single model trained on **audio tokens** end-to-end. In some variants there is no intermediate text representation.

**Strengths:**
- **Preserves prosody, emotion, laughter, paralinguistic cues.**
- **Lower best-case latency** — no STT/TTS stack.
- **Natural turn-taking** — the model can interrupt, hesitate, "uh-huh" naturally.

**Weaknesses:**
- **Vendor lock-in** — the major S2S models are closed (OpenAI, Google, Hume, Amazon).
- **Higher token cost** — audio tokens are dense.
- **Function calling less mature** than text-LLM tool use.
- **Hard to debug** — no inspectable text layer.
- **Compliance gaps** — auditing audio for PII is harder than auditing text.

**Examples:** [[OpenAI Realtime API]] (gpt-realtime), Gemini Live, Hume EVI, Amazon Nova Sonic, xAI Grok Voice.

## Latency benchmarks (April 2026)

End-to-end Time-to-First-Token across hosted S2S APIs:

| API | TTFT |
|---|---|
| xAI Grok Voice Agent | 0.78s |
| OpenAI gpt-realtime-1.5 | 0.82s |
| Amazon Nova 2 Sonic | 1.14s |
| Gemini 3.1 Flash Live | 2.98s |

**Sub-1-second TTFT is now table stakes.** Differentiation has moved to prosody quality, function-calling stability, language coverage, and pricing.

## Component leaderboard (May 2026)

### TTS leaders

| Provider | Model | TTFA | Notes |
|---|---|---|---|
| [[Inworld AI]] | Realtime TTS 1.5 Max | P90 < 250ms | #1 Artificial Analysis ELO ~1208 |
| [[Cartesia]] | Sonic 3.5 | 40ms | State Space Model architecture; lowest TTFA |
| [[Hume AI]] | Octave 2 | < 300ms e2e | Emotional prosody control |
| [[ElevenLabs]] | Multilingual v3 | competitive | Voice library + cloning |
| Google | Gemini TTS | n/a | 75+ languages |
| OpenAI | tts-1-hd / gpt-realtime voices | n/a | 9 voices, bundled |

### STT leaders

- **Deepgram Nova-3** — streaming, ~150ms latency
- **AssemblyAI Universal-2** — streaming + diarization
- **OpenAI Whisper-large-v4** — batch gold standard
- **Google Speech-to-Text Chirp 2** — broad languages
- **NVIDIA Parakeet / Canary** — open-weight streaming

## Critical engineering concerns

### Barge-in (interruption)

User interrupts mid-response. System must, in under ~100ms:
1. Stop TTS audio playback.
2. Cancel in-flight LLM generation.
3. Reset conversation state — including the partial assistant turn in context.
4. Re-anchor to the user's new input.

Native S2S models often handle this internally; cascaded pipelines need explicit cancellation across all three stages.

### Endpointing (turn detection)

When does the user finish speaking?

| Method | Mechanism | Tradeoff |
|---|---|---|
| **VAD (Voice Activity Detection)** | Silence-threshold | Cheap; fooled by mid-thought pauses |
| **Prosody-based** | Sentence-final intonation detection | Better naturalness; used by Hume |
| **Model-based** | Small classifier predicts turn-end probability per chunk | Best accuracy; LiveKit smart-turn |
| **Push-to-talk** | Explicit user signal | Bypasses problem; UX cost |

### Transport

- **WebSocket** — easy to debug, traverses restrictive networks.
- **WebRTC** — media-grade jitter handling, NAT traversal, encrypted by default.
- **SIP / PSTN** — required for telephony, usually proxied via a WebRTC bridge.

### Function calling in realtime

Tool calls inject latency. Patterns:
- **Speculative speech** — say "let me check..." while the tool runs.
- **Parallel tool calls** — when calls are independent.
- **Cached / pre-computed responses** for common FAQ paths.
- **Tool call streaming** — emit partial tool call arguments as they're generated.

## Choosing an architecture

| Need | Pick |
|---|---|
| Maximum naturalness, warmth | Native S2S |
| Function-calling heavy | Cascaded |
| Telephony / IVR / compliance | Cascaded |
| Lowest cost at scale | Cascaded (LLM cost halved) |
| Emotional AI, companions | Native S2S (Hume) or cascaded + Hume Octave |
| 40+ languages | Cascaded with Google STT/TTS |
| Lowest TTFA, telephony hardware | [[Cartesia]] Sonic + lightweight LLM |
| Fastest to ship | [[OpenAI Realtime API]] or [[Inworld AI]] Realtime |

## Failure modes

- **TTS reads "*" or markdown** — sanitize text before TTS.
- **LLM refuses mid-conversation** — guard against safety responses breaking the flow.
- **Hallucinated tool call results** — model invents tool outputs when the actual call failed.
- **Sycophancy mid-call** — voice context amplifies agreement; deploy with the same guardrails as chat.
- **Cross-talk** — two participants talking simultaneously breaks single-channel ASR.
- **Code-switching** — multilingual speakers switching mid-sentence trip many ASR models.
- **Accent / dialect skew** — STT and TTS both biased toward US English.

## Connections

- [[Speech-to-Speech Models]] — the native-end-to-end model class
- [[Realtime API]] — the WebSocket/WebRTC streaming pattern
- [[Vision Language Models]] — adjacent multimodal pattern
- [[Multimodal Tokenization]] — how audio becomes tokens
- [[Intelligent Agents]] / [[Agentic Systems]] — voice agents are agents
- [[Agent Components]] — tools, memory, planning apply identically
- [[LLM Application Loop]] — voice is a deployment surface of the same loop
- [[Modality-as-Tokens]] — synthesis tying voice to the broader modality-token convergence
- [[2026-05-28-voice-agents-2026]] — source summary

## Open Questions

- Will open-weight native S2S models close the gap with OpenAI Realtime / Gemini Live?
- Best self-hostable voice agent stack for sub-1s TTFT?
- How to evaluate voice agents — current benchmarks (WER, MOS) miss conversational quality?
- Privacy-preserving voice agents — can the audio never leave the device?
