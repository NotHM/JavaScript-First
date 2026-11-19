# Unit 10 Project: Accessible 2D Canvas Transformer, Palette Gallery & Computer Vision Overlay

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `15.1–15.11, AI 3.0, 8.0, 9.0`  
**Core Starter:** [`../../0-student_files/projects/unit-10-accessible-canvas-app/index.html`](../../0-student_files/projects/unit-10-accessible-canvas-app/index.html)  
**CV Kernel & IoU Lab:** [`../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs`](../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs)

Build an interactive single-page web application integrating Accessibility, Responsive CSS, 2D Canvas transforms, DOM validation, `localStorage`, and Computer Vision matrix pipelines:
1. Use W3C semantic HTML5 landmarks (`<header>`, `<main>`, `<footer>`), one `<h1>`, SEO `<meta name="description">`, and WCAG AA `>= 4.5:1` colors (`15.1, 15.3, 15.8–15.9`).
2. Render interactive transformed geometry inside `<canvas>` using `save()`, `translate()`, `rotate()`, `scale()`, and `restore()` driven cleanly by accessible `<label>` sliders (`15.5`).
3. Validate & save named preset bookmarks cleanly into `localStorage` using `preventDefault()` and safe `textContent` DOM nodes + responsive Grid collapsing cleanly via `@media (max-width: 720px)` + `@media print` hiding controls (`15.4, 15.6–15.7`).
4. **Computer Vision Convolution & `IoU` Overlay Track (`AI 3.0, 8.0, 9.0`):** Wire your tested helpers from `cvKernelAndIouLab.mjs` (or Canvas pixel `ImageData` processing) to extract Rec. 601 grayscale luminance, execute $3 \times 3$ **Box Blur** and **Sobel Edge Convolutions** (`borderMode: 'clamp'`), apply binary thresholding, score predicted vs. reference bounding boxes with **`IoU` (`>= 0.50`)**, and include an explicit Edge `NPU` vs. Cloud `GPU/TPU` latency & biometric privacy/consent card.
