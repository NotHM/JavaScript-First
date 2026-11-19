/**
 * Student Lesson 7.1 — Event Loop, Custom Errors & Resilient Concurrency (Std 18.0)
 * Run: node 0-student_files/08-async-js/asyncLab.js
 */
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');

class ValidationError extends Error {
  // TODO [L3 Apply | 18.6]: Extend Error cleanly, setting this.name = 'ValidationError' and this.field
}

function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function loadGracefully(tasks) {
  // TODO [L3 Apply | 18.1, 18.7]:
  // Run Promise.allSettled(tasks), return { okValues, errors },
  // and ensure a `finally` block executes cleanup!
  return { okValues: [], errors: [] };
}

console.log('Complete asyncLab.js TODOs, then uncomment checks to verify!');
/*
(async () => {
  const err = new ValidationError('Invalid email', 'email');
  assert.equal(err instanceof Error, true);
  assert.equal(err.name, 'ValidationError');

  const out = await loadGracefully([delay(5, 'A'), Promise.reject(new Error('Down'))]);
  assert.deepEqual(out.okValues, ['A']);
  assert.equal(out.errors.length, 1);
  console.log('Lesson 7.1 Lab passed!');
})();
*/
