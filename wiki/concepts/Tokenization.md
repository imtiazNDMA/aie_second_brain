---
title: Tokenization
type: concept
tags: [nlp, preprocessing, text]
sources: [2026-04-12-build-llm-from-scratch]
created: 2026-04-12
updated: 2026-04-12
---

# [[Tokenization]]

The process of converting raw text into numerical tokens that models can process. [[Tokenization]] is the first step in any NLP pipeline and significantly impacts model performance.

## Methods

- **Word-level:** Split on whitespace/punctuation. Simple but large vocabularies.
- **Character-level:** Individual characters as tokens. Small vocabulary, but longer sequences.
- **Byte Pair Encoding (BPE):** Greedy merge algorithm starting from characters. Balances vocabulary size and subword meaning.
- **SentencePiece:** Language-agnostic tokenizer that learns vocabulary from raw text.

## Key Considerations

- Vocabulary size affects model capacity and inference speed
- Subword [[Tokenization]] handles out-of-vocabulary words better
- Tokenizer must match [[Pretraining]] for finetuning