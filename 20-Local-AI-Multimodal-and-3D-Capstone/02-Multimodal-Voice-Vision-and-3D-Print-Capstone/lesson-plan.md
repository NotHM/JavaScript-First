# Lesson Plan 20.2: Multimodal Voice, Vision/Video Bonus & 3D CAD/Print Capstone

**Unit:** Unit 20 | **Duration:** 5 Class Periods × 50 min (Days 4–8) | **Stds:** `4.1, 4.3, 9.2, 11.4, 12.2, 15.5, 16.2, 17.0, 19.8`

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`[L3 Apply -> L6 Create | 4.1, 9.2, 19.8]`):** **S** — Implement RIFF/WAVE synthesis, Vision/Video builders, and watertight STL/OBJ + printability validators; **M** — Pass 100% of `capstone.test.mjs` / `multimodalAnd3dCad.test.mjs` checks and meet >= 70/100 Core Capstone rubric; **A** — Using `voiceVisionLab.mjs`, `cadPrintLab.mjs`, and `unit-20-local-ai-3d-capstone` starters; **R** — Culminating multimodal & physical prototyping workflow; **T** — End of Day 8.
- [ ] **Teacher Objective (`[L5 Evaluate | Tiered Scaffolding]`):** **S** — Enforce Core-first milestone gate on Day 5 and inspect student STL geometry live on Day 8; **M** — `100%` of students complete Core Voice+Chat MVP before Bonus/Double-Bonus credit and achieve zero non-manifold warnings on Double-Bonus STL exports; **A** — Guided binary layout walkthrough + `validateMeshForPrint` audit; **R** — Prevents feature creep and guarantees authentic engineering rigor; **T** — Tracked Days 5–8.

## Bloom's Objective Ladder
- **L1–L2:** State 44-byte RIFF/WAVE header layout, `data:` URI prefix stripping for Ollama `llava`, and 84 + `50*T` Binary STL sizing.
- **L3 Apply:** Build `generatePcmWavBuffer`, `buildOllamaVisionPayload`, and `extractVideoFramePlan`.
- **L4 Analyze:** Diagnose inverted triangle winding (`signedVolumeMm3 < 0`), naked manifold edges, and sub-1.2 mm wall defects.
- **L5 Evaluate:** Audit STL printability (`<= 220x220x250 mm`, `zMin === 0`) and produce PrusaSlicer/Cura checklists.
- **L6 Create:** Ship full-stack Multimodal AI Chat + Voice + Vision/Video + Parametric 3D CAD STL Studio.

## 50-Minute Pacing & Teacher Answer Keys
- **Day 4:** Pre-Lesson 20.2 (4m), Slides Part 1 + RIFF/WAVE binary walkthrough (22m), `voiceVisionLab.mjs` coding (24m).
- **Day 5:** Slides Part 2 + Live `capstone-app` 3D Canvas & STL Demo (20m), `cadPrintLab.mjs` + Core MVP Checkpoint (30m).
- **Day 6:** Kahoot Quiz 2 (10m), Post-Lesson 20.2 Exit Ticket (5m), Capstone Integration Sprint (35m).
- **Day 7:** Bonus Vision/Video + Double-Bonus CAD Polish & `node --test` QA (50m).
- **Day 8:** Final Capstone Live Showcase (Voice + Vision + STL Slicer Check) + Post-Unit 20 Evaluation (50m).
- **Pre-Lesson 20.2 Key:**
  1. `44 bytes`
  2. Ollama's `/api/chat` `images` array expects raw base64 bytes; including the `data:image/png;base64,` header causes image decode failure.
  3. `84 + 100 * 50 = 5,084 bytes`.
  4. Naked edges leave open holes and inverted normals turn solids inside-out, causing slicers to fail toolpath generation or omit perimeters.
- **Worksheet Part A Key:**
  1. WAV: `44 + (16000 * 0.5 * 2) = 16,044 bytes`; Binary STL: `84 + 48 * 50 = 2,484 bytes`.
  2. `/9j/4AAQSkZJRg==`
  3. (1) Watertight manifold (`nakedEdges === 0`); (2) Positive signed volume / outward normals; (3) Fits printer bed `<= 220x220x250 mm` and grounded (`zMin === 0`); (4) Minimum wall thickness `>= 1.2 mm`.
- **Worksheet Part C Key:**
  1. Triangles were wound clockwise when viewed from outside (inward normals), causing the divergence-theorem volume integral to invert negative.
  2. A `0.4 mm` nozzle cannot fit 3 solid perimeters (`1.2 mm`), leaving fragile hollow gaps or skipped extrusions in the slicer.
- **Post-Lesson 20.2 Key:**
  1. `44 + (16000 * 0.25 * 2) = 8,044 bytes`; `'RIFF'` at `0..3` and `'WAVE'` at `8..11`.
  2. `84 + 12 * 50 = 684 bytes`; triangle count `UInt32LE` sits at byte offset `80..83`.
  3. Every directed edge `u->v` has exactly one twin `v->u` (`nakedEdges === 0 && nonManifoldEdges === 0`).
  4. Strip `data:image/...;base64,` from image strings, enforce size caps, and resize sampled video keyframes (`<= 512 px`) cleanly into `messages[0].images`.
