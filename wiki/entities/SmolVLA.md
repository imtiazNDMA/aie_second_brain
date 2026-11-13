---
tags: [entity, model, vision-language-action, robotics, hugging-face]
sources: ["2026-09-12-vision-language-models-building-vlms"]
created: 2026-09-12
updated: 2026-09-12
---

# SmolVLA

Vision-Language-Action model from Hugging Face that extends VLMs to robot control. Takes visual observations and language instructions as input, outputs action chunks for robot execution.

## Architecture

- **VLM backbone** — processes visual observations and language instructions
- **Action expert** — flow-matching head that predicts robot actions
- **Action chunks** — predicts multiple timesteps of future actions simultaneously
- **Asynchronous control** — action prediction decoupled from execution timing

## Key Properties

- Combines visual understanding with action prediction
- Flow-matching action expert for continuous action spaces
- Suitable for manipulation tasks with limited data

## Related

- [[Vision Language Models]] — foundation architecture
- [[Flow Matching]] — action prediction method
- [[GR00T N1.5]] — humanoid robot foundation model
- [[π0.6]] — flow-matching action model
- [[Modality-as-Tokens]] — unified token framework
