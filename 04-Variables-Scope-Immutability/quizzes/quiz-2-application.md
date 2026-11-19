# Unit 4 Quiz 2: Tracing Scope, TDZ & Immutability Bugs (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds & Certs:** `3.3, 3.6, 18.2`, `ITS-JS`, `CIW-JS`

| # | Trace / Scenario | Correct Answer | Time | Bloom's & Rationale |
|---|---|---|---|---|
| 1 | `console.log(a); var a = 5;` logs what? | **`undefined`** | 20s | `[L3 \| 3.3 \| Cert: ITS-JS]` `var` declaration hoists initialized to `undefined`. |
| 2 | `console.log(b); let b = 5;` throws what? | **`ReferenceError`** | 20s | `[L3 \| 18.2 \| Cert: ITS-JS]` Access inside TDZ. |
| 3 | `const c = { n: 1 }; c.n = 2; console.log(c.n);` prints: | **`2`** | 20s | `[L3 \| 3.6 \| Cert: ITS-JS]` Top-level object isn't frozen. |
| 4 | `const f = Object.freeze({ nested: { x: 1 } }); f.nested.x = 9;` results in `f.nested.x === ?`: | **`9`** | 30s | `[L4 \| 3.6 \| Cert: CIW-JS]` Shallow `Object.freeze` leaves nested objects mutable. |
| 5 | `const d = structuredClone(f); d.nested.x = 5;` changes `f.nested.x` to: | **Unchanged** | 30s | `[L3 \| 3.6 \| Domain: CTE-Lab]` `structuredClone` creates independent nested copy. |
| 6 | What prints inside `if (true) { var x = 1; } console.log(x);`? | **`1`** | 20s | `[L4 \| 3.3 \| Cert: ITS-JS]` `var` leaks out of `if` block! |
| 7 | What prints if `let` replaces `var` above? | **`ReferenceError`** | 20s | `[L4 \| 18.2 \| Cert: ITS-JS]` `let` stays strictly inside block. |
| 8 | Why does `0 == ""` evaluate `true` in JS? | **Both coerce to `0`** | 30s | `[L4 \| 3.3 \| Cert: ITS-JS]` Numeric coercion trap. |
| 9 | A teammate copies `{ ...cart }` before calling `.items.push('shoes')`, modifying original `cart`. What bug is this? | **Shallow-copy aliasing bug** | 30s | `[L4 \| 3.6 \| Cert: ITS-JS]` Nested `items` shares same array ref. |
| 10 | Why does `if (score === NaN)` fail to detect invalid calculations in JavaScript? | **Use `Number.isNaN(score)`** | 30s | `[L5 \| 3.3, 18.2 \| Cert: ITS-JS]` IEEE-754 defines `NaN === NaN` as always `false`. |
