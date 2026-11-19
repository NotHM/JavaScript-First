# Unit 9 Post-Unit Evaluation: Debugging, TDD & Algorithms (`Std 12.0, 6.4–6.7`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

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

### Part B — Higher-Order Evaluation & Code (2 pts each)
7. **`[L5 | 6.6]`** An app sorts 200,000 shuffled invoice records once per minute, AND another view inserts 1 new item into an already-sorted 50-item tray. Pick **Merge Sort** vs. **Insertion Sort** vs. **Bubble Sort** for each task and defend Big-O behavior!  
   > *(Your evaluation)*
8. **`[L5 | 12.3]`** Why do engineering teams run `node --test` inside CI automatically BEFORE allowing PR merges rather than trusting "It passed on my laptop"?  
   > *(Your defense)*
9. **`[L6 | 12.2 / 6.4]`** Implement a clean non-mutating `insertionSort(arr)` returning a newly sorted ascending array using `[...arr]`.  
   ```javascript
   // Write insertionSort(arr):
   ```
