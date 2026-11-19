# Unit 17 Mastery Exam (50 Questions): Deno Security & WebAssembly

**Course:** JavaScript First (`AZ CTE Stds 1.3, 1.4, 4.0, 11.6–11.8, 13.1`)  
**Directions:** Choose the best option (`A`, `B`, `C`, or `D`) for each question. Record your answers on your answer sheet. Do not write in shared reference booklets.

**Name:** `__________________________` **Date:** `______________` **Score:** `____ / 50`

---

## Part A — Core Recall & Vocabulary (`[L1 Remember]`, Questions 1–10)

1. **`[L1 Remember | Std 1.3]`** What default security model does Deno enforce when executing a script with no permission flags?
   - A) Full root OS privileges automatically
   - B) Zero capabilities until explicitly allowed
   - C) Read-only access to the user's home directory
   - D) Unsandboxed network access on port 80

2. **`[L1 Remember | Std 1.3]`** Which security term describes default Node.js granting every imported npm dependency the user's full OS rights?
   - A) Zero Trust isolation
   - B) Ambient authority
   - C) Linear memory paging
   - D) Lexical scoping

3. **`[L1 Remember | Std 1.3]`** Which Deno CLI flag grants filesystem read access ONLY inside the `./public` directory?
   - A) `--allow-read=./public`
   - B) `--allow-all=./public`
   - C) `--allow-fs-read=./public`
   - D) `--enable-path=./public`

4. **`[L1 Remember | Std 1.3]`** Which Deno flag explicitly blocks reading a sensitive file even when a broader `--allow-read` directory is permitted?
   - A) `--block-fs`
   - B) `--deny-read`
   - C) `--no-read`
   - D) `--restrict-env`

5. **`[L1 Remember | Std 13.1]`** Which package specifier prefix resolves ESM-first TypeScript and JavaScript modules from the modern JavaScript Registry?
   - A) `cjs:`
   - B) `jsr:`
   - C) `ftp:`
   - D) `bin:`

6. **`[L1 Remember | Std 11.7]`** Which configuration file replaces `package.json` in Deno projects for defining `"tasks"`, `"imports"`, formatting, and lint rules?
   - A) `tsconfig.ini`
   - B) `Cargo.toml`
   - C) `deno.json`
   - D) `.babelrc`

7. **`[L1 Remember | Std 1.4]`** Which Node.js 24 CLI flag enables Node's built-in capability sandbox?
   - A) `--strict-sandbox`
   - B) `--permission`
   - C) `--inspect`
   - D) `--experimental-vm`

8. **`[L1 Remember | Std 4.1]`** What exact 4-byte magic header begins every valid compiled WebAssembly (`.wasm`) binary file?
   - A) `\0asm` (`0x00 0x61 0x73 0x6d`)
   - B) `\x7fELF` (`0x7f 0x45 0x4c 0x46`)
   - C) `%PDF` (`0x25 0x50 0x44 0x46`)
   - D) `WASM` (`0x57 0x41 0x53 0x4d`)

9. **`[L1 Remember | Std 4.7]`** What is the fixed byte size of exactly one WebAssembly linear memory page?
   - A) `4 KiB (4,096 bytes)`
   - B) `16 KiB (16,384 bytes)`
   - C) `64 KiB (65,536 bytes)`
   - D) `1 MiB (1,048,576 bytes)`

10. **`[L1 Remember | Std 11.6]`** What are the standard numeric section IDs in a `.wasm` binary for Type, Function, Memory, Export, and Code respectively?
    - A) `0, 2, 4, 6, 8`
    - B) `1, 3, 5, 7, 10`
    - C) `2, 4, 6, 8, 12`
    - D) `1, 2, 3, 4, 5`

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Questions 11–20)

11. **`[L2 Understand | Std 1.3]`** Why does running `node app.js` without sandboxing create high supply-chain risk when using third-party npm packages?
    - A) JavaScript cannot run without root privileges
    - B) All transitive dependencies inherit full user OS rights
    - C) `npm` compiles every package into native C++ automatically
    - D) Node disables HTTPS certificates when `node_modules` exists

12. **`[L2 Understand | Std 11.7]`** What happens when you execute `deno run server.ts` on a standard TypeScript file without running `tsc` beforehand?
    - A) Deno throws `ERR_UNKNOWN_FILE_EXTENSION`
    - B) Deno silently ignores all functions inside the file
    - C) Deno executes TypeScript natively out of the box
    - D) Deno converts the file permanently into CommonJS

13. **`[L2 Understand | Std 11.7]`** Why do `Deno.serve()` handlers integrate cleanly with Edge runtimes and modern browsers?
    - A) They require Express `req.params` middleware exclusively
    - B) They only accept raw TCP socket buffers
    - C) They rely on global PHP-style superglobals
    - D) They use Web-standard `Request` and `Response` objects

14. **`[L2 Understand | Std 13.1]`** What practical benefit does adding `"imports": { "@std/path": "jsr:@std/path@^1.0.8" }` inside `deno.json` give a team?
    - A) Installs native system binaries into `/usr/bin`
    - B) Forces every file to load CommonJS `require()`
    - C) Maps clean bare specifiers to pinned versions without `node_modules`
    - D) Disables capability flags across all tasks

15. **`[L2 Understand | Std 4.1]`** In the 8-byte `.wasm` preamble `[0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]`, what do bytes `4..7` encode?
    - A) Binary version `1` in 32-bit little-endian order
    - B) Total byte length of the exported memory section
    - C) Memory page count in big-endian `int32`
    - D) File creation timestamp in Unix epoch seconds

16. **`[L2 Understand | Std 4.7]`** Why does the WebAssembly binary format use **LEB128** encoding for section sizes and integer immediates?
    - A) It encrypts JavaScript variable names with AES
    - B) It packs variable-length integers into minimal bytes
    - C) It pads every opcode to a fixed 64-byte alignment
    - D) It converts little-endian floats into UTF-8 strings

17. **`[L2 Understand | Std 11.6]`** How does **WAT** relate to a compiled `.wasm` module?
    - A) WAT is an encrypted token used for Deno network access
    - B) WAT is a human-readable S-expression text compiled to `.wasm`
    - C) WAT is a browser DOM event fired after `fetch()` fails
    - D) WAT is an alternative Node package lockfile format

18. **`[L2 Understand | Std 4.7]`** How do JavaScript and an instantiated `.wasm` module exchange strings or large byte arrays efficiently?
    - A) By writing temporary `.txt` files to `/tmp` on every call
    - B) Via `localStorage` key-value polling
    - C) Through a shared contiguous `ArrayBuffer` in `WebAssembly.Memory`
    - D) By encoding JSON payloads into HTTP `Cookie` headers

19. **`[L2 Understand | Std 1.4]`** Why can a standalone `.wasm` module with empty host imports `{}` not open host files or spawn OS shells on its own?
    - A) `.wasm` has zero ambient OS syscalls without explicit host imports
    - B) WebAssembly blocks all integer arithmetic inside browsers
    - C) V8 deletes the host filesystem API before compiling `.wasm`
    - D) `.wasm` code only executes inside CSS worker threads

20. **`[L2 Understand | Std 1.4]`** What capability advantage does Node 24's `--permission` flag give teams maintaining existing Node codebases?
    - A) Automatic Rust-to-WASM compilation during `npm start`
    - B) Replacement of V8 with JavaScriptCore inside Node
    - C) Zero-config TypeScript bundling for browsers
    - D) Scoped filesystem and child-process isolation inside Node

---

## Part C — Practical Application (`[L3 Apply]`, Questions 21–30)

21. **`[L3 Apply | Std 1.3]`** Which command runs `deno_server.ts` while scoping network traffic strictly to `127.0.0.1:8080` and reading only the `PORT` env var?
    - A) `deno run -A deno_server.ts`
    - B) `deno run --allow-net=127.0.0.1:8080 --allow-env=PORT deno_server.ts`
    - C) `deno run --allow-read=127.0.0.1:8080 --allow-sys=PORT deno_server.ts`
    - D) `deno check --allow-net deno_server.ts`

22. **`[L3 Apply | Std 11.7]`** Which Deno command performs static TypeScript type-checking on `deno_server.ts` without executing the HTTP server?
    - A) `deno run --lint deno_server.ts`
    - B) `deno check deno_server.ts`
    - C) `deno compile --dry deno_server.ts`
    - D) `deno fmt --types deno_server.ts`

23. **`[L3 Apply | Std 1.3]`** Which combination of Deno flags permits reading static files in `./data/` while ensuring `./data/.env` remains unreadable?
    - A) `--allow-read=./data --deny-read=./data/.env`
    - B) `--allow-all --ignore-env=.env`
    - C) `--deny-all --allow-env=./data`
    - D) `--allow-write=./data --allow-read=./data/.env`

24. **`[L3 Apply | Std 1.4]`** Which Node 24 CLI command activates the permission sandbox and restricts filesystem reads to `./public`?
    - A) `node --sandbox --read=./public app.mjs`
    - B) `node --allow-read=./public app.mjs`
    - C) `node --permission --allow-fs-read=./public app.mjs`
    - D) `node --strict-env --fs=./public app.mjs`

25. **`[L3 Apply | Std 11.6]`** Which built-in JavaScript method synchronously returns `true` or `false` indicating whether a `Uint8Array` contains valid WebAssembly bytecode?
    - A) `WebAssembly.validate(bytes)`
    - B) `WebAssembly.checkHeader(bytes)`
    - C) `JSON.validateWasm(bytes)`
    - D) `Buffer.isWasm(bytes)`

26. **`[L3 Apply | Std 11.6]`** Which asynchronous JavaScript call compiles a `.wasm` buffer and returns `{ module, instance }` ready to execute exports?
    - A) `WebAssembly.compileSync(bytes)`
    - B) `WebAssembly.instantiate(bytes, imports)`
    - C) `Deno.loadWasm(bytes)`
    - D) `import.meta.wasm(bytes)`

27. **`[L3 Apply | Std 4.7]`** Given `encoded = new TextEncoder().encode('AZ-CTE')`, how do you write those bytes starting at index `128` inside an instance's exported linear memory?
    - A) `instance.exports.memory.write('AZ-CTE', 128)`
    - B) `process.env.WASM_PTR = encoded`
    - C) `new Uint8Array(instance.exports.memory.buffer).set(encoded, 128)`
    - D) `Buffer.from(instance.exports).copy(encoded, 128)`

28. **`[L3 Apply | Std 4.7]`** Suppose `xorTransform(ptr, len, 0x42)` XORs a UTF-8 buffer in linear memory in place. What happens when you invoke `xorTransform(ptr, len, 0x42)` a second time?
    - A) It permanently doubles the byte length of the buffer
    - B) It clears every byte in the buffer to `0x00`
    - C) It restores the exact original plaintext bytes
    - D) It throws `WebAssembly.LinkError`

29. **`[L3 Apply | Std 11.8]`** Using the WebAssembly Binary Toolkit (`WABT`), which terminal command compiles a human-readable `.wat` file into `.wasm` bytecode?
    - A) `wasm2wat add.wat -o add.wasm`
    - B) `wat2wasm add.wat -o add.wasm`
    - C) `deno bundle add.wat add.wasm`
    - D) `npx wasm-init add.wat`

30. **`[L3 Apply | Std 11.8]`** Which `wasm-pack` command builds a Rust crate into a `.wasm` binary with ESM JavaScript wrapper bindings targeting Node.js?
    - A) `wasm-pack build --target nodejs --release`
    - B) `wasm-pack compile --target deno-legacy`
    - C) `cargo install --wasm-cjs`
    - D) `wat2wasm src/lib.rs --node`

---

## Part D — Code Analysis & Debugging (`[L4 Analyze]`, Questions 31–40)

31. **`[L4 Analyze | Std 1.4]`** A developer runs `node --permission --allow-fs-read=./pub app.mjs`, and `app.mjs` calls `fs.readFileSync('/etc/hosts')`. What exact Node error code is thrown?
    - A) `ENOENT`
    - B) `ERR_MODULE_NOT_FOUND`
    - C) `ERR_ACCESS_DENIED`
    - D) `ECONNREFUSED`

32. **`[L4 Analyze | Std 1.4]`** A Node `--permission` script has `--allow-fs-read=./public` enabled, then calls `spawnSync('git', ['status'])` without `--allow-child-process`. What occurs?
    - A) `git` runs with read-only permissions
    - B) Node throws `ERR_ACCESS_DENIED` blocking child process spawn
    - C) Node silently returns empty stdout with status `0`
    - D) V8 crashes with a segmentation fault

33. **`[L4 Analyze | Std 1.3]`** You launch `deno run --allow-net=api.school.edu:443 client.ts`, and a third-party dependency calls `fetch('https://evil.example/exfil')`. What does Deno do?
    - A) Allows the request because `--allow-net` was specified once
    - B) Upgrades the connection over HTTP instead of HTTPS
    - C) Denies network access to `evil.example` with `PermissionDenied`
    - D) Strips query parameters before sending the payload

34. **`[L4 Analyze | Std 1.3]`** Inside `CapabilitySandboxPolicy.canRead(targetPath)`, why must `denyPaths` be checked *before* `readRoots`?
    - A) Checking `readRoots` first would reject every path with `ENOENT`
    - B) Explicit `--deny-*` exclusions inside an allowed folder would otherwise be bypassed
    - C) JavaScript `Set.has()` only executes after array sorting
    - D) `path.resolve()` returns empty strings for denied folders

35. **`[L4 Analyze | Std 1.4]`** Why does normalizing candidate file paths with `path.resolve(targetPath)` protect `CapabilitySandboxPolicy.canRead()` against `'/srv/app/public/../../etc/passwd'`?
    - A) `path.resolve()` collapses `..` segments before prefix matching
    - B) `path.resolve()` automatically strips file extensions like `.env`
    - C) `path.resolve()` encrypts path strings using SHA-256
    - D) `path.resolve()` deletes unreadable files automatically

36. **`[L4 Analyze | Std 1.4]`** Why must `auditRuntimeFlags('node', ['--allow-fs-read=./pub'])` return `verdict: 'REJECTED'` even though `--allow-fs-read` is scoped?
    - A) `./pub` contains fewer than 8 characters
    - B) Node.js requires `--permission` or all allow flags are ignored
    - C) Node only supports `.ts` files under `--permission`
    - D) `--allow-fs-read` is a Deno-only flag name

37. **`[L4 Analyze | Std 4.1]`** A fetch mistake saves an HTML 404 error page as `filter.wasm`. What error does `WebAssembly.instantiate()` throw when loading it?
    - A) `TypeError: Cannot convert HTML to UTF-8`
    - B) `SyntaxError: Unexpected token '<'`
    - C) `WebAssembly.CompileError` citing invalid `\0asm` magic bytes
    - D) `RangeError: Maximum call stack size exceeded`

38. **`[L4 Analyze | Std 4.7]`** A `.wasm` module allocates 1 memory page (`65,536` bytes). JavaScript calls `instance.exports.sumBytes(65530, 16)`. What happens on byte index `65536`?
    - A) It wraps seamlessly back around to byte index `0`
    - B) It grows memory to 2 pages implicitly
    - C) It returns `NaN` for missing bytes
    - D) It traps with `WebAssembly.RuntimeError` (out of bounds)

39. **`[L4 Analyze | Std 1.4]`** Why is an out-of-bounds read inside `WebAssembly.Memory` significantly safer than a buffer over-read in raw C?
    - A) Linear memory bounds checks trap cleanly before touching host V8 RAM
    - B) WebAssembly replaces every invalid byte with random characters
    - C) WASM automatically deletes the calling JavaScript closure
    - D) Node disables ASLR whenever `.wasm` modules load

40. **`[L4 Analyze | Std 4.7]`** A student implements `xorRoundTrip` and gets garbled hex output back as `recoveredText` (`'wEBaSSM' -> '5#$A33-'`). What bug most likely happened?
    - A) Used `TextEncoder` instead of `Uint16Array`
    - B) Applied `xorTransform` only once instead of calling it twice with `key`
    - C) Forgot to import `node:crypto` inside the `.wasm` module
    - D) Allocated 2 pages of `WebAssembly.Memory` instead of 1

---

## Part E — Architectural Evaluation & Tradeoffs (`[L5 Evaluate]`, Questions 41–50)

41. **`[L5 Evaluate | Std 1.3]`** Why should a security reviewer block a PR that changes a production Dockerfile command from scoped `--allow-*` flags to `deno run -A server.ts`?
    - A) `-A` grants full unrestricted OS capabilities, voiding the sandbox
    - B) `-A` turns off native TypeScript execution in Deno
    - C) `-A` forces HTTP/1.0 responses without JSON headers
    - D) `-A` disables `WebAssembly.instantiate()`

42. **`[L5 Evaluate | Std 1.3]`** Which Deno flag configuration enforces strict Least Privilege for a static site server serving `./dist/` over `127.0.0.1:8080` and reading `PORT`?
    - A) `--allow-all`
    - B) `--allow-read --allow-net --allow-env`
    - C) `--allow-net=127.0.0.1:8080 --allow-read=./dist --allow-env=PORT`
    - D) `--allow-run --allow-write=./dist`

43. **`[L5 Evaluate | Std 1.4]`** An automated manifest for a read-only catalog API includes `--permission --allow-fs-read=./catalog --allow-fs-write=*`. How should a Lead Engineer score it?
    - A) Approve, because `--permission` is present
    - B) Approve with a minor style note
    - C) Reject, because wildcard `--allow-fs-write=*` grants unneeded write access
    - D) Convert `./catalog` into a WAT module first

44. **`[L5 Evaluate | Std 1.4 / 11.6]`** A multi-tenant SaaS backend lets customers upload custom pricing logic plugins. Which execution architecture provides the strongest safety isolation?
    - A) Evaluate uploaded JavaScript strings directly via `eval()`
    - B) Execute compiled `.wasm` with `{}` empty imports inside a `--permission` host
    - C) Save plugins to `./plugins/` and run `deno run -A plugin.ts`
    - D) Spawn `bash -c` inside a non-sandboxed Node worker

45. **`[L5 Evaluate | Std 1.4]`** When calling `WebAssembly.instantiate(pluginBytes, importsObj)` on untrusted user plugins, why leave `importsObj` empty `{}` (or restricted to pure math helpers)?
    - A) Keeps the WASM linear memory size under 4 KiB
    - B) Prevents the plugin from invoking host network, file, or env capabilities
    - C) Forces `.wasm` binaries to use little-endian UTF-16 encoding
    - D) Enables automatic Rust compilation at runtime

46. **`[L5 Evaluate | Std 11.6]`** When is staying in pure TypeScript/JavaScript a *better* engineering choice than rewriting a module into Rust/WebAssembly?
    - A) Tight 64-bit integer loops over 50 MB image buffers
    - B) Small JSON API glue, DOM updates, or I/O-bound database queries
    - C) Running untrusted third-party cryptography algorithms
    - D) Deterministic pixel-level DSP audio compression

47. **`[L5 Evaluate | Std 11.6 / 11.8]`** When is compiling Rust to `.wasm` via `wasm-pack` genuinely justified over keeping the logic in JavaScript?
    - A) Parsing a 200-byte configuration JSON file at startup
    - B) Compute-heavy loops over large linear binary buffers avoiding GC pauses
    - C) Serving two static HTML pages over `Deno.serve`
    - D) Logging environment startup timestamps

48. **`[L5 Evaluate | Std 1.4]`** Why does pairing **Node `--permission` / Deno capability flags** WITH **WebAssembly linear memory bounds** establish true defense-in-depth?
    - A) One limits host dependencies' OS surface while WASM isolates untrusted plugin memory
    - B) Both features merge `package.json` and `deno.json` automatically
    - C) WebAssembly eliminates the need for HTTP TLS certificates
    - D) Node `--permission` doubles WebAssembly execution clock speed

49. **`[L5 Evaluate | Std 1.3]`** A code review discovers `CapabilitySandboxPolicy.canFetch()` only checks `this.allowedHosts.has(parsed.hostname)` even when the allowlist specifies `api.school.edu:8443`. Why is this flawed?
    - A) `URL` constructor throws on HTTPS URLs with port numbers
    - B) Matching only hostname ignores explicit port restrictions on the host
    - C) DNS resolves localhost ports differently from `127.0.0.1`
    - D) Browsers strip hostnames from every `Request` header

50. **`[L5 Evaluate | Std 4.7]`** A `.wasm` sandbox allocates **2 pages** of linear memory (`131,072` bytes). What invariant must the JS host verify *before* writing a `payload` at `offset`?
    - A) `offset >= 0 && offset + payload.byteLength <= 131072`
    - B) `offset === 65536 && payload.byteLength < 64`
    - C) `payload` contains only lowercase ASCII characters
    - D) `offset` is an odd prime number less than `4096`
