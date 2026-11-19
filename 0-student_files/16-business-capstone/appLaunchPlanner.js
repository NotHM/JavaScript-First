/**
 * Student Lesson 16.1 Lab: App Store Payout, Break-Even & LTV:CAC Planner (AZ CTE Std 19.4–19.7)
 * Run: node 0-student_files/16-business-capstone/appLaunchPlanner.js
 */
const assert = require('node:assert/strict');

function calculateNetPerSubscriber(priceDollars, storeFeeRate, infraPerUserDollars) {
  // TODO [L3 Apply | 19.4–19.5]: Return price * (1 - storeFeeRate) - infraPerUserDollars
  return 0;
}

function calculateBreakEvenUsers(monthlyFixedCostsDollars, netPerSubscriber) {
  // TODO [L3 Apply | 19.4]: Throw RangeError if netPerSubscriber <= 0; return Math.ceil(fixed / net)
  return 0;
}

function calculateLtvToCac(netPerSubscriber, monthlyChurnRate, cacDollars) {
  // TODO [L4 Analyze | 19.7]: LTV = netPerSubscriber * (1 / monthlyChurnRate); return Number((LTV / cac).toFixed(2))
  return 0;
}

console.log('Complete appLaunchPlanner.js TODOs, then uncomment verification tests!');
/*
const net = calculateNetPerSubscriber(10, 0.15, 0.50);
assert.equal(net, 8);
assert.equal(calculateBreakEvenUsers(4000, net), 500);
assert.equal(calculateLtvToCac(net, 0.05, 40), 4);
console.log('Lesson 16.1 Business Planner passed!');
*/
