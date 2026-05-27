# Log

## [2026-05-28] ingest | LLM Architecture Gallery — 22 model architectures + 11 primitives
Sebastian Raschka's LLM Architecture Gallery (https://sebastianraschka.com/llm-architecture-gallery/) ingested as the foundation for a new **`wiki/model-architectures/`** directory dedicated to per-model architectural deep-dives with block diagrams.

**New directory:** `wiki/model-architectures/` (22 pages — page type `model-architecture`).

**Architecture primitive concept pages — 11 new:**
- [[RMSNorm]], [[SwiGLU]], [[Multi-head Latent Attention]] (MLA), [[QK-Norm]], [[Sliding Window Attention]] (SWA), [[NoPE]], [[Multi-Token Prediction]] (MTP), [[State Space Models]], [[Mamba]], [[Linear Attention]], [[Parallel Attention and FFN]]

**Model architecture pages in `wiki/model-architectures/` — 22 new:**
- Historical anchor: [[GPT-2]]
- Dense modern: [[Llama 3]], [[OLMo 2]], [[OLMo 3]], [[Gemma 3]], [[Gemma 4]], [[Qwen3]], [[Mistral Small 3]], [[Phi-4]], [[Granite 4.1]]
- MoE frontier: [[Llama 4]], [[Mixtral]], [[DeepSeek-V3]], [[GPT-OSS]], [[Kimi K2]], [[GLM-4.5]], [[GLM-5]], [[Grok 2.5]], [[MiniMax-M2]], [[Command A]]
- Non-transformer / hybrid: [[xLSTM]], [[Nemotron 3]]

Note: [[DeepSeek-V3]], [[Llama 4]], and [[Mixtral]] now have BOTH an entity page (identity / org / impact in `wiki/entities/`) AND an architecture-focused companion in `wiki/model-architectures/` (full block diagrams + recipe details). Wikilinks resolve to either by Obsidian's page-name-based linking.

**Concept hub rewritten:** [[LLM Architecture]] — restructured as a proper hub with the universal skeleton, primitive-by-primitive recipe diff (GPT-2 → Llama 3 → DeepSeek-V3), and complete primitive + model index.

**Synthesis — 1 new:**
- [[LLM Architecture Landscape 2026]] — comparative grid across all 22 model architectures along 7 recipe axes (norm, attention, FFN sparsity, position, window, activation, blocks). The keystone synthesis for this ingest. Includes decision-guide for AI engineers.

**Source page — 1 new:**
- [[2026-05-28-raschka-llm-architecture-gallery]] — citing Raschka's gallery as the primary source.

**Counts:**
- Concepts: 268 → 279 (+11 primitives)
- Sources: 41 → 42 (+1 Raschka gallery)
- Syntheses: 24 → 25 (+1 landscape)
- **NEW SECTION: Model Architectures (0 → 22)**

**Thesis of the synthesis:** the transformer skeleton hasn't changed since 2019 — every modern LLM is still `Embed → N × (Norm + Attn + FFN with residuals) → LM head`. What changed is every component inside: LayerNorm → RMSNorm + QK-Norm overlay, MHA → GQA → MLA, GELU → SwiGLU, learned positions → RoPE → iRoPE + NoPE, dense FFN → sparse MoE with fine-grained experts and shared expert. The "Modality-as-Tokens" arc from the prior ingest layers on top of this same skeleton — multimodal trunks are the same architecture extended to image and audio tokens.

**Block diagrams:** every model-architecture page includes an ASCII/Unicode block diagram in a fenced code block, rendering correctly in Obsidian and any markdown viewer.

## [2026-05-28] ingest | 2026 Multimodal & Sparse-Model Survey (VLMs, Voice Agents, Diffusion, MoE)
Web-research ingest covering four 2026 frontier topics requested by user. Compiled four multi-source artifacts in `raw/inbox/` (Vision Language Models, Voice Agents, Diffusion Models, Mixture of Experts), then derived the wiki updates.

**Pages created (22):**
- Sources (4): [[2026-05-28-vision-language-models-2026]], [[2026-05-28-voice-agents-2026]], [[2026-05-28-diffusion-models-2026]], [[2026-05-28-mixture-of-experts-2026]]
- Concepts (6): [[Vision Language Models]], [[Voice Agents]], [[Mixture of Experts]], [[Diffusion Transformer]], [[Flow Matching]], [[Multimodal Tokenization]]
- Entities (11): [[Qwen2.5-VL]], [[InternVL]], [[DeepSeek-V3]], [[DeepSeek-VL2]], [[Llama 4]], [[Mixtral]], [[Mistral AI]], [[Flux.1]], [[Black Forest Labs]], [[Stable Diffusion 3]], [[Stability AI]], [[OpenAI Realtime API]], [[Hume AI]], [[Inworld AI]], [[Cartesia]]
- Synthesis (1): [[Modality-as-Tokens]] — cross-cutting "everything is a token stream" architectural convergence

**Pages updated (3):**
- [[Diffusion Models]] — added DiT/MMDiT/Flow Matching frontier section, expanded notable-models table, refreshed Connections
- [[Vision Transformer]] — fully rewritten from 25-line stub to full treatment (variants, use in VLMs, use in DiT, failure modes)
- [[CLIP]] — added SigLIP / InternViT / DINOv2 successors section, refreshed Connections

**Counts:**
- Entities: 134 → 149
- Concepts: 262 → 268
- Sources: 37 → 41
- Syntheses: 23 → 24

**Thesis of the synthesis:** four communities that look distinct in 2024 — VLMs, voice agents, diffusion, MoE LLMs — are converging on a single recipe in 2026: patchify or codec-encode any modality into a token sequence, run a transformer (sparse if large), condition on or emit another token stream. The synthesis page makes this explicit and cites the new concept pages as evidence.

## [2026-04-12] ingest | Building AI Coding Agents for the Terminal
Processed Building AI Coding Agents for the Terminal.pdf. Created 7 new pages, updated 0 existing pages.
New entities: [[Claude Code]], [[Anthropic]]. New concepts: [[AI Coding Agent]], [[Tool Use]], [[Reflection]], [[Agent Memory]].

## [2026-04-12] ingest | Building LLMs for Production
Processed Building LLMs for Production.pdf. Created 3 new pages, updated 0 existing pages.
New entities: [[Chip Huyen]] (already exists, added source). New concepts: [[Prompt Engineering]], [[Retrieval-Augmented Generation]].

## [2026-04-12] ingest | AI Agents in Action
Processed AI Agents in Action.pdf. Created 19 new pages, updated 4 existing pages.
New entities: [[Michael Lanham]], [[LM Studio]], [[AutoGen]], [[CrewAI]], [[AgentOps]], [[Semantic Kernel]], [[GPT Assistants Playground]], [[Nexus Agent Platform]].
New concepts: [[Agent Components]], [[AI Interface]], [[GPT Assistants]], [[Custom Actions]], [[Multi-Agent Systems]], [[OpenAI Function Calling]], [[Agentic Behavior Trees]], [[Prompt Flow]], [[LLM Evaluation Rubrics]], [[Reasoning Strategies]].

## [2026-04-12] ingest | Building Agentic AI Systems
Processed building agentic ai systems.pdf. Created 8 new pages, updated 0 existing pages.
New entities: [[Anjanava Biswas]], [[Wrick Talukdar]], [[LangGraph]]. New concepts: [[Generative AI]], [[Agentic Systems]], [[Coordinator-Worker-Delegator Model]], [[Agent Trust and Safety]].

## [2026-04-12] ingest | LLM Engineer's Handbook
Processed LLM Engineers Handbook.pdf. Created 13 new pages, updated 1 existing page.
New entities: [[Paul Iusztin]], [[Maxime Labonne]], [[ZenML]], [[Comet ML]], [[Opik]]. New concepts: [[LLM Twin]], [[Feature-Training-Inference Architecture]], [[Direct Preference Optimization]], [[Low-Rank Adaptation]], [[QLoRA]], [[Half Fine-Tuning]], [[Mixture of Agents]]. Updated [[Fine-Tuning]] with the structured lifecycle.

## [2026-04-12] ingest | Machine Learning Algorithms in Depth
Processed Machine Learning Algorithms in Depth.pdf. Created 12 new pages, updated 0 existing pages.
New entity: [[Vadim Smolyakov]]. New concepts: [[Markov Chain Monte Carlo]], [[Variational Inference]], [[Dirichlet Process K-Means]], [[Gaussian Mixture Model]], [[Latent Dirichlet Allocation]], [[Active Learning]], [[Bayesian Optimization]], [[Ensemble Methods]], [[Graph Neural Network]], [[Mixture Density Network]].

## [2026-04-12] ingest | [[Prompt Engineering]] for LLMs
Processed [[Prompt Engineering]] for llms.pdf. Created 5 new pages, updated 3 existing pages.
New entities: [[John Berryman]], [[Albert Ziegler]]. New concepts: [[SOMA Evaluation Framework]], [[LLM Application Loop]]. Updated [[Prompt Engineering]], [[RLHF]], and [[LLM Evaluation Rubrics]] with methodology from the book.

## [2026-04-12] ingest | RAG-Driven Generative AI
Processed RAG-driven generative ai.pdf. Created 9 new pages, updated 2 existing pages.
New entities: [[Denis Rothman]], [[LlamaIndex]], [[Deep Lake]], [[Pinecone]], [[Chroma]]. New concepts: [[Adaptive RAG]], [[Knowledge-Graph Indexing]], [[Dynamic RAG Collections]]. Updated [[Retrieval-Augmented Generation]] and [[Agent Memory]] with Deep Lake/[[Pinecone]]/[[Chroma]] guidance.

## [2026-04-12] ingest | The Ultimate Guide to [[Fine-Tuning]] LLMs
Processed The ultimate guide to fine tuning.pdf. Created 3 new pages, updated 2 existing pages.
New entity: [[CeADAR Connect Group]]. New concept: [[Seven-Stage Fine-Tuning Pipeline]]. Updated [[Fine-Tuning]] and [[RLHF]] with lifecycle, PEFT, and safety insights.

## [2026-04-12] ingest | Attention Is All You Need
Processed attention-is-all-you-need.pdf. Created 4 new pages, updated 3 existing pages.
New concepts: [[Self-Attention]], [[Multi-Head Attention]], [[Scaled Dot-Product Attention]]. Updated [[Transformer]], [[Attention Mechanism]], and [[Positional Encoding]] with [[Transformer]]-specific details.

## [2026-04-12] lint | Health check
Found 23 errors, 2 warnings, and 2 info items. Fixed: normalized wikilink casing, added concepts ([[AI Engineering]], [[Parameter-Efficient]], [[RAG Evaluation]]), created synthesis [[Agent Orchestration Platforms]], and updated cross-references.

## [2026-04-12] synthesis | Additional comparisons
Created synthesis pages [[Parameter-Efficient Fine-Tuning]], [[RAG Evaluation Playbook]], [[Prompt Evaluation Workflows]], [[Agent Memory Architectures]], and [[Agent Trust and Safety Controls]] to capture cross-source workflows.

## [2026-04-12] ingest | 14 Types of RAG
Processed 14 types of RAG (Retrieval-Augmented Generation).md. Created 4 new pages, updated 1 existing page.
New entity: [[Meilisearch]]. New concepts: [[Graph RAG]], [[Self-RAG]]. Updated [[Retrieval-Augmented Generation]] with taxonomy insights.

## [2026-04-12] ingest | Deep Learning with [[PyTorch]] (Essential Excerpts)
Processed Deep Learning with [[PyTorch]]_ Essential Excerpts 2019.pdf. Created 7 new pages, updated 0 existing pages.
New entities: [[Eli Stevens]], [[Luca Antiga]]. New concepts: [[PyTorch]], [[PyTorch Tensor]], [[Autograd]], [[Torch NN Module]].

## [2026-04-12] structure | Code Examples directory
Created wiki/code-examples/ with [[Code Examples Overview]] to host runnable snippets alongside concepts/syntheses.

## [2026-04-12] code-example | [[PyTorch Linear Regression]]
Added [[PyTorch Linear Regression]] walkthrough demonstrating tensors, [[Autograd]], and `torch.nn` training loop for a simple regression task.

## [2026-04-12] code-example | PyTorch Tensor & TorchScript
Added [[PyTorch Tensor Basics]] cheatsheet and [[PyTorch TorchScript Export]] deployment demo to round out the code-examples directory with tensor fundamentals and production workflows.

## [2026-04-12] code-example | RAG & Prompt Flow
Added [[LangChain Mini RAG Pipeline]] (Python ingestion/embedding/retrieval) and [[Prompt Flow SOMA Evaluation]] (Prompt Flow DAG + SOMA grader) to extend the snippet catalog beyond PyTorch.

## [2026-04-12] synthesis | LLM Ops & RAG Decisions
Created [[LLM Ops Toolchain]] and [[RAG Architecture Decision Guide]] to map tooling choices and 14-style RAG variants; added supporting pages [[LangChain]] and [[TorchScript]].

## [2026-04-13] lint | Health check
Found 0 errors, 2 warnings, 2 info items. Fixed: created dedicated concept pages [[Embeddings]] and [[Reranking]] with mathematical foundations; added to index.

## [2026-04-13] concepts | Mathematical depth
Added detailed mathematical derivations to [[Transformer]] (encoder/decoder blocks, FFN, LayerNorm, computational complexity table) and [[Scaled Dot-Product Attention]] (full matrix form, softmax derivation, scaling factor justification).

## [2026-04-13] concepts | Additional mathematical depth
Added comprehensive mathematical formulations to [[Variational Inference]] (ELBO derivation, mean-field approximation, reparameterization trick, VAE objective), [[Positional Encoding]] (sinusoidal formulas, RoPE rotation matrices), and [[Multi-Head Attention]] (per-head projections, concatenation, parameter budget table).

## [2026-04-13] concepts | Alignment & PEFT mathematical depth
Added full mathematical derivations to [[RLHF]] (reward model Bradley-Terry loss, PPO clipped objective, KL penalty), [[Low-Rank Adaptation]] (LoRA weight updates, gradient flow, parameter count table, QLoRA), and [[Direct Preference Optimization]] (preference loss with sigmoid, equivalence to RLHF, policy gradient interpretation).

## [2026-04-13] concepts | Quantization, clustering & sampling mathematical depth
Added full mathematical formulations to [[QLoRA]] (4-bit quantization, dequantization for forward pass, memory analysis table, quantization error), [[Gaussian Mixture Model]] (EM algorithm with E-step responsibilities, M-step parameter updates, likelihood), and [[Markov Chain Monte Carlo]] (Metropolis-Hastings acceptance ratio, detailed balance, Gibbs sampling, ESS diagnostics).

## [2026-04-13] concepts | Tokenization, inference & hyperparameter optimization
Added mathematical derivations to [[Tokenization]] (BPE algorithm with pair frequency, unigram loss, sequence length comparison table, subword embedding composition), [[Inference Optimization]] (quantization precision table, pruning with threshold, knowledge distillation with KL divergence, KV cache for autoregressive generation, batching throughput), and [[Bayesian Optimization]] (GP posterior formulas, squared exponential and Matern kernels, EI/UCB/PI acquisition functions).

## [2026-04-13] lint | Health check
Found 0 errors, 0 warnings, and 2 info items. Fixed: renamed synthesis files to match wikilinks and normalized remaining lowercase link variants.

## [2026-04-13] concepts | Active learning, ensembles & GNNs
Added mathematical derivations to [[Active Learning]] (uncertainty sampling with entropy, QBC with vote entropy, expected model change, pool-based sampling loop), [[Ensemble Methods]] (bias-variance decomposition, bagging variance reduction, AdaBoost weights and training error bound, stacking, random forest feature importance), and [[Graph Neural Network]] (message passing framework, GCN mean aggregation matrix form, GraphSAGE aggregators, GAT attention weights, spectral convolution with graph Fourier transform).

## [2026-04-13] concepts | RAG variants
Created concept pages [[Corrective RAG]], [[HyDE]], [[Speculative RAG]], [[Modular RAG]], [[Memory-Augmented RAG]], and [[Branched RAG]] to cover the remaining patterns from [[2026-04-12-14-types-of-rag]]. Updated [[index]] with the new entries.

## [2026-04-13] entities | RAG tooling
Added entity pages [[Weaviate]], [[Faiss]], and [[Haystack]] to capture the vector search/tooling providers referenced in [[2026-04-12-14-types-of-rag]]. Updated [[index]] accordingly.

## [2026-04-13] concepts | Transformer internals + deployment
Captured missing internals from [[2026-04-12-build-llm-from-scratch]] by adding [[Rotary Position Embeddings]] and [[Grouped-Query Attention]]. Documented [[TorchServe]] as the deployment runtime stemming from [[2026-04-12-deep-learning-with-pytorch]].

## [2026-04-13] concepts | Fine-tuning safety stack
Added [[DoRA]] (Dimension-wise Offset of Residual Adapter) and [[WebGPU]] concepts plus classical optimization entries [[Simulated Annealing]] and [[Genetic Algorithms]] to cover references from [[2026-04-12-ultimate-guide-fine-tuning]] and [[2026-04-12-ml-algorithms-in-depth]].

## [2026-04-13] entities | Safety + inference tooling
Created pages for [[Llama Guard]], [[Shield Gemma]], [[WILDGUARD]], [[vLLM]], and [[Nghi D. Q. Bui]] to complete the safety/evaluation stack cited in [[2026-04-12-ultimate-guide-fine-tuning]] and [[2026-04-12-building-ai-coding-agents-terminal]].

## [2026-04-13] entities | Platforms & authors
Documented industrial platforms ([[Hugging Face Hub]], [[Qdrant]], [[Hugging Face Autotrain]], [[Transformers Trainer API]], [[Optimum]], [[SageMaker JumpStart]], [[Amazon Bedrock]], [[NVIDIA NeMo]]) and added transformer co-author entities ([[Ashish Vaswani]], [[Noam Shazeer]], [[Niki Parmar]], [[Jakob Uszkoreit]], [[Llion Jones]], [[Aidan Gomez]], [[Lukasz Kaiser]], [[Illia Polosukhin]]).

## [2026-04-13] lint | Wikilink cleanup
Normalized wikilink casing (e.g., [[AI Engineering]], [[Autograd]]), fixed lower-case references in code examples, removed duplicate root-level `index.md`/`log.md`, and created the [[Vector Database]] concept so all tools mentioned in RAG sources have dedicated pages.

## [2026-04-13] lint | Health check
Found 0 errors, 2 warnings, 2 info items. Flagged the orphan `log.md` page and the mismatched entity count in `wiki/index.md`; identified cross-reference opportunities for [[Vector Database]] and highlighted coverage gaps around safety evaluation benchmarks. No fixes applied yet.

## [2026-04-16] ingest | System Design Interview - The Complete Guide to System Design
Processed SYSTEM DESIGN INTERVIEW_ The Complete Guide to System Design.pdf. Created 18 new pages, updated 2 existing pages.
New entities: [[Richard Johnson]], [[Redis]], [[Riak]], [[Oracle NoSQL Database]], [[Apache ZooKeeper]], [[Twitter Snowflake]].
New concepts: [[System Design Interviews]], [[High Availability]], [[Load Balancing]], [[Consistent Hashing]], [[Rate Limiting]], [[Service Discovery]], [[Fanout]], [[Message Ordering]], [[Caching]].
Added a graphics catalog for this source (removed on 2026-04-16 during graphics-folder cleanup).

## [2026-04-16] ingest | Grokking the Advanced System Design Interview
Processed Grokking the Advanced System Design Interview.pdf. Created 25 new pages, updated 4 existing pages.
New entities: [[Amazon Dynamo]], [[Apache Cassandra]], [[Apache Kafka]], [[Chubby]], [[Google File System]], [[Hadoop Distributed File System]], [[Google Bigtable]].
New concepts: [[Bloom Filters]], [[Quorum]], [[Leader-Follower Replication]], [[Write-Ahead Log]], [[Hinted Handoff]], [[Read Repair]], [[Vector Clocks]], [[Merkle Trees]], [[Gossip Protocol]], [[High-Water Mark]], [[Split Brain]], [[Fencing]], [[Lease]], [[Checksum]], [[CAP Theorem]], [[PACELC Theorem]].
Added a graphics catalog for this source (removed on 2026-04-16 during graphics-folder cleanup).

## [2026-04-16] lint | Graph/link hygiene + eval metrics
Fixed malformed triple-bracket wikilinks in clippings that could create stray graph nodes (e.g., `[adaptive rag`). Added evaluation metric concepts [[BLEU]], [[ROUGE]], and [[Perplexity]], and linked them from [[Model Evaluation]] / [[RAG Evaluation]]. Updated [[index]] counts.

## [2026-04-16] ingest | System Design on AWS
Processed system design on aws.pdf. Created 25 new pages, updated 7 existing pages.
New entities: [[Jayanth Kumar]], [[Mandeep Singh]], [[Amazon VPC]], [[Amazon Route 53]], [[Amazon API Gateway]], [[Amazon CloudFront]], [[Amazon S3]], [[Amazon EC2]], [[AWS Lambda]], [[Amazon DynamoDB]], [[Amazon Kinesis]], [[AWS Identity and Access Management]].
New concepts: [[Blast Radius]], [[Day 0 Architecture]], [[Day N Architecture]], [[Choreography]], [[Orchestration]], [[Circuit Breaker]], [[CQRS]], [[Saga Pattern]], [[Fault Tolerance]], [[Event-Driven Architecture]], [[Retry with Backoff]].
Added a graphics catalog for this source (removed on 2026-04-16 during graphics-folder cleanup). Media attachments were omitted by design.

## [2026-04-16] ingest | Deep Learning with PyTorch Step-by-Step
Processed Deep learning with pytorch step by step.pdf. Created 26 new pages, updated 7 existing pages.
New entities: [[Daniel Voigt Godoy]], [[TensorBoard]], [[Torchvision]], [[ImageNet]], [[AlexNet]], [[VGG]], [[Inception]], [[ResNet]].
New concepts: [[Transfer Learning]], [[Batch Normalization]], [[Gradient Clipping]], [[Teacher Forcing]], [[Sequence-to-Sequence Learning]], [[Learning Rate Scheduling]], [[Residual Connections]], [[Vision Transformer]], [[Convolution]], [[Recurrent Neural Network]], [[Gated Recurrent Unit]], [[Long Short-Term Memory]], [[CUDA]], [[DataLoader]], [[TensorDataset]], [[Confusion Matrix]].
Added a graphics catalog for this source (removed on 2026-04-16 during graphics-folder cleanup). Media attachments were omitted by design.

## [2026-04-16] cleanup | Remove graphics folder
Removed `wiki/graphics/` and deleted all graphics index pages. Updated source pages, `wiki/index.md`, and `wiki/log.md` to remove links to graphics pages.

## [2026-04-16] planning | AI Engineer second-brain roadmap
Created a phased execution system for building a complete AI-engineer second brain.
Added overview pages: [[AI Engineer Master Roadmap]], [[AI Engineer Career OS]], [[AI Engineer Skills Matrix]], [[AI Engineer 90-Day Plan]], [[AI Engineer Weekly Review]], [[AI Engineer Project Tracker]], [[AI Engineer Learning-to-Build Map]], [[AI Engineer Portfolio Blueprint]], and [[AI Engineer Gap Analysis]].
Updated `wiki/index.md` with a new Overviews section.

## [2026-04-16] planning | RAG project week-1 execution
Created [[RAG Evaluation System]] with an 8-hour week-1 checklist, weekly time-boxing, and a concrete project-spec template.
Updated [[AI Engineer Project Tracker]] to mark the RAG project as In Progress.

## [2026-04-16] planning | Read-implement trackers for all flagship projects
Created execution trackers: [[RAG Evaluation System Read-Implement Tracker]], [[Agentic Workflow Engine Read-Implement Tracker]], [[Fine-Tuning Lab Read-Implement Tracker]], and [[Inference API and Ops Read-Implement Tracker]].
Updated [[AI Engineer Project Tracker]] evidence links to these trackers and expanded `wiki/index.md` Overviews.
## [2026-04-29] ingest | LLMOps: Managing Large Language Models in Production
Processed LLMOps_ Managing Large Language Models in Production.md. Created 14 new pages, updated 11 existing pages.
New entities: [[Abi Aryan]], [[O'Reilly Media]], [[EDT&Partners]], [[Microsoft]], [[UCLA Cognitive Systems Lab]], [[Judea Pearl]], [[vLLM]], [[Semantic Kernel]], [[Jenkins]], [[ZeRO]], [[DeepSpeed]]. New concepts: [[LLMOps]], [[Agentic Systems]], [[Retrieval-Augmented Generation]], [[Prompt Engineering]], [[Fine-Tuning]], [[MLOps]].

## [2026-04-29] lint | Health check
Found 14 errors, 6 warnings, and 4 info items. Fixed: renamed lowercase files to Title Case (embeddings→Embeddings, reranking→Reranking, llmops→LLMOps), deleted duplicate attention-mechanism.md, created missing pages (LLMSecOps.md, Agent Components.md, Causality.md, Reflective Intelligence.md), fixed broken wikilinks ([[Low-Rank Adaptation]] and [[Retrieval-Augmented Generation]] references), removed piped link syntax, updated index.md with correct counts (Entities: 43, Concepts: 83), created wiki/overviews/ directory.

## [2026-04-29] ingest | Hands-on Machine Learning with Python
Processed Hands-on Machine Learning with Python.pdf. Created 2 new entities, 7 new concept pages, updated 0 existing pages.
New entities: [[Ashwin Pajankar]], [[Aditya Joshi]]. New concepts: [[Remember-Formulate-Predict Framework]], [[Logistic Regression]], [[Naive Bayes]], [[Linear Regression]] (updated), [[Decision Trees]] (updated), [[Ensemble Methods]] (updated), [[Support Vector Machines]] (updated).

## [2026-04-29] ingest | Hands-On Large Language Models
Processed Hands-On Large Language Models.pdf. Created 2 new entities, 3 new concept pages, updated 3 existing pages.
New entities: [[Jay Alammar]], [[Maarten Grootendorst]]. New concepts: [[LLM Architecture]], [[Runnable Interface]]. Updated [[Transformer]], [[Tokenization]], [[Retrieval-Augmented Generation]] with new information.

## [2026-04-29] ingest | Grokking Machine Learning
Processed Grokking Machine Learning.pdf. Created 1 new entity, 1 new concept page, updated 0 existing pages.
New entity: [[Luis Serrano]]. New concept: [[Remember-Formulate-Predict Framework]].

## [2026-04-29] ingest | Learning LangChain
Processed Learning LangChain.pdf. Created 3 new entities, 1 new concept page, updated 1 existing page.
New entities: [[Mayo Oshin]], [[Nuno Campos]], [[LangSmith]]. New concept: [[Runnable Interface]]. Updated [[Retrieval-Augmented Generation]] with LangChain patterns.

## [2026-04-29] ingest | Self-RAG Paper
Processed Self-RAG.pdf. Created 2 new entities, 2 new concept pages, updated 1 existing page.
New entities: [[Akari Asai]], [[Hannaneh Hajishirzi]]. New concepts: [[Reflection Tokens]], [[Adaptive Retrieval]]. Updated [[Self-RAG]] with detailed information.

## [2026-04-29] ingest | Graph RAG Survey
Processed Graph Retrieval-Augmented Generation Survey.pdf. Created 2 new entities, 1 new concept page, updated 1 existing page.
New entities: [[Boci Peng]], [[Siliang Tang]]. New concept: [[Graph RAG]] (enhanced with survey coverage). Updated [[Retrieval-Augmented Generation]] with GraphRAG details.

## [2026-04-29] ingest | RAG Survey
Processed Retrieval-Augmented Generation for Large Language Models Survey.pdf. Created 2 new entities, 2 new concept pages, updated 2 existing pages.
New entities: [[Yunfan Gao]], [[Haofen Wang]]. New concepts: [[Advanced RAG]], [[Modular RAG]]. Updated [[Retrieval-Augmented Generation]], [[Transformer]] with paradigm evolution.

## [2026-04-29] ingest | VERA Paper
Processed VERA.pdf. Created 0 new entities, 3 new concept pages, updated 1 existing page.
New concepts: [[VERA]], [[Response Adherence]], [[Context Relevance]], [[Response Relevance]]. Updated [[Retrieval-Augmented Generation]] with VERA system details.

## [2026-04-29] index | Updated counts
Updated index.md with all new pages: Entities: 53, Concepts: 95, Sources: 24.

## [2026-04-29] lint | Health check - fix pass 2
Found broken wikilinks and missing pages. Fixed: renamed entity files to Title Case (Abi Aryan.md, EDT&Partners.md, Jenkins.md, Michael Lanham.md, Microsoft.md, O'Reilly Media.md, Judea Pearl.md, UCLA Cognitive Systems Lab.md, DeepSpeed.md, vLLM.md, ZeRO.md), fixed piped wikilinks in O'Reilly Media.md and Semantic Kernel.md, created missing concept pages (Linear Regression, Decision Trees, Support Vector Machines, Ensemble Methods, PyTorch Tensor, Autograd, Torch NN Module, Knowledge Graphs, Graph Neural Network, Machine Translation, Encoder, Decoder, Tool Use, Reflection, Overfitting), updated index.md with correct concept count (107). Added all new entity/concept/source entries with proper wikilinks.

## [2026-04-29] lint | Health check
Found 12 errors, 3 warnings, 3 info items. Fixed: none.

## [2026-04-29] lint | Health check
Found 0 errors, 0 warnings, 0 info items. Fixed: resolved merge conflicts, normalized wikilinks, created missing entity/concept pages for unresolved targets, regenerated wiki/index.md, and repaired malformed frontmatter.

## [2026-04-29] ingest | Building LLM Agents with RAG, Knowledge Graphs and Reflection
Processed building llm agents.pdf. Created 4 new pages, updated 7 existing pages.
New entity: [[Mira S. Devlin]]. New concepts: [[R3A Loop]], [[Planner-Executor-Evaluator Pattern]].
New source pages: [[2026-04-29-building-llm-agents-rag-knowledge-graphs-reflection]], [[2026-04-29-building-applications-with-ai-agents]].
Updated concepts: [[Agentic Systems]], [[Graph RAG]], [[Multi-Agent Systems]], [[Agent Memory]], [[Reflection]], [[Retrieval-Augmented Generation]], [[Knowledge Graphs]].

## [2026-04-29] index | Updated counts
Updated `wiki/index.md` with latest ingest additions: Entities: 119, Concepts: 198, Sources: 31.

## [2026-04-29] lint | Health check
Found 0 errors, 0 warnings, and 0 info items.
Fixed: repaired three malformed/truncated wikilink descriptions in `wiki/index.md`; verified all index wikilinks resolve to existing pages.

## [2026-04-29] ingest | Hands-on AIOps: Best Practices Guide to Implementing AIOps
Processed annas-arch-37ca78a111a1.pdf. Created 4 new pages, updated 2 existing pages.
New entities: [[Navin Sabharwal]], [[Gaurav Bhardwaj]]. New concept: [[AIOps]].
New source page: [[2026-04-29-hands-on-aiops-best-practices-guide-to-implementing-aiops]].
Updated: [[LLMOps]] concept and [[2026-04-29-llmops-managing-large-language-models-in-production]] source metadata to include PDF provenance.

## [2026-04-29] synthesis | AIOps x LLMOps
Created [[AIOps-LLMOps Convergence for Agent Operations]] to map joint operations patterns for agentic production systems.

## [2026-04-29] index | Updated counts
Updated `wiki/index.md` with latest ingest additions: Entities: 121, Concepts: 199, Sources: 32, Syntheses: 9.

## [2026-04-29] refinement | AIOps metrics + cross-links
Enhanced [[AIOps]] with an operational scorecard (MTTR, alert precision, false-positive rate, recurrence, automation safety) and explicit evaluation mapping to [[ML Monitoring]], [[RAG Evaluation]], and [[LLM Evaluation Rubrics]].
Strengthened graph connectivity by linking [[AIOps-LLMOps Convergence for Agent Operations]] from [[LLMOps]], [[Agentic Systems]], [[ML Monitoring]], and [[RAG Evaluation Playbook]].

## [2026-04-29] overview | Wiki operations hub
Created [[Wiki Operations]] to centralize ingest/lint/index maintenance workflow and link operational artifacts ([[index]], [[log]]).

## [2026-04-30] audit | Parallel gap audit across all raw sources
Dispatched 6 parallel audit agents reviewing all 27 PDFs in `raw/source/` against existing 320 wiki pages to identify missing concepts/entities. Audits grouped by theme (RAG, agents, LLM-engineering, deep-learning/ML, system-design, AIOps + mystery PDFs).
Verified one source still unprocessed: `building ai agents with LLMs.pdf` (Raieli & Iuculano, Packt 2025) — deferred to a separate ingest run.
Confirmed `annas-arch-4a596d7d2fe8.pdf` is the same content as the already-ingested LLMOps book by Abi Aryan (.md version was processed, PDF is the original).
Audit report identified ~95 new pages and ~15 enrichment targets across distributed systems, agent reasoning patterns, RAG sub-techniques, inference optimization, alignment variants, generative ML, AWS services, evaluation benchmarks, and foundational ML researchers.

## [2026-04-30] ingest | Tier 1 gap-fill — agent reasoning + RAG + inference + alignment
Created 15 new concept pages with full mathematical/architectural depth and dense cross-linking:
- **Agent reasoning patterns**: [[ReAct]], [[Chain-of-Thought]], [[Tree-of-Thought]], [[Self-Consistency]], [[Reflexion]]
- **RAG sub-techniques**: [[Query Rewriting]], [[RAG-Fusion]], [[Step-Back Prompting]], [[RARR]]
- **Inference optimization**: [[Speculative Decoding]], [[FlashAttention]], [[Paged Attention]]
- **Alignment variants**: [[ORPO]], [[KTO]]
- **Production architecture**: [[Compound AI Systems]]
Updated [[index]] concept count from 199 to 214. Each page links bidirectionally with its neighbors and to existing infrastructure pages ([[Reasoning Strategies]], [[Inference Optimization]], [[Retrieval-Augmented Generation]], [[Fine-Tuning]], [[vLLM]], [[Claude Code]], [[LangChain]], etc.).

## [2026-04-30] ingest | Tier 2 gap-fill — observability + evaluation + distributed systems + generative ML
Created 12 additional concept pages prioritized by relevance to the AI Engineer roadmap projects:
- **Production observability**: [[SLI SLO SLA]], [[Error Budget]]
- **LLM evaluation**: [[LLM-as-Judge]], [[MT-Bench]], [[MMLU]], [[GSM8K]]
- **Distributed-systems foundations**: [[Sharding]], [[Linearizability]], [[Eventual Consistency]], [[LSM Tree]]
- **Generative ML foundations**: [[Generative Adversarial Network]], [[Diffusion Models]]
Updated [[index]] concept count from 214 to 226. Each page includes mathematical formulations where appropriate (GAN minimax + WGAN-GP, diffusion forward/reverse process + score-based perspective, RRF score for fusion, online softmax for FlashAttention, prospect-theory loss for KTO, odds-ratio loss for ORPO, etc.) and dense cross-links into the existing graph ([[CAP Theorem]], [[Saga Pattern]], [[Vector Database]], [[Retrieval-Augmented Generation]], [[Fine-Tuning]], [[Reasoning Strategies]]).

## [2026-05-09] lint | Health check after external research ingest
Ran full audit (broken wikilinks, orphans, index consistency, cross-references, missing pages) immediately after the 5-paper ingest.

**Errors**: 0 — no broken index pointers, no contradictions, all 414 wiki files have index entries.

**Warnings (4 broken wikilinks introduced this session, all fixed)**:
- Created [[Long Context Models]] (concept) — substantive page; CAG depends on it
- Created [[Distillation]] (concept) — substantive page covering classical KD + 2025 reasoning-distillation wave (R1 family + s1)
- Created [[MetaGPT]] (entity) — multi-agent framework, mapped to the 5-axis taxonomy
- Created [[Large Language Models]] (concept hub) — links the architecture/training/inference/capability layers

**Pre-existing broken wikilinks**: 50 still remain from the 2026-04-30 deferred list (Yann LeCun, Geoffrey Hinton, HELM, FSDP, Raft, Paxos, etc.). Not addressed in this lint pass; deferred to a future ingest.

**Info — 10 missing cross-references applied**:
- [[Reasoning Strategies]] → [[Reasoning Models]], [[Test-Time Compute Scaling]] (prompted vs trained reasoning section)
- [[Compound AI Systems]] → [[Reasoning Models]], [[Budget Forcing]] (test-time compute pattern enrichment)
- [[Direct Preference Optimization]] → [[GRPO]], [[RLVR]], [[ORPO]], [[KTO]] (alignment-algorithm family section)
- [[Self-Consistency]] → [[Test-Time Compute Scaling]], [[Reasoning Models]], [[Budget Forcing]] (parallel-sampling family member framing)
- [[Tree-of-Thought]] → [[Test-Time Compute Scaling]], [[Reasoning Models]], [[Budget Forcing]] (search-based family member framing)
- [[Reflexion]] → [[Test-Time Compute Scaling]], [[Reasoning Models]], [[Budget Forcing]], [[RLVR]] (iterative-retry family member framing)
- [[Chain-of-Thought]] → [[Reasoning Models]], [[Test-Time Compute Scaling]], [[Budget Forcing]] (prompted vs trained CoT section)
- [[Hannaneh Hajishirzi]] → [[2026-05-09-s1-test-time-scaling]] source added (she's a co-author)
- [[AIOps-LLMOps Convergence for Agent Operations]] → [[LLM4AIOps]] (third leg of convergence section)
- [[RAG Architecture Decision Guide]] → [[Cache-Augmented Generation]], [[KV Cache]], [[Long Context Models]] (corpus-size decision criterion table)

**Index counts**: Entities 132 → 133. Concepts 236 → 239. Total wiki pages now 437 → 441.

**Graph health**: Reasoning-models cluster is now reachable from every node in the prompted-reasoning cluster (CoT, Self-Consistency, ToT, Reflexion). CAG is reachable from the RAG decision guide. LLM4AIOps is reachable from the AIOps convergence synthesis. Test-Time Compute Scaling has 13 inbound links (up from 10).

## [2026-05-09] ingest | External 2024–2026 research wave — CAG, DeepSeek-R1, s1, multi-agent survey, LLM4AIOps survey
Fetched and ingested 5 high-impact recent papers from arXiv targeting explicit gaps in the wiki (per the 2026-04-30 audit's deferred list and a fresh review):

**Sources created (5)**:
- [[2026-05-09-cache-augmented-generation]] — Chan et al., "Don't Do RAG: When Cache-Augmented Generation is All You Need", WWW 2025 (arXiv:2412.15605)
- [[2026-05-09-deepseek-r1]] — DeepSeek-AI, "Incentivizing Reasoning Capability in LLMs via RL", *Nature* 645:633-638 (2025) (arXiv:2501.12948)
- [[2026-05-09-s1-test-time-scaling]] — Muennighoff et al., "s1: Simple test-time scaling", EMNLP 2025 (arXiv:2501.19393)
- [[2026-05-09-multi-agent-collaboration-survey]] — Tran et al., "Multi-Agent Collaboration Mechanisms: A Survey of LLMs" (arXiv:2501.06322, 2025)
- [[2026-05-09-llm-aiops-survey]] — Zhang et al., "A Survey of AIOps in the Era of Large Language Models", ACM Computing Surveys (accepted, 2025) (arXiv:2507.12472)

**New concept pages (10)**:
- Paradigm-level RAG counterpart: [[Cache-Augmented Generation]], [[KV Cache]] (foundational, was missing)
- Reasoning-models cluster: [[Reasoning Models]] (hub), [[GRPO]], [[RLVR]], [[Test-Time Compute Scaling]], [[Budget Forcing]]
- Multi-agent: [[Multi-Agent Collaboration]] (5-axis taxonomy), [[Coopetition]] (named as first-class collaboration type)
- AIOps: [[LLM4AIOps]] (LLM-era discipline)

**New entity pages (11)**:
- Organization: [[DeepSeek-AI]]
- Model entity: [[DeepSeek-R1]]
- Stanford reasoning-paper authors: [[Niklas Muennighoff]], [[Tatsunori Hashimoto]], [[Percy Liang]], [[Li Fei-Fei]]
- CAG authors: [[Brian J Chan]], [[Hen-Hsen Huang]]
- Survey leads: [[Khanh-Tung Tran]], [[Lingzhe Zhang]]
- Foundational researcher (closes 2026-04-30 deferred-list gap): [[Philip S. Yu]]

**Existing pages enriched (5)**:
- [[Retrieval-Augmented Generation]] — added CAG as paradigm-level alternative; updated sources frontmatter
- [[RLHF]] — added RLVR contrast section; head-to-head table; references DeepSeek-R1's four-stage pipeline
- [[AIOps]] — added LLM-era reframe section per the 2025 ACM CSUR survey; new task taxonomy and operational risks
- [[Inference Optimization]] — added counterpoint section on test-time compute scaling; cross-linked KV Cache, Budget Forcing, CAG
- [[Multi-Agent Systems]] — added 5-axis taxonomy reference; cross-linked Multi-Agent Collaboration and Coopetition

**Index counts**: Entities 121 → 132. Concepts 226 → 236. Sources 32 → 37. Total wiki pages touched: 31.

**Gaps closed** (per 2026-04-30 audit deferred list): foundational ML researcher (Philip S. Yu); reasoning-models cluster (entire category was missing); CAG paradigm; LLM4AIOps task taxonomy.

**Still deferred for future passes**: full ingest of `building ai agents with LLMs.pdf` (still unprocessed); remaining foundational researchers ([[Yann LeCun]], [[Yoshua Bengio]], [[Geoffrey Hinton]], [[Andrej Karpathy]], etc.); additional distributed-systems primitives; further inference optimizations ([[Continuous Batching]], [[KV Cache Compression]] — though KV Cache itself is now created).

## [2026-04-30] note | Deferred items for next-pass ingest
Deferred to a follow-up run:
- **Full ingest of `building ai agents with LLMs.pdf`** (Raieli & Iuculano, Packt 2025) — confirmed unprocessed; covers transformers, LLMs as reasoning engines, multi-agent orchestration, RAG, evaluation. Estimated 10–15 page contributions.
- **Foundational ML researchers**: [[Yann LeCun]], [[Yoshua Bengio]], [[Geoffrey Hinton]], [[Andrej Karpathy]], [[Jürgen Schmidhuber]], [[Sepp Hochreiter]], [[Michael I. Jordan]], [[David Blei]], [[Leslie Lamport]], [[Martin Fowler]], [[François Chollet]] — all referenced in source pages but missing dedicated entity pages.
- **Additional distributed-systems primitives**: [[Raft]], [[Paxos]], [[B-Tree]], [[Two-Phase Commit]], [[CRDT]], [[Cache Stampede]], [[Change Data Capture]], [[Watermarks]], [[Exactly-Once Semantics]], [[Well-Architected Framework]].
- **Additional inference optimizations**: [[Continuous Batching]], [[KV Cache Compression]] (the latter ties into existing [[KV Cache]] page).
- **Additional generative ML**: [[U-Net]], [[Variational Autoencoder]] (deeper than the existing [[Variational Inference]] page), [[Normalizing Flows]].
- **Additional training infrastructure**: [[PyTorch Lightning]], [[FSDP]], [[Mixed Precision Training]], [[Gradient Checkpointing]], [[ZeRO Stages]] (enrichment of existing [[ZeRO]] page).
- **Additional AWS service entities**: SQS, SNS, RDS, ElastiCache, Auto Scaling, ELB family, Step Functions, EventBridge, Aurora.
- **Page enrichments**: [[AIOps]] needs operational depth (data layers, anomaly-detection methods); the LLMOps source page is currently thin on Aryan's 10-chapter coverage; [[Reasoning Strategies]] should be re-curated as a hub page now that ReAct/CoT/ToT/Self-Consistency/Reflexion all have dedicated pages.

## [2026-05-09] synthesis | Connective-tissue batch (7 new syntheses)
The wiki had grown wide but thin on cross-cutting connections — 9 syntheses against ~239 concepts and 37 sources. Added 7 syntheses to weave existing atomic pages into decision-ready guides for AI engineering work. No new atomic pages; pure synthesis-layer work.

**New syntheses (7)**:
- [[Reasoning Models Landscape]] — DeepSeek-R1 (RL+RLVR) vs s1 (SFT distillation + Budget Forcing); test-time compute as a third scaling axis; routing in compound systems.
- [[LLM Inference Optimization Stack]] — bottleneck-ranked stack from FlashAttention up through paged attention, speculative decoding, CAG, and serving engines (vLLM/llama.cpp/TGI). Includes deployment recipes per topology.
- [[LLM Alignment and Post-Training]] — comparison matrix for RLHF, DPO, ORPO, KTO, RLVR, GRPO, plus distillation; data shape, reference-model requirement, infra cost, failure modes.
- [[Self-Correcting RAG Patterns]] — Self-RAG, Corrective RAG, Adaptive RAG, Speculative RAG, Reflexion, RARR, VERA mapped to which pipeline phase they hook into and how to compose them.
- [[Pre-Retrieval Techniques for RAG]] — Query Rewriting, HyDE, Step-Back Prompting, RAG-Fusion, Adaptive Retrieval, Reranking; decision flow + four composition recipes.
- [[Vector Database Selection Guide]] — Pinecone, Chroma, Weaviate, Qdrant, Faiss, Deep Lake, Meilisearch, plus pgvector (this repo's choice). Index algorithm, hybrid search, multi-tenancy, hosting model.
- [[LLM Evaluation Benchmark Map]] — seven measurement disciplines (knowledge / reasoning / chat / faithfulness / RAG triad / intrinsic / human-rubric); maps every benchmark in the wiki to the capability it tests and its failure mode.

**Cross-cutting links added**: each new synthesis cross-references the others ("sibling synthesis" links) and the existing 9, building a much denser synthesis-layer graph. Reasoning Models Landscape ↔ LLM Inference Optimization Stack ↔ LLM Alignment and Post-Training form one triangle; the three RAG syntheses (Architecture / Pre-Retrieval / Self-Correcting) plus Evaluation Playbook plus Vector Database Selection Guide form a five-node RAG cluster.

**Index counts**: Syntheses 9 → 16. No atomic-page changes.

**Gaps still open** (next-pass synthesis candidates):
- Transformer Architecture Anatomy (Attention/Self-Attention/MHA/GQA/RoPE — substantial atomic coverage exists)
- Multi-Agent Collaboration Taxonomy (the Tran et al. survey deserves its own decision-guide synthesis layered above [[Agent Orchestration Platforms]])
- Prompting Strategies Decision Guide (CoT / ReAct / ToT / Self-Consistency / Step-Back — when to use which)
- AI Coding Agents synthesis (Claude Code / Compound AI Systems / OpenDev / IDE-native agents)
- Data Engineering for AI (Data Pipeline / Feature Store / Continuous Training / ML Monitoring)
- Sequence Modeling Evolution (RNN / LSTM / GRU / Transformer / ViT)
- Reliability for LLM Systems (SLI/SLO + Error Budget + Blast Radius + Circuit Breaker, AI-specific)

## [2026-05-09] synthesis | Connective-tissue batch round 2 (7 more syntheses)
Closed all seven next-pass synthesis candidates flagged in the prior entry. The synthesis layer now has 23 pages connecting the atomic graph; the principal AI-engineering decision territory (architecture / inference / alignment / RAG / agents / reliability / data) is covered.

**New syntheses (7)**:
- [[Transformer Architecture Anatomy]] — top-down walkthrough of the modern decoder-only transformer; the 2017→2026 delta table (RoPE, GQA, SwiGLU, RMSNorm, pre-norm, FlashAttention, MoE) plus parameter-budget rule of thumb.
- [[Multi-Agent Collaboration Taxonomy]] — Tran et al. 2025's five-axis taxonomy (Actors × Types × Structures × Strategies × Coordination); when MAS pays for itself; cost equation and reliability concerns.
- [[Prompting Strategies Decision Guide]] — failure-mode-driven flow for CoT, Self-Consistency, ToT, ReAct, Reflexion, Step-Back, HyDE; how reasoning models change which strategies are worth using.
- [[AI Coding Agents]] — terminal-native vs IDE-native vs API-driven surfaces; tool-design as the under-recognized leverage point; SWE-bench Verified as the contract benchmark.
- [[Data Engineering for AI]] — lifecycle from collection through monitoring and continuous training; classical-ML stack reframed for the LLM era (preference data, distillation, embeddings as features).
- [[Sequence Modeling Evolution]] — RNN → LSTM → Seq2Seq+attention → Transformer → state-space revival (Mamba/RWKV); what each transition fixed and where the older architectures still earn keep.
- [[Reliability for LLM Systems]] — adapts SLI/SLO, error budget, circuit breaker, retry-with-backoff, caching, saga, rate limiting to LLM-specific failure modes (hallucination, refusal, cost, multimodal latency tiers).

**Cross-cutting links added**: Transformer Architecture Anatomy ↔ Sequence Modeling Evolution ↔ LLM Inference Optimization Stack form an architecture triangle. Multi-Agent Collaboration Taxonomy ↔ AI Coding Agents ↔ Agent Orchestration Platforms ↔ Agent Memory Architectures ↔ Agent Trust and Safety Controls form a five-node agent cluster. Reliability for LLM Systems ↔ AIOps-LLMOps Convergence ↔ Data Engineering for AI ↔ LLM Ops Toolchain form a four-node operations cluster.

**Index counts**: Syntheses 16 → 23. No atomic-page changes.

**What's now reasonably complete at the synthesis layer**:
- LLM internals: Transformer Anatomy, Sequence Modeling Evolution, Inference Optimization Stack, Reasoning Models Landscape
- LLM training: Alignment & Post-Training, Parameter-Efficient Fine-Tuning
- RAG: Architecture Decision Guide, Pre-Retrieval Techniques, Self-Correcting Patterns, Evaluation Playbook, Vector Database Selection Guide
- Agents: Multi-Agent Collaboration Taxonomy, Agent Orchestration Platforms, Agent Memory Architectures, Agent Trust and Safety Controls, AI Coding Agents
- Operations: Reliability for LLM Systems, AIOps-LLMOps Convergence, LLM Ops Toolchain, Data Engineering for AI
- Evaluation: LLM Evaluation Benchmark Map, Prompt Evaluation Workflows, Prompting Strategies Decision Guide

**Possible future syntheses** (not flagged as urgent — coverage is now reasonable):
- Mixture-of-Experts Architectures (DeepSeek-V3 MoE / Mixtral / GShard) — currently lives only in atomic refs
- Embeddings Engineering (model choice, dimension selection, fine-tuning, eval) — atomic [[Embeddings]] is the only page
- LLM Security & Privacy (prompt injection, jailbreak, PII, model extraction, red-teaming) — partial coverage in [[LLMSecOps]] and [[Agent Trust and Safety Controls]]
- Diffusion / Generative Image stack — wiki has [[Diffusion Models]] and [[Generative Adversarial Network]] but not in agent/LLM connective tissue
- Distributed Systems Foundations for LLM Serving — many primitives exist (CAP, PACELC, sharding, quorum, etc.); could synthesize for multi-host LLM deployment specifically
- Long Context Engineering — KV cache, RoPE extension, lost-in-the-middle, Position Interpolation, NTK scaling

**Recommendation for next pass**: continue ingesting new sources (especially the [[2026-04-29-building-applications-with-ai-agents|building applications with AI agents]] PDF still flagged unprocessed in the 2026-04-30 deferred list) before adding more syntheses — the atomic-to-synthesis ratio is now ~12:1 which is healthy, and adding more synthesis without new atomic substrate would invent connections rather than surface them.

## [2026-05-09] lint | Health check on 14 new syntheses
Ran broken-wikilink, orphan, and index-consistency checks across the wiki, scoped to validate the 14 newly-added synthesis pages.

**Errors found and fixed (6 unique broken wikilink targets across 17 occurrences in 9 files)**:
- `[[Building AI Coding Agents for the Terminal|...]]` in `AI Coding Agents.md` → corrected to `[[2026-04-12-building-ai-coding-agents-terminal]]` (had target/alias swapped).
- `[[LLM Engineers Handbook]]` in `Data Engineering for AI.md` → corrected to `[[2026-04-12-llm-engineers-handbook|LLM Engineer's Handbook]]`.
- `[[DPO]]` in `Reasoning Models Landscape.md` → corrected to `[[Direct Preference Optimization|DPO]]`.
- `[[CLAUDE.md]]` (5 occurrences in Vector Database Selection Guide and Pre-Retrieval Techniques) → replaced with inline-code `` `CLAUDE.md` `` (it's the repo root file, not a wiki page).
- `[[user_constraints|...]]` (5 occurrences across Inference Stack, Data Engineering, Eval Benchmark Map, Self-Correcting RAG, Vector DB) → replaced with plain text (lives in `~/.claude/.../memory/`, not in the wiki vault).
- `[[user_hardware|...]]` (5 occurrences across Inference Stack, Alignment, Pre-Retrieval, Reasoning Landscape, Self-Correcting RAG) → replaced with plain text (same reason).

**Warnings found and fixed (3 new-synthesis orphans)**:
- [[LLM Evaluation Benchmark Map]] had no inbound links — added cross-link from Self-Correcting RAG Patterns "Related pages".
- [[Prompting Strategies Decision Guide]] had no inbound links — added cross-link from Reasoning Models Landscape "Related pages".
- [[Reliability for LLM Systems]] had no inbound links — added cross-link from LLM Inference Optimization Stack "Related pages".

**Final lint status**:
- Broken wikilinks in syntheses: 0 (down from 6)
- Orphans among new syntheses: 0 (down from 3)
- Index consistency: clean (every wiki page indexed; no index entries point to missing pages)
- Total unique wikilink targets across syntheses: 199 — all resolve

**Pre-existing wiki-wide issues (NOT in new syntheses; flagged for future cleanup)**:
- 25 broken wikilink targets in atomic concept pages — most match the 2026-04-30 deferred list ([[Raft]], [[Paxos]], [[B-Tree]], [[CRDT]], [[Continuous Batching]], [[KV Cache Compression]], [[U-Net]], [[Score Matching]] etc.) plus benchmark gaps already called out in [[LLM Evaluation Benchmark Map]] ([[AlpacaEval]], [[HumanEval]], [[HELM]]) plus a few standalone misses ([[Hallucination]], [[Supervised Fine-Tuning]], [[Hybrid Search]], [[BM25]], [[HNSW]], [[IVF]], [[Beam Search]], [[Reward Modeling]], [[CLIP]], [[Process Reward Model]], [[Compaction]], [[Distributed Transaction]], [[Hugging Face Autotrain]], [[Unsloth]], [[Model Context Protocol]], [[Build LLM From Scratch]] (typo for `[[2026-04-12-build-llm-from-scratch]]`)).
- 17 orphan entity/concept pages — mostly transformer-paper authors (Aidan Gomez, Illia Polosukhin, Ashish Vaswani, Noam Shazeer, Jakob Uszkoreit, Llion Jones, Lukasz Kaiser, Niki Parmar) listed in the source frontmatter without inline `[[wikilink]]`s in the source-summary body, plus a few entities mentioned in passing (Haystack, NVIDIA NeMo, Hugging Face Autotrain, SageMaker JumpStart, Optimum, Amazon Bedrock, Nghi D. Q. Bui) and two concept orphans ([[LSM Tree]], [[AI Interface]]).

## [2026-05-09] cleanup | Wiki-wide lint follow-up
Followed up on the lint warnings flagged in the prior entry — fixed the easiest pre-existing wiki-wide issues.

**Edits made**:
- Fixed typo `[[Build LLM From Scratch]]` → `[[2026-04-12-build-llm-from-scratch]]` in [[Chain-of-Thought]] (was a one-line broken link).
- Added inline `[[wikilink]]`s to the 8 transformer-paper authors in [[2026-04-12-attention-is-all-you-need]]'s author byline and "Entities Mentioned" section. Closes 8 orphan entity pages in one edit: [[Aidan Gomez]], [[Ashish Vaswani]], [[Illia Polosukhin]], [[Jakob Uszkoreit]], [[Llion Jones]], [[Lukasz Kaiser]], [[Niki Parmar]], [[Noam Shazeer]].

**New concept pages (4)** — substantive stubs for the most-referenced missing concepts:
- [[Hallucination]] — definition, intrinsic vs. extrinsic types, detection methods (LLM-as-judge, atomic-claim, FactScore, RARR), mitigation, operational treatment as SLI.
- [[Supervised Fine-Tuning]] — definition, loss formula, lifecycle position, data-source taxonomy, failure modes (catastrophic forgetting, overfitting, style collapse), composition with PEFT.
- [[Hybrid Search]] — lexical + semantic retrieval; fusion methods (RRF, score combination, learned rerank); per-store implementation matrix; when each side wins.
- [[BM25]] — full formula with $k_1$ and $b$ explanation; why each piece matters; modern variants (BM25F, SPLADE); why it's still relevant in the LLM era.

**Index counts**: Concepts 239 → 243.

**Lint status after this pass**:
- Broken wikilinks: 25 → ~20 (closed `[[Hallucination]]`, `[[Supervised Fine-Tuning]]`, `[[Hybrid Search]]`, `[[BM25]]`, `[[Build LLM From Scratch]]`)
- Orphan entities: 15 → 7 (closed all 8 transformer-paper authors)
- New concept pages may introduce a few new broken links that need a follow-up sweep, but the net is strongly positive.

**Still in the wiki-wide backlog** (deferred, not urgent):
- Distributed-systems primitives: [[Raft]], [[Paxos]], [[B-Tree]], [[CRDT]], [[Distributed Transaction]]
- Inference optimization gaps: [[Continuous Batching]], [[KV Cache Compression]]
- Generative ML gaps: [[U-Net]], [[Score Matching]], [[CLIP]]
- Benchmarks called out in [[LLM Evaluation Benchmark Map]]: [[AlpacaEval]], [[HumanEval]], [[HELM]]
- Misc: [[Reward Modeling]], [[Process Reward Model]], [[Beam Search]], [[Compaction]], [[HNSW]], [[IVF]], [[Model Context Protocol]], [[Unsloth]]
- Remaining 9 orphan entities: [[Haystack]], [[NVIDIA NeMo]], [[Hugging Face Autotrain]], [[SageMaker JumpStart]], [[Optimum]], [[Amazon Bedrock]], [[Nghi D. Q. Bui]] + 2 concept orphans [[LSM Tree]], [[AI Interface]]

## [2026-05-10] cleanup | Wiki-wide lint follow-up round 2 — closed all remaining errors and orphans
Closed every broken wikilink and every orphan flagged in the prior cleanup. Wiki-wide lint is now clean.

**New concept pages (19)**:
- Evaluation: [[AlpacaEval]], [[HumanEval]], [[HELM]]
- Inference / search infrastructure: [[Continuous Batching]], [[HNSW]], [[IVF]]
- Alignment / training: [[Reward Modeling]], [[Process Reward Model]]
- Vision-language / generative: [[CLIP]], [[U-Net]], [[Score Matching]]
- Decoding: [[Beam Search]]
- Agent / tool integration: [[Model Context Protocol]]
- Storage / distributed systems: [[Compaction]], [[CRDT]], [[Raft]], [[Paxos]], [[B-Tree]], [[Distributed Transaction]]

**New entity page (1)**: [[Unsloth]] — fast LoRA / QLoRA / DPO training library; ~2× speed and 50% memory vs HF baseline.

**Orphan-closing edits** (added inline `[[wikilink]]`s in source/concept pages):
- `2026-04-12-building-ai-coding-agents-terminal.md` — wikilinked author [[Nghi D. Q. Bui]] in byline.
- `2026-04-12-ultimate-guide-fine-tuning.md` — wikilinked Chapter 10's industrial platforms ([[Hugging Face Autotrain|Autotrain]], [[Transformers Trainer API]], [[Optimum]], [[SageMaker JumpStart]], [[Amazon Bedrock]], [[NVIDIA NeMo]]).
- `2026-04-12-ai-agents-in-action.md` — wikilinked the [[AI Interface]] paradigm in Chapter 1.
- `entities/Faiss.md` — wikilinked [[Weaviate]] and [[Haystack]] in tooling-stack mention.
- `entities/Meilisearch.md` — wikilinked [[LangChain]], [[Weaviate]], [[Faiss]], [[Haystack]] in modular-RAG-stack mention.

**Index counts**: Concepts 243 → 262. Entities 133 → 134. New entries inserted alphabetically.

**Final lint status**:
- Broken wikilinks: 0
- Orphan pages: 0
- Index consistency: clean
- The wiki is fully self-consistent for the first time since the synthesis-batch expansion began on 2026-05-09.

**Coverage delta over the past two days**:
- Atomic pages: ~280 → ~303 (+23 new pages: 4 in round 1, 19 in round 2)
- Synthesis pages: 9 → 23 (+14 new syntheses)
- Total wiki content roughly doubled in connective tissue while atomic-page count grew ~8%.
- The wiki now answers questions across the full AI-engineering stack from transformer internals through inference / RAG / agents / alignment / data / reliability / evaluation, with every claim cross-linked to substrate.

**Recommended next steps** (none urgent; wiki is in healthy state):
- Ingest the still-deferred [[2026-04-29-building-applications-with-ai-agents|Raieli & Iuculano PDF]] — adds ~10–15 pages of agent-systems coverage.
- Foundational ML researchers (LeCun, Bengio, Hinton, Karpathy, Schmidhuber, Hochreiter, Jordan, Blei, Lamport, Fowler, Chollet) — entity stubs to give source pages canonical reference targets.
- Additional AWS service entities (SQS, SNS, RDS, ElastiCache, Step Functions, EventBridge, Aurora) — would close the rest of [[2026-04-16-system-design-on-aws]]'s vendor gaps.
- Consider promoting the highest-value concepts to syntheses as more sources land (Mixture-of-Experts, Long Context Engineering, Embeddings Engineering, Diffusion stack are all candidates the wiki now has substrate for).

