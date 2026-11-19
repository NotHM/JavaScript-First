# Unit 17 Mastery Exam — Teacher Answer Key & Certification Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Certification Alignment Summary:** **`40 / 50` (`80.0% >= 75%`)** aligned across `CompTIA-Sec+` (11), `CIW-JS` (7), `RHCSA` (7), `ITS-JS` (6), `CompTIA-A+` (5), `CompTIA-ITF+` (4), plus 10 `Domain: CTE-Lab` specialist items across Bloom's `L1–L5` (`10` per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **C** | `[L1 Remember \| Std 1.3 \| Cert: CompTIA-Sec+]` | Least-privilege runtimes fail closed so scripts only touch explicitly authorized resources. |
| **Q2** | **B** | `[L1 Remember \| Std 1.3 \| Cert: CompTIA-Sec+]` | Ambient authority lets any imported dependency inherit full OS credentials unless sandboxed. |
| **Q3** | **A** | `[L1 Remember \| Std 1.4 \| Cert: RHCSA]` | Node --permission restricts FS reads/writes and subprocess execution unless explicitly flagged. |
| **Q4** | **D** | `[L1 Remember \| Std 1.3 \| Cert: RHCSA]` | POSIX ownership and least-privilege permissions confine processes even before runtime flags run. |
| **Q5** | **C** | `[L1 Remember \| Std 4.1 \| Cert: CompTIA-ITF+]` | Magic numbers identify file formats; WASM opens with \0asm in bytes 0..3. |
| **Q6** | **B** | `[L1 Remember \| Std 4.7 \| Cert: CompTIA-A+]` | The WebAssembly specification standardizes linear memory allocation in 64 KiB page chunks. |
| **Q7** | **A** | `[L1 Remember \| Std 11.6 \| Cert: CIW-JS]` | Uint8Array provides byte-indexed access over contiguous ArrayBuffer backing stores. |
| **Q8** | **D** | `[L1 Remember \| Std 11.6 \| Cert: ITS-JS]` | WebAssembly.instantiate(bytes, imports) returns a Promise with { module, instance }. |
| **Q9** | **C** | `[L1 Remember \| Std 13.1 \| Domain: CTE-Lab]` | Deno resolves modern JSR registry packages using jsr: URLs without node_modules. |
| **Q10** | **B** | `[L1 Remember \| Std 11.7 \| Domain: CTE-Lab]` | deno.json replaces scattered config files with unified task and import map definitions. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **A** | `[L2 Understand \| Std 1.3 \| Cert: CompTIA-Sec+]` | Without capability flags, any dependency inside node_modules can read process.env and disk files. |
| **Q12** | **D** | `[L2 Understand \| Std 1.4 \| Cert: CompTIA-Sec+]` | WASM cannot dereference arbitrary JS host pointers; loads/stores remain confined to linear memory. |
| **Q13** | **C** | `[L2 Understand \| Std 1.4 \| Cert: RHCSA]` | Blocking subprocess syscalls stops escaping into native OS utilities like sh, curl, or python. |
| **Q14** | **B** | `[L2 Understand \| Std 4.1 \| Cert: CompTIA-ITF+]` | LEB128 encodes small indices/lengths in single bytes while scaling smoothly for huge integers. |
| **Q15** | **A** | `[L2 Understand \| Std 4.1 \| Cert: CompTIA-A+]` | Little-Endian places the least-significant byte (0x01) at the lowest memory address. |
| **Q16** | **D** | `[L2 Understand \| Std 11.7 \| Cert: CIW-JS]` | Web-standard Request/Response fetch interfaces keep HTTP handlers portable across runtimes. |
| **Q17** | **C** | `[L2 Understand \| Std 11.6 \| Cert: ITS-JS]` | Uint8Array/Int32Array views read/write shared linear ArrayBuffer memory directly with zero copy. |
| **Q18** | **B** | `[L2 Understand \| Std 11.6 \| Cert: CompTIA-ITF+]` | WAT is the readable assembly notation assembled into compact binary .wasm instructions. |
| **Q19** | **A** | `[L2 Understand \| Std 13.1 \| Domain: CTE-Lab]` | Import maps keep code imports clean while pinning global cached JSR/HTTP dependencies. |
| **Q20** | **D** | `[L2 Understand \| Std 11.7 \| Domain: CTE-Lab]` | Deno handles TypeScript natively out of the box alongside built-in deno check. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **C** | `[L3 Apply \| Std 1.3 \| Cert: CompTIA-Sec+]` | Scoping exact host:port, read root, and one env key grants strictly what the service needs. |
| **Q22** | **B** | `[L3 Apply \| Std 1.3 \| Cert: RHCSA]` | Passing --permission with --allow-fs-read grants scoped reads while denying fs writes by default. |
| **Q23** | **A** | `[L3 Apply \| Std 11.6 \| Cert: CIW-JS]` | WebAssembly.validate() checks magic header and section layout without instantiating. |
| **Q24** | **D** | `[L3 Apply \| Std 11.6 \| Cert: ITS-JS]` | Passing {} to WebAssembly.instantiate strips all external host APIs from the instance. |
| **Q25** | **C** | `[L3 Apply \| Std 4.7 \| Cert: CIW-JS]` | TextEncoder produces a Uint8Array that .set(encoded, offset) copies cleanly into linear memory. |
| **Q26** | **B** | `[L3 Apply \| Std 4.7 \| Cert: ITS-JS]` | Bitwise XOR is symmetric ((b ^ k) ^ k === b), recovering exact original bytes on second pass. |
| **Q27** | **A** | `[L3 Apply \| Std 1.3 \| Cert: CIW-JS]` | URL.host preserves explicit port distinctions so evil hosts or wrong ports cannot bypass checks. |
| **Q28** | **D** | `[L3 Apply \| Std 11.6 \| Cert: CompTIA-ITF+]` | Standard WebAssembly module sections occupy deterministic IDs: 1=Type, 3=Func, 5=Mem, 7=Export, 10=Code. |
| **Q29** | **C** | `[L3 Apply \| Std 11.7 \| Domain: CTE-Lab]` | deno check validates TypeScript annotations statically prior to runtime execution. |
| **Q30** | **B** | `[L3 Apply \| Std 11.8 \| Domain: CTE-Lab]` | wasm-pack compiles Rust wasm32 targets and generates typed JS bindings automatically. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **A** | `[L4 Analyze \| Std 1.4 \| Cert: CompTIA-Sec+]` | Node Permission Model intercepts out-of-scope filesystem calls with ERR_ACCESS_DENIED. |
| **Q32** | **D** | `[L4 Analyze \| Std 1.4 \| Cert: RHCSA]` | FS flags alone never grant subprocess creation; child_process remains blocked without explicit allow. |
| **Q33** | **C** | `[L4 Analyze \| Std 1.3 \| Cert: CompTIA-Sec+]` | Deny rules only protect nested secrets when evaluated before parent directory allow rules. |
| **Q34** | **B** | `[L4 Analyze \| Std 1.4 \| Cert: RHCSA]` | path.resolve() collapses .. traversal segments before checking prefix containment against root. |
| **Q35** | **A** | `[L4 Analyze \| Std 1.4 \| Cert: CompTIA-Sec+]` | Omitting --permission leaves Node completely unsandboxed even if scoped allow flags appear. |
| **Q36** | **D** | `[L4 Analyze \| Std 4.1 \| Cert: CompTIA-A+]` | Leading HTML/text bytes trigger WebAssembly.CompileError immediately at header magic validation. |
| **Q37** | **C** | `[L4 Analyze \| Std 4.7 \| Cert: CIW-JS]` | Spanning 65530..65545 crosses 65,536, tripping WASM runtime memory bounds protection cleanly. |
| **Q38** | **B** | `[L4 Analyze \| Std 1.3 \| Cert: ITS-JS]` | Comparing url.host (hostname:port) or explicit port prevents accessing unapproved ports on same host. |
| **Q39** | **A** | `[L4 Analyze \| Std 1.3 \| Domain: CTE-Lab]` | Deno throws NotCapable / PermissionDenied when targeting an unauthorized domain or port. |
| **Q40** | **D** | `[L4 Analyze \| Std 4.7 \| Domain: CTE-Lab]` | XOR transforms encrypt on pass 1 and invert back to original UTF-8 text on pass 2. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **C** | `[L5 Evaluate \| Std 1.3 \| Cert: CompTIA-Sec+]` | -A aliases --allow-all, violating least privilege and exposing the full host if exploited. |
| **Q42** | **B** | `[L5 Evaluate \| Std 1.4 \| Cert: CompTIA-Sec+]` | Static read-only services must never hold unrestricted host filesystem write access. |
| **Q43** | **A** | `[L5 Evaluate \| Std 1.4 \| Cert: CompTIA-Sec+]` | WASM confines plugin execution to linear memory while --permission restricts host npm modules. |
| **Q44** | **D** | `[L5 Evaluate \| Std 1.4 \| Cert: RHCSA]` | Layered OS user permissions and runtime capability scopes stop privilege escalation. |
| **Q45** | **C** | `[L5 Evaluate \| Std 11.6 \| Cert: CompTIA-A+]` | CPU-bound numeric loops over flat TypedArrays avoid GC stalls and FFI overhead amortization. |
| **Q46** | **B** | `[L5 Evaluate \| Std 11.6 \| Cert: CompTIA-A+]` | Crossing JS/WASM boundaries per short string request adds encoding cost exceeding JS V8 speed. |
| **Q47** | **A** | `[L5 Evaluate \| Std 4.7 \| Cert: CIW-JS]` | Explicit non-negative bounds checking against total byteLength catches overruns cleanly. |
| **Q48** | **D** | `[L5 Evaluate \| Std 11.6 \| Cert: ITS-JS]` | Empty imports ensure zero ambient access to host networking, disk, or credentials. |
| **Q49** | **C** | `[L5 Evaluate \| Std 1.3 \| Domain: CTE-Lab]` | Explicitly scoping net, read, and env keys matches Deno least-privilege best practices. |
| **Q50** | **B** | `[L5 Evaluate \| Std 11.8 \| Domain: CTE-Lab]` | WABT utilities wat2wasm and wasm2wat translate cleanly between WAT text and binary WASM. |
