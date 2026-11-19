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
