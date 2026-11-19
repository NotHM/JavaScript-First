# Unit 20 Setup Guide: Local Ollama, Whisper/Piper Audio, 3D CAD `.stl` & Governance

**Unit Focus:** Privacy-First Local LLM Inference (`127.0.0.1:11434`), RIFF/WAVE Voice PCM, Vision (`llava`), Watertight `.stl`/`.obj` 3D Print Validation, & NIST/EU AI Act Model Cards  
**Zero-Daemon / Zero-GPU Guarantee:** Every student lab and `npm run grade -- --unit 20` check runs **100% deterministically offline in Node 24** with offline SSE, WAV, STL, and ReAct simulators—no dedicated GPU, Ollama daemon, Whisper binary, or 3D printer is required to run automated grading.

---

## 1. Baseline Node 24 Verification & Reference Suites

Verify Node 24 (`v24+`) and execute all three Unit 20 instructor reference suites:

```bash
node -v
node --test 20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/code/localAiStreamAndRag.test.mjs
node --test 20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/code/multimodalAnd3dCad.test.mjs
node --test 20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/code/nlpAgenticGovernanceDemo.test.mjs
```

Expected output: **100% passing zero-dependency tests** verifying NDJSON buffering, cosine RAG, 44-byte RIFF/WAVE audio, `llava` base64 normalization, ASCII/Binary STL manifold geometry, TF-IDF, ReAct HITL pause/resume, and Model Card checks.

---

## 2. Installing & Verifying Local Ollama (`llama3.2` + `llava`)

For live GPU/CPU token streaming and multimodal image inspection on your workstation:

```bash
# Linux / macOS install (skip if already installed in lab image)
curl -fsSL https://ollama.com/install.sh | sh

# Verify daemon & pull recommended Core + Bonus Vision models
ollama --version
ollama pull llama3.2     # Quantized GGUF text/tool chat (~2 GB)
ollama pull llava        # Optional Bonus Vision model (~4.7 GB)
```

### Verify `127.0.0.1:11434` Streaming & CORS Configuration

Confirm Ollama responds on loopback (`127.0.0.1:11434`) and streams NDJSON lines cleanly:

```bash
curl -s http://127.0.0.1:11434/api/tags | head -c 200
curl -s -N http://127.0.0.1:11434/api/chat \
  -d '{"model":"llama3.2","stream":true,"messages":[{"role":"user","content":"Reply OK"}]}'
```

If launching a browser directly against Ollama rather than proxying through `server.mjs`, bind strictly to localhost with explicit origins:

```bash
OLLAMA_HOST=127.0.0.1:11434 OLLAMA_ORIGINS="http://127.0.0.1:3030,http://localhost:3030" ollama serve
```

> **Security Guard:** Never expose `OLLAMA_HOST=0.0.0.0:11434` on school/public Wi-Fi without authentication; bind exclusively to `127.0.0.1`.

---

## 3. Offline Voice Pipeline (`Whisper.cpp` STT & `Piper` TTS — 16 kHz PCM `.wav`)

Both `Whisper.cpp` and `Piper` expect **uncompressed 16-bit mono PCM `.wav` at `16,000 Hz`** (exact byte size `44 + numSamples * 2`):

```bash
# Example Whisper.cpp local STT verification (when local binary + model exist)
./whisper-cli -m models/ggml-base.en.bin -f sample-16khz-mono.wav

# Example Piper local neural TTS -> raw 16kHz PCM / WAV
echo "Local AI voice pipeline verified." | piper --model en_US-lessac-medium.onnx --output_file reply.wav

# Convert arbitrary microphone audio cleanly to 16kHz mono 16-bit WAV using ffmpeg
ffmpeg -i input.webm -ar 16000 -ac 1 -c:a pcm_s16le output-16k.wav
```

When native binaries are absent, [`server.mjs`](../0-student_files/projects/unit-20-local-ai-3d-capstone/server.mjs) and `voiceVisionLab.mjs` generate and verify standards-compliant 44-byte RIFF/WAVE buffers directly in JavaScript.

---

## 4. 3D Print Pipeline (`OpenSCAD` / `PrusaSlicer` / `Cura` `.stl` Verification)

Before exporting parametric CAD meshes to physical printers (`220 x 220 x 250 mm` build volume, `0.4 mm` nozzle):

```bash
# Optional CLI geometry slicing / headless inspection
openscad --version          # Optional parametric CAD preview CLI
prusa-slicer --version      # Or launch UltiMaker Cura / PrusaSlicer GUI

# Quick headless slice check (PrusaSlicer CLI)
prusa-slicer --export-gcode --layer-height 0.2 --fill-density 20% spur_gear_12t.stl
```

### Mandatory Pre-Slicer Geometry Checks (`cadEngine.mjs`)
1. **Watertight Manifold:** `nakedEdges === 0` and `nonManifoldEdges === 0`.
2. **Outward Winding:** `signedVolumeMm3 > 0` (`< 0` means inverted face normals!).
3. **Build Plate & Z-Zero Grounding:** Part bounds fit `<= 220 x 220 x 250 mm` and sit flush on `zMin === 0`.
4. **Wall Thickness:** Minimum feature wall `>= 1.2 mm` (`>= 3` perimeters at `0.4 mm` extrusion width).

---

## 5. Governance Audit & Automated Student Grader (`node:test`)

Verify syntax across all Unit 20 student starters, check Model Card compliance, and run the automated lab grader:

```bash
node --check 0-student_files/20-local-ai-3d/ragAndStreamLab.mjs
node --check 0-student_files/20-local-ai-3d/voiceVisionLab.mjs
node --check 0-student_files/20-local-ai-3d/cadPrintLab.mjs
node --check 0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs
node --check 0-student_files/projects/unit-20-local-ai-3d-capstone/cadEngine.mjs
node --check 0-student_files/projects/unit-20-local-ai-3d-capstone/server.mjs

# Run automated Unit 20 RED -> GREEN grading suites (zero live Ollama required)
npm run grade -- --unit 20
```

Run individual Unit 20 test targets directly while developing:

```bash
node --test 0-student_files/20-local-ai-3d/ragAndStreamLab.test.mjs
node --test 0-student_files/20-local-ai-3d/multimodalAndCadLab.test.mjs
node --test 0-student_files/20-agentic-nlp-governance/nlpAgenticLab.test.mjs
node --test 0-student_files/projects/unit-20-local-ai-3d-capstone/capstone.test.mjs
```

---

## 6. Common Setup Error Triage Table

| Symptom / Error | Root Cause | Exact Fix |
|---|---|---|
| `ECONNREFUSED 127.0.0.1:11434` on `/api/chat` | Ollama daemon isn't running or stopped listening | Run `ollama serve` (or ensure `server.mjs` triggers offline fallback cleanly!) |
| `400 Bad Request` on Ollama vision (`/api/chat`) | Sending `data:image/png;base64,...` prefix inside `images[]` | Strip `data:image/...;base64,` header in `buildOllamaVisionPayload()` |
| `Whisper.cpp` complains of invalid WAV frequency/channels | Browser recorded `48 kHz` stereo WebM/WAV | Convert via `ffmpeg -ar 16000 -ac 1 -c:a pcm_s16le` or verify `parseWavHeader()` |
| `PrusaSlicer` reports "open edges" or inside-out part | Unpaired half-edges or CW vertex triangle winding | Fix triangle vertex order (CCW right-hand rule) & run `validateMeshForPrint()` |
| CORS error calling `11434` from browser tab | Calling Ollama directly from HTML instead of Node proxy | Route requests through `/api/chat` on `server.mjs` or set `OLLAMA_ORIGINS` |
| `buildAndValidateModelCard` sets `deployable: false` | Missing NIST pillar, `unacceptable` tier, or disparate impact `< 0.80` | Populate all 4 NIST pillars (`govern/map/measure/manage`), `hitlControls`, and audit `>= 0.80` |
