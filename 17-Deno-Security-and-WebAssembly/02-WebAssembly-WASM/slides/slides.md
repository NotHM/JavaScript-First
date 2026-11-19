---
title: "Lesson 17.2 — WebAssembly (WASM) Binary Structure & Linear Memory"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 17.2: WebAssembly (WASM)
**AZ CTE Standards `1.4, 4.0, 11.6, 11.8`**

*Portable Stack-Machine Bytecode, Linear Memory & Zero-Syscall Sandboxing*

---

### `[L1 Remember]` Inside the `.wasm` Binary Header

| Bytes | Hex | Meaning |
|---|---|---|
| `0..3` | `0x00 0x61 0x73 0x6d` | Magic **`\0asm`** |
| `4..7` | `0x01 0x00 0x00 0x00` | Version **`1`** (little-endian) |

**Key Section IDs:**
`1` Type | `3` Function | `5` Memory | `7` Export | `10` Code

---

### `[L2 Understand]` WAT Text & Toolchains

```wat
(module
  (memory (export "memory") 1 4)
  (func (export "add") (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add)
)
```

- **WABT:** `wat2wasm add.wat -o add.wasm`
- **Rust:** `wasm-pack build --target nodejs --release`
- **Offline JS Lab:** `wasmBinaryBuilder.mjs` emits valid `.wasm` bytes with zero external compilers!

---

### `[L3 Apply]` Shared `WebAssembly.Memory`

```javascript
const { instance } = await WebAssembly.instantiate(wasmBytes, {});
const view = new Uint8Array(instance.exports.memory.buffer);
view.set(new TextEncoder().encode('WASM!'), 128);
const sum = instance.exports.sumBytes(128, 5);
```

- 1 page = **`64 KiB` (`65,536` bytes)**.
- Zero OS syscalls unless explicitly passed in `imports`!

---

### `[L4 Analyze -> L5 Evaluate]` Sandbox Traps & Lab

> **Predict Before Running:** What happens when `sumBytes(65536, 4)` runs inside a 1-page module?

1. Run: `node --test 17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/code/wasmBinaryBuilderDemo.test.mjs`
2. Complete `0-student_files/17-deno-wasm/wasmMemoryLab.mjs`
3. Complete the **Post-Lesson 17.2 Exit Ticket**!
