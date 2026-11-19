# Unit 20: Final Capstone — Local Multimodal AI, Agentic Governance & 3D Print Studio

**Course:** JavaScript First — Software & App Design (`AZ CTE CIP 11.0202.00` & West-MEC `AI101–AI202`)  
**Quick Links:** [`setup-guide.md`](./setup-guide.md) · [`unit-guide.md`](./unit-guide.md) · [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) · `npm run grade -- --unit 20`

---

> *Look at how most tutorials teach "AI apps" right now: install one wrapper SDK, paste a credit-card API key into `.env`, and celebrate because a spinning loader printed a streaming paragraph. Then take that app into a real school district, robotics lab, or clinic. Suddenly your app is blasting student IEPs, audio transcripts, or proprietary engineering drawings to a remote third-party endpoint you do not control—breaking FERPA, blowing up per-token bills, and trusting unverified LLM JSON straight against your backend. Wait—we already know JavaScript can run HTTP servers, binary Buffers, vector math, and computational geometry natively. Why not own the entire stack locally?*

Welcome to Unit 20. Everything you built in Units `01–19`—asynchronous streams, HTTP endpoints, binary file headers, `<canvas>` rendering, automated `node --test` assertions, and defensive security—comes together here in a **100% private, zero-cloud-egress, responsibly governed Full-Stack Multimodal AI Application**. You will move cleanly from **Core local LLM streaming + Voice + Governance (`20.1` + `20.3`)**, through **Bonus Vision & Video inspection**, all the way to a **Double-Bonus (2x Score) Parametric 3D CAD engine** that turns natural-language prompts into watertight `.stl` / `.obj` parts ready for a physical 3D printer (`20.2`).

Let's peel off the AI hype and engineer the real plumbing step by step.

---

## Why Local-First AI Beats Blindly Calling Cloud APIs

When you send text, voice audio, or camera frames to an external SaaS LLM, three things happen immediately:
1. **Data Sovereignty & Compliance Risk (`FERPA` / `COPPA`):** Student emails, SSNs, grades, and classroom recordings leave district hardware onto servers whose retention and training policies change quarterly.
2. **Network & Rate-Limit Fragility:** Classroom Wi-Fi drops, billing tiers throttle, and closed endpoints break reproducibly graded code.
3. **Opaque Failure Modes:** Without explicit input guards, grounding citations, or Human-in-the-Loop (HITL) pauses, an LLM prompt injection can trick an autonomous tool loop into wiping files or hallucinating policy.

Running inference locally via **Ollama** (`127.0.0.1:11434`), **OpenAI-compatible local servers** (`/v1/chat/completions`), or in-browser **WebGPU / WASM (`Transformers.js`)** keeps zero PII leaving the machine. Even better: quantized **GGUF** files (`Q4_K_M`, `Q8_0`) shrink 16-bit `~14 GB` `7B`-parameter weights down to `~4.5 GB` of RAM/VRAM so ordinary school laptops run capable reasoning and vision (`llava`) models smoothly without cloud GPU bills.

---

## 1. Local LLM Streaming (`NDJSON -> SSE`), Cosine RAG & Tool Safety (`20.1`)

When you `POST` to Ollama's local REST endpoint (`http://127.0.0.1:11434/api/chat`), Ollama does **not** return SSE (`text/event-stream`). It streams **NDJSON**—one JSON object per newline (`\n`).

Here is the trap every beginner hits on day one: TCP chunks do **not** respect `\n` boundaries. Chunk 1 might end mid-word with `{"message":{"content":"Hel` and Chunk 2 starts with `lo"}}\n`. Calling `JSON.parse(chunk)` directly crashes intermittently with `SyntaxError: Unterminated string in JSON`.

The fix is a 12-line stateful buffer inside [`localAiServer.mjs`](./01-Local-LLM-Architecture-and-Streaming/code/localAiServer.mjs) and your student lab [`ragAndStreamLab.mjs`](../0-student_files/20-local-ai-3d/ragAndStreamLab.mjs):

```javascript
export function createNdjsonLineParser(onJson) {
  let buffer = '';
  return {
    push(chunk) {
      buffer += typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8');
      let nl;
      while ((nl = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (line) onJson(JSON.parse(line));
      }
    },
    flush() {
      const rest = buffer.trim();
      buffer = '';
      if (rest) onJson(JSON.parse(rest));
    },
  };
}
```

Once your Node server parses each complete NDJSON token, it writes an SSE frame (`data: {"token":"Hello"}\n\n`) using `Content-Type: text/event-stream; charset=utf-8` and finishes with `data: [DONE]\n\n`. And notice our golden rule from Unit 17–19: when `OLLAMA_HOST` is offline or unreachable during CI grading, your backend degrades cleanly to an offline deterministic simulator instead of hanging or crashing!

### Grounding with Cosine Similarity (`RAG`) & Blocking Prompt Injections

To ground answers in verified course notes instead of model guesswork, we embed chunks and rank alignment using **Cosine Similarity**:

$$\text{cosine}(A, B) = \frac{\sum_i A_i B_i}{\|A\| \, \|B\|} \in [-1, 1]$$

- Identical direction (`[1, 0]` vs `[5, 0]`) -> **`1`**
- Orthogonal unrelated topics (`[1, 0]` vs `[0, 1]`) -> **`0`**
- Opposite polarity (`[1, 0]` vs `[-1, 0]`) -> **`-1`**

Before any prompt touches RAG or a tool call:
1. **`guardPromptSafety(rawPrompt)`:** Flags injection phrases (`ignore previous instructions`, `<script`), escapes `<` / `>` HTML characters, and rejects empty/oversized prompts.
2. **`redactPiiForLog(text)`:** Scrubs emails and SSNs before anything hits stdout/log files.
3. **`validateToolCall(toolCall, toolSchemas)`:** Never execute LLM-emitted JSON blindly. Enforce an allowlist (`Object.hasOwn`) and validate every required parameter's runtime JS type (`number` finite check, `string`, `array`).

---

## 2. Core Voice, Bonus Vision/Video & Double-Bonus 3D CAD Capstone (`20.2`)

A real multimodal desktop assistant does not stop at text bubbles:

### Core Tier: Local Voice (`Whisper.cpp` STT + `Piper` TTS + RIFF/WAVE)
In the browser, Web Speech APIs (`SpeechRecognition` and `speechSynthesis`) work zero-install, while native offline voice engines (`Whisper.cpp` and `Piper`) communicate via **16-bit mono PCM `.wav`** binary containers at `16,000 Hz`. A valid WAV `Buffer` ALWAYS starts with a **44-byte RIFF/WAVE header**:
- Bytes `0..3`: `'RIFF'`, Bytes `4..7`: `UInt32LE(36 + dataSize)`, Bytes `8..11`: `'WAVE'`
- Bytes `12..35`: `'fmt '` (`subchunkSize = 16`, `audioFormat = 1` PCM, `channels = 1`, `sampleRate = 16000`, `bitsPerSample = 16`)
- Bytes `36..43`: `'data'` + `UInt32LE(dataSize)` where `dataSize = numSamples * 2`
- Total buffer length = **`44 + numSamples * 2`** (`0.5 s` at `16 kHz` = `16,044` bytes; `1.0 s` = `32,044` bytes).

### Bonus Tier (+25%–50%): Base64 Vision (`llava`), Image Gen & Video Keyframes
When `<input type="file">` uses `FileReader.readAsDataURL()`, browsers attach `data:image/png;base64,` onto the string. **Ollama `/api/chat` (`llava`) rejects that prefix.** Your `buildOllamaVisionPayload()` helper strips the `data:image/...;base64,` header, rejects corrupted base64 strings, enforces byte limits, and places raw base64 inside `messages[0].images`. Bonus extensions also dispatch JSON jobs to **Stable Diffusion WebUI** (`/sdapi/v1/txt2img`) or **ComfyUI** (`/prompt`), and compute deterministic keyframe plans (`extractVideoFramePlan`) capped by `maxFrames` and scaled `<= 512 px` for video analysis.

### Double-Bonus Tier (2x Score): Pure JS Parametric 3D CAD -> Physical 3D Print
Here is the centerpiece engineering feat in [`cadEngine.mjs`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/code/capstone-app/cadEngine.mjs): turning structured specs (`box`, `l-bracket`, `spur-gear`) into physical manufacturing geometry with zero native CAD libraries:

1. **Outward Right-Hand Winding:** Triangles `(a, b, c)` wind counter-clockwise looking from the outside so `(b - a) × (c - a)` points outward.
2. **ASCII `.stl` & Binary `.stl` (`84 + 50 * T`):** Binary STL packs an `80`-byte ASCII header, a `4`-byte `UInt32LE` triangle count `T` at byte `80`, and `50` bytes per facet (`12` `Float32LE` coords for normal + 3 vertices + `2`-byte attribute count). Wavefront `.obj` deduplicates `v` vertices and emits `vn` and `f v//vn` faces:

```javascript
export function exportBinaryStl(headerText, triangles) {
  const buf = Buffer.alloc(84 + triangles.length * 50);
  buf.write(String(headerText).slice(0, 79), 0, 'ascii');
  buf.writeUInt32LE(triangles.length, 80);

  let offset = 84;
  for (const tri of triangles) {
    for (const c of tri.normal) { buf.writeFloatLE(c, offset); offset += 4; }
    for (const v of tri.vertices) {
      for (const c of v) { buf.writeFloatLE(c, offset); offset += 4; }
    }
    buf.writeUInt16LE(0, offset); // 2-byte attribute count
    offset += 2;
  }
  return buf;
}
```

3. **Automated 3D Printability Gate (`validateMeshForPrint`):** You do not wait until `PrusaSlicer` throws an error to know a part fails:
   - **Watertight Manifold:** Every directed half-edge `u->v` must pair with an opposite twin `v->u` (`nakedEdges === 0 && nonManifoldEdges === 0`).
   - **Positive Signed Volume:** Divergence theorem $\frac{1}{6}\sum a \cdot (b \times c) > 0$ (negative means inverted normals!).
   - **Build-Plate & Grounding:** Fits `<= 220 x 220 x 250 mm` (Ender-3 / Prusa MK3/MK4 envelope) and sits flat (`zMin === 0`).
   - **Wall Thickness:** `>= 1.2 mm` (`>= 3` perimeters on a standard `0.4 mm` nozzle).

---

## 3. Classical/Modern NLP, Sandboxed ReAct Agents & AI Governance (`20.3`)

In West-MEC `AI101–AI202` and `Azure AI-900`, knowing *how* to ship a model matters less than proving your pipeline is accurate, bounded, and legally deployable:

### Classical NLP & TF-IDF (`tf * log(N / df)`)
Before neural attention, `tokenizeAndStem()` normalizes Unicode (`NFKD`), expands contractions (`n't` -> ` not`), drops stopwords, and stems suffixes (`models` -> `model`, `running` -> `run`, `validating` -> `valid`). Next, `computeTfIdfCorpus()` computes sparse vectors using:

$$\text{tfidf}(t, d) = \text{tf}(t, d) \times \ln\!\left(\frac{N}{\text{df}(t)}\right)$$

Any boilerplate word appearing in all $N$ documents ($\text{df} = N$) scores $\ln(1) = 0$ and automatically drops to zero weight! Notice also one critical ordering rule in `classifySentimentAndIntent()`: **detect negation cues (`not`, `no`, `never`) BEFORE stripping stopwords**, or `"This agent is not safe"` silently turns into `"agent safe"` and gets scored positive! Lightweight NER scans also pull structured `EMAIL`, `STANDARD_OR_REG` (`NIST AI RMF`, `EU AI Act`, `FERPA`), and `METRIC` (`98.5%`, `1.2mm`) spans cleanly without cloud APIs.

### Discriminative (`P(y|x)`) vs. Generative (`P(x, y)`) Models

| Engineering Axis | Discriminative (`P(y\|x)`) | Generative (`P(x, y)`) |
|---|---|---|
| **Core Objective** | Classify labels (`sentiment`, `intent`, fraud) | Synthesize text tokens, images, audio, or 3D JSON |
| **Determinism Lever** | Softmax decision threshold calibration | Low `temperature` (`0.0–0.2`) + `top-p` nucleus bounds |
| **Primary Failure Mode** | Subgroup bias (`disparate impact < 0.80`) | Hallucination / confabulation & prompt-injected tools |

### Sandboxed ReAct Loops & Human-in-the-Loop (`HITL`) Pause/Resume
When an LLM acts autonomously inside [`nlpAgenticLab.mjs`](../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs) using the **ReAct loop** (`Thought -> Action -> Observation -> Final Answer`):
- **Prototype-Safe Allowlisting:** Always check `Object.hasOwn(tools, action.name)` so malicious tool names like `"toString"` or `"__proto__"` can never reach `tools[name]`.
- **Step Budget (`maxSteps`):** Caps runaway reasoning loops deterministically (`status: 'max_steps_exceeded'`).
- **Human-in-the-Loop (`HITL`) Gate:** High-risk or destructive tools pause immediately, returning a serializable `resumeState` before side effects run:

```javascript
const paused = await runReActAgent({ goal: 'Purge stale batch-42', tools, modelStep, maxSteps: 5 });
// paused.status === 'awaiting_approval' -> deleteCount is STILL 0!

const finalRun = await runReActAgent({
  goal: 'Purge stale batch-42',
  tools,
  modelStep,
  maxSteps: 5,
  state: paused.resumeState,
  approvalDecision: { approved: false, reviewer: 'instructor', reason: 'Keep audit trail' },
});
// Denied path skips execution cleanly -> HITL_DENIED recorded in observation memory!
```

### EU AI Act, NIST AI RMF & Disparate Impact Model Cards
Every Unit 20 capstone ships a validated Model Card checked via `buildAndValidateModelCard()` against:
- **EU AI Act Tiers:** `unacceptable` (Article 5 social scoring -> hard-blocked `deployable: false`), `high` (education/hiring -> strict full audit), `limited` (transparency disclosure), `minimal`.
- **NIST AI RMF 1.0:** Mandatory documented controls across **Govern, Map, Measure, Manage** plus `intendedUse`, `outOfScopeUses`, `trainingDataSummary`, `metrics`, `disparateImpactAudit`, `limitations`, and `hitlControls`.
- **Four-Fifths (80%) Fairness Rule:** Across subgroup selection rates, $\text{minRate} / \text{maxRate} \ge 0.80$ (`0.63 / 0.90 = 0.70` blocks high-risk deployment!).

---

## Capstone Build Order & Rubric Tier Strategy (`Core -> Bonus -> Double Bonus`)

Before diving into extra features on [`projects/unit-project.md`](./projects/unit-project.md), lock in **100-pt Core** cleanly so your architecture always stays shippable under deadline:

| Tier | Required Modules & Endpoints | Automated Proof (`node --test`) |
|---|---|---|
| **Core (100 pts)** | Node SSE `/api/chat` + offline simulator, `16 kHz` PCM WAV `/api/voice/tts` & `/api/voice/stt`, accessible `localStorage` chat UI, sandboxed ReAct HITL gate & validated Model Card | `ragAndStreamLab.test.mjs`, `nlpAgenticLab.test.mjs`, `/api/health`, `/api/voice/tts`, `/api/chat` |
| **Bonus (+25%–50%)** | `llava` Base64 upload stripping, Stable Diffusion WebUI / ComfyUI adapter, & video keyframe sampling (`<= 512 px`) | `multimodalAndCadLab.test.mjs` (`buildOllamaVisionPayload`, `extractVideoFramePlan`) |
| **Double Bonus (2x — 200 pts)** | Pure-JS parametric meshes (`box`, `l-bracket`, `spur-gear`), ASCII/Binary `.stl`, `.obj`, `<canvas>` 3D orbit viewer, & automated printability gate (`<= 220x220x250 mm`, `>= 1.2 mm`) | `multimodalAndCadLab.test.mjs` + `capstone.test.mjs` (`/api/cad/generate`) |

---

## Try This Right Now

Verify all three zero-dependency reference engines and run the Unit 20 automated grader in under 3 seconds:

```bash
node --test 20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/code/localAiStreamAndRag.test.mjs
node --test 20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/code/multimodalAnd3dCad.test.mjs
node --test 20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/code/nlpAgenticGovernanceDemo.test.mjs
node 20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/code/nlpAgenticGovernanceDemo.mjs
npm run grade -- --unit 20
```

Want to spin up live local inference (`ollama pull llama3.2`), wire up Whisper/Piper `.wav` audio, or check `.stl` meshes in `PrusaSlicer`? Follow the step-by-step instructions in [`setup-guide.md`](./setup-guide.md).

---

## Core Terminology Reference

| Term | Exact Technical Definition | Where You Implement It |
|---|---|---|
| **NDJSON vs. SSE** | Line-delimited JSON chunks emitted by Ollama vs. `data: ...\n\n` browser `text/event-stream` frames | `createNdjsonLineParser` (`20.1`) |
| **GGUF (`Q4_K_M`)** | Single-file quantized weight container cutting `7B` VRAM footprint to `~4.5 GB` | [`localAiServer.mjs`](./01-Local-LLM-Architecture-and-Streaming/code/localAiServer.mjs) |
| **Cosine Similarity** | Normalized dot product $A \cdot B / (\|A\|\|B\|)$ scoring vector alignment in `[-1, 1]` | `cosineSimilarity` (`20.1`) |
| **RIFF / WAVE PCM** | `44`-byte uncompressed audio header + `Int16LE` frames (`44 + 2 * N` bytes) | `generatePcmWavBuffer` (`20.2`) |
| **Half-Edge Manifold** | Geometric topology proof where every `u->v` edge pairs with twin `v->u` (`nakedEdges === 0`) | `cadEngine.mjs` (`20.2`) |
| **Binary STL** | `80`-byte header + `UInt32LE` triangle count `T` + `50` bytes per facet (`84 + 50*T`) | `exportBinaryStl` (`20.2`) |
| **TF-IDF (`tf * ln(N/df)`)** | Term-frequency weighted by log rarity; shared terms (`df = N`) drop to `0` | `computeTfIdfCorpus` (`20.3`) |
| **ReAct + HITL Gate** | `Thought -> Action -> Observation` loop pausing at `awaiting_approval` before destructive tools | `runReActAgent` (`20.3`) |
| **Disparate Impact (80%)** | Ratio $\text{minRate}/\text{maxRate} \ge 0.80$ guarding against subgroup bias | `buildAndValidateModelCard` (`20.3`) |

---

## Common Unit 20 Error Triage Table

| Failure Symptom | Root Cause | Exact Fix |
|---|---|---|
| `SyntaxError: Unexpected end of JSON input` while streaming | Calling `JSON.parse()` directly on raw HTTP chunks without buffering `\n` | Use `createNdjsonLineParser()` buffer + `flush()` (`20.1`) |
| Ollama `llava` rejects Base64 vision upload | Passing full `data:image/png;base64,...` Data URL | Strip prefix up to `base64,` before putting in `images[]` |
| `.stl` mesh loads inverted or leaks inside slicer | CW triangle winding gives negative `signedVolumeMm3` or missing twin half-edges | Enforce CCW right-hand winding & run `validateMeshForPrint()` |
| `"This bot is not safe"` scores positive sentiment | Stripping `"not"` as a stopword *before* polarity negation scan | Check `NEGATION_WORDS` *before* stopword filtering (`20.3`) |
| Agent invokes `"toString"` bypassing allowlist check | Using `if (tools[name])` instead of own-property check | Gate every dispatch with `Object.hasOwn(tools, name)` |
| Automated `node --test` hangs waiting for Ollama | Fetching `127.0.0.1:11434` without offline fallback or timeout | Fall back cleanly to deterministic simulator when upstream refuses |

---

## Lessons & Full Curriculum Links
1. **[Lesson 20.1 — Local LLM Architecture, SSE/NDJSON Streaming, RAG & Safety (`Stds 1.0, 2.0, 8.0, 16.0, 18.0`)](./01-Local-LLM-Architecture-and-Streaming/readme.md)**
   - Slides: [`01-Local-LLM-Architecture-and-Streaming/slides/slides.md`](./01-Local-LLM-Architecture-and-Streaming/slides/slides.md)
   - Student Lab: [`01-Local-LLM-Architecture-and-Streaming/student-lesson.md`](./01-Local-LLM-Architecture-and-Streaming/student-lesson.md)
   - Reference Code & Tests: [`localAiServer.mjs`](./01-Local-LLM-Architecture-and-Streaming/code/localAiServer.mjs) • [`localAiStreamAndRag.test.mjs`](./01-Local-LLM-Architecture-and-Streaming/code/localAiStreamAndRag.test.mjs)
2. **[Lesson 20.2 — Multimodal Voice, Vision/Video Bonus & 3D CAD/Print Double Bonus (`Stds 4.0, 9.0, 11.0, 12.0, 15.0, 19.0`)](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/readme.md)**
   - Slides: [`02-Multimodal-Voice-Vision-and-3D-Print-Capstone/slides/slides.md`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/slides/slides.md)
   - Student Lab: [`02-Multimodal-Voice-Vision-and-3D-Print-Capstone/student-lesson.md`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/student-lesson.md)
   - Full-Stack Capstone & Tests: [`code/capstone-app/`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/code/capstone-app/server.mjs) • [`multimodalAnd3dCad.test.mjs`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/code/multimodalAnd3dCad.test.mjs)
3. **[Lesson 20.3 — NLP Pipelines, Agentic AI Loops, Model Cards & Responsible Governance (`AI101–AI202`, `Std 14.0`, `Azure AI-900`, `ITS AI`, `ITS Python`)](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/readme.md)**
   - Slides: [`03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/slides/slides.md`](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/slides/slides.md)
   - Student Lab: [`03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/student-lesson.md`](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/student-lesson.md) • [`nlpAgenticLab.mjs`](../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs)
   - Reference Code & Tests: [`nlpAgenticGovernanceDemo.mjs`](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/code/nlpAgenticGovernanceDemo.mjs) • [`nlpAgenticGovernanceDemo.test.mjs`](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/code/nlpAgenticGovernanceDemo.test.mjs)

## Unit Assessments & Capstone Project
- **Environment & CLI Standard:** [`setup-guide.md`](./setup-guide.md)
- **Unit Guide & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Quizzes:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) | **[50-Question Mastery Exam](./quizzes/unit-test-50.md)**
- **Final Capstone Project & 2x Rubric:** [`projects/unit-project.md`](./projects/unit-project.md) | [`projects/project-rubric.md`](./projects/project-rubric.md) (`0-student_files/projects/unit-20-local-ai-3d-capstone/`)
