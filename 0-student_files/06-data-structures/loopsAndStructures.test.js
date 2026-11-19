/**
 * Unit 5 Student Lab TDD Suite (RED -> GREEN)
 * Tests: loopsLab.js, matricesTreesLab.js, classicStructuresLab.js, dataStructures.js
 * Run: node --test 0-student_files/06-data-structures/loopsAndStructures.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const { firstEvenAboveTen, buildStarGrid, sumDigits } = require('./loopsLab.js');
const { indexById, sumMatrix, collectTreeLabels } = require('./matricesTreesLab.js');
const { Stack, Queue, LinkedList, HashTable, BitSet } = require('./classicStructuresLab.js');
const { factorial, sumDiscountedPrices, roundTripCourseJson } = require('./dataStructures.js');

test('loopsLab.firstEvenAboveTen skips odds and returns first even > 10', () => {
  assert.equal(firstEvenAboveTen([3, 8, 13, 14, 22]), 14);
  assert.equal(firstEvenAboveTen([12, 18]), 12);
  assert.equal(firstEvenAboveTen([2, 4, 11]) ?? null, null);
});

test('loopsLab.buildStarGrid builds a rows x cols matrix of asterisks', () => {
  assert.deepEqual(buildStarGrid(2, 3), [
    ['*', '*', '*'],
    ['*', '*', '*'],
  ]);
  assert.deepEqual(buildStarGrid(1, 2), [['*', '*']]);
});

test('loopsLab.sumDigits recursively sums digits of a non-negative integer', () => {
  assert.equal(sumDigits(456), 15);
  assert.equal(sumDigits(7), 7);
  assert.equal(sumDigits(109), 10);
});

test('matricesTreesLab builds O(1) id Map, sums 2D matrix, and collects tree labels', () => {
  const roster = [
    { id: 'u1', name: 'Sam' },
    { id: 'u2', name: 'Ada' },
  ];
  const map = indexById(roster);
  assert.equal(map instanceof Map, true);
  assert.equal(map.size, 2);
  assert.deepEqual(map.get('u1'), { id: 'u1', name: 'Sam' });

  assert.equal(sumMatrix([[1, 2], [3, 4]]), 10);
  assert.equal(sumMatrix([[5, -2], [0, 7]]), 10);

  const tree = {
    label: 'root',
    children: [
      { label: 'a', children: [] },
      { label: 'b', children: [{ label: 'c', children: [] }] },
    ],
  };
  assert.deepEqual(collectTreeLabels(tree), ['root', 'a', 'b', 'c']);
});

test('classicStructuresLab Stack and Queue enforce LIFO and FIFO contracts', () => {
  const stack = new Stack();
  assert.throws(() => stack.pop(), /Stack is empty/);
  stack.push(10);
  stack.push(20);
  assert.equal(stack.peek(), 20);
  assert.equal(stack.pop(), 20);
  assert.equal(stack.pop(), 10);
  assert.equal(stack.isEmpty(), true);

  const queue = new Queue();
  assert.throws(() => queue.dequeue(), /Queue is empty/);
  queue.enqueue('a');
  queue.enqueue('b');
  assert.equal(queue.size(), 2);
  assert.equal(queue.dequeue(), 'a');
  assert.equal(queue.dequeue(), 'b');
  assert.equal(queue.size(), 0);
});

test('classicStructuresLab LinkedList, HashTable, and BitSet pass behavioral checks', () => {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);
  assert.equal(list.length, 3);
  assert.deepEqual(list.toArray(), [1, 2, 3]);

  const table = new HashTable(2); // force bucket collisions
  table.set('course', 'JS First');
  table.set('track', 'AI');
  table.set('course', 'Node First');
  assert.equal(table.get('course'), 'Node First');
  assert.equal(table.get('track'), 'AI');
  assert.equal(table.get('missing'), null);

  const bits = new BitSet(64);
  bits.add(42);
  bits.add(5);
  assert.equal(bits.has(42), true);
  assert.equal(bits.has(5), true);
  assert.equal(bits.has(41), false);
});

test('dataStructures.js computes factorial, filter/map/reduce totals, and JSON round-trip', () => {
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);

  const total = sumDiscountedPrices([5, 12, 25, 8, 30]);
  assert.ok(Math.abs(total - 60.3) < 1e-9);

  const input = { name: 'JS First', year: 2026 };
  const cloned = roundTripCourseJson(input);
  assert.deepEqual(cloned, input);
  assert.notEqual(cloned, input);
});
