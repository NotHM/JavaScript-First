# Lesson 5.2: Arrays, Hash Maps, Classic Structures, 2D Matrices, Trees, Graphs & JSON (`Std 6.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall operations on **Arrays**, **Linked Lists**, **Stacks**, **Queues**, **Hash Tables / Maps**, **BitSets**, **2D Matrices**, **Trees**, **Graphs**, and **JSON** (`6.1`–`6.3`, `6.5`, `6.8`).
- **`[L2 Understand]`** Contrast index-based array lookup vs. keyed $O(1)$ hash-map lookup (`6.2`), LIFO Stacks vs. FIFO Queues, and hierarchical trees vs. cyclic graphs (`6.8`).
- **`[L3 Apply]`** Implement `.filter()`, `.map()`, `.reduce()`, `JSON.stringify`/`parse`, `LinkedList`, `Stack`, `Queue`, `HashTable`, `BitSet`, 2D matrix traversal (`grid[row][col]`), and BFS/DFS node reachability (`6.1`, `6.5`, `6.8`).
- **`[L4 Analyze]`** Diagnose hash bucket collisions, queue `shift()` $O(n)$ bottlenecks, cyclic-graph infinite loops, and `.sort()`/`push()` in-place mutation defects.
- **`[L5 Evaluate]`** Select the optimal structure (Array, Linked List, Stack, Queue, Hash Map, BitSet, 2D Grid, Tree, or Graph) based on access/mutation time complexity and memory constraints.

---

## 1. Primitive vs. Non-Primitive Structures & Big-O Overview (`Std 6.1–6.3`)

- **Primitive Types:** `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`.
- **Linear Structures:** **Arrays** (`O(1)` index access, `O(n)` front insert/search), **Linked Lists** (`O(1)` head/tail append, `O(n)` search), **Stacks** (LIFO `push`/`pop` in `O(1)`), **Queues** (FIFO `enqueue`/`dequeue` in `O(1)`).
- **Hash & Set Structures:** **Hash Tables / `Map`** (`O(1)` average key lookup/insert, `O(n)` worst-case collision chain), **`Set` & `BitSet`** (distinct membership; `BitSet` packs 32 boolean flags per `Uint32Array` word for `O(1)` bitwise membership!).
- **Non-Linear Structures:** **Trees** (`O(\log n)` balanced search/insert) and **Graphs** (`O(|V| + |E|)` traversal).

| Structure | Access | Search | Insert / Push | Delete / Pop | Primary Use Case |
|---|---|---|---|---|---|
| **Array** | $O(1)$ | $O(n)$ | $O(1)$ tail / $O(n)$ middle | $O(n)$ | Ordered lists, index lookup, `.map/.filter/.reduce` |
| **Linked List** | $O(n)$ | $O(n)$ | $O(1)$ head/tail | $O(1)$ head/tail | Frequent front/back splices without contiguous resize |
| **Stack (LIFO)** | $O(n)$ | $O(n)$ | $O(1)$ `push` | $O(1)$ `pop` | Call stacks, undo history, balanced parenthesis parser |
| **Queue (FIFO)** | $O(n)$ | $O(n)$ | $O(1)$ `enqueue` | $O(1)$ `dequeue` | Job scheduling, BFS queues, request buffering |
| **Hash Table / `Map`** | $O(1)$ avg | $O(1)$ avg | $O(1)$ avg | $O(1)$ avg | Fast ID/SKU lookup, caching, frequency counting |
| **BitSet** | $O(1)$ | $O(1)$ bit check | $O(1)$ bitwise OR | $O(1)$ bitwise AND-NOT | Compact integer flags, permissions, bloom filters |
| **Tree / BST** | $O(\log n)$ bal. | $O(\log n)$ bal. | $O(\log n)$ bal. | $O(\log n)$ bal. | DOM hierarchy, ASTs, sorted index range queries |
| **Graph** | $O(\|V\|+\|E\|)$ | $O(\|V\|+\|E\|)$ | $O(1)$ | $O(1)$ | Road networks, package dependency graphs, routing |

---

## 2. User-Defined Records & JSON (`Std 6.3`)
Structured entities created cleanly via factory helpers or classes serialize across APIs using `JSON.stringify(obj)` and restore via `JSON.parse(str)`. (Functions/Symbols drop during JSON serialization!)

## 3. 2D Arrays / Matrices (`Std 6.5`)
A **2D matrix** stores rows and columns cleanly (`matrix[rowIndex][colIndex]`), e.g. seating charts, pixels, game boards, and student gradebooks.

## 4. Trees & Graphs (`Std 6.8`)
- **Tree:** Hierarchical acyclic nodes starting from one **Root** (e.g., HTML **DOM** tree, folder tree).
- **Graph:** Nodes (**vertices**) connected by **edges**—directed or undirected, may contain cycles (e.g., road maps, social connections, course prerequisite networks). Always guard traversals with a `visited = new Set()`!

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demos:** [`code/matricesTreesDemo.js`](./code/matricesTreesDemo.js), [`code/classicStructuresDemo.test.js`](./code/classicStructuresDemo.test.js) & [`../code/dataStructures.js`](../code/dataStructures.js)
- **Student Starters:** [`../../0-student_files/06-data-structures/dataStructures.js`](../../0-student_files/06-data-structures/dataStructures.js), [`../../0-student_files/06-data-structures/matricesTreesLab.js`](../../0-student_files/06-data-structures/matricesTreesLab.js) & [`../../0-student_files/06-data-structures/classicStructuresLab.js`](../../0-student_files/06-data-structures/classicStructuresLab.js)
