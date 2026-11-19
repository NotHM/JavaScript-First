# Lesson Plan 10.3: Computer Vision Matrices, Convolutions, IoU & AI Hardware (`AI Stds 3.0, 8.0, 9.0`)

**Unit:** Unit 10 | **Duration:** 3 Class Periods × 50 min (Days 75–77) | **Standards:** West-MEC `AI101` Unit 2, `AI102` Unit 10, `AI201` Units 3–4 (`AI Stds 3.0, 8.0, 9.0`); AZ CTE `15.5, 6.5, 4.0`

## Bloom's Objective Ladder
- **L1–L2:** State AI processor characteristics (`CPU`/`GPU`/`TPU`/`NPU`), Canvas RGBA `ImageData` stride (`4` bytes), Rec. 601 grayscale formula, `zero` vs. `clamp` padding, and `IoU` bounds.
- **L3 Apply:** Implement RGBA-to-grayscale luminance, $3 \times 3$ `convolve2D`, Sobel $G_x / G_y$ magnitude, binary thresholding, Bounding-Box `IoU`, and Edge-vs-Cloud selector in Node.js.
- **L4 Analyze:** Trace perimeter dimming caused by `'zero'` padding vs. `'clamp'` replication and diagnose bounding-box `IoU` thresholds (`< 0.50` localization drift).
- **L5 Evaluate:** Defend Edge `NPU` vs. Cloud `GPU/TPU` selection using bandwidth/latency math and enforce privacy/fairness guardrails in CV systems.

## Pacing & Teacher Answer Keys
- **Day 75:** Pre-Lesson 10.3 (4m), Slides + AI Hardware (`CPU`/`GPU`/`TPU`/`NPU`) & RGBA Buffer / Sobel Live Demo [`computerVisionMatricesDemo.mjs`](./code/computerVisionMatricesDemo.mjs) (26m), Worksheet Part A (20m).
- **Day 76:** $3 \times 3$ Convolutions, Border Padding & Bounding-Box `IoU` walkthrough (15m), Coding Lab [`cvKernelAndIouLab.mjs`](../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs) (35m).
- **Day 77:** Complete Lab + live `node --test` [`computerVisionMatricesDemo.test.mjs`](./code/computerVisionMatricesDemo.test.mjs) (20m), Part C–D Stencil Trace, Edge-vs-Cloud & Biometric Ethics critique (25m), Post-Lesson 10.3 Exit Ticket (5m).
- **Pre 10.3 Key:** 1) Edge NPU; GPU; 2) `100 * 50 * 4 = 20,000` bytes; `(2 * 100 + 3) * 4 = 812`; 3) `0.587 * 255 = 149.685` (~`150`); 4) `50 / (100 + 100 - 50) = 50 / 150 = 0.3333`.
- **Post 10.3 Key:** 1) `Y = 0.299R + 0.587G + 0.114B` (Green carries highest weight `0.587`); 2) `'zero'` supplies `0` outside the matrix causing dark perimeter borders, whereas `'clamp'` replicates the nearest edge pixel preserving flat surface brightness; 3) $\sqrt{60^2 + 80^2} = 100$; at `threshold = 128`, output is `0`; 4) `Intersection = 10 * 20 = 200`, `Union = 400 + 400 - 200 = 600`, `IoU = 200/600 = 0.3333`, `< 0.50` -> `No` (`false`); 5) Recommend **Edge `NPU`** (`< 25 ms` on-device meets frame budget without `80 ms` cloud RTT or sending raw faces over WAN), paired with zero raw-video retention + opt-out signage and multi-lighting/demographic accuracy audits.
- **Worksheet Part A, C & D Key:**
  - *Part A:* `80 * 60 * 4 = 19,200` bytes; `(2 * 80 + 5) * 4 = 660`; `100` (`0.299 + 0.587 + 0.114 = 1.0`).
  - *Part C:* Under `'zero'` at `(0, 0)`, 5 of 9 stencil neighbors fall outside bounds (`0`), leaving only `4 * 90 / 9 = 40` (dark halo!). Under `'clamp'`, all 9 neighbors equal `90`, yielding `9 * 90 / 9 = 90`. Adjacent boxes touching at `x = 10` have `interWidth = Math.max(0, 10 - 10) = 0`, so `IoU = 0`.
  - *Part D:* **Edge `NPU`** stays under `33.3 ms` frame budget locally, eliminates LTE bandwidth saturation, works offline, and processes anonymized bounding-box counts locally without storing raw facial video; validate detector recall across wheelchair variants, strollers, and low-light/diverse skin-tone cohorts (`AI Std 9.0`).

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 10.3 & Part A Math** | `SG-U10-6`, `TG-U10-6` | `L1–L2` (`AI 3.0, 8.0`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 75; >= 80% accuracy on hardware classes, RGBA offsets & luminance by Day 75. |
| **CV Convolution & IoU Lab (Part B)** | `SG-U10-6`, `TG-U10-6` | `L3` (`AI 8.0 / 15.5, 6.5`) | Live checkoff of [`cvKernelAndIouLab.mjs`](../../0-student_files/10-computer-vision/cvKernelAndIouLab.mjs) passing all assertions in Node.js by end of Day 76. |
| **Stencil Trace & Border Audit (Part C)** | `SG-U10-6`, `TG-U10-3` | `L4` (`AI 8.0`) | >= 80% accuracy tracing `'zero'` dark-halo edge artifacts and `IoU = 0` adjacency checks prior to Unit 10 Project showcase. |
| **Edge-vs-Cloud & CV Ethics (Part D)** | `SG-U10-6`, `TG-U10-1`, `TG-U10-6` | `L5` (`AI 3.0, 9.0`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 77 targeting Hake's $g \ge 0.55$ over Pre 10.3 and archive AI `3.0/8.0/9.0` evidence. |

- [ ] **Teacher Checkpoint (`TG-U10-6`):** Pre/Post Lesson 10.3 growth ($g \ge 0.55$) verified, 100% `cvKernelAndIouLab.mjs` checkoffs completed, and `computerVisionMatricesDemo.test.mjs` run live via `node --test` on Day 77.
- [ ] **Student Checkpoint (`SG-U10-6`):** Parts A–D verified without spoilers, `cvKernelAndIouLab.mjs` passing all checks cleanly, and Exit Ticket submitted on Day 77.
