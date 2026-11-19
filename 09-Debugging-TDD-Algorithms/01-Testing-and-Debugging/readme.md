# Lesson 9.1: Error Categories, Boundary Testing, Debugger & TDD (`Std 12.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall the four program error categories (**Syntax**, **Semantic**, **Logic**, **Runtime**) (`12.4`) and the three Red-Green-Refactor TDD phases (`12.3`).
- **`[L2 Understand]`** Explain why boundary/edge-case test data (`[]`, `0`, `-1`, `NaN`, `null`) catches bugs missed by "happy path" inputs (`12.2`), and distinguish Unit tests from Integration tests (`12.3`).
- **`[L3 Apply]`** Write automated assertions and error-handling tests using Node's native `node:test` and `node:assert/strict` (`12.2`, `12.3`).
- **`[L4 Analyze]`** Hand-trace variable states and use debugger breakpoints (`F9`), Call Stack panels, and stack traces to isolate semantic/logic bugs (`12.5`).
- **`[L5 Evaluate]`** Critique a test suite for coverage blind spots and judge when Continuous Integration (CI) gates catch regressions (`12.3`).

---

## 1. The Four Error Categories (`Std 12.1, 12.4`)

| Category | When Detected | Example | Effect |
|---|---|---|---|
| **Syntax Error** | Parse time (before running) | Missing `)` or `const = 5;` | V8 refuses to start script (`SyntaxError`). |
| **Runtime Error** | During execution | Calling `user.name.trim()` when `user` is `undefined` | Throws `TypeError` / `ReferenceError` and aborts unless caught. |
| **Semantic Error** | Execution uses valid JS grammar, wrong meaning | Using `=` (assignment) instead of `===`, or `"10" + 5 === "105"` | Runs without throwing, corrupts downstream calculations. |
| **Logic Error** | Valid JS syntax & types, flawed algorithm | Off-by-one loop (`i <= arr.length` or `left < right` skipping `[x]`) | Produces subtly wrong output on specific boundaries. |

---

## 2. Boundary Test Data & Equivalence Partitioning (`Std 12.2`)

Never test only the "middle" valid value. Always design tests at **boundaries**:
- **Numeric boundaries:** `0`, `-1`, `Number.MAX_SAFE_INTEGER`, `NaN`, `Infinity`, decimal precision (`0.1 + 0.2`).
- **Collection boundaries:** empty array `[]`, single element `[42]`, duplicate values `[5, 5]`, already sorted / reverse sorted.
- **String & nullish boundaries:** `""`, `"   "`, mixed case, `null`, `undefined`.

---

## 3. Unit vs. Integration Tests & CI (`Std 12.3`)

1. **Unit Tests:** Test a single isolated pure function (milliseconds, no network/DB).
2. **Integration Tests:** Verify multiple modules or an HTTP route + database query working together end-to-end.
3. **Continuous Integration (CI):** Automatically runs `npm test` on every `git push` or Pull Request inside a clean VM—preventing "works on my machine" regressions.
4. **TDD (Red -> Green -> Refactor):**
   - **Red:** Write a failing test specifying the exact contract.
   - **Green:** Write the simplest code that turns the test green.
   - **Refactor:** Clean up naming/structure/complexity while re-running tests to keep them green.

---

## 4. Hand-Tracing & Live Debugger (`Std 12.5`)

- **Hand-Tracing Table:** Track variables column-by-column (`i`, `sum`, `mid`, `left`, `right`) across every iteration before touching the keyboard.
- **VS Code Live Debugger:** Toggle a red **Breakpoint (`F9`)**, launch **Debug JS**, inspect the **Variables** & **Call Stack** panes, and step **Over (`F10`)** / **Into (`F11`)**—faster and cleaner than temporary `console.log()` clutter.

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/debuggingAndTddDemo.test.js`](./code/debuggingAndTddDemo.test.js)
- **Student Starters:** [`../../0-student_files/10-debugging-tdd/debuggingLab.test.js`](../../0-student_files/10-debugging-tdd/debuggingLab.test.js) & [`../../0-student_files/10-debugging-tdd/algorithms.test.js`](../../0-student_files/10-debugging-tdd/algorithms.test.js)
