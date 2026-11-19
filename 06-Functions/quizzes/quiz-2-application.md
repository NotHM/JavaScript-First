# Unit 6 Quiz 2: Functions, Closures, Currying & Refactoring (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `5.5, 11.10–11.12`

| # | Code / Scenario | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | `const f = x => x * 2; f(6)` returns: | **`12`** | 20s | `[L3 \| 5.5]` |
| 2 | `((n) => n + 1)(9)` (IIFE) evaluates to: | **`10`** | 20s | `[L3 \| 5.5]` |
| 3 | Why does an impure function fail unit tests intermittently? | **Depends on or mutates hidden external state** | 30s | `[L4 \| 5.5]` |
| 4 | A closure retains access to which variables? | **Variables from enclosing lexical scope** | 20s | `[L2 \| 5.5]` |
| 5 | Trace: `const c = makeCount(); c(); console.log(c());` (`start=0`) | **`2`** | 30s | `[L3 \| 5.5]` |
| 6 | What transforms `fn(a, b, c)` into `fn(a)(b)(c)`? | **Currying** | 20s | `[L1 \| 11.11]` |
| 7 | What evaluates from `true ^ false` vs `Boolean(a) !== Boolean(b)`? `1 ^ 1`: | **`0` (bitwise XOR on booleans gives `0` or `1`)** | 30s | `[L4 \| 5.2]` |
| 8 | Why replace raw `Math.random()` inside unit tests with a seeded PRNG? | **Deterministic reproducible sequences** | 30s | `[L5 \| 11.12]` |
| 9 | Which helper violates purity: `addTax(p)` vs `addAndPush(arr, x)`? | **`addAndPush(arr, x)` (mutates caller array)** | 30s | `[L4 \| 5.5]` |
| 10 | You need reusable price calculators configured with `tax = 0.086` and `tax = 0.05`. Best pattern? | **Higher-order factory / Currying** | 30s | `[L5 \| 5.5]` |
