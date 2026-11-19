# Unit 17 Project Rubric: Runtime Capability & WASM Sandbox Auditor (Teacher Only)

**Total Points:** 100 pts | **Standards:** AZ CTE `1.3`, `1.4`, `4.0`, `11.6–11.8` & Prof. Skills `1.0`, `3.0`, `8.0`

| Criterion | Bloom's Tier | Exemplary (25 pts) | Proficient (20 pts) | Developing (14 pts) | Needs Support (8 pts) |
|---|---|---|---|---|---|
| **Capability Flag & Path Audit (`Std 1.3–1.4`)** | L4 Analyze / L5 Evaluate | Rejects all wildcard flags (`-A`, `--allow-all`, `*`), checks missing Node `--permission`, enforces `--deny-read` precedence over `readRoots` with accurate score deduction. | Catches wildcard flags and missing `--permission`; minor edge miss on `denyPaths` prefix checks. | Only checks `--allow-all` string; misses scoped path validation. | Incomplete or broken audit function. |
| **WASM Header Validation (`Std 4.1, 11.6`)** | L3 Apply | Accurately verifies `\0asm`, little-endian version `1`, `Uint8Array` bounds, and `WebAssembly.validate()` returning structured diagnostics. | Checks `\0asm` and `WebAssembly.validate()`; misses version or length guard. | Hardcodes `true` without inspecting bytes. | Fails on valid or corrupt inputs. |
| **Linear Memory & Bounds Safety (`Std 4.7, 1.4`)** | L3 Apply / L4 Analyze | Exchanges UTF-8 payload through `WebAssembly.Memory`, verifies reversible XOR/checksum, and asserts `WebAssembly.RuntimeError` out-of-bounds trap. | Runs WASM functions via `WebAssembly.Memory` cleanly; omits out-of-bounds trap proof. | Copies wrong offset or fails to recover transformed bytes. | Cannot instantiate or run WASM memory ops. |
| **Engineering Quality & `node --test` (`Std 11.7, 12.2`)** | L6 Create | 100% passing `node --test` suite, clean ESM modules, clear defense-in-depth rationale, zero leaked temp files or crashes. | Passes most tests with readable output and minor formatting issues. | Partial tests failing or hard-coded results. | Fails `node --check` or tests do not run. |
