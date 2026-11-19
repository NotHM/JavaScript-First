# Post-Lesson 6.2 Evaluation: Exit Ticket (`Std 5.5, 11.11–11.12`)

**Timing:** 5 min | **Score:** `____ / 5`

1. **`[L1 Remember]`** Write a single-line concise arrow function `cube` returning $n^3$: `____________________`
2. **`[L2 Understand]`** Why does `count` remain intact inside `const inc = createCounter(); inc(); inc();` even after `createCounter` finishes executing?  
   > *(Your answer)*
3. **`[L3 Apply]`** What outputs from:  
   ```javascript
   const applyTwice = (fn, x) => fn(fn(x));
   console.log(applyTwice((n) => n + 3, 10));
   ```  
   > Output: `____`
4. **`[L4 Analyze]`** Explain why setting an explicit integer `seed` on a custom PRNG helps track down a randomized physics bug in automated tests:  
   > *(Your analysis)*
5. **`[L5 Evaluate]`** Contrast `Math.random()` with `node:crypto` (`crypto.randomInt()` / `randomUUID()`). When MUST you use `crypto`?  
   > *(Your evaluation)*
