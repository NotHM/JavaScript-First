# Unit 17 Project: Runtime Capability & WebAssembly Sandbox Auditor

**Bloom's Target:** `[L5 Evaluate]` & `[L6 Create]`  
**AZ CTE Standards:** `1.3`, `1.4`, `4.0`, `11.6–11.8`  
**Starter Workspace:** [`../../0-student_files/projects/unit-17-deno-wasm-audit/`](../../0-student_files/projects/unit-17-deno-wasm-audit/)

---

## Scenario

Your security team audits third-party microservice plugins before deploying them into production. You will engineer a two-stage **Runtime Capability & WASM Sandbox Auditor** in Node.js (`v24+`) that:
1. Audits runtime launch manifests (Deno `--allow-*`/`--deny-*` and Node `--permission` flags) against the **Principle of Least Privilege**.
2. Validates raw `.wasm` binary headers (`\0asm` + version `1`), instantiates a linear-memory WASM byte-transform module, verifies bounds-trap safety, and generates a structured security audit report.

---

## Project Requirements

1. **Runtime Flag & Path Policy Auditor (`Std 1.3–1.4` — Bloom's L5):**
   - Implement `auditManifest(manifest)` accepting `{ name, runtime, flags, readRoots, denyPaths, requestedReads }`.
   - Reject (`status: 'REJECTED'`) any manifest containing wildcard permissions (`-A`, `--allow-all`, `--allow-read`, `--allow-net`, `--allow-fs-read=*`), missing `--permission` on Node, or requesting reads inside `denyPaths` / outside `readRoots`.
   - Approve (`status: 'APPROVED'`) scoped least-privilege manifests with a `0..100` security score.
2. **WASM Header Inspector & Linear Memory Sandbox (`Std 4.0, 11.6` — Bloom's L3–L4):**
   - Implement `verifyWasmHeader(bytes)` verifying `\0asm` (`0x00 0x61 0x73 0x6d`), version `1`, and `WebAssembly.validate(bytes)`.
   - Implement `runSandboxedXorCheck(wasmBytes, payloadText, xorKey)` that writes UTF-8 payload bytes into `instance.exports.memory.buffer`, transforms & verifies checksum via WASM exports, and proves out-of-bounds reads trap with `WebAssembly.RuntimeError`.
3. **CLI & Automated Test Suite (`Std 11.7, 12.2` — Bloom's L6):**
   - Pass all assertions in `0-student_files/projects/unit-17-deno-wasm-audit/index.test.mjs` via `node --test`.

---

## Milestone Checklist

- [ ] **Milestone 1 (`[L3 Apply]`):** `verifyWasmHeader()` parses magic bytes, little-endian version, and rejects corrupt binaries cleanly.
- [ ] **Milestone 2 (`[L4 Analyze]`):** `auditManifest()` catches wildcard Deno/Node flags and path-traversal / denied-path attempts.
- [ ] **Milestone 3 (`[L5 Evaluate]`):** Security report justifies why WASM + `--permission` enforces defense-in-depth.
- [ ] **Milestone 4 (`[L6 Create]`):** Full `node --test` project suite executes cleanly offline with zero dependencies.
