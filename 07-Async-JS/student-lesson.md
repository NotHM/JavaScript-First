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

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — verify Event Loop order and error handling in Node.js**):

- [ ] **SL-L7.1-1 (`[L1–L2 Remember/Understand]` | Std `18.1, 18.4` | `SG-U07-1`):** Order the 5 log severity levels and contrast `Promise.all()` vs. `Promise.allSettled()` in Part A with >= 80% accuracy by end of Day 58.
- [ ] **SL-L7.1-2 (`[L3 Apply]` | Std `18.5–18.7` | `SG-U07-2`):** Implement `ValidationError` and `loadGracefully` cleanly in `asyncLab.js` and verify passing Node runs by end of Day 59.
- [ ] **SL-L7.1-3 (`[L4 Analyze]` | Std `18.1–18.5` | `SG-U07-3`):** Trace the complete Part C output sequence and justify Call Stack, Microtask, and Macrotask timing before Day 60 project work.
- [ ] **SL-L7.1-4 (`[L5–L6 Evaluate/Create]` | Std `18.1–18.7` | `SG-U07-4`, `SG-U07-5`):** Design your Part D e-commerce fail-fast vs. graceful-degradation plan and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 61.
