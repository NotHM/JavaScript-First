# Unit 9 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (10 pts)
1. **C** (`Syntax error`) | 2. Write failing test (Red) → minimal code to pass (Green) → improve design keeping green (Refactor) | 3. **B** ($O(\log n)$) | 4. Input array must already be sorted | 5. 1. Merge Sort $O(n \log n)$, 2. Bubble Sort $O(n^2)$ | 6. Empty `[]`, negative / `NaN`, single element | 7. Logic | 8. Breakpoints pause execution mid-flight to inspect live call stacks, closures & watch variables cleanly without spamming stdout | 9. Computing scaling parameters across `train + test` leaks test-set distribution information into training (data leakage), artificially inflating offline accuracy | 10. **Fail** (`0.70 < 0.80` violates the 4/5ths Disparate Impact rule).

## Post-Unit Key (16 pts)
1. Runtime, Syntax, Logic, Semantic (or Type/Logic).
2. Unit tests verify an isolated helper in memory; Integration tests verify two+ real modules/APIs/DBs working together end to end.
3. Binary: ~`10` ($\log_2 1024 = 10$) | Linear: `1024`.
4. `count === 0` (divide-by-zero throw/error), `total === 0`, negative counts/overflows.
5. For `[7]` (`left=0, right=0`), strict `left < right` skips `0 < 0` completely returning `-1` falsely; `<=` inspects the remaining element cleanly!
6. `TypeError` calling `.trim()` on `undefined` inside function `sanitize` at `auth.js` line `14`, column `22`.
7. `Precision = 6 / (6 + 4) = 0.60`; `Recall = 6 / (6 + 2) = 0.75`.
8. Run A = `Overfitting` (low train, high validation gap); Run B = `Underfitting` (both high bias).
9. **2 pts:** **Merge Sort** ($O(n \log n)$) guarantees scalable performance for 200,000 random records; **Insertion Sort** runs near $O(n)$ on nearly sorted small trays (`50` items); **Bubble Sort** is slowest ($O(n^2)$ swaps) and avoided in production.
10. **2 pts:** Eliminates OS/Node-version drift, catches forgotten untracked files or broken edge tests across the whole suite deterministically.
11. **2 pts:** Predicting all `0` on `98%` negative data gets `98%` Accuracy yet `0%` Recall / `0` F1 (misses all fraud!). A Disparate Impact Ratio of `0.65 < 0.80` flags adverse impact caused by **proxy variables** (like ZIP code or school district) correlated with protected demographics even after dropping sensitive columns; teams must audit TPR/FPR parity, remove proxies, and rebalance training data.
12. **2 pts:** Clones `[...arr]`, shifts elements `> key` right cleanly, inserts `key` at sorted index, returns new sorted array.
