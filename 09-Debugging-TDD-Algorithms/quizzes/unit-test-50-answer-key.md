# Unit 9 Mastery Exam — Teacher Answer Key (Q1–Q50)

**Unit:** Unit 9 — Testing, Debugging, Algorithms & ML Fairness | **Standards:** AZ CTE 12.1–12.5, 6.4–6.7 | West-MEC AI 1.0, 2.0, 6.0, 7.0  
**Companion Files:** [`unit-test-50.md`](./unit-test-50.md) (Student Exam) | [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv) (Kahoot Import)  
> **Instructor Note:** Keep this answer key restricted from student submission folders. Distractor notes target common conceptual misconceptions for rapid in-class remediation.

| Q# | Correct | Choice Summary | Standard & Bloom's | Rationale & Key Distractor Note |
|---|---|---|---|---|
| **Q1** | **C** | SyntaxError | `12.4` \| `[L1]` | Unmatched delimiters break JavaScript grammar during parsing, raising a SyntaxError before runtime; TypeError happens only when invalid runtime operations run. |
| **Q2** | **B** | Runtime TypeError | `12.4` \| `[L1]` | Dereferencing properties on null is syntactically valid and only fails during execution as a Runtime TypeError. |
| **Q3** | **A** | Write a failing test (RED) | `12.3` \| `[L1]` | RED guarantees the test actually exercises missing behavior and can fail before GREEN implementation begins. |
| **Q4** | **D** | node:test | `12.3` \| `[L1]` | Node ships node:test paired with node:assert/strict without third-party test framework dependencies. |
| **Q5** | **B** | node --inspect-brk | `12.5` \| `[L1]` | --inspect-brk breaks on the very first line so fast CLI scripts do not finish before Chrome DevTools or VS Code attaches. |
| **Q6** | **C** | O(n log n) | `6.6–6.7` \| `[L1]` | Merge Sort consistently halves arrays (log n levels) and performs linear n work merging at each level, yielding O(n log n) even in worst case. |
| **Q7** | **A** | Input array must be sorted | `6.7` \| `[L1]` | Binary Search discards half the search space based on ordering comparisons, which fails unless elements are sorted. |
| **Q8** | **D** | Dijkstra and Huffman coding | `6.4–6.6` \| `[L1]` | Dijkstra computes shortest weighted paths when edge weights are >= 0; Huffman builds greedy prefix-free variable-length encodings. |
| **Q9** | **B** | Unsupervised Learning | `AI 6.0` \| `[L1]` | Clustering discovers latent groupings from raw inputs without target labels, distinguishing Unsupervised from Supervised Learning. |
| **Q10** | **C** | Below 0.80 | `AI 7.0` \| `[L1]` | Four-fifths equals 0.80 (80%); ratios below 0.80 relative to the highest-selected group signal statistical disparate impact. |
| **Q11** | **A** | Tests modules/boundaries together | `12.3` \| `[L2]` | Unit tests exercise isolated pure functions quickly; integration tests validate wiring across file systems, databases, or module boundaries. |
| **Q12** | **D** | Silent until explicitly toggled | `12.5` \| `[L2]` | Toggleable debug assertions keep production logs clean while exposing rich diagnostic invariants during targeted troubleshooting. |
| **Q13** | **C** | typeof null evaluates to "object" | `12.4` \| `[L2]` | Because typeof null === "object" is a famous legacy JS quirk, defensive checks must explicitly test input !== null. |
| **Q14** | **B** | In-place, zero slice, O(n) best | `6.6` \| `[L2]` | Low constant factors, cache locality, zero extra memory slices, and O(n) near-sorted behavior make Insertion Sort ideal for small runs. |
| **Q15** | **A** | Merge O(n) RAM; Quick O(log n) | `6.6` \| `[L2]` | Merge Sort allocates auxiliary subarrays during merging (O(n) extra RAM), whereas in-place Quick Sort swaps inside the buffer using O(log n) call stack. |
| **Q16** | **D** | Integer index + avoids overflow | `6.7` \| `[L2]` | Truncating with Math.floor avoids fractional array keys in JS, and subtracting before dividing prevents integer overflow in typed/32-bit languages. |
| **Q17** | **C** | Greedy pop assumes paths only grow | `6.4` \| `[L2]` | Because Dijkstra greedily locks in the smallest unvisited distance, a later negative edge could reveal a shorter route to an already-settled vertex. |
| **Q18** | **B** | Prevents test-set data leakage | `AI 6.0` \| `[L2]` | Fitting scalers on validation or test data injects unseen evaluation distribution metrics into training parameters, artificially inflating reported scores. |
| **Q19** | **A** | Always-safe hits 99%, 0% recall | `AI 6.0` \| `[L2]` | Global accuracy rewards majority-class guessing while hiding complete failure on rare positive targets; Precision/Recall/F1 expose this defect. |
| **Q20** | **D** | Proxy features encode demographics | `AI 7.0` \| `[L2]` | Removing sensitive labels fails to guarantee fairness if proxy columns (ZIP code, browsing device, commute radius) reconstruct group membership. |
| **Q21** | **B** | [], [42], even unsorted, NaN/bad | `12.2` \| `[L3]` | Effective boundary suites check empty inputs, singletons, odd/even lengths, negatives, unsorted input, and invalid/NaN guards. |
| **Q22** | **C** | Logic Error: drop * 10 -> 108 | `12.4` \| `[L3]` | Code runs cleanly with valid JS syntax and types, yet computes an incorrect mathematical formula—a classic Logic Error. |
| **Q23** | **A** | mid=2 (30), then mid=3 (40) | `6.7` \| `[L3]` | mid = floor((0+4)/2) = 2 gives 30 < 40, so left shifts to 3; next mid = floor((3+4)/2) = 3 hits 40 cleanly. |
| **Q24** | **D** | ~20 | `6.7` \| `[L3]` | Since log2(1,048,576) = 20, halving the interval finds or eliminates a target in roughly 20 comparisons versus 1,000,000 for linear scan. |
| **Q25** | **B** | [2, 4, 5, 1] | `6.6` \| `[L3]` | Pass i=1 yields [2, 5, 4, 1]; pass i=2 shifts 5 right and inserts 4 between 2 and 5, yielding [2, 4, 5, 1]. |
| **Q26** | **C** | P=0.90 (18/20), R=0.60 (18/30) | `AI 6.0` \| `[L3]` | Precision = TP/(TP+FP) = 18/(18+2) = 0.90; Recall = TP/(TP+FN) = 18/(18+12) = 0.60. |
| **Q27** | **A** | y_hat=20, sq error=4 | `AI 6.0` \| `[L3]` | y_hat = 2.5 * 4 + 10 = 20; the error (y - y_hat) is 22 - 20 = 2, whose square is 4. |
| **Q28** | **D** | 0.70 < 0.80 (Fails 4/5ths) | `AI 7.0` \| `[L3]` | Disparate Impact compares protected selection rate to reference rate: 0.42 / 0.60 = 0.70, falling below the 0.80 EEOC threshold. |
| **Q29** | **B** | Relaxes to 7 (4 + 3 < 9) | `6.4–6.6` \| `[L3]` | Because candidate distance 4 + 3 = 7 is strictly less than current dist[v] = 9, Dijkstra relaxes dist[v] down to 7. |
| **Q30** | **C** | A (highest frequency 50) | `6.4` \| `[L3]` | Huffman coding places highest-frequency symbols shallowest near the root, minimizing weighted expected code length. |
| **Q31** | **A** | Off-by-one reads undefined -> NaN | `12.4–12.5` \| `[L4]` | Valid array indices end at nums.length - 1; reading nums[nums.length] yields undefined, turning total += undefined into NaN. |
| **Q32** | **D** | copy aliases same array ref | `12.2 / 6.4` \| `[L4]` | Assigning arr copies the reference pointer, not elements; callers stay untouched only when cloning via [...arr] or arr.slice(). |
| **Q33** | **B** | left=mid keeps left=0 forever | `6.7 / 12.5` \| `[L4]` | When left=0 and right=1, mid is 0; if arr[0] < target, setting left = mid assigns 0 again, creating an infinite loop. |
| **Q34** | **C** | Use hash-backed Set lookup | `6.6` \| `[L4]` | Nested pairs perform ~20 billion comparisons at n=200k (O(n^2)); checking seen.has(id) in a Set runs in linear O(n) time. |
| **Q35** | **A** | Already or reverse sorted input | `6.6` \| `[L4]` | Always picking an extreme value produces completely skewed 1-vs-(n-1) splits; random or median-of-three pivots prevent this. |
| **Q36** | **D** | High Variance (Overfitting) | `AI 6.0` \| `[L4]` | Very low training error paired with huge validation error signals the model memorized training patterns and fails on unseen data. |
| **Q37** | **B** | Test-set data leakage | `AI 6.0` \| `[L4]` | Normalization computed across all rows uses test distribution statistics before splitting; always split first, then fit scalers on train only. |
| **Q38** | **C** | Large scale dominates Euclidean | `AI 6.0` \| `[L4]` | Squaring a $50,000 salary gap dwarfs a 20-year age difference unless all numeric features are normalized to comparable scales. |
| **Q39** | **A** | Misses 72% of sick cases (FN) | `AI 6.0` \| `[L4]` | Recall = TP/(TP+FN) = 0.28 means 72% of true positives are missed (False Negatives), which is dangerous for medical screening. |
| **Q40** | **D** | Missing length <= 1 base case | `12.5 / 6.6` \| `[L4]` | Without halting when length <= 1, dividing single-element arrays generates endless self-calls until the JS call stack overflows. |
| **Q41** | **B** | Merge Sort (guaranteed bound) | `6.6` \| `[L5]` | Merge Sort guarantees worst-case O(n log n) latency regardless of input order, avoiding naive Quick Sort worst-case O(n^2) spikes. |
| **Q42** | **C** | Only 1 single lookup (k=1) | `6.7` \| `[L5]` | Sorting takes O(n log n) upfront; for a single one-off query on unsorted data, a linear O(n) pass avoids the sorting cost completely. |
| **Q43** | **A** | High Recall (minimize FN) | `AI 6.0` \| `[L5]` | When False Negatives carry severe safety risk, engineering teams prioritize high Recall first, balancing manageable false positives. |
| **Q44** | **D** | High Precision (minimize FP) | `AI 6.0` \| `[L5]` | High Precision ensures automated punitive actions trigger only with high confidence, routing ambiguous cases to human review. |
| **Q45** | **B** | More data, L2 reg, fewer features | `AI 6.0` \| `[L5]` | Overfitting decreases when capacity/noise is constrained (L2 regularization, simpler features) or supported by larger representative training sets. |
| **Q46** | **C** | Need richer model/features | `AI 6.0` \| `[L5]` | When a model cannot even capture training signal (high bias), more training data preserves the flat bias plateau—model complexity or feature quality must rise. |
| **Q47** | **A** | Block, audit proxies & calibrate | `AI 7.0` \| `[L5]` | Adverse impact (< 0.80) via proxy correlations fails fairness governance; teams must remediate root proxies, recalibrate, or gate deployment. |
| **Q48** | **B** | Keep unit + CI integration tests | `12.3` \| `[L5]` | Mocks validate isolated code assumptions, whereas automated CI integration tests catch schema/interface drift across real boundaries. |
| **Q49** | **D** | BFS, Dijkstra, Bellman-Ford | `6.4` \| `[L5]` | BFS finds minimum hops in O(V+E); Dijkstra handles non-negative weights efficiently; Bellman-Ford detects/handles negative edges. |
| **Q50** | **C** | Separates real change from luck | `12.2 / AI 6.0` \| `[L5]` | Seeded deterministic shuffling ensures every CI run tests identical partitions, making metric deltas trustworthy and reproducible. |
