# Unit 21 Post-Unit Evaluation: Soldering, Flight Stack Wiring, Telemetry & FAA Mastery

**Directions:** Complete independently after finishing Unit 21 labs, hardware bench checkoffs, and your Ground Control Station capstone (`unit-21-hands-on-drone-gcs`). Show work cleanly on math/code prompts!

---

1. **`[L1 Remember | CompTIA A+]`** State the mandatory props rule prior to any bench power/USB connection AND explain what device must sit inline between your LiPo/PSU and newly soldered XT60 on initial power-up:  
   > *(Your answer)*

2. **`[L2 Understand | CompTIA A+]`** Contrast a **cold solder joint** vs. a **lifted copper pad** vs. a **solder bridge**, naming the exact tool/technique (`flux`, `copper wick`, temperature adjustment, mechanical strain relief) used to prevent or repair each:  
   > *(Your answer)*

3. **`[L3 Apply | CompTIA A+ / CTE 4.0]`** A quadcopter pulls `50 A` through a `0.4 m` round-trip battery cable (`0.2 m` red + `0.2 m` black). Using resistance per meter `R`:
   - Wire option A (`18 AWG`): `0.02095 Ω/m` | Wire option B (`12 AWG`): `0.00521 Ω/m`
   Compute voltage drop $V = I \cdot R_{\text{total}}$ and power lost as heat $P = I^2 \cdot R_{\text{total}}$ for both wires:  
   > *(Your calculation)*

4. **`[L3 Apply | Hardware Wiring]`** Complete a clean FC wiring pinout for: (a) ExpressLRS `CRSF` receiver (`5V`, `GND`, `TX`, `RX`), (b) GPS + Compass module (`5V`, `GND`, `TX`, `RX`, `SDA`, `SCL`), and (c) Analog VTX (`9V/VBAT`, `GND`, `Video`, `TX`). Indicate which pins cross (`TX↔RX`), which share (`SDA/SCL`), and why `VTX` never powers up without an antenna:  
   > *(Your pinout)*

5. **`[L3 Apply | CIW-JS / ITS-JS]`** Given incoming raw binary bytes of a **MultiWii Serial Protocol v1 response (`$M>`)**:
   `[0x24, 0x4D, 0x3E, 0x04, 0x6E, 0xA8, 0x00, 0x1E, 0x00, CS]`
   Identify: (a) Header & direction, (b) payload length, (c) command ID decimal (`0x6E`), and (d) the exact hexadecimal XOR checksum byte `CS`:  
   > *(Your decode)*

6. **`[L1 Remember | RHCSA]`** List two Linux CLI commands to identify an enumerated flight controller serial device and confirm whether user `$USER` holds supplementary `dialout` group membership:  
   > *(Your commands)*

7. **`[L4 Analyze | Wiring / Serial Debug]`** A student finishes wiring an ExpressLRS receiver to UART3. Both LEDs stay solid, Betaflight Receiver tab shows zero stick movement, and `UART3 RX3` connects directly to `ELRS RX` while `TX3` connects to `ELRS TX`. Diagnose the fault and write a JavaScript guard snippet that rejects non-crossed serial port configs:  
   > *(Your diagnosis + fix)*

8. **`[L2 Understand | FAA Regs]`** You built a custom `320 g` (`0.71 lb`) 3D-printed sub-55lb quadcopter used first for weekend hobby fun and next month to inspect roofs for a paid client. State the required FAA credentials, registration path (`FAADroneZone`), Remote ID rule (`Part 89`), and official external FAA portals for each phase:  
   > *(Your answer)*

9. **`[L4 Analyze | CIW-JS / Buffer Bug]`** Inspect this broken Node.js MSP packet parser:
   ```javascript
   function badChecksum(buf) {
     let cs = 0;
     for (let i = 0; i < buf.length - 1; i++) cs ^= buf[i];
     return cs === buf[buf.length - 1];
   }
   ```
   Why does `badChecksum()` fail on EVERY valid MSP frame (`$M< ...`)? Show the exact `for` loop start index fix:  
   > *(Your fix)*

10. **`[L5 Evaluate | Full-Stack Drone Architecture]`** Before granting `ARMED` status inside `unit-21-hands-on-drone-gcs`, design and justify a **5-point automated Software + Hardware Pre-Arm Gate** combining physical bench checks, BEC battery voltage thresholds (`3S/4S/6S`), RC RSSI link health, and `Part 107 / LAANC` legal bounds:  
    > *(Your architecture)*
