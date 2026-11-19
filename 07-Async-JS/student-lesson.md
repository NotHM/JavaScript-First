# Student Lesson 7.1: Async Concurrency & Exception Handling (`Std 18.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../0-student_files/08-async-js/asyncLab.js`](../0-student_files/08-async-js/asyncLab.js)

## Part A: Event Loop & Error Foundations (`[L1 Remember]` & `[L2 Understand]`)
1. Identify the 5 common severity tiers from quietest debug detail to service outage (`18.4`):
   `________` → `________` → `________` → `________` → `________`
2. Contrast `Promise.all([p1, p2])` vs. `Promise.allSettled([p1, p2])` when `p2` rejects:
   - `Promise.all`: `________________________________________`
   - `Promise.allSettled`: `________________________________________`

## Part B: Custom Exception & Degradation Lab (`[L3 Apply]`)
Open [`0-student_files/08-async-js/asyncLab.js`](../0-student_files/08-async-js/asyncLab.js), implement `ValidationError` and `loadGracefully`, uncomment tests, and verify execution in Node.

## Part C: Event Loop Execution Trace (`[L4 Analyze]`)
Trace EVERY output line in order and justify each line using Call Stack / Microtask / Macrotask rules:
```javascript
console.log('1: start');
setTimeout(() => console.log('2: timeout'), 0);
Promise.resolve().then(() => {
  console.log('3: microtask-1');
  Promise.resolve().then(() => console.log('4: nested-microtask'));
});
console.log('5: end');
```
Output Sequence: `____, ____, ____, ____, ____`  
Justification: `____________________________________________________`

## Part D: Graceful Degradation Strategy (`[L5 Evaluate]` & `[L6 Create]`)
Your e-commerce homepage runs 3 concurrent fetches: **(1) Shopping Cart**, **(2) User Reviews**, and **(3) Recommended Ads**. Design which call(s) should fail-fast vs. degrade gracefully using custom errors, severity logs (`WARN` vs `ERROR`), and `finally` connection cleanup (`18.1–18.7`):  
> *(Your design)*
