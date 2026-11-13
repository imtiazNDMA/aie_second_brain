---

tags: [concept, gans, image-to-image, domain-translation, cluster/generative-models]
sources: ["2026-09-12-gans-in-action"]
created: 2026-09-12
updated: 2026-09-12
---


# CycleGAN

GAN architecture for unpaired image-to-image translation between two domains. Uses two generators and two discriminators with cycle consistency loss to learn mapping without paired training examples.

## Architecture

- **Generator G** — maps domain X to domain Y
- **Generator F** — maps domain Y to domain X
- **Discriminator D_Y** — distinguishes real Y from generated Y
- **Discriminator D_X** — distinguishes real X from generated X

## Loss Functions

| Loss | Purpose |
|---|---|
| **Adversarial loss** | Generator fools discriminator |
| **Cycle consistency loss** | F(G(x)) ≈ x and G(F(y)) ≈ y |
| **Identity loss** | G(y) ≈ y when input already in target domain |

## Applications

- Horse ↔ zebra translation
- Summer ↔ winter landscapes
- Photo ↔ painting style transfer
- Satellite ↔ map translation

## Key Insight

Cycle consistency provides a form of regularization that prevents the mapping from being arbitrary — if you translate a photo to a painting and back, you should get the original photo.

## Related

- [[Generative Adversarial Network]] — foundation
- [[Image-to-Image Translation]] — broader task category
- [[Diffusion Models]] — alternative approach to image generation
