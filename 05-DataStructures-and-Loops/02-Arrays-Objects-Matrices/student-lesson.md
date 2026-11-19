# Student Lesson 5.2: Data Structures, 2D Matrices, Trees & JSON (`Std 6.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/06-data-structures/dataStructures.js`](../../0-student_files/06-data-structures/dataStructures.js), [`matricesTreesLab.js`](../../0-student_files/06-data-structures/matricesTreesLab.js) & [`classicStructuresLab.js`](../../0-student_files/06-data-structures/classicStructuresLab.js)

## Part A: Structure Taxonomy (`[L1 Remember]` & `[L2 Understand]`)
1. Distinguish between an **Array**, a **Map / Hash Map**, a **Tree**, and a **Graph** (`6.1, 6.2, 6.8`):  
   > *(Your comparison table or sentences)*
2. Which array methods do NOT mutate the original array (circle/list 3): `.push`, `.filter`, `.sort`, `.map`, `.slice`, `.reduce` → `____________________`

## Part B: Applied Data Labs (`[L3 Apply]`)
1. Complete `dataStructures.js` and run: `node 0-student_files/06-data-structures/dataStructures.js`
2. Complete `matricesTreesLab.js` and run: `node 0-student_files/06-data-structures/matricesTreesLab.js`
3. Implement `LinkedList`, `Stack`, `Queue`, `HashTable`, and `BitSet` in `classicStructuresLab.js` and run: `node 0-student_files/06-data-structures/classicStructuresLab.js`

## Part C: Graph Cycle & JSON Serialization Analysis (`[L4 Analyze]`)
Explain BOTH failures below:
1. `bfs(cyclicGraph, 'A')` runs forever without crashing until memory runs out (why? `6.8`):  
   > *(Your analysis)*
2. `JSON.parse(JSON.stringify({ fn: () => 5, date: new Date() }))` loses the function `.fn` (why? `6.3`):  
   > *(Your analysis)*

## Part D: Architecture Decision (`[L5 Evaluate]` & `[L6 Create]`)
Choose between **Array**, **`Map`**, **2D Matrix**, or **Graph** for each system below and defend your choice:
1. Pixel brightness values on a $1920 \times 1080$ display: `__________` (Reason: `____________________`)
2. Flight legs connecting airports with round-trip layovers: `__________` (Reason: `____________________`)
3. Instant SKU price lookup at a grocery checkout scanner: `__________` (Reason: `____________________`)

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and verifying your own work (**zero solution spoilers — prove your labs in Node.js**):

- [ ] **SL-L5.2-1 (`[L1–L2 Remember/Understand]` | Std `6.1, 6.2, 6.8` | `SG-U05-1`):** Contrast Arrays, Maps, Trees, and Graphs and identify non-mutating array methods in Part A with >= 80% accuracy by Day 22.
- [ ] **SL-L5.2-2 (`[L3 Apply]` | Std `6.1–6.5` | `SG-U05-2`):** Complete and pass all checks in `dataStructures.js` and `matricesTreesLab.js` in Node.js by the end of Day 22.
- [ ] **SL-L5.2-3 (`[L4 Analyze]` | Std `6.3, 6.8` | `SG-U05-3`):** Diagnose both Part C failure scenarios (cyclic graph traversal and JSON serialization limits) before Kahoot Quiz 2 on Day 23.
- [ ] **SL-L5.2-4 (`[L5–L6 Evaluate/Create]` | Std `6.2, 6.5, 6.8` | `SG-U05-4`, `SG-U05-5`):** Justify each Part D structure choice with Big-O reasoning and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 23.
