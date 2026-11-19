# Lesson Plan 9.1: Error Categories, Boundary Testing, Debugger & TDD (`Std 12.0`)

**Unit:** Unit 9 | **Duration:** 3 Class Periods × 50 min | **Stds:** `12.1`–`12.5`

## Bloom's Objective Ladder
- **L1–L2:** Classify Syntax, Runtime, Semantic, and Logic errors; contrast Unit vs. Integration testing and Red-Green-Refactor phases.
- **L3 Apply:** Write boundary tests (`[]`, `NaN`, out-of-range) with `node:test` and `node:assert/strict`.
- **L4 Analyze:** Trace execution column-by-column in hand-trace tables and VS Code Call Stack panels via `F9` breakpoints.
- **L5 Evaluate:** Justify CI automation and automated test gates to eliminate "works on my machine" regressions.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 9.1 Bell-Ringer (4m), Slides (`slides/slides.md`) & Error Taxonomy + Hand-Trace Table (20m), Live Debugger demo in VS Code (`F9`/`F10`) (15m), Student Part A & C (11m).
- **Day 2–3:** TDD Red-Green-Refactor lab (`0-student_files/10-debugging-tdd/debuggingLab.test.js` + `algorithms.test.js`), CI review, Post-Lesson 9.1 Exit Ticket.
- **Teacher Demo:** [`code/debuggingAndTddDemo.test.js`](./code/debuggingAndTddDemo.test.js) (`node --test`).
- **Pre 9.1 Key:** 1) `SyntaxError`; 2) Write failing test (Red) → minimal passing code (Green) → improve design keeping green (Refactor); 3) `[]`, `[single]`, `NaN`, `-1`; 4) Syntax & types are legal so V8 runs without crashing, producing wrong business output.
- **Post 9.1 Key:** 1) Unit tests isolate one helper; Integration tests verify multiple real modules/services together; 2) Confirms calling `fn([])` throws specifically a `RangeError`; 3) `assert.equal(safeAverage([10, 20]), 15);`; 4) Attempting `.trim()` on `undefined` at `auth.js` line `14`, col `22`; 5) Breakpoints pause non-destructively to inspect entire closures, locals & Call Stack without polluting source files or forgetting `console.log`s in prod.
- **Student Worksheet Part A & C Key:** A: `1=Syntax`, `2=Semantic`, `3=Logic`, `4=Runtime` (`TypeError`); C: Pass 1 `0 -> 10`, Pass 2 `2 -> 12`, Pass 3 `4 -> 16`.
