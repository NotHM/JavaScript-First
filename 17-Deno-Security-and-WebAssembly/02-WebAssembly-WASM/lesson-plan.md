# Lesson Plan 17.2: WebAssembly Binary Structure, Linear Memory & Toolchains (`Std 4.0, 11.6, 1.4`)

**Unit:** Unit 17 | **Duration:** 2 Class Periods (100 min total)  
**AZ CTE Standards:** `1.4, 4.0, 11.6, 11.8` | **Prof. Skills:** `3.0` Thinking & Innovation, `4.0` Professionalism

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1:** Walk 100% of students through `code/wasmBinaryBuilder.mjs` and `code/wasmBinaryBuilderDemo.test.mjs` in Period 1 so learners verify real `.wasm` emission and `WebAssembly.instantiate()` execution offline.
- [ ] **Teacher SMART Goal 2:** Coach >= 85% of students to complete `wasmMemoryLab.mjs` (header verification, UTF-8 buffer checksum, reversible XOR transform, and bounds trap check) by the end of Period 2.
- [ ] **Student SMART Goal 1 (`[L1–L2]`):** Identify `\0asm` magic bytes, little-endian version `1`, and sections `1, 3, 5, 7, 10` with >= 85% accuracy on `post-lesson-eval.md`.
- [ ] **Student SMART Goal 2 (`[L3–L5]`):** Share byte buffers across `WebAssembly.Memory`, explain sandbox trap guarantees, and choose JS vs. WASM cleanly for compute-heavy tasks.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | State `\0asm` magic bytes, version `1`, 64 KiB page size, WAT, `wat2wasm`, `wasm-pack`, and sections `1, 3, 5, 7, 10`. |
| **L2 Understand** | Explain stack-machine bytecode execution, `WebAssembly.instantiate()`, and linear memory sharing. |
| **L3 Apply** | Inspect headers, write UTF-8 data into `Uint8Array(memory.buffer)`, and call exported WASM functions in Node.js. |
| **L4 Analyze** | Diagnose corrupt headers (`WebAssembly.validate` = `false`) and out-of-bounds `WebAssembly.RuntimeError` traps. |
| **L5 Evaluate** | Justify placing high-throughput numeric/byte loops in WASM while keeping DOM/HTTP/JSON glue in JS/TS. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Bytecode Emitter & Tests:** [`code/wasmBinaryBuilder.mjs`](./code/wasmBinaryBuilder.mjs), [`code/wasmBinaryBuilderDemo.test.mjs`](./code/wasmBinaryBuilderDemo.test.mjs)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/17-deno-wasm/wasmMemoryLab.mjs`](../../0-student_files/17-deno-wasm/wasmMemoryLab.mjs)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) -> Slides on WASM magic bytes, sections, WAT, `wat2wasm`/`wasm-pack` (`slides/slides.md`, 20 min) -> Live run of `wasmBinaryBuilderDemo.test.mjs` + Part A (20 min) -> Debrief (6 min).
- **Day 2 (50 min):** Linear memory walkthrough (`Uint8Array` view + trap proof, 10 min) -> Lab in `0-student_files/17-deno-wasm/wasmMemoryLab.mjs` + Parts C–D (32 min) -> `post-lesson-eval.md` (8 min).

---

## Instructor Answer Key

### Pre-Lesson 17.2 Key
1. **`\0asm`** (`0x00 0x61 0x73 0x6d`).
2. **WebAssembly Text format**; **`wat2wasm`** (from WABT).
3. **`64 KiB` (`65,536` bytes)** per page; **`Uint8Array`** (or `DataView` / `Int32Array`).
4. WASM traps immediately with **`WebAssembly.RuntimeError`** (memory access out of bounds), preventing host memory leakage.

### Student Worksheet Key (`student-lesson.md`)
- **Part A.1:** `\0asm` magic signature; little-endian uint32 version `1`.
- **Part A.2:** `10` = Code, `1` = Type, `7` = Export, `5` = Memory, `3` = Function.
- **Part A.3:** `42` (`6 * 7` via `i32.mul`).
- **Part C.1:** `65530 + 32 = 65562 > 65536` (1 page); WASM checks every linear memory offset against `memory.buffer.byteLength` and traps with `WebAssembly.RuntimeError`.
- **Part C.2:** `wat2wasm` (WABT) and `wasm-pack` (Rust -> WASM + JS bindings).
- **Part D:** Keep UI events and JSON `fetch()` in **JavaScript**, and run the 33 MB RGBA pixel filter in **WebAssembly** operating directly in-place on shared `WebAssembly.Memory` (avoiding expensive serialization/UTF-8 string copying across the JS/WASM boundary).

### Post-Lesson 17.2 Key
1. Bytes `0..3` = `0x00, 0x61, 0x73, 0x6d` (`\0asm`); Bytes `4..7` = `0x01, 0x00, 0x00, 0x00` (version `1`).
2. **`Uint8Array`** (`new Uint8Array(instance.exports.memory.buffer)`), sized in multiples of **`64 KiB` (`65,536` bytes)**.
3. **False** — WASM has zero ambient OS syscalls and can only invoke functions explicitly provided in the host `importsObj` of `WebAssembly.instantiate()`.
4. `wat2wasm` converts `.wat` text to `.wasm`; `wasm-pack` compiles Rust crates into `.wasm` + typed JS/TS wrapper packages.
5. `WebAssembly.validate(bytes)` returns `false` (and `instantiate` rejects with `WebAssembly.CompileError`); fix by verifying header bytes, section lengths, and regenerating `.wasm` cleanly.
