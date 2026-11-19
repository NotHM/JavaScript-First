---
title: "Lesson 17.1 — Deno Security Sandbox & Capability Runtimes"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 17.1: Deno Security Sandbox
**AZ CTE Standards `1.3, 1.4, 11.7, 13.1`**

*Zero-Trust Capability Flags, Web Standards & Node `--permission` Enforcement*

---

### `[L2 Understand]` Ambient Authority vs. Capability Sandboxing

- **Classic Node.js:** Every `npm` package inherits full user OS permissions (`fs`, network, `process.env`).
- **Deno (2018+):** **Zero access by default!** Scripts must receive explicit `--allow-*` flags.
- **Node 24 `--permission`:** Brings capability scoping (`--allow-fs-read`, `--allow-fs-write`) into Node.js!

> **Predict Before Running:** What happens when `node --permission app.mjs` calls `fs.readFileSync('/etc/hosts')`?

---

### `[L1 Remember -> L3 Apply]` Deno Permission Matrix

```bash
deno run \
  --allow-net=127.0.0.1:8080 \
  --allow-env=PORT,APP_ENV \
  --allow-read=./public \
  --deny-read=./public/.env \
  deno_server.ts
```

- `--deny-*` **always overrides** broader `--allow-*` flags!
- Never ship `-A` (`--allow-all`) or `--allow-fs-read=*` in production.

---

### `[L2 Understand]` Native TypeScript, `jsr:` & `Deno.serve`

```ts
import { basename } from '@std/path'; // mapped to jsr:@std/path in deno.json

Deno.serve({ port: 8080 }, (req: Request): Response => {
  return Response.json({ ok: true, path: new URL(req.url).pathname });
});
```

- Zero `tsc`/Babel boilerplate; Web-standard `Request` / `Response` / `fetch`!

---

### `[L4 Analyze -> L5 Evaluate]` Offline Lab & Subprocess Verification

1. Run instructor sandbox test suite:
   `node --test 17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/code/runtimePermissionLab.test.mjs`
2. Complete `0-student_files/17-deno-wasm/permissionPolicyLab.mjs` & `deno_starter.ts`.
3. Take the **Post-Lesson 17.1 Exit Ticket**!
