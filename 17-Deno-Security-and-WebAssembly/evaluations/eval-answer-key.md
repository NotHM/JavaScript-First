# Unit 17 Evaluation Answer Key & Learning Gain Tracker (Teacher Only)

> **CONFIDENTIAL — INSTRUCTOR MANUAL ONLY.** Do not distribute to students prior to assessment.

---

## 1. Pre-Unit Evaluation Key (`pre-unit-eval.md` — 10 Points)

| # | Correct Answer | Bloom's Level | AZ CTE Indicator | Teacher Rationale |
|---|---|---|---|---|
| 1 | **B** (Denies access / raises error) | L1 Remember | `1.3` | Deno is capability-secure by default; zero FS/net/env access without `--allow-*`. |
| 2 | **C** (`jsr:`) | L1 Remember | `11.7 / 13.1` | JSR (`jsr:`) is the modern ESM-native TypeScript/JS registry used by Deno and modern runtimes. |
| 3 | **B** (`\0asm`) | L1 Remember | `4.1 / 11.6` | Every WASM module begins with `0x00 0x61 0x73 0x6d` (`\0asm`). |
| 4 | **B** (`--permission`) | L2 Understand | `1.4` | Node's `--permission` activates the Permission Model (`ERR_ACCESS_DENIED`). |
| 5 | **B** (`WebAssembly.Memory`) | L2 Understand | `11.6` | Shared contiguous `ArrayBuffer` viewed via `Uint8Array` / `Int32Array`. |
| 6 | **B** (Violates Least Privilege) | L2 Understand | `1.3` | `-A` / `--allow-all` surrenders all runtime capability restrictions. |
| 7 | **B** (`Request` and `Response`) | L3 Apply | `11.7` | Deno adopts Fetch / WHATWG Web Standard `Request` and `Response`. |
| 8 | **B** (`64 KiB` / `65,536` bytes) | L3 Apply | `4.7` | Standard WebAssembly linear memory page size is 64 KiB. |
| 9 | *(Rubric 1 pt)* | L4 Analyze | `1.4` | WASM has **no ambient OS syscalls** (no FS, net, env); it can only touch its isolated linear `ArrayBuffer` and explicit `imports` supplied by the JS host. |
| 10 | *(Rubric 1 pt)* | L4 Analyze | `1.3 / 11.7` | `--allow-net=127.0.0.1:8080 --allow-env=PORT --allow-read=./public/catalog.json` |

---

## 2. Post-Unit Evaluation Key (`post-unit-eval.md` — 14 Points)

| # | Correct Answer / Scoring Rubric | Bloom's | Indicator | Paired Pre-Item |
|---|---|---|---|---|
| 1 | **A** (`--allow-read=./config --deny-read=./config/secrets`) | L1 | `1.3` | Q1 |
| 2 | **B** (`deno.json`) | L1 | `11.7` | Q2 |
| 3 | **B** (`0x01 0x00 0x00 0x00`) | L1 | `4.1 / 11.6` | Q3 |
| 4 | **C** (`ERR_ACCESS_DENIED`) | L2 | `1.4` | Q4 |
| 5 | **A** (Type `1`, Export `7`, Code `10`) | L2 | `4.7 / 11.6` | Q5 |
| 6 | **B** (`WebAssembly.RuntimeError` trap) | L3 | `4.7` | Q8 |
| 7 | **B** (`{ module, instance }` with `instance.exports`) | L3 | `11.7` | Q5/Q7 |
| 8 | **B** (Wildcard FS + subprocess escape) | L4 | `1.3` | Q6 |
| 9 | **2 pts:** (1 pt) Explains **Runtime sandbox (`Deno` / `node --permission`)** mediates host OS capabilities (files, sockets, env, child processes); (1 pt) Explains **WASM sandbox** isolates untrusted compute inside bounds-checked linear memory with zero syscalls; defense-in-depth prevents an untrusted plugin from exploiting either layer. | L4 | `1.4 / 4.7` | Q9 |
| 10 | **2 pts:** (1 pt) Places HTTP routing/I/O in **Deno/Node** (`Deno.serve` + scoped `--allow-net` / `--allow-read`) and 50 MB tight numeric/byte loops in **WASM** (`wasm-pack` / `wat2wasm`) via `WebAssembly.Memory`; (1 pt) Explicitly denies `--allow-run` / `--allow-write` and omits OS imports to WASM. | L5 | `11.6 / 11.8` | Q10 |
| 11 | **2 pts:** (1 pt) Checks `WebAssembly.validate(wasmBytes)` throwing `TypeError` when invalid + calls `await WebAssembly.instantiate(wasmBytes)`; (1 pt) Encodes UTF-8 bytes into `new Uint8Array(instance.exports.memory.buffer)` at offset `0` and returns `{ byteLength: encoded.length, checksum: instance.exports.sumBytes(0, encoded.length) }`. | L6 | `4.7 / 11.6` | — |

---

## 3. Unit 17 Normalized Learning Gain Class Tracker

| Metric | Pre-Unit Avg (%) | Post-Unit Avg (%) | Normalized Gain $g = \frac{\text{Post}-\text{Pre}}{100-\text{Pre}}$ | Target Threshold |
|---|---|---|---|---|
| **Runtime Sandboxing (`1.3–1.4`)** | `____%` | `____%` | `____` | $g \ge 0.55$ |
| **WebAssembly Binary & Memory (`4.0, 11.6`)** | `____%` | `____%` | `____` | $g \ge 0.55$ |
| **Overall Unit 17** | `____%` | `____%` | `____` | **$g \ge 0.55$** |
