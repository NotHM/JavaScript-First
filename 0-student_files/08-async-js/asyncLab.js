/**
 * Student Lesson 7.1 — Async JS, Promises & EventEmitter
 *
 * Instructions:
 * 1. Implement `delay(ms, value)` returning a Promise that resolves with `value` after `ms`.
 * 2. Implement `async function runAll()` using `await Promise.all([...])` inside `try/catch`.
 * 3. Create an `EventEmitter` from `'node:events'`, register a `'complete'` listener,
 *    and emit `'complete'` after `runAll()` finishes.
 * 4. Run with:
 *      node 0-student_files/08-async-js/asyncLab.js
 */

const { EventEmitter } = require('node:events');

function delay(ms, value) {
  // TODO: Return a Promise that resolves after ms milliseconds
}

async function runAll() {
  // TODO: Await two delay() calls concurrently with Promise.all inside try/catch
}

// TODO: Create an EventEmitter, listen for 'complete', and emit it after runAll()
