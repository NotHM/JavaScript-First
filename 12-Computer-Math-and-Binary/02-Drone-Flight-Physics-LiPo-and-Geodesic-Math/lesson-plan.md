# Lesson Plan 12.2: Drone Flight Physics, LiPo Chemistry & Geodesic Math

**Unit:** Unit 12 | **Duration:** 3 Class Periods × 50 min  
**Standards:** CTE Drone Tech **`49.0199.00` (`1.0–12.0, 23.0`)** + **AZ CTE `4.0` (`4.1`–`4.7`)**

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | State **Props-Off** safety rule, LiPo thresholds (`3.0V` min, `3.8V` storage, `4.2V` full), Four Forces (`Lift/Weight/Thrust/Drag`), and Pitch/Roll/Yaw. |
| **L2 Understand** | Explain CW/CCW prop torque balance, `80%` DoD battery reserve rationale, and Density Altitude thrust loss. |
| **L3 Apply** | Implement Ohm's Law, LiPo pack analyzer, `KV*V` RPM, `TWR >= 2:1`, `1/cos(theta)` Load Factor, Haversine, and Photogrammetry GSD in Node.js. |
| **L4 Analyze** | Debug degree-vs-radian `Math.cos` defects, GEMA missing-parenthesis GSD bugs, and `Float64` vs. integer `mV` precision choices. |
| **L5 Evaluate** | Justify pre-flight GO/NO-GO propulsion & battery budgets for hot-weather mapping missions (`CTE Drone Tech 23.0`). |
| **L6 Create** | Integrate drone flight physics, LiPo budget, and GSD telemetry modules into the Unit 12 Quantitative Mission Calculator. |

---

## Materials & Assessments
- **Reading & Slides:** [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/droneFlightMathDemo.mjs`](./code/droneFlightMathDemo.mjs), [`code/droneFlightMathDemo.test.mjs`](./code/droneFlightMathDemo.test.mjs)
- **Student Worksheet & Lab:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs`](../../0-student_files/12-drone-flight-math/dronePhysicsLab.mjs)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 50-Minute Pacing & Instructor Answer Keys

- **Period 1:** Pre-Lesson 12.2 (4m), Props-Off Safety + Ohm's Law + LiPo `3S–6S` & `80%` DoD Slides (22m), Worksheet Part A & `dronePhysicsLab.mjs` LiPo setup (24m).
- **Period 2:** Four Forces, CW/CCW Torque, `KV * V`, `TWR >= 2:1`, Load Factor $1/\cos\theta$, Density Altitude (20m), `dronePhysicsLab.mjs` Lab + `droneFlightMathDemo.test.mjs` walkthrough (30m).
- **Period 3:** WGS-84 Haversine & Photogrammetry GSD (15m), Part C Bug Forensics & Part D Mission Trade-off Critique (25m), Post-Lesson 12.2 Exit Ticket (10m).

### Pre-Lesson 12.2 Key
1. Remove all propellers physically (**Props Off**) before powering ESCs/motors on the bench.
2. `3.80 V / cell` (`3800 mV`; `4S = 15.2 V`); `4.20 V / cell` full (`4S = 16.8 V`), `3.00 V / cell` hard damage floor.
3. `Lift`, `Weight`, `Thrust`, `Drag`.
4. `I = V / R = 16.8 / 0.84 = 20 A`; `P = V * I = 16.8 * 20 = 336 W`.

### Worksheet Part A & C Key
- **Part A:** `4S storage = 15,200 mV (15.2 V)`; `4000 mAh * 50C = 4.0 Ah * 50 = 200 A`; `usableAh = 4.0 * 0.80 = 3.2 Ah` -> `(3.2 / 24) * 60 = 8.0 min`. `TWR = (4 * 900) / 1500 = 2.4` (`>= 2.0`, safe).
- **Part C1 (Load Factor Bug):** JavaScript `Math.cos()` expects **radians**, not degrees (`Math.cos(60)` evaluates `cos(60 rad) ≈ -0.9524` -> negative `-1.05G`!). Convert `(bankAngleDeg * Math.PI) / 180` and throw `RangeError` for `< 0` or `>= 90`.
- **Part C2 (GEMA GSD Bug):** `sensor * alt * 100 / focal * widthPx` divides by `focal` and *multiplies* by `widthPx` instead of dividing by `(focal * widthPx)`! Adding parentheses `(...) / (focal * widthPx)` yields `3.289 cm/px` instead of `97.9 million`!

### Post-Lesson 12.2 Key
1. `3.80 V/cell` storage (`11.4V` 3S / `22.8V` 6S); `80%` DoD leaves `20%` capacity buffer to avoid dropping below `~3.5V/cell` under load and risking chemistry damage or mid-air voltage sag.
2. `2400 * 14.8 = 35,520 RPM`; `TWR = (4 * 850) / 1600 = 2.125 >= 2.0` (passes 2:1 safety rule).
3. `1 / Math.cos((60 * Math.PI) / 180) = 1 / 0.5 = 2.0 G`; effective stall speed increases by $\sqrt{2} \approx 1.414\times$ and hover thrust margin halves.
4. High field elevation + hot air (`42°C`) + humidity sharply raises Density Altitude (`> 4,000 ft` in Phoenix), thinning air mass per prop sweep and reducing net lift/climb margin.
5. Store cell voltage as **integer millivolts (`mV`)** (`3800` vs `3.8` float drift) and store WGS-84 GPS coordinates in **IEEE-754 `Float64` (`number`)** so 6–7 decimal places retain `~0.11 m` surveying accuracy without `Float32` truncation.

---

## Teacher & Student SMART Objectives Alignment
| Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 12.2 & Safety/LiPo (Part A)** | `SG-U12-6`, `TG-U12-6` | `L1–L2` (`CTE Drone Tech 1.0–12.0`, `4.5`) | Enforce Props-Off bench verification and >= 80% accuracy on LiPo `mV` and `80%` DoD math before coding. |
| **Physics & Geodesic Coding Lab (Part B)** | `SG-U12-6`, `TG-U12-6` | `L3` (`4.3–4.6`, `CTE Drone Tech 23.0`) | Pass 100% of `dronePhysicsLab.mjs` functions & match `droneFlightMathDemo.test.mjs` reference outputs. |
| **Trig/GEMA Forensics & Mission Eval (Parts C–D)** | `SG-U12-6`, `TG-U12-6` | `L4–L5` (`4.3–4.6`) | Diagnose degree/radian and GEMA GSD parenthesis bugs cleanly and achieve Hake's $g \ge 0.55$ on Post-Lesson 12.2. |

- [ ] **Teacher Checkpoint (`TG-U12-6`):** Props-off lab safety verified 100%, Pre/Post Lesson 12.2 growth ($g \ge 0.55$) logged, and all `dronePhysicsLab.mjs` checkoffs completed.
- [ ] **Student Checkpoint (`SG-U12-6`):** Props-off checklist signed, Parts A–D completed without spoilers, and `dronePhysicsLab.mjs` passing cleanly in Node 24.
