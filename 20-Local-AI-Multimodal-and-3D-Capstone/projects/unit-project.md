# Unit 20 Final Capstone Project: Local Multimodal AI & 3D Print Studio

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `1.0–19.0`  
**Starter:** [`../../0-student_files/projects/unit-20-local-ai-3d-capstone/`](../../0-student_files/projects/unit-20-local-ai-3d-capstone/server.mjs)

Build a complete, privacy-first **Full-Stack Local Multimodal AI Chat Application** inside `0-student_files/projects/unit-20-local-ai-3d-capstone/`. Choose your target tier below—everyone MUST complete **CORE (100 pts)** cleanly before claiming Bonus or Double-Bonus multipliers!

---

## Tier 1: CORE Capstone (Required — 100 Points)
1. **Local LLM SSE Backend (`server.mjs`):**
   - Connect to configurable `OLLAMA_HOST` (`POST /api/chat`) and translate NDJSON chunks to HTTP SSE (`text/event-stream`), gracefully falling back to a deterministic offline simulator when Ollama is offline.
   - Enforce prompt safety guards, JSON tool-call validation, and zero cloud PII egress (`X-Content-Type-Options: nosniff`).
2. **Local Voice STT & TTS (`server.mjs` + `public/index.html`):**
   - Implement browser SpeechRecognition / WAV upload parsing (`POST /api/voice/stt` validating 44-byte RIFF/WAVE PCM headers) and `POST /api/voice/tts` generating valid `audio/wav` buffers alongside `speechSynthesis`.
3. **Accessible Chat UI & Persistence (`public/index.html`):**
   - Semantic HTML5 (`<header>`, `<main>`, `aria-live="polite"`, `textContent` anti-XSS rendering) persisting conversation history in `localStorage` and `/api/chats`.
4. **Automated Tests (`capstone.test.mjs`):** Passing offline `node --test` assertions covering SSE chat, WAV header validation, and fallback safety.

## Tier 2: BONUS (+25% to +50% Points — Local Image & Video Integration)
- **Vision Attachment (+20 pts):** Accept PNG/JPEG/WEBP images via `<input type="file">`, strip `data:image/...;base64,` prefixes cleanly for local vision models (`llava`), and validate byte limits.
- **Image Gen Adapter (+15 pts):** Build a Stable Diffusion WebUI (`/sdapi/v1/txt2img`) or ComfyUI (`/prompt`) JSON dispatch endpoint with offline SVG preview fallback.
- **Video Keyframe Sampler (+15 pts):** Extract deterministic frame timestamps & scaled thumbnail bounds for multi-frame video inspection.

## Tier 3: DOUBLE BONUS (2x Score — Up to 200 / 100! — 3D CAD & Print Pipeline)
- **LLM/Parametric CAD Spec -> Pure JS Mesh (`cadEngine.mjs`):** Generate watertight, outward-wound 3D triangle meshes for at least `box`, `l-bracket`, and `spur-gear` specs (plus OpenJSCAD script generation).
- **Standards-Compliant STL & OBJ Exporters:** Produce valid **ASCII `.stl`**, **Binary `.stl`** (`84 + 50*N` bytes), and **Wavefront `.obj`** downloads.
- **Automated 3D Printability Validator:** Programmatically prove `nakedEdges === 0` (watertight manifold), `signedVolumeMm3 > 0`, bed fit `<= 220x220x250 mm`, `zMin === 0`, and `minWallMm >= 1.2 mm`, outputting a **PrusaSlicer/Cura Slicer Checklist**.
- **Interactive HTML `<canvas>` 3D Previewer:** Render wireframe/shaded 3D triangles with interactive yaw/pitch orbit sliders inside `public/index.html`.
