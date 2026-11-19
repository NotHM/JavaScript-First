---
title: "Lesson 20.2 — Multimodal Voice, Vision Bonus & 3D CAD Double Bonus"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 20.2: Voice, Vision & 3D CAD Capstone
**AZ CTE Standards `4.1, 4.3, 9.2, 12.2, 15.5, 16.2, 19.8`**

---

### `[L3 Apply]` CORE (100 pts): Local Voice + RIFF/WAVE PCM

```text
[0..3]  "RIFF"    [4..7]  36 + dataSize   [8..11] "WAVE"
[12..35] "fmt "   (PCM=1, Channels=1, SampleRate=16000, 16-bit)
[36..39] "data"   [40..43] dataSize       [44..]  Int16LE samples
```

- Exact byte length: `44 + (sampleRate * durationSec * 2)`
- Pairs Web Speech API (`SpeechRecognition` / `speechSynthesis`) with local `Whisper.cpp` & `Piper` WAV buffers!

---

### `[L3 Apply -> L5 Evaluate]` BONUS (+25–50%): Image & Video

- **Vision (`llava`):** Strip `data:image/png;base64,` before sending `images: [...]` to Ollama
- **Image Gen:** Dispatch clean JSON contracts to **SD WebUI** (`/sdapi/v1/txt2img`) or **ComfyUI** (`/prompt`)
- **Video Sampler:** Extract bounded keyframe timestamps (`[0, 2, 4, ...]`) resized `<= 512 px`!

---

### `[L6 Create]` DOUBLE BONUS (2x Score!): Parametric 3D CAD -> `.stl`

```text
LLM JSON / OpenJSCAD Spec
   -> Watertight Triangle Mesh (box, l-bracket, spur-gear)
   -> ASCII .stl + Binary .stl (84 + 50*T bytes) + .obj
   -> Printability Validator -> HTML5 <canvas> 3D Preview -> PrusaSlicer/Cura!
```

- **Predict:** Why does our validator check every half-edge `u->v` for an opposite twin `v->u`?
- **Answer:** Proves `nakedEdges === 0` (**watertight 2-manifold**) so the slicer builds solid shells instead of empty holes!

---

### `[L5 Evaluate -> L6 Create]` Printability Gate & Capstone Sprint

1. Watertight (`nakedEdges === 0`) & positive signed volume (`> 0`)
2. Build plate fit `<= 220 x 220 x 250 mm` & grounded (`zMin === 0`)
3. Minimum wall `>= 1.2 mm` (`>= 3` perimeters @ `0.4 mm` nozzle)
4. **Unit 21 Physical Showcase Option:** Export printable STL/OBJ TPU/PETG drone airframe canopies, camera brackets, or GPS masts alongside Core Voice/RAG/Agentic AI!
5. Complete `voiceVisionLab.mjs` + `cadPrintLab.mjs` -> build `unit-20-local-ai-3d-capstone`!
