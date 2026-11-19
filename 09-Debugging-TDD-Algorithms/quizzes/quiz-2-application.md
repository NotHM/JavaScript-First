# Unit 9 Quiz 2: Tracing Search, Sort, ML Evaluation & Fairness (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `6.4–6.7, 12.2–12.5, AI 1.0–7.0`

| # | Prompt / Trace | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | Binary Search splits search space in half each step. Complexity? | **$O(\log n)$** | 20s | `[L3 \| 6.7]` |
| 2 | Max comparisons for Binary Search on 1,000,000 sorted entries: | **~20** ($\log_2 10^6 \approx 20$) | 30s | `[L3 \| 6.7]` |
| 3 | Running `binarySearch([50, 10, 90], 10)` fails because: | **Array is UNSORTED** | 20s | `[L4 \| 6.7]` |
| 4 | Which sorting algorithm divides & merges recursively in $O(n \log n)$? | **Merge Sort** | 20s | `[L2 \| 6.6]` |
| 5 | Which simple sort excels near $O(n)$ on tiny nearly-sorted arrays? | **Insertion Sort** | 20s | `[L5 \| 6.6]` |
| 6 | Worst-case runtime of **Bubble Sort** on 10,000 reversed items: | **$O(n^2)$ (~100M ops)** | 30s | `[L4 \| 6.6]` |
| 7 | `Array.prototype.sort()` on `[10, 2, 1]` without comparator returns: | **`[1, 10, 2]` (lexicographical string sort!)** | 30s | `[L4 \| 6.4]` |
| 8 | Why fix `[10, 2].sort((a, b) => a - b)`? | **Forces numeric subtraction comparison** | 20s | `[L3 \| 6.4]` |
| 9 | Trace stack frame `(left=0, right=0)` with condition `while (left < right)`: | **Skips final index `0`!** | 30s | `[L4 \| 12.2]` |
| 10 | Best sorting choice when guaranteeing $O(n \log n)$ worst case on 500k rows: | **Merge Sort** | 20s | `[L5 \| 6.6]` |
| 11 | Model gets `TP=8, FP=2, TN=85, FN=5`. What is Precision `TP / (TP + FP)`? | **`0.80`** (`8 / 10`) | 30s | `[L3 \| AI 6.0]` |
| 12 | Model logs `trainError = 0.02` and `valError = 0.31`. What issue occurred? | **Overfitting (high variance)** | 30s | `[L4 \| AI 6.0]` |
| 13 | Group A selection rate is `0.80` and Group B is `0.50`. Disparate Impact ratio? | **`0.625` (FAILS `4/5ths` rule)** | 30s | `[L5 \| AI 7.0]` |
