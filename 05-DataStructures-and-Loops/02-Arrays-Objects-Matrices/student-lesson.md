# Student Lesson 5.2: Data Structures, 2D Matrices, Trees & JSON (`Std 6.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../../0-student_files/06-data-structures/dataStructures.js`](../../0-student_files/06-data-structures/dataStructures.js) & [`matricesTreesLab.js`](../../0-student_files/06-data-structures/matricesTreesLab.js)

## Part A: Structure Taxonomy (`[L1 Remember]` & `[L2 Understand]`)
1. Distinguish between an **Array**, a **Map / Hash Map**, a **Tree**, and a **Graph** (`6.1, 6.2, 6.8`):  
   > *(Your comparison table or sentences)*
2. Which array methods do NOT mutate the original array (circle/list 3): `.push`, `.filter`, `.sort`, `.map`, `.slice`, `.reduce` → `____________________`

## Part B: Applied Data Labs (`[L3 Apply]`)
1. Complete `dataStructures.js` and run: `node 0-student_files/06-data-structures/dataStructures.js`
2. Complete `matricesTreesLab.js` and run: `node 0-student_files/06-data-structures/matricesTreesLab.js`

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
