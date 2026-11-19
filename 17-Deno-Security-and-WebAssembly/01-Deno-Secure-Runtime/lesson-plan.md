# Lesson Plan 17.1: Deno Security Sandbox & Capability Runtimes (`Std 1.3, 1.4, 11.7, 13.1`)

**Unit:** Unit 17 | **Duration:** 2 Class Periods (100 min total)  
**AZ CTE Standards:** `1.3, 1.4, 11.7, 13.1` | **Prof. Skills:** `3.0` Thinking & Innovation, `8.0` Legal/Ethical Security

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1:** Run `code/runtimePermissionLab.test.mjs` live during Period 1 so 100% of students observe real `ERR_ACCESS_DENIED` sandbox enforcement under Node 24 `--permission` offline.
- [ ] **Teacher SMART Goal 2:** Coach >= 85% of students to complete `permissionPolicyLab.mjs` (flag auditor + `CapabilitySandboxPolicy`) and pass all self-checks by the end of Period 2.
- [ ] **Student SMART Goal 1 (`[L1–L2]`):** Recall Deno's `--allow-*` / `--deny-*` capability flags, `jsr:` imports, and Web-standard `Deno.serve` APIs with >= 85% accuracy on `post-lesson-eval.md`.
- [ ] **Student SMART Goal 2 (`[L3–L5]`):** Implement least-privilege flag auditing and path deny-override logic without allowing wildcard (`-A` / `*`) bypasses.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | Identify `--allow-net`, `--allow-read`, `--allow-write`, `--allow-env`, `--deny-*`, `jsr:`, and `deno.json`. |
| **L2 Understand** | Contrast ambient authority in classic Node.js vs. capability-based sandboxing in Deno and Node `--permission`. |
| **L3 Apply** | Configure scoped `deno.json` tasks, author Web `Request`/`Response` handlers, and test `node --permission`. |
| **L4 Analyze** | Detect over-privileged wildcard flags and verify `--deny-*` precedence over `--allow-*`. |
| **L5 Evaluate** | Recommend and justify sandboxed runtime deployment configs for untrusted third-party scripts. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Native Deno Reference:** [`code/deno_server.ts`](./code/deno_server.ts), [`code/deno.json`](./code/deno.json)
- **Offline Node Demo & Tests:** [`code/permissionPolicy.mjs`](./code/permissionPolicy.mjs), [`code/runtimePermissionLab.test.mjs`](./code/runtimePermissionLab.test.mjs)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/17-deno-wasm/`](../../0-student_files/17-deno-wasm/)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) -> Slides on ambient authority, Deno flags, `jsr:` imports, native TS, and `Deno.serve` (`slides/slides.md`, 22 min) -> Live walk of `deno_server.ts` + `runtimePermissionLab.test.mjs` + Part A (18 min) -> Debrief (6 min).
- **Day 2 (50 min):** Review `CapabilitySandboxPolicy` (`code/permissionPolicy.mjs`, 10 min) -> Lab in `0-student_files/17-deno-wasm/permissionPolicyLab.mjs` + Parts C–D (32 min) -> `post-lesson-eval.md` (8 min).

---

## Instructor Answer Key

### Pre-Lesson 17.1 Key
1. Nothing—classic Node.js executes with full ambient authority of the OS user running `node`.
2. Block `.env` = `--deny-read`; outbound `api.github.com` = `--allow-net`; `PORT` env = `--allow-env`; `./public` reads = `--allow-read`.
3. JavaScript Registry (`jsr:`), an ESM-first typed registry used by Deno and modern runtimes.
4. `-A` (`--allow-all`) disables every Deno sandbox boundary, granting unrestricted FS, network, env, and subprocess access.

### Student Worksheet Key (`student-lesson.md`)
- **Part A.1:** Ambient authority means every loaded dependency inherits full OS permissions (FS/network/env) of the process user, letting a single compromised npm package exfiltrate secrets.
- **Part A.2:** `Request`, `Response`, `fetch`, `URL`, `TextEncoder`, `crypto.subtle` (any 3).
- **Part A.3:** Deno integrates TypeScript compilation/stripping directly in the runtime; `deno.json` declares `"tasks"`, `"imports"` (e.g., `jsr:`), and formatting/lint rules without `node_modules`.
- **Part C.1:** `--allow-all` overrides the narrower `--allow-read=./public`, giving full FS/net/env/subprocess privileges.
- **Part C.2:** `deno run --allow-net=127.0.0.1:8080 --allow-read=./public --deny-read=./public/.env --allow-env=PORT server.ts`
- **Part D:** Option **(c)** best enforces Least Privilege: `--allow-net=hooks.example.edu` permits only the webhook target while `--deny-read` and `--deny-env` block local file and environment secret access (unlike default Node's full ambient authority or option b's unrestricted outbound network).

### Post-Lesson 17.1 Key
1. `node --permission --allow-fs-read=./public` throws **`ERR_ACCESS_DENIED`** (`FileSystemRead`) on `/etc/passwd`.
2. `--deny-read=./public/.env` overrides the broader `--allow-read=./public` so secrets inside `.env` stay blocked.
3. **Web `Request` and `Response`** objects via `Deno.serve({ port }, (req) => Response.json(...))`.
4. TypeScript runs natively without transpiling; `jsr:` imports resolve ESM modules directly via URL/cache without `node_modules/`.
5. Rejected for `-A` (grants full OS/network/env/run permissions). Fix: `deno run --allow-net=127.0.0.1:8080 --allow-env=PORT --allow-read=./public app.ts`.
