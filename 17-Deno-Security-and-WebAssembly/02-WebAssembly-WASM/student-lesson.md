# Student Lesson 17.2: WebAssembly Binary Structure, Linear Memory & Toolchains

**AZ CTE Standards:** `1.4, 4.0, 11.6, 11.8` | **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/17-deno-wasm/`](../../0-student_files/17-deno-wasm/)

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Decode the 8-byte WASM preamble (`\0asm` + version `1`), map sections `1, 3, 5, 7, 10`, and read a short WAT module accurately in Part A.
- [ ] **Goal 2 (`[L3–L4]`):** Complete `0-student_files/17-deno-wasm/wasmMemoryLab.mjs` to instantiate a `.wasm` binary, transfer strings through shared `WebAssembly.Memory`, and catch an out-of-bounds trap in Part B–C.
- [ ] **Goal 3 (`[L5]`):** Justify when `wasm-pack` / WASM beats pure JavaScript vs. when JS stays cleaner in Part D.

---

## Part A: Binary & WAT Foundations (`[L1 Remember]` & `[L2 Understand]`)

1. Decode the 8-byte WASM binary preamble (`4.1`):
   - Bytes `0..3` (`0x00, 0x61, 0x73, 0x6d`) = `__________`
   - Bytes `4..7` (`0x01, 0x00, 0x00, 0x00`) = `__________`
2. Match each WASM Section ID (`1, 3, 5, 7, 10`) to its role:
   - `____` Function bodies & opcodes (`Code`)
   - `____` Function signatures `(i32, i32) -> i32` (`Type`)
   - `____` Public symbols exposed to JavaScript (`Export`)
   - `____` Initial/max 64 KiB page count (`Memory`)
   - `____` Function-to-Type mapping (`Function`)
3. Read this WAT function and predict what `mystery(6, 7)` returns (`11.6`):
   ```wat
   (func (export "mystery") (param i32 i32) (result i32)
     local.get 0
     local.get 1
     i32.mul)
   ```
   > *(Predicted output: `________`)*

---

## Part B: Linear Memory Lab (`[L3 Apply]`)

1. Open [`0-student_files/17-deno-wasm/wasmMemoryLab.mjs`](../../0-student_files/17-deno-wasm/wasmMemoryLab.mjs).
2. Implement the TODOs using standard `WebAssembly` APIs:
   - `inspectHeader(bytes)` verifying `\0asm` magic bytes and little-endian version `1`.
   - `writeAndSumUtf8(wasmBytes, offset, text)` validating `WebAssembly.validate()`, instantiating, writing UTF-8 bytes into `Uint8Array(memory.buffer)`, and returning `sumBytes(offset, len)`.
   - `xorRoundTrip(wasmBytes, offset, text, key)` demonstrating reversible linear-memory XOR encryption and decryption.
3. Run and verify:
   ```bash
   node 0-student_files/17-deno-wasm/wasmMemoryLab.mjs
   ```

---

## Part C: Sandbox Trap & Performance Analysis (`[L4 Analyze]`)

1. Why does calling `sumBytes(65530, 32)` on a 1-page (`65,536`-byte) `WebAssembly.Memory` throw `WebAssembly.RuntimeError` instead of silently returning garbage bytes from Node's heap?  
   > *(Your analysis)*
2. What two external CLI workflows do engineers use to compile `.wat` or Rust `src/lib.rs` files into `.wasm` modules for production (`11.8`)?  
   `1. ________________________   2. ________________________`

---

## Part D: Architecture Trade-Offs (`[L5 Evaluate]` & `[L6 Create]`)

A video-editing web app must (1) render HTML buttons and fetch user JSON profiles, and (2) apply a per-pixel sepia filter across 4K RGBA image frames (`3840 x 2160 x 4` bytes = ~33 MB per frame) at 60 FPS. Evaluate which workload belongs in **JavaScript** vs. **WebAssembly + `WebAssembly.Memory`** and explain why copying strings back and forth per pixel would hurt performance.  
> *(Your architecture evaluation)*
