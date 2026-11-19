/**
 * Unit 8 Student Labs TDD Suite (RED -> GREEN)
 * Tests: oopPillarsLab.js and patterns.js
 * Run: node --test 0-student_files/09-oop-patterns/oopAndPatterns.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const { Shape, Rectangle, addScoreSafe } = require('./oopPillarsLab.js');
const { createNotification, withTimestamp, Observable } = require('./patterns.js');

test('oopPillarsLab Shape enforces abstract new.target guard and Rectangle implements #private + area()', () => {
  assert.throws(() => new Shape(), Error);

  const rect = new Rectangle(4, 5);
  assert.equal(rect instanceof Shape, true);
  assert.equal(rect.area(), 20);
  assert.throws(() => new Rectangle(-2, 5), Error);
  assert.throws(() => new Rectangle(4, 0), Error);
});

test('oopPillarsLab addScoreSafe increments score without mutating original object', () => {
  const p1 = { name: 'Kai', score: 10 };
  const p2 = addScoreSafe(p1, 5);

  assert.equal(p1.score, 10);
  assert.equal(p2.score, 15);
  assert.notEqual(p1, p2);
});

test('patterns.js createNotification (Factory) and withTimestamp (Decorator) work cleanly', () => {
  const sms = createNotification('sms');
  assert.equal(sms.channel, 'sms');
  assert.equal(typeof sms.send, 'function');

  const wrappedAdd = withTimestamp((a, b) => a + b);
  assert.equal(typeof wrappedAdd, 'function');
  assert.equal(wrappedAdd(3, 4), 7);
});

test('patterns.js Observable notifies all subscribed listeners', () => {
  const obs = new Observable();
  const eventsA = [];
  const eventsB = [];

  obs.subscribe((data) => eventsA.push(data));
  obs.subscribe((data) => eventsB.push(data));
  obs.notify({ id: 1, status: 'OK' });

  assert.deepEqual(eventsA, [{ id: 1, status: 'OK' }]);
  assert.deepEqual(eventsB, [{ id: 1, status: 'OK' }]);
});
