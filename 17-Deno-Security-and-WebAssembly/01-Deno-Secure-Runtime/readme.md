# Lesson 17.1: Deno Security Sandbox & Capability Runtimes (`Std 1.3, 1.4, 11.7, 13.1`)

## Student Learning Objectives (Bloom's Taxonomy & SMART)
- **`[L1 Remember]`** Recall Deno's permission flags (`--allow-net`, `--allow-read`, `--allow-write`, `--allow-env`, `--deny-*`), URL/`jsr:` imports, and `deno.json` configuration (`1.3, 13.1`).
- **`[L2 Understand]`** Contrast **ambient authority** (default Node.js) vs. **capability-based sandboxing** (Deno & Node `--permission`), and explain Web-standard APIs (`Deno.serve`, `Request`, `Response`, `fetch`) (`1.4, 11.7`).
- **`[L3 Apply]`** Write a TypeScript `Deno.serve` microservice (`deno_server.ts` + `deno.json`) and test real OS path sandboxing with `node --permission --allow-fs-read=...` (`1.3, 11.7`).
- **`[L4 Analyze]`** Audit runtime CLI flag manifests to catch wildcard anti-patterns (`-A`, `--allow-all`, `--allow-fs-read=*`) and debug `ERR_ACCESS_DENIED` failures (`1.4`).
- **`[L5 Evaluate]`** Defend when to deploy Deno vs. Node `--permission` for untrusted plugins and third-party dependencies (`1.3`).

### Lesson 17.1 SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Map all 5 Deno permission flags (`--allow-net`, `--allow-read`, `--allow-write`, `--allow-env`, `--deny-*`) and compare them to Node `--permission` with >= 85% accuracy on Lesson 17.1 exit checks.
- [ ] **Goal 2 (`[L3–L4]`):** Complete `auditRuntimeFlags()` and `CapabilitySandboxPolicy` in `0-student_files/17-deno-wasm/permissionPolicyLab.mjs` so all unit tests pass within one 50-minute lab session.

---

## 1. Why Capability Security Matters (`Std 1.3–1.4`)

In classic Node.js, running `node script.js` grants the script—and **every transitive `npm` dependency** inside `node_modules/`—the exact same filesystem, environment variable (`process.env`), and network permissions as your user account (**ambient authority**). A single compromised package can read `~/.ssh/id_rsa` or exfiltrate `process.env.AWS_SECRET_ACCESS_KEY`.

**Deno** (created by Ryan Dahl in 2018) flips the default to **Zero Trust / Explicit Capability Security**:

| Capability | Deno Flag | Deny Override | Node 24 `--permission` Equivalent |
|---|---|---|---|
| **Filesystem Read** | `--allow-read=./public` | `--deny-read=./public/.env` | `--permission --allow-fs-read=./public` |
| **Filesystem Write** | `--allow-write=./logs` | `--deny-write=/etc` | `--permission --allow-fs-write=./logs` |
| **Network I/O** | `--allow-net=127.0.0.1:8080` | `--deny-net=169.254.169.254` | *(Control via OS/proxy/policy)* |
| **Environment Vars** | `--allow-env=PORT,APP_ENV` | `--deny-env=SECRET_KEY` | *(Audit/strip `env` at spawn)* |
| **Subprocesses** | `--allow-run=git` | `--deny-run` | `--allow-child-process` |

> **Golden Rule:** Never pass `-A` (`--allow-all`) or `--allow-fs-read=*` in production! Always scope permissions to exact folders, hosts, and environment keys, and use `--deny-*` to carve out sensitive subdirectories (`.env`, `/etc`).

---

## 2. Native TypeScript, URL/`jsr:` Imports & Web Standards (`Std 11.7, 13.1`)

Deno prioritizes modern browser/WHATWG standards and zero-config tooling:
1. **Native TypeScript:** `deno run app.ts` executes TypeScript natively without `tsc`/`babel` setup; `deno check app.ts` verifies types.
2. **ESM-First URL & `jsr:` Imports:** Instead of nested `node_modules/` folders, Deno resolves standard ES module URLs and **JSR** (`jsr:@std/path@^1.0.8`), optionally mapped cleanly inside [`code/deno.json`](./code/deno.json).
3. **Web-Standard APIs:** `fetch()`, `URL`, `TextEncoder`, `crypto.subtle`, `Request`, `Response`, and `Deno.serve()` behave identically to modern Edge workers and browsers (`code/deno_server.ts`).
4. **Runtime Introspection:** Scripts can inspect their own granted permissions dynamically via `await Deno.permissions.query({ name: 'read', path: './deno.json' })`.

---

## 3. Verifying Real Sandbox Enforcement Offline in Node 24

Even without installing `deno`, Node.js `v24` includes a built-in `--permission` sandbox! Inspect [`code/permissionPolicy.mjs`](./code/permissionPolicy.mjs) and run the live subprocess test suite:
```bash
node --test 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/runtimePermissionLab.test.mjs
```
Watch Node throw `ERR_ACCESS_DENIED` when a child script tries to read a secret file or spawn a child process without explicit `--allow-fs-read` / `--allow-child-process` flags.

---

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Native Deno Reference:** [`code/deno_server.ts`](./code/deno_server.ts) & [`code/deno.json`](./code/deno.json)
- **Node Offline Engine & Tests:** [`code/permissionPolicy.mjs`](./code/permissionPolicy.mjs) & [`code/runtimePermissionLab.test.mjs`](./code/runtimePermissionLab.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/17-deno-wasm/`](../../0-student_files/17-deno-wasm/)
