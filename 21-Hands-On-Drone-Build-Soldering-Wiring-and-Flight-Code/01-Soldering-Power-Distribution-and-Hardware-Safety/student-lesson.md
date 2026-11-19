# Student Lesson 21.1: Drone Bench Soldering, Power Distribution & Hardware Safety

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/21-drone-build/solderAndPowerLab.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.mjs)

## My Lesson SMART Objectives
- [ ] **SL-L21.1-1 (`[L1–L2]` | `CompTIA A+` | `SG-U21-1`):** Complete Part A covering Props-OFF safety, ESD/PPE, `12 AWG` vs. `28 AWG` thermal profiles, capacitor polarity, and multimeter/smoke-stopper gating before touching a live board.
- [ ] **SL-L21.1-2 (`[L3]` | `CTE 4.0, A+` | `SG-U21-1`):** Implement every `TODO` function in [`solderAndPowerLab.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.mjs) and turn 100% of [`solderAndPowerLab.test.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.test.mjs) GREEN.
- [ ] **SL-L21.1-3 (`[L4–L5]` | Bench QA | `SG-U21-1`):** Complete Part C solder defect diagnostics, earn instructor continuity + smoke-stopper sign-off on practice/build hardware, and finish [`post-lesson-eval.md`](./post-lesson-eval.md).

---

## Part A: Soldering Ergonomics, Thermal Mass & Power Bus Math (`[L1 Remember]` & `[L2 Understand]`)

1. List the **4 mandatory physical safety rules** enforced BEFORE powering an iron or plugging in a flight stack (`Props`, `Eye/Fume PPE`, `ESD`, `Smoke Stopper`):  
   > *(Your 4 rules)*
2. Fill in recommended **`SAC305`** iron temperatures and tip geometries:
   - `12 AWG` XT60 Main Lead: `__________ °C` | Tip: `__________________`
   - `28 AWG` FC UART Pad: `__________ °C` | Tip: `__________________`
   - Explain why holding `390°C` for `6` seconds on a tiny UART pad destroys the PCB:  
     > *(Your explanation)*
3. Label capacitor & wire safety limits:
   - The vertical white **`-` stripe** on a `1000 µF` electrolytic capacitor ALWAYS solders to: `________`
   - Round-trip `0.4 m` cable carries `50 A` on `18 AWG` (`20.95 mΩ/m`) vs. `12 AWG` (`5.21 mΩ/m`):
     - `18 AWG`: `R_total = ________ Ω`, `V_drop = ________ V`, `P_loss = ________ W`
     - `12 AWG`: `R_total = ________ Ω`, `V_drop = ________ V`, `P_loss = ________ W`

---

## Part B: Automated Bench Safety & Power Lab (`[L3 Apply]`)

1. Open [`0-student_files/21-drone-build/solderAndPowerLab.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.mjs).
2. Implement:
   - `selectSolderThermalProfile(targetPadType, alloy)`
   - `calculateWirePowerLoss({ awg, lengthMetersRoundTrip, currentAmps, supplyVolts })`
   - `auditCapacitorAndPowerBus({ capacitorUf, capacitorMaxVolts, capacitorPolarityValid, batteryCellsS, continuousCurrentA, wireAwg })`
   - `evaluateSmokeTestGate({ propsRemoved, xt60ResistanceOhms, smokeStopperTripped, visualBridgesCount, coldJointsCount })`
3. Verify syntax and run automated TDD feedback:
   ```bash
   node --check 0-student_files/21-drone-build/solderAndPowerLab.mjs
   node --test 0-student_files/21-drone-build/solderAndPowerLab.test.mjs
   ```

---

## Part C: Solder Forensics & Bench Fault Diagnosis (`[L4 Analyze]`)

Diagnose each lab failure mode and specify the exact physical + software fix:

1. **Incident 1:** Multimeter reads **`0.2 Ω`** across `XT60 +` and `XT60 -` right after soldering ESC pads. Under magnification you spot a tiny metallic whisker bridging two copper planes. What failed, why MUST you stop before smoke-testing, and what two tools clear the bridge?  
   > *(Your diagnosis)*
2. **Incident 2:** Your `4S` practice joint looks dull, grainy, and snaps loose when tugged gently (`cold joint`). Meanwhile your partner kept a `400°C` chisel tip on a UART pad for 5 seconds and peeled the copper pad clean off (`lifted pad`). Contrast root cause and recovery for BOTH:  
   > *(Your diagnosis)*
3. **Incident 3:** Why do we swab finished joints with **`99%` Isopropyl Alcohol (`IPA`)** AND confirm `capacitorMaxVolts >= cellCount * 4.2 * 1.4` before selecting a `25 V` vs. `50 V` capacitor on a `6S` (`25.2 V`) quadcopter?  
   > *(Your explanation)*

---

## Part D: Bench Checkoff & `12 AWG` Power Engineering Justification (`[L5 Evaluate]` & `[L6 Create]`)

Write a brief pre-power bench sign-off memo justifying why your team chose `12 AWG` XT60 leads, a `50V 1000 µF` low-ESR capacitor, `325°C` bevel tips for UARTs, and inline smoke-stopper gating:  
> *(Your sign-off memo)*
