# Unit 8 Post-Unit Evaluation: OOP, Formats & Design Patterns (`Std 17.0`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

### Part A (1 pt each)
1. **`[L1 | 17.1–17.5]`** Identify which OOP feature hides `#balance` behind a validating `set balance(v)` method (`Encapsulation` vs `Polymorphism`): `____________`
2. **`[L2 | 17.11]`** Why do REST APIs almost universally prefer **JSON** over **XML**, yet legacy SOAP/banking/feed configs sometimes retain XML?  
   > *(Your explanation)*
3. **`[L3 | 17.3–17.4]`** Write `class Wallet` holding private `#cents = 0`, initializing via constructor, and throwing `RangeError` inside `deposit(n)` if `n <= 0`.  
   > *(Code)*
4. **`[L3 | 17.8]`** Define polymorphism concisely using two subclasses (`EmailNotifier` & `SmsNotifier`) sharing `.send(msg)`.  
   > *(Your answer)*
5. **`[L4 | 17.9–17.10]`** Trace and fix the unintended caller mutation bug inside `function addBonus(player) { player.hp += 50; return player; }`.  
   > *(Diagnosis + fix)*
6. **`[L4 | 17.13]`** Spot the lost `this` bug: `const greetFn = user.greet; greetFn();`. Fix using `.bind()` cleanly!  
   > *(Diagnosis + fix)*

### Part B — Higher-Order Evaluation & Pattern Synthesis (2 pts each)
7. **`[L5 | 17.6, 17.13]`** A game has `FlyingRobot`, `SwimmingCar`, and `FlyingBoat`. Defend why **Composition (`Engine`, `Wings`, `Hull` components)** + **Open/Closed Principle (`O`)** avoids a brittle deep `extends` hierarchy!  
   > *(Your architectural defense)*
8. **`[L5 | 17.13]`** Match Pattern to Scenario cleanly (**Factory**, **Decorator**, **Observer**, **State**):  
   - Wrap an existing `save()` function adding audit logs WITHOUT editing its body: `________`  
   - Restrict allowed transitions across an Order (`PENDING -> PAID -> SHIPPED`): `________`
9. **`[L6 | 17.8, 17.11]`** Implement `[Symbol.iterator]()` inside `class QueueCollection` so `for (const item of queue)` yields items cleanly in FIFO order + `toJson()`:  
   ```javascript
   // Write QueueCollection:
   ```
