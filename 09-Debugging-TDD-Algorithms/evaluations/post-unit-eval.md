# Unit 9 Post-Unit Evaluation: Debugging, TDD, Algorithms & ML Fairness (`Std 12.0, 6.4–6.7, AI 1.0–7.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 16`

### Part A (1 pt each)
1. **`[L1 | 12.4]`** Classify each bug into **Syntax**, **Runtime**, **Semantic**, or **Logic**:  
   - Calling `undefined.toUpperCase()` → `________`  
   - Missing closing `)` in `if (x > 1 {` → `________`  
   - Multiplying by `1.8` instead of dividing in metric converter → `________`  
   - Adding tax to a string `"10" + 2 = "102"` → `________`
2. **`[L2 | 12.3]`** Distinguish a **Unit Test** vs. an **Integration Test** (`12.3`).  
   > *(Your contrast)*
3. **`[L3 | 6.7]`** How many comparisons does **Binary Search** need in the worst case across **1,024** sorted records vs. Linear Search?  
   > Binary: ~`____` | Linear: `____`
4. **`[L3 | 12.2]`** Write 3 distinct **boundary test assertions** for `divideCents(total, count)` (`[]`/`0`/negative).  
   > *(3 boundary cases)*
5. **`[L4 | 6.7]`** Trace why `while (left < right)` misses a 1-element `[7]` array target check vs `while (left <= right)`:  
   > *(Your trace)*
6. **`[L4 | 12.5]`** Inspect stack trace `TypeError: Cannot read properties of undefined (reading 'trim') at sanitize (auth.js:14:22)`. What exact file, line, column, and failing value occurred?  
   > *(Your diagnosis)*
7. **`[L3 | AI 6.0]`** A binary classifier logs `TP = 6, FP = 4, TN = 88, FN = 2`. Compute **Precision** and **Recall**: `Precision = ____` | `Recall = ____`.
8. **`[L4 | AI 6.0]`** Classify two runs: Run A has `trainError = 0.01, valError = 0.30`; Run B has `trainError = 0.33, valError = 0.35`. Which is **Overfitting** vs. **Underfitting**?  
   > Run A: `______________` | Run B: `______________`

### Part B — Higher-Order Evaluation & Code (2 pts each)
9. **`[L5 | 6.6]`** An app sorts 200,000 shuffled invoice records once per minute, AND another view inserts 1 new item into an already-sorted 50-item tray. Pick **Merge Sort** vs. **Insertion Sort** vs. **Bubble Sort** for each task and defend Big-O behavior!  
   > *(Your evaluation)*
10. **`[L5 | 12.3]`** Why do engineering teams run `node --test` inside CI automatically BEFORE allowing PR merges rather than trusting "It passed on my laptop"?  
    > *(Your defense)*
11. **`[L5 | AI 1.0, 2.0, 7.0]`** Explain why **Accuracy** fails on a `98%`-negative fraud dataset (**Accuracy Paradox**) AND evaluate what a **Disparate Impact Ratio = `0.65`** (`< 0.80`) reveals about a credit model even when `"race"` and `"gender"` columns were deleted.  
    > *(Your evaluation)*
12. **`[L6 | 12.2 / 6.4]`** Implement a clean non-mutating `insertionSort(arr)` returning a newly sorted ascending array using `[...arr]`.  
    ```javascript
    // Write insertionSort(arr):
    ```
