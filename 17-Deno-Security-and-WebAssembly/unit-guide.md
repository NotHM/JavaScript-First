# Unit 17 Guide: Deno Security Sandbox & WebAssembly (`WASM`)

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Extension Week 19 (5 Class Periods × 50 Minutes)  
**Target Grade Level:** 11–12 / Post-Secondary Applied Engineering  
**Setup & CLI Guide:** [`setup-guide.md`](./setup-guide.md) · **Automated Lab Grader:** `npm run grade -- --unit 17`

---

## 1. Unit Overview

Unit 17 bridges core server-side JavaScript into modern **secure-by-default runtimes** (**Deno** and **Node.js `--permission` sandboxing**) and **WebAssembly (`.wasm`) binary modules**. Students evaluate least-privilege capability flags (`--allow-net`, `--allow-read`, `--deny-*`, Node `--permission`), compare URL/`jsr:` package resolution and Web-standard APIs (`Deno.serve`, `Request`/`Response`), inspect raw WASM binary headers (`\0asm`), share typed linear buffers via `WebAssembly.Memory`, and benchmark compute-heavy integer workloads offline in Node.js (`v24 LTS`).

---

## 2. Unit 17 SMART Goals & Objectives (`AZ CTE Stds 1.3, 1.4, 4.0, 11.6–11.8, 13.1`)

### Student SMART Goals (Trackable Checklist)
- [ ] **Student Goal 1 (`[L1–L2]` | `Std 1.3, 11.7`):** Recall Deno's 5 core capability flags (`--allow-net`, `--allow-read`, `--allow-write`, `--allow-env`, `--deny-*`) and contrast secure-by-default runtimes vs. traditional Node.js with >= 85% accuracy on Quiz 1 by Day 2.
- [ ] **Student Goal 2 (`[L3–L4]` | `Std 1.3, 1.4`):** Implement `auditRuntimeFlags()` and `CapabilitySandboxPolicy` in `0-student_files/17-deno-wasm/permissionPolicyLab.mjs` so all wildcard flags (`--allow-all`, `-A`, `*`) are rejected and `node --permission` tests pass by end of Day 2.
- [ ] **Student Goal 3 (`[L1–L2]` | `Std 4.1–4.7, 11.6`):** Decode the 8-byte `.wasm` binary header (`\0asm` + version `1`) and map Type (`1`), Function (`3`), Memory (`5`), Export (`7`), and Code (`10`) sections with >= 80% accuracy on Lesson 17.2 exit checks by Day 3.
- [ ] **Student Goal 4 (`[L3–L4]` | `Std 4.7, 11.6`):** Instantiate a `.wasm` binary in `wasmMemoryLab.mjs`, exchange UTF-8 payloads through shared `WebAssembly.Memory`, and verify out-of-bounds `WebAssembly.RuntimeError` sandbox traps by Day 4.
- [ ] **Student Goal 5 (`[L5–L6]` | `Stds 1.3, 4.0, 11.6`):** Architect and pass all automated tests for the Unit 17 **Runtime Capability & WASM Sandbox Auditor** project scoring >= 80/100 on the project rubric and achieving Hake's normalized gain $g \ge 0.55$ on Day 5.

### Teacher SMART Goals (Trackable Checklist)
- [ ] **Teacher Goal 1 (`[L1–L2]` | `Std 1.3`):** Administer `evaluations/pre-unit-eval.md` on Day 1 and surface supply-chain & ambient-authority misconceptions before introducing Deno & Node `--permission`.
- [ ] **Teacher Goal 2 (`[L3–L4]` | `Std 1.3, 11.7`):** Run live isolated subprocess sandboxing via `runtimePermissionLab.test.mjs` on Day 2 so >= 90% of students observe real `ERR_ACCESS_DENIED` enforcement offline.
- [ ] **Teacher Goal 3 (`[L2–L3]` | `Std 4.0, 11.6`):** Walk students byte-by-byte through `wasmBinaryBuilder.mjs` and `wasmBinaryBuilderDemo.test.mjs` on Day 3 showing real `.wasm` emission without external C++/Rust compilers.
- [ ] **Teacher Goal 4 (`[L4–L5]` | `Std 1.4, 11.6`):** Facilitate comparative benchmarking & security threat-modeling (WASM linear memory bounds vs. OS syscall access) during Day 4 lab checks.
- [ ] **Teacher Goal 5 (`[L5–L6]` | `All Unit Stds`):** Collect paired Pre/Post evaluations, 50-question Unit Mastery Exams (`quizzes/unit-test-50.md`), and Unit 17 Project rubrics on Day 5, verifying class average Hake's normalized gain $g \ge 0.55$.

---

## 3. Arizona CTE Standards Alignment

| Standard | Official Indicator Coverage | Unit 17 Artifacts |
|---|---|---|
| **Standard 1.0** — Security & Sandboxes | `1.3` Least Privilege; `1.4` Sandboxes, isolation & capability enforcement; `1.7` Remediation | Lesson 17.1 (`permissionPolicy.mjs`, `deno_server.ts`), `runtimePermissionLab.test.mjs` |
| **Standard 4.0** — Computer Math & Binary | `4.1–4.7` Hexadecimal magic headers (`0x00 0x61 0x73 0x6d`), little-endian integers, LEB128, XOR byte transforms | Lesson 17.2 (`wasmBinaryBuilder.mjs`, `wasmBinaryBuilderDemo.test.mjs`) |
| **Standard 11.0** — Program Development | `11.6` JIT JS vs. AOT/WASM bytecode; `11.7` `deno.json` tasks & native TS; `11.8` Multi-runtime tooling | `deno.json`, `deno_server.ts`, `wasmBinaryBuilderDemo.test.mjs` |
| **Standard 13.0** — Community & Packages | `13.1` URL/`jsr:` imports vs. `node_modules` resolution | Lesson 17.1 `readme.md`, `deno.json` |
| **AZ CTE Prof. Skills** | `1.0` Communication, `3.0` Thinking & Innovation, `8.0` Legal/Ethical Security | Audit memos, project rubric |

---

## 4. Bloom's Taxonomy Progression Matrix (L1 → L6)

| Tier | Focus in Unit 17 | Evidence & Assessment |
|---|---|---|
| **L1 Remember** | Recall Deno permission flags, `jsr:` imports, `.wasm` magic bytes `\0asm`, and core WASM section IDs (`1, 3, 5, 7, 10`) | `pre-unit-eval.md`, Quiz 1, `unit-test-50.md` Part A |
| **L2 Understand** | Contrast ambient authority (default Node) vs. capability-based sandboxing (`Deno` / `node --permission`) and JS JIT vs. WASM linear memory | Slides 17.1–17.2, `unit-test-50.md` Part B |
| **L3 Apply** | Configure scoped `deno.json` tasks, execute `node --permission`, instantiate `.wasm` modules, and read/write `WebAssembly.Memory` buffers | `0-student_files/17-deno-wasm/`, `unit-test-50.md` Part C |
| **L4 Analyze** | Detect wildcard security anti-patterns (`-A`, `--allow-all`), debug `ERR_ACCESS_DENIED`, and diagnose WASM `WebAssembly.RuntimeError` traps | Quiz 2, Post-Unit Eval, `unit-test-50.md` Part D |
| **L5 Evaluate** | Justify Deno vs. Node.js vs. WASM architectures for untrusted plugin execution and compute-bound backend workloads | Post-Unit Eval Part B, Project Part A, `unit-test-50.md` Part E |
| **L6 Create** | Build & test a **Runtime Capability & WASM Sandbox Auditor** combining CLI flag linting, path-policy evaluation, and live WASM buffer hashing/XOR | **Unit 17 Project** (`0-student_files/projects/unit-17-deno-wasm-audit/`) |

---

## 5. Day-by-Day Pacing Calendar (5 Days)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Setup Check (`setup-guide.md`), Unit Diagnostic & Lesson 17.1 (Deno Security Model, `jsr:` Imports, Native TS, `Deno.serve` vs. Node `--permission`) | **Pre-Unit Eval**, **Pre-Lesson 17.1**, Slides 17.1 |
| **Day 2** | Lesson 17.1 Lab (`permissionPolicyLab.mjs`, `node --permission` isolation tests) + Quiz 1 | `0-student_files/17-deno-wasm/permissionPolicyLab.test.mjs`, **Post-Lesson 17.1**, **Kahoot Quiz 1** |
| **Day 3** | Lesson 17.2 (WASM Binary Format `\0asm`, WAT, LEB128, Sections, `wat2wasm` / `wasm-pack` workflow) | **Pre-Lesson 17.2**, `wasmBinaryBuilderDemo.test.mjs`, Slides 17.2 |
| **Day 4** | Lesson 17.2 Lab (`WebAssembly.Memory` linear buffer operations, traps & JS vs. WASM timings) + Quiz 2 | `0-student_files/17-deno-wasm/wasmMemoryLab.test.mjs`, **Post-Lesson 17.2**, **Kahoot Quiz 2** |
| **Day 5** | Unit 17 Project Build (**Runtime Capability & WASM Sandbox Auditor**) & Summative Proof (`npm run grade -- --unit 17`) | **Unit 17 Project Submission**, **Post-Unit Eval**, **50-Q Mastery Exam** |

---

## 6. Measuring Learning Growth & Mastery Exam Assets

- **Pre/Post Growth Protocol:** Administer [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) on Day 1 and [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) on Day 5. Grade with [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md) and compute Hake's normalized gain $g = \frac{\text{Post\%} - \text{Pre\%}}{100 - \text{Pre\%}}$ (target $g \ge 0.55$).
- **50-Question Unit Mastery Exam:**
  - Student Exam (solution-free): [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
  - Teacher Answer Key & Rationales: [`quizzes/unit-test-50-answer-key.md`](./quizzes/unit-test-50-answer-key.md)
  - Kahoot Import CSV (`50` items): [`quizzes/unit-test-50-kahoot.csv`](./quizzes/unit-test-50-kahoot.csv)
- **Automated Code Verification:** Run `npm run grade -- --unit 17` after completing [`0-student_files/17-deno-wasm/`](../0-student_files/17-deno-wasm/) and [`0-student_files/projects/unit-17-deno-wasm-audit/`](../0-student_files/projects/unit-17-deno-wasm-audit/).
