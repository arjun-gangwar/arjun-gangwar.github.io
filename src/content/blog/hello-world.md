---
title: 'Hello, world'
description: 'First post — why this blog exists and what to expect.'
date: 2026-07-07
tags: [meta]
---

Welcome! I'm starting this blog to write about my research in speech
technology — text-to-speech, speech recognition, speech-to-speech
translation — and the things I learn along the way.

Expect posts about generative models, neural audio codecs, low-resource
Indian languages, and the occasional practical note on training and
infrastructure.

Posts support code:

```python
import torch

x = torch.randn(1, 16000)  # one second of audio at 16 kHz
```

and math, both inline like $O(n \log n)$ and display:

$$
\mathcal{L}_{\text{CFM}}(\theta) =
\mathbb{E}_{t, q(x_1), p_t(x \mid x_1)}
\left\| v_\theta(x, t) - u_t(x \mid x_1) \right\|^2
$$

More soon.
