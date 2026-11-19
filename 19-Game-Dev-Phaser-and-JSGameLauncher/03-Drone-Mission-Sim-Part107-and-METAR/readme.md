# Lesson 19.3: FAA Part 107 Airspace, METAR Weather, Survey Grids & Mode-2 Flight Sim

**Standards:** **CTE Drone Tech (`49.0199.00`) / FAA Part 107 (`Stds 14.0–28.0`: `14 CFR Part 107 / TRUST`)** + **AZ CTE `9.0`, `15.0` (`15.5`), `19.0` (`19.8`)**  
**Semester 4 Hardware Bridge:** Simulates flight rules and Mode-2 telemetry feeding directly into physical bench bring-up, soldering, UART/MSP coding, and external FAA `TRUST`/`Part 107` certification readiness in [Unit 21](../../21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/unit-guide.md).

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall **`FAA 14 CFR Part 107`** limits (`< 55 lbs`, `<= 400 ft AGL`, `<= 100 mph / 87 kt`), **Remote ID**, **VLOS**, **`TRUST` vs. `Part 107 UAG`**, waiver codes (`§107.29/31/39`), **`10`-day accident reporting (`> $500`)**, and **Mode-2** stick assignments (`CTE Drone Tech 49.0199.00`).
- **`[L2 Understand]`** Contrast Class `B/C/D/E/G` airspace & **LAANC** ceiling checks, compare hourly **`METAR`** observations vs. **`TAF`** forecasts, and explain `3 SM` visibility / `500 ft` below / `2,000 ft` horizontal cloud minimums (`§107.51`).
- **`[L3 Apply]`** Implement a pre-flight Part 107 + LAANC gatekeeper, `§107.9` reporting checker, aviation `METAR` parser, **`75%` front / `65%` side** lawnmower survey grid generator, and **Mode-2 RC stick mixer** integrated into a `640x480` 4:3 Canvas/Gamepad sim (`15.5, 9.2`).
- **`[L4 Analyze]`** Diagnose Mode-2 inverted-Y gamepad axis bugs, missing stick deadzones, unclamped `deltaMs` teleportation, and METAR ceiling vs. AGL math defects (`4.3, 18.0`).
- **`[L5 Evaluate]`** Render defensible **GO / NO-GO** mission dispatches balancing Part 107 waivers, LAANC facility grids, METAR trends, and `75%/65%` photogrammetry battery distance (`49.0199.00` `24.0–28.0`), ready for Unit 21 live hardware bring-up and external [FAA Part 107](https://www.faa.gov/regulations_policies/handbooks_manuals/aviation) / [FAADroneZone](https://faadronezone.faa.gov/) credentials.

---

## 1. FAA 14 CFR Part 107, `TRUST` vs. `UAG` & Accident Reporting (`CTE Drone Tech 49.0199.00 / FAA Part 107`)

| Rule / Requirement | Threshold / Standard | Regulatory Notes |
|---|---|---|
| **`TRUST` vs. `Part 107 UAG`** | **Recreational** (`TRUST`) vs. **Commercial / Institutional** (`UAG`) | Paid, business, school-promotion, or non-hobby flights require **Part 107 Remote Pilot Certificate (`UAG`)** (`>= 16 yrs`, 24-mo recurrent). |
| **Takeoff Weight** | **`< 55 lbs`** (strictly less than `55.0 lbs`) | Includes payload, batteries, and prop guards at takeoff. |
| **Max Altitude** | **`<= 400 ft AGL`** | Or within `400 ft` laterally & above a structure's top (if not in restricted airspace). |
| **Max Groundspeed** | **`<= 100 mph` (`87 knots`)** | Applies across all Part 107 flight maneuvers. |
| **Remote ID & VLOS** | **Standard Remote ID** (`Part 89`) + **Unaided VLOS** | Only **FRIA** fields waive Remote ID; **VLOS** prohibits BVLOS without `§107.31` waiver. |
| **Key Waivers** | **`§107.29`** Night · **`§107.31`** BVLOS · **`§107.39`** Over People | Night flight requires recurrent training + `3-SM` anti-collision strobe lighting. |
| **`10`-Day FAA Accident Report (`§107.9`)** | **Within `10` calendar days** | Mandatory on **serious injury**, **loss of consciousness**, OR **`> $500`** damage to non-UAS property (`$500` exact does NOT trigger; `$501` DOES!). |

---

## 2. Class `B / C / D / E / G` Airspace & `LAANC` Ceilings

- **Class `G` (Uncontrolled):** Legal up to `400 ft AGL` without ATC/LAANC authorization (remain clear of airports and VFR traffic).
- **Class `B` (major hubs), `C` (regional towers), `D` (municipal towers), `Surface E (E2)`:** Controlled airspace requiring prior **LAANC** (near-instant digital authorization up to published grid ceiling) or **FAA DroneZone** manual approval. Any `0 ft` LAANC grid or requested altitude **`> laancCeilingFt`** is an automatic **NO-GO**.

---

## 3. Aviation `METAR` vs. `TAF` & Part 107 Weather Minimums (`§107.51`)

- **`METAR`:** Current observed hourly (or special `SPECI`) surface weather report at an airport (`ICAO`).
- **`TAF`:** **Terminal Aerodrome Forecast** projecting wind, visibility, and ceilings `24–30 hours` ahead for mission scheduling.

```text
METAR KPHX 191851Z 27014G22KT 10SM FEW060 BKN110 39/04 A2992
      │    │       │          │    │             │     └─ Altimeter: 29.92 inHg
      │    │       │          │    │             └─ Temp 39°C / Dewpoint 4°C
      │    │       │          │    └─ Clouds: FEW at 6,000 ft, Broken ceiling at 11,000 ft AGL
      │    │       │          └─ Visibility: 10 Statute Miles
      │    │       └─ Wind from 270° at 14 kt, gusting 22 kt
      │    └─ Day 19 at 18:51 UTC (Zulu)
      └─ Station ICAO (Phoenix Sky Harbor)
```

**Part 107 VFR Weather Minimums:**
1. **Visibility:** **`>= 3 Statute Miles (SM)`** from the control station.
2. **Cloud Clearance:** **`>= 500 ft` BELOW** clouds and **`>= 2,000 ft` HORIZONTAL** from clouds (so `lowestCloudBaseFtAgl - plannedAltFtAgl >= 500`!).

---

## 4. Photogrammetry Lawnmower Survey Grids (`75% / 65%`) & Mode-2 Handheld Sim (`15.5, 9.2`)

1. **Lawnmower ("Boustrophedon") Grid Math:**
   - **Lane Spacing (Side Overlap `65%`):** $\text{laneSpacing} = \text{footprintWidth} \times (1 - 0.65) = 0.35 \cdot W_f$
   - **Photo Trigger Spacing (Front Overlap `75%`):** $\text{triggerSpacing} = \text{footprintHeight} \times (1 - 0.75) = 0.25 \cdot H_f$
   - Alternating South→North and North→South lanes minimize deadhead ferry distance and LiPo drain.
2. **Mode-2 RC Stick Mixer + `jsgamelauncher` 4:3 Sim Loop:**
   - **Left Stick:** Vertical = **Throttle** (altitude climb/descend), Horizontal = **Yaw** (heading rotation).
   - **Right Stick:** Vertical = **Pitch** (forward/back), Horizontal = **Roll** (lateral strafe).
   - **W3C Gamepad API Inversion:** Pushing a physical stick forward/up reports negative `axes[1]` / `axes[3]` (`-1.0`), so negate stick Y after `applyDeadzone(axis, 0.15)` and clamp `dt` with `clampDeltaTime(rawDeltaMs, 50)` inside the `640x480` stage!

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/part107MissionSimDemo.mjs`](./code/part107MissionSimDemo.mjs) | [`code/part107MissionSimDemo.test.mjs`](./code/part107MissionSimDemo.test.mjs)
- **Student Worksheet & Lab:** [`student-lesson.md`](./student-lesson.md) | [`../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs`](../../0-student_files/19-drone-part107-sim/part107AndMetarLab.mjs)
