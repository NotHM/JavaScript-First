# Student Lesson 7.1: Promises, `async`/`await` & Events

**Reading:** [`readme.md`](./readme.md) | **Starter File:** [`../0-student_files/08-async-js/asyncLab.js`](../0-student_files/08-async-js/asyncLab.js)

## Part 1: Event Loop Prediction
In what order do `A`, `B`, `C` print?
```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
```
Order: `___` → `___` → `___`

## Part 2: Async Lab
1. Open [`0-student_files/08-async-js/asyncLab.js`](../0-student_files/08-async-js/asyncLab.js).
2. Complete `delay(ms)`, `loadData()` with `async`/`await` + `Promise.all()`, and the `EventEmitter` listener.
3. Run:
   ```bash
   node 0-student_files/08-async-js/asyncLab.js
   ```
