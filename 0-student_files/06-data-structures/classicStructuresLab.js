/**
 * Student Lesson 5.2C: Classic Data Structures Lab (LinkedList, Stack, Queue, HashTable, BitSet)
 * Standards: AZ CTE 6.1-6.3, 6.8
 * Run: node 0-student_files/06-data-structures/classicStructuresLab.js
 */
const assert = require('node:assert/strict');

class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    // TODO [L3 Apply]: Add item to top of stack
  }
  pop() {
    // TODO [L3 Apply]: Throw Error('Stack is empty') if empty; otherwise remove and return top
  }
  peek() {
    // TODO [L2 Understand]: Return top item without removing it
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

class Queue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }
  enqueue(item) {
    // TODO [L3 Apply]: Insert item at rear index and increment rear
  }
  dequeue() {
    // TODO [L3 Apply]: Throw Error('Queue is empty') if empty; return front item and advance front
  }
  size() {
    return this.rear - this.front;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  append(value) {
    // TODO [L3 Apply]: Create { value, next: null } node and append to tail in O(1)
  }
  toArray() {
    // TODO [L3 Apply]: Traverse from head to null and return values array
    return [];
  }
}

class HashTable {
  constructor(size = 16) {
    this.size = size;
    this.buckets = Array.from({ length: size }, () => []);
  }
  _hash(key) {
    let hash = 0;
    for (const ch of String(key)) hash = (hash * 31 + ch.charCodeAt(0)) % this.size;
    return hash;
  }
  set(key, value) {
    // TODO [L4 Analyze]: Update existing [key, value] in bucket or push new pair
  }
  get(key) {
    // TODO [L4 Analyze]: Return matching value or null
    return null;
  }
}

class BitSet {
  constructor(size = 64) {
    this.bits = new Uint32Array(Math.ceil(size / 32));
  }
  add(value) {
    // TODO [L4 Analyze]: Set bit at index = Math.floor(value / 32), offset = value % 32
  }
  has(value) {
    // TODO [L4 Analyze]: Return boolean checking whether bit is set
    return false;
  }
}

if (require.main === module) {
  console.log('Complete classicStructuresLab.js TODOs, then uncomment checks below to test!');
  /*
  const s = new Stack();
  s.push(10); s.push(20);
  assert.equal(s.pop(), 20);
  const q = new Queue();
  q.enqueue('a'); q.enqueue('b');
  assert.equal(q.dequeue(), 'a');
  const ll = new LinkedList();
  ll.append(1); ll.append(2);
  assert.deepEqual(ll.toArray(), [1, 2]);
  const ht = new HashTable(4);
  ht.set('course', 'JS First'); ht.set('course', 'Node First');
  assert.equal(ht.get('course'), 'Node First');
  const bs = new BitSet(64);
  bs.add(42);
  assert.equal(bs.has(42), true);
  assert.equal(bs.has(41), false);
  console.log('Classic Data Structures Lab passed!');
  */
}

void assert;
module.exports = { Stack, Queue, LinkedList, HashTable, BitSet };
