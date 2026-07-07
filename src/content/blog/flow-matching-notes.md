---
title: 'Notes on conditional flow matching for speech'
description: 'A working introduction to flow matching and why it is a good fit for speech generation tasks.'
date: 2026-07-01
tags: [speech, generative-models, math]
series: 'Flow matching for speech'
---

Flow matching has quietly become one of the most practical training
objectives for continuous generative models in speech. These are my working
notes on the basic formulation.

## The setup

We want to learn a time-dependent vector field $v_\theta(x, t)$ whose flow
transports a simple prior $p_0 = \mathcal{N}(0, I)$ to the data distribution
$p_1 = q$. The probability path $p_t$ is defined by the continuity equation:

$$
\frac{\partial p_t}{\partial t} + \nabla \cdot (p_t \, u_t) = 0
$$

Directly regressing on the marginal field $u_t$ is intractable, but the
*conditional* flow matching objective

$$
\mathcal{L}_{\text{CFM}}(\theta) =
\mathbb{E}_{t,\, q(x_1),\, p_t(x \mid x_1)}
\left\| v_\theta(x, t) - u_t(x \mid x_1) \right\|^2
$$

has the same gradients and is trivial to compute with the optimal-transport
path, where $x_t = (1 - t)\,x_0 + t\,x_1$ and the target is simply
$u_t(x \mid x_1) = x_1 - x_0$.

## Why this works well for speech

Mel-spectrograms (and codec latents) are continuous and relatively smooth,
so a handful of ODE steps at inference — often fewer than 10 — already gives
high-quality output. Compared to diffusion with hundreds of steps, this
matters a lot for real-time TTS.

We used exactly this recipe for dysarthric speech reconstruction: condition
the vector field on the impaired utterance and let the flow move it toward
the intelligible speech manifold.

## References

- Lipman et al., *Flow Matching for Generative Modeling*, ICLR 2023.
- Our paper: *Improved Intelligibility of Dysarthric Speech using
  Conditional Flow Matching*, 2025.
