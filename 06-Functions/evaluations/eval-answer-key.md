# Unit 6 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. **C** (`NOR`) | 2. **B** (`break`) | 3. **B** | 4. **C** | 5. `15` | 6. `true`
7. Inner function maintains a reference to its outer lexical scope even after `createCounter()` returns.
8. `Math.random()` produces non-reproducible sequences across test runs, making intermittent failures impossible to replay cleanly without a seed.

## Post-Unit Key (12 pts)
1. `XOR`: `(F, F)->F, (F, T)->T, (T, F)->T, (T, T)->F`; `NOR`: `(F, F)->T, (F, T)->F, (T, F)->F, (T, T)->F`.
2. `!isAdmin && !isVerified`
3. `14`, `5`
4. `false`; **No** (`&&` short-circuits when left operand is falsy).
5. `perms` becomes `"write read "` because `case "editor"` is missing `break;`, falling into `case "viewer"`.
6. Same seed guarantees exact identical pseudo-random output sequence across unit tests and bug reproductions.
7. **2 pts (Guard Clause Refactoring):**
   ```javascript
   function approveAccess(user) {
     if (!user) return "MISSING_USER";
     if (!user.active) return "INACTIVE";
     if (user.age < 18) return "UNDERAGE";
     return "GRANTED";
   }
   ```
   Eliminates horizontal indentation nesting and highlights preconditions immediately.
8. **2 pts:** Global variable leaks state across unrelated modules/tests causing flaky races; closure isolates state per instance so tests run independently without tampering.
9. **2 pts:** `const discountBy = (rate) => (cents) => (rate < 0 || rate > 1) ? null : Math.round(cents * (1 - rate));`
