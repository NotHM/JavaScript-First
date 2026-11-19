# Unit 4 Quiz 1: Variables, Scope & Hoisting (Concepts)

**Bloom's:** `[L1]`–`[L2]` | **CSV:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv) | **Stds:** `3.3, 18.2`

| # | Question | Correct Answer | Time | Bloom's & Rationale |
|---|---|---|---|---|
| 1 | Which variable keyword respects function scope ONLY and ignores `{ }` blocks? | **`var`** | 20s | `[L1 \| 3.3]` Classic pre-ES6 scope hazard. |
| 2 | Which two keywords enforce block scope? | **`let` and `const`** | 20s | `[L1 \| 3.3]` Scoped cleanly to `if`, `for`, `{}`. |
| 3 | What happens when reassigning a `const` variable? | **Throws `TypeError`** | 20s | `[L1 \| 18.2]` Cannot rebind constant reference. |
| 4 | Which phase describes reading a `let`/`const` before initialization? | **Temporal Dead Zone (TDZ)** | 20s | `[L1 \| 3.3]` Triggers `ReferenceError`. |
| 5 | What happens if you omit `const` / `let` and write `score = 10` in strict mode? | **Throws `ReferenceError`** | 20s | `[L2 \| 18.2]` Prevents accidental global variable leak. |
| 6 | Why does `"5" == 5` evaluate to `true` while `"5" === 5` is `false`? | **`==` performs type coercion** | 20s | `[L2 \| 3.3]` Strict `===` skips coercion. |
| 7 | What does `Object.freeze(obj)` prevent? | **Modifying top-level properties** | 20s | `[L2 \| 3.6]` Shallow lock only. |
| 8 | What happens to nested objects when spreading `{ ...obj }`? | **Nested references stay shared** | 30s | `[L2 \| 3.6]` Spread performs shallow copy only. |
| 9 | Which global Node.js function performs a true deep clone? | **`structuredClone()`** | 20s | `[L1 \| 3.6]` Built into Node 17+ and modern browsers. |
| 10 | Why is `const` still able to `.push()` into `const list = []`? | **`const` locks binding not content** | 30s | `[L2 \| 3.6]` Array mutates on the Heap via stable reference. |
