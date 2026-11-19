# Unit 4 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Scope & No `var` Leaks (`3.3`)** | L3 Apply | Uses `const`/`let` cleanly, private closure history inaccessible externally. | Minor global state exposure. | Relies on `var` globals. |
| **Deep Immutability (`3.6`)** | L4 Analyze | `structuredClone` + `deepFreeze` prevents nested mutation; asserts prove prior snapshots stay intact. | Shallow spread leaks nested mutations. | Mutates active snapshot in place. |
| **Undo / Time-Travel State (`L6`)** | L6 Create | `dispatch`, `getState`, and `undo` cleanly restore previous frozen snapshots. | `undo` crashes on initial state. | Missing working history stack. |
| **Engineering Tradeoff Note (`L5`)** | L5 Evaluate | Concisely explains shallow spread vs deep clone performance costs. | General note without $O(n)$ tradeoff. | Missing evaluation comment. |
