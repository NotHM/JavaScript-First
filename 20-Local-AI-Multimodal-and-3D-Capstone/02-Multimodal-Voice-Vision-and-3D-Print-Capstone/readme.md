# Lesson 20.2: Multimodal Voice, Vision/Video Bonus & 3D CAD/Print Capstone

**AZ CTE Standards:** `4.1, 4.3, 9.2, 11.4, 12.2, 15.5, 16.2, 17.0, 19.8`

## Lesson SMART Objectives
- [ ] **`[L3 Apply | 4.1, 16.2]`** Construct valid 44-byte RIFF/WAVE 16-bit PCM buffers (`generatePcmWavBuffer` & `parseWavHeader`) integrating local **Whisper.cpp / Web Speech STT** and **Piper / Web Speech TTS** (`Core`).
- [ ] **`[L4 Analyze | 9.2]`** Build Base64 vision payloads (`llava`), Stable Diffusion / ComfyUI image-gen adapters, and video keyframe sampling plans (`Bonus Tier`).
- [ ] **`[L6 Create | 17.0, 19.8]`** Programmatically compile parametric JSON/OpenJSCAD specs (`box`, `l-bracket`, `spur-gear`) into watertight **ASCII `.stl`**, **Binary `.stl`**, and **Wavefront `.obj`** files verified by an automated 3D printability validator (`Double Bonus Tier — 2x Score`).

---

## 1. CORE: Local Voice Pipeline (`Whisper.cpp` STT + `Piper` TTS + RIFF/WAVE)

To run hands-free voice chat 100% locally:
- **Browser Web Speech API:** `window.SpeechRecognition` captures microphone voice directly in Chromium-based browsers, while `window.speechSynthesis` speaks streamed replies.
- **Offline Binary WAV (`Whisper.cpp` & `Piper`):** Local STT/TTS daemons exchange **16-bit mono PCM `.wav` buffers at `16,000 Hz`**:
  - Bytes `0..3`: `'RIFF'` | Bytes `4..7`: `36 + dataSize` (`UInt32LE`) | Bytes `8..11`: `'WAVE'`
  - Bytes `12..35`: `'fmt '` subchunk (`chunkSize = 16`, `audioFormat = 1` PCM, `channels = 1`, `sampleRate = 16000`, `bitsPerSample = 16`)
  - Bytes `36..43`: `'data'` + `dataSize` (`numSamples * 2` bytes)
  - Total byte length = **`44 + numSamples * 2`**.

---

## 2. BONUS TIER (+25%–50%): Local Image & Video Integration

- **Vision (`llava` / `llama3.2-vision`):** `FileReader.readAsDataURL()` yields `data:image/png;base64,...`. Ollama's `messages[0].images` expects **raw base64 strings only**—strip the `data:image/...;base64,` prefix and validate payload byte limits!
- **Local Image Generation Adapters:** Dispatch structured JSON prompts to **Stable Diffusion WebUI** (`POST /sdapi/v1/txt2img`) or **ComfyUI** (`POST /prompt`), with deterministic offline SVG previews when no GPU daemon runs.
- **Video Keyframe Sampling:** Sample keyframe timestamps `[0, dt, 2*dt, ...]` up to `maxFrames` and scale dimensions to `<= 512 px` before passing frames to a local vision model.

---

## 3. DOUBLE BONUS TIER (2x Score): Parametric 3D CAD & 3D Printing Pipeline

Turn conversational LLM geometry into physical 3D-printed hardware in pure JavaScript (`cadEngine.mjs`):
1. **Parametric CAD / OpenJSCAD Specs:** LLM outputs structured JSON `{ shape: 'l-bracket' | 'spur-gear' | 'box', ... }` or OpenJSCAD CSG commands.
2. **Watertight Mesh Extrusion:**
   - Ear-clipping 2D polygon triangulation (`triangulatePolygon2D`) + Z/Y extrusion for `box` & `l-bracket`.
   - Annular tooth-and-bore triangulation for `spur-gear`.
   - **Right-Hand Rule Winding:** Every triangle `(a, b, c)` winds counter-clockwise viewed from outside so $(b - a) \times (c - a)$ points outward.
3. **Standards-Compliant STL & OBJ Export:**
   - **ASCII `.stl`:** Human-readable `solid` / `facet normal` / `outer loop` / `vertex` blocks.
   - **Binary `.stl`:** Exact `84 + T * 50` bytes (`80`-byte header + `UInt32LE` count `T` + `50` bytes per triangle: 3 normal `Float32LE`, 9 vertex `Float32LE`, 2-byte attribute).
   - **Wavefront `.obj`:** Deduplicated `v`, `vn`, and `f v//vn` records.
4. **Automated 3D Printability Validator (`validateMeshForPrint`):**
   - **Watertight Manifold:** Every directed half-edge `u->v` has an opposite twin `v->u` (`nakedEdges === 0 && nonManifoldEdges === 0`).
   - **Positive Signed Volume:** $\frac{1}{6}\sum a \cdot (b \times c) > 0$.
   - **Build-Plate Fit & Grounding:** Fits `<= 220 x 220 x 250 mm` (Ender-3 / Prusa MK3/MK4) and rests flat at `zMin === 0`.
   - **Minimum Wall Thickness:** `>= 1.2 mm` (`>= 3` perimeters on a `0.4 mm` nozzle).
   - **Slicer Checklist:** Generates `PrusaSlicer` / `Cura` settings (`0.2 mm` layer height, `20%` infill, PLA `205°C / 60°C`, estimated grams & print time) + live HTML `<canvas>` 3D wireframe preview!

---

## 4. Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Full-Stack Capstone Reference:** [`code/capstone-app/server.mjs`](./code/capstone-app/server.mjs) | [`voiceAndVision.mjs`](./code/capstone-app/voiceAndVision.mjs) | [`cadEngine.mjs`](./code/capstone-app/cadEngine.mjs) | [`public/index.html`](./code/capstone-app/public/index.html)
- **Automated Test Suite:** [`code/multimodalAnd3dCad.test.mjs`](./code/multimodalAnd3dCad.test.mjs)
- **Student Starters:** [`../../0-student_files/20-local-ai-3d/voiceVisionLab.mjs`](../../0-student_files/20-local-ai-3d/voiceVisionLab.mjs) & [`cadPrintLab.mjs`](../../0-student_files/20-local-ai-3d/cadPrintLab.mjs)
