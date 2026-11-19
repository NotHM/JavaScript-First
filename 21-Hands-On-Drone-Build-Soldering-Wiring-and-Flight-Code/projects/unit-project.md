# Unit 21 Capstone Project: Hands-On Drone Hardware Build, Telemetry & Ground Control System

**Track:** High School CTE (Grades 11–12) & Community College (`CTE/CIS 202` — Final Semester Focus Project)  
**Student Project Scaffold:** [`0-student_files/projects/unit-21-hands-on-drone-gcs/`](../../0-student_files/projects/unit-21-hands-on-drone-gcs/)  
**Automated Check:** `npm run grade -- --unit 21` (runs lab suites + `capstone.test.mjs`)

---

## Scenario & Engineering Mission

Your aerospace robotics team has been contracted to deliver a **field-ready, student-built quadcopter hardware stack** paired with a custom **Node.js Ground Control Station (`GCS`) & Pre-Flight Auditor** (`unit-21-hands-on-drone-gcs`). To mimic industry UAV manufacturing and technician workflows, your project combines **hands-on soldering & wiring** (physical bench build OR instructor-verified hardware harness) with **automated JavaScript verification code** that guarantees no aircraft ever receives battery power or `ARMED` motor signals while unsafe or non-compliant.

---

## Required Deliverables (Hands-On + Software Stack)

### Part 1: Physical Bench Fabrication & Smoke-Safe Bring-Up (Hardware / Lab Station)
1. **3D Airframe / Canopy Integration (Optional Link w/ Unit 20):** Mount your flight controller stack, GPS mast, or camera canopy cleanly (`TPU`/`PETG` prints + M2/M3 vibration grommets).
2. **Power Bus Soldering:** Solder **`12–14 AWG` XT60 leads** (`+` red / `-` black) and a **`1000 µF` low-ESR electrolytic capacitor** (strictly honoring `-` stripe to `GND`) onto the 4-in-1 ESC battery pads (`375–400°C`), followed by clean flux removal (`99% IPA`).
3. **Crossed UART / I2C / BEC Wiring:** Wire your ExpressLRS/CRSF receiver (`5V` rail, **`TX ↔ RX` crossed**), optional GPS/Compass (`UART` + `SDA/SCL`), and `VTX` (with **`5.8 GHz` antenna screwed on PRIOR to power**).
4. **Props-Off Continuity & Smoke-Stopper Gate:** Verify `xt60ResistanceOhms >= 10 Ω` via digital multimeter and boot through an inline **smoke stopper** with **zero propellers installed**.

### Part 2: Node.js Flight Control & Safety CLI (`unit-21-hands-on-drone-gcs/index.mjs`)
Implement and pass all automated tests inside [`capstone.test.mjs`](../../0-student_files/projects/unit-21-hands-on-drone-gcs/capstone.test.mjs):
1. **`auditBuildBenchSafety(benchSpec)` (`L3 Apply / L4 Analyze`):** Validates props-off state, wire ampacity/voltage drop (`<= 0.5V` drop max), XT60 continuity (`>= 10 Ω`), solder quality, and smoke-stopper gate.
2. **`validateWiringBusMap(busSpec)` (`L4 Analyze`):** Audits UART assignments for **`TX-TX` / `RX-RX` errors**, port contention, duplicate I2C 7-bit hex addresses, `5V` peripheral overvoltage (`VBAT` mixup), and VTX antenna missing hazards.
3. **`MspPacketCodec` (`encodeFrame` / `decodeFrame`) (`L3 Apply`):** Builds and parses valid `$M<` / `$M>` binary `Buffer` frames (`uint8 len`, `uint8 cmd`, little-endian payload, exact XOR checksum).
4. **`FlightControllerGcs` (`evaluateMissionLaunch`) (`L5 Evaluate / L6 Create`):** Combines hardware health telemetry (`cellVoltage >= 3.5V`, `rssiDbm >= -95`, calibrated IMU), state transitions (`DISARMED -> PREARM_CHECK -> ARMED -> FAILSAFE_RTH / EMERGENCY_DISARM`), and concise FAA rules (`> 250 g` Remote ID/registration, `TRUST` vs `Part 107`, `<= 400 ft AGL`, `LAANC`, `3 SM`) into one deterministic preflight verdict + external FAA study link summary.

---

## Showcase Day Checkoff & Submission Checklist

- [ ] All props removed on bench; continuity check & inline smoke-stopper signed off by instructor.
- [ ] `node --check 0-student_files/projects/unit-21-hands-on-drone-gcs/index.mjs` passes with zero warnings.
- [ ] `npm run grade -- --unit 21` reports **100% GREEN** across all Unit 21 lab and capstone tests.
- [ ] Clean wiring schematic / pinout table + battery/FAA preflight receipt committed in team repository.
