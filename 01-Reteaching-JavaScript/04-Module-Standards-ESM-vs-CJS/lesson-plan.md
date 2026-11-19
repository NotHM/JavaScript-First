# Lesson Plan 1.4: Module Standards (`.mjs`, `.cjs`, `package.json`) & Import Diagnostics (`Std 11.2, 11.7, 13.1, 18.2`)

**Unit:** Unit 1 | **Duration:** 2 Class Periods (100 min total)  
**AZ CTE Standards:** `11.2, 11.7, 13.1, 18.2` | **Prof. Skills:** `3.0` Thinking & Innovation, `4.0` Professionalism

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1:** Guide 100% of students to observe and classify all 6 real ESM/CJS error traces via `code/moduleErrorsDemo.mjs` during Period 1 direct instruction (15 min) with zero confusion between `.mjs`/`.cjs` and `package.json` `"type"`.
- [ ] **Teacher SMART Goal 2:** Coach at least 85% of students to resolve all 4 intentional errors in `0-student_files/01-module-standards/brokenModuleLab.mjs` (measured by exit code `0`) within 30 minutes of Period 2 lab time.
- [ ] **Student SMART Goal 1:** Identify ESM vs. CJS syntax, extensions, and `import.meta.url` path helpers with >= 80% accuracy on `post-lesson-eval.md`.
- [ ] **Student SMART Goal 2:** Bridge `.cjs` and `.mjs` modules safely using `createRequire(import.meta.url)` and dynamic `import()` without runtime crashes.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | Identify `.mjs`, `.cjs`, `"type": "module"`, `import`/`export`, and `require`/`module.exports`. |
| **L2 Understand** | Contrast static ESM live bindings vs. dynamic CJS copies, `import.meta.url` vs. `__dirname`, and browser `<script type="module">` behavior. |
| **L3 Apply** | Fix broken imports, bridge CJS/ESM with `createRequire` & `import()`, and derive `__dirname` via `fileURLToPath(import.meta.url)`. |
| **L4 Analyze** | Diagnose all 6 real Node.js module errors from stack traces and spot the `module.exports` bug in `imgs/modules.png`. |
| **L5 Evaluate** | Justify module architecture decisions across Node.js backends, dual-format libraries, and browser `<script type="module">` apps. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md) | **Diagram:** [`imgs/modules.png`](./imgs/modules.png)
- **Teacher Demo & Tests:** [`code/moduleErrorsDemo.mjs`](./code/moduleErrorsDemo.mjs), [`code/moduleErrorsDemo.test.mjs`](./code/moduleErrorsDemo.test.mjs)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/01-module-standards/`](../../0-student_files/01-module-standards/)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) -> Slides covering ESM vs. CJS, live bindings, `imgs/modules.png` bug hunt, and browser `<script type="module">` (20 min) -> Live run of `code/moduleErrorsDemo.mjs` + Worksheet Part A (20 min) -> Exit check (6 min).
- **Day 2 (50 min):** Walkthrough of `import.meta.url` & `createRequire` bridging (10 min) -> Independent bug-hunt lab in `0-student_files/01-module-standards/brokenModuleLab.mjs` + Parts C–D (32 min) -> `post-lesson-eval.md` (8 min).

---

## Instructor Answer Key (Pre/Post Checks & Worksheet)

### Pre-Lesson 1.4 Key
1. ESM = **`.mjs`** | CommonJS = **`.cjs`**
2. **`"type": "module"`** inside `package.json`.
3. **False** — `__dirname`, `__filename`, and `require` are CommonJS wrapper variables and throw `ReferenceError` in ES Modules.
4. ESM relative imports require **explicit file extensions** (`'./utils.mjs'`); Node does not guess `.mjs`/`.js` extensions in ESM resolution.

### Student Worksheet Key (`student-lesson.md`)
- **Part A.1:** ESM = `import`/`export`, `.mjs`, `"module"`; CommonJS = `require`/`module.exports`, `.cjs`, `"commonjs"`.
- **Part A.2:** ESM creates read-only **live bindings** resolved statically during parse/link (updates inside the exporter appear in importers), whereas CJS `require()` executes dynamically and destructuring copies snapshot values at call time.
- **Part A.3:** Under `// ES Modules`, `imgs/modules.png` erroneously uses CommonJS `module.exports.log = ...` instead of `export async function log(msg) { ... }`.
- **Part B (`brokenModuleLab.mjs`):**
  1. Add `.cjs` extension to `'./helper'` -> `'./helper.cjs'`.
  2. Fix default vs. named import (`import formatModuleBadge from './helper.cjs'` because `helper.cjs` assigns `module.exports = formatModuleBadge`).
  3. Replace bare `require('./helper.cjs')` with `import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);`.
  4. Replace bare `__dirname` with `path.dirname(fileURLToPath(import.meta.url))` (or `import.meta.dirname`).
- **Part C:**
  1. `Cannot use import statement outside a module` -> ESM `import` inside `.cjs` or `.js` with `"type": "commonjs"`. Fix: use `.mjs` or set `"type": "module"`.
  2. `ERR_UNKNOWN_FILE_EXTENSION` -> Importing an unknown file extension like `.data`. Fix: rename to `.mjs`/`.js`, read via `fs`, or use JSON import attributes.
  3. `ERR_REQUIRE_ASYNC_MODULE` -> Calling synchronous `require()` on an ESM file with top-level `await`. Fix: use `await import('./asyncMod.mjs')`.
- **Part D:** (1) Missing `type="module"` causes browser syntax error on `import`/`export`; (2) `file://` fails browser **CORS** policy for ES modules (must serve over `http://localhost`); (3) `require('node:fs')` is Node-only and undefined in browsers. Corrected tag: `<script type="module" src="./app.mjs"></script>` served over HTTP without Node builtins.

### Post-Lesson 1.4 Key
1. **`"type": "module"`** in `package.json` makes `.js` files run as ES Modules; **`.cjs`** overrides it for individual CommonJS files.
2. **`import.meta.url`** + `fileURLToPath(import.meta.url)` + `path.dirname(...)` (or `import.meta.dirname` in Node 20.11+/24).
3. **ESM** uses read-only **live bindings** (`count` updates from `0` to `1`), whereas CJS destructuring `const { count } = require(...)` copies a static primitive snapshot (`0`).
4. `import defaultFormatter, { formatScore } from './score.mjs';` (or import only what is actually exported with matching default/named syntax) + include `.mjs` extension.
5. In CJS calling ESM (especially async top-level `await` ESM): **`await import('./mod.mjs')`**. In ESM calling legacy CJS: **`import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);`** (or default `import pkg from './legacy.cjs'`).
