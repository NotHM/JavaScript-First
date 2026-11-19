# Lesson Plan 6.1: Relational Operators, Boolean Logic & Conditionals (`Std 5.1–5.4`)

**Unit:** Unit 6 | **Duration:** 2 Class Periods × 50 min | **Stds:** `5.1`–`5.4`, `11.10`

## Bloom's Objective Ladder
- **L1–L2:** State truth tables for `AND`, `OR`, `NOT`, `NOR`, `XOR`, De Morgan's Laws, and conditional flowcharts.
- **L3 Apply:** Build truth-table functions, `switch` dispatchers, and range guards.
- **L4 Analyze:** Diagnose assignment (`=`) vs strict equality (`===`), truthy OR (`|| "editor"`), and switch fall-through bugs.
- **L5 Evaluate:** Refactor nested `if/else` code into flat Guard Clauses.

## Materials & Keys
- **Demo:** [`code/booleanLogicDemo.js`](./code/booleanLogicDemo.js)
- **Pre 6.1 Key:** 1) `NOR`; 2) Falls through into `case 2:`; 3) `true`; 4) `0 < x` gives boolean `true`/`false`, then coerces to `1`/`0 < 10` which is always `true`.
- **Post 6.1 Key:** 1) `Boolean(a) !== Boolean(b)`; 2) `!hasKey || !isAdmin`; 3) `true`; 4) Non-empty string `"editor"` is always truthy regardless of `role`; 5) Guard clauses surface preconditions at top, minimize indentation, and avoid forgotten nested `else` tails.
