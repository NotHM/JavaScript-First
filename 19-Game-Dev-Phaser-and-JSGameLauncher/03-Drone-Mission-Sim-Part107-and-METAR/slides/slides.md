---
title: "Lesson 19.3 — FAA Part 107 Airspace, METAR Weather, Survey Grids & Mode-2 Sim"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 19.3: Part 107 Airspace, METAR & Mode-2 Sim
**West-MEC `DT102` (`14.0–28.0`: `Part 107 / TRUST`) + AZ CTE `9.0, 15.5, 19.8`**

---

### `[L1 Remember]` Part 107 Statutory Limits & `10`-Day Reporting

- **Credential:** **`Part 107 UAG`** for commercial/paid flights (`TRUST` = recreational `§44809` only)
- **Limits:** `< 55 lbs` (strict) · `<= 400 ft AGL` · `<= 100 mph (87 kt)` · **Remote ID** · **VLOS**
- **Key Waivers:** `§107.29` Night (anti-collision 3-SM strobes) · `§107.31` BVLOS · `§107.39` Over People
- **`§107.9` 10-Day FAA Accident Report:** Serious injury, loss of consciousness, OR non-UAS damage **`> $500`**

---

### `[L2 Understand]` Class `B/C/D/E/G` Airspace, `LAANC` & `METAR` Minimums

| Check | Legal GO Threshold |
|---|---|
| **Airspace (`B/C/D/E`)** | Active **LAANC** (or DroneZone) with `plannedAltFtAgl <= laancCeilingFt` (`G` = uncontrolled) |
| **Visibility (`METAR`)** | **`>= 3 Statute Miles (SM)`** (`TAF` = forecast; `METAR` = current observation) |
| **Cloud Clearance** | **`>= 500 ft` BELOW** clouds & **`>= 2,000 ft` HORIZONTAL** |

```javascript
// METAR example: "METAR KPHX 191851Z 27014G22KT 10SM FEW060 BKN110 39/04 A2992"
const flyable = visSm >= 3 && (lowestCloudBaseFt === null || lowestCloudBaseFt - altFtAgl >= 500);
```

---

### `[L3 Apply]` Lawnmower Survey Grid (`75%` Front / `65%` Side Overlap)

```javascript
const laneSpacingM = footprintWidthM * (1 - 0.65);    // 35% step per lane (65% side overlap)
const triggerSpacingM = footprintHeightM * (1 - 0.75); // 25% step per photo (75% front overlap)
// Even pass -> S to N | Odd pass -> N to S (serpentine / boustrophedon turns)
```

- Serpentine passes eliminate wasted empty ferry legs back to the starting edge!

---

### `[L4 Analyze -> L5 Evaluate]` Mode-2 RC Stick Mixer in `640x480` Gamepad Sim

```javascript
// W3C Gamepad API pushes UP as -1.0 -> NEGATE Y axes after deadzone & clamp dt <= 50 ms!
const throttle = -applyDeadzone(pad.LEFT_STICK_Y, 0.15);  // Left Stick Vertical (Yaw = LEFT_STICK_X)
const pitch    = -applyDeadzone(pad.RIGHT_STICK_Y, 0.15); // Right Stick Vertical (Roll = RIGHT_STICK_X)
const dtSec    = clampDeltaTime(rawDeltaMs, 50) / 1000;
```

> **Lab:** Run `node --test 19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/code/part107MissionSimDemo.test.mjs` and complete `0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs`!
