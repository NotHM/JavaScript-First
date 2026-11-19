# Unit 4 Setup & Standards Guide: Strict Mode, ESLint Rules, TDZ & Immutability Debugging

**Unit:** 04 — Variables, Scope, Hoisting, Operators & Immutability  
**Navigation:** [Chapter 4 Reading](./readme.md) · [Unit 4 Guide](./unit-guide.md) · [50-Question Exam](./quizzes/unit-test-50.md)

Follow these standards before editing [`../0-student_files/05-variables-scope/immutability.js`](../0-student_files/05-variables-scope/immutability.js) and building [`../0-student_files/projects/unit-04-immutable-state-store/`](../0-student_files/projects/unit-04-immutable-state-store/).

---

## 1. Runtime & Linter Configuration Baseline

| Tool / Flag | Standard Setting | Why It Matters in Unit 4 |
|---|---|---|
| **Node.js 24 LTS** | `node -v` (`>= v22.12`) | Built-in `structuredClone()` supporting circular references, `Map`, `Set`, `BigInt` |
| **Strict Execution** | `'use strict';` (CJS) or ESM `.mjs`/`"type": "module"` | Turns silent `Object.freeze()` violations and accidental globals (`x = 1`) into immediate `TypeError`/`ReferenceError` |
| **Node CLI Strict Flag** | `node --use-strict` | Enforces strict checks cleanly inside quick one-liners and CommonJS REPL probes |
| **ESLint Rules** | `no-var`, `prefer-const`, `eqeqeq`, `no-use-before-define` | Catches `var` leaks, loose `==` coercion, unnecessary `let`, and TDZ reads before code even runs |

---

## 2. Workstation Setup & ESLint Rule Standard

### A. Enforce `'use strict'` Everywhere in CommonJS & REPL
In ES Modules (`.mjs` or `"type": "module"`), strict mode is **always active automatically**. In CommonJS `.js` files (`0-student_files/05-variables-scope/immutability.js`) and REPL probes:
1. Place `'use strict';` as the very first statement of every `.js` file.
2. Launch strict interactive REPL sessions whenever testing `Object.freeze()` or undeclared assignments:
   ```bash
   node --use-strict
   ```
   Test inside REPL:
   ```js
   const locked = Object.freeze({ env: 'prod' });
   locked.env = 'dev'; // Immediately throws TypeError instead of silently failing!
   ```

### B. Recommended ESLint Flat Config (`eslint.config.mjs`)
Professional JavaScript teams automate Unit 4 scope and equality rules inside ESLint:
```js
export default [
  {
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'no-shadow': 'warn',
    },
  },
];
```
- **`no-var`:** Rejects legacy function-scoped `var` loops/blocks outright.
- **`prefer-const`:** Enforces `const` whenever a variable binding isn't reassigned.
- **`eqeqeq`:** Bans accidental `"5" == 5` / `0 == ""` coercion bugs (`===` / `!==` only).
- **`no-use-before-define`:** Flags TDZ hazards for `let`/`const` during editing instead of crashing at runtime.

### C. Debugging TDZ `ReferenceError`, Constant Reassignment & `DataCloneError`
- **TDZ (`ReferenceError: Cannot access 'x' before initialization`):** Inspect the stack frame line number, locate where `let x` or `const x` is declared lower in the `{ ... }` block, and move reads below initialization.
- **`TypeError: Assignment to constant variable`:** Reassigning a `const` variable (`count = count + 1` or `state = nextState`) fails because Stack rebinding is locked—switch to `let` only when rebinding is intended, or return a new cloned snapshot from a pure helper (`{ ...state, count: state.count + 1 }`).
- **`DOMException [DataCloneError]`:** Never pass functions, DOM elements, or Symbols into `structuredClone()`; keep store state strictly plain serializable data (`objects`, `arrays`, `primitives`, `Date`, `Map`, `Set`).

### D. One-Liner REPL Checks for TDZ, `Object.freeze()` & Aliasing
Run targeted assertions straight from Node CLI before editing project code:
```bash
# Confirm strict freeze throws TypeError instead of failing silently
node --use-strict -e "const c=Object.freeze({a:1}); try{c.a=2}catch(e){console.log(e.name)}"
# Confirm structuredClone throws DataCloneError on functions
node -e "try{structuredClone({fn:()=>{}})}catch(e){console.log(e.name)}"
```

---

## 3. Setup Verification Commands

Run these checks from the repository root (`/home/antigravity/NotHM/JavaScript-First`):

```bash
node -v                                                  # Confirm Node 24 LTS (structuredClone built in)
node --use-strict 04-Variables-Scope-Immutability/code/hoisting.js
node --use-strict 04-Variables-Scope-Immutability/code/immutability.js
node --use-strict -e "const a={x:[1]}; const b=structuredClone(a); b.x.push(2); console.log(a.x, b.x);"
node --check 0-student_files/05-variables-scope/immutability.js
node --check 0-student_files/projects/unit-04-immutable-state-store/index.js
```

---

## 4. Red → Green `node --test` TDD Workflow for Unit 4

Verify your `immutability.js` TODO helpers and Immutable Time-Travel Game State Store using Node's test runner:

```bash
# 1. Inspect Unit 4 baseline status (RED before finishing TODOs)
npm run grade -- --unit 04

# 2. Run each Unit 4 TDD suite directly
node --test 0-student_files/05-variables-scope/immutability.test.js
node --test 0-student_files/projects/unit-04-immutable-state-store/index.test.js

# 3. Verify 100% GREEN strictly before final submission
node tools/grade.mjs --unit 04 --strict
```

---

## 5. Common Setup Error Triage Table

| Symptom | Root Cause | Exact Command / Fix |
|---|---|---|
| Mutating `Object.freeze(cfg)` succeeds silently without throwing | Script ran in non-strict CommonJS mode without `'use strict';` | Add `'use strict';` at line 1 or test with `node --use-strict` |
| `ReferenceError: Cannot access 'x' before initialization` | Code reads `let`/`const` inside its Temporal Dead Zone before declaration | Move initialization above first read; enable ESLint `no-use-before-define` |
| `TypeError: Assignment to constant variable` | Attempted to reassign a `const` variable | Use `let` for counters/rebindings, or mutate via pure cloned updates |
| `copy = { ...orig }` mutates `orig.inventory` silently | Shallow spread copied nested array reference instead of deep cloning | Use `structuredClone(orig)` to isolate nested arrays/objects |
| `DataCloneError: function could not be cloned` | Passed an object containing methods/functions to `structuredClone()` | Separate pure state fields from methods before calling `structuredClone()` |
| `ReferenceError: undeclared is not defined` inside strict mode | Missing `const`/`let` keyword on first variable assignment | Declare explicitly with `const` or `let` so no accidental global is attempted |
