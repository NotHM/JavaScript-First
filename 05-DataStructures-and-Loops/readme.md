# Chapter 5: Iterative Structures, Data Structures & AI Feature Pipelines (`Stds 6.0, 7.0 + AI 4.0–5.0`)

> **Before we touch a single array:** Most bugs that page on-call engineers at 2:14 AM aren't fancy distributed-systems failures. They're a `<=` where a `<` belonged in a shift-scheduling `for` loop, an `.unshift()` quietly turning an `O(n)` queue into an `O(n^2)` outage, or an uncleaned `"9999"` sensor glitch blowing up an entire machine-learning normalization step.

If you've ever watched a restaurant crew or warehouse shift fall behind because one worker keeps checking the same clipboard from row 1 every single time a new ticket arrives, you already understand why data structures and loop boundaries matter. Writing code that "works on a 4-item sample" is easy. Writing loops and data structures that survive 100,000 messy records without mutating state, overflowing the call stack, or leaking student PII? That's engineering.

---

## Chapter Map & Unit Hub

- **Setup & CLI Guide:** [`setup-guide.md`](./setup-guide.md) | **Unit Pacing & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Lesson 5.1 — Iterative Structures, Nested Loops, Trace Tables & Recursion (`Std 7.0`):**
  [`01-Iteration-and-Loops/readme.md`](./01-Iteration-and-Loops/readme.md) |
  [Slides](./01-Iteration-and-Loops/slides/slides.md) |
  [Student Lab](./01-Iteration-and-Loops/student-lesson.md)
- **Lesson 5.2 — Arrays, Hash Maps, Classic Structures, Matrices, Trees & Graphs (`Std 6.0`):**
  [`02-Arrays-Objects-Matrices/readme.md`](./02-Arrays-Objects-Matrices/readme.md) |
  [Slides](./02-Arrays-Objects-Matrices/slides/slides.md) |
  [Student Lab](./02-Arrays-Objects-Matrices/student-lesson.md)
- **Lesson 5.3 — Data Cleaning, Feature Vectors, Statistics & PII Anonymization (`CTE AI (11.0102.00) / Azure AI-900`):**
  [`03-Data-Cleaning-Vectors-and-Feature-Engineering/readme.md`](./03-Data-Cleaning-Vectors-and-Feature-Engineering/readme.md) |
  [Slides](./03-Data-Cleaning-Vectors-and-Feature-Engineering/slides/slides.md) |
  [Student Lab](./03-Data-Cleaning-Vectors-and-Feature-Engineering/student-lesson.md)
- **Assessments & Project:**
  [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) |
  [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md) |
  [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) |
  [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) |
  [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) |
  [`projects/unit-project.md`](./projects/unit-project.md)
- **Student TDD Workspaces:**
  [`0-student_files/06-data-structures/`](../0-student_files/06-data-structures/loopsAndStructures.test.js) |
  [`0-student_files/05-ai-data-pipeline/`](../0-student_files/05-ai-data-pipeline/dataPipelineLab.test.mjs) |
  [`0-student_files/projects/unit-05-matrix-gradebook/`](../0-student_files/projects/unit-05-matrix-gradebook/index.test.js)

---

## 1. Myth-Busting Loops: Why Off-by-One Bugs Ruin Shifts (`Std 7.0`)

Let's kill three JavaScript myths right out of the gate:

1. **Myth #1: "`.forEach()` is just a cleaner `for` loop."**  
   Nope. You **cannot** `break` or `continue` inside `.forEach()`. Writing `break` inside the callback throws a `SyntaxError`, and writing `return` only skips that single callback invocation—it keeps spinning through the remaining 99,999 elements. When you need early exit, reach for `for (const item of items)` or a classic index `for` loop.
2. **Myth #2: "`for...in` is the safe way to loop over arrays."**  
   Never use `for...in` on an array unless you enjoy debugging stringified indices (`"0"`, `"1"`) and accidental inherited properties. `for...in` iterates over *enumerable object keys*; **`for...of`** iterates over *iterable values* (`Array`, `String`, `Map`, `Set`).
3. **Myth #3: "Recursion is faster than loops."**  
   In JavaScript (where engines rarely perform Tail Call Optimization), every recursive call pushes a brand-new stack frame onto the V8 call stack. Forget the **base case**—or recurse 20,000 levels deep on a flat list—and Node crashes immediately with `RangeError: Maximum call stack size exceeded`.

### Choosing the Right Loop Construct

| Construct | Best Job | Early `break` / `continue`? | Classic Trap |
|---|---|---|---|
| `for (let i = 0; i < n; i++)` | Index math, 2D grids, reverse scans | Yes | Using `<= n` instead of `< n` reads `undefined` at index `n` |
| `while (cond)` | Unknown iteration count until condition flips | Yes | Forgetting to update the state variable creates an infinite loop |
| `do { ... } while (cond)` | Menu prompts / retries needing **at least 1 run** | Yes | Body executes even when `cond` starts `false` |
| `for (const x of list)` | Clean, readable value traversal | Yes | Needs `.entries()` if you also need the numeric index |
| `.forEach(fn)` | Pure side effects across *every* item | **No** | `return` only acts like `continue`; cannot `await` sequentially |
| **Recursion** | Trees, nested folders, divide-and-conquer | Base case `return` | Missing base case triggers stack overflow (`RangeError`) |

### The Trace Table Habit (Catch Bugs Before Hitting Run)

Imagine you run a coffee-shop shift scheduler: row `r` is the shift (`1..2`), column `c` is the station (`1..3`), and station `2` is closed for maintenance (`continue`). Don't guess what `total` equals—trace `(r, c, total)` on paper before you ever type `node`:

```javascript
let total = 0;
for (let r = 1; r <= 2; r++) {
  for (let c = 1; c <= 3; c++) {
    if (c === 2) continue;
    total += r * c;
  }
}
console.log('Final total:', total); // Step trace: (1,1)->1, (1,3)->4, (2,1)->6, (2,3)->12
```

#### Try this right now

Run a safe recursion vs. stack-limit experiment directly in your terminal using Node 24:

```bash
node -e "
function sumDigits(n) {
  if (n < 10) return n; // base case
  return (n % 10) + sumDigits(Math.floor(n / 10));
}
console.log('sumDigits(456):', sumDigits(456));
"
```

Then ask yourself: what happens if someone passes `-42` into `sumDigits`? Since `-42 < 10` is `true`, the base case fires early and returns `-42` instead of `6`! Always test negative and boundary inputs before shipping.

---

## 2. Arrays, Objects, 2D Matrices & The Big-O Reality Check (`Std 6.1–6.5`)

Think of a JavaScript `Array` as a numbered row of lockers welded side by side in memory. Jumping straight to locker `arr[42]` takes **`O(1)`** constant time. Searching for a student named `"Grace"` with `roster.find(...)` means opening lockers `0, 1, 2, ...` one by one (**`O(n)`**). And calling `roster.unshift(newStudent)` forces every single item down one locker—**`O(n)`** on every insert!

A **`Map`** or **`HashTable`**, by contrast, works like a coat-check ticket: pass `"S02"` into a hash function, jump straight to that slot in **`O(1)`** average time, and grab the record without scanning the building.

### Non-Mutating Array Pipelines vs. In-Place Traps

One of the fastest ways to corrupt state in JavaScript is confusing methods that return a **new array** with methods that **mutate the original array in place**:

- **Safe, non-mutating transforms:** `.map()`, `.filter()`, `.reduce()`, `.slice()`, `.toSorted()` (ES2023+)
- **In-place mutators (handle with care!):** `.push()`, `.pop()`, `.shift()`, `.unshift()`, `.splice()`, `.sort()`, `.reverse()`

```javascript
const rawScores = [95, 62, 88, 74];
// Clone before sorting, or use .toSorted(), so rawScores stays untouched:
const topPassing = rawScores
  .filter((score) => score >= 70)
  .map((score) => score + 5)
  .toSorted((a, b) => b - a);

const avg = topPassing.reduce((sum, s) => sum + s, 0) / topPassing.length;
console.log({ rawScores, topPassing, avg });
```

### 2D Matrices: Rows First, Columns Second (`grid[row][col]`)

A 2D matrix is simply an array of row arrays—a seating chart, a pixel grid, or a student gradebook where `gradeMatrix[studentIndex][assignmentIndex]` pinpoints one cell:

```javascript
const gradeMatrix = [
  [95, 88, 92], // Student 0
  [78, 84, 80], // Student 1
];

const rowAverages = gradeMatrix.map(
  (row) => row.reduce((acc, n) => acc + n, 0) / row.length
);
console.log('Student averages:', rowAverages);
```

Notice what happens if you accidentally serialize a rich record containing methods or `undefined` fields with `JSON.stringify({ id: 1, getAvg: () => 90 })`: **functions, `undefined`, and `Symbol` keys silently vanish** in JSON! Always serialize plain data records, never behavior.

---

## 3. Classic Structures: Stack, Queue, LinkedList, HashTable, BitSet, Trees & Graphs (`Std 6.3, 6.8`)

When built-in arrays aren't the right mechanical shape, engineers reach for classic structures—each built for a specific access pattern:

| Structure | Core Operations | Time Complexity | Real Engineering Analogy |
|---|---|---|---|
| **Stack (LIFO)** | `push`, `pop`, `peek` | `O(1)` top ops | Browser Back button, Undo stack, JS Call Stack |
| **Queue (FIFO)** | `enqueue`, `dequeue` | `O(1)` via head/tail pointers | Print spooler, BFS frontier, ticket line (never use `Array.shift()` at scale!) |
| **Linked List** | `append`, `prepend`, `toArray` | `O(1)` head/tail, `O(n)` search | Train cars linked by `.next` pointers—no contiguous array resize |
| **Hash Table / `Map`** | `set`, `get`, `delete` | `O(1)` avg, `O(n)` collision worst | Coat-check ticket lookup by ID; bucket chains resolve hash collisions |
| **BitSet (`Uint32Array`)** | `add`, `has`, `remove` | `O(1)` bitwise | 32 boolean feature flags packed into one 32-bit integer (`1 << offset`) |
| **Tree (Acyclic Root)** | Recursive DFS (`children`) | `O(V + E)` traversal | HTML DOM tree, ASTs, folder directories—strictly **zero cycles** |
| **Graph (Nodes + Edges)** | `visited` Set + BFS/DFS | `O(V + E)` | Course prerequisites, transit maps, social graphs—**cycles possible!** |

> **The Cycle Trap (`visited` Set):** Trees never loop back to an ancestor. Graphs *do*. Run DFS or BFS on a graph like `{ A: ['B'], B: ['A'] }` without a `visited = new Set()` check and your process freezes until memory runs out.

#### Try this right now

Test cycle-safe BFS in Node and compare what happens on a cyclic prerequisite graph:

```bash
node -e "
const graph = { JS101: ['JS201'], JS201: ['JS101', 'Web301'], Web301: [] };
function bfs(g, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of g[node] || []) {
      if (!visited.has(next)) { visited.add(next); queue.push(next); }
    }
  }
  return order;
}
console.log('Reachable from JS101:', bfs(graph, 'JS101'));
"
```

---

## 4. AI Data Pipelines: Cleaning, PII Masking & Feature Vectors (`CTE AI (11.0102.00) / Azure AI-900 | AI Stds 4.0, 5.0`)

Here is an uncomfortable truth about machine learning: **80% of real-world AI engineering is data hygiene, not training neural nets.** Feed garbage, duplicated rows, or raw student Social Security numbers into a model and you don't get "smart AI"—you get a compliance incident and broken predictions.

Every clean AI tabular pipeline follows a strict order of operations:

1. **Coerce & Deduplicate:** Parse CSV text, normalize `"NA"`, `""`, `"null"`, and `"NaN"` tokens into `null`, and deduplicate primary keys with a `Set` so one student log doesn't count twice.
2. **Impute Missing Values (Never Mutate Inputs!):**
   - **Mean:** Great for balanced, bell-shaped numeric features.
   - **Median:** Mandatory when outliers skew the data (one `9900` sensor spike wrecks the mean, while the median barely flinches).
   - **Mode:** Most frequent category for strings like `"AI"` vs `"Web"`.
3. **Mask PII Before Ingestion (`node:crypto`):** Strip raw names/SSNs with `[REDACTED]` and replace join keys (`studentId`, `email`) with salted SHA-256 pseudonymous hashes (`crypto.createHash('sha256')`) so FERPA/GDPR privacy stays intact.
4. **Flag Outliers with Tukey IQR Fences:**
   $$\text{IQR} = Q_3 - Q_1, \quad \text{Fences} = [Q_1 - 1.5 \cdot \text{IQR},\; Q_3 + 1.5 \cdot \text{IQR}]$$
5. **Scale & Encode Features Without Math Traps:**
   - **Min-Max Scaling (`[0, 1]`):** `(x - min) / (max - min)` — guard `max === min` to return `0` instead of `0 / 0 = NaN`! Beware: one extreme outlier squashes valid points near `0`.
   - **Z-Score Standardization:** `(x - mean) / stdDev` — centers features at mean `0`, unit variance `1` (guard `stdDev === 0` -> `0`).
   - **One-Hot Encoding:** Turns `['AI', 'Security', 'Web']` into `[1,0,0]`, `[0,1,0]`, `[0,0,1]` so models never hallucinate `'Web' > 'AI'`.
6. **Compare Vectors & Relationships:**
   - **Cosine Similarity (`[-1, 1]`):** Measures directional angle alignment $\frac{A \cdot B}{\|A\|\|B\|}$ (orthogonal vectors like `[1, 0]` and `[0, 1]` score `0`).
   - **Pearson Correlation $r$ (`[-1, 1]`):** Measures linear relationship strength between paired features (e.g., `studyHours` vs. `score`).

```javascript
import crypto from 'node:crypto';

const hashId = (id, salt = 'cte-ai') =>
  crypto.createHash('sha256').update(`${salt}:${id}`).digest('hex').slice(0, 16);

console.log('Pseudonym:', hashId('S101'));
```

---

## 5. Essential Terminal Commands & TDD Workflow

Run all Unit 5 instructor demos, student lab test suites, and the automated grader from the repository root:

```bash
# Run instructor reference demos and test suites
node 05-DataStructures-and-Loops/01-Iteration-and-Loops/code/loopsAndTraceDemo.js
node --test 05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/code/classicStructuresDemo.test.js
node --test 05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/code/aiDataPipelineDemo.test.mjs

# Run your RED -> GREEN student lab suites
node --test 0-student_files/06-data-structures/loopsAndStructures.test.js
node --test 0-student_files/05-ai-data-pipeline/dataPipelineLab.test.mjs
node --test 0-student_files/projects/unit-05-matrix-gradebook/index.test.js

# Check your live Unit 05 score in the course gradebook
npm run grade -- --unit 05
```

---

## 6. Unit 5 Error Triage Table

| Symptom / Error | Likely Root Cause | Concrete Fix |
|---|---|---|
| `RangeError: Maximum call stack size exceeded` | Missing or unreachable base case in recursion, or cyclic graph without `visited` | Add base-case `if (n <= 1) return 1;` or track nodes in `const visited = new Set()` |
| `SyntaxError: Illegal break statement` | Used `break` or `continue` inside `.forEach(...)` callback | Switch to `for (const x of arr)` or `.find()` / `.some()` |
| Matrix / array results include `NaN` | `0 / 0` during Min-Max (`max === min`) or Z-Score (`stdDev === 0`), or off-by-one `i <= arr.length` | Guard `span === 0 ? 0 : ...` and loop `i < arr.length` |
| Caller array/objects unexpectedly altered | Used `.sort()` or `.push()` or mutated record properties directly during imputation | Clone first (`[...arr]`, `{ ...record }`, `.toSorted()`) |
| `TypeError: Cannot read properties of undefined` on 2D grid | Swapped row/column bounds or ragged rows | Check `r < matrix.length` and `c < matrix[r].length` |
| `JSON.stringify` drops helper methods | Functions, `undefined`, and `Symbol` values are omitted by JSON spec | Serialize plain data DTOs only |

---

## Next Steps

1. Review environment flags and loop-safety settings in [`setup-guide.md`](./setup-guide.md).
2. Solve all TODOs in [`0-student_files/06-data-structures/`](../0-student_files/06-data-structures/loopsAndStructures.test.js), [`0-student_files/05-ai-data-pipeline/`](../0-student_files/05-ai-data-pipeline/dataPipelineLab.test.mjs), and [`0-student_files/projects/unit-05-matrix-gradebook/`](../0-student_files/projects/unit-05-matrix-gradebook/index.test.js) until `npm run grade -- --unit 05` turns **GREEN**.
3. Challenge yourself with the 50-question mastery exam at [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
