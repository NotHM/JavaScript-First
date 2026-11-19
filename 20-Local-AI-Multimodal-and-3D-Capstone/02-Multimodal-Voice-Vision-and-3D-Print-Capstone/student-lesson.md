# Student Lesson 20.2: Voice, Vision/Video Bonus & 3D CAD/Print Capstone

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/20-local-ai-3d/voiceVisionLab.mjs`](../../0-student_files/20-local-ai-3d/voiceVisionLab.mjs) & [`cadPrintLab.mjs`](../../0-student_files/20-local-ai-3d/cadPrintLab.mjs)

## My Lesson SMART Objectives
- [ ] **`[L3 Apply | 4.1, 16.2]`** **S/M/A/R/T:** Implement `generatePcmWavBuffer`, `buildOllamaVisionPayload`, and `extractVideoFramePlan` inside `voiceVisionLab.mjs` producing exact RIFF/WAVE headers (`44 + 2*N` bytes) by Day 5.
- [ ] **`[L5 Evaluate | 12.2, 19.8]`** **S/M/A/R/T:** Verify mesh watertightness (`nakedEdges === 0`), bed fit (`<= 220x220x250 mm`), and minimum wall (`>= 1.2 mm`) inside `cadPrintLab.mjs` by Day 6.
- [ ] **`[L6 Create | 1.0–19.0]`** **S/M/A/R/T:** Ship the **Unit 20 Final Capstone** (`Core` 100 pts + optional `Bonus` & `2x Double Bonus`) inside `0-student_files/projects/unit-20-local-ai-3d-capstone/` with passing `node --test` assertions by Day 8.

---

## Part A: WAV Binary Audio & Binary STL Math (`[L1]`–`[L2]`)
1. Calculate exact total file size (in bytes) for each binary format:
   - Uncompressed `16,000 Hz`, `16-bit` mono `.wav` lasting `0.5 seconds`: `__________ bytes`
   - Binary `.stl` file storing `48` triangles: `________ bytes`
2. Convert this browser Data URL into the raw string expected by Ollama `llava` `messages[0].images`:  
   `data:image/jpeg;base64,/9j/4AAQSkZJRg==` -> `____________________`
3. List the 4 conditions required by `validateMeshForPrint()` before exporting a part to PrusaSlicer or Cura:
   - 1) `________________________________`
   - 2) `________________________________`
   - 3) `________________________________`
   - 4) `________________________________`

---

## Part B: Voice, Vision & 3D CAD Labs (`[L3 Apply]` & `[L6 Create]`)
1. Complete [`0-student_files/20-local-ai-3d/voiceVisionLab.mjs`](../../0-student_files/20-local-ai-3d/voiceVisionLab.mjs) (`generatePcmWavBuffer`, `buildOllamaVisionPayload`, `extractVideoFramePlan`).
2. Complete [`0-student_files/20-local-ai-3d/cadPrintLab.mjs`](../../0-student_files/20-local-ai-3d/cadPrintLab.mjs) (`exportAsciiStl`, `exportBinaryStl`, `validateMeshForPrint`).
3. Verify the reference server & geometry suite by running:  
   `node --test 20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/code/multimodalAnd3dCad.test.mjs`

---

## Part C: Geometry & Multimodal Forensics (`[L4 Analyze]`)
1. **Negative Signed Volume Bug:** A student builds a parametric cube whose `exportAsciiStl()` looks visible in preview, yet `signedVolumeMm3` equals `-24000 mm³` and slicers invert the walls! What triangle-vertex mistake caused this?  
   > `________________________________________________________`
2. **Thin Wall Print Failure:** A bracket flange is generated at `0.7 mm` thickness for a `0.4 mm` 3D printer nozzle (`minWallThresholdMm = 1.2 mm`). What happens physically if you force-slice it without catching it in `validateMeshForPrint()`?  
   > `________________________________________________________`

---

## Part D: Capstone Tier Plan & Slicer Defense (`[L5 Evaluate]`)
Check your intended Unit 20 Capstone target and defend how your architecture satisfies data sovereignty and offline testability:
- [ ] **Core (100 pts):** Local SSE Chat + Voice STT/TTS + Persistence
- [ ] **Bonus (+25%–50%):** Image Vision (`llava`) + Image Gen + Video Sampler
- [ ] **Double Bonus (2x Score!):** Parametric 3D CAD (`box`, `l-bracket`, `spur-gear`) -> STL/OBJ + Canvas 3D Preview + Print Validator  
> *(Your architectural pitch)*
