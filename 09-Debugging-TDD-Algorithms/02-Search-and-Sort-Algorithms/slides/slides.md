---
title: "Lesson 9.2 — Search & Sort Algorithms and Big-O Efficiency (Std 6.4–6.7)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 9.2: Search & Sort Algorithms
**AZ CTE Standards `6.4`, `6.6`, `6.7`, `11.14`**

---

### `[L1 Remember -> L2 Understand]` Linear vs. Binary Search (`Std 6.7`)

- **Linear Search ($O(n)$):** Checks element by element; works on ANY array.
- **Binary Search ($O(\log n)$):** Halves search window each step; **requires a sorted array!**
- **1,048,576 items:** Linear = `1,048,576` checks vs. Binary = **~`20` checks**!

---

### `[L1 Remember -> L3 Apply]` Sorting Complexity (`Std 6.6`)

| Algorithm | Best | Worst | Space |
|---|---|---|---|
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(1)$ |
| **Insertion Sort** | **$O(n)$** | $O(n^2)$ | $O(1)$ |
| **Merge Sort** | $O(n \log n)$ | **$O(n \log n)$** | $O(n)$ |

---

### `[L4 Analyze]` Spot the Midpoint Bug!

```javascript
while (left < right) { // <-- BUG on single-element slice [42]!
  const mid = Math.floor((left + right) / 2);
  ...
}
```

Use **`while (left <= right)`** so `left === right === 0` is inspected!

---

### `[L5 Evaluate]` Choosing the Right Algorithm

- Small or **nearly sorted** array (`n <= 40`) → **Insertion Sort**
- Large **unsorted** dataset (`n = 100,000`) → **Merge Sort** (or V8 TimSort `.sort()`)
- Frequent point lookups on sorted IDs → **Binary Search**

---

### `[L4 Analyze -> L5 Evaluate]` Graph, Compression & Big-O Toolkit

| Algorithm | Problem Domain | Big-O |
|---|---|---|
| **Dijkstra** | Single-source shortest weighted path | $O((V + E)\log V)$ |
| **Floyd-Warshall** | All-pairs shortest path matrix | $O(V^3)$ |
| **Huffman Coding** | Prefix-free lossless text compression | $O(n + k \log k)$ |
| **Newton-Raphson** | Fast iterative square-root convergence | Quadratic |
| **TSP (DP vs Greedy)** | Shortest closed city tour | $O(n^2 2^n)$ vs $O(n^2)$ |

> **Labs:** Complete `0-student_files/10-debugging-tdd/sortSearchLab.test.js` and run `node --test 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/advancedAlgosAndBigODemo.test.js`!
