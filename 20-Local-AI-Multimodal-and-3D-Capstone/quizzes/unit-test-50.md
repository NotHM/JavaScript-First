# Unit 20 Mastery Exam (50 Questions): Local Multimodal AI, Agentic Governance & 3D CAD Capstone

**Course:** JavaScript First — Software & App Design (`AZ CTE CIP 11.0202.00` & West-MEC `AI101–AI202`)  
**Standards:** `1.0–19.0`, `AI101–AI202`, `Std 14.0`, `Azure AI-900`, `ITS AI`, `ITS Python`  
**Directions:** Circle or select the best option (`A`–`D`) for each question. No outside reference sheets unless approved by your instructor.

---

## Part A: Core Concepts & Standards Recall (`[L1 Remember]` — Q1–Q10)

1. **`[L1 | 8.1]`** On which default local TCP port does Ollama expose `POST /api/chat` and `/api/embed`?
   - A) `3030`
   - B) `8080`
   - C) `11434`
   - D) `27017`

2. **`[L1 | 19.8]`** Which quantized weight file format (`Q4_K_M`, `Q8_0`) compresses 7B parameter models to run on classroom laptops?
   - A) `GGUF`
   - B) `RIFF`
   - C) `SQLite`
   - D) `JSON:API`

3. **`[L1 | 8.1]`** Which HTTP `Content-Type` header identifies a Server-Sent Events (SSE) token stream?
   - A) `application/x-ndjson`
   - B) `text/event-stream`
   - C) `audio/wav`
   - D) `application/octet-stream`

4. **`[L1 | 2.3]`** Which federal privacy law protects student educational records from unauthorized third-party cloud LLM exposure?
   - A) `FAA Part 107`
   - B) `FERPA`
   - C) `FCC Part 15`
   - D) `OSHA 1910`

5. **`[L1 | 19.8]`** Which browser API stack executes quantized `Transformers.js` weights locally inside a tab without a backend daemon?
   - A) `WebGPU / WASM`
   - B) `CommonJS / cluster`
   - C) `gRPC / HTTP2`
   - D) `ODBC / ADO`

6. **`[L1 | 16.4]`** What numeric output range can `cosineSimilarity(vecA, vecB)` produce for non-zero numeric vectors?
   - A) `[0, 100]`
   - B) `[-1, 1]`
   - C) `[1, Infinity)`
   - D) `[-Infinity, 0]`

7. **`[L1 | 4.1]`** How many bytes occupy a standard uncompressed RIFF/WAVE header before raw 16-bit PCM audio samples start?
   - A) `16 bytes`
   - B) `44 bytes`
   - C) `84 bytes`
   - D) `128 bytes`

8. **`[L1 | 19.8]`** Which pair of open-source local voice engines handles offline Speech-to-Text (STT) and Text-to-Speech (TTS) in Lesson 20.2?
   - A) `Ollama (STT) and OpenSCAD (TTS)`
   - B) `Whisper.cpp (STT) and Piper (TTS)`
   - C) `Vite (STT) and Phaser (TTS)`
   - D) `Curator (STT) and ComfyUI (TTS)`

9. **`[L1 | 4.1]`** What is the exact byte length of a valid Binary `.stl` buffer containing `T` triangular facets?
   - A) `44 + 2 * T`
   - B) `84 + 50 * T`
   - C) `80 + 36 * T`
   - D) `128 + 16 * T`

10. **`[L1 | AI Std 14.0]`** Which four core functions organize the NIST AI Risk Management Framework (`AI RMF 1.0`)?
    - A) `Plan, Build, Deploy, Retire`
    - B) `Tokenize, Stem, Embed, Stream`
    - C) `Govern, Map, Measure, Manage`
    - D) `Input, Hidden, Output, Softmax`

---

## Part B: Comprehension & Architecture Comparison (`[L2 Understand]` — Q11–Q20)

11. **`[L2 | 18.0]`** Why can calling `JSON.parse(chunk)` directly on Ollama HTTP `POST /api/chat` stream reads throw `SyntaxError`?
    - A) Ollama encrypts every second line in AES-256
    - B) TCP stream chunks can split a single NDJSON line mid-token across two reads
    - C) Server-Sent Events do not allow UTF-8 strings
    - D) `JSON.parse` forbids nested `message` objects

12. **`[L2 | 2.3]`** What advantage do local quantized `GGUF` (`Q4_K_M`) models hold over commercial cloud endpoints for school tutoring tools?
    - A) Unlimited context memory at zero RAM cost
    - B) Zero cloud PII egress under FERPA and zero per-token API fees
    - C) Guaranteed 100% factual accuracy without grounding
    - D) Automatic physical 3D printing without slicers

13. **`[L2 | AI102]`** How does a Discriminative classifier (`P(y|x)`) fundamentally differ from a Generative transformer (`P(x, y)`)?
    - A) Discriminative models learn decision boundaries to label classes, while Generative models synthesize new tokens or media
    - B) Discriminative models only run on GPUs, while Generative models only run in SQLite
    - C) Generative models eliminate all prompt injection risks automatically
    - D) Discriminative models emit Binary `.stl` triangles instead of probabilities

14. **`[L2 | AI101]`** In TF-IDF (`tf * Math.log(N / df)`), what weight does a common word appearing in ALL `N` documents (`df === N`) receive?
    - A) `1.0`
    - B) `N`
    - C) `0` (since `ln(1) = 0`, down-weighting shared boilerplate)
    - D) `-Infinity`

15. **`[L2 | AI202]`** Why should an agent emitting strict JSON tool calls use a low `temperature` (`0.0–0.2`) plus RAG citations?
    - A) It forces higher creative randomness and disables schema validation
    - B) It narrows logit entropy toward deterministic schema-valid output grounded in retrieved chunks
    - C) It bypasses the `maxSteps` budget guard
    - D) It converts `P(y|x)` into uncompressed PCM audio

16. **`[L2 | 9.2]`** What happens when a frontend passes a `FileReader.readAsDataURL()` string straight into Ollama's `llava` `messages[0].images` array?
    - A) Ollama strips MIME headers automatically without error
    - B) Ollama rejects the payload because it expects raw base64 without the `data:image/...;base64,` prefix
    - C) The image renders inside an `<audio>` tag
    - D) `buildOllamaVisionPayload` scales the image to Binary STL

17. **`[L2 | 19.8]`** Why do 3D CAD generators apply the counter-clockwise right-hand rule when ordering triangle vertices `(a, b, c)`?
    - A) So `(b - a) × (c - a)` normals face outward and slicers treat the mesh as a solid volume
    - B) To invert every face normal toward the interior of the part
    - C) To cut the Binary `.stl` file size by 50%
    - D) To convert meters into inches automatically

18. **`[L2 | 19.8]`** Why run automated `validateMeshForPrint()` checks in JavaScript before opening `PrusaSlicer` or `Cura`?
    - A) It catches non-manifold naked edges, negative volume, oversized bounds, and thin walls deterministically in CI tests
    - B) It physically heats the printer nozzle over HTTP
    - C) It disables `zMin === 0` grounding so parts print mid-air
    - D) It converts ASCII `.stl` directly into `.mp3` audio

19. **`[L2 | 16.2]`** When should an offline voice chat app pair browser `SpeechRecognition`/`speechSynthesis` with `16 kHz` PCM `.wav` builders?
    - A) Only when uploading files to an external cloud bucket
    - B) So browsers use zero-install Web Speech APIs while offline desktop/CI pipelines exchange standard RIFF/WAVE `Whisper`/`Piper` buffers
    - C) Because browsers forbid HTML `<button>` elements inside `<main>`
    - D) Because `16 kHz` WAV uses 80-byte STL headers

20. **`[L2 | AI Std 14.0]`** Which design priority sits at the core of OECD AI Principles and IEEE Ethically Aligned Design?
    - A) Maximizing hidden automated surveillance
    - B) Preserving human agency, transparency, fairness, robustness, and clear accountability
    - C) Eliminating all human review from high-risk grading systems
    - D) Using `unacceptable` EU AI Act risk tiers in classrooms

---

## Part C: Code Implementation & Calculations (`[L3 Apply]` — Q21–Q30)

21. **`[L3 | 16.4]`** What does `cosineSimilarity([3, 4], [0, 5])` evaluate to?
    - A) `0.0`
    - B) `0.5`
    - C) `0.8`
    - D) `1.0`

22. **`[L3 | 4.1]`** What is the exact total byte length of a `16,000 Hz`, `16-bit` mono PCM `.wav` buffer lasting `0.5 seconds`?
    - A) `8,044 bytes`
    - B) `16,044 bytes`
    - C) `32,044 bytes`
    - D) `16,000 bytes`

23. **`[L3 | 4.1]`** A `16,000 Hz`, `16-bit` mono PCM `.wav` recording lasts `1.0 second`. What is its total buffer length including the RIFF header?
    - A) `16,044 bytes`
    - B) `32,000 bytes`
    - C) `32,044 bytes`
    - D) `64,044 bytes`

24. **`[L3 | 9.2]`** Given `'data:image/png;base64,iVBORw0KGgo='`, what exact string must `buildOllamaVisionPayload()` place inside `messages[0].images`?
    - A) `'data:image/png;base64,iVBORw0KGgo='`
    - B) `'iVBORw0KGgo='`
    - C) `'image/png'`
    - D) `'base64,iVBORw0KGgo='`

25. **`[L3 | 9.2]`** What keyframe `timestampSec` array does `extractVideoFramePlan({ durationSec: 9, sampleIntervalSec: 3, maxFrames: 8 })` produce?
    - A) `[3, 6, 9]`
    - B) `[0, 3, 6]`
    - C) `[0, 1, 2, 3, 4, 5, 6, 7]`
    - D) `[0, 4.5, 9]`

26. **`[L3 | 4.1]`** A watertight parametric box mesh uses `12` triangles (`2` per cube face). What byte length must `exportBinaryStl()` return?
    - A) `600 bytes`
    - B) `644 bytes`
    - C) `684 bytes`
    - D) `1,284 bytes`

27. **`[L3 | AI101]`** What output array must `tokenizeAndStem('The models are safely running')` return after stopword removal and suffix stemming?
    - A) `['the', 'models', 'are', 'safely', 'running']`
    - B) `['model', 'safe', 'run']`
    - C) `['models', 'safe', 'running']`
    - D) `['the', 'model', 'safely']`

28. **`[L3 | AI102]`** Suppose a high-risk evaluation scores `{ cohortA: 0.90, cohortB: 0.63 }`. What is the computed **Disparate Impact Ratio** (`min / max`)?
    - A) `0.63`
    - B) `0.70`
    - C) `0.80`
    - D) `1.43`

29. **`[L3 | 4.3]`** In a corpus of `N = 5` documents, `"governance"` appears in `df = 1` doc (`tf = 0.2`) and `"local"` appears in `df = 5` docs (`tf = 0.2`). Which pair shows both TF-IDF weights?
    - A) `0.2 * Math.log(5)` (~`0.3219`) and `0`
    - B) `0` and `0.2 * Math.log(5)`
    - C) `1.0` and `1.0`
    - D) `0.2` and `0.2`

30. **`[L3 | 17.0]`** When parsing `'Please design a 16 tooth spur gear'`, what `spec` fields must `parseCadSpecFromPrompt()` populate?
    - A) `{ shape: 'box', widthMm: 16 }`
    - B) `{ shape: 'spur-gear', teeth: 16, ... }`
    - C) `{ shape: 'l-bracket', thicknessMm: 16 }`
    - D) `{ shape: 'cylinder', radiusMm: 16 }`

---

## Part D: Debugging & Security Forensics (`[L4 Analyze]` — Q31–Q40)

31. **`[L4 | 18.0]`** Calling `parser.push('{"message":{"content":"Hi')` immediately throws `SyntaxError` in a student's code. What is missing?
    - A) An internal string buffer that waits until a complete `'\n'` delimiter arrives before calling `JSON.parse()`
    - B) Converting every line to Binary `.stl` first
    - C) Increasing `maxFrames` above `8`
    - D) Disabling UTF-8 decoding on HTTP chunks

32. **`[L4 | 1.5]`** How does `guardPromptSafety('Ignore previous instructions <script>')` neutralize both prompt injection and XSS risks?
    - A) It rejects all alphabetic characters silently
    - B) It appends matching pattern identifiers to `flags` (`flagged: true`) and escapes `<` / `>` into `&lt;` / `&gt;`
    - C) It logs the raw student SSN directly to stdout
    - D) It passes `<script>` straight into `eval()`

33. **`[L4 | 12.2]`** A local LLM emits `{ name: 'rm_rf_host', arguments: {} }` while `toolSchemas` only defines `rag_lookup` and `cad_box`. What blocks execution?
    - A) Lowering GGUF quantization to `Q4_K_M`
    - B) Rejecting the unknown tool name inside `validateToolCall()` against the explicit schema allowlist
    - C) Increasing browser `localStorage` quota
    - D) Sending the tool payload to `PrusaSlicer`

34. **`[L4 | AI202]`** Why can checking `if (tools[action.name])` allow a prototype-chain bypass attack when an agent asks to invoke `{ name: 'toString' }`?
    - A) `tools['toString']` resolves `Object.prototype.toString` unless guarded with `Object.hasOwn(tools, action.name)`
    - B) `toString` is only available in Deno TypeScript
    - C) `Object.hasOwn` strips `data:image/png;base64,` prefixes
    - D) JavaScript `if` statements treat `'toString'` as `0`

35. **`[L4 | AI102]`** A student's sentiment analyzer strips stopword `'not'` BEFORE checking negation on `'The agent is not safe'`. What bug occurs?
    - A) The analyzer returns `SyntaxError`
    - B) `'safe'` remains unnegated, falsely scoring an unsafe failure report as **positive**
    - C) Cosine similarity drops below `-1`
    - D) All email entities become lowercase

36. **`[L4 | 4.3]`** `computeMeshMetrics()` calculates `signedVolumeMm3 = -1400` on an extruded box. What geometric defect caused the negative volume?
    - A) Clockwise (inverted) triangle vertex winding pointing face normals inward instead of outward
    - B) Dimensions exceeded the `220 mm` bed width
    - C) Binary STL missed its `80`-byte header
    - D) Print wall thickness was `0.6 mm`

37. **`[L4 | 19.8]`** Inside `computeMeshMetrics()`, directed edge `u->v` occurs once while its opposite twin `v->u` has count `0`. What defect does this prove?
    - A) The mesh is watertight and printable
    - B) The mesh contains a non-watertight **naked edge** (open hole or missing facet)
    - C) Triangles are grounded at `zMin === 0`
    - D) Binary `.stl` uses big-endian floats

38. **`[L4 | 19.8]`** A parametric bracket yields `bounds.zMin = 5.0` and `nakedEdges = 0`. Why does `validateMeshForPrint()` reject it?
    - A) `nakedEdges` must equal `1`
    - B) The mesh floats `5 mm` above the print bed instead of grounding at `zMin === 0`
    - C) `bounds` objects cannot contain decimal numbers
    - D) Brackets require negative volume

39. **`[L4 | AI202]`** During a ReAct unit test, `modelStep` requests valid tools on Steps `1..3` without returning `finalAnswer`, given `maxSteps: 3`. What must `runReActAgent()` return?
    - A) It enters an infinite `while` loop until memory runs out
    - B) `{ status: 'max_steps_exceeded', stepsUsed: 3 }`
    - C) `{ status: 'awaiting_approval', stepsUsed: 0 }`
    - D) `{ status: 'completed', finalAnswer: 'OK' }`

40. **`[L4 | AI202]`** A student calls `runReActAgent()` with a destructive tool `purge_stale_logs` (`requiresApproval: true`). What must `deleteCount` equal right after the initial pause (`status === 'awaiting_approval'`)?
    - A) `0` (side effects must stay blocked until resumed with `approvalDecision: { approved: true }`)
    - B) `1` (the tool runs once, then asks permission)
    - C) `5` (`maxSteps` copies execute)
    - D) `undefined`

---

## Part E: Architecture Evaluation & Governance (`[L5 Evaluate]` — Q41–Q50)

41. **`[L5 | 2.3]`** Which architecture BEST balances FERPA student IEP compliance, offline classroom grading, and low hardware cost?
    - A) Shipping raw IEP transcripts directly to an external public SaaS API with `localStorage` disabled
    - B) Local `Ollama` (`Q4_K_M` GGUF) behind a Node SSE proxy with deterministic offline simulator fallback + optional browser `WebGPU`
    - C) Running uncompressed `405B` float32 models inside Chromium `localStorage`
    - D) Disabling all prompt-safety guards and PII redaction

42. **`[L5 | 19.8]`** A generated `.stl` enclosure measures `240 x 180 x 30 mm`, sits at `zMin = 0`, and has `0.8 mm` wall thickness on a `220 x 220 x 250 mm` bed with `0.4 mm` nozzle. What is the correct validator verdict?
    - A) Printable with `0` warnings
    - B) Fails **two** checks: `fitsBuildPlate` (`240 > 220 mm`) AND `wallOk` (`0.8 < 1.2 mm` minimum 3 perimeters)
    - C) Fails only `grounded` (`zMin`)
    - D) Fails only `signedVolumeMm3`

43. **`[L5 | 19.8]`** Why does `validateMeshForPrint()` enforce a `1.2 mm` minimum wall floor when targeting a standard `0.4 mm` 3D-printer nozzle?
    - A) `0.4 mm × 3 perimeters = 1.2 mm`, guaranteeing at least three continuous extruded walls for structural strength
    - B) `1.2 mm` matches Ollama port `11434`
    - C) `PrusaSlicer` cannot parse integers smaller than `2`
    - D) PLA melts at `1.2°C`

44. **`[L5 | AI Std 14.0]`** A vendor submits a complete Model Card for a school social-scoring system marked `euAiActRiskTier: 'unacceptable'`. What does `buildAndValidateModelCard()` return?
    - A) `{ valid: true, deployable: true }`
    - B) `{ valid: false, deployable: false }` citing **EU AI Act Article 5 prohibition**
    - C) `{ valid: true, warnings: ['Consider monitoring'] }`
    - D) It silently downgrades the tier to `'minimal'`

45. **`[L5 | AI Std 14.0]`** A `"high"`-risk grading assistant reports subgroup pass rates `{ cohortA: 0.90, cohortB: 0.63 }`. Under the four-fifths (`80%`) rule, what is the deployment verdict?
    - A) Deployable because `0.90 >= 0.80`
    - B) Blocked (`deployable: false`) because disparate impact `0.63 / 0.90 = 0.70 < 0.80`
    - C) Deployable if `temperature` is raised to `1.8`
    - D) Ignored because Model Cards exclude metrics

46. **`[L5 | AI Std 14.0]`** A `"high"`-risk Model Card fills `govern`, `map`, and `measure` in `nistRmfMapping`, plus `intendedUse`, but omits `manage` and `hitlControls`. How should `buildAndValidateModelCard()` judge it?
    - A) Valid as long as `metrics.f1 > 0.90`
    - B) Invalid (`valid: false`, `deployable: false`) reporting missing `nistRmfMapping.manage` and `hitlControls` errors
    - C) Valid with `0` errors and `0` warnings
    - D) Valid only for `Wavefront .obj` meshes

47. **`[L5 | 12.2]`** What is the most sound milestone order on the Unit 20 Capstone Rubric (`unit-project.md`)?
    - A) Spend Days 1–9 rendering custom textures before building SSE streaming or the Model Card
    - B) Lock in **100-pt Core** (SSE + offline fallback + Voice WAV + HITL & Model Card) before attempting **Bonus Vision** and **2x Double-Bonus CAD**
    - C) Delete all `node:test` suites so offline grading skips errors
    - D) Hardcode `127.0.0.1:11434` with zero fallback so CI fails whenever Ollama isn't installed

48. **`[L5 | 18.0]`** Why must `capstone.test.mjs` run cleanly when `ollamaHost` points to an unreachable closed port (or simulator mode)?
    - A) So grading tests execute deterministically in `< 2 seconds` on any CPU-only CI machine without hanging on external daemons
    - B) Because Node 24 lacks HTTP client APIs
    - C) To prevent `server.close()` from freeing TCP sockets
    - D) Because `audio/wav` cannot transmit over `127.0.0.1`

49. **`[L5 | AI202]`** When a human reviewer rejects a paused destructive action via `approvalDecision: { approved: false, reason: 'Keep logs' }`, what verifies proper HITL governance?
    - A) The tool runs once quietly and logs a warning
    - B) The destructive `execute()` count remains `0`, `HITL_DENIED` enters working memory, and the agent summarizes safely (`completed`)
    - C) The process throws an unhandled `ReferenceError`
    - D) `Object.hasOwn` deletes the `tools` object

50. **`[L5 | Azure AI-900]`** Which industry certification exam topic aligns directly with auditing fairness (`>= 0.80`), transparency notices, and HITL accountability in Lesson 20.3?
    - A) `Microsoft Azure AI-900 — Responsible AI Domain`
    - B) `FAA Part 107 Night Lighting Rule`
    - C) `MongoDB E11000 Index Tuning`
    - D) `Knulli EmulationStation ROM Layout`
