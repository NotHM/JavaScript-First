# Lesson Plan 7.1: Asynchronous Concurrency & Exception Handling (`Std 18.0`)

**Unit:** Unit 7 | **Duration:** 5 Class Periods × 50 min | **Stds:** `18.1`–`18.7`, `16.3`

## Bloom's Objective Ladder
- **L1–L2:** State Event Loop queue priority, Promise states, error types (`18.2–18.3`), severity levels (`18.4`), and `Promise.all` vs `Promise.allSettled`.
- **L3 Apply:** Extend built-in `Error` (`ValidationError`) and implement `try`/`catch`/`finally` guards (`18.5–18.7`).
- **L4 Analyze:** Trace nested microtasks (`Promise.then` inside `Promise.then`) firing BEFORE `setTimeout(0)`.
- **L5 Evaluate:** Architect fault-tolerant service calls pairing `WARN` fallbacks vs critical `ERROR` propagation.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 7.1 (4m), Slides + Live Event Loop Whiteboard Trace (30m), Part A & C Trace Check (16m).
- **Day 2–3:** Standard `18.0` Error Mastery (`18.1–18.7`), Custom Error Classes, `code/asyncDemo.js` walkthrough & `asyncLab.js`.
- **Day 4–5:** `EventEmitter` telemetry + Graceful Degradation Part D + Unit 7 Project & Post-Lesson 7.1 Exit Ticket.
- **Pre 7.1 Key:** 1) `pending`, `fulfilled`, `rejected`; 2) Syntax breaks grammar at parse time; Runtime crashes mid-flight; Logic returns invalid results silently; 3) `A, D, C, B`; 4) `finally`.
- **Post 7.1 Key:** 1) `Synchronous Stack -> Microtasks -> Macrotasks`; 2) `Promise.allSettled()` isolates partial failures so healthy tasks still resolve for graceful degradation; 3) `class ValidationError extends Error { constructor(m) { super(m); this.name = 'ValidationError'; } }`; 4) Primary DB unreachable = `FATAL`; fallback avatar = `WARN`; 5) Empty `catch` swallows bugs silently turning trackable failures into mysterious corruption.
- **Worksheet Part A & C Key:** Severity: `DEBUG -> INFO -> WARN -> ERROR -> FATAL`. Part C Output: `1, 5, 3, 4, 2` because nested microtask drains cleanly BEFORE macrotask queue ticks!
