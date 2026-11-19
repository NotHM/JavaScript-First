# Lesson Plan 19.3: FAA Part 107 Airspace, METAR Weather, Survey Grids & Mode-2 Flight Sim

**Unit:** Unit 19 | **Duration:** 3 Class Periods × 50 min  
**Standards:** **CTE Drone Tech (`49.0199.00` / `FAA 14 CFR Part 107 & TRUST`)** + **AZ CTE `9.0`, `15.0` (`15.5`), `19.0` (`19.8`)**

---

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`SG-U19-6` | `[L3–L5]` | `49.0199.00, 9.2, 15.5`):** **S** — Complete all `TODO` gates in `part107AndMetarLab.mjs` (Part 107 / LAANC preflight, `§107.9` 10-day `>$500` reporter, `METAR` parser, `75%/65%` lawnmower grid, and Mode-2 `stepDroneSim` bugfix); **M** — Pass 100% of Node verification checks and earn `>= 80%` on Post-Lesson 19.3; **A** — Using `part107MissionSimDemo.mjs` patterns; **R** — Unifies FAA aviation compliance with 4:3 Canvas/Gamepad mission simulation; **T** — End of Day 9.
- [ ] **Teacher Objective (`TG-U19-6` | `[L2–L5]` | Formative & Aviation Safety QA):** **S** — Model live `METAR` token decoding (`3 SM / 500 ft` below clouds), `LAANC` ceiling denials, and Mode-2 Gamepad Y-axis inversion debugging; **M** — Confirm `>= 85%` of students accurately distinguish `TRUST` vs `Part 107 UAG`, `10`-day `>$500` reporting, and `75%/65%` overlap spacing on Post-Lesson 19.3; **A** — Supported by [`part107MissionSimDemo.test.mjs`](./code/part107MissionSimDemo.test.mjs); **R** — Connects Unit 19 handheld game engines directly to CTE Drone Tech (`49.0199.00`) / FAA Part 107 competencies and [Unit 21 Drone Bench Bring-Up](../../21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/unit-guide.md); **T** — Graded by Day 9 close.

---

## Bloom's Objective Ladder
- **L1–L2:** State Part 107 rules (`< 55 lbs`, `<= 400 ft AGL`, `<= 87 kt / 100 mph`, Remote ID, VLOS, waivers `§107.29/31/39`, `10`-day `>$500` accident rule), `TRUST` vs `UAG`, Class `B–G` / LAANC, `METAR` vs `TAF`, and Mode-2 stick layout.
- **L3 Apply:** Implement preflight gatekeeper, `METAR` regex parser, `75% / 65%` serpentine survey planner, and Mode-2 `640x480` delta-time step in Node.js.
- **L4 Analyze:** Diagnose Mode-2 non-inverted Y axes, missing `0.15` stick deadzone, unclamped `deltaMs` tunneling, and METAR visibility/ceiling clearance bugs.
- **L5–L6 Evaluate & Create:** Justify commercial GO/NO-GO launches and integrate Part 107 compliance + Mode-2 sim controls into the Unit 19 Drone Mission Sim Track.

---

## 50-Minute Pacing & Teacher Answer Keys

- **Period 1:** Pre-Lesson 19.3 (4m), Part 107 rules (`<55 lb`, `400 ft`, `87 kt`, `TRUST` vs `UAG`, `10`-day `>$500` rule, waivers) + Class `B–G` / LAANC ceilings (24m), Worksheet Part A & `evaluatePart107Preflight` / `evaluateAccidentReporting` lab (22m).
- **Period 2:** Live `METAR` vs `TAF` decoding (`3 SM`, `500 ft` below / `2,000 ft` horizontal) + Photogrammetry Lawnmower Grid (`75% / 65%`) + Mode-2 Stick Mixer on 4:3 `640x480` Gamepad loop (25m), `part107AndMetarLab.mjs` coding + `part107MissionSimDemo.test.mjs` walkthrough (25m).
- **Period 3:** Part C `stepDroneSimBuggy` & METAR Clearance Forensics (15m), Part D Commercial GO/NO-GO Evaluation (25m), Post-Lesson 19.3 Exit Ticket (10m).

### Pre-Lesson 19.3 Key
1. Commercial / paid / institutional sUAS operations require an **FAA Part 107 Remote Pilot Certificate (`UAG`)**; `TRUST` covers purely recreational flyers under `49 U.S.C. §44809`.
2. Strictly **`< 55 lbs`** takeoff weight; **`<= 400 ft AGL`**; **`<= 100 mph` (`87 kt`)** groundspeed.
3. **`METAR`** = current observed hourly/special surface weather report; **`TAF`** = `24–30 hr` airport terminal weather forecast.
4. **Left Stick:** Throttle (up/down) & Yaw (rotate left/right). **Right Stick:** Pitch (forward/back) & Roll (strafe left/right).

### Worksheet Part A & C Key
- **Part A:**
  1. Class `G` requires zero prior ATC/LAANC authorization (`<= 400 ft AGL`); Class `B/C/D/surface E` require active **LAANC** (or DroneZone) authorization with `plannedAltFtAgl <= laancCeilingFt`.
  2. `10` calendar days; triggers on serious injury, loss of consciousness, or non-UAS property damage **strictly `> $500`** (`$500` does NOT trigger; `$501` DOES).
  3. `laneSpacingM = 100 * (1 - 0.65) = 35 m`; `triggerSpacingM = 80 * (1 - 0.75) = 20 m`. Alternating serpentine lanes save turning battery energy.
- **Part C (`stepDroneSimBuggy`):**
  1. Without `applyDeadzone(axis, 0.15)`, analog stick noise drifts the drone continuously at idle; without `clampDeltaTime(rawDeltaMs, 50)`, switching browser tabs teleports across/off the `640x480` stage!
  2. Standard W3C Gamepad Y axes return **`-1.0`** when pushed **forward/up**! Failing to negate `LEFT_STICK_Y` and `RIGHT_STICK_Y` causes pushing throttle UP to dive into the ground and pushing pitch FORWARD to fly backwards! Clamping `x` (`0..640`), `y` (`0..480`), and `altitudeFt` (`0..400`) enforces legal stage & Part 107 boundaries.

### Post-Lesson 19.3 Key
1. No-GO: Weight must be **strictly `< 55 lbs`** (`55` lbs violates Part 107!), planned `250 ft` exceeds `200 ft` Class `C` LAANC ceiling, AND `TRUST` is invalid for paid commercial inspection (`UAG` required).
2. Wind `240°` at `12 kt` gusting `20 kt`; visibility **`2.5 SM < 3 SM`** (NO-GO); broken ceiling `800 ft AGL` -> flying at `400 ft AGL` leaves only `400 ft` below clouds (**violates `>= 500 ft` below clouds minimum!** Max legal ceiling-safe altitude there would be `300 ft AGL`, still blocked by `2.5 SM` visibility).
3. **Yes, report required within `10` calendar days (`§107.9`)** because third-party fence damage (`$650`) is strictly `> $500`.
4. `laneSpacingM = 60 * (1 - 0.65) = 21 m`; `triggerSpacingM = 40 * (1 - 0.75) = 10 m`; serpentine (`S->N` then `N->S`) cuts ferry flight overhead between adjacent grid columns.
5. Mode-2 maps Left Stick = Throttle (`-LEFT_STICK_Y`) + Yaw (`LEFT_STICK_X`) and Right Stick = Pitch (`-RIGHT_STICK_Y`) + Roll (`RIGHT_STICK_X`), gated with `applyDeadzone(0.15)` and `clampDeltaTime(dt, 50)` inside `640x480`.
