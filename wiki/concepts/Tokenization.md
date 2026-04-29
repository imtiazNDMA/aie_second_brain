---
title: Tokenization
type: concept
tags: [nlp, preprocessing, text]
sources: [2026-04-12-build-llm-from-scratch]
created: 2026-04-12
updated: 2026-04-13
---

# Tokenization

The process of converting raw text into numerical tokens that models can process. Tokenization is the first step in any NLP pipeline and significantly impacts model performance.

## Mathematical Formulation

### Byte Pair Encoding (BPE)

BPE builds vocabulary by greedily merging frequent adjacent pairs. Starting with character-level vocab:

**Algorithm:**
1. Initialize vocab $V$ with all unique characters
2. Count all adjacent pairs in corpus
3. Find most frequent pair $(b_1, b_2)$
4. Add merged token $(b_1, b_2)$ to vocab
5. Replace all $(b_1, b_2)$ sequences with new token
6. Repeat until $|V| = \text{target\_vocab\_size}$

**Frequency counting:**
$$\text{count}(x, y) = \sum_{w \in \text{corpus}} \sum_{i} [\text{concat}(w_i, w_{i+1}) = (x, y)]$$

### Unigram Language Model Tokenizer

Used by SentencePiece. Defines loss for each token:

$$\mathcal{L} = -\sum_{i=1}^{N} \log P(x_i | \mathbf{x}_{<i})$$

where $P$ is unigram (each token independent). The tokenizer keeps tokens with high contribution to likelihood.

### Token Embedding

After tokenization, each token maps to embedding:
$$\mathbf{e}_{token} = \mathbf{E}[token]$$

where $\mathbf{E} \in \mathbb{R}^{|V| \times d}$ is the embedding matrix.

### Impact on Sequence Length

Sequence length $L$ depends on tokenization method:

| Method | Typical tokens/word | Sequence length |
|--------|---------------------|-----------------|
| Word-level | 1 | Short |
| Character-level | 5-10 | Long |
| BPE (English) | 1.3-1.5 | Medium |
| BPE (morphological languages) | 2-4 | Medium-long |

### Subword Efficiency

For a word $w$ split into subwords $s_1, ..., s_k$:
$$\mathbf{e}_w = \frac{1}{k} \sum_{i=1}^{k} \mathbf{e}_{s_i}$$

This allows OOV handling through composition.

## Methods
- **Word-level:** Split on whitespace/punctuation. Simple but large vocabularies.
- **Character-level:** Individual characters as tokens. Small vocabulary, but longer sequences.
- **Byte Pair Encoding (BPE):** Greedy merge algorithm starting from characters. Balances vocabulary size and subword meaning.
- **WordPiece:** Used by BERT, similar to BPE but uses likelihood-based merge selection.
- **SentencePiece:** Language-agnostic tokenizer that learns vocabulary from raw text. Used by T5, LLaMA.

## LLM Tokenization (from [[Hands-On Large Language Models]])
### Token Types
Tokens can represent:
- Individual characters
- Words
- Subwords (most common in modern LLMs)
- Larger linguistic units

### Example: cl100k Tokenizer (GPT-3.5)
The phrase "good morning dearest friend" → 5 tokens:
- `Good` (ID: 19045)
- `_morning` (ID: 6693)
- `_de` (ID: 409)
- `arest` (ID: 15795)
- `_friend` (ID: 4333)

Average: ~1.3-1.5 tokens per word for English.

### Tokenization in LLM Training
- **Next token prediction**: $P(x_t | x_{<t})$ trained on token sequences
- **Masked language modeling**: Predict masked tokens (BERT)
- **Instruction tuning**: (instruction, response) pairs with tokenization
- **RLHF**: Reinforcement learning with token-level policy gradients

## Key Considerations

- Vocabulary size affects model capacity and inference speed
- Subword Tokenization handles out-of-vocabulary words better
- Tokenizer must match [[Pretraining]] for finetuning

## Related Concepts

- [[Embeddings]]
- [[Pretraining]]
- [[Fine-Tuning]]