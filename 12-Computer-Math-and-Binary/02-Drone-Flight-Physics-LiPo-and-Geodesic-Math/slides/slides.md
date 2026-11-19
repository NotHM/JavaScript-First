---
title: "Lesson 12.2 — Drone Flight Physics, LiPo Chemistry & Geodesic Math"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 12.2: Drone Flight Physics & Geodesic Math
**West-MEC `DT101` (`1.0–12.0, 23.0`) + AZ CTE `4.0` (`4.1–4.7`)**

---

### `[L1 Remember]` PROPS OFF Bench Safety & Ohm's Law (`DT101 1.0`, `4.4`)

> **CRITICAL RULE:** **PROPS OFF** before USB or LiPo power on any workbench!

- Inspect leads & polarity (`+` Red / `-` Black), use a **smoke stopper**
- **Ohm's Law:** $V = I \cdot R$ | $I = V / R$ | $P = V \cdot I$
- **ESC Headroom:** Keep ESC rating $\ge 1.25 \times I_{\text{motor,peak}}$

```javascript
const peakPackAmps = motorCount * motorPeakAmps + avionicsAmps;
const escHeadroom = escRatingAmps / motorPeakAmps; // >= 1.25 safe
```

---

### `[L2 Understand -> L3 Apply]` LiPo `3S–6S` Chemistry & `80%` DoD (`4.5–4.6`)

| Cell State | Volts / Cell | Integer `mV` | 4S Pack |
|---|---:|---:|---:|
| Hard Floor (Damage) | `3.00 V` | `3000 mV` | `12.0 V` |
| Storage | `3.80 V` | `3800 mV` | `15.2 V` |
| Full Charge | `4.20 V` | `4200 mV` | `16.8 V` |

- **80% Safe DoD:** Never drain below 20% remaining capacity (`usableAh = (mAh / 1000) * 0.80`)
- **Max Continuous Current:** `(mAh / 1000) * C_rating`
- Store cell voltages as integer **`mV`** to stop `0.1 + 0.2` float drift!

---

### `[L1 Remember -> L3 Apply]` Forces, Axes, `KV*V` & `TWR >= 2:1`

- **Four Forces:** Lift vs. Weight | Thrust vs. Drag
- **Axes:** Pitch (fwd/back) • Roll (left/right) • Yaw (heading)
- **CW / CCW Props:** Opposite diagonal spin cancels hover yaw torque
- **RPM & TWR:**
  - $\text{RPM}_{\text{no-load}} = \text{KV} \times V_{\text{pack}}$
  - $\text{TWR} = \frac{n_{\text{motors}} \times \text{MaxThrust}}{\text{AUW}} \ge 2.0$

---

### `[L4 Analyze]` Predict Before Running: Banked Load Factor ($1/\cos\theta$)

```javascript
// BUG: What does Math.cos(60) actually compute in JavaScript?
const badLoad = 1 / Math.cos(60); // 60 RADIANS -> -1.05G!
const rad = (bankDeg * Math.PI) / 180;
const loadFactorG = 1 / Math.cos(rad); // At 60 deg -> 2.0G!
```

- At **`60°` bank**, Load Factor doubles (`2.0 G`) and **Density Altitude** ("High, Hot, Humid") further thins air mass -> lower thrust margin!

---

### `[L3 Apply -> L5 Evaluate]` Haversine GPS & Photogrammetry GSD

```javascript
// WGS-84 Great-Circle Distance (Requires Float64 precision!)
const d = 2 * 6_371_000 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// GEMA Parentheses Required for Ground Sample Distance (cm/px):
const gsd = (sensorWidthMm * altitudeM * 100) / (focalLengthMm * imageWidthPx);
```

> **Lab:** Run `node --test 12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/code/droneFlightMathDemo.test.mjs` and complete `0-student_files/12-drone-flight-math/dronePhysicsLab.mjs`!
