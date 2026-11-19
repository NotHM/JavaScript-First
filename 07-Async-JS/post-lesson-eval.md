# Post-Lesson 7.1 Evaluation: Exit Ticket (`Std 18.0`)

**Timing:** 5 min | **Score:** `____ / 5`

1. **`[L1 Remember]`** Put these Event Loop queues in highest-to-lowest execution priority: **Macrotasks**, **Synchronous Stack**, **Microtasks**:  
   `1. ____________ -> 2. ____________ -> 3. ____________`
2. **`[L2 Understand]`** Why use `Promise.allSettled()` instead of `Promise.all()` when 1 optional widget API fails (`18.1`)? `________________________________`
3. **`[L3 Apply]`** Write a minimal `ValidationError` subclass extending `Error` setting `this.name = 'ValidationError'` (`18.6`): `________________________`
4. **`[L4 Analyze]`** Match log severity tags (**`WARN`** vs **`ERROR`** vs **`FATAL`**) to scenarios (`18.4`):
   - Primary DB completely unreachable on startup: `________`
   - Optional avatar microservice slow so default placeholder served: `________`
5. **`[L5 Evaluate]`** Why is silently ignoring caught exceptions (`catch (e) {}`) dangerous compared to structured logging & re-throwing unknown errors (`18.1, 18.7`)?  
   > *(Your evaluation)*
