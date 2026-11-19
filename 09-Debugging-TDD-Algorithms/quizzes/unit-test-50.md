# Unit 9 Mastery Exam (50 Questions): Testing, Debugging, Algorithms & ML Fairness

**Course:** JavaScript First — Software & App Design (AZ CTE CIP `11.0202.00`)  
**Standards:** AZ CTE 12.1–12.5, 6.4–6.7 | CTE AI (11.0102.00) / Azure AI-900 (AI 1.0, 2.0, 6.0, 7.0)  
**Companion Resources:** [Unit Overview](../readme.md) | [Setup Guide](../setup-guide.md) | [Unit Guide](../unit-guide.md)  
**Instructions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each of the 50 items below (`[L1]`–`[L5]`). No calculators or external notes are required unless specified by your instructor.

---

## Part A — Remember (`Q1–Q10` | `[L1 Remember]`)

1. Missing a closing parenthesis `)` in a JavaScript file prevents Node from parsing the script and throws which error type? `[12.4 | L1]`
   - A) Runtime `TypeError`
   - B) Logic Error
   - C) Syntax Error (`SyntaxError`)
   - D) Semantic Overflow

2. Accessing `profile.email` while `profile` holds `null` compiles cleanly yet crashes mid-execution with a: `[12.4 | L1]`
   - A) Syntax Error
   - B) Runtime `TypeError`
   - C) Merge Conflict
   - D) Semantic Lint Warning

3. In the Red-Green-Refactor TDD workflow, what is the mandatory first action before writing production logic? `[12.3 | L1]`
   - A) Write a failing automated test (RED)
   - B) Optimize Big-O complexity first
   - C) Delete error handling blocks
   - D) Publish minified bundle to npm

4. Which zero-dependency Node.js standard library module executes tests directly with `node --test`? `[12.3 | L1]`
   - A) `node:readline`
   - B) `node:http`
   - C) `node:crypto`
   - D) `node:test`

5. Which CLI flag launches Node in debugger mode and pauses on line 1 BEFORE executing any statement so DevTools can attach? `[12.5 | L1]`
   - A) `node --watch`
   - B) `node --inspect-brk`
   - C) `node --check`
   - D) `node --version`

6. Which Big-O time complexity characterizes standard Merge Sort on an array of `n` elements in the worst case? `[6.6–6.7 | L1]`
   - A) `O(1)`
   - B) `O(log n)`
   - C) `O(n log n)`
   - D) `O(n^2)`

7. Which structural precondition MUST hold true before Binary Search can reliably locate a target? `[6.7 | L1]`
   - A) The input array must already be sorted
   - B) Array length must be a prime number
   - C) Elements must all be positive strings
   - D) Every item must appear twice

8. In CompTIA's 7-step troubleshooting methodology, which action immediately follows "Establish a theory of probable cause"? `[12.5 | L1]`
   - A) Skip testing and jump straight to documentation
   - B) Rewrite all unit tests before identifying the root cause
   - C) Delete production error logs
   - D) Test the theory to determine the cause (Step 3)

9. `k-Means` partitions unlabeled feature vectors into `k` groups without ground-truth labels, making it an example of: `[AI 6.0 | L1]`
   - A) Supervised Classification
   - B) Unsupervised Learning
   - C) Reinforcement Q-Learning
   - D) Compiler Syntax Checking

10. Under the EEOC 4/5ths (`80%`) rule, a Disparate Impact ratio triggers an adverse fairness flag whenever the protected group's selection ratio drops below: `[AI 7.0 | L1]`
   - A) `0.95`
   - B) `0.90`
   - C) `0.80`
   - D) `0.50`

---

## Part B — Understand (`Q11–Q20` | `[L2 Understand]`)

11. How does an **Integration Test** differ from a **Unit Test** in a CI pipeline? `[12.3 | L2]`
   - A) Integration tests verify multiple modules or DB/API boundaries working together; unit tests isolate a single helper
   - B) Unit tests can only run manually in browsers while integration tests cannot use `assert`
   - C) Integration tests skip edge cases and ignore returned HTTP status codes
   - D) Unit tests always take longer than full end-to-end cloud deployments

12. Why do production engineering teams prefer `DEBUG_FLAGS` or conditional `console.assert()` telemetry over scattered `console.log()` statements? `[12.5 | L2]`
   - A) `console.log()` throws a `SyntaxError` on Linux servers
   - B) `console.assert()` automatically encrypts passwords with AES-GCM
   - C) Logging flags double JavaScript execution speed on `O(n^2)` loops
   - D) Flagged diagnostics stay silent in normal production runs and only print targeted invariants when enabled

13. Why does guarding object parameters with `typeof x === "object"` alone STILL fail when a caller passes `null`? `[12.4 | L2]`
   - A) JavaScript throws an immediate parse error on the keyword `null`
   - B) `null` evaluates to `"undefined"` under `typeof`
   - C) In JavaScript, historical `typeof null` returns `"object"` even though `null` cannot hold properties
   - D) `typeof null` automatically converts `null` to `{}`

14. Why can **Insertion Sort** actually outperform **Merge Sort** on tiny (`n <= 20`) or nearly-sorted arrays despite having an `O(n^2)` worst case? `[6.6 | L2]`
   - A) Insertion Sort builds an extra recursive tree in heap memory
   - B) Insertion Sort runs in-place with zero recursion/slice allocations and hits `O(n)` on already-sorted runs
   - C) Merge Sort has an `O(n^3)` worst case on small inputs
   - D) Insertion Sort does not compare element values

15. What is the main space-complexity trade-off between `mergeSort` and an in-place randomized `quickSort`? `[6.6 | L2]`
   - A) `mergeSort` allocates `O(n)` temporary array buffers while in-place `quickSort` uses only `O(log n)` stack frames on average
   - B) `mergeSort` uses zero heap space whereas `quickSort` copies the entire array on every comparison
   - C) `quickSort` prevents worst-case recursion depth even without pivot selection
   - D) Both require strictly `O(n^2)` heap memory

16. Why do experienced engineers compute the Binary Search midpoint with `left + Math.floor((right - left) / 2)` instead of `(left + right) / 2`? `[6.7 | L2]`
   - A) Subtraction automatically sorts unsorted inputs
   - B) `Math.floor` runs in constant `O(1)` while `/` runs in `O(n)`
   - C) JS `number` only permits subtraction inside `while` loops
   - D) It guarantees integer indexing cleanly and avoids signed 32-bit overflow patterns across languages

17. Why does CompTIA troubleshooting Step 6 ("Verify full system functionality and implement preventive measures") look beyond the one fixed line? `[12.5 | L2]`
   - A) It skips automated regression tests to ship faster
   - B) It deletes previous commits from Git history
   - C) It confirms adjacent workflows have no regressions and adds preventive checks/tests so the bug cannot recur
   - D) It hides production stack traces from developers

18. Why MUST z-score mean/std scalers and missing-value imputers be fitted ONLY on the `train` split before transforming `validation` and `test` splits? `[AI 6.0 | L2]`
   - A) JavaScript arrays forbid calculating `mean` on `test` slices
   - B) Computing statistics across the combined dataset leaks future evaluation distribution hints (`data leakage`)
   - C) Validation splits automatically delete `train` weights otherwise
   - D) Scaling only changes categorical string columns

19. What causes the **Accuracy Paradox** on a fraud detection dataset where 99% of transactions are legitimate and 1% are fraudulent? `[AI 6.0 | L2]`
   - A) A broken classifier that always predicts `"legitimate"` achieves 99% accuracy yet catches 0% of actual fraud (`Recall = 0`)
   - B) Accuracy mathematically exceeds `1.0` when classes are skewed
   - C) Precision automatically rises to `100%` whenever False Positives explode
   - D) Training faster reduces validation accuracy to zero

20. Why can dropping sensitive demographic columns (like race or gender) STILL leave an ML model producing disparate impact? `[AI 7.0 | L2]`
   - A) Linear regression always outputs identical numbers regardless of inputs
   - B) Deleting columns triggers a `SyntaxError` in `node:test`
   - C) Accuracy falls below `0.10` whenever one column is removed
   - D) Correlated **proxy variables** (e.g., ZIP code or school district) indirectly encode the protected attribute

---

## Part C — Apply (`Q21–Q30` | `[L3 Apply]`)

21. Which set represents the strongest **boundary test inputs** for verifying `calculateMedian(nums)`? `[12.2 | L3]`
   - A) `[1, 2, 3]` and `[4, 5, 6]` only
   - B) `[]` (empty), `[42]` (single), `[2, 1]` (even unsorted), `[-10, 0, 10]`, and invalid `[NaN]` / non-array
   - C) `[10, 20, 30]` run three times with identical data
   - D) `["ten", "twenty"]` only without checking numbers

22. Calling `applyTax(100, 0.08)` with `return price + (price * rate * 10);` returns `180` silently without crashing. How do you classify and fix this bug? `[12.4 | L3]`
   - A) Syntax Error — add missing semicolon after `return`
   - B) Runtime Error — wrap `price` inside `JSON.stringify`
   - C) Logic Error — remove erroneous `* 10` multiplier (`return price + price * rate` -> `108`)
   - D) Hardware Fault — upgrade CPU clock speed

23. Trace `binarySearch([10, 20, 30, 40, 50], 40)` starting with `left = 0, right = 4`. What are the midpoint indices checked before returning index `3`? `[6.7 | L3]`
   - A) Step 1 checks `mid = 2` (`30`), then sets `left = 3` and Step 2 checks `mid = 3` (`40`)
   - B) Step 1 checks `mid = 0` (`10`), then Step 2 checks `mid = 1` (`20`)
   - C) Step 1 checks `mid = 4` (`50`), then sets `left = 0` and loops forever
   - D) Step 1 checks `mid = 2` (`30`), then sets `right = 1` and returns `-1`

24. Approximately how many worst-case comparisons does Binary Search perform on a sorted array of **1,000,000** IDs (`2^20 = 1,048,576`)? `[6.7 | L3]`
   - A) 1,000,000
   - B) 500,000
   - C) 1,000
   - D) ~20

25. Starting Insertion Sort on `[5, 2, 4, 1]`, what is the exact array state after completing the second insertion pass (`i = 2`, inserting `4`)? `[6.6 | L3]`
   - A) `[1, 2, 4, 5]`
   - B) `[2, 4, 5, 1]`
   - C) `[5, 4, 2, 1]`
   - D) `[2, 5, 4, 1]`

26. A classifier evaluates 100 cases and records `TP = 18`, `FP = 2`, `FN = 12`, `TN = 68`. What are its **Precision** and **Recall**? `[AI 6.0 | L3]`
   - A) Precision = `0.60`, Recall = `0.90`
   - B) Precision = `0.86`, Recall = `0.86`
   - C) Precision = `0.90` (`18/20`), Recall = `0.60` (`18/30`)
   - D) Precision = `0.18`, Recall = `0.68`

27. Trace this recursive function for `sumDown(4)`: `[12.4 | L3]`
   ```javascript
   function sumDown(n) {
     if (n <= 0) return 0;
     return n + sumDown(n - 1);
   }
   ```
   - A) `10` (`4 + 3 + 2 + 1 + 0`)
   - B) `4`
   - C) `15`
   - D) `RangeError: Maximum call stack size exceeded`

28. A hiring model selects `60%` of Group A applicants and `42%` of Group B applicants. What is the **Disparate Impact ratio** and audit verdict? `[AI 7.0 | L3]`
   - A) `1.43` — Passes 4/5ths fairness audit
   - B) `0.82` — Passes 4/5ths fairness audit
   - C) `0.18` — Passes because `0.60 - 0.42 < 0.20`
   - D) `0.70` (`0.42 / 0.60`) — Fails the `>= 0.80` 4/5ths fairness threshold

29. A debugger is paused on `const total = calcTax(sub);`. Which debugger action enters line 1 **inside** `calcTax` rather than skipping over its execution? `[12.5 | L3]`
   - A) `Step Out` (`Shift+F11`)
   - B) `Step Into` (`F11`)
   - C) `Continue` (`F5`)
   - D) `Toggle Line Comment`

30. A loop processes 10,000 records and only corrupts state when `user.id === 8421`. Which debugging approach inspects the exact state cleanly? `[12.5 | L3]`
   - A) Insert 10,000 unconditional `console.log()` calls
   - B) Restart the operating system repeatedly
   - C) Set a **conditional breakpoint** (`user.id === 8421`) and inspect variables in the Watch panel
   - D) Delete the `for` loop entirely

---

## Part D — Analyze (`Q31–Q40` | `[L4 Analyze]`)

31. Why does the `sumArray` helper below always return `NaN`? `[12.4–12.5 | L4]`
   ```javascript
   function sumArray(nums) {
     let total = 0;
     for (let i = 0; i <= nums.length; i++) {
       total += nums[i];
     }
     return total;
   }
   ```
   - A) Off-by-one `i <= nums.length` reads `nums[nums.length]` (`undefined`) on the final step, adding `number + undefined -> NaN`
   - B) `let total = 0` must be declared with `const`
   - C) `+=` fails on arrays longer than two elements
   - D) The function lacks `async` before `function`

32. Why does the caller's original `scores` array unexpectedly change after calling `nonMutatingSort(scores)` below? `[12.2 / 6.4 | L4]`
   ```javascript
   function nonMutatingSort(arr) {
     const copy = arr;
     return copy.sort((a, b) => a - b);
   }
   ```
   - A) `Array.prototype.sort` always converts numbers to UTF-16 strings even with comparator
   - B) `return` clears arrays inside strict mode
   - C) Arrow comparators reverse array indices globally
   - D) `const copy = arr` only copies the object reference; `.sort()` still mutates the shared array in place instead of `[...arr]`

33. Trace why this Binary Search hangs forever when searching for an absent target between `arr[left]` and `arr[right]` (`arr = [10, 30]`, `target = 20`): `[6.7 / 12.5 | L4]`
   ```javascript
   while (left <= right) {
     const mid = Math.floor((left + right) / 2);
     if (arr[mid] === target) return mid;
     if (arr[mid] < target) left = mid;
     else right = mid - 1;
   }
   ```
   - A) `Math.floor` rounds `0.5` up to `1` on negative numbers
   - B) Setting `left = mid` instead of `left = mid + 1` leaves `left=0, right=1, mid=0` unchanged forever when `arr[0] < target`
   - C) `else right = mid - 1` skips index `0` before checking it
   - D) `while (left <= right)` never enters for 2-element arrays

34. A duplicate detector uses nested loops (`for i ... for j = i + 1`) and times out past 15 seconds on `n = 200,000` user IDs. Which structural fix drops runtime to linear `O(n)`? `[6.6 | L4]`
   - A) Replace `for` loops with `.forEach()` nested inside `.forEach()`
   - B) Convert IDs to JSON strings first before the nested loops
   - C) Track visited IDs inside a hash-backed `Set` (`O(1)` lookup per item -> `O(n)` total)
   - D) Run Bubble Sort before the nested loops

35. When does a naive `quickSort` that always picks `arr[0]` as its pivot degrade to **`O(n^2)`** worst-case runtime? `[6.6 | L4]`
   - A) When given an already-sorted or reverse-sorted array, creating `0` vs `n-1` unbalanced partitions on every call
   - B) Only when the array contains floating-point numbers
   - C) When array length is an exact power of 2
   - D) Only when `mergeSort` runs inside the same process

36. Your regression pipeline reports `Train RMSE = 1.1` while `Validation RMSE = 19.4`. What error mode does this gap prove? `[AI 6.0 | L4]`
   - A) High Bias (Underfitting) — model is too simple to fit training points
   - B) Perfect generalization ready for production
   - C) EEOC Disparate Impact above `0.80`
   - D) High Variance (Overfitting) — model memorized training noise instead of generalizing

37. You confirmed a production null-dereference bug and are ready for Step 4 ("Establish a plan of action to resolve the problem"). What MUST happen before touching production code? `[12.5 | L4]`
   - A) Push edits straight to production without testing
   - B) Assess potential downstream impact and backups, then validate the fix inside isolated tests before deploying
   - C) Delete the existing automated test suite
   - D) Disable Git commit history temporarily

38. How do loop-based **iteration** and function **recursion** compare in runtime memory behavior? `[6.6 / 12.4 | L4]`
   - A) Loops leak heap memory faster than recursion
   - B) Recursion uses zero call stack frames
   - C) Iteration reuses one `O(1)` stack frame, whereas each recursive call pushes a new frame and risks stack overflow on deep inputs
   - D) JavaScript forbids `for` loops inside algorithm helpers

39. Calling `[10, 5, 100, 25].sort()` outputs `[10, 100, 25, 5]` instead of ascending numeric order. Why does this occur and what fixes it? `[6.4 | L4]`
   - A) `.sort()` defaults to UTF-16 string ordering; pass a numeric comparator `(a, b) => a - b`
   - B) Arrays of integers are secretly stored as strings
   - C) `.sort()` always reverses array indices
   - D) The function needs an `async` modifier

40. During a VS Code debugger inspection, your recursive `mergeSort` throws `RangeError: Maximum call stack size exceeded` with thousands of `mergeSort` frames on the Call Stack. What caused it? `[12.5 / 6.6 | L4]`
   - A) Input array contained unsorted integers
   - B) `node --inspect` limits call depth to `3` frames
   - C) `Array.prototype.slice` creates infinite cycles
   - D) Missing or broken base case `if (arr.length <= 1) return arr;`, recursing endlessly on 0/1-length slices

---

## Part E — Evaluate (`Q41–Q50` | `[L5 Evaluate]`)

41. An embedded aerospace telemetry logger requires a **strict worst-case `O(n log n)`** runtime guarantee even on adversarial/sorted bursts and has plenty of RAM for a scratch buffer. Which sort best fits? `[6.6 | L5]`
   - A) Bubble Sort — simplest loop structure
   - B) Merge Sort — deterministic `O(n log n)` worst-case bound without `O(n^2)` pivot risk
   - C) Naive first-element Quick Sort — fastest even on sorted input
   - D) Insertion Sort — guaranteed `O(n log n)` worst case

42. You receive an unsorted 100,000-element sensor batch. When should you **NOT** pay `O(n log n)` to sort before running Binary Search? `[6.7 | L5]`
   - A) When handling 50,000 repeated ID queries on that static snapshot
   - B) When binary range queries will run continuously all day
   - C) When performing ONLY `k = 1` single search — a single Linear Search `O(n)` finishes faster than sorting `O(n log n)` first
   - D) When memory allows `O(1)` array access

43. You are tuning the probability threshold for an autonomous braking obstacle detector where missing a pedestrian (`FN`) is catastrophic. Which primary metric must guide threshold selection? `[AI 6.0 | L5]`
   - A) Maximize **Recall** (`TP / (TP + FN)`) while keeping false alerts within tolerable UX bounds
   - B) Maximize raw global Accuracy regardless of minority classes
   - C) Maximize True Negatives only by raising threshold to `0.99`
   - D) Minimize Precision to zero intentionally

44. Conversely, an automated e-commerce **account-ban bot** permanently locks suspected fraudsters out of paid accounts, triggering costly support escalations on mistakes. Which metric must you guard highest? `[AI 6.0 | L5]`
   - A) Maximize False Positives so zero suspects slip through
   - B) Ignore Precision and deploy at `threshold = 0.05`
   - C) Rely exclusively on `k-Means` inertia
   - D) High **Precision** (`TP / (TP + FP)`), ensuring accounts auto-banned are genuinely fraudulent before human review

45. When debugging a bug spanning UI, API, and DB layers, why isolate subsystems and change ONE variable at a time? `[12.5 | L5]`
   - A) It doubles random error rates across modules
   - B) It deterministically isolates the true failing layer without masking causes behind multiple simultaneous edits
   - C) It skips inspecting root-cause logs
   - D) It converts `O(n)` code into `O(n^2)` loops

46. A pseudocode helper computes `SET max = 0; FOR EACH n IN [-9, -3, -5]: IF n > max THEN max = n`. What bug occurs? `[12.4 | L5]`
   - A) It raises a `SyntaxError` on negative integers
   - B) It creates an infinite `while` loop
   - C) It fails on all-negative inputs (`0` instead of `-3`); initialize `max = arr[0]` instead of `0`
   - D) It always returns `NaN`

47. Why does CompTIA Step 7 ("Document findings, actions, and outcomes") matter AFTER a production outage is already resolved? `[12.5 | L5]`
   - A) It creates an actionable runbook and root-cause history so future incidents resolve dramatically faster
   - B) It erases prior Git commits automatically
   - C) It bypasses automated CI unit tests
   - D) It converts JavaScript source files into CSS

48. All mocked unit tests pass (`100% GREEN`), yet production crashes because a SQL query column was renamed. What CI strategy closes this blind spot? `[12.3 | L5]`
   - A) Delete all unit tests since mocks are useless
   - B) Retain fast unit tests for logic AND require contract/integration tests against an ephemeral test database in CI before merge
   - C) Test exclusively by clicking manually in production
   - D) Replace `node:test` assertions with `console.log`

49. Choose the right shortest-path algorithm for routing across **three different network graphs**: (1) equal `1-hop` peer links, (2) variable positive latency links (`>= 0 ms`), and (3) credit-rebate links containing negative costs: `[6.4 | L5]`
   - A) Dijkstra for all three cases
   - B) Huffman coding for (1), Merge Sort for (2), Insertion Sort for (3)
   - C) Binary Search for (1), Quick Sort for (2), DFS for (3)
   - D) BFS for unweighted hops (1), Dijkstra for non-negative weights (2), Bellman-Ford when negative weights exist (3)

50. Why should engineering teams commit a failing-then-passing automated test reproducing every fixed production bug? `[12.3 | L5]`
   - A) It turns `O(n^2)` algorithms into `O(1)`
   - B) It deletes user error messages from logs
   - C) It establishes a permanent **regression test** so future edits cannot silently reintroduce the bug
   - D) It disables `Math.random()` inside Node.js
