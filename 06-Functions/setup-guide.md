# Unit 6 Setup & Diagnostics Guide: Conditionals, Closures & Rules Engines

**Applies to:** `06-Functions/` (`AZ CTE Stds 5.0, 11.10–11.12`)  
**Chapter Guide:** [`readme.md`](./readme.md) | **Unit Plan:** [`unit-guide.md`](./unit-guide.md) | **50-Q Exam:** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

---

## 1. Environment & Module Setup

Unit 6 labs run natively in **Node.js 24 LTS** (minimum v20 LTS) using CommonJS (`.js`) modules and Node's zero-dependency `node:test`, `node:assert/strict`, and `node:crypto` modules.

```bash
# 1. Confirm Node 24 LTS is active via NVM
node -v        # Expected: v24.x.x (or >= 20.x)
nvm use --lts

# 2. Syntax-check every Unit 6 student starter & project file
node --check 0-student_files/07-functions/*.js
node --check 0-student_files/projects/unit-06-rules-engine/*.js

# 3. Verify reference instructor demos execute cleanly
node 06-Functions/01-Conditionals-and-Boolean-Logic/code/booleanLogicDemo.js
node 06-Functions/02-Functions-and-Closures/code/functionsDemo.js
```

### Quick Environment Check

Ensure `package.json` resolves cleanly from the repository root (`/home/antigravity/NotHM/JavaScript-First`) so `npm run grade -- --unit 06` works without `Missing script: "grade"` errors.

| Workspace File | Purpose | Direct Test Command |
|---|---|---|
| `0-student_files/07-functions/booleanLogicLab.js` | `nor`, `xor`, `getLetterGrade`, `handleCommand` (`Std 5.1–5.4`) | `node --test 0-student_files/07-functions/functionsAndLogic.test.js` |
| `0-student_files/07-functions/functions.js` | `square`, `createCounter`, `applyOperation`, `multiply` (`Std 5.5`) | `node --test 0-student_files/07-functions/functionsAndLogic.test.js` |
| `0-student_files/projects/unit-06-rules-engine/index.js` | `evaluateBadgeAccess` & `createSeededRng` (`Std 11.10–11.12`) | `node --test 0-student_files/projects/unit-06-rules-engine/index.test.js` |

---

## 2. Debugging Closures, Dispatch Logic & Stack Safety Flags

When debugging lexical closure environments, curried factories, or unexpected fall-through inside `switch` statements, combine Node's inspector and strict flags:

```bash
# Launch DevTools / VS Code debugger on line 1 to inspect Closure Scopes live
node --inspect-brk 0-student_files/07-functions/functions.js

# Cap recursion stack frames if testing nested callback/currying chains
node --stack-size=128 0-student_files/07-functions/functions.js

# Enforce timeout & strict unhandled-rejection failure during automated test runs
node --unhandled-rejections=strict --test --test-timeout=3000 0-student_files/07-functions/functionsAndLogic.test.js
```

> **DevTools Pro Tip:** In Chrome DevTools (`chrome://inspect`) or VS Code's **Variables → Closure** panel, step into the inner function returned by `createCounter()` or `createSeededRng(seed)` to watch private `count` and `state` variables persist across separate invocations without appearing on `globalThis`.

---

## 3. Recommended ESLint Complexity, Logic & Function Rules

Unit 6 targets cyclomatic complexity, guard-clause flatness (`Std 11.10`), and pure closure discipline. Add these ESLint rules to catch classic conditional and function bugs before runtime:

```json
{
  "rules": {
    "complexity": ["warn", 8],
    "max-depth": ["warn", 2],
    "default-case": "error",
    "no-fallthrough": "error",
    "eqeqeq": ["error", "always"],
    "no-cond-assign": ["error", "always"],
    "no-var": "error",
    "no-param-reassign": "error",
    "no-loop-func": "error",
    "consistent-return": "error"
  }
}
```

- **`complexity` & `max-depth`:** Enforce refactoring nested `if/else` "Arrow Code" pyramids into flat guard clauses (`Std 11.10`).
- **`no-cond-assign` & `eqeqeq`:** Catch `if (user = null)` assignment bugs and loose `==` coercion bugs immediately.
- **`no-fallthrough` & `default-case`:** Catch forgotten `break;` and missing `default:` branches in `switch` dispatchers.
- **`no-var` & `no-loop-func`:** Prevent classic shared-loop-variable closure leaks.

---

## 4. `node --test` Watch Mode & Unit 6 Automated Grading

Run Unit 6 tests continuously while completing TODOs across `booleanLogicLab.js`, `functions.js`, and `unit-06-rules-engine/index.js`:

```bash
# Watch mode for rapid RED -> GREEN cycles on Lesson 6.1–6.2
node --test --watch 0-student_files/07-functions/functionsAndLogic.test.js

# Isolate a single failing assertion by test pattern
node --test --test-name-pattern="createSeededRng" 0-student_files/projects/unit-06-rules-engine/index.test.js

# Run full Unit 06 grade check across labs + capstone project
npm run grade -- --unit 06
```

---

## 5. Unit 6 Setup & Logic Error Triage Table

| Error Message / Symptom | Root Cause | Exact Fix / Command |
|---|---|---|
| `ReferenceError: Cannot access 'fn' before initialization` | Called a `const fn = () => ...` arrow expression before its declaration line (TDZ) | Move invocation below definition or use a hoisted `function fn() {}` declaration |
| Arrow helper `() => { ok: true }` returns `undefined` | Curly braces `{}` parsed as a function block instead of an object literal | Wrap returned object in parentheses: `() => ({ ok: true })` |
| `switch` returns or executes the wrong tier/command | Missing `break` (or `return`) caused unintended case fall-through | Add `break;` or `return` in every `case`, or switch to a `Map` dispatch table |
| Closure test fails because two counters share one total | State variable declared outside factory (global/module scope) instead of inside `createCounter()` | Move `let count = start;` inside the outer factory body so each call allocates private state |
| Seeded PRNG fails reproducibility assertions | Used `Math.random()` instead of modulo/bit-shifted `state` inside `createSeededRng` | Update `state = (1664525 * state + 1013904223) >>> 0; return state / 2 ** 32;` |
| `0` or `""` input gets overwritten by fallback | Used `val \|\| defaultVal` logical OR instead of nullish check | Switch to `val ?? defaultVal` so only `null` and `undefined` trigger fallback |
| `Assignment to constant variable` inside closure counter | Declared inner state `const current = start;` instead of `let current = start;` | Use `let` for mutable private closure state returned via getter/mutator methods |
