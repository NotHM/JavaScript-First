# Unit 4 Post-Unit Evaluation: Scope & Immutability (`Std 3.3, 18.2`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

### Part A — Paired Mastery (1 pt each)

1. **`[L1 Remember | Std 3.3]`** Contrast `let` vs. `const`: which permits variable binding reassignment and which prevents it?  
   > *(Your answer)*
2. **`[L2 Understand | Std 3.3]`** What does `Object.freeze(obj)` prevent vs. NOT prevent on a nested object `{ settings: { dark: true } }`?  
   > *(Your answer)*
3. **`[L3 Apply | Std 3.3]`** Predict exact output:  
   ```javascript
   const x = 10;
   function demo() {
     const x = 20;
     if (true) {
       const x = 30;
       console.log(x);
     }
     console.log(x);
   }
   demo();
   console.log(x);
   ```  
   > Output lines: `____`, `____`, `____`
4. **`[L3 Apply | Std 3.3]`** Evaluate each expression (`true` or `false`):  
   - `"0" == 0` → `______` | `"0" === 0` → `______`
5. **`[L4 Analyze | Std 18.2]`** Why does `"use strict"; const cfg = Object.freeze({ port: 3000 }); cfg.port = 8080;` throw `TypeError` in strict mode, yet `{ ...cfg }` does NOT throw when mutated?  
   > *(Your analysis)*
6. **`[L4 Analyze | Std 3.6]`** Spot the aliasing bug below and write the 1-line fix:  
   ```javascript
   const base = { tags: ["js", "node"] };
   const draft = { ...base };
   draft.tags.push("cte");
   ```  
   > *(Fix)*

### Part B — Higher-Order Transfer (2 pts each)

7. **`[L4 Analyze | Std 3.3 / 18.2]`** Explain why the classic `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 10); }` prints `3, 3, 3` while changing `var` to `let` prints `0, 1, 2`.  
   > *(Your explanation)*
8. **`[L5 Evaluate | Std 3.5 / 3.6]`** Your API serves an immutable 10,000-element catalog. Should you deep-clone all 10,000 objects on every read request, or use `Object.freeze` + structural sharing? Evaluate the time/memory tradeoff.  
   > *(Your evaluation)*
9. **`[L6 Create | Std 3.3 / 3.6]`** Write a pure update function `updateNestedTheme(state, newTheme)` that returns a brand-new deep clone with `state.ui.theme` updated to `newTheme` without mutating `state`.  
   ```javascript
   // Write your function below:
   ```
