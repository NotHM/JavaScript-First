# Unit 5 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (10 pts)
1. **B** (`Base case`) | `7.1`
2. **C** (`continue`) | `7.2`
3. **B** (`Hash Map / Map / Object`) | `6.2`
4. **B** (`grid[1][2]`) | `6.5`
5. **B** (`12`) | `7.4`
6. `.filter(x => x > 5).map(x => x * 2)` | `6.1`
7. A **Tree** is hierarchical and acyclic with a single root and parent→child direction; a **Graph** can contain cycles, multiple entry points, and arbitrary weighted edges. | `6.8`
8. A circular reference cannot be serialized into a finite JSON string tree, causing `TypeError: Converting circular structure to JSON`. | `6.1`
9. Exposing raw emails/SSNs/names inside ML feature tables or training logs violates FERPA/GDPR privacy and risks model memorization of sensitive PII. | `AI 4.0`
10. `[0, 0.5, 1]` | `AI 5.0`

## Post-Unit Key (16 pts)
1. `break` exits the entire enclosing loop immediately; `continue` skips the rest of the current pass and jumps to the next iteration update/check.
2. Scanning an Array with `.find()` is $O(n)$ (up to 100k comparisons); hash `Map.get(id)` hashes the key for $O(1)$ average lookup.
3. `(1, 10, 11) -> (1, 20, 32) -> (2, 10 skipped by continue) -> (2, 20, 54)`. **Final `sum = 54`**.
4. `matrix[2][1]`; `3` rows × `2` cols.
5. Missing base case causes infinite recursion → `RangeError: Maximum call stack size exceeded`. Fix: `if (n <= 0) return;` at start of function.
6. Directed Acyclic Graph (DAG) — courses can have branching prerequisites/dependents not representable cleanly by a flat array index.
7. Salted SHA-256 produces deterministic pseudonymous tokens so related records can still join without revealing identity; hard redaction (`[REDACTED]`) irreversibly removes sensitive names/SSNs.
8. `IQR = 40 - 20 = 20`; `Upper Fence = 40 + 1.5 * 20 = 70`.
9. **2 pts:** `.forEach()` & `.map()` invoke a callback per item and cannot use `break` cleanly (`return` only skips that callback step); **`for...of`** supports `break`/`return` early exit cleanly in $O(1)$ steps when target is first.
10. **2 pts:** **Graph (BFS/Dijkstra)** for shortest-hop intersections (nodes + edges); **Hash Map (`Map`)** for instant $O(1)$ word→definition lookup.
11. **2 pts:** Min-Max scales using `(x - min)/(max - min)`, so `900 bpm` squashes all valid `55–95` points into a narrow `[0, 0.047]` band; filter IQR outliers first or apply Z-Score standardization `(x - mean)/stdDev`. One-Hot encoding maps categories to orthogonal `[0, 1]` vectors so models do not invent false numeric ordering.
12. **2 pts:** `function sumMatrixDiagonal(grid) { let total = 0; for (let i = 0; i < grid.length; i++) total += grid[i][i]; return total; }`
