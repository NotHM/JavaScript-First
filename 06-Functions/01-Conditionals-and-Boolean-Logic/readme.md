# Lesson 6.1: Relational Operators, Boolean Logic & Conditionals (`Std 5.1–5.4`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall relational operators (`===`, `!==`, `<`, `<=`, `>`, `>=`) and Boolean gates (`AND`, `OR`, `NOT`, `NOR`, `XOR`) (`5.1`, `5.2`).
- **`[L2 Understand]`** Explain De Morgan's Laws (`!(A && B) === !A || !B`), short-circuit evaluation, and decision flowcharts (`5.2`, `5.3`).
- **`[L3 Apply]`** Build truth-table evaluators, `switch` statements with explicit `break`, and nested validation rules (`5.4`).
- **`[L4 Analyze]`** Diagnose fall-through defects, chained comparison bugs (`1 < x < 5`), and De Morgan negation errors.
- **`[L5 Evaluate]`** Refactor deep nested conditionals ("Arrow Code") into clean early-return Guard Clauses (`11.10`).

---

## 1. Boolean Algebra & Complete Truth Tables (`Std 5.2`)

| `A` | `B` | `AND (A && B)` | `OR (A \|\| B)` | `NOR (!(A \|\| B))` | `XOR (A !== B)` |
|---|---|---|---|---|---|
| `false` | `false` | `false` | `false` | **`true`** | `false` |
| `false` | `true` | `false` | `true` | `false` | **`true`** |
| `true` | `false` | `false` | `true` | `false` | **`true`** |
| `true` | `true` | **`true`** | `true` | `false` | `false` |

- **Short-Circuit Evaluation:** `a && fn()` skips calling `fn()` if `a` is falsy; `a || fallback` returns `a` immediately if `a` is truthy.

## 2. Diagramming & Refactoring Conditionals (`Std 5.3, 5.4, 11.10`)

```text
  [input user] -> <user valid?> --NO--> [return Error]
                        | YES
                        v
               <hasRole('admin')?> --YES--> [return Admin View]
                        | NO
                        v
               [return Standard View]
```

Prefer **Guard Clauses** over deep `if { if { if { ... } } }` pyramids, and always include `break;` + `default:` inside `switch` blocks.

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/booleanLogicDemo.js`](./code/booleanLogicDemo.js)
- **Student Starter:** [`../../0-student_files/07-functions/booleanLogicLab.js`](../../0-student_files/07-functions/booleanLogicLab.js)
