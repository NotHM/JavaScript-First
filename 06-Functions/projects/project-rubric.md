# Unit 6 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Boolean Logic & Guard Clauses (`5.1–5.4, 11.10`)** | L4 Analyze / L5 Evaluate | Clean guard clauses with zero deep pyramid nesting; accurate `XOR` / `NOR` and `break`-safe `switch`. | Minor nested `if` or missing edge case. | Deep nested pyramid or missing `break`. |
| **Pure Currying & Closures (`5.5`)** | L3 Apply / L6 Create | Closure keeps state private; curried pricing returns integers cleanly without external mutations. | Mutates outer variable instead of closure/pure args. | Relies on global state. |
| **Seeded PRNG Reproducibility (`11.12`)** | L3 Apply | Deterministic generator returns identical float `[0, 1)` series for matching seed, proving reproducibility. | Generator ignores seed or leaks seed globally. | Missing deterministic RNG. |
| **Test Verification (`12.2`)** | L5 Evaluate | Clean assertions verifying boundary cases (`XOR` symmetry, negative cents guard, matching seed output). | Partial test coverage. | Unverified assertions. |
