# Unit 17 Post-Unit Evaluation: Deno Security & WebAssembly (Summative)

**Directions:** Complete independently without notes. Compare against your Unit 17 Pre-Unit score to document measurable growth.

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 14`

---

### Part A — Paired Core Mastery (1 pt each)

1. **`[L1 Remember | Std 1.3]`** In Deno, how do you allow a script to read `./config/` while explicitly blocking `./config/secrets/` even if another flag permits broader reads?  
   - A) `--allow-read=./config --deny-read=./config/secrets`  
   - B) `--allow-all --no-secrets`  
   - C) `--only-read=./config`  
   - D) `--chmod-read=000`  

2. **`[L1 Remember | Std 11.7]`** Which configuration file replaces `package.json` for defining Deno `"tasks"`, `"imports"` (including `jsr:` specifiers), `"fmt"`, and `"lint"` rules?  
   - A) `deno.lock.txt`  
   - B) `deno.json` (or `deno.jsonc`)  
   - C) `Cargo.toml`  
   - D) `.babelrc`  

3. **`[L1 Remember | Std 4.1 / 11.6]`** In a valid WebAssembly binary module, what bytes immediately follow the `\0asm` (`0x00 0x61 0x73 0x6d`) magic header?  
   - A) ASCII `"WASM"`  
   - B) Version `1` encoded as little-endian 32-bit uint (`0x01 0x00 0x00 0x00`)  
   - C) UTF-8 source code text  
   - D) A SHA-256 checksum  

4. **`[L2 Understand | Std 1.4]`** Running `node --permission --allow-fs-read=./public app.mjs` causes `fs.readFileSync('/etc/hosts')` to throw which exact Node.js error code?  
   - A) `ENOENT`  
   - B) `ERR_MODULE_NOT_FOUND`  
   - C) `ERR_ACCESS_DENIED`  
   - D) `ECONNREFUSED`  

5. **`[L2 Understand | Std 4.7 / 11.6]`** Which WASM section IDs store function signatures, exported names, and compiled bytecode bodies respectively?  
   - A) Type (`1`), Export (`7`), Code (`10`)  
   - B) Import (`2`), Global (`6`), Data (`11`)  
   - C) Memory (`5`), Table (`4`), Start (`8`)  
   - D) Custom (`0`), Element (`9`), Function (`3`)  

6. **`[L3 Apply | Std 4.7]`** When a JavaScript host writes bytes at offset `128` into `new Uint8Array(instance.exports.memory.buffer)` and calls `sumBytes(128, 13)`, what happens if `sumBytes` attempts to read past `memory.buffer.byteLength`?  
   - A) It silently reads Node's V8 heap secrets  
   - B) It traps immediately with `WebAssembly.RuntimeError` (memory access out of bounds)  
   - C) It automatically deletes `deno.json`  
   - D) It returns `NaN`  

7. **`[L3 Apply | Std 11.7]`** What does `await WebAssembly.instantiate(wasmBytes, importsObj)` return?  
   - A) A raw string of WAT text  
   - B) `{ module, instance }`, where `instance.exports` exposes exported functions and `WebAssembly.Memory`  
   - C) An HTTP `Response` stream  
   - D) A CommonJS `require` function  

8. **`[L4 Analyze | Std 1.3]`** A contractor configures `node --permission --allow-fs-read=* --allow-child-process worker.mjs`. Why does this fail a security audit?  
   - A) `--permission` requires TypeScript  
   - B) Wildcard `--allow-fs-read=*` plus `--allow-child-process` allows reading any host file and spawning unsandboxed OS binaries  
   - C) `worker.mjs` uses ESM instead of `.cjs`  
   - D) Node cannot read files when `--permission` is set  

---

### Part B — Higher-Order Thinking: Analyze, Evaluate & Create (2 pts each = 6 pts)

9. **`[L4 Analyze | Std 1.4 / 4.7]`** Contrast **Deno / Node `--permission` sandboxing** with **WebAssembly linear-memory sandboxing**: what threat does each protect against, and why does combining *both* provide defense-in-depth when executing third-party plugins?  
   > *(Your analysis)*

10. **`[L5 Evaluate | Std 11.6 / 11.8]`** Your team builds a service that (a) runs an untrusted Markdown-to-HTML plugin and (b) hashes/transforms 50 MB telemetry frames per request. Recommend which parts belong in **Deno/Node JS**, which belong in **WebAssembly (`wasm-pack` / `wat2wasm`)**, and what CLI permissions should be granted.  
    > *(Your recommendation)*

11. **`[L6 Create | Std 4.7 / 11.6]`** Write a clean 6–10 line JavaScript async helper `runWasmBufferCheck(wasmBytes, text)` that validates `WebAssembly.validate(wasmBytes)`, instantiates the module, writes UTF-8 encoded `text` at offset `0` in `instance.exports.memory.buffer`, and returns `{ byteLength, checksum: instance.exports.sumBytes(0, encoded.length) }` (throwing a `TypeError` if validation fails).  
    ```js
    // Write your helper below:
    ```
