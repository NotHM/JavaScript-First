/**
 * Teacher Demo 5.2B: Classic Data Structures (LinkedList, Stack, Queue, HashTable, BitSet)
 * Ported & hardened from upstream `03-DataStructures/` with `node:test` verification
 * Standards: AZ CTE 6.1-6.3, 6.8
 *
 * Run:
 *   node --test 05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/code/classicStructuresDemo.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
    return this;
  }

  prepend(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
    return this;
  }

  toArray() {
    const out = [];
    let current = this.head;
    while (current) {
      out.push(current.value);
      current = current.next;
    }
    return out;
  }
}

class Stack {
  #items = [];

  push(item) {
    this.#items.push(item);
  }

  pop() {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.#items.pop();
  }

  peek() {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.#items[this.#items.length - 1];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  clear() {
    this.#items = [];
  }
}

class Queue {
  #items = {};
  #front = 0;
  #rear = 0;

  enqueue(item) {
    this.#items[this.#rear] = item;
    this.#rear += 1;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('Queue is empty');
    const removed = this.#items[this.#front];
    delete this.#items[this.#front];
    this.#front += 1;
    return removed;
  }

  peek() {
    if (this.isEmpty()) throw new Error('Queue is empty');
    return this.#items[this.#front];
  }

  isEmpty() {
    return this.#front === this.#rear;
  }

  size() {
    return this.#rear - this.#front;
  }

  clear() {
    this.#items = {};
    this.#front = 0;
    this.#rear = 0;
  }
}

class HashTable {
  constructor(size = 32) {
    this.size = size;
    this.buckets = Array.from({ length: size }, () => []);
  }

  _hash(key) {
    let hash = 0;
    for (const ch of String(key)) {
      hash = (hash * 31 + ch.charCodeAt(0)) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const bucket = this.buckets[this._hash(key)];
    const existing = bucket.find(([k]) => k === key);
    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }

  get(key) {
    const bucket = this.buckets[this._hash(key)];
    const found = bucket.find(([k]) => k === key);
    return found ? found[1] : null;
  }

  delete(key) {
    const bucket = this.buckets[this._hash(key)];
    const idx = bucket.findIndex(([k]) => k === key);
    if (idx === -1) return false;
    bucket.splice(idx, 1);
    return true;
  }
}

class BitSet {
  constructor(capacity = 64) {
    this.capacity = capacity;
    this.words = new Uint32Array(Math.ceil(capacity / 32));
  }

  _ensureCapacity(value) {
    if (value < 0) throw new RangeError('BitSet values must be non-negative integers');
    if (value < this.capacity) return;
    const neededWords = Math.floor(value / 32) + 1;
    const grown = new Uint32Array(neededWords);
    grown.set(this.words);
    this.words = grown;
    this.capacity = neededWords * 32;
  }

  add(value) {
    this._ensureCapacity(value);
    const wordIndex = Math.floor(value / 32);
    const bitOffset = value % 32;
    this.words[wordIndex] |= 1 << bitOffset;
  }

  has(value) {
    if (value < 0 || value >= this.capacity) return false;
    const wordIndex = Math.floor(value / 32);
    const bitOffset = value % 32;
    return (this.words[wordIndex] & (1 << bitOffset)) !== 0;
  }

  remove(value) {
    if (value < 0 || value >= this.capacity) return;
    const wordIndex = Math.floor(value / 32);
    const bitOffset = value % 32;
    this.words[wordIndex] &= ~(1 << bitOffset);
  }
}

test('LinkedList supports O(1) append/prepend and ordered traversal', () => {
  const list = new LinkedList();
  list.append(2).append(3).prepend(1);
  assert.equal(list.length, 3);
  assert.deepEqual(list.toArray(), [1, 2, 3]);
});

test('Stack enforces LIFO and throws on underflow', () => {
  const stack = new Stack();
  assert.throws(() => stack.pop(), /Stack is empty/);
  stack.push(10);
  stack.push(20);
  assert.equal(stack.peek(), 20);
  assert.equal(stack.pop(), 20);
  assert.equal(stack.size(), 1);
});

test('Queue enforces FIFO in O(1) without Array.shift overhead', () => {
  const queue = new Queue();
  queue.enqueue('job-1');
  queue.enqueue('job-2');
  assert.equal(queue.peek(), 'job-1');
  assert.equal(queue.dequeue(), 'job-1');
  assert.equal(queue.size(), 1);
  queue.clear();
  assert.equal(queue.isEmpty(), true);
});

test('HashTable handles key updates, deletes, and bucket collisions cleanly', () => {
  const table = new HashTable(2); // force collisions across 2 buckets
  table.set('firstName', 'Ada');
  table.set('lastName', 'Lovelace');
  table.set('role', 'Architect');
  table.set('role', 'Mathematician');

  assert.equal(table.get('firstName'), 'Ada');
  assert.equal(table.get('role'), 'Mathematician');
  assert.equal(table.delete('lastName'), true);
  assert.equal(table.get('lastName'), null);
});

test('BitSet stores compact bit flags and auto-resizes past initial 64 bits', () => {
  const bits = new BitSet(32);
  bits.add(10);
  bits.add(32);
  bits.add(50);
  bits.add(130);

  assert.equal(bits.has(10), true);
  assert.equal(bits.has(50), true);
  assert.equal(bits.has(130), true);
  assert.equal(bits.has(15), false);
  bits.remove(50);
  assert.equal(bits.has(50), false);
});

module.exports = { LinkedList, Stack, Queue, HashTable, BitSet };
