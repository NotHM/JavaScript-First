# Unit 21 Evaluations — Teacher Answer Key & Hake's $g$ Growth Tracker

**Unit:** Unit 21 — Hands-On Drone Build, Soldering, Wiring & Flight Programming  
**Paired Assessment Files:** [`pre-unit-eval.md`](./pre-unit-eval.md) · [`post-unit-eval.md`](./post-unit-eval.md)

---

## Pre-Unit Evaluation Key (`Day 1 Baseline`)

1. **`[L1 | CompTIA A+]`** (1) **Remove ALL propellers (`Props-OFF`)** before power/USB; (2) wear **ANSI Z87.1 eye protection** and engage **fume extraction** / ESD strap (`smoke stopper` prior to LiPo power).
2. **`[L2 | CompTIA A+]`** Thick `12 AWG` copper wires and large XT60/ESC tabs act as rapid **heat sinks (high thermal mass)** requiring `375–400°C` + a wide chisel tip to melt evenly without lingering too long; tiny `28 AWG` FC UART pads have low thermal mass and will **delaminate/lift off the fiberglass PCB** above `340°C` or long dwell times.
3. **`[L3 | CompTIA A+]`** Dead **short circuit between `VBAT` and `GND`** (bridged pad, reversed FET, or stray solder ball). **STOP immediately**—NEVER connect a battery! Inspect under magnification, clear bridges with flux + copper desoldering braid, and re-test until continuity stops (`R >= 10 Ω` or steady open/charging capacitor reading).
4. **`[L2 | Hardware]`** Serial UART is directional: **Transmit (`TX`) outputs bits** while **Receive (`RX`) inputs bits**. Two `TX` lines tied together collide with zero communication; data only flows when **`Device TX → FC RX`** and **`Device RX → FC TX`** across a shared `GND`.
5. **`[L3 | CIW-JS]`**
   ```javascript
   const checksum = payload.reduce((acc, b) => acc ^ (b & 0xff), (len & 0xff) ^ (cmdId & 0xff));
   ```
6. **`[L1 | RHCSA]`** **`dialout`** (on Debian/Ubuntu Linux systems; `uucp` on Arch/some RHEL derivatives).
7. **`[L2 | CompTIA A+]`** (1) The **`1000 µF` low-ESR capacitor** absorbs high-voltage active-braking inductive ESC spikes (`LC ringing`) before they destroy `VBAT`/BEC regulators; (2) powering a **VTX without a `5.8 GHz` antenna** reflects RF transmission energy straight back into the amplifier (`infinite VSWR`), overheating and burning out the VTX RF stage within seconds.
8. **`[L1 | FAA]`** **`TRUST`** is the free online recreational flyer safety test (`49 U.S.C. §44809`), whereas **`Part 107 UAG`** is the proctored commercial Remote Pilot certificate required for paid/institutional work. Drones **`> 250 g` (`>= 0.55 lb`)** require FAADroneZone **registration and Remote ID** for recreational use, while **ALL** Part 107 drones require individual registration + Remote ID regardless of weight.
9. **`[L4 | Hardware]`** (1) Two `I2C` devices on address `0x1E` respond simultaneously on `SDA`, corrupting magnetometer bus frames; (2) feeding `24V` (`VBAT`) into a `5V` receiver **instantly burns out its voltage regulator/MCU**.
10. **`[L5 | Telemetry]`** An immediate mid-air `EMERGENCY_DISARM` cuts all four motors at 300 ft, causing an uncontrolled ballistic crash risking serious injury/property damage (`§107.9` liability); `FAILSAFE_RTH` uses onboard GPS/barometer/IMU autonomously to climb/return safely or descend cleanly.

---

## Post-Unit Evaluation Key (`Day 12 Summative`)

1. **`[L1 | CompTIA A+]`** **Mandatory props-off check** whenever powered on bench + insert an inline **smoke stopper (current-limiting polyfuse/bulb)** between LiPo/PSU and XT60 prior to direct battery connection.
2. **`[L2 | CompTIA A+]`**
   - **Cold joint:** Matte, grainy, fractured bond caused by insufficient heat, dirty oxidized tip, or moving wire while cooling -> fix by applying fresh flux and cleanly reflowing.
   - **Lifted copper pad:** Copper foil delaminating from FR4 PCB due to overheating (`>350°C` / `>4s`) or yanking tight wires -> prevent with temp control & silicone wire strain relief; recover via an alternate solder pad / enameled jumper trace.
   - **Solder bridge:** Accidental short connecting two adjacent pins -> remove via **rosin flux + copper desoldering wick braid**.
3. **`[L3 | CompTIA A+]`** Note total wire resistance $R_{\text{total}} = 0.4\text{ m} \times R_m$:
   - **`18 AWG`:** $R_{\text{total}} = 0.4 \times 0.02095 = 0.00838\ \Omega$; $V_{\text{drop}} = 50 \times 0.00838 = \mathbf{0.419\text{ V}}$; $P_{\text{loss}} = 50^2 \times 0.00838 = \mathbf{20.95\text{ W}}$ wasted as hot wire heat!
   - **`12 AWG`:** $R_{\text{total}} = 0.4 \times 0.00521 = 0.002084\ \Omega$; $V_{\text{drop}} = 50 \times 0.002084 = \mathbf{0.104\text{ V}}$; $P_{\text{loss}} = 50^2 \times 0.002084 = \mathbf{5.21\text{ W}}$ (**4× cooler & cleaner power bus**).
4. **`[L3 | Hardware]`**
   - **(a) ExpressLRS Rx:** `5V → 5V BEC` (NOT VBAT!), `GND → GND`, `Rx TX → FC RX2`, `Rx RX → FC TX2`.
   - **(b) GPS + Compass:** `5V → 5V`, `GND → GND`, `GPS TX → FC RX4`, `GPS RX → FC TX4`, `SDA → FC SDA`, `SCL → FC SCL` (verify unique I2C address vs barometer).
   - **(c) VTX:** `9V/VBAT → 9V/VBAT`, `GND → GND`, `Video → FC VTX/CAM pad`, `SmartAudio/MSP → FC TX5` (always screw `5.8 GHz` antenna on FIRST!).
5. **`[L3 | CIW-JS]`**
   - **(a)** `$M>` (`0x24 0x4D 0x3E`): MSP v1 Response **from** Flight Controller (`>`).
   - **(b)** Payload length = **`4`** (`0x04` bytes).
   - **(c)** Command ID = **`110`** (`0x6E` = `MSP_ANALOG`).
   - **(d)** Checksum `CS` = `0x04 ^ 0x6E ^ 0xA8 ^ 0x00 ^ 0x1E ^ 0x00` = `0x6A ^ 0xA8 ^ 0x1E` = `0xC2 ^ 0x1E` = **`0xDC`** (`220` decimal).
6. **`[L1 | RHCSA]`** `ls -l /dev/ttyACM* /dev/ttyUSB*` (or `lsusb`, `dmesg | tail`) and `id -nG` (check for `dialout` / `uucp`).
7. **`[L4 | Hardware + Code]`** `UART3` was wired **straight-through (`TX3 → TX` & `RX3 → RX`)** instead of crossed (`TX3 → ELRS RX`, `RX3 → ELRS TX`). Cross the two UART signal wires at the receiver or FC pads. Guard check:
   ```javascript
   if (link.fcPin.startsWith('TX') && link.devicePin.startsWith('TX')) {
     throw new Error('UART_PIN_ERROR: Cross TX <-> RX; never wire TX directly to TX.');
   }
   ```
8. **`[L2 | FAA]`** (`320 g > 250 g`!):
   - *Hobby phase:* Must pass free **FAA `TRUST`** (`faa.gov`), **register** at `faadronezone.faa.gov`, run **Remote ID (`Part 89`)**, fly `<= 400 ft` VLOS, and clear controlled airspace via **`B4UFLY` / `LAANC`**.
   - *Paid roof inspection phase:* Hobby `TRUST` is **invalid** for paid/commercial work! Must earn **FAA `Part 107` UAG certificate** (study `FAA-G-8082-22`, apply via **`iacra.faa.gov`**, pass PSI knowledge test), maintain **individual commercial registration** in `FAADroneZone`, verify **LAANC**, VFR `>= 3 SM`, and obey `§107.9` `10`-day reporting if non-UAS damage `> $500`.
9. **`[L4 | CIW-JS]`** MSP v1 XOR checksum covers **ONLY length byte (`index 3`), command byte (`index 4`), and payload bytes (`index 5 .. len-2`)**—it **excludes** the 3-byte `$M<` header (`indices 0, 1, 2`)! Fix loop start to `for (let i = 3; i < buf.length - 1; i++)`.
10. **`[L5 | Capstone Architecture]`** Required 5-gate interlock:
    1. **Hardware continuity & smoke gate cleared** (`xt60Ohms >= 10`, zero shorts/bridges, smoke stopper OK).
    2. **Bus/Power sanity:** Zero UART `TX-TX` or I2C address conflicts; cell voltage `>= 3.5V/cell` (`>= 14.0V` on 4S).
    3. **Sensor & Link readiness:** IMU/gyro calibrated, RC link active (`RSSI >= -95 dBm`), switch armed ONLY on intentional state transition (`DISARMED → PREARM_CHECK`).
    4. **Compliance check:** Registration/Remote ID active (`>250 g` or Part 107), `altFt <= 400`, LAANC approved if controlled airspace, visibility `>= 3 SM`.
    5. **Automated failsafe transition:** Any RC signal timeout (`> 1000 ms`) or brownout (`< 3.3V/cell`) drops automatically out of `ARMED` into `FAILSAFE_RTH` / safe motor disarm.

---

## Class Mastery Growth Log (Hake's Normalized Gain)

$$g = \frac{\text{Post\%} - \text{Pre\%}}{100 - \text{Pre\%}}$$

Target: **$g \ge 0.60$** (High Gain across Soldering/Hardware Safety, UART/MSP Coding, and Legal Readiness).
