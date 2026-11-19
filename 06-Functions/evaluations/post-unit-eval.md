# Unit 6 Post-Unit Evaluation: Conditionals, Boolean Logic & Functions (`Std 5.0, 11.10–11.12`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

### Part A — Paired Mastery (1 pt each)

1. **`[L1 Remember | Std 5.2]`** Complete the 4 rows of the **XOR** (`a !== b`) and **NOR** (`!(a || b)`) columns:  
   | `a` | `b` | `a XOR b` | `a NOR b` |
   |---|---|---|---|
   | `false` | `false` | `___` | `___` |
   | `false` | `true` | `___` | `___` |
   | `true` | `false` | `___` | `___` |
   | `true` | `true` | `___` | `___` |

2. **`[L2 Understand | Std 5.2]`** Apply **De Morgan's Law**: rewrite `!(isAdmin || isVerified)` using `&&` without outer parentheses: `______________________`.
3. **`[L3 Apply | Std 5.5]`** Trace output:  
   ```javascript
   const makeAdder = (n) => (x) => n + x;
   const addTen = makeAdder(10);
   console.log(addTen(4), makeAdder(2)(3));
   ```  
   > Output: `____`, `____`
4. **`[L3 Apply | Std 5.1]`** Predict what short-circuits when running: `false && expensiveCheck()` → `______` (Does `expensiveCheck()` execute? `____`).
5. **`[L4 Analyze | Std 5.4]`** Spot the `switch` bug below and explain exact output for `role = "editor"`:  
   ```javascript
   switch ("editor") {
     case "editor": perms += "write ";
     case "viewer": perms += "read "; break;
     default: perms += "none";
   }
   ```  
   > *(Your output & bug)*
6. **`[L4 Analyze | Std 11.12]`** Why can passing a fixed integer `seed` into a deterministic PRNG (`nextRandom()`) help automated debugging compared to raw `Math.random()`?  
   > *(Your answer)*

### Part B — Higher-Order Refactoring & Design (2 pts each)

7. **`[L5 Evaluate | Std 5.4 / 11.10]`** Refactor this deeply nested "Arrow Code" using clean early-return **Guard Clauses** (`Std 11.10`) and defend why readability improves:  
   ```javascript
   function approveAccess(user) {
     if (user !== null) {
       if (user.active) {
         if (user.age >= 18) return "GRANTED";
         else return "UNDERAGE";
       } else return "INACTIVE";
     } else return "MISSING_USER";
   }
   ```  
   ```javascript
   // Refactored clean version:
   ```
8. **`[L5 Evaluate | Std 5.5]`** Contrast relying on a shared `let globalCount = 0` variable vs. encapsulating `let count = 0` inside a closure factory `createCounter()`. Cite one testing/security benefit.  
   > *(Your evaluation)*
9. **`[L6 Create | Std 5.2 / 5.5]`** Write a pure curried discount builder `discountBy(rate)(cents)` that validates `rate >= 0 && rate <= 1`, otherwise returns `null`, and computes integer discounted cents cleanly.  
   ```javascript
   // Write your curried helper below:
   ```
