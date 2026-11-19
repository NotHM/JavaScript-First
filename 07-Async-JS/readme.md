# Chapter 7: Asynchronous JavaScript, Promises & Concurrency

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Explain how JavaScript's single-threaded **Event Loop** coordinates synchronous calls, microtasks (Promises), and macrotasks (`setTimeout`, I/O).
2. Convert callback-based asynchronous code into **Promises** and `async`/`await` with `try`/`catch`.
3. Run concurrent async tasks with `Promise.all()`.
4. Use Node.js **Events** (`EventEmitter`) and **Streams** for event-driven concurrency.

---

## 1. Callbacks, Promises & `async`/`await`
- **Callbacks:** Pass a function to run when an async operation finishes (deep nesting leads to "callback hell").
- **Promises:** Represent an eventual value (`pending`, `fulfilled`, or `rejected`), chained with `.then()` / `.catch()`.
- **`async` / `await`:** Syntactic sugar over Promises that lets asynchronous code read like synchronous code while using standard `try`/`catch` error handling.

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  await delay(100);
  return 'Done!';
}
```

## 2. Concurrency: `Promise.all`, Events & Streams
- **`Promise.all([p1, p2])`** executes independent async operations concurrently and resolves when all succeed.
- **`EventEmitter`** (`node:events`) implements the publish/subscribe (Observer) pattern for event-driven architecture.
- **Streams** (`node:fs` `createReadStream`) process large files chunk-by-chunk without loading the entire file into memory.

---

## Chapter Contents
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Code Example:** [`code/asyncDemo.js`](./code/asyncDemo.js)
- **Student Lesson:** [`student-lesson.md`](./student-lesson.md)
