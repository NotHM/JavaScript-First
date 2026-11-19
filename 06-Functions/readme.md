# Chapter 6: Functions, Closures & Functional Programming

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Contrast **function declarations** (hoisted), **function expressions**, **arrow functions**, **anonymous functions**, and **IIFEs** (Immediately Invoked Function Expressions).
2. Explain **closures** and how inner functions retain access to their lexical scope.
3. Write **pure functions** with no side effects and deterministic outputs.
4. Compose **higher-order functions** (HOFs), **callbacks**, and **curried functions**.

---

## 1. Forms of Functions
- **Function Declaration:** `function add(a, b) { return a + b; }` (hoisted to the top of its scope).
- **Function Expression:** `const add = function (a, b) { return a + b; };` (not hoisted).
- **Arrow Function:** `const add = (a, b) => a + b;` (concise syntax, lexical `this`).
- **IIFE:** `(() => { /* isolated scope */ })();` (executes immediately to avoid polluting global scope).

## 2. Closures
A **closure** is formed when a function remembers and continues to access variables from its outer lexical scope even after the outer function has returned:

```javascript
function createCounter(start = 0) {
  let count = start;
  return () => ++count;
}
const next = createCounter(10);
next(); // 11
next(); // 12
```

## 3. Functional Programming Foundations
- **Pure Functions:** Given the same arguments, always return the same output and cause zero external side effects.
- **Higher-Order Functions & Callbacks:** Functions that accept another function as an argument (e.g., `applyTwice(fn, x)`) or return a function.
- **Currying:** Transforming a multi-argument function `f(a, b)` into a chain of single-argument functions `f(a)(b)`:

```javascript
const multiply = (a) => (b) => a * b;
const double = multiply(2);
double(5); // 10
```

---

## Chapter Contents
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Code Example:** [`code/functions.js`](./code/functions.js)
- **Student Lesson:** [`student-lesson.md`](./student-lesson.md)
