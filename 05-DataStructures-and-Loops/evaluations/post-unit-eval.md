# Unit 5 Post-Unit Evaluation: Iteration, Data Structures & AI Data Pipelines (`Std 7.0, 6.0, AI 4.0–5.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 16`

### Part A — Paired Mastery (1 pt each)

1. **`[L1 Remember | Std 7.1 / 7.2]`** Distinguish `break` vs. `continue` inside a `for` loop (`7.2`).  
   > *(Your answer)*
2. **`[L2 Understand | Std 6.2]`** Contrast indexing an `Array` by `id` (`users.find(...)`, $O(n)$) vs. a hash `Map` (`usersById.get(id)`, $O(1)$) for 100,000 student records.  
   > *(Your answer)*
3. **`[L3 Apply | Std 7.4]`** Complete the variable trace table for every step where `sum` updates:  
   ```javascript
   let sum = 0;
   for (let i = 1; i <= 2; i++) {
     for (let j = 10; j <= 20; j += 10) {
       if (i === 2 && j === 10) continue;
       sum += i + j;
     }
   }
   ```  
   > Trace (`i, j, sum`): `(1,10, ___) -> (1,20, ___) -> (2,20, ___)` | Final `sum`: `____`
4. **`[L3 Apply | Std 6.5]`** Given `const matrix = [[1, 2], [3, 4], [5, 6]];`, write one expression reading `6`: `____________`. What are `matrix.length` and `matrix[0].length`? `____` rows × `____` cols.
5. **`[L4 Analyze | Std 7.1]`** What runtime failure occurs when calling `countdown(3)` below, and how do you fix it?  
   ```javascript
   function countdown(n) {
     console.log(n);
     countdown(n - 1);
   }
   ```  
   > *(Your diagnosis + fix)*
6. **`[L4 Analyze | Std 6.8]`** Given adjacency list `{ CS101: ['CS102'], CS102: ['CS201'], CS201: [] }`, is this structure best modeled as a linear Array or a Directed Graph / DAG? Why?  
   > *(Your analysis)*
7. **`[L2 Understand | AI 4.0]`** Distinguish **Salted SHA-256 Hashing** (`studentIdHash`) vs. **Hard Redaction (`[REDACTED]`)** when anonymizing a student CSV prior to ML ingestion.  
   > *(Your explanation)*
8. **`[L3 Apply | AI 5.0]`** Given `Q1 = 20`, `Q3 = 40`, compute `IQR` and the Tukey `1.5 * IQR` **upper outlier fence**: `IQR = ____` | `Upper Fence = ____`.

### Part B — Higher-Order Mastery (2 pts each)

9. **`[L4 Analyze | Std 6.1 / 7.1]`** Contrast `items.forEach(...)` vs. `items.map(...)` vs. `for...of` if you need to stop early (`break`) once a target is found. Which fails early-exit cleanly and why?  
   > *(Your analysis)*
10. **`[L5 Evaluate | Std 6.2 / 6.8]`** Design recommendation: A navigation app needs shortest-hop routing between intersections, while a dictionary needs instant word-to-definition lookup. Recommend the exact data structure (`Graph` vs. `Hash Map` vs. `2D Array` vs. `Tree`) for each and justify complexity.  
    > *(Your evaluation)*
11. **`[L5 Evaluate | AI 4.0, 5.0]`** A clinical dataset has normal heart-rate rows (`55–95 bpm`) plus one sensor glitch (`900 bpm`). Compare **Min-Max Scaling** vs. **Z-Score Standardization** (plus IQR filtering) and explain why **One-Hot Encoding** prevents bias on categorical columns.  
    > *(Your evaluation)*
12. **`[L6 Create | Std 6.5 / 7.3 / AI 5.0]`** Write a clean JS function `sumMatrixDiagonal(squareGrid)` using loops that sums only main-diagonal cells (`squareGrid[i][i]`) safely across an $n \times n$ 2D array.  
    ```javascript
    // Write your function below:
    ```
