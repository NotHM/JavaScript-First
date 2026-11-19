const { EventEmitter } = require('node:events');

const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function runConcurrent() {
  try {
    const results = await Promise.all([
      delay(50, 'Task 1 complete'),
      delay(30, 'Task 2 complete'),
    ]);
    console.log('Concurrent results:', results);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

const emitter = new EventEmitter();
emitter.on('done', (msg) => console.log('Event received:', msg));

runConcurrent().then(() => emitter.emit('done', 'All async tasks finished'));
