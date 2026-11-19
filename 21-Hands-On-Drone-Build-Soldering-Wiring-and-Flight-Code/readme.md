# Unit 21: Hands-On Drone Build — Soldering, Wiring, Flight Programming & FAA Cert Readiness

**Course:** JavaScript First — High School CTE (Grades 11–12) & Community College Dual-Enrollment (`CTE/CIS 202` · Year 2 Sem 4)  
**Quick Links:** [`setup-guide.md`](./setup-guide.md) · [`unit-guide.md`](./unit-guide.md) · [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) · `npm run grade -- --unit 21`

---

> *Spend twenty minutes in any robotics or computer science lab and you'll notice a sharp divide: plenty of developers can parse JSON from a weather API, yet freeze the second someone hands them a soldering iron, a multimeter, an XT60 connector, and an STM32 flight controller with six unmarked UART pads. Meanwhile, plenty of hobby builders can melt solder onto a PDB, yet have no idea how a serial frame crosses a wire—or why swapping `TX` and `RX` fails silently while their Node.js ground station waits forever on `/dev/ttyUSB0`. Today we bridge both worlds cleanly.*

Welcome to **Unit 21**, the culminating hands-on engineering capstone of **Semester 4 (`CTE/CIS 202`)**. Everything you studied across two years of JavaScript, Linux/POSIX (`Unit 01`), Ohm's Law & LiPo flight math (`Unit 12`), async serial/telemetry streams (`Unit 07`), binary `Buffer` protocols (`Units 12, 17, 20`), 3D CAD airframe parts (`Unit 20`), and Part 107 simulation (`Unit 19`) becomes **physical hardware plus real flight control code**.

And notice the priority stack requested by real aerospace and embedded employers: **hands-on soldering, power bus safety, flight stack wiring, and Node.js flight-controller programming come first**—paired with a concise, high-impact overview of **FAA regulations** and **direct external FAA certification portals** so learners aiming for `FAA TRUST` or `14 CFR Part 107 (UAG)` know exactly where to train and test.

---

## Why Software Engineers Should Master Hardware Bench Bring-Up

Software bugs cost CPU cycles. **Hardware wiring bugs destroy MOSFETs in milliseconds.** When a `4S` (`16.8 V`) or `6S` (`25.2 V`) LiPo battery meets a bridged `VBAT`-to-`GND` solder splash across a 4-in-1 ESC, thousands of milliamps surge through trace copper before your brain registers the spark.

That is why disciplined engineers never cross the **"Battery Smoke Barrier"** on luck. Every single build in Unit 21 obeys a strict, deterministic bench protocol modeled after **CompTIA A+** electrical safety and avionics QA:

1. **Mechanical Build & ESD Hygiene (Props OFF Always):** Mount the flight stack on vibration-damping silicone grommets inside your **Unit 20 3D-printed TPU/PETG canopy & carbon frame** while wearing an ESD wrist strap on an insulated silicone mat with fume extraction running.
2. **Alloy, Tip Mass & Thermal Control:** Match temperature and tip chisel size to thermal mass—heavy **12–14 AWG XT60 leads** pull heat fast (`375°C–400°C`, big chisel tip), whereas **28–30 AWG UART signal pads** scorch above `340°C` (`315°C–335°C`, fine bevel tip).
3. **Inspection + Multimeter Continuity Audit Before Power:** Visually inspect for dull/grainy *cold joints* or hairline solder bridges, then place a multimeter in **continuity/resistance mode** across `XT60 +` and `XT60 -` (`GND`). A continuous beep (`~0 Ω`) means **STOP—dead short!**
4. **Inline Smoke Stopper Current-Limiting Gate:** Even after multimeter checks pass, ALWAYS plug in first through an inline **smoke stopper** (polyfuse or bulb current limiter) **with propellers removed**. Only green lights and silence earn permission to connect direct battery power or USB data.

Let's encode that bench gate in pure JavaScript inside Lesson `21.1` ([`droneHardwareSafetyDemo.mjs`](./01-Soldering-Power-Distribution-and-Hardware-Safety/code/droneHardwareSafetyDemo.mjs)) and [`solderAndPowerLab.mjs`](../0-student_files/21-drone-build/solderAndPowerLab.mjs):

```javascript
export function evaluateSmokeTestGate({
  propsRemoved,
  xt60ResistanceOhms,
  smokeStopperTripped,
  visualBridgesCount,
  coldJointsCount,
}) {
  const blockers = [];
  if (!propsRemoved) blockers.push('PROPS_ON_HAZARD: Remove all propellers before bench power.');
  if (!Number.isFinite(xt60ResistanceOhms) || xt60ResistanceOhms < 10) {
    blockers.push('DEAD_SHORT: XT60 battery lead resistance < 10 ohms; inspect FETs and pads.');
  }
  if (visualBridgesCount > 0) blockers.push('SOLDER_BRIDGE: Clear bridged pins with flux + braid.');
  if (coldJointsCount > 0) blockers.push('COLD_JOINT: Reflow matte/cracked joints cleanly.');
  if (smokeStopperTripped) blockers.push('SMOKE_STOPPER_TRIPPED: Disconnect battery immediately.');

  return { safeToConnectDirectLipo: blockers.length === 0, blockers };
}
```

### Wire Gauge Ampacity & Voltage Drop (`P = I^2 R`)

Undersized wires turn battery energy into heat instead of lift. Given AWG resistance per meter (`mΩ/m`), round-trip wire length `2 * L`, and burst current `I`:

$$V_{\text{drop}} = I \cdot (2 L \cdot R_{\text{m}}) \qquad P_{\text{loss}} = I^2 \cdot (2 L \cdot R_{\text{m}})$$

A `60 A` peak pull across thin `18 AWG` (`20.95 mΩ/m`) battery leads wastes **4× the copper heat** of proper `12 AWG` (`5.21 mΩ/m`) silicon wire—dropping flight controller voltage and risking brownouts mid-punch-out! Plus, adding a **`1000 µF` low-ESR electrolytic capacitor** across `VBAT`/`GND` absorbs active-braking regenerative voltage spikes that would otherwise pop your `5V` BEC regulator.

---

## 1. Flight Controller Wiring: UART `TX ↔ RX`, `I2C`, `DShot` & BEC Rails (`21.2`)

Look at the #1 wiring bug in student quadcopter builds: **wiring `TX` on the GPS or ExpressLRS receiver straight to `TX` on the flight controller.**

Think physically about serial pins:
- **`TX` (Transmit)** drives voltage out cleanly.
- **`RX` (Receive)** listens passively for serial bits.
- Therefore, **every UART connection crosses over**: **`Device TX → FC RX`** and **`Device RX → FC TX`** (`GND` shared cleanly!). Wiring `TX → TX` lets two output drivers argue on one copper wire with zero telemetry arriving!

Meanwhile, understand why the four major buses on a modern flight stack (`STM32 F405 / F722 / H743`) never share roles carelessly:

| Bus / Pin Type | Wires Used | Typical Drone Peripherals | Engineering Gotchas |
|---|---|---|---|
| **UART (`TXn / RXn`)** | `2` crossed + `VCC/GND` | **ExpressLRS (`CRSF`)**, **GPS (`UBX/NMEA`)**, `VTX` SmartAudio/`MSP`, Telemetry Radio | Dedicated UART port per device (unless softserial); **never `TX-TX`**! |
| **I2C (`SDA / SCL`)** | `2` shared + `3.3V/GND` | Magnetometer (`HMC5883L`), Barometer (`BMP280`), Optical Flow | Shared bus by **7-bit hex address** (`0x1E`, `0x76`)—duplicate addresses collide! |
| **Motor Signals (`M1–M4`)** | `4` signal wires + `VBAT/GND` | **4-in-1 ESC** (`DShot300 / DShot600`) + Motor current/telemetry | Props-off Configurator motor spin check verifies CW/CCW rotation & corner map |
| **Regulated BEC Rails** | `5V`, `9V/10V`, `VBAT` | `5V` for Rx/GPS (`<= 1.5–2A`); `9V/10V` or `VBAT` for HD/Analog VTX | **Never feed `VBAT` (`16–25V`) into a `5V` receiver**; **never power a VTX without an antenna attached!** |

### Programming the Flight Controller in Node.js: Binary `MSP` (`$M<`) Frames

How does Betaflight Configurator—or your own Node.js Ground Control Station—query attitude, battery voltage, or armed status from the flight controller over USB serial (`/dev/ttyACM0`, **Linux `dialout` group — RHCSA!**)?

By speaking **MSP (MultiWii Serial Protocol v1)** raw binary `Buffer` frames:

```
Byte 0..2 : Header     ['$', 'M', '<']  (0x24 0x4D 0x3C = Request to FC)
                       ['$', 'M', '>']  (0x24 0x4D 0x3E = Response from FC)
Byte 3    : Length N   uint8 (payload byte count: 0..255)
Byte 4    : Cmd ID     uint8 (e.g. 108 = MSP_ATTITUDE, 110 = MSP_ANALOG, 200 = SET_RAW_RC)
Bytes 5.. : Payload    N bytes (little-endian uint16/int16 sensor fields)
Last Byte : Checksum   XOR of Length ^ CmdID ^ Payload[0] ^ ... ^ Payload[N-1]
```

Look how cleanly **Node.js `Buffer` + bitwise XOR (`^`)** constructs and validates an MSP packet in [`fcWiringAndMspDemo.mjs`](./02-Flight-Controller-Wiring-UART-Protocols-and-JS-Telemetry/code/fcWiringAndMspDemo.mjs):

```javascript
export function encodeMspFrame(cmdId, payload = [], direction = '<') {
  const bytes = Buffer.from(payload);
  const frame = Buffer.alloc(6 + bytes.length);
  frame.write(`$M${direction}`, 0, 'ascii');
  frame[3] = bytes.length & 0xff;
  frame[4] = cmdId & 0xff;
  bytes.copy(frame, 5);

  let checksum = frame[3] ^ frame[4];
  for (let i = 0; i < bytes.length; i++) {
    checksum ^= bytes[i];
  }
  frame[5 + bytes.length] = checksum & 0xff;
  return frame;
}
```

Once decoded cleanly, your JavaScript **Ground Control Station (`GCS`)** enforces a **4-step Software Pre-Arm Safety State Machine**:

```javascript
export const GCS_STATES = Object.freeze({
  DISARMED: 'DISARMED',
  PREARM_CHECK: 'PREARM_CHECK',
  ARMED: 'ARMED',
  FAILSAFE_RTH: 'FAILSAFE_RTH',
  EMERGENCY_DISARM: 'EMERGENCY_DISARM',
});

export function stepPreArmStateMachine(currentState, telemetry, command) {
  const { propsRemoved = true, cellVoltage = 0, rssiDbm = -120, imuCalibrated = false, legalApproved = false } = telemetry;

  if (command === 'ESTOP') return GCS_STATES.EMERGENCY_DISARM;
  if (currentState === GCS_STATES.ARMED && (rssiDbm < -105 || cellVoltage < 3.25)) {
    return GCS_STATES.FAILSAFE_RTH;
  }
  if (command === 'REQUEST_PREARM') {
    const hardwareHealthy = cellVoltage >= 3.5 && rssiDbm >= -95 && imuCalibrated;
    return hardwareHealthy && legalApproved && propsRemoved !== undefined
      ? GCS_STATES.PREARM_CHECK
      : GCS_STATES.DISARMED;
  }
  if (currentState === GCS_STATES.PREARM_CHECK && command === 'ARM') {
    return cellVoltage >= 3.5 && rssiDbm >= -95 && imuCalibrated && legalApproved
      ? GCS_STATES.ARMED
      : GCS_STATES.DISARMED;
  }
  if (command === 'DISARM') return GCS_STATES.DISARMED;
  return currentState;
}
```

### Understanding `DShot300` / `DShot600` Digital ESC Signals

Notice we also wire four `M1–M4` motor signal lines from the flight controller to the 4-in-1 ESC without any PWM calibration step! Why? Because modern builds use **DShot (`Digital Shot`)**—a fixed `16`-bit serial packet sent per motor loop:

```
Bits 15..5 (11 bits): Throttle value (0 = disarm; 48..2047 = 2000 digital throttle steps)
Bit  4     ( 1 bit ): Telemetry request flag (1 = request ESC RPM/temp/voltage back)
Bits  3..0 ( 4 bits): XOR nibble CRC checksum = (val ^ (val >> 4) ^ (val >> 8)) & 0x0F
```

Because `DShot` transmits integer frames with a 4-bit nibble CRC instead of analog PWM pulse widths, electrical motor noise cannot drift your idle throttle, and **bidirectional DShot** returns real-time motor RPM over the same wire so Betaflight notch filters suppress frame vibrations automatically! All serial/motor drivers isolate through clean dependency-injected interfaces so **`npm run grade -- --unit 21` runs 100% deterministically in Node 24 without requiring a physical USB drone plugged into CI!**

---

## 2. Top-Level Laws, Regulations & External FAA Certification Resources (`21.3`)

We keep the regulatory track **focused, high-signal, and practical** so 75%+ of your class hours stay centered on **soldering, wiring, CAD mounts, Linux serial tooling, and JavaScript telemetry code**, while still giving every student complete clarity on **how not to break federal law**—plus direct bookmarks to official FAA study and licensing portals:

### The 5-Minute Legal Cheat Sheet for Builders & Programmers

| Rule / Requirement | Recreational Hobby (`49 U.S.C. §44809`) | Commercial / Work / School Media (`14 CFR Part 107`) |
|---|---|---|
| **Required Certificate** | Free **FAA `TRUST`** completion card | Paid proctored **Part 107 `UAG` Remote Pilot Certificate** (recurrent online test every `24` calendar months) |
| **Aircraft Registration** | **FAADroneZone** (`> 250 g` / `>= 0.55 lb`, single ID across hobby fleet) | **Every drone individually registered** regardless of weight (`FAADroneZone`) |
| **Remote ID (`14 CFR Part 89`)** | Required if `> 250 g` (Standard built-in or Broadcast Module, OR FRIA field) | **Required on all Part 107 flights** (Standard or Broadcast Module) |
| **Operational Envelope** | `<= 400 ft AGL`, strict **VLOS**, yield to manned aircraft, obey TFRs/NP | `< 55 lbs` (strict), `<= 400 ft AGL`, `<= 100 mph` (`87 kt`), `>= 3 SM` vis, `500 ft` below / `2,000 ft` horiz from clouds |
| **Controlled Airspace (`B/C/D/E`)** | Prior **LAANC** / `B4UFLY` authorization required | Prior **LAANC** / FAADroneZone authorization required |
| **Mandatory Accident Report (`§107.9`)** | N/A (`§107.9` applies to Part 107 operations) | Report within **`10` calendar days** on serious injury, LOC, or property damage **`> $500`** |

### Official External Resources for FAA Certificates & Open-Source Drone Builds

Students pursuing official FAA credentials or deeper airframe builds should bookmark these primary sources directly (also indexed inside [`setup-guide.md`](./setup-guide.md) and [`03-FAA-Regulations-Overview-External-Cert-Resources-and-Bench-Test/readme.md`](./03-FAA-Regulations-Overview-External-Cert-Resources-and-Bench-Test/readme.md)):

- **FAA TRUST (Free Recreational Exam):** `https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates`
- **FAA DroneZone (Registration, Remote ID & Waivers):** `https://faadronezone.faa.gov/`
- **FAA Part 107 Remote Pilot Study Guide (`FAA-G-8082-22`) & ACS (`FAA-S-ACS-10B`):** `https://www.faa.gov/regulations_policies/handbooks_manuals/aviation`
- **IACRA (Remote Pilot Certificate Application Portal):** `https://iacra.faa.gov/`
- **eCFR `14 CFR Part 107` & `Part 89` (Official Statutory Text):** `https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107`
- **B4UFLY & LAANC Airspace Portals (`AutoPylot`, `Aloft`):** `https://www.faa.gov/uas/getting_started/b4ufly`
- **NOAA Aviation Weather (`METAR`/`TAF`) & Sectional Charts:** `https://aviationweather.gov/` & `https://skyvector.com/`
- **Open-Source Flight Stack Docs:** Betaflight (`betaflight.com/docs`), ExpressLRS (`expresslrs.org`), ArduPilot (`ardupilot.org`), PX4 (`docs.px4.io`), and Oscar Liang Build Guides (`oscarliang.com`).

---

## 3. Certification Crosswalk (`75%+` Quiz Alignment) & Career Readiness

Building and programming a drone simultaneously sharpens the exact competencies tested across the **8 capstone certification exams** aligned at **>= 75%** across all Unit 21 quizzes (`quiz-1`, `quiz-2`, and `unit-test-50`):

- **`CompTIA A+` (`220-1101/1102`) & `CompTIA ITF+` (`FC0-U61`):** ESD grounded wrist straps, thermal regulation (`315–400°C`), DC power supply rails (`5V`/`9V`/`VBAT`), digital multimeter continuity auditing (`>= 10 Ω`), copper ampacity ($P = I^2 R$), Li-ion safety/recycling, and USB serial hardware triage (`COM3` / `ttyACM0`).
- **`RHCSA` (`Red Hat EX200`):** Linux kernel device enumeration (`lsusb`, `dmesg`, `/dev/ttyACM0`), POSIX character device permissions (`crw-rw----`), supplementary group membership (`usermod -aG dialout $USER`), and non-root telemetry daemon troubleshooting.
- **`CCNA` (`Cisco 200-301`) & `CompTIA Security+` (`SY0-701`):** Asynchronous serial framing (`115200 8N1`), shared `I2C` 7-bit addressing vs dedicated `UART`, ISM wireless bands (`2.4 GHz` ExpressLRS vs `5.8 GHz` VTX vs `900 MHz`), XOR/CRC error detection, firmware signature/checksum validation, and hardware failsafe threat mitigation.
- **`CIW JavaScript Specialist`, `IT Specialist: JavaScript` & `IT Specialist: HTML & CSS`:** Binary `Buffer` slicing and little-endian decoding (`readUInt16LE`), bitwise `& | ^ << >>` framing math, finite state machine closures, DOM telemetry warning tables, responsive CSS Grid dashboards, and `<canvas>` artificial-horizon HUD accessibility.

> **Up Next:** Walk through [`setup-guide.md`](./setup-guide.md) to verify your soldering station and Node 24 environment, tackle the three Red → Green labs in [`0-student_files/21-drone-build/`](../0-student_files/21-drone-build/) via `npm run grade -- --unit 21`, ship your end-to-end GCS + hardware audit capstone in [`unit-21-hands-on-drone-gcs`](../0-student_files/projects/unit-21-hands-on-drone-gcs/), and prove mastery on the >= 75%-cert-aligned [`unit-test-50.md`](./quizzes/unit-test-50.md)!

