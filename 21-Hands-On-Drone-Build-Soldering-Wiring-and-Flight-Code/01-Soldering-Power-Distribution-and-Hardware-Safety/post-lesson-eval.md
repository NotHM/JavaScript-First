# Post-Lesson 21.1 Evaluation: Soldering Safety, $I^2R$ Drop & Power Gate (`L1–L5`)

**Timing:** 5 minutes | **Score:** `____ / 5`

1. **`[L2 Understand | CompTIA A+]`** Distinguish a **cold joint**, a **solder bridge**, and a **lifted PCB pad**, naming one tool (`flux`, `copper braid`, or `iron dwell/temp`) used to fix or prevent each:  
   > *(Your distinctions)*
2. **`[L3 Apply | Math & CompTIA A+]`** A drone draws `40 A` through a `0.5 m` round-trip battery cable (`18 AWG = 0.02095 Ω/m` vs. `12 AWG = 0.00521 Ω/m`). Compute **voltage drop $V_{\text{drop}}$** and **wasted heat power $P_{\text{loss}}$** for BOTH gauges:
   - `18 AWG`: $V_{\text{drop}} =$ `______ V`, $P_{\text{loss}} =$ `______ W`
   - `12 AWG`: $V_{\text{drop}} =$ `______ V`, $P_{\text{loss}} =$ `______ W`
3. **`[L1 Remember | Power Bus]`** Why do `4S/6S` quadcopter ESCs mount a **`1000 µF` low-ESR capacitor** close to main battery pads, and what happens if its voltage rating is only `16 V` on a `6S` (`25.2 V`) pack?  
   > *(Your explanation)*
4. **`[L4 Analyze | Bug Triage]`** A builder skips the continuity check (`0.3 Ω` bridged `+`/`-` MOSFET pins) AND skips the inline **smoke stopper**, plugging a charged `6S` LiPo directly into the `XT60`. Contrast what happens WITH vs. WITHOUT the inline smoke stopper:  
   > *(Your analysis)*
5. **`[L5 Evaluate | Bench QA]`** Your multimeter reads `18.5 kΩ` after capacitor charge-up across `XT60 +/-`, props are off, and the `1000 µF` stripe faces `GND`, yet one UART joint looks matte/grainy. Should your JavaScript pre-power gate return `GO` or `NO-GO`—and why?  
   > *(Your verdict)*
