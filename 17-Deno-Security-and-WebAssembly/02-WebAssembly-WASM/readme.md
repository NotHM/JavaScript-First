# Lesson 17.2: WebAssembly (WASM) Binary Structure, Linear Memory & Toolchains (`Std 4.0, 11.6, 1.4`)

## Student Learning Objectives (Bloom's Taxonomy & SMART)
- **`[L1 Remember]`** Recall the 8-byte WASM binary header (`\0asm` + little-endian version `1`), WAT S-expression syntax, 64 KiB memory page size, and core section IDs (`Type=1`, `Function=3`, `Memory=5`, `Export=7`, `Code=10`) (`4.1, 11.6`).
- **`[L2 Understand]`** Explain how `WebAssembly.instantiate()` executes stack-machine bytecode safely inside an isolated linear memory `ArrayBuffer` without ambient OS syscalls (`1.4, 4.7`).
- **`[L3 Apply]`** Write and read bytes in shared `WebAssembly.Memory` via `Uint8Array`, invoke exported WASM math & cipher functions (`add`, `factorial`, `fibonacci`, `sumBytes`, `xorTransform`), and validate headers in Node.js (`4.7, 11.6`).
- **`[L4 Analyze]`** Diagnose corrupt `.wasm` headers (`WebAssembly.validate() === false`), out-of-bounds `WebAssembly.RuntimeError` traps, and compare WASM vs. JS timing workloads (`1.4, 11.6`).
- **`[L5 Evaluate]`** Select appropriate workloads for `wat2wasm` / `wasm-pack` (Rust/C++ -> `.wasm`) vs. pure JavaScript (`11.6, 11.8`).

### Lesson 17.2 SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Identify the `\0asm` header, version `1`, and all 5 core WASM section IDs with >= 85% accuracy on Lesson 17.2 exit checks.
- [ ] **Goal 2 (`[L3–L4]`):** Complete `0-student_files/17-deno-wasm/wasmMemoryLab.mjs` to write UTF-8 data into `WebAssembly.Memory`, invoke `sumBytes`/`xorTransform`, and catch an intentional bounds trap within one 50-minute lab session.

---

## 1. WebAssembly Binary Structure (`\0asm`, Version `1` & Sections)

Every `.wasm` file is a compact, portable stack-machine binary beginning with a fixed **8-byte preamble**:

| Byte Offsets | Hex Values | Meaning |
|---|---|---|
| `0..3` | `0x00 0x61 0x73 0x6d` | Magic signature **`\0asm`** (identifies WebAssembly binary) |
| `4..7` | `0x01 0x00 0x00 0x00` | Spec **Version `1`** encoded as little-endian 32-bit integer |

Following the preamble, sections appear in ascending numeric ID order with **LEB128** variable-length byte lengths:

| Section ID | Name | Purpose |
|---|---|---|
| **`1`** | **Type** | Declares function signatures, e.g., `(i32, i32) -> i32` (`0x60`) |
| **`3`** | **Function** | Maps each internal function index to its Type index |
| **`5`** | **Memory** | Declares linear memory pages (`1 page = 64 KiB = 65,536 bytes`) |
| **`7`** | **Export** | Publishes functions (`0x00`) or memory (`0x02`) to the JS host |
| **`10`** | **Code** | Contains local variable declarations and stack-machine opcodes ending in `0x0b` (`end`) |

---

## 2. WAT Text Overview & Real Compiler Workflows (`wat2wasm` & `wasm-pack`)

While [`code/wasmBinaryBuilder.mjs`](./code/wasmBinaryBuilder.mjs) emits valid `.wasm` bytecode directly in pure JavaScript (`Uint8Array`) so labs run 100% offline, engineers normally compile human-readable **WAT (WebAssembly Text)** or systems languages (**Rust**, **C/C++**, **AssemblyScript**):

### Example WAT Source (`add.wat`)
```wat
(module
  (memory (export "memory") 1 4)
  (func (export "add") (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)
)
```

### Standard Production Toolchains
1. **WABT (`wat2wasm` / `wasm2wat`):**
   ```bash
   wat2wasm add.wat -o add.wasm
   wasm2wat add.wasm -o inspected.wat
   ```
2. **Rust (`wasm-pack`):**
   ```bash
   cargo new --lib image-filter
   # Add #[wasm_bindgen] functions in src/lib.rs
   wasm-pack build --target nodejs --release   # Generates pkg/*.wasm + typed ESM/CJS JS wrapper
   wasm-pack build --target web --release      # Generates browser <script type="module"> bundle
   ```

---

## 3. Shared `WebAssembly.Memory` & Security Sandbox (`Std 1.4, 4.7`)

JavaScript and WebAssembly communicate across a shared contiguous `ArrayBuffer` (`instance.exports.memory.buffer`):
```js
const { instance } = await WebAssembly.instantiate(wasmBytes, {});
const view = new Uint8Array(instance.exports.memory.buffer);
const encoded = new TextEncoder().encode('HELLO-WASM');
view.set(encoded, 128);
const checksum = instance.exports.sumBytes(128, encoded.length);
```

### Why WebAssembly Is Capability-Sandboxed
- **Zero Ambient OS Syscalls:** A `.wasm` module cannot open files, touch sockets, spawn shells, or read `process.env` unless the JavaScript host explicitly injects functions into the `importsObj` argument of `WebAssembly.instantiate(bytes, importsObj)`.
- **Bounds-Checked Linear Memory:** Every load/store checks bounds inside `memory.buffer` (`64 KiB` per page). Reading past the end traps immediately with `WebAssembly.RuntimeError` instead of leaking adjacent V8 heap secrets!

Run the offline bytecode emitter, linear memory tests, and JS vs. WASM benchmark:
```bash
node --test 17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/code/wasmBinaryBuilderDemo.test.mjs
```

---

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Offline Bytecode Emitter & Tests:** [`code/wasmBinaryBuilder.mjs`](./code/wasmBinaryBuilder.mjs) | [`code/wasmBinaryBuilderDemo.test.mjs`](./code/wasmBinaryBuilderDemo.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/17-deno-wasm/`](../../0-student_files/17-deno-wasm/)
