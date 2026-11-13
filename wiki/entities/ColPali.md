---
tags: [entity, model, retrieval, vision, document-understanding]
sources: ["2026-09-12-vision-language-models-building-vlms"]
created: 2026-09-12
updated: 2026-09-12
---

# ColPali

Visual late-interaction retrieval model that replaces OCR → layout analysis → captioning → text embedding with a single visual encoder producing per-patch embeddings. Enables document retrieval based on visual layout and content without text extraction.

## Architecture

- **Visual encoder** — produces per-patch embeddings for document images
- **Query encoder** — encodes text queries into the same embedding space
- **MaxSim retrieval** — computes maximum similarity between query and patch embeddings
- **Late interaction** — aggregation happens at retrieval time, not encoding time

## Advantages over Text-Based RAG

| Aspect | Text RAG | ColPali |
|---|---|---|
| **Layout** | Lost in text extraction | Preserved in visual embeddings |
| **Tables** | May be malformed | Visually understood |
| **Charts** | Lost | Visually understood |
| **Handwriting** | OCR-dependent | Directly processed |
| **Multilingual** | Language-specific | Language-agnostic |

## Use Cases

- Document retrieval with complex layouts
- Form and invoice understanding
- Scientific paper retrieval with figures
- Multilingual document search

## Related

- [[Multimodal RAG]] — broader visual retrieval context
- [[Vision Language Models]] — VLM architectures
- [[Embeddings]] — vector representations
- [[Hybrid Search]] — combining retrieval methods
- [[Retrieval-Augmented Generation]] — RAG foundation
