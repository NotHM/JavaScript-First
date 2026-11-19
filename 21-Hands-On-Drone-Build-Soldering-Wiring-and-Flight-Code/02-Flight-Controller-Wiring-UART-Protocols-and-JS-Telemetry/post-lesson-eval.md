# Post-Lesson 21.2 Evaluation: Wiring Audits, Binary MSP & Failsafe States (`L1–L5`)

**Timing:** 5 minutes | **Score:** `____ / 5`

1. **`[L2 Understand | CompTIA A+ / Hardware]`** Predict the electrical failure if you power:
   - (a) a `5V` ExpressLRS receiver directly from `VBAT` (`25.2 V` 6S): `____________________________________`
   - (b) a `1 W` `5.8 GHz` VTX with zero antenna screwed onto its `SMA`/`MMCX` connector: `________________`
2. **`[L3 Apply | CIW-JS / Buffer]`** Given an MSP v1 frame buffer:
   `Buffer.from([0x24, 0x4D, 0x3E, 0x02, 0x6C, 0x64, 0x00, CS])`
   Compute: (a) Direction (`<` vs `>`), (b) payload length, (c) command ID decimal (`0x6C`), and (d) exact hex checksum byte `CS`:
   > *(Your calculation)*
3. **`[L4 Analyze | UART & I2C Faults]`** A bench quadcopter fails sensor detection: `GPS TX` is wired to `FC TX4`, and TWO `BMP280` barometers both hardwired to `0x76` sit on `SDA1/SCL1`. Explain BOTH faults and exact fixes:  
   > *(Your diagnosis)*
4. **`[L4 Analyze | Buggy JS Parser]`** A telemetry script loops `for (let i = 0; i < frame.length - 1; i++) xor ^= frame[i]` and rejects every packet from Betaflight. Why, and what single character fixes it?  
   > *(Your fix)*
5. **`[L5 Evaluate | Pre-Arm & Failsafe]`** While `ARMED` downrange, your ExpressLRS link drops (`rssiDbm = -112 dBm`). Which transition must the GCS state machine enforce (`FAILSAFE_RTH` vs. `EMERGENCY_DISARM`), and why?  
   > *(Your justification)*
