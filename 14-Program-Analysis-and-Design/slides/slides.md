---
title: "Chapter 14 — Program Analysis, SDLC & System Design (Std 10.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Chapter 14: Program Analysis & Design
**AZ CTE Standard 10.0 (`10.1`–`10.10`)**

---

### `[L1 Remember]` The 7 SDLC Phases (`Std 10.1, 10.4`)

`Plan` → `Requirements (User Stories)` → `Design (UML/DB)` → `Implement` → `Test` → `Deploy` → `Maintain + Telemetry`

- **RAD:** Fast iterative prototypes & rapid user validation
- **RUP:** Risk-driven phases (Inception → Elaboration → Construction → Transition)

---

### `[L3 Apply]` User Stories & Test Plans (`Std 10.2`)

> "As a **student**, I want **to filter assignments by due date**, so that **I submit on time**."

**Acceptance Test Plan:**
- **Given** 3 assignments exist; **When** user picks `"Due Today"`; **Then** only matching items display!

---

### `[L2 Understand -> L5 Evaluate]` Choosing Stack & Storage (`Std 10.3, 10.6`)

- **JavaScript (Node.js):** Real-time web APIs, full-stack JS sharing
- **Python:** ML/data pipelines | **Java/C#:** Strict typed enterprise systems
- **SQL vs. NoSQL:** Financial ledgers & strict joins → **SQL**; rapid dynamic catalogs → **NoSQL Document**

---

### `[L4 Analyze]` Compliance, Decomposition & Telemetry (`Std 10.5, 10.7–10.10`)

- **Compliance:** **HIPAA** (health), **PCI DSS** (cards), **GLBA** (financial privacy)
- **Decompose:** Never write a 400-line mega-function—split into single-responsibility steps!
- **Telemetry:** Track anonymized `{ route, durationMs, statusCode }` to catch bottlenecks cleanly.

> **Lab:** Open `0-student_files/14-program-design/systemDesignLab.js` to model acceptance plans, architecture scores & telemetry!
