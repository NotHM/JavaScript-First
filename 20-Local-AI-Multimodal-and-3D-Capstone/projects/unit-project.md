# Unit 20 Final Capstone Project: Local Multimodal AI, Governance & 3D Print Studio

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `1.0–19.0`, `CTE AI 11.0102.00`, `AI Std 14.0`, `Azure AI-900`  
**Starter:** [`../../0-student_files/projects/unit-20-local-ai-3d-capstone/`](../../0-student_files/projects/unit-20-local-ai-3d-capstone/server.mjs) • **NLP & Governance Lab:** [`../../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs`](../../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs)

Build a complete, privacy-first, responsibly governed **Full-Stack Local Multimodal AI Chat Application** inside `0-student_files/projects/unit-20-local-ai-3d-capstone/`. Choose your target tier below—everyone MUST complete **CORE (100 pts)** cleanly, including the mandatory **AI Model Card & ReAct/HITL Guardrail audit**, before claiming Bonus or Double-Bonus multipliers!

---

## Tier 1: CORE Capstone (Required — 100 Points)
1. **Local LLM SSE Backend (`server.mjs`):**
   - Connect to configurable `OLLAMA_HOST` (`POST /api/chat`) and translate NDJSON chunks to HTTP SSE (`text/event-stream`), gracefully falling back to a deterministic offline simulator when Ollama is offline.
   - Enforce prompt safety guards, JSON tool-call validation, and zero cloud PII egress (`X-Content-Type-Options: nosniff`).
2. **Local Voice STT & TTS (`server.mjs` + `public/index.html`):**
   - Implement browser SpeechRecognition / WAV upload parsing (`POST /api/voice/stt` validating 44-byte RIFF/WAVE PCM headers) and `POST /api/voice/tts` generating valid `audio/wav` buffers alongside `speechSynthesis`.
3. **Accessible Chat UI & Persistence (`public/index.html`):**
   - Semantic HTML5 (`<header>`, `<main>`, `aria-live="polite"`, `textContent` anti-XSS rendering) persisting conversation history in `localStorage` and `/api/chats`.
4. **Mandatory AI Model Card (`Std 14.0`) & Safe ReAct/HITL Agent Guardrail (`CTE AI 11.0102.00`):**
   - Ship a validated **Model Card** (`model-card.json` checked via `buildAndValidateModelCard()`) documenting EU AI Act risk tier (never `unacceptable`), all 4 **NIST AI RMF** pillars (`Govern, Map, Measure, Manage`), OECD/IEEE principles, `intendedUse`, `outOfScopeUses`, `trainingDataSummary`, `metrics`, `disparateImpactAudit` ($\ge 0.80$ four-fifths rule), `limitations`, and `hitlControls`.
   - Wrap agentic workflows in a sandboxed **ReAct loop (`Thought -> Action -> Observation -> Final Answer`)** enforcing `Object.hasOwn` tool allowlisting, bounded `maxSteps` execution, and **Human-in-the-Loop (HITL)** pause/resume approval gates (`status: 'awaiting_approval'`) before high-risk or destructive tool side effects run.
5. **Automated Tests (`capstone.test.mjs`):** Passing offline `node --test` assertions covering SSE chat, WAV header validation, fallback safety, Model Card compliance, and ReAct/HITL pause/resume gates.

## Tier 2: BONUS (+25% to +50% Points — Local Image & Video Integration)
- **Vision Attachment (+20 pts):** Accept PNG/JPEG/WEBP images via `<input type="file">`, strip `data:image/...;base64,` prefixes cleanly for local vision models (`llava`), and validate byte limits.
- **Image Gen Adapter (+15 pts):** Build a Stable Diffusion WebUI (`/sdapi/v1/txt2img`) or ComfyUI (`/prompt`) JSON dispatch endpoint with offline SVG preview fallback.
- **Video Keyframe Sampler (+15 pts):** Extract deterministic frame timestamps & scaled thumbnail bounds for multi-frame video inspection.

## Tier 3: DOUBLE BONUS (2x Score — Up to 200 / 100! — 3D CAD & Print Pipeline)
- **LLM/Parametric CAD Spec -> Pure JS Mesh (`cadEngine.mjs`):** Generate watertight, outward-wound 3D triangle meshes for at least `box`, `l-bracket`, and `spur-gear` specs (plus OpenJSCAD script generation).
- **Physical Showcase Option for [Unit 21 Drone Build](../../21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/unit-guide.md):** Alongside Core Voice/RAG/Agentic AI, teams may parameterize and export printable STL/OBJ **TPU/PETG drone airframe canopies, camera brackets, or GPS masts** (`>= 1.2 mm` wall, watertight manifold) to bolt onto their Unit 21 frames!
- **Standards-Compliant STL & OBJ Exporters:** Produce valid **ASCII `.stl`**, **Binary `.stl`** (`84 + 50*N` bytes), and **Wavefront `.obj`** downloads.
- **Automated 3D Printability Validator:** Programmatically prove `nakedEdges === 0` (watertight manifold), `signedVolumeMm3 > 0`, bed fit `<= 220x220x250 mm`, `zMin === 0`, and `minWallMm >= 1.2 mm`, outputting a **PrusaSlicer/Cura Slicer Checklist**.
- **Interactive HTML `<canvas>` 3D Previewer:** Render wireframe/shaded 3D triangles with interactive yaw/pitch orbit sliders inside `public/index.html`.
