/**
 * Lesson 9.1 Teacher Demo: Conditional Debug Flags, Console Tracing & Object Inspection
 * Finalized & cleaned from the early debugging console notes
 * Standards: AZ CTE 12.1-12.5
 *
 * Run: node 09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/code/console.js
 */
'use strict';
const assert = require('node:assert/strict');

// Module-level debug toggles (keep false in production; enable targeted scopes while diagnosing)
const DEBUG_FLAGS = Object.freeze({
  general: true,
  primitives: false,
  objects: true,
  traceCalls: false,
});

// Sample values across JS primitive and non-primitive categories
const sampleString = 'some text';
const sampleNumber = 10;
const sampleBoolean = false;
const sampleSymbol = Symbol('foo');
const sampleBigInt = 9007199254740991n;
const sampleNull = null;
let sampleUndefined;

const sampleObj = Object.freeze({ property: 'Value', count: 3 });
const sampleArray = [1, 2.1, 'string'];

function classifyAndInspect(value, { tracer = false, logger = console.log } = {}) {
  let category;

  if (value === null) {
    // Beware historical JS quirk: typeof null === 'object'!
    category = 'null';
    if (DEBUG_FLAGS.general) {
      logger(`[DEBUG] null detected (typeof null === "${typeof value}")`);
    }
  } else if (value === undefined) {
    category = 'undefined';
    if (DEBUG_FLAGS.general) logger('[DEBUG] undefined value detected');
  } else if (Array.isArray(value)) {
    category = 'array';
    if (DEBUG_FLAGS.objects) {
      logger('[DEBUG] Array Object:');
      console.table(value);
    }
  } else if (typeof value === 'object') {
    category = 'object';
    if (DEBUG_FLAGS.objects) {
      logger(
        `[DEBUG] Object -> frozen=${Object.isFrozen(value)}, sealed=${Object.isSealed(value)}, json=${JSON.stringify(value)}`
      );
    }
  } else if (typeof value === 'function') {
    category = 'function';
    if (DEBUG_FLAGS.objects) logger(`[DEBUG] Function/Class: ${value.name || '(anonymous)'}`);
  } else {
    category = typeof value;
    if (DEBUG_FLAGS.primitives) {
      logger(`[DEBUG] Primitive (${category}):`, String(value));
    }
  }

  if (tracer) {
    console.trace('[TRACE] Call stack snapshot for', category);
  }
  return category;
}

assert.equal(classifyAndInspect(sampleString), 'string');
assert.equal(classifyAndInspect(sampleNumber), 'number');
assert.equal(classifyAndInspect(sampleBoolean), 'boolean');
assert.equal(classifyAndInspect(sampleSymbol), 'symbol');
assert.equal(classifyAndInspect(sampleBigInt), 'bigint');
assert.equal(classifyAndInspect(sampleNull), 'null');
assert.equal(classifyAndInspect(sampleUndefined), 'undefined');
assert.equal(classifyAndInspect(sampleObj), 'object');
assert.equal(classifyAndInspect(sampleArray), 'array');
assert.equal(classifyAndInspect(() => {}), 'function');

console.log('console.js debugging demo passed!');
