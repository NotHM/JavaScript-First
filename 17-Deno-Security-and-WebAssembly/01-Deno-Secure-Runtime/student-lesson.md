# Student Lesson 17.1: Deno Security Sandbox & Capability Runtimes

**AZ CTE Standards:** `1.3, 1.4, 11.7, 13.1` | **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/17-deno-wasm/`](../../0-student_files/17-deno-wasm/)

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Contrast ambient authority vs. capability sandboxing and map Deno `--allow-*` / `--deny-*` flags to Node `--permission` equivalents in Part A.
- [ ] **Goal 2 (`[L3–L4]`):** Implement `auditRuntimeFlags()` and `CapabilitySandboxPolicy` inside `0-student_files/17-deno-wasm/permissionPolicyLab.mjs` and test real `node --permission` denials in Part B–C.
- [ ] **Goal 3 (`[L5]`):** Author a least-privilege `deno.json` task command and security policy justification in Part D.

---

## Part A: Capability Concepts (`[L1 Remember]` & `[L2 Understand]`)

1. Explain the security vulnerability known as **ambient authority** when installing unvetted third-party packages in standard Node.js (`1.3`):  
   > *(Your answer)*
2. List three **Web-standard APIs** shared directly between modern browsers and Deno's `Deno.serve` handler (`11.7`):  
   `1. ______________   2. ______________   3. ______________`
3. Why does Deno support `app.ts` directly without a separate build step, and how does `deno.json` replace `package.json` `"scripts"` and dependency mapping (`11.7, 13.1`)?  
   > *(Your answer)*

---

## Part B: Applied Sandbox Lab (`[L3 Apply]`)

1. Open [`0-student_files/17-deno-wasm/permissionPolicyLab.mjs`](../../0-student_files/17-deno-wasm/permissionPolicyLab.mjs) and read [`0-student_files/17-deno-wasm/README.md`](../../0-student_files/17-deno-wasm/README.md).
2. Complete the TODOs for:
   - `auditRuntimeFlags(runtime, flags)` (flag missing `--permission` on Node and wildcard flags like `-A`, `--allow-all`, `--allow-fs-read=*`)
   - `CapabilitySandboxPolicy` (`canRead`, `canFetch`, `canReadEnv` with `denyPaths` taking priority over `readRoots`)
3. Run your lab and inspect live Node 24 `--permission` denials:
   ```bash
   node 0-student_files/17-deno-wasm/permissionPolicyLab.mjs
   ```
4. Inspect [`0-student_files/17-deno-wasm/deno_starter.ts`](../../0-student_files/17-deno-wasm/deno_starter.ts) and complete its Web `Request`/`Response` health endpoint TODOs.

---

## Part C: Security Diagnosis (`[L4 Analyze]`)

Inspect this production launch command for a public static-asset server:
```bash
deno run --allow-all --allow-read=./public server.ts
```
1. Why is combining `--allow-all` with `--allow-read=./public` deceptive and insecure?  
   > *(Your analysis)*
2. What exact flags should replace `--allow-all` if `server.ts` ONLY binds `127.0.0.1:8080`, reads `./public`, blocks `./public/.env`, and reads `PORT`?  
   > *(Your corrected command)*

---

## Part D: Architecture Defense (`[L5 Evaluate]` & `[L6 Create]`)

Compare running an untrusted third-party webhook script under (a) default `node webhook.js`, (b) `node --permission --allow-fs-read=./data webhook.js`, and (c) `deno run --allow-net=hooks.example.edu --deny-read --deny-env webhook.ts`. Justify which option best satisfies **Least Privilege** (`1.3`) and explain why.  
> *(Your defense)*
