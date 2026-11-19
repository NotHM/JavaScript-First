/**
 * Unit 6 Student Lab TDD Suite (RED -> GREEN)
 * Tests: booleanLogicLab.js and functions.js
 * Run: node --test 0-student_files/07-functions/functionsAndLogic.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const { nor, xor, getLetterGrade, handleCommand } = require('./booleanLogicLab.js');
const { square, createCounter, applyOperation, multiply } = require('./functions.js');

test('booleanLogicLab nor and xor match complete Boolean truth tables', () => {
  assert.equal(nor(false, false), true);
  assert.equal(nor(false, true), false);
  assert.equal(nor(true, false), false);
  assert.equal(nor(true, true), false);
  assert.equal(nor(0, ''), true);

  assert.equal(xor(false, false), false);
  assert.equal(xor(false, true), true);
  assert.equal(xor(true, false), true);
  assert.equal(xor(true, true), false);
  assert.equal(xor(1, 0), true);
});

test('booleanLogicLab getLetterGrade uses guard clauses for bounds and returns A–F', () => {
  assert.equal(getLetterGrade(-5), 'INVALID');
  assert.equal(getLetterGrade(105), 'INVALID');
  assert.equal(getLetterGrade(Number.NaN), 'INVALID');
  assert.equal(getLetterGrade(95), 'A');
  assert.equal(getLetterGrade(88), 'B');
  assert.equal(getLetterGrade(75), 'C');
  assert.equal(getLetterGrade(65), 'D');
  assert.equal(getLetterGrade(40), 'F');
});

test('booleanLogicLab handleCommand routes start, pause, stop, and unknown without fall-through', () => {
  const startOut = handleCommand('start');
  const pauseOut = handleCommand('pause');
  const stopOut = handleCommand('stop');
  const unknownOut = handleCommand('turbo');

  assert.equal(typeof startOut, 'string');
  assert.match(startOut.toLowerCase(), /start/);
  assert.match(pauseOut.toLowerCase(), /pause/);
  assert.match(stopOut.toLowerCase(), /stop/);
  assert.match(unknownOut.toLowerCase(), /unknown/);
  assert.notEqual(startOut, pauseOut);
  assert.notEqual(pauseOut, stopOut);
});

test('functions.js implements pure square, closure createCounter, HOF applyOperation, and curried multiply', () => {
  assert.equal(square(6), 36);
  assert.equal(square(-3), 9);

  const counterA = createCounter(5);
  const counterB = createCounter(0);
  assert.equal(counterA(), 6);
  assert.equal(counterA(), 7);
  assert.equal(counterB(), 1); // independent lexical closure state

  assert.equal(applyOperation((x, y) => x + y, 4, 9), 13);
  assert.equal(applyOperation((x, y) => x - y, 10, 3), 7);

  const triple = multiply(3);
  assert.equal(triple(7), 21);
  assert.equal(multiply(5)(8), 40);
});
