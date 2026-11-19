---
title: "Lesson 21.1 — Drone Bench Soldering, Power Distribution & Hardware Safety"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 21.1: Soldering, Power Bus & Safety
**CTE Hardware + Flight Tech · `CompTIA A+` & `ITF+` Aligned**

---

### `[L1 Remember]` The 4 Golden Rules Before Heating an Iron

1. **Props-OFF Mandate:** Zero propellers anywhere near a powered or USB-connected frame.
2. **PPE & ESD:** **ANSI Z87.1 glasses**, **carbon fume extractor (`10–15 cm`)**, and grounded **ESD strap** when handling STM32 PCBs.
3. **LiPo Safety:** Store in fire-safe bags, never discharge `< 3.0 V/cell`, never pierce puffy packs.
4. **Continuity + Smoke-Stopper Gate:** Verify `R >= 10 Ω` across `XT60 +/-` AND boot through inline **smoke stopper (`<= 1 A`)** BEFORE direct battery power!

---

### `[L2 Understand]` Match Temperature & Tip Geometry to Copper Mass

| Target Pad | Gauge | `SAC305` Temp | Tip | Critical Guard |
|---|---|---|---|---|
| **XT60 / ESC `VBAT`** | `12–14 AWG` | `375–400°C` | Wide Chisel | Pre-tin + Rosin Flux (`<= 4s`) |
| **ESC Motor Phases** | `16–20 AWG` | `360–380°C` | Med Chisel | Strip `< 2.5 mm` insulation |
| **FC UART / `5V` Pads** | `26–30 AWG` | `315–340°C` | Fine Bevel | Keep `<= 2.5s` (no lifted pads!) |

- **Defects:** Cold joint -> *reflow w/ flux* · Bridge -> *flux + copper braid* · Scrub clean w/ **`99% IPA`**.

---

### `[L3 Apply]` Wire Ampacity ($P = I^2 R$) & `1000 µF` Low-ESR Capacitor

- Round-trip `0.4 m` lead pulling `50 A`:
  - **`18 AWG`** (`20.95 mΩ/m`): $V_{\text{drop}} = 0.419\text{ V}$ · **$P_{\text{loss}} = 20.95\text{ W}$ heat!**
  - **`12 AWG`** (`5.21 mΩ/m`): $V_{\text{drop}} = 0.104\text{ V}$ · **$P_{\text{loss}} = 5.21\text{ W}$ (4× cooler!)**
- **Low-ESR Capacitor (`>= 1000 µF`, `35V` 4S / `50V` 6S):** Clamps ESC inductive spikes; white **`-` stripe MUST go to `GND`**!

---

### `[L4 Analyze -> L5 Evaluate]` Encode the Safety Gate in JavaScript

```javascript
export function evaluateSmokeTestGate({
  propsRemoved, xt60ResistanceOhms, smokeStopperTripped, visualBridgesCount, coldJointsCount
}) {
  const blockers = [];
  if (!propsRemoved) blockers.push('PROPS_ON_HAZARD');
  if (!Number.isFinite(xt60ResistanceOhms) || xt60ResistanceOhms < 10) blockers.push('DEAD_SHORT');
  if (visualBridgesCount > 0) blockers.push('SOLDER_BRIDGE');
  if (coldJointsCount > 0) blockers.push('COLD_JOINT');
  if (smokeStopperTripped) blockers.push('SMOKE_STOPPER_TRIPPED');
  return { safeToConnectDirectLipo: blockers.length === 0, blockers };
}
```

> **Lab:** Practice perfboards first, pass DMM + Smoke Stopper sign-off, then complete `0-student_files/21-drone-build/solderAndPowerLab.mjs`!
