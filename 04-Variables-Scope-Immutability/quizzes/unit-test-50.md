# Unit 4 Mastery Exam: Variables, Scope, Hoisting, Operators & Immutability (50 Questions)

**Course:** JavaScript First — High School CTE (Grades 11–12) & Community College CIS (`AZ CTE Stds 3.3, 3.4, 3.6, 18.2, 18.3` | `ITS-JS`, `CIW-JS`, `CompTIA-ITF+`)  
**Reading & Setup:** [Chapter 4 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for items `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. Which JavaScript variable keyword obeys **function / module scope only** and ignores `{ }` `if`/`for` block boundaries?
   - A) `var`
   - B) `let`
   - C) `const`
   - D) `static`

2. Which two variable keywords enforce **block scope** (`{ ... }`) in modern JavaScript (`ES6+`)?
   - A) `var` and `let`
   - B) `global` and `var`
   - C) `var` and `const`
   - D) `let` and `const`

3. What three lifecycle phases does a JavaScript variable pass through inside its enclosing scope?
   - A) Compilation, Rendering, and Caching
   - B) Declaration, Initialization, and Assignment / Usage
   - C) Allocation, Compression, and Garbage Collection
   - D) Parsing, Minification, and Transport

4. What runtime exception is thrown when code attempts to reassign a `const` variable binding?
   - A) `SyntaxError`
   - B) `RangeError`
   - C) `TypeError: Assignment to constant variable`
   - D) `DataCloneError`

5. What runtime exception occurs when reading a `let` or `const` variable above its declaration line?
   - A) `TypeError`
   - B) `URIError`
   - C) `EvalError`
   - D) `ReferenceError`

6. What term describes the region between entering a `{ ... }` block and reaching a `let`/`const` variable's initialization line?
   - A) Garbage Collection Window
   - B) Temporal Dead Zone (TDZ)
   - C) Strict Shadow Zone
   - D) Lexical Closure Heap

7. Which equality operator performs strict comparison on both value and data type with zero implicit type coercion?
   - A) `===`
   - B) `==`
   - C) `=`
   - D) `!=`

8. In software development, when should a programmer declare an identifier as a **constant** rather than a mutable variable?
   - A) Only for loop counters that increment on every iteration
   - B) For temporary scratch values mutated inside event handlers
   - C) For fixed values like tax rates or configuration caps that must never be accidentally reassigned
   - D) Only inside CSS stylesheets

9. While blocking the addition or deletion of keys, what does `Object.seal(obj)` still allow on an object?
   - A) Deleting nested arrays
   - B) Bypassing `const` reassignment errors
   - C) Converting the object into a primitive
   - D) Modifying values of already-existing properties

10. What does `Object.freeze(obj)` prevent on an object's top-level properties?
   - A) Reading properties inside `console.log()`
   - B) Adding, deleting, or reassigning top-level property values
   - C) Modifying deeply nested sub-objects two levels down
   - D) Cloning the object with `{ ...obj }`

---

## Part B: Concepts & Comparisons (`[L2 Understand]` — Questions 11–20)

11. Why does `const user = { role: 'student' }; user.role = 'developer';` execute cleanly without throwing?
   - A) `const` locks the Stack reference binding, NOT the mutable properties stored inside the Heap object
   - B) `const` only applies to numbers and booleans
   - C) Objects automatically freeze only after 10 seconds
   - D) JavaScript ignores property writes on `const` variables

12. How does `'use strict'` (or ES Module execution) alter running an undeclared assignment such as `score = 100;`?
   - A) It automatically prepends `var` silently
   - B) It rounds the number down to `0`
   - C) It throws an immediate `ReferenceError` instead of creating an accidental property on `globalThis`
   - D) It converts the variable into a frozen constant

13. How does hoisting initialization differ between `var` declarations and `let`/`const` declarations?
   - A) Neither `var` nor `let` is recognized before execution
   - B) `const` hoists its assigned value above line 1
   - C) `let` initializes to `null`, whereas `var` throws `ReferenceError`
   - D) `var` hoists initialized to `undefined`, whereas `let`/`const` hoist uninitialized inside the Temporal Dead Zone (`TDZ`)

14. Why does `for (var i = 0; i < 3; i++) callbacks.push(() => i)` return `[3, 3, 3]`, while replacing `var` with `let` returns `[0, 1, 2]`?
   - A) `let` counts backwards from `3`
   - B) `var` shares one function-scoped slot across every iteration; `let` allocates a fresh block binding per iteration
   - C) `var` executes callbacks synchronously inside `for`
   - D) JavaScript prohibits closures inside `var` loops

15. Why does `"5" == 5` evaluate to `true` whereas `"5" === 5` evaluates to `false`?
   - A) Loose `==` performs implicit type coercion before comparing, while strict `===` requires matching types and values
   - B) `===` parses strings alphabetically
   - C) `"5"` is converted into a `Symbol` by `===`
   - D) `==` checks Heap memory pointers

16. How does `Object.is(NaN, NaN)` behave compared to strict `NaN === NaN`?
   - A) Both return `false`
   - B) Both return `true`
   - C) `Object.is(NaN, NaN)` returns `true`, whereas `NaN === NaN` returns `false`
   - D) `Object.is(NaN, NaN)` throws `TypeError`

17. Why does `const locked = Object.freeze({ nested: { x: 1 } });` still allow `locked.nested.x = 9;`?
   - A) Numbers inside objects ignore `Object.freeze`
   - B) `locked` used `const` instead of `let`
   - C) Nested objects bypass `'use strict'` mode automatically
   - D) `Object.freeze()` is shallow and only freezes direct top-level properties, leaving nested Heap objects mutable

18. Why is `structuredClone(obj)` superior to `JSON.parse(JSON.stringify(obj))` for cloning rich application state?
   - A) It automatically freezes every nested array
   - B) It handles circular references natively and preserves `Date`, `Map`, `Set`, `undefined`, and `BigInt`
   - C) It converts all functions into arrow strings
   - D) It skips copying nested sub-objects for speed

19. What happens when attempting `frozen.port = 8080` on a frozen object in non-strict sloppy mode versus `'use strict'` mode?
   - A) It fails silently as a no-op in sloppy mode, whereas `'use strict'` throws `TypeError: Cannot assign to read only property`
   - B) Sloppy mode throws `ReferenceError` while strict mode overwrites the property
   - C) Both modes mutate `frozen.port` to `8080`
   - D) Both modes delete the `port` key

20. What does **variable shadowing** mean inside nested lexical scopes?
   - A) Deleting an outer global variable from disk
   - B) Calling a `const` arrow function recursively
   - C) Declaring a variable with the same name in an inner scope, temporarily hiding the outer binding without overwriting it
   - D) Copying an array with `{ ...arr }`

---

## Part C: Code Tracing & Output Prediction (`[L3 Apply]` — Questions 21–30)

21. What prints to the console when executing `console.log(x); var x = 7;`?
   - A) `7`
   - B) `null`
   - C) `ReferenceError`
   - D) `undefined`

22. What happens when executing `console.log(y); let y = 7;`?
   - A) Logs `7`
   - B) Throws `ReferenceError: Cannot access 'y' before initialization`
   - C) Logs `undefined`
   - D) Logs `null`

23. What prints from: `if (true) { var flag = 'on'; } console.log(flag);`?
   - A) `'on'`
   - B) `undefined`
   - C) `ReferenceError`
   - D) `TypeError`

24. What happens from: `if (true) { let flag = 'on'; } console.log(flag);`?
   - A) Prints `'on'`
   - B) Prints `undefined`
   - C) Throws `ReferenceError: flag is not defined`
   - D) Prints `false`

25. Evaluate `(0 == "")` and `(0 === "")` in JavaScript:
   - A) `false, false`
   - B) `false, true`
   - C) `true, true`
   - D) `true, false`

26. Evaluate `(null == undefined)` and `(null === undefined)`:
   - A) `true, false`
   - B) `false, false`
   - C) `true, true`
   - D) `false, true`

27. What is `orig.scores` after running: `const orig = { scores: [10] }; const copy = { ...orig }; copy.scores.push(20);`?
   - A) `[10]`
   - B) `[]`
   - C) `[10, 20]`
   - D) Throws `TypeError`

28. What is `orig.scores` after running: `const orig = { scores: [10] }; const copy = structuredClone(orig); copy.scores.push(20);`?
   - A) `[10, 20]`
   - B) `[10]`
   - C) `undefined`
   - D) Throws `DataCloneError`

29. Executing `greet('AZ')` on line 1 BEFORE `function greet(name) { return name; }` declared on line 5 evaluates to:
   - A) `undefined`
   - B) `TypeError`
   - C) `ReferenceError`
   - D) `'AZ'` (function declarations hoist completely)

30. Under `'use strict';`, executing `const cfg = Object.freeze({ mode: 'prod' }); cfg.mode = 'dev';` causes:
   - A) `TypeError: Cannot assign to read only property 'mode'`
   - B) `cfg.mode` resets to `undefined`
   - C) `cfg.mode` changes silently to `'dev'`
   - D) `ReferenceError: cfg is not defined`

---

## Part D: Bug Diagnostics & Scope Analysis (`[L4 Analyze]` — Questions 31–40)

31. Calling `sayHi()` on line 1 BEFORE `var sayHi = () => 'hi';` throws `TypeError: sayHi is not a function` instead of `ReferenceError`. Why?
   - A) Arrow functions never throw errors
   - B) `var` puts functions inside the Temporal Dead Zone
   - C) `var sayHi` hoisted and initialized to `undefined`, so line 1 attempted to invoke `undefined()`
   - D) `'use strict'` disables arrow functions

32. Calling `sayHi()` on line 1 BEFORE `const sayHi = () => 'hi';` throws what exact error?
   - A) `TypeError: sayHi is not a function`
   - B) `ReferenceError: Cannot access 'sayHi' before initialization` (TDZ)
   - C) `SyntaxError: Unexpected token =>`
   - D) `RangeError: Maximum call stack size exceeded`

33. Calling `outer()()` on `function outer() { const x = 5; return function inner() { return x * 2; }; }` returns `10` instead of throwing `ReferenceError`. Why?
   - A) `const x` hoisted automatically onto `globalThis`
   - B) `Array.from()` shallow-copied `x`
   - C) Strict mode disables the Temporal Dead Zone inside inner functions
   - D) Lexical closure: `inner()` retains access to variables in its enclosing `outer()` scope even after `outer()` returns

34. A Redux reducer runs `const next = { ...state }; next.player.inventory.push('shield');` and accidentally corrupts all previous undo snapshots. What defect occurred?
   - A) Shallow-copy aliasing bug: `{ ...state }` copied the nested `player` and `inventory` reference instead of deep cloning
   - B) `push()` runs asynchronously on the Heap
   - C) `const` forbids array `.push()` inside functions
   - D) Spread creates `Object.seal` locks automatically

35. A router rejects valid ephemeral port `0` using `if (port == false) throw Error('Bad port');`. Why did `port = 0` fail that guard?
   - A) Port `0` is undefined in Node 24
   - B) `==` checks strict integer type equality
   - C) Loose `==` coerced `0 == false` to `true`; replace with `port === false` or `typeof port !== 'number'`
   - D) `false` is truthy in strict mode

36. Trace: `let n = 10; { let n = 99; } console.log(n);` — what logs and why?
   - A) `99`, because `{ }` blocks share `let` bindings
   - B) `10`, because inner `let n` created a separate block-scoped variable shadowing the outer `n`
   - C) `SyntaxError: Identifier 'n' already declared`
   - D) `undefined`, because `n` entered the TDZ

37. Trace: `let n = 10; { n = 99; } console.log(n);` — what logs and why?
   - A) `10`, because `{ }` blocks freeze outer variables
   - B) `undefined`
   - C) `ReferenceError`
   - D) `99`, because omitting `let` inside the block reassigned the outer lexical `n`

38. Why does `JSON.parse(JSON.stringify(node))` crash on `const node = {}; node.self = node;` while `structuredClone(node)` succeeds cleanly?
   - A) `JSON.stringify` rejects circular object graphs with `TypeError`, whereas `structuredClone` tracks and preserves cyclic references
   - B) `structuredClone` deletes circular properties silently
   - C) `JSON.stringify` forbids empty objects
   - D) `JSON.parse` only executes in browsers

39. Under `'use strict';`, analyze: `const box = Object.seal({ count: 1 }); box.count = 2; box.extra = 3;`. Where does it fail?
   - A) Fails on `box.count = 2` (`seal` freezes all values)
   - B) Fails immediately on `Object.seal` with `DataCloneError`
   - C) `box.count = 2` succeeds (existing keys remain writable), and `box.extra = 3` throws `TypeError: Cannot add property extra, object is not extensible`
   - D) Both assignments succeed silently

40. Which primitive data types best suit representing an exact integer cent count, an active status flag, and a student's full name?
   - A) `CSS`, `HTML`, and `XML`
   - B) `Number` (or integer), `Boolean`, and `String`
   - C) `RegExp`, `Symbol`, and `Set`
   - D) `Router`, `Subnet`, and `Port`

---

## Part E: Engineering Evaluation & Performance Design (`[L5 Evaluate]` — Questions 41–50)

41. When building a shared read-heavy game store (`getState()` called 60 times/sec), evaluate calling `structuredClone(state)` on every read vs. `deepFreeze(state)` once at write time:
   - A) Freezing once at write time enables safe **$O(1)$ zero-copy reads**, whereas cloning on every read costs **$O(n)$ CPU and memory churn**
   - B) `structuredClone` on every read is faster (`O(1)`)
   - C) `deepFreeze` converts objects into `var` globals
   - D) Both patterns cost identical `O(n^2)` time

42. When IS calling `structuredClone(currentState)` the right architectural choice inside an immutable store (`dispatch()`)?
   - A) To replace `'use strict'` in `.mjs` modules
   - B) When serializing DOM buttons and click listeners directly
   - C) Inside a tight loop just to compare two numbers with `===`
   - D) Inside write transitions (`dispatch`), to derive a clean independent editable draft before freezing and pushing onto history

43. A teammate proposes using `var` for every declaration in a new ES6+ codebase "for backward compatibility." Evaluate this recommendation:
   - A) Sound advice—modern JavaScript runtimes lack `let` and `const`
   - B) Only good inside `'use strict'` modules
   - C) Flawed—ES6+ engines natively enforce block scope; default to `const`, use `let` only when rebinding is needed, and avoid `var` hoisting leaks
   - D) Necessary so `typeof null` returns `'null'`

44. Why should shared utility modules avoid exporting raw mutable objects (`export const appConfig = { retries: 3 }`) without freezing them?
   - A) ES modules forbid exporting objects
   - B) Any consumer module can mutate `appConfig.retries = 0`, silently corrupting behavior across unrelated parts of the app
   - C) Unfrozen exports trigger `ReferenceError` on import
   - D) `export const` automatically applies `structuredClone` on every property

45. A game entity object currently bundles pure data (`hp`, `inventory`) alongside an `onDamage` callback method. How should you architect state cloning without triggering `DataCloneError`?
   - A) Keep pure serializable state separated from handler functions and clone only the data object with `structuredClone()`
   - B) Pass `onDamage` through `JSON.stringify` first
   - C) Wrap `onDamage` inside `Object.seal()` so `structuredClone` ignores it
   - D) Use shallow spread `{ ...entity }` and ignore nested mutations

46. A health sensor checks whether an invalid calculation yielded `NaN` vs numeric `0`. Evaluate writing `reading === NaN` vs `Number.isNaN(reading)` / `Object.is(reading, NaN)`:
   - A) `typeof reading === 'undefined'` detects `NaN` accurately
   - B) `reading == NaN` fixes the bug via loose coercion
   - C) `reading === NaN` returns `true` only in `'use strict'` mode
   - D) `reading === NaN` is ALWAYS `false` in IEEE-754 (even when `reading` IS `NaN`!); always use `Number.isNaN(reading)` or `Object.is(reading, NaN)`

47. During code review, you find `function reset() { total = 0; }` missing any declaration keyword inside a legacy script. What fix prevents future implicit-global leaks?
   - A) Leave it unchanged so other files can share `total` implicitly
   - B) Add `'use strict';` at the top of scripts and explicitly declare `let` / `const` inside the narrowest scope (or return a new value)
   - C) Rename `total` to `var total` above line 1
   - D) Replace `=` with `===`

48. When updating an array property `inventory` inside an immutable reducer (`'shield'` added), evaluate `prev.inventory.push('shield')` vs `[...prev.inventory, 'shield']`:
   - A) Both mutate `prev.inventory` identically
   - B) `.push()` creates a new deep-cloned array safely
   - C) `[...prev.inventory, 'shield']` builds a new array without mutating `prev.inventory`, preserving pure time-travel history
   - D) `[...prev.inventory, 'shield']` throws `TypeError` on `const` arrays

49. A colleague writes `const store = Object.freeze({ user: 'Ada', logs: [] });` believing `store.logs.push('hacked')` will now fail in strict mode. Why does that security assumption break?
   - A) `Object.freeze` is shallow only—`store.logs` remains an unfrozen mutable Array on the Heap unless frozen recursively with `deepFreeze()`
   - B) `Object.freeze` only blocks `var` variables
   - C) `store` needs `Object.seal` before `Object.freeze`
   - D) Arrays ignore `'use strict'` mode permanently

50. Which architecture best meets all requirements for the Unit 4 **Immutable Time-Travel Game State Engine (`createGameStore`)**?
   - A) Deep-clone with `JSON.stringify` on every read while allowing functions inside state objects
   - B) Store state on `globalThis.gameState` using `var` and shallow `{ ...state }` spreads
   - C) Expose the internal `history` array directly and require callers not to call `.push()`
   - D) Keep private history inside a closure, clone state cleanly with `structuredClone()` during `dispatch()`, freeze snapshots with `deepFreeze()`, and pop history safely in `undo()`
