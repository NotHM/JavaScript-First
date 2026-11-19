# Lesson Plan 5.2: Data Structures, 2D Matrices, Trees & JSON (`Std 6.0`)

**Unit:** Unit 5 | **Duration:** 3 Class Periods × 50 min | **AZ CTE Standard:** `6.0` (`6.1`–`6.3`, `6.5`, `6.8`)

## Bloom's Objective Ladder
- **L1–L2:** Distinguish Arrays, Hash Maps, Trees, Graphs, Matrices, and JSON formats.
- **L3 Apply:** Build `Map` lookups, `.filter`/`.map`/`.reduce` pipelines, and 2D matrix reducers.
- **L4 Analyze:** Diagnose infinite loops on cyclic graphs and missing JSON function keys.
- **L5 Evaluate:** Select appropriate structures (Matrix vs. Graph vs. Map) with Big-O tradeoff justifications.

## Materials & Keys
- **Reading & Slides:** [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md)
- **Teacher Code:** [`code/matricesTreesDemo.js`](./code/matricesTreesDemo.js), [`code/classicStructuresDemo.test.js`](./code/classicStructuresDemo.test.js) & [`../code/dataStructures.js`](../code/dataStructures.js)
- **Pre 5.2 Key:** 1) `0`; 2) `grid[2][0]`; 3) `Map.get(userId)` ($O(1)$); 4) Tree.
- **Post 5.2 Key:** 1) `JSON.stringify` & `JSON.parse`; 2) Graphs can contain cycles causing infinite revisits without `visited`, whereas strict Trees have no cycles; 3) `[30, 40]`; 4) `6 + 4 = 10`; 5) Ordered lists/queues needing positional order/sort -> Array; fast ID/dictionary lookups -> `Map`.

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 5.2 & Part A Taxonomy** | `SG-U05-1`, `TG-U05-1` | `L1–L2` (`6.1–6.2, 6.8`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 21; >= 80% accuracy classifying Array, `Map`, Tree, Graph & non-mutating methods by Day 22. |
| **Applied Data Structures Lab (Part B)** | `SG-U05-2`, `TG-U05-2` | `L3` (`6.1–6.5`) | Live checkoffs of [`dataStructures.js`](../../0-student_files/06-data-structures/dataStructures.js) and [`matricesTreesLab.js`](../../0-student_files/06-data-structures/matricesTreesLab.js) with 100% passing Node output by end of Day 22. |
| **Cycle & JSON Forensics + Quiz 2 (Part C)** | `SG-U05-3`, `TG-U05-3` | `L4` (`6.3, 6.8`) | >= 80% accuracy diagnosing cyclic BFS loops and JSON function stripping; run 10-min reteach if Kahoot Quiz 2 drops < 75% on Day 23. |
| **Structure Selection, Exit Ticket & Project (Part D)** | `SG-U05-4`, `SG-U05-5`, `TG-U05-1`, `TG-U05-4`, `TG-U05-5` | `L5–L6` (`6.2, 6.5, 6.8`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 23 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](../projects/project-rubric.md) within 72 hours of Day 24 and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U05-1..5`):** Pre/Post Lesson 5.2 growth ($g \ge 0.55$) verified, 100% of `06-data-structures/` labs checked off, Quiz 2 < 75% gaps retaught, and Unit 5 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U05-1..5`):** Parts A–D completed without spoilers, both Lesson 5.2 labs executed cleanly, and Gradebook Matrix Project submitted on Day 24.
