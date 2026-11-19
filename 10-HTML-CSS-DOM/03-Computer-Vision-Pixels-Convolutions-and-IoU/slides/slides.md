---
title: "Lesson 10.3 — Computer Vision Matrices, Convolutions, IoU & AI Compute Hardware"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 10.3: Computer Vision & AI Compute Hardware
**CTE AI (11.0102.00) / Azure AI-900 (`AI Stds 3.0, 8.0, 9.0`)**

---

### `[L1 Remember -> L2 Understand]` AI Hardware & Edge vs. Cloud

| Processor | Execution Style | Best CV / ML Job |
|---|---|---|
| **`CPU`** | Few fast scalar cores | OS orchestration, JSON/I/O |
| **`GPU`** | Thousands of **SIMT** cores | Training & parallel Cloud rendering |
| **`TPU`** | **Systolic array** matrix grid | Massive datacenter batch GEMM |
| **`NPU`** | Quantized INT8 tensor core | **Edge** camera inference (`<15ms`) |

- **Edge vs. Cloud:** Streaming `30fps` uncompressed VGA RGB needs **>221 Mbps** + cloud RTT (`>80ms`), blowing real-time `33.3ms` robotics budgets & exposing raw video!

---

### `[L2 Understand -> L3 Apply]` Canvas RGBA `ImageData` & Luminance

```javascript
// 1D Uint8ClampedArray of length width * height * 4
const offset = (y * width + x) * 4;
const [r, g, b, a] = [rgba[offset], rgba[offset + 1], rgba[offset + 2], rgba[offset + 3]];

// Rec. 601 Luminance (Green = 58.7% weight for human eye sensitivity)
const gray = 0.299 * r + 0.587 * g + 0.114 * b;
```

---

### `[L3 Apply -> L4 Analyze]` $3 \times 3$ Convolutions & Sobel Edges

- **Box Blur (`1/9` uniform grid):** Smooths pixel noise evenly.
- **Sobel Gradient Edge Filters:**
  $$G_x = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}, \quad G_y = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}, \quad G = \min\left(255,\ \sqrt{G_x^2 + G_y^2}\right)$$
- **Borders:** `'zero'` creates dark edge halos (`4*90/9 = 40`); `'clamp'` replicates perimeter pixels cleanly (`90`)!
- **Thresholding:** `mag >= threshold ? 255 : 0` extracts crisp binary edge masks.

---

### `[L3 Apply -> L5 Evaluate]` Bounding-Box `IoU` & CV Ethics

$$\text{IoU}(A, B) = \frac{\text{Area}(A \cap B)}{\text{Area}(A) + \text{Area}(B) - \text{Area}(A \cap B)} \in [0, 1]$$

- **`IoU >= 0.50`:** Standard object-detection match (`AP@50`); touching boxes share `0` area (`IoU = 0`).
- **CV Ethics (`AI 9.0`):** On-device Edge NPU anonymization, explicit informed consent, and multi-lighting/skin-tone fairness audits!

> **Labs:** Run `node --test 10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/code/computerVisionMatricesDemo.test.mjs` and complete `0-student_files/10-computer-vision/cvKernelAndIouLab.mjs`!
