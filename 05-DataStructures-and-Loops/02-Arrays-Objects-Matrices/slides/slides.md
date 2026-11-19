---
title: "Lesson 5.2 — Arrays, Hash Maps, Classic Structures, Matrices & Trees (Std 6.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 5.2: Core Data Structures in JS
**AZ CTE Standard 6.0 (`6.1`–`6.3`, `6.5`, `6.8`)**

---

### `[L2 Understand]` Arrays vs. Hash Maps (`Std 6.1, 6.2`)

```javascript
// O(n) linear scan on Array vs O(1) keyed lookup on Map
const catalog = [{ sku: "A1", price: 12 }, { sku: "B2", price: 25 }];
const catalogMap = new Map(catalog.map((item) => [item.sku, item]));
console.log(catalogMap.get("B2")); // { sku: "B2", price: 25 }
```

---

### `[L2 Understand -> L3 Apply]` Classic Linear & Bit Structures

| Structure | Order / Storage | Core `O(1)` Operations |
|---|---|---|
| **LinkedList** | Chained `{ value, next }` nodes | `append(val)`, `prepend(val)` |
| **Stack** | LIFO (Last-In, First-Out) | `push(val)`, `pop()`, `peek()` |
| **Queue** | FIFO (First-In, First-Out) | `enqueue(val)`, `dequeue()` via head pointer |
| **HashTable** | Bucketed key hashes | `set(k, v)`, `get(k)` (`O(1)` avg) |
| **BitSet** | `Uint32Array` bit masks | `add(n)`, `has(n)` (`1 << (n % 32)`) |

---

### `[L3 Apply]` Non-Mutating Array Pipelines (`Std 6.1`)

```javascript
const totals = [12, 45, 8, 30]
  .filter((n) => n >= 10)
  .map((n) => n * 1.08)
  .reduce((acc, n) => acc + n, 0);
```

---

### `[L3 Apply]` 2D Matrices (`Std 6.5`)

```javascript
const board = [
  ["X", "O", ""],
  ["", "X", "O"],
  ["", "", "X"]
];
console.log(board[1][2]); // "O" (Row 1, Col 2)
```

---

### `[L4 Analyze]` Trees vs. Graphs (`Std 6.8`)

- **Tree:** Single root, strictly downward `parent -> children`, **no cycles** (DOM tree, AST)
- **Graph:** Vertices + edges, may cycle (Google Maps, social network, package dependency graph)

> Always pass a `visited = new Set()` when traversing a Graph to prevent infinite loops!

---

### `[L5 Evaluate -> L6 Create]` Lab Checkpoint

1. Run `node --test 05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/code/classicStructuresDemo.test.js`.
2. Complete `0-student_files/06-data-structures/dataStructures.js`, `matricesTreesLab.js` & `classicStructuresLab.js`!
