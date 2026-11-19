# Lesson 10.3: Computer Vision Matrices, Convolutions, IoU & AI Compute Hardware (`CTE AI / Azure AI-900 | AI Stds 3.0, 8.0, 9.0`)

**Standards:** **CTE AI (11.0102.00) / Azure AI-900** (**AI Stds `3.0, 8.0, 9.0`**) | Reinforces **AZ CTE `15.5, 6.5, 4.0`**

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall the four AI processor classes (**`CPU`**, **`GPU`**, **`TPU`**, **`NPU`**), RGBA `ImageData` byte stride (`4` bytes/pixel), the **Rec. 601 Luminance** formula ($0.299R + 0.587G + 0.114B$), **Box Blur** vs. **Sobel $G_x / G_y$** kernels, and **Bounding-Box `IoU`** (`AI 3.0, 8.0`).
- **`[L2 Understand]`** Contrast **Edge vs. Cloud** inference across network latency, upstream bandwidth, and offline biometric privacy, and compare **`zero` padding** vs. **`clamp` (replicate)** border convolution (`AI 3.0, 8.0, 9.0`).
- **`[L3 Apply]`** Implement RGBA-to-grayscale conversion, $3 \times 3$ 2D convolutions (`convolve2D`), **Sobel edge magnitude** ($\sqrt{G_x^2 + G_y^2}$), **Binary Thresholding**, and **Intersection over Union (`IoU`)** in Node.js (`AI 8.0 / 15.5, 6.5`).
- **`[L4 Analyze]`** Hand-trace a $3 \times 3$ stencil across edge boundaries, inspect dark-halo `zero` border artifacts, and diagnose **IoU `< 0.50`** object-localization drift (`AI 8.0`).
- **`[L5 Evaluate]`** Select **`CPU`**, **`GPU`**, **`TPU`**, or **Edge `NPU`** architectures for latency/privacy-constrained deployments and evaluate surveillance, informed consent, and skin-tone/demographic bias ethics in Computer Vision (`AI 3.0, 9.0`).

---

## 1. AI Compute Hardware & Edge vs. Cloud Architecture (`AI 3.0, 9.0`)

| Processor | Architecture Strength | Best AI / CV Workload | Key Limitation |
|---|---|---|---|
| **`CPU`** | Few fast cores, deep branch prediction & OS control | Sequential I/O, JSON parsing, small UI loops | Low parallel FLOPS for 2D/3D tensors |
| **`GPU`** | Thousands of **SIMT** ALU cores for parallel shaders & matrix ops | Training & high-throughput Cloud inference | High power draw (`150W–700W`) |
| **`TPU`** | Dedicated **systolic array** matrix-multiply units | Massive batched neural net training / datacenter GEMM | Cloud-hosted / specialized matrix shapes |
| **`NPU`** | Ultra-low-power quantized INT8 tensor accelerator on chip | Real-time **Edge** camera inference (`< 15 ms`, offline) | Limited RAM & model capacity |

- **Edge vs. Cloud Trade-offs:** Uploading uncompressed `640×480` RGB video (`921.6 KB/frame`) at `30 fps` requires **>221 Mbps** sustained upstream bandwidth and incurs WAN serialization + round-trip latency (`>100 ms`), breaking `33.3 ms` real-time robotics/automotive budgets and exposing raw biometric video to WAN interception!

---

## 2. Canvas `ImageData` RGBA Buffers & Grayscale Luminance (`AI 8.0 / 15.5`)

HTML5 `<canvas>` exposes `ctx.getImageData(0, 0, width, height).data` as a 1D `Uint8ClampedArray` of length `width * height * 4` storing `[R, G, B, A]` bytes (`0–255`) in row-major order:
$$\text{offset}(x, y) = (y \cdot \text{width} + x) \cdot 4$$
$$\text{Luminance } Y = 0.299R + 0.587G + 0.114B$$
Green carries the highest coefficient (`0.587`) because human retinal cones are most sensitive to green wavelengths, preserving structural contrast in grayscale images.

---

## 3. $3 \times 3$ Convolution Kernels & Binary Thresholding (`AI 8.0 / 6.5`)

A **2D Convolution** slides an odd $3 \times 3$ kernel matrix $K$ across each center pixel $(r, c)$, summing element-wise products:

- **Box Blur Smoothing ($K_{\text{blur}}$):** All weights equal `1/9` ($\text{sum} = 1.0$) to average local noise while preserving brightness.
- **Sobel Edge Detection ($G_x, G_y$):**
  $$G_x = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}, \quad G_y = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}, \quad G = \min\left(255,\ \sqrt{G_x^2 + G_y^2}\right)$$
- **Border Modes (`zero` vs. `clamp`):** `'zero'` treats out-of-bounds pixels as `0` (creating artificial dark border edges), while `'clamp'` replicates the nearest edge pixel cleanly!
- **Binary Thresholding:** Maps continuous edge magnitudes into a clean `0` / `255` foreground segmentation mask (`pixel >= threshold ? 255 : 0`).

---

## 4. Object Detection Bounding Boxes, `IoU` & CV Ethics (`AI 8.0, 9.0`)

Given predicted bounding box $A$ and ground-truth box $B$ formatted as `{ x, y, width, height }`:
$$\text{IoU}(A, B) = \frac{\text{Area}(A \cap B)}{\text{Area}(A \cup B)} = \frac{\text{Area}(A \cap B)}{\text{Area}(A) + \text{Area}(B) - \text{Area}(A \cap B)} \in [0, 1]$$
- **`IoU >= 0.50`** is the classic object-detection True Positive localization bar (`AP@50`); **`IoU >= 0.75`** measures strict alignment (`AP@75`).
- **Computer Vision Ethics (`AI 9.0`):** Always enforce **on-device blurring/processing** for surveillance compliance, **explicit informed consent** for biometric capture, and **balanced demographic benchmark testing** so error rates (`FN` / `FP`) never spike on darker skin tones or diverse lighting conditions.

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/computerVisionMatricesDemo.mjs`](./code/computerVisionMatricesDemo.mjs) | [`code/computerVisionMatricesDemo.test.mjs`](./code/computerVisionMatricesDemo.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs`](../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs)
