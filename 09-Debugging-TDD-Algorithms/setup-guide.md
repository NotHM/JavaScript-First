# Unit 09 Setup-Standard Guide: Node Inspector, `node:test` & ML Audit CLI

**Unit:** 09 — Testing, Debugging, Algorithms & ML Fairness Audits (`Stds 12.0, 6.4–6.7 | AI 1.0, 2.0, 6.0, 7.0`)  
**Companion Docs:** [`readme.md`](./readme.md) | [`unit-guide.md`](./unit-guide.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)

Use this workstation verification checklist before writing or grading Unit 09 labs so breakpoints, `node:test` suites, and CI checks run cleanly on every machine.

---

## 1. Required Runtime & Editor Prerequisites

1. **Node.js 24 LTS (`>= 22.x`):** Built-in `node:test` runner, `node:assert/strict`, and V8 Inspector Protocol ship natively—zero `npm install` or external test frameworks required.
   ```bash
   node -v
   # Expected: v24.x.x (or Node >= 22 LTS)
   ```
2. **VS Code / Chromium DevTools:** Used for live breakpoint inspection (`F9` toggle, `F10` Step Over, `F11` Step Into) when tracing loop bounds and recursive calls.
3. **Repository Root Working Directory:** Always execute gradebook and verification commands from `/path/to/JavaScript-First`:
   ```bash
   pwd
   ```

---

## 2. Live V8 Debugger (`--inspect` & `--inspect-brk`) Setup Standard

When `console.log` stops explaining why a loop skips `[42]` or why recursion diverges, attach the live V8 inspector instead of editing ten temporary logs:

1. **Launch with Break-on-Start (`--inspect-brk`):** Pauses execution on line 1 so short CLI scripts don't exit before Chrome DevTools attaches:
   ```bash
   node --inspect-brk=127.0.0.1:9229 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/searchAndSortDemo.test.js
   ```
2. **Attach DevTools:** Open Chromium, browse to `chrome://inspect`, click **Open dedicated DevTools for Node**, and step cleanly through Variables & Call Stack frames.
3. **VS Code Auto-Attach (Zero Config) or Explicit Launch Config:** Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) -> **Debug: Toggle Auto Attach** -> select `Always` or `Smart`, set a red breakpoint (`F9`), and run `node <script.js>` inside VS Code's terminal—or add a temporary local launch configuration:
   ```json
   {
     "type": "node",
     "request": "launch",
     "name": "Debug Active Unit 09 File",
     "program": "${file}",
     "skipFiles": ["<node_internals>/**"],
     "stopOnEntry": false
   }
   ```
4. **Scoped Debug Flags Verification (`Std 12.5`):** Run the structured debug demos to confirm `console.table()`, `console.trace()`, and safe null checking:
   ```bash
   node 09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/code/console.js
   node 09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/code/typeChecker.js
   ```

5. **Unit 09 Individual Lab Watch Commands:** Verify CJS and ESM suites independently before running the full Unit 09 gradebook:
   ```bash
   node --test 0-student_files/10-debugging-tdd/algorithms.test.js
   node --test 0-student_files/10-debugging-tdd/debuggingLab.test.js
   node --test 0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.test.mjs
   ```

---

## 3. Native `node:test` Red-Green-Refactor CLI Standards (`Std 12.2–12.3`)

Run Unit 09 instructor proofs and student labs directly with Node's native test runner:

- **Instructor Reference Proofs (Must stay GREEN):**
  ```bash
  node --test 09-Debugging-TDD-Algorithms/code/algorithms.test.js
  node --test 09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/code/debuggingAndTddDemo.test.js
  node --test 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/searchAndSortDemo.test.js
  node --test 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/advancedAlgosAndBigODemo.test.js
  node --test 09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/code/mlAlgorithmsAndFairnessDemo.test.mjs
  ```
- **Live Watch Mode While Fixing One Lab (RED -> GREEN):**
  ```bash
  node --watch --test 0-student_files/10-debugging-tdd/sortSearchLab.test.js
  node --test --test-name-pattern="Disparate" 0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.test.mjs
  ```
- **Syntax Sanity Check (Catches Parse/Syntax Errors before execution):**
  ```bash
  node --check 0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs
  ```

---

## 4. Automated Unit 09 Gradebook Verification

Run the centralized TDD grading harness covering all 4 labs (`algorithms.test.js`, `debuggingLab.test.js`, `sortSearchLab.test.js`, `mlMetricsAndFairnessLab.test.mjs`) and the capstone suite (`unit-09-algo-test-suite/index.test.js`):

```bash
npm run grade -- --unit 09
```

For strict CI verification requiring `100%` passing tests (`exit 0` only when **GREEN**):

```bash
node tools/grade.mjs --unit 09 --strict
```

Expected initial baseline on untouched student starters: **RED (`0/15` tests passing)**—turning **GREEN (`15/15`, `100/100` pts)** as each TODO is implemented without mutating caller arrays or leaking validation/test splits.

---

## 5. Common Setup Error Triage Table

| Symptom / Error Message | Root Cause | Exact Fix |
|---|---|---|
| `Starting inspector on 127.0.0.1:9229 failed: address already in use` | Previous paused `--inspect` Node process still running in background | Close old terminal/process or pass a free port: `node --inspect-brk=127.0.0.1:9230 <file>` |
| Script finishes instantly before `chrome://inspect` shows target | Used `--inspect` instead of `--inspect-brk` on a fast CLI script | Always use `node --inspect-brk <file>` or insert `debugger;` before exit |
| `ReferenceError: require is not defined in ES module scope` | Used CommonJS `require()` inside `.mjs` ML fairness file | Use `import ... from 'node:test'` in `.mjs` files, or `require()` in `.js` files |
| `AssertionError: Expected values to be strictly deep-equal` vs `equal` | Compared two array references (`[1,2] === [1,2]`) with `assert.equal` | Use `assert.deepEqual(actual, expected)` for arrays and plain objects |
| `node --test` times out after `15000ms` in `tools/grade.mjs` | Infinite `while` loop (`left` or `right` not updated inside `binarySearch` / `kMeans`) | Verify `left = mid + 1` / `right = mid - 1` strictly shrink bounds every pass |
| Test passes manually yet fails non-mutation assertion | Sorted input array in-place without cloning first | Copy inputs at function entry (`const copy = [...arr]`) before swapping |
