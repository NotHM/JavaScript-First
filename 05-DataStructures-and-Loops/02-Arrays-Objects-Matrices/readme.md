# Lesson 5.2: Arrays, Hash Maps, 2D Matrices, Trees, Graphs & JSON (`Std 6.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall operations on **Arrays**, **Hash Maps** (`Object`/`Map`), **2D Matrices**, **Trees**, **Graphs**, and **JSON** (`6.1`–`6.3`, `6.5`, `6.8`).
- **`[L2 Understand]`** Contrast index-based array lookup vs. keyed $O(1)$ hash-map lookup (`6.2`) and hierarchical trees vs. cyclic graphs (`6.8`).
- **`[L3 Apply]`** Implement `.filter()`, `.map()`, `.reduce()`, `JSON.stringify`/`parse`, 2D matrix traversal (`grid[row][col]`), and BFS/DFS node reachability (`6.1`, `6.5`, `6.8`).
- **`[L4 Analyze]`** Diagnose cyclic-graph infinite loops and `.sort()`/`push()` in-place mutation defects.
- **`[L5 Evaluate]`** Select the optimal structure (Array, `Map`, 2D Grid, Tree, or Graph) based on access patterns and memory.

---

## 1. Arrays vs. Hash Maps (`Std 6.1, 6.2`)
- **Array (`[]`):** Ordered sequence indexed `0..n-1`. Appending/indexing by position is $O(1)$, scanning by value (`.find`) is $O(n)$. Non-mutating transforms (`.filter`, `.map`, `.reduce`) return clean new outputs.
- **Hash Map (`Object {}` or `Map`):** Key-to-value associations enabling near-instant $O(1)$ lookups by string/ID keys.

## 2. User-Defined Records & JSON (`Std 6.3`)
Structured entities created cleanly via factory helpers or classes serialize across APIs using `JSON.stringify(obj)` and restore via `JSON.parse(str)`. (Functions/Symbols drop during JSON serialization!)

## 3. 2D Arrays / Matrices (`Std 6.5`)
A **2D matrix** stores rows and columns cleanly (`matrix[rowIndex][colIndex]`), e.g. seating charts, pixels, game boards, and student gradebooks.

## 4. Trees & Graphs (`Std 6.8`)
- **Tree:** Hierarchical acyclic nodes starting from one **Root** (e.g., HTML **DOM** tree, folder tree).
- **Graph:** Nodes (**vertices**) connected by **edges**—directed or undirected, may contain cycles (e.g., road maps, social connections, course prerequisite networks). Always guard traversals with a `visited = new Set()`!

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demos:** [`code/matricesTreesDemo.js`](./code/matricesTreesDemo.js) & [`../code/dataStructures.js`](../code/dataStructures.js)
- **Student Starters:** [`../../0-student_files/06-data-structures/dataStructures.js`](../../0-student_files/06-data-structures/dataStructures.js) & [`../../0-student_files/06-data-structures/matricesTreesLab.js`](../../0-student_files/06-data-structures/matricesTreesLab.js)
