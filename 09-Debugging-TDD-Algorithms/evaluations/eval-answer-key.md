# Unit 9 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. **C** (`Syntax error`) | 2. Write failing test (Red) → minimal code to pass (Green) → improve design keeping green (Refactor) | 3. **B** ($O(\log n)$) | 4. Input array must already be sorted | 5. 1. Merge Sort $O(n \log n)$, 2. Bubble Sort $O(n^2)$ | 6. Empty `[]`, negative / `NaN`, single element | 7. Logic | 8. Breakpoints pause execution mid-flight to inspect live call stacks, closures & watch variables cleanly without spamming stdout.

## Post-Unit Key (12 pts)
1. Runtime, Syntax, Logic, Semantic (or Type/Logic).
2. Unit tests verify an isolated helper in memory; Integration tests verify two+ real modules/APIs/DBs working together end to end.
3. Binary: ~`10` ($\log_2 1024 = 10$) | Linear: `1024`.
4. `count === 0` (divide-by-zero throw/error), `total === 0`, negative counts/overflows.
5. For `[7]` (`left=0, right=0`), strict `left < right` skips `0 < 0` completely returning `-1` falsely; `<=` inspects the remaining element cleanly!
6. `TypeError` calling `.trim()` on `undefined` inside function `sanitize` at `auth.js` line `14`, column `22`.
7. **2 pts:** **Merge Sort** ($O(n \log n)$) guarantees scalable performance for 200,000 random records; **Insertion Sort** runs near $O(n)$ on nearly sorted small trays (`50` items); **Bubble Sort** is slowest ($O(n^2)$ swaps) and avoided in production.
8. **2 pts:** Eliminates OS/Node-version drift, catches forgotten untracked files or broken edge tests across the whole suite deterministically.
9. **2 pts:** Clones `[...arr]`, shifts elements `> key` right cleanly, inserts `key` at sorted index, returns new sorted array.
