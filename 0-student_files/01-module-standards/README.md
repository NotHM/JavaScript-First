# Lesson 1.4 Student Bug-Hunt Lab: Module Standards (`.mjs`, `.cjs`, `package.json`)

**Goal:** Repair [`brokenModuleLab.mjs`](./brokenModuleLab.mjs) **without** removing `"type": "module"` from [`package.json`](./package.json) and **without** converting [`helper.cjs`](./helper.cjs) into an ES Module.

## Step-by-Step Workflow
1. From this directory (or repo root), run:
   ```bash
   node 0-student_files/01-module-standards/brokenModuleLab.mjs
   ```
2. Read the exact Node.js error code and stack trace on each run.
3. Diagnose and fix each bug in order:
   - **Symptom A:** `Error [ERR_MODULE_NOT_FOUND]` on `./helper`
   - **Symptom B:** `SyntaxError: Named export 'formatModuleBadge' not found` (default vs. named CommonJS interop)
   - **Symptom C:** `ReferenceError: require is not defined in ES module scope`
   - **Symptom D:** `ReferenceError: __dirname is not defined in ES module scope`
4. Confirm `node 0-student_files/01-module-standards/brokenModuleLab.mjs` prints the report line, legacy helper tag, and resolved `package.json` path with exit code `0`.

## Bonus Challenge (`[L5 Evaluate]`)
Create a temporary HTML file and `<script type="module">` snippet in your notes explaining why loading ES Modules in a browser requires an HTTP dev server (`http://localhost`) rather than double-clicking `file:///.../index.html`.
