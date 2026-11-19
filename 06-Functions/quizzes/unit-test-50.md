# Unit 6 Mastery Exam: Conditionals, Boolean Logic, Closures & Functions (50 Questions)

**Course:** JavaScript First — Software & App Design (`AZ CTE Stds 5.0, 11.10–11.12`)  
**Reading & Setup:** [Chapter 6 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each item from `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. Which of the following values evaluates as **truthy** in JavaScript Boolean checks (`Boolean(val)`)?
   - A) `"false"`
   - B) `0`
   - C) `""`
   - D) `NaN`

2. Which JavaScript expression accurately implements logical **XOR** (exclusive OR: true only when inputs have opposite truthiness) across any operand types?
   - A) `a && b`
   - B) `a || b`
   - C) `Boolean(a) !== Boolean(b)`
   - D) `!(a || b)`

3. Under what condition does a Boolean **NOR** gate (`!(a || b)`) evaluate to `true`?
   - A) Both `a` and `b` are truthy
   - B) Exactly one of `a` or `b` is truthy
   - C) `a` is truthy regardless of `b`
   - D) Both `a` and `b` are falsy

4. Which keyword inside a `switch` case prevents execution from falling directly into subsequent cases?
   - A) `continue`
   - B) `break`
   - C) `yield`
   - D) `skip`

5. Which signature defines an ES6 **default parameter** when an argument is omitted or `undefined`?
   - A) `function greet(name = 'Guest') {}`
   - B) `function greet(name := 'Guest') {}`
   - C) `function greet(default name 'Guest') {}`
   - D) `function greet(name) || 'Guest' {}`

6. What does an **IIFE** (`(() => { /* code */ })();`) immediately accomplish?
   - A) Compiles the file to WebAssembly bytecode
   - B) Delays execution until after `setTimeout(..., 1000)`
   - C) Executes a function right away inside a private isolated scope without polluting globals
   - D) Exports all internal constants automatically to `module.exports`

7. Which built-in Node.js module should generate cryptographically secure random session tokens or API keys?
   - A) `Math.random()`
   - B) `node:os`
   - C) `node:url`
   - D) `node:crypto`

8. Within what numeric range does standard `Math.random()` generate values?
   - A) `[1, 100]` inclusive of both endpoints
   - B) `[0, 1)` (includes `0`, strictly less than `1`)
   - C) `[-1, 1]` inclusive
   - D) `(0, 1]` (excludes `0`, includes `1`)

9. What functional technique transforms `multiply(a, b)` into nested single-argument closures `multiply(a)(b)`?
   - A) Hoisting
   - B) Recursion
   - C) Currying
   - D) Destructuring

10. Which property defines a **pure function**?
    - A) It returns deterministic outputs solely from inputs with zero external side effects
    - B) It mutates at least one global configuration object on each call
    - C) It always triggers an HTTP request before returning
    - D) It requires `var` declarations instead of `const`

---

## Part B: Concepts & Mental Models (`[L2 Understand]` — Questions 11–20)

11. How does the nullish coalescing operator (`score ?? 70`) improve upon logical OR (`score || 70`) when defaulting test scores?
    - A) `??` rounds floats upward automatically
    - B) `??` triggers fallback ONLY for `null` or `undefined`, preserving valid falsy scores like `0`
    - C) `||` cannot compare numbers at all
    - D) `??` converts `"0"` to `70` safely

12. According to **De Morgan's Laws**, why is `!(A && B)` logically equivalent to `!A || !B`?
    - A) Both expressions require `A` and `B` to be equal strings
    - B) `&&` and `||` always return `null` on primitives
    - C) `A && B` fails whenever at least one condition (`!A` OR `!B`) is false
    - D) Negating `A` automatically flips `B` to truthy

13. How does JavaScript's **short-circuit evaluation** handle `isReady && runExpensiveScan()` when `isReady` is `false`?
    - A) Immediately returns `false` without invoking `runExpensiveScan()`
    - B) Runs `runExpensiveScan()` first, then discards its return value
    - C) Throws a `TypeError` because the right side wasn't called
    - D) Retries `isReady` inside a microtask

14. Why can you invoke a **function declaration** (`function square(n) { ... }`) above the line where it appears, whereas calling a `const square = (n) => n * n;` expression above its line throws `ReferenceError`?
    - A) Arrow functions are forbidden inside CommonJS files
    - B) Declarations run asynchronously while arrow functions run synchronously
    - C) Node strips `const` declarations during syntax parsing
    - D) Function declarations are hoisted fully initialized to top of scope; `const` expressions stay in the Temporal Dead Zone until executed

15. How does an **arrow function's `this`** binding differ from a traditional `function() {}` expression?
    - A) Arrows bind `this` to `null` inside objects permanently
    - B) Arrow functions capture lexical `this` from the surrounding scope rather than taking a dynamic call-site `this`
    - C) Arrow functions create a brand-new prototype chain per invocation
    - D) Traditional functions cannot access local variables

16. What makes a JavaScript **closure** capable of retaining state after its outer factory finishes returning?
    - A) Outer variables automatically copy onto `window` / `globalThis`
    - B) JavaScript serializes the outer function as JSON text
    - C) The inner function bundles a live reference to its enclosing lexical environment variables
    - D) V8 forbids garbage collection on every file in the repo

17. Under AZ CTE Standard `11.10`, why do engineers refactor deep nested `if { if { if { ... } } }` pyramids into flat **Guard Clauses**?
    - A) Guard clauses eliminate deep nesting, fail/exit invalid cases early, and keep the main success path linear and readable
    - B) Guard clauses double CPU clock speed in V8
    - C) Nested `if` statements throw `SyntaxError` in strict mode
    - D) Guard clauses remove the need for `return` keywords

18. Why can a seeded LCG PRNG (`createSeededRng(42)`) replay identical sequences across laptops and CI runners while `Math.random()` cannot?
    - A) Seeded LCG reads `/dev/urandom` synchronously
    - B) `Math.random()` uses only timestamps rounded to whole minutes
    - C) Seeded LCG runs on GPU shaders
    - D) Seeded LCG updates private `state` via deterministic arithmetic seeded explicitly by the caller

19. Why must session IDs, reset links, and CSRF secrets NEVER rely on `Math.random()` or a 32-bit seeded LCG?
    - A) `Math.random()` throws exceptions inside HTTPS servers
    - B) LCG generators only emit negative integers
    - C) Predictable 32-bit PRNG state allows attackers to deduce future tokens after observing outputs—requiring `node:crypto` CSPRNG instead
    - D) `node:crypto` is only needed for sorting arrays

20. What makes a **Higher-Order Function (HOF)** like `applyOperation(values, fn)` valuable for modular architecture?
    - A) It forces every callback to use global variables
    - B) Accepting functions as parameters or returning functions decouples traversal/control flow from specific transformation logic
    - C) It converts objects into XML strings automatically
    - D) It removes parameters from function signatures

---

## Part C: Applied Tracing & Code Execution (`[L3 Apply]` — Questions 21–30)

21. Evaluate the nested ternary expression when `score = 85` and `honor = false`:
    ```javascript
    const status = score >= 70 ? (honor ? 'HONOR' : 'PASS') : 'RETRY';
    ```
    - A) `'PASS'`
    - B) `'HONOR'`
    - C) `'RETRY'`
    - D) `undefined`

22. Apply **De Morgan's Law** to rewrite `!(isAdmin || isVerified)` cleanly without outer parentheses:
    - A) `!isAdmin || !isVerified`
    - B) `isAdmin && !isVerified`
    - C) `!isAdmin || isVerified`
    - D) `!isAdmin && !isVerified`

23. What pair does `console.log(0 || 70, 0 ?? 70)` print?
    - A) `0, 0`
    - B) `0, 70`
    - C) `70, 0`
    - D) `70, 70`

24. Trace exact console output:
    ```javascript
    const add = (n) => (x) => n + x;
    const addTen = add(10);
    console.log(addTen(4), add(2)(3));
    ```
    - A) `10, 5`
    - B) `14, 5`
    - C) `14, 6`
    - D) `4, 3`

25. Suppose `createCounter(start = 0)` returns a function incrementing and returning private `count`. What prints?
    ```javascript
    const c1 = createCounter(5);
    c1();
    console.log(c1(), createCounter(5)());
    ```
    - A) `6, 6`
    - B) `6, 7`
    - C) `7, 7`
    - D) `7, 6`

26. A badge rule requires `user.verified === true`, `user.suspended === false`, and strictly `XOR(user.hasTempPassA, user.hasTempPassB)` (returning `'DENIED_PASS_CONFLICT'` if XOR fails). What returns for `{ verified: true, suspended: false, hasTempPassA: true, hasTempPassB: true }`?
    - A) `'DENIED_PASS_CONFLICT'`
    - B) `'ACCESS_GRANTED'`
    - C) `'DENIED_SUSPENDED'`
    - D) `'DENIED_UNVERIFIED'`

27. What does calling `makeUser(7)` return?
    ```javascript
    const makeUser = (id) => ({ id, active: true });
    ```
    - A) `undefined`
    - B) `7`
    - C) `{ id: 7, active: true }`
    - D) `SyntaxError`

28. Using standard grading bounds (`>=90: 'A'`, `>=80: 'B'`, `>=70: 'C'`, `>=60: 'D'`, `<60: 'F'`), what should `getLetterGrade(80)` return?
    - A) `'A'`
    - B) `'B'`
    - C) `'C'`
    - D) `'F'`

29. Given `const applyOperation = (arr, op) => arr.map(op);`, what does `applyOperation([2, 3, 4], (n) => n * n)` return?
    - A) `[4, 9, 16]`
    - B) `[2, 3, 4]`
    - C) `[4, 6, 8]`
    - D) `29`

30. Trace what `tagItems(undefined, 4, 8)` returns with default and rest parameters:
    ```javascript
    function tagItems(prefix = 'ID', ...ids) {
      return `${prefix}:${ids.length}`;
    }
    ```
    - A) `'undefined:2'`
    - B) `'ID:1'`
    - C) `'ID:2'`
    - D) `SyntaxError`

---

## Part D: Debugging, Diagnostics & Trace Analysis (`[L4 Analyze]` — Questions 31–40)

31. Why does `if (1 < 99 < 5)` evaluate to `true` in JavaScript?
    - A) JavaScript treats `<` as unordered set membership
    - B) `99` is coerced into `'9'` alphabetically
    - C) Left-to-right parsing computes `(1 < 99)` as `true` (numeric `1`), and `1 < 5` is `true`
    - D) `<` returns the midpoint boolean

32. For `role = "editor"`, why does this `switch` produce `perms = "write read "`?
    ```javascript
    let perms = '';
    switch (role) {
      case 'editor': perms += 'write ';
      case 'viewer': perms += 'read '; break;
      default: perms += 'none';
    }
    ```
    - A) `+=` concatenates all cases automatically
    - B) Missing `break;` inside `case 'editor'` causes execution to fall directly into `case 'viewer'`
    - C) `switch` always executes the next alphabetical case
    - D) Strings ignore `break` inside functions

33. Why does `const makeObj = (x) => { x: x };` return `undefined` when called as `makeObj(10)`?
    - A) Arrow functions cannot accept `x` as parameter
    - B) Semicolons inside objects are illegal
    - C) JavaScript forbids returning objects from arrow functions
    - D) Braces without parentheses parse `{ x: x }` as a function block containing label `x:` and no `return` statement

34. Running `const fns = []; for (var i = 0; i < 3; i++) fns.push(() => i); console.log(fns.map(f => f()));` prints `[3, 3, 3]`. Why?
    - A) `var i` creates one shared function-scoped binding across all iterations rather than per-iteration block `let` bindings
    - B) `.push()` invokes arrow functions immediately
    - C) `i++` increments after `.map()` completes
    - D) Arrow closures cannot read loop variables

35. Spot the authentication defect in:
    ```javascript
    if (user.role = 'admin') {
      grantDashboard();
    }
    ```
    - A) `'admin'` must use double quotes
    - B) `grantDashboard` is missing a semicolon
    - C) Single `=` mutates `user.role` to `'admin'` and evaluates to truthy `'admin'`, granting admin access unconditionally
    - D) `=` checks strict deep equality cleanly

36. Calling `countDown(3)` below crashes the runtime instead of stopping at zero. Why?
    ```javascript
    function countDown(n) {
      return countDown(n - 1);
    }
    ```
    - A) Recursive functions must use `while` loops internally
    - B) Without a base case (`if (n <= 0) return 0;`), infinite recursion overflows the Call Stack (`RangeError: Maximum call stack size exceeded`)
    - C) Returning a function call triggers `SyntaxError`
    - D) Decrementing `n - 1` coerces numbers to `undefined`

37. A CLI dispatcher runs `handleCommand('RESTART')` and unexpectedly hits `default: return 'UNKNOWN'`, even though `case 'restart':` exists. What is missing?
    - A) Case normalization (`cmd.trim().toLowerCase()`) before strict `===` `switch` matching
    - B) Removing `break` after `case 'restart'`
    - C) Converting `cmd` with `Number(cmd)`
    - D) Declaring `cmd` with `var`

38. A student implements XOR as `const xor = (a, b) => Boolean(a ^ b);` and tests `xor('badgeA', 'badgeB')` vs `xor('badgeA', false)`. Why does `xor('badgeA', 'badgeB')` pass accidentally only to break on `xor('badgeA', '')` (`false`) or valid pairs?
    - A) `^` works identically to `!==` on strings
    - B) `Boolean()` strips quotes from string tokens
    - C) `^` throws `SyntaxError` on non-numbers
    - D) Bitwise `^` converts non-numeric strings to `NaN -> 0`, turning `xor('badgeA', 'badgeB')` into `Boolean(0 ^ 0) = false` and `xor('badgeA', false)` into `Boolean(0 ^ 0) = false`!

39. Why does `function addTax(price) { runningTotal += price * 1.08; return runningTotal; }` fail unit-test repeatability?
    - A) `1.08` causes `SyntaxError` in Node 24
    - B) `return` cannot follow `+=`
    - C) Mutating external `runningTotal` makes the function impure so outputs depend on how many prior tests ran
    - D) Parameters in JS are read-only constants

40. Inspect this guard refactor:
    ```javascript
    function verifyAge(user) {
      if (!user) return 'MISSING';
      if (user.age = 18) return 'OK';
      return 'UNDERAGE';
    }
    ```
    Why does `verifyAge({ age: 12 })` return `'OK'`?
    - A) `!user` skips objects with integer fields
    - B) `user.age = 18` assigns `18` instead of testing `user.age < 18`
    - C) `18` is falsy in strict mode
    - D) Missing braces break single-line `if` returns

---

## Part E: Architecture & Tradeoff Evaluation (`[L5 Evaluate]` — Questions 41–50)

41. You inherit a 120-line access verifier with five nested `if/else` levels. Refactoring per `AZ CTE Std 11.10`, which structure delivers the cleanest readability and lowest cognitive load?
    - A) Flat sequential early-return Guard Clauses checking null/unverified/suspended failures up front before returning `'GRANTED'`
    - B) Deeply nested ternary operators chaining 5 `? :` levels onto one line
    - C) Wrapping all 5 checks in `try/catch` blocks throwing strings
    - D) Converting every `if` into a `while` loop with `break`

42. Maintaining 15 static command-to-handler routes (`'help'`, `'status'`, `'deploy'`, ...), why does a **`Map` dispatch table** beat a long `switch` statement?
    - A) `Map` automatically compiles handlers to native C addons
    - B) `switch` cannot evaluate string values
    - C) `Map` converts functions to JSON strings
    - D) `Map` eliminates `break` fall-through bugs, executes `O(1)` lookup, prevents prototype-key collisions (`__proto__`), and registers plugins cleanly

43. Why should a rate-limiter track `attempts` via a closure factory (`createRateLimiter(maxAttempts)`) instead of `let globalAttempts = 0`?
    - A) Global variables cannot store numbers past `255`
    - B) Closures run inside worker threads automatically
    - C) Closure encapsulation blocks external mutation, isolates independent limiters per user/route, and keeps unit tests order-independent
    - D) `globalAttempts` turns integers into floats

44. An engineering team builds both (1) a repeatable weather/loot simulator tested in CI and (2) an account password-reset token endpoint. Which RNG pairing is architecturally sound?
    - A) Use `Math.random()` for both systems
    - B) Use a closure **seeded LCG PRNG** for repeatable CI tests and **`node:crypto` CSPRNG** (`randomBytes`/`randomUUID`) for security tokens
    - C) Use `node:crypto` with seed `42` for tokens and `Math.random()` for security keys
    - D) Use a hardcoded `const TOKEN = '1234'` for both

45. Inside `const createPriceCalc = (taxRate) => { ... return (cents) => ...; }`, why should `if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 1) throw new RangeError(...)` run inside the **outer factory** immediately rather than inside the inner returned function?
    - A) Fail-fast outer validation catches misconfigured tax rates once at construction time instead of repeating invalid setup silently until checkout fails
    - B) `Number.isFinite` cannot run inside returned functions
    - C) Outer validation avoids closures altogether
    - D) Inner functions discard `RangeError` automatically

46. When writing pure financial helpers (`multiply`, `discountBy(rate)(cents)`), why guard arguments with `Number.isFinite(val)` instead of trusting coercion?
    - A) `Number.isFinite` rounds decimals to pennies
    - B) Coercion skips negative numbers automatically
    - C) `Number.isFinite` turns `undefined` into `0`
    - D) It rejects `NaN`, `Infinity`, and non-numeric inputs immediately before silent `NaN` corruption spreads through downstream calculations

47. Comparing `filterRecords(rows, predicateFn)` (accepting a callback) vs. copying loop boilerplate inside separate `filterActive()`, `filterAdmins()`, and `filterVerified()` functions: why prefer the Higher-Order helper?
    - A) Duplicate loops execute twice as fast as callbacks
    - B) Separating traversal from predicate strategy honors DRY and Open/Closed design—new rules plug in without duplicating loop/guard logic
    - C) Callbacks bypass Array iteration bounds
    - D) `filterActive()` cannot return new arrays

48. Evaluating retry configuration `const delay = options.delayMs ?? 250;` vs `const delay = options.delayMs || 250;` when callers intentionally pass `delayMs: 0` for instant unit tests: why is `??` mandatory?
    - A) `||` rejects strings shorter than 3 characters
    - B) `??` executes `options.delayMs` asynchronously
    - C) `0` is falsy under `||` (forcing an unwanted `250ms` delay), whereas `??` treats `0` as a valid defined value
    - D) `??` deletes negative options from `options`

49. Why break a tangled 90-line callback handler into small, named pure helpers (`validateInput`, `computeDiscount`, `formatResult`)?
    - A) Named pure helpers yield clear stack traces, unit-test independently without mocks, and eliminate deeply indented callback chains
    - B) Anonymous functions cannot capture closures in Node 24
    - C) Node stops parsing files containing more than one arrow function
    - D) Named functions omit stack frames entirely

50. Comparing two configurable rules engines—Design X parses rule strings via `eval()` and calls `Math.random()`, while Design Y composes pure Boolean/guard predicates and injects `createSeededRng(seed)`—why must Design Y ship?
    - A) `eval()` is required for currying in JavaScript
    - B) `Math.random()` prevents closures from reading outer variables
    - C) Pure predicates prevent JSON serialization
    - D) Design X introduces arbitrary code injection (`eval`) and flaky non-deterministic tests, whereas Design Y guarantees security and 100% reproducible verification
