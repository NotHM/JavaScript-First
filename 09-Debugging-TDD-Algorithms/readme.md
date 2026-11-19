# Chapter 9: Testing, Debugging, Algorithms & ML Fairness Audits (`Stds 12.0, 6.4–6.7 | AI 1.0, 2.0, 6.0, 7.0`)

> **Before you guess why your loop returned `-1`:** Open a terminal and run `node --test 09-Debugging-TDD-Algorithms/code/algorithms.test.js`. If your response to any unexpected return value is to scatter six `console.log("here 1")` lines across a function and hope the answer reveals itself, welcome—this chapter replaces guesswork with repeatable engineering proof.

Let's be honest about something nobody puts on a coding bootcamp brochure: **most hours in real software engineering aren't spent typing greenfield features—they are spent proving why code behaved unexpectedly under weird inputs.**

Every semester I watch the exact same pattern play out. A student writes a clean sorting helper or binary search function, tests it once on `[1, 3, 5, 7, 9]`, gets `index 2`, closes the laptop, and feels unstoppable. Ten minutes later in grading—or ten minutes after deployment—someone passes `[]`, `[42]`, `"10" + 5`, negative numbers, or a `98%`-negative fraud dataset to a classifier, and the entire system silently lies without throwing a single visible error.

**Testing isn't extra homework bolted onto the end of a sprint. Testing is how you force assumptions into the open before users find them.**

Chapter 9 brings together three pillars every developer and ML engineer relies on: **systematic debugging & TDD (`AZ CTE Std 12.0`)**, **searching, sorting, graphs, compression & Big-O efficiency (`AZ CTE Std 6.4–6.7`)**, and **ML evaluation metrics & algorithmic fairness audits (`CTE AI (11.0102.00) / Azure AI-900 | AI Stds 1.0, 2.0, 6.0, 7.0`)**.

---

## Chapter Map, Environment Setup & Assessments

Bookmark these unit hubs before diving into the deep read:

1. **[Lesson 9.1 — Error Categories, Boundary Testing, Debugger & TDD (`Std 12.0`)](./01-Testing-and-Debugging/readme.md)**
   - Slides: [`01-Testing-and-Debugging/slides/slides.md`](./01-Testing-and-Debugging/slides/slides.md) | Student Lab: [`01-Testing-and-Debugging/student-lesson.md`](./01-Testing-and-Debugging/student-lesson.md)
   - Demos: [`debuggingAndTddDemo.test.js`](./01-Testing-and-Debugging/code/debuggingAndTddDemo.test.js), [`console.js`](./01-Testing-and-Debugging/code/console.js) & [`typeChecker.js`](./01-Testing-and-Debugging/code/typeChecker.js)
   - Student Starters: [`debuggingLab.test.js`](../0-student_files/10-debugging-tdd/debuggingLab.test.js) & [`algorithms.test.js`](../0-student_files/10-debugging-tdd/algorithms.test.js)
2. **[Lesson 9.2 — Searching, Sorting & Big-O Efficiency (`Std 6.4, 6.6–6.7`)](./02-Search-and-Sort-Algorithms/readme.md)**
   - Slides: [`02-Search-and-Sort-Algorithms/slides/slides.md`](./02-Search-and-Sort-Algorithms/slides/slides.md) | Student Lab: [`02-Search-and-Sort-Algorithms/student-lesson.md`](./02-Search-and-Sort-Algorithms/student-lesson.md) | Reference: [`BigO.md`](./02-Search-and-Sort-Algorithms/BigO.md)
   - Demos: [`searchAndSortDemo.test.js`](./02-Search-and-Sort-Algorithms/code/searchAndSortDemo.test.js), [`advancedAlgosAndBigODemo.test.js`](./02-Search-and-Sort-Algorithms/code/advancedAlgosAndBigODemo.test.js) & [`code/algorithms.test.js`](./code/algorithms.test.js)
   - Student Starter: [`sortSearchLab.test.js`](../0-student_files/10-debugging-tdd/sortSearchLab.test.js)
3. **[Lesson 9.3 — Machine Learning Algorithms, Evaluation Metrics & Fairness Audits (`AI 1.0, 2.0, 6.0, 7.0`)](./03-Machine-Learning-Algorithms-Eval-and-Fairness/readme.md)**
   - Slides: [`03-Machine-Learning-Algorithms-Eval-and-Fairness/slides/slides.md`](./03-Machine-Learning-Algorithms-Eval-and-Fairness/slides/slides.md) | Student Lab: [`03-Machine-Learning-Algorithms-Eval-and-Fairness/student-lesson.md`](./03-Machine-Learning-Algorithms-Eval-and-Fairness/student-lesson.md)
   - Demo & Lab: [`mlAlgorithmsAndFairnessDemo.mjs`](./03-Machine-Learning-Algorithms-Eval-and-Fairness/code/mlAlgorithmsAndFairnessDemo.mjs), [`mlAlgorithmsAndFairnessDemo.test.mjs`](./03-Machine-Learning-Algorithms-Eval-and-Fairness/code/mlAlgorithmsAndFairnessDemo.test.mjs) & [`mlMetricsAndFairnessLab.mjs`](../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs)

- **Environment & CLI Checklist:** [`setup-guide.md`](./setup-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Quizzes & 50-Q Mastery Exam:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md) ([`unit-09-algo-test-suite/index.test.js`](../0-student_files/projects/unit-09-algo-test-suite/index.test.js) & [`09-ml-fairness/mlMetricsAndFairnessLab.mjs`](../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs))
- **Automated TDD Check:** Run `npm run grade -- --unit 09`

---

## 1. Error Taxonomy: Why Silent Bugs Hurt More Than Crashes (`Std 12.1, 12.4`)

Beginners dread red stack traces. Senior engineers dread **code that runs with exit code `0` while returning garbage**. Knowing the four formal error categories speeds up triage because each category fails at a completely different phase of program execution:

| Category | When Caught | Real JavaScript Example | Failure Signature |
|---|---|---|---|
| **Syntax Error** | Parse time (before line 1 executes) | `if (score >= 90 {` (missing `)`) | V8 throws `SyntaxError` immediately; zero lines run |
| **Runtime Error** | During active execution | `user.email.toLowerCase()` when `user === undefined` | Throws `TypeError` / `ReferenceError` / `RangeError` with call stack |
| **Semantic Error** | Valid syntax, wrong language meaning | `if (role = 'admin')` or `"10" + 5` producing `"105"` | Executes silently, mutates state or coerces types incorrectly |
| **Logic Error** | Valid types, broken algorithm math | `while (left < right)` skipping 1-element `[42]` check | Returns wrong answer (`-1`) strictly on edge/boundary inputs |

### The Classic `typeof null` Trap & Boundary Testing (`Std 12.2`)

> **Myth:** *"If my function passes three normal numbers like `safeAverage([80, 90, 100])`, it's production-ready."*
> **Reality:** Real bugs live at **boundaries**—the edges where empty sets, singletons, zero, `NaN`, `-1`, `Infinity`, duplicate entries, and `null` break naive loop conditions.

```javascript
// Runnable boundary check (paste into node -e or run via node --check)
function inspectTypeSafely(value) {
  if (value === null) return 'null'; // Guards historical JS bug: typeof null === 'object'!
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

console.log('null:', inspectTypeSafely(null), '| raw typeof:', typeof null);
console.log('[]  :', inspectTypeSafely([]), '| raw typeof:', typeof []);
```

> **Try this right now:** Run Lesson 9.1's structured type-and-debug demos to see conditional `DEBUG_FLAGS`, `console.table()`, and `console.trace()` in action without littering permanent code:
> ```bash
> node 09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/code/console.js
> node 09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/code/typeChecker.js
> ```

---

## 2. Live Debugging (`--inspect`) & Red-Green-Refactor TDD (`Std 12.3, 12.5`)

Here is a real debugging scenario from grading labs: a binary search returns `-1` for `[42]` when searching `42`, yet works fine on `[10, 20, 42, 80]`. If you stare at the file for 20 minutes guessing, you waste time. If you pause execution on `while (left < right)` for five seconds, you watch `left` equal `0`, `right` equal `0`, `0 < 0` evaluate `false`, and the loop skip entirely.

You don't even need heavy third-party debuggers to inspect live call stacks and local variables:
1. **Conditional Console Assertions & Traces:** Toggle scoped `DEBUG_FLAGS` (`console.table(rows)`, `console.trace('checkpoint')`, or `console.assert(cond, msg)`).
2. **Node V8 Inspector (`--inspect` / `--inspect-brk`):** Launch `node --inspect-brk file.js`, open `chrome://inspect` in Chromium or press `F9` (breakpoint) + `F5` (Debug JS) in VS Code, then step with `F10` (Step Over) and `F11` (Step Into) while watching live **Variables** and **Call Stack** panes.
3. **Zero-Dependency Automated TDD (`node:test` + `node:assert/strict`):** Write the boundary test **before** fixing the code:
   - **RED:** Write an assertion specifying exact input/output/throws behavior—watch it fail so you know the test actually tests something!
   - **GREEN:** Write the cleanest implementation that satisfies the assertion (`while (left <= right)`).
   - **REFACTOR:** Remove duplication, extract clear helpers, and verify the suite stays green—then wire it into **Continuous Integration (CI)** on every Pull Request so **unit tests** (isolated functions in milliseconds) and **integration tests** (multi-module workflows) block regressions automatically.

```javascript
// Runnable Node 24 TDD boundary pattern (save or test inline)
const assert = require('node:assert/strict');

function safeAverage(nums) {
  if (!Array.isArray(nums) || nums.length === 0) {
    throw new RangeError('Non-empty array required');
  }
  const total = nums.reduce((acc, n) => {
    if (!Number.isFinite(n)) throw new TypeError('All elements must be finite numbers');
    return acc + n;
  }, 0);
  return total / nums.length;
}

assert.equal(safeAverage([42]), 42);
assert.throws(() => safeAverage([]), RangeError);
assert.throws(() => safeAverage([10, Number.NaN]), TypeError);
console.log('Boundary assertions passed cleanly!');
```

---

## 3. Searching, Sorting & Big-O Complexity (`Std 6.4, 6.6–6.7`)

Why does Big-O notation matter when computers run at billions of cycles per second? Because hardware speed multiplies constants; **algorithm complexity multiplies the problem size $n$**.

| Complexity | Scaling @ $n = 1{,}000$ | Scaling @ $n = 1{,}000{,}000$ | Classic Representative Algorithms |
|---|---|---|---|
| $O(1)$ | `1` op | `1` op | Array index lookup, `Map.get(key)`, bitwise mask check |
| $O(\log n)$ | `~10` ops | `~20` ops | **Binary Search** (requires sorted input!) |
| $O(n)$ | `1,000` ops | `1,000,000` ops | **Linear Search**, single `.reduce()` scan, Insertion Sort best case (nearly sorted) |
| $O(n \log n)$ | `~10,000` ops | `~20,000,000` ops | **Merge Sort** (guaranteed worst-case), **Quick Sort** (average), Huffman tree build |
| $O(n^2)$ | `1,000,000` ops | `1,000,000,000,000` ops | **Bubble Sort**, **Insertion Sort** (reverse-sorted worst), naive **Quick Sort** (bad pivot) |
| $O(2^n)$ | Explodes past $n = 30$ | Heat death of universe | Unmemoized tree recursion, exact Held-Karp TSP ($O(n^2 2^n)$) |

### Comparing the Four Core Sorting Engines

> **Myth:** *"Bubble Sort and Quick Sort are both fine for small apps, and Quick Sort is always faster than Merge Sort."*
> **Reality:** Bubble Sort wastes quadratic swaps everywhere except tiny classroom demos. **Insertion Sort** shines on tiny arrays ($n < 50$) or nearly sorted streams ($O(n)$). **Merge Sort** guarantees $O(n \log n)$ even on adversarial inputs (using $O(n)$ extra merge buffers—which is why V8's `Array.prototype.sort` uses TimSort!). **Quick Sort** divides around a **pivot** in-place with great CPU cache locality at $O(n \log n)$ *average* speed, **but degrades to $O(n^2)$ if a fixed first/last pivot repeatedly lands on already-sorted min/max values** unless you choose a randomized or median-of-three pivot!

Always copy inputs with `[...arr]` in library functions so sorting or searching never mutates the caller's original array:

```javascript
// Non-mutating Binary Search (O(log n)) — notice `left <= right`!
function binarySearch(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

console.log('Index of 42 in [42]:', binarySearch([42], 42));       // 0
console.log('Missing target 99 :', binarySearch([10, 20, 30], 99)); // -1
```

| Hand-Trace Step | `left` | `right` | `mid` | `sortedArr[mid]` vs `target (42)` | Loop Action (`while (left <= right)`) |
|---|---:|---:|---:|---|---|
| Init `[10, 20, 42, 80]` | `0` | `3` | `1` | `20 < 42` | Move `left = mid + 1 = 2` |
| Step 2 (`[42, 80]`) | `2` | `3` | `2` | `42 === 42` | Return `2` immediately |
| Singleton `[42]` edge | `0` | `0` | `0` | `42 === 42` | `0 <= 0` enters loop (`left < right` fails here!) |

```javascript
// Non-mutating Quick Sort using randomized/middle pivot to avoid O(n^2) sorted-input trap
function quickSort(arr) {
  if (arr.length <= 1) return [...arr];
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const equal = [];
  const right = [];
  for (const item of arr) {
    if (item < pivot) left.push(item);
    else if (item > pivot) right.push(item);
    else equal.push(item);
  }
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

console.log('QuickSort [9, -2, 9, 1]:', quickSort([9, -2, 9, 1])); // [-2, 1, 9, 9]
```

### Beyond Sorting: Graphs (Dijkstra) & Lossless Compression (Huffman)

Computer science algorithms solve real network routing and file compression daily—all testable in pure Node.js without extra libraries (see [`BigO.md`](./02-Search-and-Sort-Algorithms/BigO.md)):
- **Dijkstra's Shortest Path ($O((V + E)\log V)$ / array scan $O(V^2)$):** Finds minimum-cost routes from a source router to every node across **non-negative edge weights ($w \ge 0$)** greedily (while **Floyd-Warshall** solves all-pairs shortest paths in $O(V^3)$).
- **Huffman Coding ($O(n + k \log k)$):** Builds a **prefix-free binary tree** by repeatedly merging the two lowest-frequency symbols so frequent bytes (`' '`, `'e'`) encode in 2–3 bits while rare bytes take more bits with zero decoding ambiguity.

> **Try this right now:** Execute the entire Lesson 9.2 algorithm, Big-O loop analyzer, Dijkstra, and Huffman verification suites:
> ```bash
> node --test 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/searchAndSortDemo.test.js
> node --test 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/advancedAlgosAndBigODemo.test.js
> ```

---

## 4. Machine Learning Algorithms, Evaluation & Fairness (`AI 1.0, 2.0, 6.0, 7.0`)

Machine learning models fail silently in the exact same ways buggy loops do—except instead of failing on `[]`, an unaudited model fails on minority cohorts or rare fraud anomalies.

### Leakage-Free Splits, OLS Regression & k-Means

1. **Three ML Paradigms:** **Supervised** (labeled `(X, y)` regression/classification), **Unsupervised** (unlabeled `X` clustering like **k-Means** minimizing within-cluster inertia), and **Reinforcement Learning** (agent maximizing delayed reward).
2. **Preventing Data Leakage:** Partition deterministically with a seeded PRNG into **Train (`70%`) / Validation (`15%`) / Test (`15%`)**, and fit scalers/imputers **strictly on `train`**. Letting `test` means or variances leak into `train` fakes high offline scores that collapse in production.
3. **Ordinary Least Squares (OLS):** Fits $\hat{y} = mx + b$ minimizing squared residuals, evaluated by **`RMSE`** (error in target units) and **$R^2$** (variance explained, up to `1.0`).

### Confusion Matrix, Accuracy Paradox & Bias-Variance Diagnostics

Suppose only **2 out of 100** credit transactions are fraudulent (`98%` legitimate). A lazy stub model that returns `0` ("legitimate") for **every single transaction** scores **`98%` Accuracy**—and catches **0% of fraud**! That trap is the **Accuracy Paradox**. Instead, inspect the full **Confusion Matrix**:

| Metric | Formula | Optimize When... |
|---|---|---|
| **Precision** | $\frac{TP}{TP + FP}$ | False alarms waste human review or block legitimate users (spam filters) |
| **Recall** | $\frac{TP}{TP + FN}$ | Missing a positive case is dangerous or costly (cancer screening, fraud) |
| **F1-Score** | $\frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$ | Class distributions are skewed and you must balance both errors |

When comparing training vs. validation loss:
- **Underfitting (High Bias):** Both `trainError` (`0.33`) and `valError` (`0.35`) are high—model is too simple.
- **Overfitting (High Variance):** `trainError` looks pristine (`0.01`), while `valError` explodes (`0.30`)—model memorized training noise!

### The EEOC `4/5ths` (`80%`) Disparate Impact Rule

> **Myth:** *"We dropped the `race` and `gender` columns from our training CSV, so our hiring model is mathematically guaranteed to be fair."*
> **Reality:** Correlated **proxy features** (ZIP codes, commute time, school names) reconstruct protected traits automatically. Under the **EEOC 4/5ths (`80%`) Rule**:
> $$\text{Disparate Impact Ratio} = \frac{\text{Selection Rate}_{\text{unprivileged}}}{\text{Selection Rate}_{\text{privileged}}}$$
> If that ratio drops **below `0.80`**, your model exhibits illegal adverse impact—failing an automated CI fairness gate just as decisively as a crashed unit test!

> **Try this right now:** Run the zero-dependency ML regression, k-Means, Accuracy Paradox, and Disparate Impact audit suite:
> ```bash
> node --test 09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/code/mlAlgorithmsAndFairnessDemo.test.mjs
> ```

---

## 5. Chapter 9 Terminology & Error Triage Reference

| Term | Crisp Engineering Meaning |
|---|---|
| **Red-Green-Refactor** | Failing boundary test first (Red) -> minimal passing fix (Green) -> clean readable structure (Refactor) |
| **Big-O ($O(\cdot)$)** | Asymptotic upper bound describing how operations scale as input size $n \to \infty$ |
| **Data Leakage** | Allowing validation/test statistics to influence training transforms, producing fake offline performance |
| **Accuracy Paradox** | High overall accuracy on imbalanced data masking near-zero Recall on the rare target class |
| **Disparate Impact (`< 0.80`)** | Unprivileged-to-privileged selection ratio violating the EEOC 4/5ths fairness threshold |

| Symptom / Failure | Root Cause | Exact Diagnostic Fix |
|---|---|---|
| `binarySearch([42], 42)` returns `-1` | Loop condition `while (left < right)` skips index `0 === 0` | Use `while (left <= right)` and check `sortedArr[mid] === target` |
| `node --test` passes locally yet breaks caller's array | Sort helper swapped elements directly on original `arr` | Clone input with `const copy = [...arr]` before sorting |
| Model reports `98%` Accuracy yet misses every fraud case | Class imbalance (`98:2`) hides `Recall = 0` | Evaluate Confusion Matrix (`Precision`, `Recall`, `F1`) instead of raw Accuracy |
| `trainError = 0.02`, `valError = 0.31` | Overfitting (high variance memorizing noise) | Simplify features, regularize, or expand diverse training examples |
| `chrome://inspect` skips straight past code | Launched `node file.js` without break flag | Launch `node --inspect-brk file.js` or set `debugger;` / VS Code `F9` breakpoint |

---

## Ready to Test Your Mastery?

1. Verify your Node debugging & `--test` toolchain with [`setup-guide.md`](./setup-guide.md).
2. Turn every RED test GREEN across [`debuggingLab.test.js`](../0-student_files/10-debugging-tdd/debuggingLab.test.js), [`algorithms.test.js`](../0-student_files/10-debugging-tdd/algorithms.test.js), [`sortSearchLab.test.js`](../0-student_files/10-debugging-tdd/sortSearchLab.test.js), [`mlMetricsAndFairnessLab.mjs`](../0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.mjs), and [`unit-09-algo-test-suite/index.test.js`](../0-student_files/projects/unit-09-algo-test-suite/index.test.js) until `npm run grade -- --unit 09` prints **GREEN**.
3. Challenge yourself on the 50-question mastery exam in [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
