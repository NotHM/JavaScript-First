# Unit 17 Quiz 1: Deno Permissions & WebAssembly Fundamentals (Concepts)

**Bloom's Focus:** `[L1 Remember]` & `[L2 Understand]`  
**Kahoot Import File:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv)  
**AZ CTE Standards:** `1.3`, `1.4`, `4.1`, `11.6`, `11.7`, `13.1`

| # | Question | Choices (* = Correct) | Time | Bloom's & Rationale |
|---|---|---|---|---|
| 1 | What security model does Deno enforce by default when running a script? | A) Full root access<br>**B) Secure-by-default explicit `--allow-*` permissions***<br>C) Browser cookies only<br>D) Disabled V8 JIT | 20s | `[L1 Remember \| 1.3]` Scripts cannot touch FS, net, env, or subprocesses unless explicitly allowed. |
| 2 | Which Deno CLI flag allows network requests ONLY to `api.school.edu:443`? | A) `--allow-all`<br>B) `--allow-read=api.school.edu`<br>**C) `--allow-net=api.school.edu:443`***<br>D) `--allow-env=NET` | 20s | `[L1 Remember \| 1.3]` `--allow-net=<host>` restricts outbound/inbound hosts precisely. |
| 3 | What happens when you pass TypeScript (`app.ts`) directly to `deno run app.ts`? | A) Throws `ERR_UNKNOWN_FILE_EXTENSION`<br>**B) Deno executes TypeScript natively out of the box***<br>C) Requires Babel first<br>D) Only works in CommonJS | 20s | `[L2 Understand \| 11.7]` Deno ships native TypeScript stripping/type-checking via `deno check`. |
| 4 | Which specifier prefix imports packages from the modern JavaScript Registry in Deno? | **A) `jsr:`***<br>B) `cjs:`<br>C) `ftp:`<br>D) `sql:` | 20s | `[L1 Remember \| 13.1]` `jsr:@std/path` resolves ESM-first typed packages via JSR. |
| 5 | What Node.js CLI flag enables Node's capability sandbox? | A) `--inspect`<br>**B) `--permission`***<br>C) `--watch`<br>D) `--experimental-vm` | 20s | `[L1 Remember \| 1.4]` `--permission` restricts FS, child_process, worker, and addons unless allowed. |
| 6 | What 4 magic bytes start EVERY valid WebAssembly (`.wasm`) binary file? | **A) `\0asm` (`0x00 0x61 0x73 0x6d`)***<br>B) `\x7fELF`<br>C) `WASM`<br>D) `%PDF` | 20s | `[L1 Remember \| 4.1]` Official WASM spec magic header is `\0asm` followed by version `1`. |
| 7 | What is WAT in the WebAssembly ecosystem? | A) Web Access Token<br>**B) WebAssembly Text format (human-readable S-expressions)***<br>C) Windows Archive Tool<br>D) Wireless Async Transport | 20s | `[L1 Remember \| 11.6]` `.wat` compiles to `.wasm` via tools such as `wat2wasm`. |
| 8 | What is the fixed byte size of 1 WebAssembly linear memory page? | A) `512 bytes`<br>B) `4 KiB`<br>**C) `64 KiB` (`65,536` bytes)***<br>D) `1 MB` | 20s | `[L1 Remember \| 4.7]` WebAssembly linear memory grows in multiples of 64 KiB pages. |
| 9 | Which WebAssembly JavaScript API compiles and creates a runnable module instance? | A) `JSON.parse()`<br>**B) `WebAssembly.instantiate()`***<br>C) `Deno.serve()`<br>D) `createRequire()` | 20s | `[L2 Understand \| 11.6]` `WebAssembly.instantiate(bytes, imports)` returns `{ module, instance }`. |
| 10 | By default, can a compiled `.wasm` function open local files or network sockets directly? | A) Yes, anytime<br>B) Only in Firefox<br>**C) No—it can only touch its memory buffer and explicit host imports***<br>D) Only if compiled from Rust | 30s | `[L2 Understand \| 1.4]` WASM is capability-isolated with zero ambient OS syscalls. |
