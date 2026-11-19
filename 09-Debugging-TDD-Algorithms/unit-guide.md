# Unit 9 Guide: Testing, Debugging & Searching/Sorting Algorithms

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 9 (Days 40–45 | 6 Class Periods × 50 Minutes)

## 1. Unit Overview
Unit 9 delivers dedicated mastery of **AZ CTE Standard 12.0 (Testing & Debugging Program Operation)** and **AZ CTE Standard 6.4–6.7 (Sorting & Searching Efficiency)**. Students classify syntax/semantic/logic/runtime failures, execute Red-Green-Refactor TDD with `node:test`, inspect call stacks via breakpoints, and benchmark Linear vs. Binary Search and Bubble/Insertion/Merge Sort.

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 9 Lessons |
|---|---|---|
| **Standard 12.0** — Test & Debug to Verify Operation | `12.1` Explain errors; `12.2` Boundary test data; `12.3` Automated/integration/CI tests; `12.4` Syntax/semantic/logic/runtime errors; `12.5` Hand-tracing & live debugger | **Lesson 9.1:** [`01-Testing-and-Debugging/`](./01-Testing-and-Debugging/readme.md) |
| **Standard 6.0 & 11.14** — Search & Sort Efficiency | `6.4` Implement search & sort; `6.6` Bubble, Insertion & Merge sort complexity; `6.7` Linear $O(n)$ vs. Binary Search $O(\log n)$ | **Lesson 9.2:** [`02-Search-and-Sort-Algorithms/`](./02-Search-and-Sort-Algorithms/readme.md) |
| **AZ CTE Prof. Skills** | `3.0` Thinking & Innovation | Root-cause isolation & algorithmic benchmarking |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | State all 4 error categories (`12.4`), Red-Green-Refactor steps (`12.3`), and Big-O bounds for Search/Sort (`6.6–6.7`) | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Contrast unit vs. integration testing and why Binary Search requires a pre-sorted array | Slides, Lesson 9.1–9.2 |
| **L3 Apply** | Write boundary test cases with `node:test`, implement `binarySearch`, `insertionSort`, and `mergeSort` | `0-student_files/10-debugging-tdd/` |
| **L4 Analyze** | Trace call stacks via VS Code debugger (`F9`) to isolate semantic/logic bugs (`off-by-one`) | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Select Bubble/Insertion vs. Merge Sort and Linear vs. Binary Search given input size ($n=10$ vs $n=10^6$) & sortedness | Post-Unit Eval Q8–Q9 |
| **L6 Create** | Build a **Benchmarked Search/Sort Library & Automated Edge-Case Test Suite** with zero unhandled crashes | **Unit 9 Project** (`0-student_files/projects/unit-09-algo-test-suite/`) |
