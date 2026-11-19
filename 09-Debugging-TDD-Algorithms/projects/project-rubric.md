# Unit 9 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Sort & Search Implementations (`6.4–6.7`)** | L3 Apply | Non-mutating `insertionSort`, `mergeSort`, `binarySearch` pass every case cleanly. | Mutates input arrays in place or off-by-1 in `binarySearch`. | Missing Merge Sort or broken Binary Search. |
| **Boundary Test Coverage (`12.2–12.3`)** | L4 Analyze | `node --test` tests cover empty, 1-element, negative, duplicates & not-found boundaries. | Only tests happy-path integer arrays. | Zero passing `node:test` assertions. |
| **Empirical Benchmarking (`6.6`)** | L5 Evaluate | Compares comparison counts clearly on $N=1000$ proving $O(n \log n)$ vs $O(n^2)$ scaling. | Prints timing/counts without interpretation. | Missing empirical comparison. |
| **Error Guards (`12.4`)** | L6 Create | Validates non-array inputs cleanly throwing descriptive `TypeError`s. | Partial input checks. | Crashes cryptically on null/undefined. |
