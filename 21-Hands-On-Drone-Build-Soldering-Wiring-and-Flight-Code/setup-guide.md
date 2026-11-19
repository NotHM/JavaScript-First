# Unit 21 Setup Guide: Soldering Bench, Flight Controller Wiring, Node Serial/GCS & External FAA Resources

**Unit Focus:** ESD & Soldering Station Safety, Multimeter Continuity & Smoke-Stopper Gate, UART/I2C/DShot Flight Stack Wiring, Linux Serial Permissions, Node 24 Binary `MSP` Ground Control Programming, & External FAA Cert Portals  
**Zero-Hardware CI Guarantee:** All automated labs and `npm run grade -- --unit 21` run **100% deterministically in Node 24** with zero live drone, soldering station, or USB flight controller required—while providing exact workstation setup steps for real hardware labs.

---

## 1. Baseline Node 24 Verification & Reference Suites

Confirm Node 24 (`v24+`) and run all three Unit 21 instructor reference test suites:

```bash
node -v
node --test 21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/01-Soldering-Power-Distribution-and-Hardware-Safety/code/droneHardwareSafetyDemo.test.mjs
node --test 21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/02-Flight-Controller-Wiring-UART-Protocols-and-JS-Telemetry/code/fcWiringAndMspDemo.test.mjs
node --test 21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/03-FAA-Regulations-Overview-External-Cert-Resources-and-Bench-Test/code/faaCertResourcesAndCheckDemo.test.mjs
```

Expected output: **100% passing zero-dependency tests** covering ampacity/voltage drop math, continuity/smoke-stopper gates, UART TX↔RX conflict detection, binary MSP `$M<` encoding/decoding, pre-arm GCS state transitions, and Part 107 / Remote ID / registration gating.

---

## 2. Physical Soldering & Electrical Safety Station Checklist (`CompTIA A+ / CTE`)

Before heating a soldering iron in lab:

1. **Workspace & Personal Protective Equipment (PPE):**
   - Clear flammable LiPo packs from the immediate soldering surface; clip **ESD grounding strap** to grounded mat (when handling exposed FC STM32 pins).
   - Wear **ANSI Z87.1 safety glasses** and turn on **carbon-filter fume extraction** `10–15 cm` from your joint.
   - **Rule #1 (`Props-Off`):** Zero propellers installed anywhere near a bench quadcopter during wiring, flashing, or USB connection.
2. **Temperature & Tip Pairing:**
   - **Signal / UART / `5V` Pads (`26–30 AWG`):** `315°C – 340°C` (`600–645°F`), fine bevel or small chisel tip (`<= 3 s` dwell time to avoid lifting PCB pads!).
   - **XT60 / ESC Main `VBAT/GND` (`12–14 AWG`) + `1000 µF` Low-ESR Capacitor:** `375°C – 400°C` (`700–750°F`), wide chisel tip (`D24/BC3`) + **no-clean rosin flux pen**.
   - Pre-tin wire strands AND pad cleanly before joining; check joints under light for concave, mirror-shiny wetting (**no dull cold joints, no bridging wisps**). Clean flux residue with `99%` isopropyl alcohol (`IPA`).
3. **Mandatory Pre-Battery Power-On Sequence:**
   - **Step A (Multimeter Continuity Test):** Switch DMM to resistance/continuity. Probe `XT60 +` to `XT60 -`. Verify **no continuous short (`>= 10 Ω` / rising cap charge reading)** before touching any power supply.
   - **Step B (Smoke Stopper Current Gate):** Plug a `1S–6S` inline **smoke stopper** (set `<= 1.0 A` trip limit) between the bench PSU/LiPo and the quadcopter `XT60`. Confirm normal startup tones/LEDs with zero trip before direct LiPo connection.

---

## 3. Linux Serial Permissions, Configurator Tools & USB Bench Setup (`RHCSA`)

When plugging an `STM32` flight controller via USB-C/Micro-USB on Debian/Ubuntu/Fedora lab machines:

```bash
# Inspect enumerated flight controller USB serial device (/dev/ttyACM0 or /dev/ttyUSB0)
lsusb
dmesg | tail -n 15
ls -l /dev/ttyACM* /dev/ttyUSB* 2>/dev/null || echo "No FC connected (offline sim active)"

# Grant non-root student access via POSIX dialout group (RHCSA / Linux Admin)
# On Ubuntu/Debian: sudo usermod -aG dialout $USER && newgrp dialout
id -nG | grep -E "dialout|uucp" || echo "Add user to dialout/uucp for live hardware serial access"
```

> **VM / Sandbox Note:** Do not run `sudo` inside cloud sandbox VMs (`npm run grade` operates cleanly without physical serial hardware). Apply `usermod -aG dialout` only on physical lab Linux workstations.

### Optional Live Hardware Software Stack
- **Betaflight Configurator:** `https://app.betaflight.com/` (flash FC firmware, verify `Ports` tab UART assignment, `Motors` tab prop-off spin direction).
- **ExpressLRS Configurator:** `https://www.expresslrs.org/` (bind phrase setup, packet rate `250Hz`/`500Hz`, `Model Match`).
- **ArduPilot / PX4 Ground Control:** **Mission Planner** / **QGroundControl** (`MAVLink` USB/UDP bridges alongside our Node `MSP`/`CRSF` CLI).

---

## 4. Official External FAA Drone Cert & Hardware Build Resource Index

Teachers and students preparing for official FAA exams or hardware builds can open these curated external portals directly:

| Credential / Topic | Official Resource & URL | When to Use |
|---|---|---|
| **FAA `TRUST` Certificate** *(Free Hobby Card)* | [`faa.gov/uas/recreational_flyers`](https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates) | All recreational & introductory school flyers (`~20 min` online, zero failure penalty) |
| **FAA Part 107 Study Guide** (`FAA-G-8082-22`) | [`faa.gov/regulations_policies/handbooks_manuals/aviation`](https://www.faa.gov/regulations_policies/handbooks_manuals/aviation) | Commercial Remote Pilot UAG exam prep (`airspace`, `METAR`, loading, regs) |
| **Part 107 ACS** (`FAA-S-ACS-10B`) | [`faa.gov/training_testing/testing/acs`](https://www.faa.gov/training_testing/testing/acs) | Exact UAG testable knowledge codes (`UA.I`–`UA.V`) |
| **FAADroneZone Portal** | [`faadronezone.faa.gov`](https://faadronezone.faa.gov/) | Drone registration (`$5` / 3 yrs), Remote ID serial entry, airspace waivers |
| **IACRA Pilot Portal** | [`iacra.faa.gov`](https://iacra.faa.gov/) | Obtain FTN and apply for Part 107 Remote Pilot Certificate after PSI test |
| **eCFR `14 CFR Part 107` & `Part 89`** | [`ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107`](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107) | Legal definitions (`< 55 lbs`, `§107.9` `10`-day report, `§107.51` VFR, Remote ID) |
| **B4UFLY & LAANC Airspace** | [`faa.gov/uas/getting_started/b4ufly`](https://www.faa.gov/uas/getting_started/b4ufly) | Live airspace facility grids & automated LAANC ceiling authorization |
| **NOAA `METAR`/`TAF` & Charts** | [`aviationweather.gov`](https://aviationweather.gov/) · [`skyvector.com`](https://skyvector.com/) | Real-time airport surface obs (`SM` / clouds) and VFR Sectional Charts |
| **Quadcopter Soldering & Wiring** | [`oscarliang.com/soldering-guide/`](https://oscarliang.com/soldering-guide/) · [`betaflight.com/docs`](https://betaflight.com/docs/) | Step-by-step FC pad maps, ESC capacitors, UART wiring & filter tuning |

---

## 5. Automated Student TDD Verification (`node:test`)

Verify syntax and execute your Red → Green hardware/protocol/FAA suites via:

```bash
node --check 0-student_files/21-drone-build/solderAndPowerLab.mjs
node --check 0-student_files/21-drone-build/wiringAndMspLab.mjs
node --check 0-student_files/21-drone-build/faaComplianceLab.mjs
node --check 0-student_files/projects/unit-21-hands-on-drone-gcs/index.mjs

npm run grade -- --unit 21
```

---

## 6. Common Bench & Protocol Error Triage

| Symptom / Error | Root Cause | Exact Fix |
|---|---|---|
| Dead silence from GPS or ExpressLRS receiver | Wired **`TX → TX` and `RX → RX`** instead of crossing UART lines | Swap signal wires at FC pad (`Device TX → FC RX`, `Device RX → FC TX`) |
| Continuity buzzer chirps steady `0.4 Ω` at XT60 | Bridged `+`/`-` MOSFET pin or stray solder ball across PDB | **Do NOT plug in LiPo!** Inspect w/ magnifier, apply flux + copper wick braid |
| `/dev/ttyACM0: Permission denied` on Linux | Student account missing POSIX `dialout` (or `uucp`) group | Run `sudo usermod -aG dialout $USER`, re-login, verify `ls -l /dev/ttyACM0` |
| `MSP` decoder fails `CHECKSUM_MISMATCH` | Included `$M<` header bytes inside XOR checksum or byte length off by 1 | Compute `len ^ cmdId ^ payload[0..N-1]` starting ONLY at byte index `3` |
| Burnt VTX video chip during bench config | Powered `9V/VBAT` Video Transmitter with **zero antenna connected** | Power VTX off via pit-mode switch or screw `5.8 GHz` antenna on FIRST! |
