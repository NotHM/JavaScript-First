# Unit 9 Mastery Exam (50 Questions): Testing, Debugging, Algorithms & ML Fairness

**Course:** JavaScript First — Software & App Design (AZ CTE CIP `11.0202.00`)  
**Standards:** AZ CTE 12.1–12.5, 6.4–6.7 | West-MEC AI 1.0, 2.0, 6.0, 7.0  
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

8. Which graph algorithm finds minimum-cost paths across edges with **non-negative** weights, and which tree algorithm assigns shortest bit codes to frequent symbols? `[6.4–6.6 | L1]`
   - A) Bubble Sort and Quick Sort
   - B) Insertion Sort and Linear Search
   - C) k-Means and OLS Regression
   - D) Dijkstra's algorithm and Huffman coding

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

17. Why does standard **Dijkstra's algorithm** produce wrong answers when a graph contains negative edge weights? `[6.4 | L2]`
   - A) Adjacency lists cannot store negative numbers in JS objects
   - B) Dijkstra can only traverse undirected cycles
   - C) Dijkstra assumes once a node is popped as minimum distance, future paths cannot reduce it—which negative weights break
   - D) Negative weights turn Dijkstra into Huffman coding

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

27. An Ordinary Least Squares (`OLS`) model fits slope `w = 2.5` and intercept `b = 10` (`y_hat = w*x + b`). What is the predicted output and squared error when `x = 4` and true `y = 22`? `[AI 6.0 | L3]`
   - A) Prediction `y_hat = 20`; residual `-2`, squared error `4`
   - B) Prediction `y_hat = 42.5`; squared error `420.25`
   - C) Prediction `y_hat = 14`; squared error `64`
   - D) Prediction `y_hat = 22`; squared error `0`

28. A hiring model selects `60%` of Group A applicants and `42%` of Group B applicants. What is the **Disparate Impact ratio** and audit verdict? `[AI 7.0 | L3]`
   - A) `1.43` — Passes 4/5ths fairness audit
   - B) `0.82` — Passes 4/5ths fairness audit
   - C) `0.18` — Passes because `0.60 - 0.42 < 0.20`
   - D) `0.70` (`0.42 / 0.60`) — Fails the `>= 0.80` 4/5ths fairness threshold

29. During Dijkstra's relaxation step at vertex `u` (`dist[u] = 4`), an outgoing edge `(u -> v)` has weight `3` while `dist[v]` is currently `9`. What becomes the updated `dist[v]`? `[6.4–6.6 | L3]`
   - A) Remains `9` because `9 > 4`
   - B) Relaxes to `7` (`4 + 3 < 9`)
   - C) Updates to `12` (`9 + 3`)
   - D) Resets to `Infinity`

30. When constructing a **Huffman prefix code** for characters appearing `{ A: 50, B: 30, C: 15, D: 5 }` times, which symbol receives the shortest binary bit code? `[6.4 | L3]`
   - A) `D` (`5`), so rare symbols decode fastest
   - B) All four receive identical 8-bit ASCII codes
   - C) `A` (`50`), because assigning fewer bits to the highest-frequency symbol minimizes total encoded size
   - D) `C` (`15`), because it sits in the middle

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

37. Spot the evaluation flaw in this pipeline snippet: `[AI 6.0 | L4]`
   ```javascript
   const scaled = zScoreNormalizeAll(dataset);
   const { train, val, test } = splitTrainValTest(scaled, 0.7, 0.15, 42);
   ```
   - A) `42` is invalid as a deterministic PRNG seed
   - B) Data leakage — `zScoreNormalizeAll` leaked `val` and `test` mean/variance into `train` before splitting
   - C) Split ratios must sum to `1.5` instead of `1.0`
   - D) `const` breaks array destructuring

38. Why did `k-Means` cluster users almost solely by annual `salary` (`$25,000–$180,000`) while completely ignoring `age` (`18–65`)? `[AI 6.0 | L4]`
   - A) `k-Means` automatically discards the second column in every CSV
   - B) Salary contains floating-point decimals while age is integer
   - C) Unscaled Euclidean distance is dominated by large-magnitude features unless standardized on the training split first
   - D) Euclidean distance only measures cosine angle

39. A cancer triage model achieves `Accuracy = 94%`, `Precision = 0.96`, and `Recall = 0.28`. What critical operational hazard does the Recall score expose? `[AI 6.0 | L4]`
   - A) 72% of actual positive cancer cases are falsely cleared (`False Negatives`), putting patients at high risk
   - B) 96% of healthy patients are flagged unnecessarily
   - C) Too many True Positives are lowering accuracy
   - D) The model suffers from zero variance

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

45. After spotting severe **High Variance overfitting** (`Train RMSE = 0.8`, `Val RMSE = 14.5`), which combination of interventions directly reduces variance? `[AI 6.0 | L5]`
   - A) Add higher-degree polynomial interaction features and turn off regularization
   - B) Collect more diverse training examples, apply L2 regularization / pruning, and remove noisy redundant features
   - C) Leak validation rows into the training loop
   - D) Drop validation testing completely

46. If a model suffers from **High Bias underfitting** (`Train RMSE = 24.0`, `Val RMSE = 25.1`), why will adding 100,000 more identical rows barely help? `[AI 6.0 | L5]`
   - A) Node.js runs out of heap memory above 1,000 rows
   - B) More rows always convert linear models into `k-Means`
   - C) An overly simple model lacks representational capacity; you must add richer/non-linear features or reduce excessive regularization
   - D) Validation error can never fall below `Train RMSE`

47. A Disparate Impact audit records `Ratio = 0.72` even after deleting the protected gender field. As lead fairness engineer, what should you approve before ship? `[AI 7.0 | L5]`
   - A) Block release, audit correlated proxy features & feature weights, calibrate group thresholds/re-weight data, and add human review gates
   - B) Ship immediately because the literal column name `"gender"` is absent
   - C) Raise threshold only for the disadvantaged group until they match 0%
   - D) Hide the fairness test output from CI logs

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

50. Why should an ML evaluation suite enforce a **deterministic PRNG seed** (`seed = 42`) inside `splitTrainValTest` during CI regression checks? `[12.2 / AI 6.0 | L5]`
   - A) Deterministic seeds turn `O(n^2)` algorithms into `O(1)`
   - B) Fixed seeds eliminate the need for a held-out test set
   - C) Reproducible splits guarantee CI failures trace to actual model/metric regressions rather than random shuffle luck
   - D) JavaScript `Math.random()` accepts seeds natively without custom code
