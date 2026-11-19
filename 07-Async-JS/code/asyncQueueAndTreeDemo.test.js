/**
 * Chapter 7 Teacher Demo: AsyncQueue & AsyncBinarySearchTree (Offline Deterministic Concurrency)
 * Adapted from upstream `03-DataStructures/AsyncQueue.js` and `AsyncTree.js`
 * Standards: AZ CTE 18.0, 6.8
 *
 * Run:
 *   node --test 07-Async-JS/code/asyncQueueAndTreeDemo.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

class AsyncQueue {
  #queue = [];
  #pendingResolvers = [];

  async enqueue(item) {
    if (this.#pendingResolvers.length > 0) {
      const resolve = this.#pendingResolvers.shift();
      resolve(item);
    } else {
      this.#queue.push(item);
    }
  }

  async dequeue() {
    if (this.#queue.length > 0) {
      return this.#queue.shift();
    }
    return new Promise((resolve) => {
      this.#pendingResolvers.push(resolve);
    });
  }

  get size() {
    return this.#queue.length;
  }

  isEmpty() {
    return this.#queue.length === 0;
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class AsyncBinarySearchTree {
  constructor() {
    this.root = null;
  }

  async insert(value) {
    await Promise.resolve(); // Yield across microtask boundary deterministically
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    await this.#insertNode(this.root, newNode);
  }

  async #insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) node.left = newNode;
      else await this.#insertNode(node.left, newNode);
    } else if (newNode.value > node.value) {
      if (!node.right) node.right = newNode;
      else await this.#insertNode(node.right, newNode);
    }
  }

  async search(target) {
    await Promise.resolve();
    let curr = this.root;
    while (curr) {
      if (target === curr.value) return true;
      curr = target < curr.value ? curr.left : curr.right;
    }
    return false;
  }

  inOrderTraversal(node = this.root, out = []) {
    if (!node) return out;
    this.inOrderTraversal(node.left, out);
    out.push(node.value);
    this.inOrderTraversal(node.right, out);
    return out;
  }
}

test('AsyncQueue resolves buffered items and pending consumer Promises deterministically', async () => {
  const queue = new AsyncQueue();
  await queue.enqueue(10);
  await queue.enqueue(20);
  assert.equal(queue.size, 2);

  assert.equal(await queue.dequeue(), 10);
  assert.equal(await queue.dequeue(), 20);
  assert.equal(queue.isEmpty(), true);

  // Consumer awaits BEFORE producer enqueues
  const pendingRead = queue.dequeue();
  setTimeout(() => {
    queue.enqueue(40);
  }, 10);

  assert.equal(await pendingRead, 40);
  assert.equal(queue.isEmpty(), true);
});

test('AsyncBinarySearchTree inserts and searches offline values in sorted order', async () => {
  const bst = new AsyncBinarySearchTree();
  const offlineRecords = [42, 18, 70, 9, 25, 60, 88];
  for (const num of offlineRecords) {
    await bst.insert(num);
  }

  assert.deepEqual(bst.inOrderTraversal(), [9, 18, 25, 42, 60, 70, 88]);
  assert.equal(await bst.search(25), true);
  assert.equal(await bst.search(99), false);
});

module.exports = { AsyncQueue, AsyncBinarySearchTree };
