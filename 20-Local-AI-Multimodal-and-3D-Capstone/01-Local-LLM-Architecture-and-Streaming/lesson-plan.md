# Lesson Plan 20.1: Local LLM Architecture, SSE/NDJSON Streaming & RAG Safety

**Unit:** Unit 20 | **Duration:** 3 Class Periods × 50 min | **Stds:** `1.5, 2.3, 4.3, 8.1, 9.2, 16.4, 18.0, 19.8`

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`[L3 Apply -> L4 Analyze | 4.3, 9.2, 1.5]`):** **S** — Complete `ragAndStreamLab.mjs` (cosine similarity, split-chunk NDJSON parser, prompt safety guard, tool allowlist); **M** — Pass 100% of unit tests in `ragAndStreamAndRag.test.mjs`; **A** — With starter scaffolds; **R** — Core backend for Unit 20 Capstone; **T** — End of Day 3.
- [ ] **Teacher Objective (`[L2–L5 | Offline Resilience]`):** **S** — Live-trace `localAiServer.mjs` both with mock NDJSON stream and offline simulator mode; **M** — `100%` of lab tests run cleanly offline and `>= 85%` score >= 3/4 on Post-Lesson 20.1; **A** — Using `node --test` integration checks; **R** — Prevents dependency on lab GPUs; **T** — Completed by Day 3.

## Bloom's Objective Ladder
- **L1–L2:** State Ollama port `11434`, GGUF quantization tradeoffs, WebGPU edge inference, and SSE vs. NDJSON framing.
- **L3 Apply:** Implement cosine similarity math, line-buffered NDJSON->SSE translation, and tool schema checks.
- **L4 Analyze:** Diagnose unbuffered chunk `JSON.parse` failures, prompt-injection patterns, and PII log leaks.
- **L5 Evaluate:** Defend local Ollama vs. WebGPU vs. Cloud API under FERPA constraints.

## 50-Minute Pacing & Teacher Answer Keys
- **Day 1:** Pre-Unit 20 Eval (6m), Pre-Lesson 20.1 (4m), Slides + Cloud vs. Local Ollama/GGUF/WebGPU Architecture (25m), Worksheet Part A (15m).
- **Day 2:** Live `localAiServer.mjs` SSE + RAG demo (20m), `ragAndStreamLab.mjs` coding Part 1 (`cosineSimilarity`, `createNdjsonLineParser`) (30m).
- **Day 3:** `ragAndStreamLab.mjs` Part 2 (`guardPromptSafety`, `validateToolCall`) + `node --test` (25m), Kahoot Quiz 1 (10m), Part C–D review (10m), Post-Lesson 20.1 Exit Ticket (5m).
- **Pre-Lesson 20.1 Key:**
  1. Zero student PII/prompts leave local hardware to external cloud servers/logs (FERPA compliance).
  2. `text/event-stream`
  3. HTTP stream chunks split JSON objects mid-line across packets; `JSON.parse` fails without buffering until `\n`.
  4. `0` (orthogonal vectors have dot product `0`).
- **Worksheet Part A Key:**
  1. `http://localhost:11434/api/chat`; `GGUF`; `WebGPU`; `text/event-stream`.
  2. `[3,4] & [6,8]`: `1` (collinear); `[3,4] & [-4,3]`: `0` (dot `-12 + 12 = 0`).
  3. 4-bit weights cut a 7B model from ~14 GB to ~4.5 GB so it fits in 8 GB laptops alongside OS + browser.
- **Worksheet Part C Key:**
  1. Network chunk boundaries do not align with JSON object boundaries; buffering until `\n` prevents parsing half-written JSON lines.
  2. `validateToolCall` verifies `toolCall.name` against an explicit allowlist schema (`DEFAULT_TOOL_SCHEMAS`) and rejects `"exec_shell"` before execution.
- **Post-Lesson 20.1 Key:**
  1. `const dot = a[0]*b[0] + a[1]*b[1] ...` -> `(1*2 + 2*4) / (sqrt(5) * sqrt(20)) = 10 / 10 = 1` (or formula `dot(A,B)/(||A||*||B||)`).
  2. Buffers partial chunks up to `\n` in a closure string `buffer`, parsing only complete lines and flushing trailing text on `flush()`.
  3. Delimiters (`<user_query>`) separate untrusted user text from system instructions; regex flags injection attempts; `redactPiiForLog` strips emails/SSNs before logging.
  4. `localAiServer.mjs` sets a short timeout (`1500ms`) on `OLLAMA_HOST`, catches `ECONNREFUSED`/errors, and seamlessly streams from the deterministic offline simulator so UX and tests never crash.
