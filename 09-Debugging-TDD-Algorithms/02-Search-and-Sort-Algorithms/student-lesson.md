# Student Lesson 9.2: Search & Sort Algorithms (`Std 6.4, 6.6–6.7`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/10-debugging-tdd/sortSearchLab.test.js`](../../0-student_files/10-debugging-tdd/sortSearchLab.test.js)

## Part A: Big-O & Algorithm Tradeoffs (`[L1 Remember]` & `[L2 Understand]`)
| Algorithm | Required Input Order | Best Time | Worst Time | Extra Space |
|---|---|---|---|---|
| Linear Search | `____________` | $O(1)$ | `________` | $O(1)$ |
| Binary Search | `____________` | $O(1)$ | `________` | $O(1)$ |
| Insertion Sort | Any | `________` | $O(n^2)$ | $O(1)$ |
| Merge Sort | Any | $O(n \log n)$ | `________` | `________` |

## Part B: Search & Sort Lab (`[L3 Apply]`)
Open [`0-student_files/10-debugging-tdd/sortSearchLab.test.js`](../../0-student_files/10-debugging-tdd/sortSearchLab.test.js), implement non-mutating `insertionSort`, `mergeSort`, and `binarySearch`, and pass `node --test 0-student_files/10-debugging-tdd/sortSearchLab.test.js`.

## Part C: Trace Binary Search (`[L4 Analyze]`)
Trace `binarySearch([10, 20, 30, 40, 50, 60, 70], 20)`:
- Iteration 1: `left = 0`, `right = 6`, `mid = ___`, `arr[mid] = ___` → Action: `______________`
- Iteration 2: `left = ___`, `right = ___`, `mid = ___`, `arr[mid] = ___` → Return: `___`

## Part D: Architecture Defense (`[L5 Evaluate]`)
Your app receives `40` nearly sorted log timestamps per second AND once per night sorts `500,000` shuffled audit events. Choose which sorting algorithm handles each job and justify your decision using Big-O tradeoffs:  
> *(Your defense)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — confirm passing `node --test` results**):

- [ ] **SL-L9.2-1 (`[L1–L2 Remember/Understand]` | Std `6.6–6.7` | `SG-U09-1`):** Complete the Part A Big-O and input-order table accurately with >= 80% accuracy on Day 43.
- [ ] **SL-L9.2-2 (`[L3 Apply]` | Std `6.4, 11.14` | `SG-U09-2`):** Implement non-mutating `insertionSort`, `mergeSort`, and `binarySearch` in `sortSearchLab.test.js` passing `node --test` by end of Day 44.
- [ ] **SL-L9.2-3 (`[L4 Analyze]` | Std `6.7` | `SG-U09-3`):** Trace every `left`, `right`, and `mid` update in Part C accurately before Kahoot Quiz 2 on Day 44.
- [ ] **SL-L9.2-4 (`[L5–L6 Evaluate/Create]` | Std `6.6` | `SG-U09-4`, `SG-U09-5`):** Defend your Part D sorting algorithm choices using Big-O scaling tradeoffs and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 45.
