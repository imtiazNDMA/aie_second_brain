---
tags: [concept, digital-twin, industry-40, standard, cluster/distributed-systems]
sources: ["2026-09-12-digital-twins-in-action"]
created: 2026-09-12
updated: 2026-09-12
---

# Asset Administration Shell (AAS)

Industry 4.0 standard for representing digital assets in a unified, interoperable format. Provides a standardized way to describe physical and digital assets across different platforms and systems.

## Purpose

- **Interoperability** — different systems can understand asset descriptions
- **Standardization** — consistent format across vendors and industries
- **Composability** — assets can be described at multiple abstraction levels

## Structure

- **Asset Administration Shell** — top-level container for asset description
- **Submodels** — modular descriptions of specific aspects (e.g., technical data, documentation)
- **Properties** — typed data attributes within submodels
- **Operations** — callable functions on the asset
- **References** — links to external resources

## Use Cases

- Manufacturing equipment digital twins
- Supply chain asset tracking
- Building information modeling (BIM)
- Industrial IoT integration

## Related

- [[Digital Twin]] — AAS provides the standardized representation layer
- [[OPC UA]] — complementary industrial communication protocol
- [[Knowledge Graphs]] — semantic layer above AAS
