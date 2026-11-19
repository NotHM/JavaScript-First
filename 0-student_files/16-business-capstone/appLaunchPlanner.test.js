/**
 * Unit 16 Lab Test Suite (App Store Payout, Break-Even & LTV:CAC Planner)
 * Run: node --test 0-student_files/16-business-capstone/appLaunchPlanner.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  calculateNetPerSubscriber,
  calculateBreakEvenUsers,
  calculateLtvToCac,
} = require('./appLaunchPlanner.js');

test('calculateNetPerSubscriber deducts store commission and per-user infra', () => {
  assert.equal(calculateNetPerSubscriber(10, 0.15, 0.5), 8);
  assert.equal(calculateNetPerSubscriber(12, 0.3, 1.4), 7);
});

test('calculateBreakEvenUsers rounds up and throws RangeError on non-positive contribution', () => {
  assert.equal(calculateBreakEvenUsers(4000, 8), 500);
  assert.equal(calculateBreakEvenUsers(4001, 8), 501);
  assert.throws(() => calculateBreakEvenUsers(4000, 0), RangeError);
  assert.throws(() => calculateBreakEvenUsers(4000, -2), RangeError);
});

test('calculateLtvToCac computes LTV / CAC rounded to 2 decimals', () => {
  assert.equal(calculateLtvToCac(8, 0.05, 40), 4);
  assert.equal(calculateLtvToCac(7, 0.1, 45), 1.56);
});
