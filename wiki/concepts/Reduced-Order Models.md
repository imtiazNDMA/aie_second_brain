---

tags: [concept, simulation, digital-twin, optimization, cluster/generative-models]
sources: ["2026-09-12-digital-twins-in-action"]
created: 2026-09-12
updated: 2026-09-12
---


# Reduced-Order Models

Lightweight approximations of complex simulation models that preserve essential behavior while reducing computational cost. Enable real-time or near-real-time updates in digital twin applications where full-fidelity simulation is too expensive.

## Purpose

Full-fidelity simulation models (e.g., CFD, FEA) may take minutes or hours to run. Digital twins require sub-second update cycles. Reduced-order models bridge this gap by learning a compact representation of the model's input-output behavior.

## Techniques

- **Proper Orthogonal Decomposition (POD)** — extracts dominant modes from simulation snapshots
- **Dynamic Mode Decomposition (DMD)** — captures temporal dynamics
- **Neural network surrogates** — train ML models to approximate simulation outputs
- **Parameterized reduced-order models** — maintain parametric dependence for what-if scenarios

## Trade-offs

- **Speed**: 100-1000× faster than full simulation
- **Accuracy**: typically 95-99% of full model for operating range
- **Limited extrapolation**: degrade outside training envelope
- **Calibration**: require periodic retraining as physical system evolves

## Related

- [[Digital Twin]] — primary use case
- [[Simulation]] — full-fidelity foundation
- [[OpenModelica]] — acausal modeling for generating training data
- [[Functional Mock-up Interface]] — standard for exchanging simulation models
