/**
 * Lesson 9.1 Teacher Demo: Runtime Type & Mutability State Inspector
 * Finalized & cleaned from the early debugging type-inspection notes
 * Standards: AZ CTE 12.1-12.5, 3.1-3.3
 *
 * Run: node 09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/code/typeChecker.js
 */
'use strict';
const assert = require('node:assert/strict');

const PRIMITIVE_TYPES = new Set(['string', 'number', 'boolean', 'symbol', 'bigint']);

function inspectValue(value) {
  if (value === null) {
    // Explicit null guard prevents the historical `typeof null === 'object'` bug
    return { kind: 'primitive', type: 'null', typeofResult: typeof value, value: null };
  }
  if (value === undefined) {
    return { kind: 'primitive', type: 'undefined', typeofResult: 'undefined', value: undefined };
  }
  if (PRIMITIVE_TYPES.has(typeof value)) {
    return { kind: 'primitive', type: typeof value, typeofResult: typeof value, value };
  }
  if (Array.isArray(value)) {
    return {
      kind: 'non-primitive',
      type: 'array',
      length: value.length,
      frozen: Object.isFrozen(value),
      sealed: Object.isSealed(value),
    };
  }
  if (typeof value === 'function') {
    return {
      kind: 'non-primitive',
      type: 'function',
      name: value.name || 'anonymous',
      frozen: Object.isFrozen(value),
      sealed: Object.isSealed(value),
    };
  }
  return {
    kind: 'non-primitive',
    type: 'object',
    frozen: Object.isFrozen(value),
    sealed: Object.isSealed(value),
    keys: Object.keys(value),
  };
}

function logType(value) {
  const report = inspectValue(value);
  console.log(report);
  return report;
}

// Verify primitives
assert.equal(logType('some text').type, 'string');
assert.equal(logType(10).type, 'number');
assert.equal(logType(false).type, 'boolean');
assert.equal(logType(Symbol('foo')).type, 'symbol');
assert.equal(logType(9007199254740991n).type, 'bigint');
assert.equal(logType(null).type, 'null');
assert.equal(logType(undefined).type, 'undefined');

// Verify non-primitives
const frozenObj = Object.freeze({ property: 'Value' });
assert.equal(logType(frozenObj).frozen, true);
assert.equal(logType([1, 2.1, 'string']).type, 'array');
assert.equal(logType(function sampleFn() {}).name, 'sampleFn');

console.log('typeChecker.js passed all runtime type checks!');
