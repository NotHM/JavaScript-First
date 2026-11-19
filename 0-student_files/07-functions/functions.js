/**
 * Student Lesson 6.1 — Functions, Closures & Currying
 *
 * Instructions:
 * 1. Write a pure arrow function `square(n)` that returns `n * n`.
 * 2. Write an IIFE that logs `"Initialized!"`.
 * 3. Write `createCounter(start = 0)` using a closure so each call increments
 *    and returns the count.
 * 4. Write a higher-order function `applyOperation(fn, a, b)` that returns `fn(a, b)`.
 * 5. Write a curried function `multiply(a)` that returns `(b) => a * b`.
 * 6. Run with:
 *      node 0-student_files/07-functions/functions.js
 */

// TODO: Step 1 — square(n)
const square = (n) => {
  // TODO [L3 Apply | 5.5]: Return n * n
  void n;
};

// TODO: Step 2 — IIFE
if (require.main === module) {
  // TODO [L3 Apply | 5.5]: Write an IIFE that logs "Initialized!"
}

// TODO: Step 3 — createCounter(start)
function createCounter(start = 0) {
  // TODO [L3 Apply | 5.5]: Return a closure function that increments and returns the count
  void start;
}

// TODO: Step 4 — applyOperation(fn, a, b)
function applyOperation(fn, a, b) {
  // TODO [L3 Apply | 11.11]: Call fn(a, b) and return the result
  void fn;
  void a;
  void b;
}

// TODO: Step 5 — multiply(a)(b)
function multiply(a) {
  // TODO [L3 Apply | 11.11]: Return a curried function (b) => a * b
  void a;
}

module.exports = { square, createCounter, applyOperation, multiply };
