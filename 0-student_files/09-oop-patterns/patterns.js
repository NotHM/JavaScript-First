/**
 * Student Lesson 8.1 — OOP & Design Patterns
 *
 * Instructions:
 * 1. Complete `createNotification(channel)` (Factory) returning an object
 *    with `{ channel, send(msg) }` that logs `[channel] msg`.
 * 2. Complete `withTimestamp(fn)` (Decorator) returning a wrapper function that
 *    logs `new Date().toISOString()` before calling `fn(...args)`.
 * 3. Complete `class Observable` with `subscribe(fn)` and `notify(data)`.
 * 4. Run with:
 *      node 0-student_files/09-oop-patterns/patterns.js
 */

function createNotification(channel) {
  // TODO: Return { channel, send(msg) { ... } }
}

function withTimestamp(fn) {
  // TODO: Return a wrapped function
}

class Observable {
  constructor() {
    this.subscribers = [];
  }
  // TODO: Implement subscribe(fn) and notify(data)
}
