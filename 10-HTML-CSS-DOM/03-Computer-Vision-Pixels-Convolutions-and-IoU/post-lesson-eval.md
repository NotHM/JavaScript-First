# Post-Lesson 10.3 Evaluation: Exit Ticket (`AI Stds 3.0, 8.0, 9.0`)

**Timing:** 5 min | **Score:** `____ / 5`

1. **`[L1 Remember | AI 8.0 / 15.5]`** State the **Rec. 601 Luminance** formula for grayscale conversion and identify which color channel receives the highest human perceptual weight:  
   > `________________________________________________________`
2. **`[L2 Understand | AI 8.0]`** Contrast **`zero` border padding** vs. **`clamp` border replication** when sliding a $3 \times 3$ convolution kernel across pixel `(0, 0)`:  
   > *(Your contrast)*
3. **`[L3 Apply | AI 8.0]`** A pixel evaluates to **Sobel gradients** `Gx = 60` and `Gy = 80`. Compute its combined edge magnitude $\sqrt{G_x^2 + G_y^2}$ (`____`), and state the binary threshold output at `threshold = 128` (`____`).
4. **`[L4 Analyze | AI 8.0]`** Ground truth box $B = \{x: 0, y: 0, \text{width}: 20, \text{height}: 20\}$ and prediction $A = \{x: 10, y: 0, \text{width}: 20, \text{height}: 20\}$ overlap cleanly. Compute `Intersection Area`, `Union Area`, `IoU`, and state whether `IoU >= 0.50`:  
   > `Intersection = ____` | `Union = ____` | `IoU = ____` | `>= 0.50? ____`
5. **`[L5 Evaluate | AI 3.0, 9.0]`** A school hallway safety camera needs `< 25 ms` real-time fall detection without uploading raw student faces to an external server (`80 ms` cloud RTT). Recommend **Edge `NPU` vs. Cloud `GPU/TPU`** and list TWO computer-vision privacy/bias governance controls before deployment!  
   > *(Your architecture recommendation + ethics controls)*
