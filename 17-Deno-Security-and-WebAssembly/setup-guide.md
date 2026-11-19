# Unit 17 Setup Guide: Deno Security Sandbox, Node 24 `--permission` & WebAssembly

**Unit Focus:** Capability Runtimes (`Deno`, `Node --permission`) & WebAssembly (`.wasm` / `WAT` / `wasm-pack`)  
**Zero-Daemon Guarantee:** All automated labs and grading suites execute **100% offline using Node.js 24 LTS**—external `deno` and `wabt`/`rust` installs are recommended for native exploration, never blockers for passing `npm run grade -- --unit 17`.

---

## 1. Baseline Environment Check (Required)

Verify you are running **Node.js v24+** (`v22+` works for `--permission`, `v24 LTS` is the course standard across Units 17–20) inside the repository root:

```bash
node -v
npm -v
git --version
```

Run the Unit 17 instructor reference suites to verify your local machine executes both `--permission` subprocess isolation and `WebAssembly.instantiate()` cleanly:

```bash
node --test 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/runtimePermissionLab.test.mjs
node --test 17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/code/wasmBinaryBuilderDemo.test.mjs
```

Expected result: **8/8 passing tests across both suites**, including live `ERR_ACCESS_DENIED` verification and `WebAssembly.RuntimeError` out-of-bounds traps.

---

## 2. Installing & Verifying Deno + `jsr:` + `deno.json` (Recommended Native Parity)

Install **Deno 2.x** using the official installer for your platform:

- **Linux / macOS:**
  ```bash
  curl -fsSL https://deno.land/install.sh | sh
  ```
- **Windows (PowerShell):**
  ```powershell
  irm https://deno.land/install.ps1 | iex
  ```

Verify Deno is on your `PATH`:

```bash
deno --version
```

Test native TypeScript type-checking and least-privilege execution against Lesson 17.1's reference server (`17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/`):

```bash
deno check 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/deno_server.ts
deno run --allow-net=127.0.0.1:8080 --allow-env=PORT,APP_ENV --allow-read=./17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/deno.json 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/deno_server.ts
```

To verify `deno.json` tasks (`dev`, `start`, `check`) and `jsr:` import mapping (`@std/path: "jsr:@std/path@^1.0.8"`):

```bash
deno task --config 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/deno.json check
```

Verify capability denial works as expected by launching with `--deny-read` and fetching `/api/config-preview` (`403 PermissionDenied`) while `/api/health` (`200 OK`) remains operational.

---

## 3. Verifying Node 24 Built-In `--permission` Parity

Node.js `v24` enables capability sandboxing natively with `--permission`. Test scoped read access vs. automatic `ERR_ACCESS_DENIED` blocks directly in your terminal:

```bash
# 1. Permitted read of package.json only:
node --permission --allow-fs-read=./package.json -e "
  import('node:fs').then(fs => console.log(JSON.parse(fs.readFileSync('./package.json', 'utf8')).name));
"

# 2. Denied read of /etc/hosts (throws ERR_ACCESS_DENIED):
node --permission --allow-fs-read=./package.json -e "
  import('node:fs').then(fs => fs.readFileSync('/etc/hosts', 'utf8'));
"
```

---

## 4. Optional WebAssembly Toolchains (`wat2wasm` / `wasm-tools` / `wasm-pack`)

Unit 17's [`wasmBinaryBuilder.mjs`](./02-WebAssembly-WASM/code/wasmBinaryBuilder.mjs) generates valid `.wasm` bytecode in pure JavaScript so labs never stall on C++/Rust installs. If you want to compile `.wat` S-expressions or Rust modules directly:

- **WABT (`wat2wasm` / `wasm2wat`)** or **Bytecode Alliance `wasm-tools`:**
  ```bash
  # Inspect installed WABT or wasm-tools binaries:
  wat2wasm --version
  wasm-tools --version

  # Compile a .wat text file to .wasm and inspect binary sections:
  wat2wasm add.wat -o add.wasm
  wasm-tools dump add.wasm | head -n 30
  ```
- **Rust (`wasm-pack`) for polyglot libraries:**
  ```bash
  wasm-pack --version
  wasm-pack build --target nodejs --release
  ```

---

## 5. Student TDD Workflow & Automated Grading Command

Check syntax across every Unit 17 starter and test file, then run the unit grader:

```bash
node --check 0-student_files/17-deno-wasm/permissionPolicyLab.mjs
node --check 0-student_files/17-deno-wasm/wasmMemoryLab.mjs
node --check 0-student_files/projects/unit-17-deno-wasm-audit/index.mjs

npm run grade -- --unit 17
```

Run individual RED → GREEN suites directly for line-by-line assertion feedback:

```bash
node --test 0-student_files/17-deno-wasm/permissionPolicyLab.test.mjs
node --test 0-student_files/17-deno-wasm/wasmMemoryLab.test.mjs
node --test 0-student_files/projects/unit-17-deno-wasm-audit/index.test.mjs
```

---

## 6. Common Setup Error Triage Table

| Error Message / Symptom | Likely Cause | Fix |
|---|---|---|
| `deno: command not found` | `~/.deno/bin` not exported to shell `PATH` after install | Run `export PATH="$HOME/.deno/bin:$PATH"` or restart terminal; offline labs still run via Node 24 |
| `error: Requires net access to "127.0.0.1:8080"` | Launched Deno without explicit `--allow-net` scope | Add `--allow-net=127.0.0.1:8080` (avoid `-A`) |
| `Error [ERR_ACCESS_DENIED]: Access to this API has been restricted` | Node `--permission` blocked an unscoped read, write, or `child_process` spawn | Add explicit `--allow-fs-read=<dir>` / `--allow-fs-write=<dir>` or fix path policy |
| `error: Module not found` or bare specifier failure in Deno | Ran script outside directory containing `deno.json` import map | Pass `--config path/to/deno.json` or use explicit `jsr:@std/path` |
| `WebAssembly.CompileError: expected magic word 00 61 73 6d` | Passed WAT source string or invalid bytes to `WebAssembly.instantiate()` | Compile `.wat` via `wat2wasm` first or pass valid `Uint8Array` bytes |
| `WebAssembly.RuntimeError: memory access out of bounds` | Read/write index exceeded `pages * 65536` (`64 KiB` per page) | Clamp offsets within `instance.exports.memory.buffer.byteLength` |
