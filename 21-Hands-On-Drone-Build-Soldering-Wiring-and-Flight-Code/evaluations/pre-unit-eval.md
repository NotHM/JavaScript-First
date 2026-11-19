# Unit 21 Pre-Unit Evaluation: Soldering, Flight Stack Wiring, Telemetry & FAA Basics

**Directions:** Answer every question cleanly before instruction begins on Day 1. This baseline establishes where you are today on hardware safety, embedded wiring, JavaScript binary telemetry, and drone laws. Complete sentences or concise values are great!

---

1. **`[L1 Remember | CompTIA A+]`** What **two safety actions** must ALWAYS happen before touching a soldering iron to a quadcopter ESC or plugging USB/LiPo into a flight controller on a classroom bench?  
   > *(Your answer)*

2. **`[L2 Understand | CompTIA A+]`** Why does heavy `12 AWG` main battery wire (`XT60`) demand a higher iron temperature and wider chisel tip (`~375°C–400°C`) than a tiny `28 AWG` flight controller `UART` signal pad (`~320°C`)?  
   > *(Your answer)*

3. **`[L3 Apply | CompTIA A+ / CTE 4.0]`** You probe across `XT60 +` and `XT60 -` with a digital multimeter in continuity mode before connecting a battery and hear a **continuous beep (`0.3 Ω`)**. State what just happened and what you do NEXT:  
   > *(Your answer)*

4. **`[L2 Understand | Hardware / Wiring]`** When wiring an ExpressLRS receiver or GPS module to UART2 on an STM32 flight controller, explain why `RX` connects to `TX` and `TX` connects to `RX` instead of `TX → TX`:  
   > *(Your answer)*

5. **`[L3 Apply | CIW-JS / ITS-JS]`** Write a single JavaScript expression using bitwise XOR (`^`) to compute an MSP frame checksum byte over variables `len`, `cmdId`, and byte array `payload`:  
   > *(Your answer)*

6. **`[L1 Remember | RHCSA]`** A Linux workstation prints `Permission denied: /dev/ttyACM0` when Node.js opens your plugged-in flight controller. Name the standard Ubuntu/Debian supplementary **group** your student user needs to join:  
   > *(Your answer)*

7. **`[L2 Understand | CompTIA A+]`** Explain two hardware reasons builders solder a `1000 µF` low-ESR electrolytic capacitor across `VBAT`/`GND` on a 4-in-1 ESC and keep a `5.8 GHz` antenna screwed onto a Video Transmitter (`VTX`) before powering up:  
   > *(Your answer)*

8. **`[L1 Remember | FAA Regs]`** Contrast **FAA `TRUST`** vs. **FAA `14 CFR Part 107` (`UAG`)**, and state the weight threshold (`grams` / `lbs`) that triggers drone **registration & Remote ID** requirements:  
   > *(Your answer)*

9. **`[L4 Analyze | Wiring / Electronics]`** A student connects two `I2C` magnetometers sharing identical `7`-bit address `0x1E` onto the same `SDA`/`SCL` pads, AND powers a `5V`-max receiver from `VBAT` (`24V` 6S LiPo). Predict both failures:  
   > *(Your answer)*

10. **`[L5 Evaluate | Telemetry & Safety]`** A drone's radio link drops (`RSSI < -110 dBm`) 300 feet downrange while airborne. Why should a Flight Controller ground-control state machine trigger **`FAILSAFE_RTH`** instead of an immediate mid-air **`EMERGENCY_DISARM`**?  
    > *(Your answer)*
