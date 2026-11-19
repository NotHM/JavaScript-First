# Unit 21 Capstone: Hands-On Drone Build & Node.js Ground Control System (`GCS`)

**Track:** Year 2 Semester 4 (`CTE/CIS 202`) · **Spec:** [`projects/unit-project.md`](../../../21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/projects/unit-project.md)

## Safety First (Physical Station)
- Remove **all propellers** (`propsRemoved: true`) before touching a soldering iron, multimeter, smoke stopper, or USB cable.
- Measure `>= 10 Ω` across XT60 `+`/`-` pads and boot through an inline current-limited **smoke stopper** before connecting a live LiPo battery.
- Never power a `5.8 GHz` VTX without an antenna attached or Pit Mode active.

## Software Engineering Deliverables (`index.mjs`)
Implement all 4 modules inside [`index.mjs`](./index.mjs) until `capstone.test.mjs` passes **100% GREEN**:
1. **`auditBuildBenchSafety(benchSpec)`** — Verify props-off status, `AWG` voltage drop (`<= 0.5 V`), `1000 µF` capacitor voltage/polarity, continuity (`>= 10 Ω`), solder joints, and inline smoke-stopper gate.
2. **`validateWiringBusMap(busSpec)`** — Detect non-crossed `TX-TX` / `RX-RX` errors, UART contention, `VBAT` over-voltage on `5V` rails, duplicate `I2C` 7-bit hex IDs, and un-terminated VTX hazards.
3. **`MspPacketCodec`** (`encodeFrame` / `decodeFrame`) — Construct and verify binary `$M<` / `$M>` frames with `uint8` payload lengths and exact XOR checksum validation.
4. **`FlightControllerGcs`** (`evaluateMissionLaunch`) — Enforce gated `DISARMED -> PREARM_CHECK -> ARMED -> FAILSAFE_RTH / EMERGENCY_DISARM` state transitions integrated with top-level FAA rules (`TRUST` vs `Part 107`, `>250 g` Remote ID, `< 55 lbs`, `<= 400 ft AGL`, `LAANC`, `3 SM`, `500 ft` cloud clearance) plus external FAA portal links.

```bash
node --check 0-student_files/projects/unit-21-hands-on-drone-gcs/index.mjs
npm run grade -- --unit 21
```
