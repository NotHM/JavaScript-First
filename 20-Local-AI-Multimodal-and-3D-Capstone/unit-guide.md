# Unit 20 Guide: Local Multimodal AI, Agentic Governance & 3D CAD Capstone

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**) & **West-MEC AI (`AI101–AI202`)**  
**Capstone Schedule:** Final Extension / Culminating Engineering Sprint (10 Class Periods × 50 Minutes)  
**Setup Standard & Exam Assets:** [`setup-guide.md`](./setup-guide.md) · [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) ([Answer Key](./quizzes/unit-test-50-answer-key.md) · [Kahoot CSV](./quizzes/unit-test-50-kahoot.csv)) · **Grader:** `npm run grade -- --unit 20`

---

## 1. Unit Overview

Unit 20 challenges students to build a **100% private, zero-cloud-egress, responsibly governed Local AI Application**. In Lesson 20.1, students contrast cloud inference vs. local GGUF/Ollama/WebGPU architectures under FERPA/COPPA data sovereignty, implement incremental NDJSON -> Server-Sent Events (SSE) token streaming, cosine-similarity RAG chunk retrieval, strict JSON tool-call validation, and prompt-injection/PII safety guards. In Lesson 20.2, students assemble a full-stack **Multimodal Local AI Chat App** featuring **Core Voice (STT/TTS RIFF WAV)**, **Bonus Image & Video Frame Analysis (`llava`, SD WebUI / ComfyUI, video keyframes)**, and **Double Bonus (2x Score) Parametric 3D CAD Design -> Watertight ASCII/Binary `.stl` & `.obj` generation, 3D printability validation, interactive Canvas wireframe orbit preview, and slicer checklists**. In Lesson 20.3, students master **Classical & Modern NLP Pipelines** (tokenization, stopword filtering, stemming, Bag-of-Words, TF-IDF `tf * log(N / df)`, cosine ranking, sentiment analysis, intent classification, NER intuition), **Discriminative (`P(y|x)`) vs. Generative (`P(x, y)`) AI** and hallucination/toxicity mitigations, **Sandboxed ReAct Agentic Loops (`Thought -> Action -> Observation -> Final Answer`)** with `maxSteps` budgets and **Human-in-the-Loop (HITL)** approval pause/resume gates, **NIST AI RMF / EU AI Act / OECD / IEEE Model Card** audits, and **AI Career & Certification** mapping (`Microsoft Azure AI-900`, `IT Specialist: Python`, `IT Specialist: Artificial Intelligence`).

---

## 2. Arizona CTE, West-MEC AI Standards & Certifications Alignment

| Standard / Credential | Official Indicator Coverage | Unit 20 Artifacts |
|---|---|---|
| **AZ CTE Standard 1.0 & 2.0** (`1.5, 2.3–2.4`) | FERPA/COPPA data sovereignty, PII log redaction, prompt-injection defense, JSON tool allowlisting | Lesson 20.1 `guardPromptSafety`, `redactPiiForLog`, `validateToolCall` |
| **AZ CTE Standard 8.0, 9.0 & 18.0** | Ollama REST (`POST /api/chat`), OpenAI-compatible local endpoints, SSE `text/event-stream`, NDJSON chunking, offline graceful fallback | Lesson 20.1 `localAiServer.mjs`, Lesson 20.2 `server.mjs` |
| **AZ CTE Standard 16.0 & 4.0** | Cosine-similarity vector retrieval, RIFF/WAVE binary PCM buffers, Binary `.stl` little-endian Float32 serialization, manifold signed volume | `ragAndStreamLab.mjs`, `voiceAndVision.mjs`, `cadEngine.mjs` |
| **AZ CTE Standard 15.0 & 17.0** | Accessible semantic HTML5 UI (`aria-live`), `localStorage` chat persistence, interactive 2D `<canvas>` 3D perspective renderer | `capstone-app/public/index.html` |
| **AZ CTE Standard 12.0 & 19.0** (`19.8`) | Deterministic offline `node --test` suites, edge AI trends, CAD-to-manufacturing slicer validation (`PrusaSlicer`/`Cura`) | `localAiStreamAndRag.test.mjs`, `multimodalAnd3dCad.test.mjs`, Capstone Project |
| **West-MEC `AI101` (Units 1 & 7) & `AI102` (Units 11–14)** (`AI Stds 1.0–2.0, 10.0–13.0`) | Normalization, regex tokenization, stopword filtering, suffix stemming, BoW, TF-IDF (`tf * log(N / df)`), cosine ranking, lexicon sentiment w/ negation, intent classification, NER intuition, Discriminative `P(y|x)` vs. Generative `P(x,y)` | Lesson 20.3 `tokenizeAndStem`, `computeTfIdfCorpus`, `classifySentimentAndIntent`, `nlpAgenticLab.mjs` |
| **West-MEC `AI202` (Units 5–8)** (`AI Stds 14.0–15.0`) | Planning, working memory, sandboxed tool use, ReAct loops with `maxSteps`, HITL pause/resume approval gates, NIST AI RMF, OECD, EU AI Act tiers, IEEE Ethically Aligned Design, Model Cards & disparate impact 80% rule | Lesson 20.3 `runReActAgent`, `buildAndValidateModelCard`, Unit 20 Capstone Model Card & HITL Gate |
| **Industry Certifications** (`Azure AI-900`, `ITS AI`, `ITS Python`) | NLP workloads, Responsible AI (fairness, transparency, accountability), generative/conversational AI safety, Python/JS data & algorithm readiness | Lesson 20.3 Career & Cert Matrix, `nlpAgenticGovernanceDemo.test.mjs`, Quizzes 1–2 |

---

## 3. Trackable Student SMART Goals (Unit 20)

- [ ] **S-Goal 1 (`SG-U20-1` | `[L2 Understand -> L3 Apply]` | Stds `1.5, 2.3, 8.0, 9.0`):** **S** — Build an HTTP SSE streaming proxy (`POST /api/chat`) connecting to `OLLAMA_HOST` (`POST /api/chat`) with split-chunk NDJSON parsing and graceful offline simulation; **M** — Pass 100% of HTTP stream & fallback assertions in `localAiStreamAndRag.test.mjs`; **A** — Using Node `http` and `ReadableStream` helpers; **R** — Prevents cloud PII exposure and ensures offline resilience; **T** — Completed by Day 2.
- [ ] **S-Goal 2 (`SG-U20-2` | `[L3 Apply -> L4 Analyze]` | Stds `4.3, 16.4, 1.5`):** **S** — Implement L2-normalized cosine-similarity RAG retrieval (`retrieveTopChunks`), PII log redaction, prompt-injection detection, and JSON tool-schema validation; **M** — Achieve 100% pass rate on `ragAndStreamLab.test.mjs` edge & injection cases; **A** — Following `localAiServer.mjs` specifications; **R** — Grounds local AI responses in verified sources while blocking unsafe tool execution; **T** — Verified by Day 3.
- [ ] **S-Goal 3 (`SG-U20-3` | `[L3 Apply]` | Stds `4.1, 15.7, 16.2` — CORE CAPSTONE):** **S** — Ship the Core Full-Stack Local Chat + Voice app supporting 16-bit RIFF/WAVE PCM synthesis/parsing (`Whisper.cpp` / `Piper` + Web Speech API) and chat persistence; **M** — Produce valid 44-byte RIFF/WAVE buffers (`16000 Hz`, exact `44 + 2*N` bytes) passing `multimodalAnd3dCad.test.mjs`; **A** — Using `capstone-app` starter scaffolds; **R** — Delivers accessible hands-free local AI communication; **T** — Completed by Day 5.
- [ ] **S-Goal 4 (`SG-U20-4` | `[L5 Evaluate]` | Stds `9.2, 11.4` — BONUS TIER):** **S** — Integrate Base64 multimodal vision payload builders (`llava` prefix stripping), local SD/ComfyUI image-gen adapters, and video keyframe sampling plans; **M** — Pass vision MIME/base64 rejection and video keyframe timestamp tests (`node --test`); **A** — Extending `voiceAndVision.mjs`; **R** — Expands text/voice assistants to inspect diagrams and video clips locally; **T** — Optional Bonus Milestone checked by Day 8.
- [ ] **S-Goal 5 (`SG-U20-5` | `[L6 Create]` | Stds `4.3, 12.2, 15.5, 19.8` — DOUBLE BONUS 2x TIER):** **S** — Engineer a parametric 3D CAD -> ASCII/Binary `.stl` & `.obj` pipeline (`box`, `l-bracket`, `spur-gear`) with watertight edge-manifold + build-plate (`<= 220x220x250 mm`) validator and Canvas 3D preview; **M** — Zero naked edges, positive signed volume, valid Binary STL byte length (`84 + 50*tris`), and PrusaSlicer/Cura checklist pass; **A** — Using pure JS computational geometry in `cadEngine.mjs`; **R** — Connects conversational AI directly to physical rapid prototyping; **T** — Final Capstone Showcase on Day 10.
- [ ] **S-Goal 6 (`SG-U20-6` | `[L3 Apply -> L6 Create]` | Stds `AI101–AI202, 14.0` — NLP, AGENTIC HITL & MODEL CARD):** **S** — Implement `tokenizeAndStem`, TF-IDF (`tf * log(N / df)`), `classifySentimentAndIntent`, a sandboxed `runReActAgent` loop with `Object.hasOwn` allowlisting, `maxSteps`, and HITL pause/resume gates, plus a validated NIST AI RMF / EU AI Act Model Card (`buildAndValidateModelCard`); **M** — Pass 100% of assertions in `nlpAgenticGovernanceDemo.test.mjs` and ship a compliant Capstone Model Card (`deployable: true`, disparate impact `>= 0.80`) with HITL audit logs; **A** — Using `0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs`; **R** — Satisfies West-MEC `AI101–AI202` governance rigor and prepares for `Azure AI-900` / `ITS AI`; **T** — Lab checked Day 7 and Capstone audit verified by Day 9.

---

## 4. Trackable Teacher SMART Goals (Unit 20)

- [ ] **T-Goal 1 (`TG-U20-1` | Baseline & Mastery Verification | Hake's $g$):** **S** — Administer `pre-unit-eval.md` on Day 1 and `post-unit-eval.md` on Day 10; **M** — Achieve class normalized learning gain $g \ge 0.60$ across SSE streaming, RAG cosine math, WAV headers, STL validation, TF-IDF, ReAct/HITL, and EU AI Act Model Cards; **A** — Guided by `eval-answer-key.md`; **R** — Proves rigorous engineering mastery on culminating capstone concepts; **T** — Recorded within 24 hours of Day 10.
- [ ] **T-Goal 2 (`TG-U20-2` | Zero-GPU Equity & Offline Reliability):** **S** — Maintain deterministic offline fallback modes for Ollama, Whisper/Piper, Stable Diffusion, 3D CAD rendering, and ReAct/NLP pipelines in all instructor & student test suites; **M** — `100%` of lab tests run cleanly in `< 2 seconds` on CPU-only school laptops via `node --test`; **A** — Through configurable `OLLAMA_HOST` and deterministic simulators; **R** — Ensures hardware constraints never block student grades; **T** — Verified on Day 1 before lab launch.
- [ ] **T-Goal 3 (`TG-U20-3` | Formative Misconception Triage):** **S** — Deliver Kahoot Quiz 1 (`L1–L2`) on Day 3 and Quiz 2 (`L3–L5`) on Day 8; **M** — Reteach any concept scoring `< 75%` (commonly NDJSON partial buffering, `data:` URI stripping for Ollama `llava`, STL manifold winding, or `Object.hasOwn` ReAct allowlisting); **A** — Using 5-minute whiteboard trace diagrams; **R** — Prevents silent bugs during final sprint; **T** — Same day as each quiz.
- [ ] **T-Goal 4 (`TG-U20-4` | Tiered Capstone Rubric Calibration):** **S** — Hold 2-minute mid-sprint architecture check-ins on Day 5 and Day 8 verifying every student locks in **100-pt Core** (including Model Card & HITL gate) before attempting **Bonus** or **2x Double Bonus** tiers; **M** — `100%` of students submit working Core Voice+Chat+Governance MVPs by Day 8; **A** — Enforced via tiered milestone sign-off; **R** — Protects struggling learners from over-scoping while unleashing high-ceiling innovators; **T** — Completed end of Day 8.
- [ ] **T-Goal 5 (`TG-U20-5` | Physical / Slicer Validation Demo):** **S** — Import at least 3 student-generated `.stl` meshes live into `PrusaSlicer` or `Cura` (or inspect triangle winding & build-plate metrics) on Showcase Day; **M** — Zero non-manifold or inverted-normal repair warnings on qualifying Double-Bonus submissions; **A** — Using `validateMeshForPrint()` automated gate; **R** — Demonstrates authentic software-to-hardware verification; **T** — Executed during Day 10 Capstone Showcase.
- [ ] **T-Goal 6 (`TG-U20-6` | Responsible AI & HITL Governance Audit Gate):** **S** — Require every Capstone team to pass automated `buildAndValidateModelCard()` checks (NIST AI RMF 4 pillars, EU AI Act tier, `>= 0.80` disparate impact, and HITL pause/resume verification) before Showcase Day; **M** — `100%` of Capstone projects block unapproved destructive tool calls and ship a validated `model-card.json` (`errors.length === 0`); **A** — Using `nlpAgenticGovernanceDemo.mjs` audit rubric checks; **R** — Embeds West-MEC `AI202` (`Std 14.0`) and `Azure AI-900` Responsible AI accountability into production code; **T** — Verified during Day 9 QA check-in.

---

## 5. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Bloom's Tier | Focus in Unit 20 | Student Evidence & Assessment Items |
|---|---|---|
| **L1 — Remember** | Recall Ollama port `11434`, GGUF quantization tradeoffs, SSE `text/event-stream`, RIFF/WAVE 44-byte header, STL `84 + 50*N` layout, EU AI Act 4 tiers, & NIST AI RMF 4 functions | `pre-unit-eval.md`, Quiz 1 |
| **L2 — Understand** | Contrast cloud vs. local FERPA sovereignty, Discriminative `P(y|x)` vs. Generative `P(x,y)`, TF-IDF `ln(N/df) = 0` boilerplate filtering, and why NDJSON streams split across TCP packets | Lesson 20.1–20.3 worksheets Part A, Slides |
| **L3 — Apply** | Build `cosineSimilarity`, `createNdjsonLineParser`, `generatePcmWavBuffer`, `buildOllamaVisionPayload`, `tokenizeAndStem`, `computeTfIdfCorpus`, and `classifySentimentAndIntent` | `0-student_files/20-local-ai-3d/`, `0-student_files/20-agentic-nlp-governance/` |
| **L4 — Analyze** | Debug unbuffered `JSON.parse` chunk failures, prompt-injection bypasses, `Object.prototype` ReAct tool bypasses (`toString`), negation-before-stopword sentiment bugs, disparate impact `< 0.80`, and non-watertight STL defects | `ragAndStreamLab.mjs`, `nlpAgenticLab.mjs`, Quiz 2, Post-Unit Eval |
| **L5 — Evaluate** | Justify quantized local models (`Q4_K_M`) vs. WebGPU vs. Cloud APIs, evaluate mesh printability (`>= 1.2mm` wall, `<= 220x220x250mm` bed), and audit AI deployments under EU AI Act / NIST AI RMF / OECD / IEEE standards | Post-Unit Eval Part B, Lesson 20.3 Part D, Project Rubric |
| **L6 — Create** | Ship full-stack Local Multimodal AI Chat App (`Core` Voice + **Model Card & Safe ReAct/HITL Gate** + `Bonus` Vision/Video + `2x Double Bonus` Parametric 3D CAD `.stl`/`.obj` & slicer pipeline) | **Unit 20 Final Capstone** (`0-student_files/projects/unit-20-local-ai-3d-capstone/`) |

---

## 6. Day-by-Day Pacing Calendar (10 Days × 50 Minutes)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Unit Diagnostic & Lesson 20.1 Part 1 (Local AI vs. Cloud, FERPA, GGUF, Ollama REST, WebGPU) | **Pre-Unit Eval**, **Pre-Lesson 20.1**, Slides 20.1 |
| **Day 2** | Lesson 20.1 Part 2 (SSE Streaming, Partial NDJSON Buffering, RAG Cosine Retrieval) | `ragAndStreamLab.mjs` Part 1, Live `localAiServer.mjs` trace |
| **Day 3** | Lesson 20.1 Part 3 (Tool-Call Schema Validation, Prompt Guards) + Kahoot Quiz 1 | `ragAndStreamLab.test.mjs`, **Post-Lesson 20.1**, **Kahoot Quiz 1** |
| **Day 4** | Lesson 20.2 Part 1 (CORE Voice: RIFF/WAVE PCM Synthesis & Parsing, Whisper/Piper, Persistence) | **Pre-Lesson 20.2**, `voiceVisionLab.mjs` |
| **Day 5** | Lesson 20.2 Part 2 (BONUS Vision Base64/Video + DOUBLE BONUS 3D CAD STL/OBJ Math) | `cadPrintLab.mjs`, **Post-Lesson 20.2**, Core Voice/Chat Checkpoint |
| **Day 6** | Lesson 20.3 Part 1 (Classical NLP, Stemming, BoW, TF-IDF `tf*log(N/df)`, Sentiment/Intent/NER, Discriminative vs. Generative AI) | **Pre-Lesson 20.3**, Slides 20.3, `nlpAgenticLab.mjs` Tasks 1–3 |
| **Day 7** | Lesson 20.3 Part 2 (ReAct Agents, Allowlist, `maxSteps`, HITL Pause/Resume, NIST AI RMF, EU AI Act, Model Cards & Careers/Certs) | `nlpAgenticLab.mjs` Tasks 4–5, **Post-Lesson 20.3**, `nlpAgenticGovernanceDemo.test.mjs` |
| **Day 8** | Capstone Integration Sprint (Core + HITL Gate + Model Card Lock-In) + Kahoot Quiz 2 | **Kahoot Quiz 2**, Core + Governance Milestone Sign-Off |
| **Day 9** | Bonus Vision/Video, Double-Bonus 3D CAD Polish, Disparate Impact & Slicer QA | `capstone.test.mjs`, `buildAndValidateModelCard()` QA Pass |
| **Day 10** | Final Capstone Live Showcase (Voice + HITL/Model Card Audit + Vision + 3D `.stl` Slicer Check) & Summative Proof | **Unit 20 Capstone Submission**, **Post-Unit Eval** |

---

## 7. Mastery Exam, Setup Checklist & Automated Grading Assets

- **Setup Standard & CLI Guide:** [`setup-guide.md`](./setup-guide.md) (Local Ollama `127.0.0.1:11434` setup, Whisper/Piper 16kHz PCM `.wav`, OpenSCAD/PrusaSlicer `.stl` verification, Model Card schema validation).
- **50-Question Unit Mastery Exam:**
  - Student Exam (solution-free): [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
  - Teacher Answer Key & Rationales: [`quizzes/unit-test-50-answer-key.md`](./quizzes/unit-test-50-answer-key.md)
  - Kahoot Import CSV (`50` items): [`quizzes/unit-test-50-kahoot.csv`](./quizzes/unit-test-50-kahoot.csv)
- **Automated Lab & Project Grader:** `npm run grade -- --unit 20` (covers [`ragAndStreamLab.test.mjs`](../0-student_files/20-local-ai-3d/ragAndStreamLab.test.mjs), [`multimodalAndCadLab.test.mjs`](../0-student_files/20-local-ai-3d/multimodalAndCadLab.test.mjs), [`nlpAgenticLab.test.mjs`](../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.test.mjs), and [`capstone.test.mjs`](../0-student_files/projects/unit-20-local-ai-3d-capstone/capstone.test.mjs)).

