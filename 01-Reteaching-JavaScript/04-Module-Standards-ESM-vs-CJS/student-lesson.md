# Student Lesson 1.4: Module Standards (`.mjs`, `.cjs`, `package.json`) & Import Diagnostics

**AZ CTE Standards:** `11.2, 11.7, 13.1, 18.2` | **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/01-module-standards/`](../../0-student_files/01-module-standards/)

> **Instructions:** Complete Parts A through D without consulting instructor answer keys.

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Correctly classify `.mjs`, `.cjs`, and `package.json` `"type"` rules and contrast ESM live bindings vs. CommonJS copies by the end of Part A.
- [ ] **Goal 2 (`[L3–L4]`):** Diagnose and repair all 4 intentional module errors in [`0-student_files/01-module-standards/brokenModuleLab.mjs`](../../0-student_files/01-module-standards/brokenModuleLab.mjs) so the script runs cleanly in Node.js during this class lab.
- [ ] **Goal 3 (`[L3–L5]`):** Replace CJS-only globals (`__dirname`, `require`) with `import.meta.url` + `createRequire()` and justify module format choices for browser vs. Node projects.

---

## Part A: Module Foundations (`[L1 Remember]` & `[L2 Understand]`)

1. Complete the comparison matrix (`11.7, 13.1`):
   - **ESM** uses `________` / `________`, forced extension `________`, and `package.json` `"type": "________"`.
   - **CommonJS** uses `________` / `________`, forced extension `________`, and `package.json` `"type": "________"`.
2. Explain one key difference between **ESM static live bindings** and **CommonJS dynamic `require()` exports**:  
   > *(Your answer)*
3. Inspect the 2020 draft screenshot [`imgs/modules.png`](./imgs/modules.png). What module syntax error appears under the `// ES Modules` comment?  
   > *(Your diagnosis)*

---

## Part B: Applied Bug-Hunt Coding Lab (`[L3 Apply]` & `[L4 Analyze]`)

1. Open the starter folder [`0-student_files/01-module-standards/`](../../0-student_files/01-module-standards/) and read its `README.md`.
2. Run the broken lab first to observe each real Node.js module error:
   ```bash
   node 0-student_files/01-module-standards/brokenModuleLab.mjs
   ```
3. Fix each module bug one by one (do **not** convert the project back to CommonJS; keep `"type": "module"`!):
   - Missing relative file extension (`ERR_MODULE_NOT_FOUND`)
   - Default vs. named export mismatch (`SyntaxError: does not provide an export named...`)
   - Using `require()` directly inside an ESM module (`ReferenceError: require is not defined`)
   - Using `__dirname` directly inside an ESM module (`ReferenceError: __dirname is not defined`)
4. Re-run `node 0-student_files/01-module-standards/brokenModuleLab.mjs` until all verification lines print cleanly with exit code `0`.

---

## Part C: Error Code Triage (`[L4 Analyze]`)

Match each Node.js error to its exact root cause and fix (`18.2`):
1. `SyntaxError: Cannot use import statement outside a module`  
   > *(Root cause & fix)*
2. `TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".data"`  
   > *(Root cause & fix)*
3. `Error [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await`  
   > *(Root cause & fix)*

---

## Part D: Architecture & Browser Evaluation (`[L5 Evaluate]` & `[L6 Create]`)

A teammate links `<script src="./app.mjs"></script>` (forgetting `type="module"`) on a static HTML page opened via `file:///Users/dev/index.html`, and puts `const fs = require('node:fs');` at line 1 of `app.mjs`. Identify **3 reasons** this fails in the browser and write a corrected HTML `<script>` tag plus browser-safe module plan:  
> *(Your architecture recommendation)*
