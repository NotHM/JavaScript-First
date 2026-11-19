# Unit 20 Guide: Local Multimodal AI & 3D CAD Capstone

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Capstone Schedule:** Final Extension / Culminating Engineering Sprint (8 Class Periods × 50 Minutes)

---

## 1. Unit Overview

Unit 20 challenges students to build a **100% private, zero-cloud-egress Local AI Application**. In Lesson 20.1, students contrast cloud inference vs. local GGUF/Ollama/WebGPU architectures under FERPA/COPPA data sovereignty, implement incremental NDJSON -> Server-Sent Events (SSE) token streaming, cosine-similarity RAG chunk retrieval, strict JSON tool-call validation, and prompt-injection/PII safety guards. In Lesson 20.2, students assemble a full-stack **Multimodal Local AI Chat App** featuring **Core Voice (STT/TTS RIFF WAV)**, **Bonus Image & Video Frame Analysis (`llava`, SD WebUI / ComfyUI, video keyframes)**, and **Double Bonus (2x Score) Parametric 3D CAD Design -> Watertight ASCII/Binary `.stl` & `.obj` generation, 3D printability validation, interactive Canvas wireframe orbit preview, and slicer checklists**.

---

## 2. Arizona CTE Standards Alignment

| Standard | Official Indicator Coverage | Unit 20 Artifacts |
|---|---|---|
| **Standard 1.0 & 2.0** (`1.5, 2.3–2.4`) | FERPA/COPPA data sovereignty, PII log redaction, prompt-injection defense, JSON tool allowlisting | Lesson 20.1 `guardPromptSafety`, `redactPiiForLog`, `validateToolCall` |
| **Standard 8.0, 9.0 & 18.0** | Ollama REST (`POST /api/chat`), OpenAI-compatible local endpoints, SSE `text/event-stream`, NDJSON chunking, offline graceful fallback | Lesson 20.1 `localAiServer.mjs`, Lesson 20.2 `server.mjs` |
| **Standard 16.0 & 4.0** | Cosine-similarity vector retrieval, RIFF/WAVE binary PCM buffers, Binary `.stl` little-endian Float32 serialization, manifold signed volume | `ragAndStreamLab.mjs`, `voiceAndVision.mjs`, `cadEngine.mjs` |
| **Standard 15.0 & 17.0** | Accessible semantic HTML5 UI (`aria-live`), `localStorage` chat persistence, interactive 2D `<canvas>` 3D perspective renderer | `capstone-app/public/index.html` |
| **Standard 12.0 & 19.0** (`19.8`) | Deterministic offline `node --test` suites, edge AI trends, CAD-to-manufacturing slicer validation (`PrusaSlicer`/`Cura`) | `localAiStreamAndRag.test.mjs`, `multimodalAnd3dCad.test.mjs`, Capstone Project |

---

## 3. Trackable Student SMART Goals (Unit 20)

- [ ] **S-Goal 1 (`[L2 Understand -> L3 Apply]` | Stds `1.5, 2.3, 8.0, 9.0`):** **S** — Build an HTTP SSE streaming proxy (`POST /api/chat`) connecting to `OLLAMA_HOST` (`POST /api/chat`) with split-chunk NDJSON parsing and graceful offline simulation; **M** — Pass 100% of HTTP stream & fallback assertions in `localAiStreamAndRag.test.mjs`; **A** — Using Node `http` and `ReadableStream` helpers; **R** — Prevents cloud PII exposure and ensures offline resilience; **T** — Completed by Day 2.
- [ ] **S-Goal 2 (`[L3 Apply -> L4 Analyze]` | Stds `4.3, 16.4, 1.5`):** **S** — Implement L2-normalized cosine-similarity RAG retrieval (`retrieveTopChunks`), PII log redaction, prompt-injection detection, and JSON tool-schema validation; **M** — Achieve 100% pass rate on `ragAndStreamLab.test.mjs` edge & injection cases; **A** — Following `localAiServer.mjs` specifications; **R** — Grounds local AI responses in verified sources while blocking unsafe tool execution; **T** — Verified by Day 3.
- [ ] **S-Goal 3 (`[L3 Apply]` | Stds `4.1, 15.7, 16.2` — CORE CAPSTONE):** **S** — Ship the Core Full-Stack Local Chat + Voice app supporting 16-bit RIFF/WAVE PCM synthesis/parsing (`Whisper.cpp` / `Piper` + Web Speech API) and chat persistence; **M** — Produce valid 44-byte RIFF/WAVE buffers (`16000 Hz`, exact `44 + 2*N` bytes) passing `multimodalAnd3dCad.test.mjs`; **A** — Using `capstone-app` starter scaffolds; **R** — Delivers accessible hands-free local AI communication; **T** — Completed by Day 5.
- [ ] **S-Goal 4 (`[L5 Evaluate]` | Stds `9.2, 11.4` — BONUS TIER):** **S** — Integrate Base64 multimodal vision payload builders (`llava` prefix stripping), local SD/ComfyUI image-gen adapters, and video keyframe sampling plans; **M** — Pass vision MIME/base64 rejection and video keyframe timestamp tests (`node --test`); **A** — Extending `voiceAndVision.mjs`; **R** — Expands text/voice assistants to inspect diagrams and video clips locally; **T** — Optional Bonus Milestone checked by Day 6.
- [ ] **S-Goal 5 (`[L6 Create]` | Stds `4.3, 12.2, 15.5, 19.8` — DOUBLE BONUS 2x TIER):** **S** — Engineer a parametric 3D CAD -> ASCII/Binary `.stl` & `.obj` pipeline (`box`, `l-bracket`, `spur-gear`) with watertight edge-manifold + build-plate (`<= 220x220x250 mm`) validator and Canvas 3D preview; **M** — Zero naked edges, positive signed volume, valid Binary STL byte length (`84 + 50*tris`), and PrusaSlicer/Cura checklist pass; **A** — Using pure JS computational geometry in `cadEngine.mjs`; **R** — Connects conversational AI directly to physical rapid prototyping; **T** — Final Capstone Showcase on Day 8.

---

## 4. Trackable Teacher SMART Goals (Unit 20)

- [ ] **T-Goal 1 (Baseline & Mastery Verification | Hake's $g$):** **S** — Administer `pre-unit-eval.md` on Day 1 and `post-unit-eval.md` on Day 8; **M** — Achieve class normalized learning gain $g \ge 0.60$ across SSE streaming, RAG cosine math, WAV headers, and STL validation; **A** — Guided by `eval-answer-key.md`; **R** — Proves rigorous engineering mastery on culminating capstone concepts; **T** — Recorded within 24 hours of Day 8.
- [ ] **T-Goal 2 (Zero-GPU Equity & Offline Reliability):** **S** — Maintain deterministic offline fallback modes for Ollama, Whisper/Piper, Stable Diffusion, and 3D CAD rendering in all instructor & student test suites; **M** — `100%` of lab tests run cleanly in `< 2 seconds` on CPU-only school laptops via `node --test`; **A** — Through configurable `OLLAMA_HOST` and deterministic simulators; **R** — Ensures hardware constraints never block student grades; **T** — Verified on Day 1 before lab launch.
- [ ] **T-Goal 3 (Formative Misconception Triage):** **S** — Deliver Kahoot Quiz 1 (`L1–L2`) on Day 3 and Quiz 2 (`L3–L5`) on Day 6; **M** — Reteach any concept scoring `< 75%` (commonly NDJSON partial buffering, `data:` URI stripping for Ollama `llava`, or STL manifold winding); **A** — Using 5-minute whiteboard trace diagrams; **R** — Prevents silent bugs during final sprint; **T** — Same day as each quiz.
- [ ] **T-Goal 4 (Tiered Capstone Rubric Calibration):** **S** — Hold 2-minute mid-sprint architecture check-ins on Day 5 verifying every student locks in **100-pt Core** before attempting **Bonus** or **2x Double Bonus** tiers; **M** — `100%` of students submit working Core Voice+Chat MVPs by Day 6; **A** — Enforced via tiered milestone sign-off; **R** — Protects struggling learners from over-scoping while unleashing high-ceiling innovators; **T** — Completed end of Day 5.
- [ ] **T-Goal 5 (Physical / Slicer Validation Demo):** **S** — Import at least 3 student-generated `.stl` meshes live into `PrusaSlicer` or `Cura` (or inspect triangle winding & build-plate metrics) on Showcase Day; **M** — Zero non-manifold or inverted-normal repair warnings on qualifying Double-Bonus submissions; **A** — Using `validateMeshForPrint()` automated gate; **R** — Demonstrates authentic software-to-hardware verification; **T** — Executed during Day 8 Capstone Showcase.

---

## 5. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Bloom's Tier | Focus in Unit 20 | Student Evidence & Assessment Items |
|---|---|---|
| **L1 — Remember** | Recall Ollama port `11434`, GGUF quantization tradeoffs, SSE `text/event-stream`, RIFF/WAVE 44-byte header, and STL binary 84-byte + `50*N` layout | `pre-unit-eval.md`, Quiz 1 |
| **L2 — Understand** | Contrast cloud vs. local FERPA data sovereignty, explain cosine similarity `[-1, 1]`, and describe why NDJSON streams split across TCP packets | Lesson 20.1–20.2 worksheets Part A, Slides |
| **L3 — Apply** | Build `cosineSimilarity`, `createNdjsonLineParser`, `generatePcmWavBuffer`, and `buildOllamaVisionPayload` | `0-student_files/20-local-ai-3d/` |
| **L4 — Analyze** | Debug unbuffered `JSON.parse` chunk failures, prompt-injection bypasses, hallucinated tool calls, and non-watertight STL edge defects | `ragAndStreamLab.mjs`, Quiz 2, Post-Unit Eval |
| **L5 — Evaluate** | Justify quantized local models (`Q4_K_M`) vs. WebGPU vs. Cloud APIs and evaluate mesh printability (`>= 1.2mm` wall, `<= 220x220x250mm` bed) | Post-Unit Eval Part B, Project Part B/C |
| **L6 — Create** | Ship full-stack Local Multimodal AI Chat App (`Core` Voice + `Bonus` Vision/Video + `2x Double Bonus` Parametric 3D CAD `.stl`/`.obj` & slicer pipeline) | **Unit 20 Final Capstone** (`0-student_files/projects/unit-20-local-ai-3d-capstone/`) |

---

## 6. Day-by-Day Pacing Calendar (8 Days × 50 Minutes)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Unit Diagnostic & Lesson 20.1 Part 1 (Local AI vs. Cloud, FERPA, GGUF, Ollama REST, WebGPU) | **Pre-Unit Eval**, **Pre-Lesson 20.1**, Slides 20.1 |
| **Day 2** | Lesson 20.1 Part 2 (SSE Streaming, Partial NDJSON Buffering, RAG Cosine Retrieval) | `ragAndStreamLab.mjs` Part 1, Live `localAiServer.mjs` trace |
| **Day 3** | Lesson 20.1 Part 3 (Tool-Call Schema Validation, Prompt Guards) + Kahoot Quiz 1 | `ragAndStreamLab.test.mjs`, **Post-Lesson 20.1**, **Kahoot Quiz 1** |
| **Day 4** | Lesson 20.2 Part 1 (CORE Voice: RIFF/WAVE PCM Synthesis & Parsing, Whisper/Piper, Persistence) | **Pre-Lesson 20.2**, `voiceVisionLab.mjs` |
| **Day 5** | Lesson 20.2 Part 2 (BONUS Vision Base64/Video + DOUBLE BONUS 3D CAD STL/OBJ Math) | `cadPrintLab.mjs`, Core MVP Milestone Check |
| **Day 6** | Capstone Engineering Sprint + Kahoot Quiz 2 | **Kahoot Quiz 2**, **Post-Lesson 20.2**, `capstone.test.mjs` |
| **Day 7** | Capstone Integration, Bonus/Double-Bonus Polish & Slicer QA | `node --test` full validation pass |
| **Day 8** | Final Capstone Live Showcase (Voice + Vision + 3D `.stl` Slicer Check) & Summative Proof | **Unit 20 Capstone Submission**, **Post-Unit Eval** |
