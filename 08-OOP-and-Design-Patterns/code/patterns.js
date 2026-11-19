// Factory Pattern
function createUser(role, name) {
  return { role, name, permissions: role === 'admin' ? ['read', 'write'] : ['read'] };
}

// Decorator Pattern
function withLogger(fn) {
  return (...args) => {
    console.log(`[LOG] Calling ${fn.name} with`, args);
    return fn(...args);
  };
}
const add = withLogger((a, b) => a + b);
console.log('Result:', add(3, 4));

// Observer Pattern
class Observable {
  constructor() {
    this.subscribers = [];
  }
  subscribe(fn) {
    this.subscribers.push(fn);
  }
  notify(payload) {
    this.subscribers.forEach((fn) => fn(payload));
  }
}

const store = new Observable();
store.subscribe((val) => console.log('Subscriber A:', val));
store.notify(createUser('admin', 'Ada'));
