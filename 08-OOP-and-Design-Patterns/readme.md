# Chapter 8: Object-Oriented JavaScript & Design Patterns

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Explain **prototype delegation** and contrast constructor functions with ES6 `class` syntax.
2. Bind `this` predictably in object methods and classes.
3. Implement core **Creational** (Factory, Prototype), **Structural** (Decorator), and **Behavioral** (Observer, Iterator, State) design patterns in JavaScript.

---

## 1. Prototypes, Constructors & `class`
In JavaScript, inheritance is **prototype-based**. The `class` keyword is syntactic sugar over constructor functions and prototype chains:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}`;
  }
}
```

## 2. Design Patterns in JavaScript
- **Creational — Factory & Prototype:** Functions or `Object.create()` that instantiate objects without exposing complex setup.
- **Structural — Decorator:** Wrapping a function or object to add behavior (e.g., logging or caching) without modifying its original source.
- **Behavioral — Observer, Iterator & State:**
  - **Observer:** Subscribers register callbacks and get notified when state changes.
  - **Iterator:** `[Symbol.iterator]()` enables custom objects to work with `for...of`.
  - **State:** Encapsulating state-specific behavior into discrete state objects/transitions.

---

## Chapter Contents
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Code Example:** [`code/patterns.js`](./code/patterns.js)
- **Student Lesson:** [`student-lesson.md`](./student-lesson.md)
