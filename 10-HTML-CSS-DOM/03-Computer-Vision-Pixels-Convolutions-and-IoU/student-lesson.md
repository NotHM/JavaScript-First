# Student Lesson 10.3: Computer Vision Matrices, Convolutions, IoU & AI Hardware (`AI Stds 3.0, 8.0, 9.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs`](../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs)

## Part A: AI Hardware & RGBA Luminance Math (`[L1 Remember]` & `[L2 Understand]`)
1. Contrast **CPU**, **GPU**, **TPU**, and **Edge NPU** by naming one workload each processor is uniquely engineered to accelerate:  
   > *(Your hardware comparison)*
2. Given an `80 × 60` HTML5 `<canvas>` `ImageData` buffer:
   - Total bytes in `rgbaBuffer`: `________`
   - Starting byte index of pixel `(x = 5, y = 2)`: `________`
   - Luminance of pixel `[100, 100, 100, 255]` (`0.299R + 0.587G + 0.114B`): `________`

## Part B: Computer Vision Kernels & IoU Lab (`[L3 Apply]`)
Open [`0-student_files/10-computer-vision/cvKernelAndIouLab.mjs`](../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs), complete all 6 `TODO` functions (`rgbaBufferToGrayscaleGrid`, `convolve2D`, `detectSobelEdges`, `applyBinaryThreshold`, `computeBoundingBoxIoU`, `recommendEdgeVsCloud`), uncomment the verification block, and run:
```bash
node 0-student_files/10-computer-vision/cvKernelAndIouLab.mjs
```

## Part C: $3 \times 3$ Stencil Trace & Border Artifacts (`[L4 Analyze]`)
Given this $3 \times 3$ grayscale patch of a bright `90` square background:
```text
[ [90, 90, 90],
  [90, 90, 90],
  [90, 90, 90] ]
```
1. Hand-trace applying `BOX_BLUR_KERNEL` (all `1/9`) at corner `(r = 0, c = 0)` under **`borderMode: 'zero'`** vs. **`borderMode: 'clamp'`**. Why does `'zero'` darken every perimeter pixel while `'clamp'` preserves `90`?  
   > *(Your stencil trace + analysis)*
2. Inspect why **`IoU = 0.0`** occurs between `{ x: 0, y: 0, width: 10, height: 10 }` and `{ x: 10, y: 0, width: 10, height: 10 }` even though the two bounding boxes share an edge!  
   > *(Your geometric check)*

## Part D: Edge-vs-Cloud Architecture & Biometric Ethics (`[L5 Evaluate]`)
A municipal crosswalk AI detector tracks pedestrian wheelchair movement at `30 fps` (`33.3 ms` latency budget). Streaming raw `1080p` RGB frames over cellular LTE takes `95 ms` round-trip and exceeds data caps:
1. Recommend **Edge `NPU` vs. Cloud `GPU/TPU`**, justifying **latency**, **bandwidth**, and **offline reliability**.
2. Propose TWO ethical engineering safeguards addressing **informed notice/privacy** and **demographic dataset bias** (wheelchairs, strollers, varied lighting/skin tones) before public launch (`AI Std 9.0`).  
> *(Your architectural defense & ethics plan)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and verifying your own work (**zero solution spoilers — confirm passing assertions in Node.js**):

- [ ] **SL-L10.3-1 (`[L1–L2 Remember/Understand]` | `AI 3.0, 8.0` | `SG-U10-6`):** Classify CPU/GPU/TPU/NPU hardware roles and calculate Part A RGBA offsets and Rec. 601 luminance with >= 80% accuracy on Day 75.
- [ ] **SL-L10.3-2 (`[L3 Apply]` | `AI 8.0 / 15.5, 6.5` | `SG-U10-6`):** Implement all 6 `TODO` functions in `cvKernelAndIouLab.mjs` and pass every uncommented check by Day 76.
- [ ] **SL-L10.3-3 (`[L4 Analyze]` | `AI 8.0` | `SG-U10-6`):** Hand-trace Part C's `zero` vs. `clamp` border convolution artifact and zero-overlap IoU boundary cleanly before Unit 10 Project defense.
- [ ] **SL-L10.3-4 (`[L5 Evaluate]` | `AI 3.0, 9.0` | `SG-U10-6`):** Defend Part D's Edge NPU latency/privacy decision and demographic bias safeguards and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 77.
