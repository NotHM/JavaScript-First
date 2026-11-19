# Unit 7 Guide: Asynchronous Concurrency & Runtime Error Handling

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 12 (Days 57–61 | 5 Class Periods × 50 Minutes)

## 1. Unit Overview
Unit 7 delivers complete mastery of **AZ CTE Standard 18.0 (Runtime Concurrency & Exception Handling Engineering)** combined with Node's **Event Loop, Promises, `Promise.all` vs. `Promise.allSettled`, `EventEmitter`, and Streams**. Students classify error origins & severity levels (`18.1–18.4`), guard against unexpected return values (`18.5`), design custom `Error` subclasses (`18.6`), and coordinate resilient `try`/`catch`/`finally` flows (`18.7`).

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 7 Deliverable |
|---|---|---|
| **Standard 18.0** — Runtime & Error Handling Techniques | `18.1` Graceful degradation & propagation; `18.2` Syntax vs logic errors; `18.3` Runtime errors; `18.4` Severity logs; `18.5` Unexpected return values (`null`/`NaN`); `18.6` Built-in & Custom `Error` classes; `18.7` `try`/`catch`/`finally`/`throw` | [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md), [`code/asyncDemo.js`](./code/asyncDemo.js) |
| **Standard 16.0** — Streams & Async I/O | `16.3` Sequential chunked stream processing without OOM spikes | `EventEmitter` & Streams overview |
| **AZ CTE Prof. Skills** | `3.0` Thinking & Innovation | Event Loop queue tracing & resilience planning |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | State Event Loop execution queues (**Call Stack → Microtask → Macrotask**), Promise states, & built-in JS `Error` classes (`18.6`) | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Contrast `Promise.all()` (fail-fast) vs. `Promise.allSettled()` (graceful degradation `18.1`) & `finally` cleanup | Slides, `readme.md` |
| **L3 Apply** | Write `async`/`await` concurrent tasks, custom `Error` classes (`ValidationError`), and `try`/`catch`/`finally` (`18.6–18.7`) | `0-student_files/08-async-js/asyncLab.js` |
| **L4 Analyze** | Trace console output order across mixed sync / `Promise.resolve().then()` / `setTimeout` callbacks and catch unhandled rejections | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Select `Promise.all` vs `allSettled`, log severity tiers (`WARN` vs `FATAL`), and fallback strategies for partial outages (`18.1, 18.4`) | Post-Unit Eval Q7–Q8 |
| **L6 Create** | Build a **Resilient Async Task Pipeline** emitting typed severity events & isolating failed tasks via custom errors & `finally` locks | **Unit 7 Project** (`0-student_files/projects/unit-07-resilient-pipeline/`) |
