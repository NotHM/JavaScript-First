# Unit 5 Setup & Diagnostics Guide: Loops, Structures & AI Data Pipelines

**Applies to:** `05-DataStructures-and-Loops/` (`Stds 6.0, 7.0 + AI101/AI201`)  
**Chapter Guide:** [`readme.md`](./readme.md) | **Unit Plan:** [`unit-guide.md`](./unit-guide.md) | **50-Q Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

---

## 1. Environment & Module Prerequisites

Unit 5 mixes **CommonJS (`.js`)** labs for core loops/data structures and **ECMAScript Modules (`.mjs`)** for the Lesson 5.3 AI data pipeline (`node:crypto`).

```bash
# 1. Confirm Node.js 24 LTS is active via NVM
node -v        # Expected: v24.x.x (or >= 20 LTS)
nvm use --lts  # Switch if an older version is active

# 2. Verify syntax of every Unit 5 student file in one pass
node --check 0-student_files/06-data-structures/*.js
node --check 0-student_files/05-ai-data-pipeline/*.mjs
node --check 0-student_files/projects/unit-05-matrix-gradebook/*.js
```

| Folder | Module Type | Key Libraries | Test Command |
|---|---|---|---|
| `0-student_files/06-data-structures/` | CommonJS (`.js`) | `node:test`, `node:assert/strict` | `node --test 0-student_files/06-data-structures/loopsAndStructures.test.js` |
| `0-student_files/05-ai-data-pipeline/` | ESM (`.mjs`) | `node:crypto`, `node:test` | `node --test 0-student_files/05-ai-data-pipeline/dataPipelineLab.test.mjs` |
| `0-student_files/projects/unit-05-matrix-gradebook/` | CommonJS (`.js`) | `node:test`, `node:assert/strict` | `node --test 0-student_files/projects/unit-05-matrix-gradebook/index.test.js` |

---

## 2. Recursion Stack Traces & Loop Safety Flags

Infinite recursion and cyclic graphs are the #1 crash source in Unit 5. Use Node's built-in flags to shorten runaway stack traces and kill infinite loops cleanly before they hang your terminal:

```bash
# Limit call-stack size during recursion testing so runaway bugs fail immediately
node --stack-size=128 0-student_files/06-data-structures/loopsLab.js

# Print more stack frames when diagnosing deep tree/graph recursion (default is 10)
node --stack-trace-limit=25 0-student_files/projects/unit-05-matrix-gradebook/index.js

# Enforce a strict 3-second timeout guard on node:test suites (catches infinite while loops!)
node --test --test-timeout=3000 0-student_files/06-data-structures/loopsAndStructures.test.js
```

> **Loop Guard Tip:** When debugging `while` loops or BFS/DFS graph traversals, add an explicit iteration cap or `AbortSignal.timeout(2000)` guard during development so an unguarded cycle fails loudly instead of locking your editor.

---

## 3. Debugging & Telemetry Flags (`--inspect`, `--unhandled-rejections`)

Step through nested `(row, col)` matrix variables and inspect `Map` / `HashTable` buckets live in VS Code or Chrome DevTools:

```bash
# Pause on line 1 and attach Chrome DevTools (chrome://inspect) or VS Code JS Debug
node --inspect-brk 0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs

# Surface full stack traces and crash loudly on uncaught errors or promise rejections
node --trace-uncaught --unhandled-rejections=strict 0-student_files/05-ai-data-pipeline/dataPipelineLab.mjs
```

---

## 4. Recommended ESLint Rules for Loops, Complexity & Purity

To prevent off-by-one defects, accidental parameter mutation, and unreadable nested pyramids, configure these ESLint rules in your project workflow:

```json
{
  "rules": {
    "complexity": ["warn", 10],
    "max-depth": ["warn", 3],
    "no-param-reassign": ["error", { "props": true }],
    "guard-for-in": "error",
    "no-unreachable-loop": "error",
    "array-callback-return": "error",
    "eqeqeq": ["error", "always"]
  }
}
```

- **`no-param-reassign`:** Catches accidental mutation of caller arrays/records during imputation or normalization.
- **`array-callback-return`:** Catches missing `return` statements inside `.map()`, `.filter()`, and `.reduce()`.
- **`max-depth` & `complexity`:** Flags overly deep nested loops before trace tables become unreadable.

---

## 5. Running `node --test` & Automated Unit Grading

Use Node's native test runner during your **RED → GREEN** TDD workflow:

```bash
# Watch mode: automatically re-run tests whenever you save a lab file
node --test --watch 0-student_files/06-data-structures/loopsAndStructures.test.js

# Filter a single failing test by name while iterating
node --test --test-name-pattern="BitSet" 0-student_files/06-data-structures/loopsAndStructures.test.js

# Emit TAP diagnostics or run the full Unit 05 automated gradebook
node --test --test-reporter=tap 0-student_files/05-ai-data-pipeline/dataPipelineLab.test.mjs
npm run grade -- --unit 05
```

---

## 6. Unit 5 Setup Error Triage Table

| Error Message / Symptom | Cause | Fix / Command |
|---|---|---|
| `SyntaxError: Cannot use import statement outside a module` | Ran ESM `import` inside a `.js` file without `"type": "module"` | Keep Unit 5.1–5.2 `.js` labs in CommonJS (`require`/`module.exports`), and use `.mjs` for `05-ai-data-pipeline/` |
| `ERR_MODULE_NOT_FOUND` importing `dataPipelineLab.mjs` | Missing `.mjs` extension in ESM `import` path | Always specify explicit file extension: `import ... from './dataPipelineLab.mjs'` |
| `RangeError: Maximum call stack size exceeded` | Missing base case in `sumDigits`/`factorial`, or cyclic graph without `visited` Set | Verify base case (`n <= 1`, `n < 10`), add `visited.add(node)`, test with `--stack-size=128` |
| `node --test` hangs and hits `ETIMEDOUT` (`15000ms`) | Infinite `while` loop or unguarded cyclic graph traversal | Run `node --test --test-timeout=2000 <file>` to isolate the loop and verify termination condition |
| `AssertionError: Expected NaN to be 0` in scaling lab | Constant array (`max === min` or `stdDev === 0`) caused `0 / 0` | Return `0` whenever `max - min === 0` or `stdDev === 0` |
| `AssertionError` on caller array equality check | Mutated input array/records via `.sort()` or direct `record[field] = ...` | Copy first using `[...values].sort((a, b) => a - b)` and `{ ...record }` |
