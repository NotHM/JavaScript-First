# Student Lesson 19.3: FAA Part 107 Airspace, METAR Weather, Survey Grids & Mode-2 Sim

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs`](../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs)

## My Lesson SMART Objectives
- [ ] **SL-L19.3-1 (`[L1–L2]` | `49.0199.00` | `SG-U19-6`):** Complete Part A covering Part 107 limits, `TRUST` vs. `UAG`, Class `B–G`/LAANC rules, `§107.9` reporting, `METAR`/`TAF`, and `75%/65%` spacing math before lab coding.
- [ ] **SL-L19.3-2 (`[L3]` | `49.0199.00, 9.2, 15.5` | `SG-U19-6`):** Implement every `TODO` function in [`part107AndMetarLab.mjs`](../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs) and pass `node --check` + runtime checks cleanly.
- [ ] **SL-L19.3-3 (`[L4–L5]` | `4.3, 18.0, 49.0199.00` | `SG-U19-6`):** Diagnose all Mode-2 Gamepad Y-axis, deadzone, and `dt`-clamping defects in Part C, complete Part D GO/NO-GO dispatch, and finish [`post-lesson-eval.md`](./post-lesson-eval.md).

---

## Part A: Part 107 Regulations, METAR & Survey Grid Foundations (`[L1 Remember]` & `[L2 Understand]`)

1. Fill in the core **`FAA 14 CFR Part 107`** regulatory thresholds:
   - Max Takeoff Weight (strict): `< ______ lbs` | Max Altitude: `<= ______ ft AGL` | Max Speed: `<= ______ mph` (`____ kt`)
   - Commercial Pilot Cert Required: `____________` (vs. Recreational-only cert: `________`)
   - Mandatory FAA Accident Reporting (`§107.9`) deadline: `____` calendar days if serious injury, loss of consciousness, or non-UAS property damage `> $______`.
2. Contrast **Class `G`** vs. **Class `B / C / D / Surface E`** airspace regarding **LAANC** ceiling checks:  
   > *(Your comparison)*
3. Decode the Part 107 VFR weather minimums (`§107.51`):
   - Minimum visibility: `____ SM` | Vertical clearance **below** clouds: `______ ft` | Horizontal from clouds: `______ ft`
   - Contrast **`METAR`** vs. **`TAF`**: `__________________________________________________`
4. A camera footprint is `100 m` wide × `80 m` tall. Compute Photogrammetry **Lawnmower** spacing for **`65%` side overlap** and **`75%` front overlap**:
   - `laneSpacingM` = `________ m` | `triggerSpacingM` = `________ m`

---

## Part B: Part 107, METAR, Survey Grid & Mode-2 Node.js Lab (`[L3 Apply]`)

1. Open [`0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs`](../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs).
2. Implement `evaluatePart107Preflight()`, `evaluateAccidentReporting()`, `parseMetarAndCheckVfr()`, and `generateLawnmowerGrid()`, and fix `stepDroneSimBuggy()`.
3. Verify syntax and run in Node 24:
   ```bash
   node --check 0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs
   node 0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs
   ```

---

## Part C: Mode-2 Stick Mixer & Delta-Time Bug Forensics (`[L4 Analyze]`)

Inspect `stepDroneSimBuggy(state, pad, rawDeltaMs)` inside `part107AndMetarLab.mjs`:
1. A tester pauses tabs (`rawDeltaMs = 4000 ms`) and sees the drone teleport past `640x480` bounds, AND sees idle stick noise (`axis = 0.07`) slowly drift the aircraft. Identify the two missing Lesson `19.1` `utils.js` guards:  
   > *(Your diagnosis)*
2. Pushing the physical Mode-2 **Left Stick UP (`LEFT_STICK_Y = -1.0`)** should **climb**, and pushing the **Right Stick UP (`RIGHT_STICK_Y = -1.0`)** should **pitch forward (`-Y` on 2D screen)**. Why does `stepDroneSimBuggy` dive and back up instead, and how do you fix both Mode-2 axes plus `400 ft AGL` ceiling enforcement?  
   > *(Your fix)*

---

## Part D: Commercial Flight Dispatch Critique (`[L5 Evaluate]` & `[L6 Create]`)

A real estate team plans a sunset roof photogrammetry flight (`3.5 lb` drone, **Standard Remote ID active**) with a **`TRUST`** flyer in **Class `D` airspace** (`LAANC ceiling = 250 ft`), requesting **`300 ft AGL`** under this METAR:
`METAR KFFZ 192351Z 21010KT 4SM BKN007 24/11 A2998`
List EVERY legal, airspace, and weather violation blocking takeoff (`GO / NO-GO`) and recommend the exact corrections required for lawful Part 107 launch:  
> *(Your dispatch evaluation)*
