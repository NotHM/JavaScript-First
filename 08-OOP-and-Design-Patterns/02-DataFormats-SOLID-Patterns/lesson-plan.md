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
