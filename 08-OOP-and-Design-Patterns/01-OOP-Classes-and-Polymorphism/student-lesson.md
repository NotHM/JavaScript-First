# Student Lesson 8.1: OOP Mechanics, Encapsulation & Polymorphism (`Std 17.1–17.10, 17.12`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/09-oop-patterns/oopPillarsLab.js`](../../0-student_files/09-oop-patterns/oopPillarsLab.js)

## Part A: Value vs. Reference & OOP Pillars (`[L1 Remember]` & `[L2 Understand]`)
1. Classify each behavior (`Pass by Value` vs. `Pass by Reference`):
   - `let x = 5; let y = x; y++;` (`x` equals `___`) → `________________`
   - `const o1 = { a: 1 }; const o2 = o1; o2.a = 9;` (`o1.a` equals `___`) → `________________`
2. Explain the purpose of each OOP concept (`17.4–17.8`):
   - **#Private Encapsulation:** `____________________________________`
   - **Abstract Contract (`new.target`):** `____________________________________`
   - **Polymorphism:** `____________________________________`

## Part B: Abstract Class & Reference Safety Lab (`[L3 Apply]`)
Open [`0-student_files/09-oop-patterns/oopPillarsLab.js`](../../0-student_files/09-oop-patterns/oopPillarsLab.js), implement `Shape`, `Rectangle`, and `addScoreSafe`, uncomment verification checks, and verify cleanly!

## Part C: Lost `this` & Reference Bug Trace (`[L4 Analyze]`)
Inspect BOTH bugs cleanly:
```javascript
class Timer {
  #ticks = 0;
  tick() { this.#ticks++; return this.#ticks; }
}
const t = new Timer();
const detached = t.tick;
// detached(); -> throws TypeError!
```
1. Why does calling `detached()` fail while `t.tick()` succeeds? `________________________`
2. Fix binding in one line: `const bound = ____________________;`

## Part D: Composition Over Inheritance Defense (`[L5 Evaluate]`)
A ride-sharing simulation models `ElectricBike`, `GasSedan`, `HybridSUV`, and `AutonomousDrone`. Design a **Composition architecture** (`BatteryEngine`, `GPSRouter`, `PassengerCabin`) explaining why `extends` inheritance breaks down here (`17.6`):  
> *(Your architecture defense)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — verify every OOP contract in Node.js**):

- [ ] **SL-L8.1-1 (`[L1–L2 Remember/Understand]` | Std `17.1, 17.4–17.9` | `SG-U08-1`):** Complete Part A value-vs-reference predictions and OOP pillar explanations with >= 80% accuracy by Day 76.
- [ ] **SL-L8.1-2 (`[L3 Apply]` | Std `17.4–17.8` | `SG-U08-2`):** Implement `Shape`, `Rectangle`, and `addScoreSafe` in `oopPillarsLab.js` and pass all verification checks by end of Day 77.
- [ ] **SL-L8.1-3 (`[L4 Analyze]` | Std `17.9–17.10` | `SG-U08-3`):** Diagnose the detached `this` error in Part C and write a one-line binding fix before Kahoot Quiz 1 on Day 77.
- [ ] **SL-L8.1-4 (`[L5 Evaluate]` | Std `17.6, 17.12` | `SG-U08-4`):** Defend your Part D Composition architecture over Inheritance and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by end of Day 77.
