# Lesson 1.3: Primitive Data Types, Strings & Memory Model (`Std 3.0`)

## Student Learning Objectives (Bloom's Taxonomy)
By the end of this section, you should be able to:
- **`[L1 Remember]`** Identify JavaScript's 7 primitive types (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) vs. non-primitive objects (`3.1`).
- **`[L2 Understand]`** Contrast **Stack** (primitives & references) vs. **Heap** (objects/arrays) memory storage (`3.6`) and explain the historical `typeof null === "object"` quirk (`3.1`).
- **`[L3 Apply]`** Perform safe string operations (`trim`, `slice`, `includes`, bounds checking) and conditional type loggers (`if/else` & ternary) (`3.4`, `5.1`).
- **`[L4 Analyze]`** Evaluate memory & time costs (**Big-O $O(1)$ vs $O(n)$**) when copying strings or mutating heap objects (`3.5`).

---

## Stack vs. Heap & Data Types (`3.1`–`3.6`)

| Characteristic | Primitives (`3.1`) | Objects / Arrays (`Object`, `Array`, `Function`) |
|---|---|---|
| **Mutability** | **Immutable** (operations return new values) | **Mutable** properties/elements |
| **Conceptual Storage (`3.6`)** | **Stack** (fixed-size value stored on execution frame) | **Heap** (dynamically resized object; variable holds reference pointer on Stack) |
| **Safe Type Check** | `val === null \|\| (typeof val !== "object" && typeof val !== "function")` | `Array.isArray(val)` or `typeof val === "function"` |
| **String Safety (`3.4`)** | Always check `typeof s === "string"`, use `.slice(0, max)` instead of indexing out-of-bounds assumptions | Avoid $O(n^2)$ string `+` in tight 100k-row loops (`Array.join` uses $O(n)$ storage, `3.5`) |

---

## Section Contents
- **Slides:**
  - [Primitive Data Types](./slides/01-primitiveTypes.md)
  - [Object Types](./slides/02-objectTypes.md)
  - [Logging](./slides/03-logging.md)
- **Teacher Code Examples:**
  - [`testPrimitives.js`](./code/testPrimitives.js), [`logIf.js`](./code/logIf.js), [`logTern.js`](./code/logTern.js)
- **Student Starters:**
  - [`../../0-student_files/02-logging-datatypes/`](../../0-student_files/02-logging-datatypes/)