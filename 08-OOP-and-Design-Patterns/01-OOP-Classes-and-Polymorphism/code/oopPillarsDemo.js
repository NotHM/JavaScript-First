/**
 * Teacher Demo 8.1: OOP Encapsulation, Abstract Contracts, Composition, & Value/Ref Semantics (Std 17.1–17.10)
 * Run: node 08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/code/oopPillarsDemo.js
 */
const assert = require('node:assert/strict');

// 17.7 Abstract Interface Guard + 17.4–17.5 Private Field Encapsulation
class Account {
  #balanceCents = 0;
  constructor(owner, initialCents = 0) {
    if (new.target === Account) {
      throw new Error('Abstract Account must be subclassed');
    }
    this.owner = owner;
    this.balanceCents = initialCents;
  }
  get balanceCents() {
    return this.#balanceCents;
  }
  set balanceCents(val) {
    if (!Number.isInteger(val) || val < 0) throw new RangeError('Balance must be non-negative int');
    this.#balanceCents = val;
  }
  deposit(cents) {
    if (cents <= 0) throw new RangeError('Deposit must be > 0');
    this.#balanceCents += cents;
    return this.#balanceCents;
  }
  accountType() {
    throw new Error('Subclass must implement accountType()');
  }
}

class CheckingAccount extends Account {
  accountType() { return 'Checking'; }
}

class SavingsAccount extends Account {
  constructor(owner, initialCents, auditLog) {
    super(owner, initialCents);
    this.auditLog = auditLog; // 17.6 Composition ("has-an" injected audit logger)
  }
  accountType() { return 'Savings'; }
  deposit(cents) {
    const next = super.deposit(cents);
    this.auditLog.push(`Deposited ${cents}c for ${this.owner}`);
    return next;
  }
}

assert.throws(() => new Account('Nope', 0), /Abstract/);

const log = [];
const accounts = [new CheckingAccount('Ada', 1000), new SavingsAccount('Grace', 2500, log)];
// 17.8 Polymorphic uniform interface dispatch
const summaries = accounts.map((a) => `${a.owner}:${a.accountType()}=${a.balanceCents}c`);
assert.deepEqual(summaries, ['Ada:Checking=1000c', 'Grace:Savings=2500c']);

accounts[1].deposit(500);
assert.equal(accounts[1].balanceCents, 3000);
assert.equal(log.length, 1);

// 17.9 Reference vs Value defensive cloning helper
function grantImmutableBonus(userObj, bonus) {
  return { ...userObj, points: userObj.points + bonus };
}
const rawUser = { name: 'Lin', points: 50 };
const upgraded = grantImmutableBonus(rawUser, 25);
assert.equal(rawUser.points, 50);
assert.equal(upgraded.points, 75);

console.log('oopPillarsDemo passed (abstract guard, #private getters/setters, composition & poly OK)!');
