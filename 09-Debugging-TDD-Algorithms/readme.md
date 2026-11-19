# Chapter 9: Debugging, Test-Driven Development (TDD) & Algorithms

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Debug JavaScript effectively using `console` methods (`console.table`, `console.error`, `console.time`) and VS Code breakpoints.
2. Follow the **Red → Green → Refactor** cycle of **Test-Driven Development (TDD)** using Node's built-in `node:test` and `node:assert/strict`.
3. Implement and analyze fundamental algorithms (searching, sorting, palindrome/anagram checks).

---

## 1. Debugging: `console` & Breakpoints
- `console.table(arrayOfObjects)` formats structured data cleanly in the terminal.
- **Breakpoints** in VS Code (`F9` / Run & Debug) pause execution so you can inspect the **Call Stack** and **Variables** in real time without cluttering code with logs.

## 2. Test-Driven Development (TDD) with `node:test`
Node.js includes a zero-dependency test runner (`node --test`):

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');

test('binarySearch finds target index', () => {
  assert.equal(binarySearch([1, 3, 5, 7], 5), 2);
});
```

1. **Red:** Write a failing test describing the desired behavior.
2. **Green:** Write the simplest code that makes the test pass.
3. **Refactor:** Clean up the implementation while keeping all tests green.

## 3. Core Algorithms
- **Linear Search ($O(n)$)** vs **Binary Search ($O(\log n)$)** on sorted arrays.
- **Frequency Counter / Two-Pointer** techniques for string and array problems.

---

## Chapter Contents
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Code Example:** [`code/algorithms.test.js`](./code/algorithms.test.js)
- **Student Lesson:** [`student-lesson.md`](./student-lesson.md)
