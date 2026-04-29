---
title: Machine Translation
type: concept
tags: [nlp, seq2seq, transformer, translation]
sources: [nips-2017-attention-is-all-you-need-Paper.md]
created: 2026-04-29
updated: 2026-04-29
---

# Machine Translation

The task of automatically translating text from one natural language to another, historically one of the primary applications of sequence-to-sequence models and the Transformer architecture.

## Definition

Machine translation systems map sequences in a source language to sequences in a target language. The Transformer architecture was originally designed to improve machine translation performance through self-attention mechanisms replacing recurrent layers.

## Key Concepts

- **Sequence-to-Sequence (Seq2Seq)**: Encoder-decoder architecture for translation
- **Parallel Corpora**: Large aligned datasets of source-target sentence pairs
- **Beam Search**: Decoding algorithm to find high-probability translations
- **BLEU Score**: Metric for evaluating translation quality
- **Multilingual Models**: Single models handling multiple language pairs

## Related Concepts

- [[Transformer]] — Architecture that revolutionized machine translation
- [[Encoder]] — Processes source language sentence
- [[Decoder]] — Generates target language sentence
- [[Attention Mechanism]] — Enables decoder to focus on relevant source tokens
- [[Parallelization]] — Transformers enable parallel training for translation

## Sources

- [[nips-2017-attention-is-all-you-need-Paper.md]]: Transformer was evaluated on WMT 2014 English-to-German and English-to-French translation tasks

## Open Questions

- How do modern LLMs compare to specialized translation models?
- What challenges remain for low-resource language pairs?
