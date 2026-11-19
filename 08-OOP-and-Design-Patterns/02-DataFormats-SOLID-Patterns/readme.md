# Lesson 8.2: JSON vs. XML, SOLID Principles & Classic Design Patterns (`Std 17.11, 17.13`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall the **SOLID** acronym (`S`, `O`, `L`, `I`, `D`), Creational (**Factory**), Structural (**Decorator**), and Behavioral (**Observer, Iterator, State**) patterns (`17.13`), plus **JSON vs. XML** structural syntax (`17.11`).
- **`[L2 Understand]`** Contrast JSON's compact key-value syntax & native JS speed against XML's opening/closing tags, element attributes, and strict XSD document validation (`17.11`).
- **`[L3 Apply]`** Implement **Factory**, **Decorator**, **Observer**, **Iterator (`[Symbol.iterator]`)**, **State**, and safe **JSON/XML** formatters (`17.11, 17.13`).
- **`[L4 Analyze]`** Spot SOLID Single-Responsibility / Open-Closed violations and invalid unescaped XML/HTML characters (`<`, `&`) (`17.11, 17.13`).
- **`[L5 Evaluate]`** Select optimal serialization formats (**JSON vs XML**) and design patterns for extensible plugin/workflow systems (`17.11, 17.13`).

---

## 1. JSON vs. XML Data Interchange Formats (`Std 17.11`)

| Dimension | JSON (`application/json`) | XML (`application/xml`) |
|---|---|---|
| **Syntax Style** | Compact key-value braces `{ "id": 1 }` | Verbose tags `<user id="1">...</user>` |
| **Native in JS?** | **Yes (`JSON.parse` / `JSON.stringify`)** | Requires DOMParser or external parser |
| **Payload Size** | Small (`20–50%` smaller than XML) | Heavy closing tags add byte bloat |
| **Schema / Metadata** | Attributes baked as regular keys (or JSON Schema) | Native XML Attributes, Namespaces, XSD |
| **Best Use Cases** | REST/Fetch APIs, configs, MongoDB docs | Enterprise SOAP APIs, RSS/SVG/Office XML docs |

---

## 2. SOLID Design & Classical Patterns (`Std 17.13`)
- **SOLID Principles:**
  - **S**ingle Responsibility (1 cohesive reason to change)
  - **O**pen/Closed (extend via new classes/plugins cleanly without editing core code)
  - **L**iskov Substitution (subclasses honor parent contracts safely)
  - **I**nterface Segregation & **D**ependency Inversion (depend on narrow injected interfaces, not rigid globals)
- **GoF Patterns in JS:** **Factory** (central creation), **Decorator** (wrapper enhancing behavior), **Observer** (subscribe/notify), **Iterator** (`*[Symbol.iterator]()` for `for...of`), **State** (explicit workflow state transitions).

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demos:** [`code/solidAndFormatsDemo.js`](./code/solidAndFormatsDemo.js) & [`../code/patterns.js`](../code/patterns.js)
- **Student Starter:** [`../../0-student_files/09-oop-patterns/patterns.js`](../../0-student_files/09-oop-patterns/patterns.js)
