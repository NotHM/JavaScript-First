# Student Lesson 8.2: JSON vs. XML, SOLID & Patterns (`Std 17.11, 17.13`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/09-oop-patterns/patterns.js`](../../0-student_files/09-oop-patterns/patterns.js)

## Part A: JSON vs. XML & SOLID Checklist (`[L1 Remember]` & `[L2 Understand]`)
1. Convert the JSON object below into an equivalent **XML** snippet:
   JSON: `{ "id": 5, "course": "JS First", "active": true }`  
   XML:  `____________________________________________________`
2. Match each scenario to the **SOLID** principle it violates:
   - `StudentService` handles SQL connections, PDF layout, AND email templates: `__________________`
   - Adding a `StripeGateway` requires editing 4 switch blocks in `PaymentProcessor.js`: `__________________`

## Part B: Factory, Decorator & Observer Lab (`[L3 Apply]`)
Open [`0-student_files/09-oop-patterns/patterns.js`](../../0-student_files/09-oop-patterns/patterns.js), implement `createNotification` (Factory), `withTimestamp` (Decorator), and `Observable` (Observer), add test calls at the bottom, and execute in Node!

## Part C: XML Injection & Broken State Analysis (`[L4 Analyze]`)
1. What breaks if a user names their product `"Salt & Pepper <1lb>"` inside `<title>${title}</title>` without escaping `&` or `<`? `________________________`
2. Trace `OrderStateMachine` (`DRAFT -> PAID -> SHIPPED`): what prevents refunding or jumping straight from `DRAFT` to `SHIPPED`? `________________________`

## Part D: Architecture Pattern Critique (`[L5 Evaluate]`)
Design an e-commerce notification & checkout subsystem requiring (1) multiple pluggable messaging channels, (2) zero-modification addition of timing logs, and (3) automatic analytics updates when orders ship. Assign **Factory**, **Decorator**, and **Observer** cleanly and defend against SOLID principles (`17.13`):  
> *(Your architectural design)*
