# Unit 5 Mastery Exam: Loops, Data Structures & AI Data Pipelines (50 Questions)

**Course:** JavaScript First — Software & App Design (`AZ CTE Stds 6.0, 7.0` | `West-MEC AI101/AI201 Stds 4.0, 5.0`)  
**Reading & Setup:** [Chapter 5 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each item from `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. Which JavaScript loop construct guarantees that its body runs **at least once**, even if the condition starts `false`?
   - A) `for (let i = 0; i < n; i++)`
   - B) `while (condition)`
   - C) `do { ... } while (condition)`
   - D) `for (const item of list)`

2. Inside a `for` or `while` loop, what does the `continue` statement immediately do?
   - A) Exits the entire enclosing loop permanently
   - B) Skips the rest of the current iteration and jumps to the next iteration check
   - C) Terminates the whole function and returns `undefined`
   - D) Restarts the loop counter back to `0`

3. Every recursive function requires a **base case** primarily in order to:
   - A) Stop recursion cleanly and prevent infinite call-stack overflow
   - B) Sort array elements in ascending numeric order
   - C) Convert CommonJS files into ES Modules
   - D) Force JavaScript to allocate primitives on the Heap

4. Which pair accurately describes **Stack** vs. **Queue** element removal order?
   - A) Stack is FIFO; Queue is LIFO
   - B) Stack is LIFO (Last-In, First-Out); Queue is FIFO (First-In, First-Out)
   - C) Both Stack and Queue always remove the smallest integer first
   - D) Both Stack and Queue iterate backwards only

5. How many boolean flags can a single 32-bit unsigned integer element in a `Uint32Array`-backed `BitSet` store?
   - A) 8
   - B) 16
   - C) 32
   - D) 64

6. What structural property distinguishes a classic **Tree** from a general **Graph**?
   - A) Trees store strings only while graphs store numbers only
   - B) A Tree has a hierarchical root and strictly zero cycles, whereas Graphs may contain cycles
   - C) Trees can never be traversed recursively
   - D) Graphs are always represented as 1D booleans

7. In an AI tabular preprocessing pipeline, filling missing numeric or categorical cells using statistical defaults is called:
   - A) Serialization
   - B) Imputation
   - C) Concatenation
   - D) Hoisting

8. Why do ML data pipelines apply **One-Hot Encoding** to nominal text categories like `['AI', 'Security', 'Web']`?
   - A) To compress raw PNG images into SHA-256 hashes
   - B) To represent distinct categories as orthogonal binary vectors without inventing false numeric order
   - C) To sort CSV columns alphabetically in place
   - D) To delete rows containing numeric features

9. Which built-in Node.js module provides `createHash('sha256')` for salted pseudonymous PII hashing without external dependencies?
   - A) `node:path`
   - B) `node:crypto`
   - C) `node:os`
   - D) `node:readline`

10. Within what closed numeric interval does **Pearson correlation ($r$)** always lie?
    - A) `[0, 1]`
    - B) `[-1, 1]`
    - C) `[0, 100]`
    - D) `(-Infinity, +Infinity)`

---

## Part B: Concepts & Mental Models (`[L2 Understand]` — Questions 11–20)

11. Why does writing `break;` inside an `items.forEach((x) => { ... })` callback fail to work like a `for` loop?
    - A) `.forEach()` only accepts asynchronous promises
    - B) The callback is a separate function body, so `break` throws a `SyntaxError` and `return` only skips that single element
    - C) `.forEach()` skips even indices automatically
    - D) `.forEach()` mutates the array into an object before running

12. Why should developers avoid `for (const key in array)` when iterating over JavaScript arrays?
    - A) `for...in` runs slower because it sorts array elements first
    - B) `for...in` yields stringified keys (`"0"`, `"1"`) and inherited enumerable properties rather than array values in guaranteed order
    - C) `for...in` converts every number inside the array to `BigInt`
    - D) `for...in` throws a `TypeError` on any array longer than 10 items

13. Why does repeated `queue.shift()` on a 100,000-item JavaScript array become `O(n^2)` overall, whereas a head/tail pointer `Queue` or `LinkedList` stays `O(n)`?
    - A) `Array.shift()` hashes every string key in V8
    - B) `Array.shift()` must re-index and shift every remaining element down one slot (`O(n)` per dequeue)
    - C) `LinkedList` stores items directly inside CPU L1 registers
    - D) `Array.shift()` runs inside a `setTimeout` macrotask

14. Which properties silently disappear when calling `JSON.stringify(studentRecord)` on a plain object?
    - A) Strings, finite numbers, and nested arrays
    - B) Function methods, `undefined` values, and `Symbol` keys
    - C) Booleans and `null` values
    - D) Integer IDs equal to `0`

15. Why must BFS and DFS graph algorithms maintain a `visited = new Set()` structure?
    - A) To automatically double the matrix row count
    - B) To avoid revisiting nodes repeatedly and looping infinitely when cycles (`A -> B -> A`) exist
    - C) To convert recursive functions into JSON strings
    - D) To keep the graph sorted in ascending order

16. When a sensor telemetry column contains values `[21, 22, 22, 23, 9999]`, why should **Median** imputation replace missing entries instead of **Mean** imputation?
    - A) Median always equals zero on sorted arrays
    - B) Mean is dragged upward to `~2017` by the single `9999` outlier, while Median (`22`) resists extreme skew
    - C) Median automatically hashes PII fields in the same pass
    - D) Mean only accepts negative integers

17. Why do FERPA-compliant AI pipelines use **salted SHA-256 hashing** on `studentId` and `email` rather than deleting those columns completely?
    - A) SHA-256 lets analysts reverse-engineer the student's password later
    - B) Salted hashing hides real identities while deterministically linking records belonging to the same person across tables
    - C) Plain deletion causes `SyntaxError` in CSV parsers
    - D) SHA-256 turns categories into One-Hot binary arrays

18. How does a single massive outlier (`50000`) differently affect **Min-Max Scaling `[0, 1]`** versus **Z-Score Standardization**?
    - A) Min-Max compresses normal points tightly near `0`, whereas Z-Score centers around the mean in standard-deviation units
    - B) Min-Max turns all values negative while Z-Score forces everything into `[0, 1]`
    - C) Neither scaler is affected by outliers in the denominator
    - D) Both scalers drop rows automatically before dividing

19. Two normalized document vectors `[1, 0, 0]` and `[0, 1, 0]` share zero overlapping features. What is their **cosine similarity**, and why?
    - A) `1.0`, because both vectors have length `1`
    - B) `0`, because the vectors are orthogonal (`dot product = 0`), indicating zero directional similarity
    - C) `-1.0`, because arrays start at index `0`
    - D) `NaN`, because `0` appears in both arrays

20. Matrix multiplication `A * B` pairs an `m x k` matrix `A` with another matrix `B`. Which dimension constraint must `B` satisfy?
    - A) `B` must have `m` rows (`m x n`)
    - B) `B` must have `k` rows (`k x n`) so each row of `A` dot-products cleanly with each column of `B`
    - C) Both `A` and `B` must always be square `3 x 3` matrices
    - D) `B` must be symmetric across its diagonal

---

## Part C: Applied Tracing & Code Execution (`[L3 Apply]` — Questions 21–30)

21. What value does `total` hold when this nested loop completes?
    ```javascript
    let total = 0;
    for (let r = 1; r <= 2; r++) {
      for (let c = 1; c <= 3; c++) {
        if (c === 2) continue;
        total += r * c;
      }
    }
    ```
    - A) `9`
    - B) `12`
    - C) `18`
    - D) `6`

22. Trace the return value of `sumDigits(456)`:
    ```javascript
    function sumDigits(n) {
      if (n < 10) return n;
      return (n % 10) + sumDigits(Math.floor(n / 10));
    }
    ```
    - A) `10`
    - B) `15`
    - C) `24`
    - D) `456`

23. Given `const grid = [[10, 20, 30], [40, 50, 60]];`, what expression reads `60`?
    - A) `grid[2][1]`
    - B) `grid[1][2]`
    - C) `grid[1][3]`
    - D) `grid[0][2]`

24. What does `result` equal after running this non-mutating pipeline?
    ```javascript
    const raw = [95, 62, 88, 70];
    const result = raw.filter((s) => s >= 75).map((s) => s + 2);
    ```
    - A) `[97, 64, 90, 72]`
    - B) `[97, 90]`
    - C) `[95, 88]`
    - D) `[97, 90, 72]`

25. Inside a `Uint32Array`-backed `BitSet`, which `(wordIndex, mask)` pair locates boolean flag index `35`?
    - A) Word `0`, bit offset `3` (`1 << 3`)
    - B) Word `1` (`35 >>> 5`), bit offset `3` (`1 << (35 & 31)`)
    - C) Word `35`, bit offset `1`
    - D) Word `2`, bit offset `5`

26. When parsing a CSV string `"id,score\nS1,92.5\nS2,NA"`, how should `parseCsvToRecords` coerce the `score` fields?
    - A) `{ id: 'S1', score: '92.5' }` and `{ id: 'S2', score: 0 }`
    - B) `{ id: 'S1', score: 92.5 }` and `{ id: 'S2', score: null }`
    - C) `{ id: 'S1', score: 92.5 }` and `{ id: 'S2', score: NaN }`
    - D) Delete row `S2` completely during CSV tokenization

27. Using Tukey's IQR rule on quartiles `Q1 = 10` and `Q3 = 30`, what is the **upper outlier fence** (`Q3 + 1.5 * IQR`)?
    - A) `45`
    - B) `50`
    - C) `60`
    - D) `75`

28. Using Min-Max scaling `x' = (x - min) / (max - min)`, what does `75` map to inside dataset `[50, 75, 100]`?
    - A) `0.25`
    - B) `0.5`
    - C) `0.75`
    - D) `1.5`

29. Compute the Z-Score for value `x = 80` when sample `mean = 60` and `stdDev = 10`:
    - A) `0.8`
    - B) `1.5`
    - C) `2.0`
    - D) `-2.0`

30. Compute the **dot product** of vectors `A = [2, -1, 3]` and `B = [4, 5, 1]`:
    - A) `6`
    - B) `16`
    - C) `8`
    - D) `0`

---

## Part D: Debugging, Diagnostics & Trace Analysis (`[L4 Analyze]` — Questions 31–40)

31. A student writes `for (let i = 0; i <= scores.length; i++) sum += scores[i];` and prints `NaN`. What caused `NaN`?
    - A) `+=` cannot sum integers in JavaScript
    - B) Using `<=` reads `scores[scores.length]` which is `undefined`, and `number + undefined` evaluates to `NaN`
    - C) `let i = 0` starts one slot past the beginning
    - D) Arrays in JavaScript are 1-indexed

32. What happens when a caller passes `-42` into `sumDigits(n)` whose base case is written as `if (n < 10) return n;`?
    - A) It throws `SyntaxError`
    - B) `-42 < 10` evaluates `true`, immediately returning `-42` instead of handling sign/digits properly
    - C) It loops forever until heap memory runs out
    - D) It converts `-42` into `'42'`

33. Calling `function median(arr) { arr.sort((a, b) => a - b); ... }` introduces a subtle bug in production. What is the defect?
    - A) `.sort()` does not work on positive integers
    - B) `.sort()` mutates the caller's original `arr` order in place instead of cloning via `[...arr].sort(...)`
    - C) `.sort((a, b) => a - b)` sorts in descending order
    - D) `median` throws `RangeError` on odd-length arrays

34. A test runs `findReachableCourses(graph, 'CS101')` on `{ CS101: ['CS102'], CS102: ['CS101'] }` and times out after `15000ms`. What is missing?
    - A) A `for...in` loop instead of `while`
    - B) Tracking seen nodes in a `visited = new Set()` before pushing neighbors onto the BFS queue
    - C) Using `JSON.stringify(graph)` inside the loop
    - D) Setting `--stack-size=128`

35. A `HashTable` helper maps keys with `hash(key) { let h = 0; for (const ch of key) h += ch.charCodeAt(0); return h; }` against an array of 16 buckets. Why do lookups return `undefined` or grow huge sparse arrays?
    - A) `charCodeAt(0)` returns floats
    - B) The hash omits `% this.#buckets.length`, letting indices exceed `15`
    - C) Strings cannot be iterated with `for...of`
    - D) `let h = 0` must start at `1`

36. Running `minMaxScale([5, 5, 5])` or `zScoreStandardize([5, 5, 5])` returns `[NaN, NaN, NaN]`. Why?
    - A) The loop skipped index `0`
    - B) All elements are identical, so `max - min === 0` (`stdDev === 0`), producing `0 / 0 = NaN` without a zero-span guard
    - C) JavaScript cannot divide negative numbers
    - D) `Math.sqrt` throws on integers

37. A buggy CSV parser turns `"NA"` into `""`, and another helper coerces cells with `Number(val)` before computing mean attendance. How does `Number("")` corrupt the dataset?
    - A) `Number("")` throws a `TypeError`
    - B) `Number("")` evaluates to `0` instead of `null`, silently dragging the column mean downward as if blank entries were zero attendance
    - C) `Number("")` converts strings to `Infinity`
    - D) `Number("")` hashes the string automatically

38. Automated tests fail with `AssertionError: caller records were modified` inside `imputeMissingNumeric(records, 'age', 'median')`. Which fix resolves it cleanly?
    - A) Mutate `records[i].age = val` directly without cloning
    - B) Return a new array of shallow-cloned objects `{ ...row, [field]: replacement }` leaving `records` untouched
    - C) Delete every row with `age === null`
    - D) Sort `records` in place by `age` first

39. A student tests `cosineSimilarity([0, 0, 0], [1, 2, 3])` and gets `NaN` instead of `0`. What caused `NaN`?
    - A) Vectors must contain negative numbers
    - B) A zero-magnitude vector produces denominator `0 * sqrt(14) = 0`, yielding `0 / 0 = NaN` when unguarded
    - C) The dot product of `[0, 0, 0]` and `[1, 2, 3]` is `Infinity`
    - D) `Math.hypot` only accepts 2 arguments

40. A `transpose(matrix)` function accesses `matrix[0].length` unconditionally at line 1 and crashes on `[]` (`TypeError: Cannot read properties of undefined`). Which guard fixes empty matrices?
    - A) Return `null` for all 2D arrays
    - B) Return `[]` immediately if `matrix.length === 0 || matrix[0].length === 0`
    - C) Catch syntax errors with `console.log`
    - D) Wrap every number in `String(...)`

---

## Part E: Architecture & Tradeoff Evaluation (`[L5 Evaluate]` — Questions 41–50)

41. You must scan 500,000 sorted audit events to stop at the **very first** critical anomaly. Which iteration design should you choose and why?
    - A) `events.forEach(...)` with `return` because callbacks exit the loop early
    - B) `for (const event of events)` with `break` (or `.find()`), halting immediately in `O(1)` best-case rather than scanning all remaining elements
    - C) Deep recursion over all 500,000 events because V8 guarantees infinite stack depth
    - D) `for...in` so prototype properties are checked first

42. An endpoint enriches 20,000 enrollment rows by calling `students.find((s) => s.id === row.studentId)` inside the enrollment loop. Why must you refactor to `new Map(students.map((s) => [s.id, s]))`?
    - A) Linear `.find()` inside a loop scales as `O(n * m)` (~400M comparisons), whereas indexing a `Map` once cuts lookups to `O(1)` (`O(n + m)` total)
    - B) `Map` automatically encrypts `studentId` with SHA-256
    - C) `.find()` mutates the `students` array
    - D) `Map` uses zero heap memory

43. Implementing Breadth-First Search (`BFS`) on a university dependency graph of 80,000 courses, why does a custom head/tail `Queue` outperform `const q = []; q.shift();`?
    - A) Custom `Queue` avoids `O(n)` element shifting on every `dequeue()`, maintaining true `O(V + E)` graph traversal
    - B) `Array.shift()` cannot hold strings
    - C) Custom `Queue` skips visiting adjacent neighbors
    - D) `Array.shift()` creates cyclic edges automatically

44. Traversing a **balanced binary tree** of depth `12` vs. traversing a **degenerate singly-linked chain** of `100,000` nodes in Node.js: which strategy avoids crashing?
    - A) Use recursion for the 100,000-node chain and loops only for trees
    - B) Iterative `while` traversal is mandatory for the 100,000-node chain (`~100k` frames exceed V8's default call stack), while recursion stays concise for bounded depth-12 trees
    - C) Increasing loop indices to `<= length` prevents stack growth
    - D) Replacing `while` with `.forEach()` grows stack size safely

45. A telemetry firewall evaluates 1,000,000 boolean feature flags per second in tight loops. Which custom structure minimizes memory footprint while keeping `add`/`has`/`remove` at `O(1)`?
    - A) Nested objects `{ flag0: { active: true } }`
    - B) A `Uint32Array`-backed `BitSet` packing 32 booleans per integer word
    - C) A string of `"true,false,..."` re-split on every lookup
    - D) A singly-linked list of boolean wrappers

46. Evaluate the safest order of operations for an AI data ingestion pipeline before training a regression model:
    - A) Train model first -> Scale whole dataset -> Anonymize PII -> Deduplicate rows
    - B) Coerce/dedupe & anonymize PII -> Split train/test -> Fit imputation/scaling stats on train only -> Transform & encode
    - C) One-Hot encode names and SSNs directly -> Fill missing numbers with `"NA"`
    - D) Compute Pearson `r` on uncleaned string IDs -> Drop all numeric columns

47. Household sensor telemetry exhibits heavy right skew plus occasional `9999` hardware glitches. Which cleaning & scaling pair preserves valid signal integrity best?
    - A) Mean imputation + Min-Max `[0, 1]` scaling without outlier checks
    - B) Tukey IQR flagging + **Median** imputation + **Z-Score** standardization
    - C) Replacing `null` with `0` + ordinal encoding `{ sensorA: 1, sensorB: 2 }`
    - D) Deleting 90% of rows whose Z-score exceeds `0.5`

48. A student model encodes track labels as `{ AI: 1, Cybersecurity: 2, Web: 3 }` and retains raw `studentEmail` inside the numeric matrix. Which two architecture flaws occur?
    - A) One-Hot sparse explosion and missing `node:fs`
    - B) False ordinal geometry (`Web = 3 * AI`) plus a severe **FERPA/GDPR PII leak** requiring salted SHA-256 hashing + One-Hot vectors instead
    - C) `BitSet` overflow and missing recursion base cases
    - D) JSON drops boolean keys

49. Before training, an EDA summary reports `rowCount: 1000`, `duplicateCount: 180`, `missingRate(income): 0.45`, and `iqrOutlierCount(income): 42`. Why should engineering block training until remediation?
    - A) Models automatically fix 45% missing values without bias
    - B) `18%` duplicate rows overweight repeated profiles and `45%` missing + skewed outliers demand explicit dedupe, skew-safe median/IQR review, and documentation first
    - C) Pearson `r` requires zero outliers only for integers
    - D) `Z-Score` automatically removes duplicate rows

50. Comparing two search articles (`500 words` vs `5,000 words`) on identical topics using word-count vectors, why does **Cosine Similarity** outperform Euclidean distance?
    - A) Cosine similarity measures the **angle** between term frequency directions regardless of total document length, whereas raw Euclidean distance penalizes longer documents
    - B) Cosine similarity runs in `O(1)` without looping over vector elements
    - C) Euclidean distance always returns negative numbers
    - D) Cosine similarity converts vectors into strings automatically
