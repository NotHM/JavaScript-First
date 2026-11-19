# Pre-Lesson 7.1 Evaluation: Async Concurrency & Errors (`Std 18.0`)

**Timing:** 4 min | **Score:** `____ / 4`

1. **`[L1 Remember]`** What are the three states of a JavaScript `Promise`? `__________`, `__________`, `__________`
2. **`[L2 Understand]`** Contrast **syntax/compile errors** vs **runtime errors** vs **logic errors** (`18.2–18.3`).  
   > `________________________________________________`
3. **`[L3 Apply]`** Predict the exact console order of:
   `console.log('A'); setTimeout(() => console.log('B'), 0); Promise.resolve().then(() => console.log('C')); console.log('D');`  
   → `____________________`
4. **`[L4 Analyze]`** Which `try`/`catch`/`finally` block is ALWAYS guaranteed to run whether an error is thrown OR returns normally? `__________`
