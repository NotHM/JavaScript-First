# Unit 17 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Coverage:** AZ CTE Stds `1.3, 1.4, 4.0, 11.6–11.8, 13.1` across Bloom's `L1–L5` (10 items per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| 1.3]` | Deno defaults to Zero Trust with zero file, net, env, or run permissions until granted; A/C/D assume implicit authority. |
| **Q2** | **B** | `[L1 Remember \| 1.3]` | Default Node grants imported packages **ambient authority** inheriting full user OS permissions; the others refer to sandboxes or memory/scope concepts. |
| **Q3** | **A** | `[L1 Remember \| 1.3]` | Deno scopes filesystem reads with `--allow-read=<path>`; `--allow-fs-read` (C) is Node's syntax, while `--allow-all` (B) grants everything. |
| **Q4** | **B** | `[L1 Remember \| 1.3]` | `--deny-read` explicitly blocks subdirectories/files inside broader `--allow-read` scopes; A, C, and D are invented flags. |
| **Q5** | **B** | `[L1 Remember \| 13.1]` | `jsr:` resolves modern ESM-first typed packages from JSR without nested `node_modules`; `cjs:`, `ftp:`, and `bin:` are distractors. |
| **Q6** | **C** | `[L1 Remember \| 11.7]` | `deno.json` (or `.jsonc`) centralizes Deno tasks, import maps, formatting, and linting; `Cargo.toml` is Rust and `.babelrc` is Babel transpilation. |
| **Q7** | **B** | `[L1 Remember \| 1.4]` | Node's `--permission` flag enables built-in capability isolation (`ERR_ACCESS_DENIED`); `--inspect` attaches debuggers and `--strict-sandbox` does not exist. |
| **Q8** | **A** | `[L1 Remember \| 4.1]` | Every compiled `.wasm` binary starts with `\0asm` (`0x00 0x61 0x73 0x6d`); `\x7fELF` is Linux ELF and `%PDF` is PDF. |
| **Q9** | **C** | `[L1 Remember \| 4.7]` | Per the WebAssembly specification, 1 linear memory page is strictly `64 KiB` (`65,536` bytes); smaller/larger options misstate the spec page unit. |
| **Q10** | **B** | `[L1 Remember \| 11.6]` | Core WASM sections are ordered as `Type(1)`, `Function(3)`, `Memory(5)`, `Export(7)`, and `Code(10)`; other tuples list invalid/unrelated section IDs. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **B** | `[L2 Understand \| 1.3]` | Without capability sandboxing, any transitive dependency inside `node_modules` inherits the full filesystem, network, and env rights of the parent user process. |
| **Q12** | **C** | `[L2 Understand \| 11.7]` | Deno strips/executes TypeScript natively out of the box without manual `tsc` or Babel builds; Node CJS errors and ignores do not occur. |
| **Q13** | **D** | `[L2 Understand \| 11.7]` | `Deno.serve()` standardizes on WHATWG `Request` and `Response` objects shared across browsers, Deno, Bun, and Edge workers. |
| **Q14** | **C** | `[L2 Understand \| 13.1]` | Import maps in `deno.json` keep source imports clean (`@std/path`) while pinning exact JSR versions with zero `node_modules` directory bloat. |
| **Q15** | **A** | `[L2 Understand \| 4.1]` | Bytes `4..7` (`0x01 0x00 0x00 0x00`) represent WebAssembly spec version `1` encoded as a 32-bit little-endian unsigned integer. |
| **Q16** | **B** | `[L2 Understand \| 4.7]` | LEB128 encodes small integer lengths/indices in 1 byte while supporting larger numbers compactly, keeping `.wasm` wire payloads small. |
| **Q17** | **B** | `[L2 Understand \| 11.6]` | WAT is the human-readable S-expression representation compiled directly to binary `.wasm` via `wat2wasm`; it is neither a token nor a lockfile. |
| **Q18** | **C** | `[L2 Understand \| 4.7]` | JS and WASM share a contiguous `ArrayBuffer` (`instance.exports.memory.buffer`) typed via `Uint8Array` views rather than slow disk or cookie IPC. |
| **Q19** | **A** | `[L2 Understand \| 1.4]` | WASM is capability-sandboxed: unless the JS host injects I/O functions into `importsObj`, compiled modules have zero OS file/network syscalls. |
| **Q20** | **D** | `[L2 Understand \| 1.4]` | Node 24's `--permission` enforces scoped FS (`--allow-fs-read/write`) and child-process limits inside existing Node services without runtime rewrites. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **B** | `[L3 Apply \| 1.3]` | Scoping `--allow-net=127.0.0.1:8080 --allow-env=PORT` adheres to Least Privilege, whereas `-A` disables sandboxing and `--allow-read` does not permit sockets. |
| **Q22** | **B** | `[L3 Apply \| 11.7]` | `deno check` statically type-checks TypeScript files without starting runtime execution; the other flags are nonexistent or wrong tools. |
| **Q23** | **A** | `[L3 Apply \| 1.3]` | `--deny-read=./data/.env` carves out the secret file while permitting reads elsewhere under `./data`; `--allow-all` and `--deny-all` break least privilege or access. |
| **Q24** | **C** | `[L3 Apply \| 1.4]` | Node 24 activates sandboxing with `--permission` paired with `--allow-fs-read=./public`; `--allow-read` is Deno syntax, not Node. |
| **Q25** | **A** | `[L3 Apply \| 11.6]` | `WebAssembly.validate(bytes)` synchronously inspects binary structure and returns a boolean; the other method names do not exist in standard JS. |
| **Q26** | **B** | `[L3 Apply \| 11.6]` | `await WebAssembly.instantiate(bytes, imports)` asynchronously compiles and instantiates returning `{ module, instance }`. |
| **Q27** | **C** | `[L3 Apply \| 4.7]` | Wrapping `instance.exports.memory.buffer` in `new Uint8Array(...)` lets JS copy encoded UTF-8 bytes straight into linear memory via `.set(encoded, 128)`. |
| **Q28** | **C** | `[L3 Apply \| 4.7]` | Bitwise XOR is self-inverse (`(b ^ k) ^ k === b`), so invoking `xorTransform` twice with the same key cleanly recovers the original UTF-8 text. |
| **Q29** | **B** | `[L3 Apply \| 11.8]` | `wat2wasm` compiles `.wat` text into `.wasm` binary, while `wasm2wat` disassembles `.wasm` back to `.wat`. |
| **Q30** | **A** | `[L3 Apply \| 11.8]` | `wasm-pack build --target nodejs --release` compiles Rust (`wasm32`) and generates ready-to-import Node ESM/CJS glue wrappers. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **C** | `[L4 Analyze \| 1.4]` | Node's permission model specifically raises `ERR_ACCESS_DENIED` on unscoped paths (whereas missing files normally raise `ENOENT`). |
| **Q32** | **B** | `[L4 Analyze \| 1.4]` | `--permission` disables `child_process` spawning by default and throws `ERR_ACCESS_DENIED` unless `--allow-child-process` is explicitly passed. |
| **Q33** | **C** | `[L4 Analyze \| 1.3]` | Scoping `--allow-net=api.school.edu:443` restricts network egress strictly to that host:port, rejecting any fetch to `evil.example`. |
| **Q34** | **B** | `[L4 Analyze \| 1.3]` | Because a secret file like `./public/.env` sits inside `./public`, checking `readRoots` first would falsely approve access unless `denyPaths` takes precedence. |
| **Q35** | **A** | `[L4 Analyze \| 1.4]` | `path.resolve()` canonicalizes `..` traversal segments into `/etc/passwd` before comparing against `/srv/app/public`, stopping directory escapes. |
| **Q36** | **B** | `[L4 Analyze \| 1.4]` | Passing `--allow-fs-read` without `--permission` leaves Node completely unsandboxed, earning a HIGH severity deduction and `REJECTED` verdict. |
| **Q37** | **C** | `[L4 Analyze \| 4.1]` | Leading HTML bytes (`<!DO` or `<htm`) fail the `\0asm` header check, triggering `WebAssembly.CompileError: expected magic word 00 61 73 6d`. |
| **Q38** | **D** | `[L4 Analyze \| 4.7]` | Reading bytes `65530..65545` crosses the 1-page `65536` limit, causing an immediate `WebAssembly.RuntimeError` out-of-bounds trap. |
| **Q39** | **A** | `[L4 Analyze \| 1.4]` | Hardware/VM bounds checks restrict every WASM load/store strictly to `memory.buffer`, trapping before leaking adjacent V8 JavaScript secrets. |
| **Q40** | **B** | `[L4 Analyze \| 4.7]` | XOR encryption requires calling `xorTransform` twice with the same key (`encrypt -> decrypt`); stopping after one call returns ciphertext bytes. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **A** | `[L5 Evaluate \| 1.3]` | `-A` aliases `--allow-all`, turning off every Deno filesystem, network, env, and subprocess boundary in production. |
| **Q42** | **C** | `[L5 Evaluate \| 1.3]` | Scoping exact bind host:port (`127.0.0.1:8080`), read root (`./dist`), and env key (`PORT`) satisfies Least Privilege without excess write/run scopes. |
| **Q43** | **C** | `[L5 Evaluate \| 1.4]` | Even with `--permission`, wildcard `--allow-fs-write=*` permits writing anywhere on the host filesystem, violating Least Privilege for a read-only API. |
| **Q44** | **B** | `[L5 Evaluate \| 1.4 / 11.6]` | Running untrusted plugins compiled to `.wasm` with empty host imports `{}` inside a `--permission` Node host isolates both syscalls and heap memory. |
| **Q45** | **B** | `[L5 Evaluate \| 1.4]` | Passing `{}` as `importsObj` ensures the untrusted module holds zero references to host network, FS, or secret-reading functions. |
| **Q46** | **B** | `[L5 Evaluate \| 11.6]` | Simple JSON routing, DOM work, and I/O-bound database calls gain little from WASM and pay unnecessary JS-to-WASM marshaling friction. |
| **Q47** | **B** | `[L5 Evaluate \| 11.6 / 11.8]` | Sustained tight numerical loops over large flat buffers benefit most from WASM's typed instructions and zero garbage-collection pauses. |
| **Q48** | **A** | `[L5 Evaluate \| 1.4]` | Capability flags guard the host JS ecosystem against npm supply-chain abuse while WASM linear-memory isolation sandboxes third-party plugin code. |
| **Q49** | **B** | `[L5 Evaluate \| 1.3]` | Matching only `parsed.hostname` would allow requests to unauthorized ports (e.g., port `80` or `9000`) on `api.school.edu` when only `:8443` was approved. |
| **Q50** | **A** | `[L5 Evaluate \| 4.7]` | Checking `offset >= 0 && offset + payload.byteLength <= 131072` guarantees the write never overruns the 2-page (`2 * 65536`) linear memory buffer. |
