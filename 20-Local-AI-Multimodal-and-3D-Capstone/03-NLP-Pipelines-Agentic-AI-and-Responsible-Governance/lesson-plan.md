# Lesson Plan 20.3: NLP Pipelines, Agentic AI Loops, Model Cards & Responsible Governance

**Unit:** Unit 20 | **Duration:** 2 Class Periods × 50 min (Days 6–7)  
**West-MEC AI Alignment:** `AI101` (Units 1 & 7), `AI102` (Units 11–14), `AI202` (Units 5–8) | **AI Stds:** `1.0–2.0, 10.0–15.0` | **AZ CTE:** `1.5, 2.3, 4.3, 12.2, 18.0, 19.8`  
**Certifications:** `Microsoft Azure AI-900`, `IT Specialist: Python`, `IT Specialist: Artificial Intelligence`

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`SG-U20-6` | `[L3 Apply -> L6 Create | AI101–AI202, 14.0]`):** **S** — Complete `nlpAgenticLab.mjs` (tokenization/stemming, TF-IDF `tf * log(N / df)`, sentiment/intent, ReAct HITL pause/resume agent, and EU AI Act / NIST AI RMF Model Card validator); **M** — Pass 100% of assertions in `nlpAgenticGovernanceDemo.test.mjs` and student capstone Model Card audit; **A** — Using `0-student_files/20-agentic-nlp-governance/` starter stubs; **R** — Satisfies Responsible AI governance (`Std 14.0`) and `Azure AI-900` / `ITS AI` competencies; **T** — Completed by end of Day 7.
- [ ] **Teacher Objective (`TG-U20-6` | `[L4 Analyze -> L5 Evaluate]`):** **S** — Live-trace a paused ReAct agent HITL gate (approve vs. deny) and a failing 80% disparate-impact Model Card in class; **M** — `>= 85%` of students score `>= 3/4` on Post-Lesson 20.3 and ship valid Model Cards in Capstone Showcase; **A** — Running `nlpAgenticGovernanceDemo.mjs` offline via `node --test`; **R** — Ensures zero unguarded agent loops or governance gaps; **T** — Audited by Day 8 Showcase.

## Bloom's Objective Ladder
- **L1–L2:** State TF-IDF (`tf * log(N / df)`), Discriminative (`P(y|x)`) vs. Generative (`P(x, y)`), ReAct steps, NIST AI RMF 4 pillars, EU AI Act 4 tiers, and AI careers/certs.
- **L3 Apply:** Implement `tokenizeAndStem`, `computeTfIdfCorpus`, and `classifySentimentAndIntent`.
- **L4 Analyze:** Diagnose `Object.prototype` allowlist bypasses, negation-before-stopword sentiment bugs, runaway agent loops, and 80% disparate impact failures.
- **L5 Evaluate / L6 Create:** Author and programmatically validate a Model Card + HITL-guarded ReAct workflow for the Unit 20 Capstone.

## 50-Minute Pacing & Teacher Answer Keys
- **Day 6 (Period 1 — NLP, Discriminative vs. Generative & TF-IDF):**
  - Pre-Lesson 20.3 Diagnostic (4m), Slides Part 1–2 (Classical NLP, BoW, TF-IDF, Sentiment negation, Discriminative vs. Generative, Temperature/Citations) (20m), Worksheet Part A + `nlpAgenticLab.mjs` Tasks 1–3 (`tokenizeAndStem`, `computeTfIdfCorpus`, `classifySentimentAndIntent`) (26m).
- **Day 7 (Period 2 — ReAct Agents, HITL, Model Cards & Careers):**
  - Slides Part 3–5 (ReAct loop, Allowlist, `maxSteps`, HITL pause/resume, NIST AI RMF, EU AI Act, Model Cards, Careers/Certs) (18m), Live `nlpAgenticGovernanceDemo.mjs` trace (7m), `nlpAgenticLab.mjs` Tasks 4–5 + Worksheet Parts C–D (20m), Post-Lesson 20.3 Exit Ticket (5m).
- **Pre-Lesson 20.3 Key:**
  1. `0` (because $\ln(N / N) = \ln(1) = 0$, zeroing out uninformative universal words).
  2. Discriminative (`P(y|x)`) predicts a class boundary (e.g., spam/sentiment classifier); Generative (`P(x, y)`) models data distributions to generate new content (e.g., Transformer LLM or Diffusion image generator).
  3. `Thought -> Action -> Observation -> Final Answer`; HITL gates pause execution so a human approves or rejects irreversible/high-risk actions before side effects run.
  4. `Unacceptable`, `High`, `Limited`, `Minimal`.
- **Worksheet Part A Key:**
  1. `['model', 'safe', 'valid', 'policy']`
  2. `Math.log(10 / 2)` (`~1.609`); if `df = 10`, `ln(10/10) = 0`, signaling the word cannot distinguish one document from another.
  3. Spam classifier -> `Discriminative`; Ollama Transformer -> `Generative`; Diffusion model -> `Generative`.
  4. Metrics/fairness -> `Measure`; HITL gate -> `Manage`; Intended use/tier -> `Map`; Board policy -> `Govern`.
- **Worksheet Part C Key:**
  1. Plain JS objects inherit `toString`, `constructor`, `valueOf`, etc., so `tools['toString']` is truthy! `Object.hasOwn(tools, action.name)` checks own properties only, blocking prototype traversal.
  2. Stripping `"not"` turns `"not safe"` into `["safe"]`, falsely classifying an unsafe warning as **positive**!
  3. `0.69 / 0.92 = 0.75 < 0.80`; fails the four-fifths disparate impact threshold, so `buildAndValidateModelCard()` rejects `"high"` risk deployment (`deployable: false`).
- **Worksheet Part D Key (Rubric Check):**
  - Verify student names a valid EU AI Act tier (`high` or `limited` — never `unacceptable`), provides 2 concrete `outOfScopeUses`, specifies an actionable HITL approval gate (e.g., human approval before `cad_export_gcode` or record modification), and maps one AI career + `Azure AI-900` / `ITS AI` / `ITS Python` domain.
- **Post-Lesson 20.3 Key:**
  1. `0.25 * Math.log(4 / 1)` (`~0.3466`); `"react"` has high IDF (`ln(4) ≈ 1.386`) whereas universal boilerplate words have `ln(4/4) = 0`.
  2. Low temperature (`0.0–0.2`) suppresses random low-probability token sampling so JSON tool schemas and grounded facts stay deterministic rather than confabulating at `1.2`.
  3. (a) `maxSteps` caps loop iterations (`status: 'max_steps_exceeded'`); (b) `Object.hasOwn(tools, 'purge_database')` blocks unlisted tools with `ALLOWLIST_BLOCKED` before execution (and HITL pauses if listed as destructive).
  4. `0.63 / 0.90 = 0.70` (`< 0.80` four-fifths threshold); `buildAndValidateModelCard()` returns `valid: false, deployable: false` and blocks `"high"` risk deployment.
