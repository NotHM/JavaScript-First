# Unit 5 Mastery Exam: Loops, Data Structures & AI Data Pipelines (50 Questions)

**Course:** JavaScript First — High School CTE (Grades 11–12) & Community College CIS (`AZ CTE Stds 6.0, 7.0` | `CTE AI 11.0102.00 Stds 4.0, 5.0` | `ITS-JS`, `CIW-JS`, `CompTIA-ITF+`, `CompTIA-Sec+`)  
**Reading & Setup:** [Chapter 5 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best answer (`A`, `B`, `C`, or `D`) for each item from `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. Which JavaScript loop construct guarantees that its body runs **at least once**, even if the condition starts `false`?
   - A) `for (let i = 0; i < n; i++)`
   - B) `do { ... } while (condition)`
   - C) `while (condition)`
   - D) `for (const item of list)`

2. Inside a `for` or `while` loop, what does the `continue` statement immediately do?
   - A) Exits the entire enclosing loop permanently
   - B) Restarts the loop counter back to `0`
   - C) Terminates the whole function and returns `undefined`
   - D) Skips the rest of the current iteration and jumps to the next iteration check

3. Every recursive function requires a **base case** primarily in order to:
   - A) Convert CommonJS files into ES Modules
   - B) Sort array elements in ascending numeric order
   - C) Stop recursion cleanly and prevent infinite call-stack overflow
   - D) Force JavaScript to allocate primitives on the Heap

4. Which pair accurately describes **Stack** vs. **Queue** element removal order?
   - A) Stack is LIFO (Last-In, First-Out); Queue is FIFO (First-In, First-Out)
   - B) Stack is FIFO; Queue is LIFO
   - C) Both Stack and Queue always remove the smallest integer first
   - D) Both Stack and Queue iterate backwards only

5. Which built-in JavaScript collection automatically stores only unique values with zero duplicates?
   - A) `Array`
   - B) `RegExp`
   - C) `Object.seal()`
   - D) `Set`

6. What structural property distinguishes a classic **Tree** from a general **Graph**?
   - A) A Tree has a hierarchical root and strictly zero cycles, whereas Graphs may contain cycles
   - B) Trees store strings only while graphs store numbers only
   - C) Trees can never be traversed recursively
   - D) Graphs are always represented as 1D booleans

7. In data management, how does a JSON array of uniform `{ "id": 1, "score": 95 }` records differ from raw unformatted log prose?
   - A) JSON records cannot be read by software
   - B) Prose logs automatically support SQL queries without parsing
   - C) JSON records are structured/semi-structured with explicit fields for programmatic parsing, whereas prose logs are unstructured
   - D) JSON stores pixels only while prose stores integers

8. Why do ML data pipelines apply **One-Hot Encoding** to nominal text categories like `['AI', 'Security', 'Web']`?
   - A) To compress raw PNG images into SHA-256 hashes
   - B) To represent distinct categories as orthogonal binary vectors without inventing false numeric order
   - C) To sort CSV columns alphabetically in place
   - D) To delete rows containing numeric features

9. Which JavaScript loop iterates cleanly over the **values** of any iterable such as an `Array`, `String`, or `Set`?
   - A) `switch (iterable)`
   - B) `do...if (iterable)`
   - C) `for (const key in iterable)`
   - D) `for (const value of iterable)`

10. Which plain-text tabular file format separates columns with commas and records with newlines for lightweight spreadsheet/database exchange?
    - A) `CSV` (Comma-Separated Values)
    - B) `PNG`
    - C) `ELF`
    - D) `TLS`

---

## Part B: Concepts & Mental Models (`[L2 Understand]` — Questions 11–20)

11. Why does writing `break;` inside an `items.forEach((x) => { ... })` callback fail to work like a `for` loop?
    - A) `.forEach()` only accepts asynchronous promises
    - B) `.forEach()` skips even indices automatically
    - C) The callback is a separate function body, so `break` throws a `SyntaxError` and `return` only skips that single element
    - D) `.forEach()` mutates the array into an object before running

12. Why should developers avoid `for (const key in array)` when iterating over JavaScript arrays?
    - A) `for...in` runs slower because it sorts array elements first
    - B) `for...in` yields stringified keys (`"0"`, `"1"`) and inherited enumerable properties rather than array values in guaranteed order
    - C) `for...in` converts every number inside the array to `BigInt`
    - D) `for...in` throws a `TypeError` on any array longer than 10 items

13. Why does repeated `queue.shift()` on a 100,000-item JavaScript array become `O(n^2)` overall, whereas a head/tail pointer `Queue` or `LinkedList` stays `O(n)`?
    - A) `Array.shift()` hashes every string key in V8
    - B) `Array.shift()` runs inside a `setTimeout` macrotask
    - C) `LinkedList` stores items directly inside CPU L1 registers
    - D) `Array.shift()` must re-index and shift every remaining element down one slot (`O(n)` per dequeue)

14. Which properties silently disappear when calling `JSON.stringify(studentRecord)` on a plain object?
    - A) Function methods, `undefined` values, and `Symbol` keys
    - B) Strings, finite numbers, and nested arrays
    - C) Booleans and `null` values
    - D) Integer IDs equal to `0`

15. Why must BFS and DFS graph algorithms maintain a `visited = new Set()` structure?
    - A) To automatically double the matrix row count
    - B) To convert recursive functions into JSON strings
    - C) To avoid revisiting nodes repeatedly and looping infinitely when cycles (`A -> B -> A`) exist
    - D) To keep the graph sorted in ascending order

16. Which built-in `Object` static method returns an array of an object's own enumerable `[key, value]` pairs for clean `for...of` iteration?
    - A) `Array.from(obj)`
    - B) `Object.entries(obj)`
    - C) `Math.floor(obj)`
    - D) `JSON.parse(obj)`

17. Why do FERPA-compliant systems use **salted SHA-256 hashing** on `studentId` and `email` rather than storing plaintext identifiers in analytics tables?
    - A) SHA-256 lets analysts reverse-engineer the student's password later
    - B) SHA-256 turns categories into One-Hot binary arrays
    - C) Plaintext IDs cause `SyntaxError` in CSV parsers
    - D) Salted hashing hides real identities while deterministically linking records belonging to the same person across tables

18. Why does `[10, 2, 1].sort()` return `[1, 10, 2]` instead of `[1, 2, 10]` when no compare callback is passed?
    - A) `.sort()` converts elements to UTF-16 strings by default unless passed a numeric compare callback `(a, b) => a - b`
    - B) `.sort()` intentionally pushes the largest value into the middle
    - C) JavaScript arrays cannot sort single-digit numbers
    - D) `.sort()` strips digits after `"1"` automatically

19. Which three fundamental control-flow structures can express every structured algorithm in flowcharts and pseudocode?
    - A) Compilation, Minification, and Encryption
    - B) CSS Grid, Flexbox, and Shadow DOM
    - C) Sequence, Selection (branching), and Iteration (looping)
    - D) Stack, Pointer, and Cache Hit

20. How does `Array.prototype.some()` differ from `Array.prototype.every()` when validating array elements?
    - A) `.some()` mutates the array in place while `.every()` returns `undefined`
    - B) `.some()` returns `true` if **at least one** element passes the predicate, whereas `.every()` requires **all** elements to pass
    - C) `.every()` stops at index `0` regardless of array length
    - D) `.some()` only checks string indices

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
    - B) `6`
    - C) `18`
    - D) `12`

22. Trace the return value of `sumDigits(456)`:
    ```javascript
    function sumDigits(n) {
      if (n < 10) return n;
      return (n % 10) + sumDigits(Math.floor(n / 10));
    }
    ```
    - A) `15`
    - B) `10`
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
    - B) `[95, 88]`
    - C) `[97, 90]`
    - D) `[97, 90, 72]`

25. Given `const nums = [10, 20, 30, 40];`, what does `nums.slice(1, 3)` return, and does it mutate `nums`?
    - A) Returns `[20, 30, 40]` and mutates `nums`
    - B) Throws `TypeError` on `const` arrays
    - C) Returns `[10, 20]` and mutates `nums`
    - D) Returns `[20, 30]` and leaves `nums` unchanged

26. What does `[2, 4, 6].reduce((sum, val) => sum + val, 10)` evaluate to?
    - A) `22`
    - B) `12`
    - C) `48`
    - D) `10`

27. What does `getGrade(2)` return if `case 2` omits a `break` statement?
    ```javascript
    function getGrade(n) {
      let out = '';
      switch (n) {
        case 1: out += 'A'; break;
        case 2: out += 'B';
        case 3: out += 'C'; break;
        default: out += 'F';
      }
      return out;
    }
    ```
    - A) `'B'`
    - B) `'BC'`
    - C) `'A'`
    - D) `'BCF'`

28. Given `const roles = new Map([['ada', 'admin']]);`, which snippet updates Ada's role to `'lead'` and reads it back?
    - A) `roles.put('ada', 'lead'); roles['ada'];`
    - B) `roles.push('ada', 'lead'); roles.find('ada');`
    - C) `roles.set('ada', 'lead'); roles.get('ada');`
    - D) `roles.ada = 'lead'; roles.read('ada');`

29. Given `const [first, , third] = ['A', 'B', 'C'];`, what values do `first` and `third` hold?
    - A) `first === 'B'` and `third === 'C'`
    - B) Throws `SyntaxError` because of the empty slot
    - C) `first === 'A'` and `third === 'B'`
    - D) `first === 'A'` and `third === 'C'`

30. Given the 2D matrix `const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];`, what is the sum of its main diagonal elements (`m[i][i]`)?
    - A) `15`
    - B) `45`
    - C) `12`
    - D) `6`

---

## Part D: Debugging, Diagnostics & Trace Analysis (`[L4 Analyze]` — Questions 31–40)

31. A student writes `for (let i = 0; i <= scores.length; i++) sum += scores[i];` and prints `NaN`. What caused `NaN`?
    - A) `+=` cannot sum integers in JavaScript
    - B) Using `<=` reads `scores[scores.length]` which is `undefined`, and `number + undefined` evaluates to `NaN`
    - C) `let i = 0` starts one slot past the beginning
    - D) Arrays in JavaScript are 1-indexed

32. What happens when a caller passes `-42` into `sumDigits(n)` whose base case is written as `if (n < 10) return n;`?
    - A) It throws `SyntaxError`
    - B) It converts `-42` into `'42'`
    - C) It loops forever until heap memory runs out
    - D) `-42 < 10` evaluates `true`, immediately returning `-42` instead of handling sign/digits properly

33. Calling `function median(arr) { arr.sort((a, b) => a - b); ... }` introduces a subtle bug in production. What is the defect?
    - A) `.sort()` does not work on positive integers
    - B) `.sort((a, b) => a - b)` sorts in descending order
    - C) `.sort()` mutates the caller's original `arr` order in place instead of cloning via `[...arr].sort(...)`
    - D) `median` throws `RangeError` on odd-length arrays

34. A test runs `findReachableCourses(graph, 'CS101')` on `{ CS101: ['CS102'], CS102: ['CS101'] }` and times out after `15000ms`. What is missing?
    - A) Tracking seen nodes in a `visited = new Set()` before pushing neighbors onto the BFS queue
    - B) A `for...in` loop instead of `while`
    - C) Using `JSON.stringify(graph)` inside the loop
    - D) Setting `--stack-size=128`

35. Which pair of `Array` methods inserts an element at the **END** versus the **BEGINNING** (index `0`) of an array?
    - A) `.append()` vs. `.prepend()`
    - B) `.push()` appends to the end; `.unshift()` prepends to index `0`
    - C) `.pop()` vs. `.shift()`
    - D) `.slice()` vs. `.splice()`

36. Running `let n = 5; while (n > 0) { console.log(n); }` triggers an infinite loop. What caused the hang?
    - A) `console.log` pauses `while` loops permanently
    - B) `while` loops require `>=` instead of `>`
    - C) The loop body never decrements or updates `n` toward a terminating condition
    - D) `5` exceeds JavaScript's maximum loop integer

37. A buggy CSV parser turns `"NA"` into `""`, and another helper coerces cells with `Number(val)` before computing mean attendance. How does `Number("")` corrupt the dataset?
    - A) `Number("")` throws a `TypeError`
    - B) `Number("")` hashes the string automatically
    - C) `Number("")` converts strings to `Infinity`
    - D) `Number("")` evaluates to `0` instead of `null`, silently dragging the column mean downward as if blank entries were zero attendance

38. Automated tests fail with `AssertionError: caller records were modified` inside `imputeMissingNumeric(records, 'age', 'median')`. Which fix resolves it cleanly?
    - A) Return a new array of shallow-cloned objects `{ ...row, [field]: replacement }` leaving `records` untouched
    - B) Mutate `records[i].age = val` directly without cloning
    - C) Delete every row with `age === null`
    - D) Sort `records` in place by `age` first

39. Running `const user = users.find((u) => u.id === 99); console.log(user.name);` crashes with `TypeError` when ID `99` is absent. Why?
    - A) `.find()` mutates `users` into an empty object
    - B) `.find()` returns `undefined` when no element matches, so accessing `user.name` throws `TypeError` unless guarded
    - C) `.find()` throws `RangeError` whenever comparing integers
    - D) Arrow callbacks cannot evaluate `===`

40. A `transpose(matrix)` function accesses `matrix[0].length` unconditionally at line 1 and crashes on `[]` (`TypeError: Cannot read properties of undefined`). Which guard fixes empty matrices?
    - A) Return `null` for all 2D arrays
    - B) Catch syntax errors with `console.log`
    - C) Return `[]` immediately if `matrix.length === 0 || matrix[0].length === 0`
    - D) Wrap every number in `String(...)`

---

## Part E: Architecture & Tradeoff Evaluation (`[L5 Evaluate]` — Questions 41–50)

41. You must scan 500,000 sorted audit events to stop at the **very first** critical anomaly. Which iteration design should you choose and why?
    - A) `events.forEach(...)` with `return` because callbacks exit the loop early
    - B) `for...in` so prototype properties are checked first
    - C) Deep recursion over all 500,000 events because V8 guarantees infinite stack depth
    - D) `for (const event of events)` with `break` (or `.find()`), halting immediately in `O(1)` best-case rather than scanning all remaining elements

42. An endpoint enriches 20,000 enrollment rows by calling `students.find((s) => s.id === row.studentId)` inside the enrollment loop. Why must you refactor to `new Map(students.map((s) => [s.id, s]))`?
    - A) Linear `.find()` inside a loop scales as `O(n * m)` (~400M comparisons), whereas indexing a `Map` once cuts lookups to `O(1)` (`O(n + m)` total)
    - B) `Map` automatically encrypts `studentId` with SHA-256
    - C) `.find()` mutates the `students` array
    - D) `Map` uses zero heap memory

43. Implementing Breadth-First Search (`BFS`) on a university dependency graph of 80,000 courses, why does a custom head/tail `Queue` outperform `const q = []; q.shift();`?
    - A) `Array.shift()` cannot hold strings
    - B) Custom `Queue` avoids `O(n)` element shifting on every `dequeue()`, maintaining true `O(V + E)` graph traversal
    - C) Custom `Queue` skips visiting adjacent neighbors
    - D) `Array.shift()` creates cyclic edges automatically

44. Traversing a **balanced binary tree** of depth `12` vs. traversing a **degenerate singly-linked chain** of `100,000` nodes in Node.js: which strategy avoids crashing?
    - A) Use recursion for the 100,000-node chain and loops only for trees
    - B) Increasing loop indices to `<= length` prevents stack growth
    - C) Iterative `while` traversal is mandatory for the 100,000-node chain (`~100k` frames exceed V8's default call stack), while recursion stays concise for bounded depth-12 trees
    - D) Replacing `while` with `.forEach()` grows stack size safely

45. Before exporting diagnostic logs to an external analytics vendor, an engineer strips email addresses, SSNs, and API bearer tokens. Which security practice is this?
    - A) Loop unrolling optimization
    - B) Bitwise flag packing
    - C) Polynomial matrix multiplication
    - D) PII redaction / data sanitization to satisfy privacy compliance and prevent credential exposure

46. Evaluate the safest order of operations for an AI data ingestion pipeline before training a regression model:
    - A) Train model first -> Scale whole dataset -> Anonymize PII -> Deduplicate rows
    - B) Coerce/dedupe & anonymize PII -> Split train/test -> Fit imputation/scaling stats on train only -> Transform & encode
    - C) One-Hot encode names and SSNs directly -> Fill missing numbers with `"NA"`
    - D) Compute Pearson `r` on uncleaned string IDs -> Drop all numeric columns

47. Household sensor telemetry exhibits heavy right skew plus occasional `9999` hardware glitches. Which cleaning & scaling pair preserves valid signal integrity best?
    - A) Tukey IQR flagging + **Median** imputation + **Z-Score** standardization
    - B) Mean imputation + Min-Max `[0, 1]` scaling without outlier checks
    - C) Replacing `null` with `0` + ordinal encoding `{ sensorA: 1, sensorB: 2 }`
    - D) Deleting 90% of rows whose Z-score exceeds `0.5`

48. A student model encodes track labels as `{ AI: 1, Cybersecurity: 2, Web: 3 }` and retains raw `studentEmail` inside the numeric matrix. Which two architecture flaws occur?
    - A) One-Hot sparse explosion and missing `node:fs`
    - B) `BitSet` overflow and missing recursion base cases
    - C) False ordinal geometry (`Web = 3 * AI`) plus a severe **FERPA/GDPR PII leak** requiring salted SHA-256 hashing + One-Hot vectors instead
    - D) JSON drops boolean keys

49. A CSV import produces an array `rawEmails` containing repeated duplicate addresses. Which concise ES6+ expression returns an array of unique emails cleanly?
    - A) `rawEmails.filter(true)`
    - B) `rawEmails.sort().pop()`
    - C) `Object.freeze(rawEmails)`
    - D) `[...new Set(rawEmails)]`

50. Comparing two search articles (`500 words` vs `5,000 words`) on identical topics using word-count vectors, why does **Cosine Similarity** outperform Euclidean distance?
    - A) Cosine similarity runs in `O(1)` without looping over vector elements
    - B) Cosine similarity measures the **angle** between term frequency directions regardless of total document length, whereas raw Euclidean distance penalizes longer documents
    - C) Euclidean distance always returns negative numbers
    - D) Cosine similarity converts vectors into strings automatically
