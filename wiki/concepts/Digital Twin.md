---

tags: [concept, digital-twin, iot, simulation, knowledge-graphs, cluster/vision-multimodal]
sources: ["2026-09-12-digital-twins-in-action"]
created: 2026-09-12
updated: 2026-09-12
---


# Digital Twin

A digital representation of a physical system that is updated with bidirectional data flow from the real world. Distinguished from a **digital model** (static, no data flow) and a **digital shadow** (one-way data flow from physical to virtual). The bidirectional flow enables the virtual system to influence the physical system through control actions.

## Five Maturity Levels

| Level | Description | Example |
|---|---|---|
| **Descriptive** | Static representation with infrequent updates | Google Maps base layer |
| **Informative** | Near-real-time data integration | Google Maps with traffic |
| **Predictive** | Historical data for forecasting future states | Travel time predictions |
| **Comprehensive** | Simulation for what-if scenarios | Weather forecasting models |
| **Autonomous** | Takes real-world actions based on predictions | Japan's NTT network optimization |

## Architecture

- **Physical system** — sensors, actuators, IoT devices generating real-world data
- **Virtual system** — computational model mirroring physical state
- **Data flow** — bidirectional synchronization between physical and virtual
- **Knowledge graph** — semantic backbone enabling context-aware queries without knowing specific sensor IDs
- **Simulation** — continuous synchronization differentiates twins from standalone simulation models

## Key Patterns

- **Data integration** is the hardest challenge: fragmented data in PDFs, photos, videos, legacy systems
- **OCR extraction** from utility bills, **computer vision** on meter photos, **LLM-based** P&ID parsing
- **Time-series data** storage, streaming ingestion, batch processing
- **Asset Administration Shell (AAS)** — Industry 4.0 standard for digital asset representation
- **Reduced-Order Models (ROMs)** — lightweight simulation enabling real-time twin updates

## Related

- [[Knowledge Graphs]] — semantic backbone for digital twins
- [[Data Pipeline]] — sensor/time-series data ingestion
- [[Simulation]] — distinct from continuous twin synchronization
- [[Asset Administration Shell]] — Industry 4.0 standard
- [[Reduced-Order Models]] — lightweight simulation technique
- [[GraphQL Schema]] — API pattern for serving twin data
