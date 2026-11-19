/**
 * Teacher Demo 8.2: JSON vs XML Serialization, SOLID & 5 Design Patterns (Std 17.11, 17.13)
 * Run: node 08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/code/solidAndFormatsDemo.js
 */
const assert = require('node:assert/strict');

// 17.11 Escaped XML Serializer vs Compact JSON Serializer
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function serializeCourse(course, format) {
  if (format === 'json') return JSON.stringify(course);
  if (format === 'xml') {
    return `<course id="${course.id}"><title>${escapeXml(course.title)}</title></course>`;
  }
  throw new Error(`Unsupported format: ${format}`);
}

// 17.13 Decorator Pattern
function withCallCounter(fn) {
  let count = 0;
  return (...args) => {
    count += 1;
    return { result: fn(...args), calls: count };
  };
}

// 17.13 Iterator Pattern + State Pattern
class OrderStateMachine {
  #state = 'DRAFT';
  #transitions = Object.freeze({ DRAFT: ['PAID'], PAID: ['SHIPPED'], SHIPPED: [] });
  #log = ['DRAFT'];

  get state() { return this.#state; }

  transitionTo(next) {
    if (!this.#transitions[this.#state].includes(next)) {
      throw new Error(`Invalid transition ${this.#state} -> ${next}`);
    }
    this.#state = next;
    this.#log.push(next);
  }

  *[Symbol.iterator]() {
    yield* this.#log;
  }
}

const jsonStr = serializeCourse({ id: 101, title: 'JS & <Patterns>' }, 'json');
const xmlStr = serializeCourse({ id: 101, title: 'JS & <Patterns>' }, 'xml');
assert.ok(jsonStr.length < xmlStr.length);
assert.match(xmlStr, /&amp; &lt;Patterns&gt;/);

const countedAdd = withCallCounter((a, b) => a + b);
assert.deepEqual(countedAdd(2, 3), { result: 5, calls: 1 });

const order = new OrderStateMachine();
order.transitionTo('PAID');
order.transitionTo('SHIPPED');
assert.throws(() => order.transitionTo('DRAFT'), /Invalid transition/);
assert.deepEqual([...order], ['DRAFT', 'PAID', 'SHIPPED']);

console.log('solidAndFormatsDemo passed (JSON vs XML, Decorator, State & Iterator verified)!');
