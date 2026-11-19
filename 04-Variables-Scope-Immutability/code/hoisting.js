/**
 * Chapter 4 Teacher Demo: Variable & Function Hoisting vs. Temporal Dead Zone (TDZ)
 * Finalized & hardened from the curriculum hoisting demo notes
 *
 * Run: node 04-Variables-Scope-Immutability/code/hoisting.js
 */
'use strict';
const assert = require('node:assert/strict');

// 1. Implicit global trap (from original hoisting.js draft) vs strict mode:
// Without 'use strict', `number = 100` creates an accidental global property!
// Under 'use strict', assigning an undeclared identifier throws ReferenceError immediately.
assert.throws(() => {
  const fn = new Function('"use strict"; undeclaredNumber = 100; return undeclaredNumber;');
  fn();
}, ReferenceError);

// 2. `var` declaration hoisting: declaration moves to top of function scope, initialized to `undefined`
function demonstrateVarHoisting() {
  const beforeAssign = hoistedVar; // undefined, NOT ReferenceError!
  var hoistedVar = 100;
  return { beforeAssign, afterAssign: hoistedVar };
}
assert.deepEqual(demonstrateVarHoisting(), { beforeAssign: undefined, afterAssign: 100 });

// 3. `let` / `const` Temporal Dead Zone (TDZ): throws ReferenceError if read before initialization
function demonstrateTdz() {
  assert.throws(() => {
    // eslint-disable-next-line no-use-before-define
    const readEarly = () => tdzValue;
    const earlyResult = readEarly();
    const tdzValue = 42;
    return earlyResult;
  }, ReferenceError);
}
demonstrateTdz();

// 4. Function declaration hoisting vs function expression
assert.equal(hoistedGreet('CTE-CIS'), 'Hello, CTE-CIS!');

function hoistedGreet(name) {
  return `Hello, ${name}!`;
}

console.log('hoisting.js passed: strict implicit-global guard, var hoisting, TDZ, and function hoisting verified!');
