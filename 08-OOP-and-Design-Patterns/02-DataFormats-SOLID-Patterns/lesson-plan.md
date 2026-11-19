# Lesson Plan 8.2: JSON vs. XML, SOLID Principles & Design Patterns (`Std 17.11, 17.13`)

**Unit:** Unit 8 | **Duration:** 3 Class Periods × 50 min | **Stds:** `17.11`, `17.13`

## Bloom's Objective Ladder
- **L1–L2:** State SOLID letters, classic pattern intents (**Factory, Decorator, Observer, Iterator, State**), and JSON vs XML serialization tradeoffs.
- **L3 Apply:** Build working Factory, Decorator, Observer, and Iterator patterns (`patterns.js`) + escaped XML/JSON serializers.
- **L4 Analyze:** Spot Single-Responsibility/Open-Closed violations, unescaped XML syntax errors, and skipped workflow states.
- **L5 Evaluate:** Defend JSON vs XML choices & SOLID pattern combinations in modular software architectures.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 8.2 (4m), Slides + JSON vs XML Payload Walkthrough (`17.11`), Part A (`15m`).
- **Day 2–3:** Walkthrough `code/solidAndFormatsDemo.js` + `0-student_files/09-oop-patterns/patterns.js` coding + Unit 8 Project, Post-Lesson 8.2 Exit Ticket.
- **Pre 8.2 Key:** 1) `JSON.stringify` & `JSON.parse`; 2) Repeating `<opening>...</closing>` tags double formatting overhead compared to compact braces; 3) `Symbol.iterator`; 4) **O** — Open/Closed Principle.
- **Post 8.2 Key:** 1) **S**ingle Responsibility, **O**pen/Closed, **L**iskov Substitution; 2) **Factory** encapsulates new instance creation cleanly; **Decorator** wraps existing callable behavior adding cross-cutting features (logs/timing) dynamically; 3) `<item id="7"><name>A &amp; B</name></item>`; 4) Plain string assignment lets devs mistakenly jump `DRAFT -> SHIPPED`, whereas State maps enforce legal transition edges cleanly! 5) Weather API = **JSON** (tiny payload, native JS/mobile fetch); Clearinghouse = **XML** (strict XSD banking contracts & signed enterprise schemas).
- **Worksheet Part A Key:** XML `<record id="5"><course>JS First</course><active>true</active></record>`; Violations: 1) Single Responsibility (`S`), 2) Open/Closed (`O`).

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 8.2 & Part A XML/SOLID** | `SG-U08-1`, `TG-U08-1` | `L1–L2` (`17.11, 17.13`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 78; >= 80% accuracy converting JSON to XML and identifying SOLID violations by Day 78. |
| **Applied Patterns Lab (Part B)** | `SG-U08-2`, `TG-U08-2` | `L3` (`17.13`) | Live checkoff of [`patterns.js`](../../0-student_files/09-oop-patterns/patterns.js) verifying Factory, Decorator, and Observer outputs by end of Day 79. |
| **XML/State Forensics & Quiz 2 (Part C)** | `SG-U08-3`, `TG-U08-3` | `L4` (`17.11, 17.13`) | >= 80% accuracy diagnosing XML escaping and state-transition guards in Part C; run 10-min reteach if Kahoot Quiz 2 falls < 75% on Day 79. |
| **Pattern Critique, Exit Ticket & Project (Part D)** | `SG-U08-4`, `SG-U08-5`, `TG-U08-1`, `TG-U08-4`, `TG-U08-5` | `L5–L6` (`17.11, 17.13`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 80 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](../projects/project-rubric.md) within 72 hours and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U08-1..5`):** Pre/Post Lesson 8.2 growth ($g \ge 0.55$) verified, 100% `patterns.js` checkoffs completed, Quiz 2 < 75% gaps retaught, and Unit 8 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U08-1..5`):** Parts A–D verified without spoilers, `patterns.js` passing cleanly, and OOP Plugin System submitted on Day 80.
