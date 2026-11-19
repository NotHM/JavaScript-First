/**
 * Student Lesson 16.1 Lab: App Store Payout, Break-Even & LTV:CAC Planner (AZ CTE Std 19.4–19.7)
 * Run: node 0-student_files/16-business-capstone/appLaunchPlanner.js
 */
const assert = require('node:assert/strict');

function calculateNetPerSubscriber(priceDollars, storeFeeRate, infraPerUserDollars) {
  // TODO [L3 Apply | 19.4–19.5]: Return price * (1 - storeFeeRate) - infraPerUserDollars
  void priceDollars;
  void storeFeeRate;
  void infraPerUserDollars;
  return 0;
}

function calculateBreakEvenUsers(monthlyFixedCostsDollars, netPerSubscriber) {
  // TODO [L3 Apply | 19.4]: Throw RangeError if netPerSubscriber <= 0; return Math.ceil(fixed / net)
  void monthlyFixedCostsDollars;
  void netPerSubscriber;
  return 0;
}

function calculateLtvToCac(netPerSubscriber, monthlyChurnRate, cacDollars) {
  // TODO [L4 Analyze | 19.7]: LTV = netPerSubscriber * (1 / monthlyChurnRate); return Number((LTV / cac).toFixed(2))
  void netPerSubscriber;
  void monthlyChurnRate;
  void cacDollars;
  return 0;
}

if (require.main === module) {
  console.log('Complete appLaunchPlanner.js TODOs, then run: node --test 0-student_files/16-business-capstone/appLaunchPlanner.test.js');
}
/*
const net = calculateNetPerSubscriber(10, 0.15, 0.50);
assert.equal(net, 8);
assert.equal(calculateBreakEvenUsers(4000, net), 500);
assert.equal(calculateLtvToCac(net, 0.05, 40), 4);
console.log('Lesson 16.1 Business Planner passed!');
*/
void assert;

module.exports = {
  calculateNetPerSubscriber,
  calculateBreakEvenUsers,
  calculateLtvToCac,
};
