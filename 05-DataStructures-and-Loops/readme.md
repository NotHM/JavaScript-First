# Chapter 5: Control Flow, Iterables, Loops & Data Structures

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Write conditionals (`if`/`else`, `switch`) and loops (`for`, `while`, `for...of`, `forEach`) as well as basic recursive functions.
2. Create, access, and serialize JavaScript **Objects** (`{}`) and **JSON** (`JSON.stringify`, `JSON.parse`).
3. Transform and aggregate **Arrays** (`[]`) using non-mutating array methods (`map`, `filter`, `reduce`).
4. Use JavaScript's built-in `Math`, `Date`, and `RegExp` objects to solve practical problems.

---

## 1. Conditionals, Loops & Recursion
- **Conditionals:** `if / else if / else` and `switch` control branching logic.
- **Loops:**
  - `for (let i = 0; i < n; i++)` — Counter-controlled iteration.
  - `while (condition)` — Condition-controlled iteration.
  - `for (const item of iterable)` — Clean iteration over arrays, strings, Maps, and Sets.
  - `array.forEach(item => ...)` — Functional iteration over array elements.
- **Recursion:** A function that calls itself with a smaller input until reaching a **base case**.

## 2. Objects & JSON
- **Objects (`{}`)** store key-value pairs (`const user = { name: 'Ada', role: 'Engineer' }`).
- **JSON (JavaScript Object Notation)** is a text format for data exchange:
  - `JSON.stringify(obj)` converts an object to a JSON string.
  - `JSON.parse(jsonStr)` converts a JSON string back into a JavaScript value.

## 3. Arrays & Non-Mutating Array Methods
Prefer non-mutating methods that return new arrays instead of mutating data in place:
- `.map(fn)` — Transforms every element.
- `.filter(fn)` — Keeps elements that pass a test.
- `.reduce(fn, initial)` — Accumulates elements into a single value.

## 4. Built-In Utilities: `Math`, `Date`, and `RegExp`
- `Math.sqrt()`, `Math.round()`, `Math.random()` for numerical calculations.
- `new Date().toISOString()` for timestamps.
- `/pattern/i.test(str)` for pattern matching with Regular Expressions.

---

## Chapter Contents
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Code Example:** [`code/dataStructures.js`](./code/dataStructures.js)
- **Student Lesson:** [`student-lesson.md`](./student-lesson.md)
