# Big-O Complexity & Advanced Algorithms Reference (`Std 6.4–6.7`)

This companion guide expands **Lesson 9.2** from fundamental searching/sorting into static loop-depth complexity estimation, weighted graph shortest paths, lossless compression, numerical root convergence, and NP-hard combinatorial optimization.

---

## 1. Big-O Growth Tiers Compared

| Complexity | Name | Scaling at $n = 1{,}000$ | Representative Algorithms |
|---|---|---|---|
| $O(1)$ | Constant | `1` op | Array index lookup, `Map.get()`, fixed arithmetic |
| $O(\log n)$ | Logarithmic | `~10` ops | Binary Search, balanced BST lookup |
| $O(n)$ | Linear | `1,000` ops | Linear Search, single loop scan, array `.reduce()` |
| $O(n \log n)$ | Linearithmic | `~10,000` ops | Merge Sort, V8 TimSort, Huffman tree build ($O(n + k \log k)$) |
| $O(n^2)$ | Quadratic | `1,000,000` ops | Nested `for` loops, Bubble/Insertion worst case, Nearest-Neighbor TSP |
| $O(V^3)$ | Cubic | `10^9` ops | **Floyd-Warshall** all-pairs shortest path |
| $O(2^n)$ / $O(n^2 2^n)$ | Exponential | Infeasible past $n \approx 25$ | Unmemoized tree recursion, exact **Held-Karp TSP** |

---

## 2. Static Complexity Estimator (`analyzeTimeComplexity`)

By inspecting a function's source tokens statically (stripping strings/comments, measuring nested `for`/`while`/`do` brace depth, and detecting direct recursive self-calls), we can classify textbook code into:
- **Constant ($O(1)$):** `0` loops, `0` recursive calls.
- **Linear ($O(n)$):** Max loop nesting depth `1` (sequential loops still add to $O(n)$!).
- **Quadratic ($O(n^2)$):** Max loop nesting depth `2`.
- **Polynomial ($O(n^k)$):** Max loop nesting depth $k \ge 3$.
- **Exponential ($O(2^n)$):** Direct branching recursive calls without memoization/halving.

---

## 3. Graph Shortest Paths: Dijkstra vs. Floyd-Warshall

| Algorithm | Problem Solved | Edge Weight Rule | Time Complexity |
|---|---|---|---|
| **Dijkstra's Algorithm** | Single-source shortest paths to all nodes | **Non-negative weights only** ($w \ge 0$) | $O((V + E) \log V)$ (or $O(V^2 + E)$ array scan) |
| **Floyd-Warshall** | **All-pairs** shortest paths ($u \to v$ for all $u,v$) | Supports negative weights (no negative cycles) | $O(V^3)$ |

---

## 4. Huffman Coding Compression

**Huffman Coding** builds an optimal **prefix-free binary tree** from character frequencies:
1. Count symbol frequencies in input text.
2. Repeatedly merge the two lowest-frequency tree nodes until one root remains.
3. Assign `0` to left edges and `1` to right edges—frequent characters (`'e'`, `' '`) get short bitcodes (`2–3 bits`) while rare symbols get longer codes, guaranteeing zero ambiguity during decoding.

---

## 5. Numerical Convergence: Newton-Raphson Square Root

To approximate $\sqrt{S}$ ($S \ge 0$) without `Math.sqrt()`, iterate tangent approximations:

$$x_{k+1} = \frac{1}{2}\left(x_k + \frac{S}{x_k}\right)$$

Newton-Raphson achieves **quadratic convergence**—doubling accurate decimal digits each step!

---

## 6. Travelling Salesman Problem (TSP): Exact DP vs. Greedy Heuristic

Finding the shortest closed tour visiting every city once is **NP-hard**:
- **Exact Held-Karp DP (`solveTspExactDp`):** Bitmask memoization finds the guaranteed optimal tour in $O(n^2 2^n)$—fast for $n \le 15$, intractable at $n = 50$.
- **Nearest-Neighbor Greedy (`solveTspNearestNeighbor`):** Always steps to the closest unvisited city in $O(n^2)$—scales to thousands of stops, trading a small optimality gap for real-time speed.

---

## Companion Runnable Suite
Execute all six implementations and automated proofs in Node.js:
```bash
node --test 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/advancedAlgosAndBigODemo.test.js
```
