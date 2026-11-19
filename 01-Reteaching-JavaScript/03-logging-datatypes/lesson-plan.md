# Lesson Plan 1.3: Logging, Data Types & Memory (`Std 3.0`)

**Unit:** Unit 1 | **Duration:** 2 Class Periods (100 min)  
**AZ CTE Standards:** `3.0` (`3.1`–`3.6`), `18.0` (`18.1`–`18.3`) | **Prof. Skills:** `1.0`, `3.0`

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | Identify all 7 primitive types and 3 core non-primitive categories (`Object`, `Array`, `Function`). |
| **L2 Understand** | Explain Stack vs. Heap allocation (`3.6`) and the legacy `typeof null === "object"` bug (`3.1`). |
| **L3 Apply** | Implement `primitives.js`, `logIf.js`, and `logTern.js` accurately distinguishing `null`, `Array`, and `Object`. |
| **L4 Analyze** | Debug falsy checks (`0`, `""`, `null`) and alias mutation across shared heap object references. |
| **L5 Evaluate** | Judge readability vs. nested ternaries and $O(n)$ Array join vs. $O(n^2)$ loop string concatenation (`3.5`). |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/01-primitiveTypes.md`](./slides/01-primitiveTypes.md), [`slides/02-objectTypes.md`](./slides/02-objectTypes.md), [`slides/03-logging.md`](./slides/03-logging.md)
- **Teacher Solutions:** [`code/testPrimitives.js`](./code/testPrimitives.js), [`code/logIf.js`](./code/logIf.js), [`code/logTern.js`](./code/logTern.js)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/02-logging-datatypes/`](../../0-student_files/02-logging-datatypes/)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) → `slides/01-primitiveTypes.md` + Stack vs. Heap diagram (18 min) → `primitives.js` lab & debugging `LOGprimitive` (22 min) → Wrap-up (6 min).
- **Day 2 (50 min):** `slides/02-objectTypes.md` & `slides/03-logging.md` (15 min) → `logIf.js` & `logTern.js` lab + Worksheet Parts C–D (25 min) → `post-lesson-eval.md` (5 min) → **Unit 1 Kahoot Quiz 2** (5 min).

---

## Instructor Answer Key

### Pre-Lesson 1.3 Key
1. Any 4 of: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
2. `"object"`
3. The array (`let b = a;`) shares a reference pointer to the same Heap object.
4. `"Java"`

### Post-Lesson 1.3 Key
1. `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
2. Arrays are non-primitive objects allocated on the Heap; assigning `copy = original` copies the memory pointer reference, whereas primitive numbers copy values independently on the Stack.
3. `typeof val === "object" && val !== null && !Array.isArray(val)`
4. `VAR !== "function"` compares the function value to the literal string `"function"` instead of comparing `typeof VAR !== "function"`.
5. Since JS strings are immutable primitives, repeated `+=` copies cumulative prefixes $1+2+\dots+n = O(n^2)$ memory traffic, while pushing chunks to an Array and `.join('\n')` computes the output buffer cleanly in linear $O(n)$ space/time.
