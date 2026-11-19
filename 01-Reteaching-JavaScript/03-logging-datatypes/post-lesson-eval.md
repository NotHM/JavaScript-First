# Post-Lesson 1.3 Evaluation: Exit Ticket (`Std 3.0`)

**Timing:** 5 minutes (Complete AFTER Lesson 1.3 lab) | **Score:** `____ / 5`

1. **`[L1 Remember | Std 3.1]`** Name ALL 7 primitive types in JavaScript:  
   > `______________________________________________________________`

2. **`[L2 Understand | Std 3.6]`** Explain why changing `copy[0] = 99` after `const copy = original;` also alters `original[0]`, whereas changing `let num2 = num1; num2 = 99;` leaves `num1` unchanged.  
   > *(Your explanation)*

3. **`[L3 Apply | Std 3.1]`** Write a single expression checking whether `val` is a **plain non-null non-array object**:  
   > `typeof val === "object" && ____________ && ____________`

4. **`[L4 Analyze | Std 18.2]`** Inspect the buggy condition inside `LOGprimitive`:  
   ```javascript
   if (typeof VAR !== "object" && VAR !== "function" && VAR !== null) { ... }
   ```  
   Why does passing a function `() => {}` print `"PRIMITIVE"` instead of `"NOT PRIMITIVE"`?  
   > *(Your analysis)*

5. **`[L5 Evaluate | Std 3.4 / 3.5]`** A script concatenates `str += item + "\n"` 50,000 times vs. `rows.push(item); rows.join("\n")`. Explain why `Array.join` avoids generating 50,000 temporary immutable Heap/String copies (`O(n)` vs `O(n^2)`).  
   > *(Your evaluation)*
