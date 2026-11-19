# Unit 17 Student Labs: Deno Capability Security & WebAssembly

Complete both offline Node.js (`v24+`) lab files (and optionally run `deno_starter.ts` if `deno` is installed):

1. [`permissionPolicyLab.mjs`](./permissionPolicyLab.mjs) — Implement least-privilege CLI flag auditing (`auditRuntimeFlags`) and path/network/env capability checks (`CapabilitySandboxPolicy`).
2. [`wasmMemoryLab.mjs`](./wasmMemoryLab.mjs) — Inspect the 8-byte `\0asm` header, write UTF-8 data into shared `WebAssembly.Memory`, and test reversible XOR byte transforms.
3. [`deno_starter.ts`](./deno_starter.ts) + [`deno.json`](./deno.json) — Native Deno `Deno.serve` Web Request/Response exercise.

Run labs from repository root:
```bash
node 0-student_files/17-deno-wasm/permissionPolicyLab.mjs
node 0-student_files/17-deno-wasm/wasmMemoryLab.mjs
```
