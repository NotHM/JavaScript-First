# Lesson Plan 6.2: Functions, Closures, Currying & Seeded RNG (`Std 5.5, 11.11–11.12`)

**Unit:** Unit 6 | **Duration:** 2 Class Periods × 50 min | **Stds:** `5.5`, `11.10`–`11.12`

## Bloom's Objective Ladder
- **L1–L2:** Identify function syntaxes, closures, pure functions, currying, and PRNG seeding concepts.
- **L3 Apply:** Build `createCounter`, curried helpers, and seeded PRNG sequence checks.
- **L4 Analyze:** Diagnose shared-mutation side effects and predictable PRNG vulnerabilities.
- **L5 Evaluate:** Choose `crypto` CSPRNG vs. seeded LCG PRNG vs. `Math.random()`.

## Materials & Keys
- **Demo:** [`code/functionsDemo.js`](./code/functionsDemo.js) & [`../code/functions.js`](../code/functions.js)
- **Pre 6.2 Key:** 1) Currying; 2) True; 3) `20`; 4) False (`Math.random()` is predictable, never cryptographic).
- **Post 6.2 Key:** 1) `const cube = (n) => n ** 3;`; 2) Lexical closure retains outer variable reference in memory; 3) `16`; 4) Fixed seed reproduces identical random rolls/inputs every CI test run; 5) Always use `node:crypto` for API keys, session IDs, OTPs, and security tokens.
