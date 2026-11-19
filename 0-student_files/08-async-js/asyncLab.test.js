/**
 * Unit 7 Lesson 7.1 Student Lab TDD Suite (RED -> GREEN)
 * Run: node --test 0-student_files/08-async-js/asyncLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { ValidationError, delay, loadGracefully } = require('./asyncLab.js');

test('ValidationError extends Error and sets name and field properties', () => {
  const err = new ValidationError('Invalid email', 'email');
  assert.equal(err instanceof Error, true);
  assert.equal(err instanceof ValidationError, true);
  assert.equal(err.name, 'ValidationError');
  assert.equal(err.message, 'Invalid email');
  assert.equal(err.field, 'email');
});

test('delay resolves with the supplied value after the specified duration', async () => {
  const result = await delay(5, 'ready');
  assert.equal(result, 'ready');
});

test('loadGracefully isolates rejections via Promise.allSettled and collects okValues and errors', async () => {
  const errDown = new Error('Upstream down');
  const out = await loadGracefully([
    delay(5, 'A'),
    Promise.reject(errDown),
    Promise.resolve('B'),
  ]);

  assert.deepEqual(out.okValues, ['A', 'B']);
  assert.equal(out.errors.length, 1);
  assert.equal(out.errors[0], errDown);
});
