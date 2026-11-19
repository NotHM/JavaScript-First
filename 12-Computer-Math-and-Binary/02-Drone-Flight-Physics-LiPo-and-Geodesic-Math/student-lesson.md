# Student Lesson 12.2: Drone Flight Physics, LiPo Chemistry & Geodesic Math

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs`](../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs)

> [!CAUTION]
> **BENCH SAFETY RULE:** Verify **PROPS OFF** before plugging USB or LiPo batteries into any drone flight controller or ESC on a lab bench.

---

## Part A: Bench Safety, LiPo Chemistry & Flight Forces (`[L1 Remember]` & `[L2 Understand]`)

1. Complete the **LiPo `3S–6S` Reference Table** (`DT101`, `AZ CTE 4.5–4.6`):
   | Cell State | Volts / Cell | Integer `mV` / Cell | `4S` Pack Voltage |
   |---|---:|---:|---:|
   | Critical Min Floor | `____ V` | `______ mV` | `______ V` |
   | Storage Voltage | `____ V` | `______ mV` | `______ V` |
   | Full Charge Max | `____ V` | `______ mV` | `______ V` |
2. A `4S` `4000 mAh` `50C` LiPo draws `24 A` in steady hover.
   - What is its **maximum continuous discharge rating (`Amps`)**? `________ A`
   - Using the **`80%` safe Depth-of-Discharge (DoD)** rule, what is usable capacity (`Ah`) and estimated hover time (`minutes`)? `________ Ah` | `________ min`
3. List the **Four Forces of Flight** and explain why quadcopters pair **2 CW** + **2 CCW** propellers:
   - Forces: `________`, `________`, `________`, `________`
   - Torque balance: `________________________________________________`
4. A quadcopter (`AUW = 1500 g`) uses four motors producing `900 g` max thrust each. Calculate its **Thrust-to-Weight Ratio (`TWR`)** and state whether it meets the **`>= 2:1`** safety threshold:
   - `TWR` = `________` | Meets `>= 2:1`? `________`

---

## Part B: Drone Physics & Geodesic Node.js Lab (`[L3 Apply]`)

1. Open [`0-student_files/12-drone-flight-math/dronePhysicsLab.mjs`](../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs).
2. Implement `analyzeLiPoPack()`, `computeThrustToWeightRatio()`, `haversineDistanceMeters()`, and `calculateGsdCmPerPx()`, and fix `computeBankedLoadFactor()`.
3. Verify syntax and run in Node.js:
   ```bash
   node --check 0-student_files/12-drone-flight-math/dronePhysicsLab.mjs
   node 0-student_files/12-drone-flight-math/dronePhysicsLab.mjs
   ```

---

## Part C: Trig & GEMA Bug Forensics (`[L4 Analyze]`)

1. **Load Factor Radian Bug:** A student writes `const loadFactor = (deg) => 1 / Math.cos(deg);` and tests `deg = 60`, expecting `2.0 G`, but JavaScript returns `-1.05 G`! Diagnose why `Math.cos(60)` produces a negative number and write the exact fix:  
   > *(Your diagnosis)*
2. **GEMA Photogrammetry GSD Bug:** A mapping script computes:
   ```javascript
   const gsd = sensorWidthMm * altitudeM * 100 / focalLengthMm * imageWidthPx;
   ```
   Using `sensorWidthMm = 13.2`, `altitudeM = 120`, `focalLengthMm = 8.8`, `imageWidthPx = 5472`, why does this return `98,496,000` instead of `~3.29 cm/px`? Identify the **GEMA** mistake and write the fixed expression:  
   > *(Your trace)*

---

## Part D: Quantitative Precision & Density Altitude Evaluation (`[L5 Evaluate]` & `[L6 Create]`)

A West-MEC team plans a noon photogrammetry survey in Phoenix, AZ (`field elevation = 1,135 ft`, `ambient temp = 42°C`).
1. Evaluate how **Density Altitude** affects thrust margin and flight time compared to a `15°C` sea-level test day.
2. Justify why your flight logger stores **LiPo cell readings as integer millivolts (`mV`)** while storing **WGS-84 GPS lat/lon coordinates as `Float64` (`number`)** (`4.5, 4.6`):  
   > *(Your engineering evaluation)*

---

## Lesson SMART Objectives Tracker

- [ ] **SL-L12.2-1 (`[L1–L2]` | `DT101 1.0–12.0`, `4.5` | `SG-U12-6`):** Verify Props-Off bench rules, complete Part A LiPo `3S–6S` / `80%` DoD / `TWR` calculations with >= 80% accuracy.
- [ ] **SL-L12.2-2 (`[L3]` | `4.3–4.6`, `DT101 23.0` | `SG-U12-6`):** Implement all `dronePhysicsLab.mjs` functions cleanly and pass `node --check` + runtime checks.
- [ ] **SL-L12.2-3 (`[L4–L5]` | `4.3–4.6` | `SG-U12-6`):** Diagnose both Part C trig/GEMA defects, defend Part D Density Altitude + precision choices, and complete [`post-lesson-eval.md`](./post-lesson-eval.md).
