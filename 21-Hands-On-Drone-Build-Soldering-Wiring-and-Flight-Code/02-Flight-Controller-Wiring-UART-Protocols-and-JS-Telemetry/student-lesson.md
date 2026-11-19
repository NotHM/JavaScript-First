# Student Lesson 21.2: Flight Controller Wiring, UART/I2C & Binary MSP Code

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/21-drone-build/wiringAndMspLab.mjs`](../../0-student_files/21-drone-build/wiringAndMspLab.mjs)

## My Lesson SMART Objectives
- [ ] **SL-L21.2-1 (`[L1–L2]` | `A+, RHCSA` | `SG-U21-2`):** Complete Part A mapping crossed `UART TX↔RX`, shared `I2C` 7-bit addresses, `5V/9V` BEC rails, VTX antenna rules, and Linux `/dev/ttyACM0` (`dialout`) commands.
- [ ] **SL-L21.2-2 (`[L3]` | `CIW-JS, ITS-JS` | `SG-U21-2, SG-U21-3`):** Implement `validateWiringBusMap()`, `encodeMspFrame()`, `decodeMspFrame()`, and `stepPreArmStateMachine()` in [`wiringAndMspLab.mjs`](../../0-student_files/21-drone-build/wiringAndMspLab.mjs) until [`wiringAndMspLab.test.mjs`](../../0-student_files/21-drone-build/wiringAndMspLab.test.mjs) turns 100% GREEN.
- [ ] **SL-L21.2-3 (`[L4–L5]` | Hardware + Code | `SG-U21-3`):** Diagnose checksum slicing, `TX-TX`, and `I2C` conflicts in Part C, design a safe pre-arm interlock in Part D, and complete [`post-lesson-eval.md`](./post-lesson-eval.md).

---

## Part A: Bus Pinouts, Voltage Rails & Linux Serial (`[L1 Remember]` & `[L2 Understand]`)

1. Complete this wiring map for a 4S/6S quadcopter on an STM32 F405/F722 flight controller:
   - ExpressLRS Receiver `TX` -> FC pad: `______` | Receiver `RX` -> FC pad: `______` | Voltage Rail: `____`
   - Compass + Barometer (`I2C`) share pads `_____` and `_____` via unique `___`-bit hex IDs (`0x1E` vs `0x76`).
   - Analog/HD VTX power rule: NEVER power up unless **`___________` is screwed on** (or Pit Mode enabled).
2. Trace the `6` sections of a **MultiWii Serial Protocol (`MSP v1`)** byte packet:
   - Bytes `0..2`: `________` (`$M<` request vs `$M>` response) | Byte `3`: `________` | Byte `4`: `________` | Last byte: `________`
3. Record two Linux commands that verify physical USB serial enumeration and user serial permissions:
   - Device listing: `____________________` | Group membership check: `____________________`

---

## Part B: Flight Stack Validator, MSP Codec & State Machine (`[L3 Apply]`)

1. Open [`0-student_files/21-drone-build/wiringAndMspLab.mjs`](../../0-student_files/21-drone-build/wiringAndMspLab.mjs).
2. Implement:
   - `validateWiringBusMap({ uartLinks, i2cDevices, vtxConfig })`
   - `encodeMspFrame(cmdId, payload, direction)`
   - `decodeMspFrame(frameBuffer)`
   - `stepPreArmStateMachine(currentState, telemetry, command)`
3. Run syntax + TDD checks cleanly:
   ```bash
   node --check 0-student_files/21-drone-build/wiringAndMspLab.mjs
   node --test 0-student_files/21-drone-build/wiringAndMspLab.test.mjs
   ```

---

## Part C: Hardware & Protocol Bug Forensics (`[L4 Analyze]`)

1. **Buggy MSP Checksum Helper:**
   ```javascript
   function checksumBuggy(frame) {
     let cs = 0;
     for (let i = 0; i < frame.length - 1; i++) cs ^= frame[i];
     return cs === frame[frame.length - 1];
   }
   ```
   Why does `checksumBuggy` fail on valid packet `Buffer.from([0x24, 0x4D, 0x3C, 0x00, 0x6E, 0x6E])`, and what exact edit fixes it?  
   > *(Your diagnosis + fix)*
2. **Physical Wiring Check:** On the bench, both GPS (`9600 bps`) and ExpressLRS (`420k baud CRSF`) were soldered to `UART2`, with `ELRS TX -> TX2` and `VBAT -> ELRS 5V`. Identify **all three hardware bugs** and predict each consequence:  
   > *(Your triage)*

---

## Part D: Ground Control Pre-Arm Critique (`[L5 Evaluate]` & `[L6 Create]`)

A student writes an `ARM` handler that enters `ARMED` immediately whenever the toggle switch sends `'ARM'` without inspecting `DISARMED -> PREARM_CHECK`, `cellVoltage`, `rssiDbm`, `imuCalibrated`, or `propsRemoved`. Critique three real accidents this allows and sketch clean guard criteria:  
> *(Your architecture critique)*
