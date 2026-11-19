# Lesson Plan 21.2: Flight Controller Wiring, UART/I2C & Binary MSP Telemetry

**Unit:** Unit 21 | **Duration:** 4 Class Periods × 50 min (Day 5–8)  
**Standards:** ADE CTE `4.0, 8.0, 17.0, 18.0` · **`CompTIA A+` · `RHCSA (EX200)` · `CCNA (200-301)` · `CIW-JS` · `ITS-JS`**

---

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`SG-U21-2`, `SG-U21-3` | `[L2–L5]` | `A+, RHCSA, CCNA, CIW-JS`):** **S** — Wire crossed UART/I2C/VTX buses accurately on bench hardware (using Unit 20 3D-printed TPU/PETG mounts) AND complete [`wiringAndMspLab.mjs`](../../0-student_files/21-drone-build/wiringAndMspLab.mjs); **M** — Pass 100% of `wiringAndMspLab.test.mjs` and instructor FC stack Configurator port check; **A** — Using `fcWiringAndMspDemo.mjs`; **R** — Unifies embedded bus debugging with low-level Node `Buffer` systems code; **T** — Completed by Day 8.
- [ ] **Teacher Objective (`TG-U21-4`, `TG-U21-5` | `[L2–L5]` | Linux Serial & Deterministic QA):** **S** — Verify `/dev/ttyACM0` (`dialout`) USB Configurator setup on shared lab rigs and guide binary XOR `$M<` trace drills prior to coding; **M** — `100%` of teams achieve passing `wiringAndMspLab.test.mjs` and `>= 80%` on [`post-lesson-eval.md`](./post-lesson-eval.md); **A** — With deterministic Node `Buffer` tests; **R** — Ensures coding rigor even when sharing physical drone stacks; **T** — Graded by close of Day 8.

---

## Bloom's Objective Ladder
- **L1 Remember:** Identify `$M<`/`$M>`/`$M!` MSP headers, `dialout` group, `UART TX↔RX`, `I2C` 7-bit addresses, `DShot` nibble CRC, and `5V/9V/VBAT` rails.
- **L2 Understand:** Explain directional UART vs addressed shared I2C, BEC isolation, VSWR un-terminated VTX burnout, and little-endian sensor encoding.
- **L3 Apply:** Build crossed FC wire harnesses; encode/decode `Buffer` MSP frames; implement the 4-state `DISARMED → PREARM_CHECK → ARMED / FAILSAFE_RTH` mixer.
- **L4 Analyze:** Diagnose `TX-TX` pins, duplicate UART/I2C collisions, checksum loop index `0` bugs, and overvolted `5V` rails.
- **L5 Evaluate:** Defend mandatory multi-gate `PREARM_CHECK` interlocks and link-loss `FAILSAFE_RTH` policies.

---

## 50-Minute Pacing & Teacher Answer Keys

- **Period 1 (Day 5):** Kahoot Quiz 1 (`12m`), Pre-Lesson 21.2 (`4m`), `UART TX↔RX`, `I2C`, `DShot` & BEC Voltage Rails (`20m`), Worksheet Part A & physical wire routing sketch (`14m`).
- **Period 2 (Day 6):** Physical FC Stack Wiring (`UART` + `I2C` + `VTX` antenna check + Unit 20 3D mount fitment) & Linux `/dev/ttyACM0` `dialout` / Betaflight Props-Off motor direction spin check (`50m`).
- **Period 3 (Day 7):** MSP v1 Binary Frame (`Buffer`, Little-Endian, XOR Checksum), `fcWiringAndMspDemo.mjs` trace (`25m`), start [`wiringAndMspLab.mjs`](../../0-student_files/21-drone-build/wiringAndMspLab.mjs) (`25m`).
- **Period 4 (Day 8):** Complete `wiringAndMspLab.mjs` + GCS Pre-Arm State Machine (`25m`), Part C/D Bug Forensics (`20m`), Post-Lesson 21.2 Exit Ticket (`5m`).

### Pre-Lesson 21.2 Key
1. GPS **`TX` -> FC `RX4`**; GPS **`RX` -> FC `TX4`**.
2. **UART** is point-to-point crossed (`TX↔RX`), one active device per port; **I2C** shares two lines (`SDA/SCL`) across many devices differentiated by **7-bit hex addresses**.
3. **`dialout`** (Debian/Ubuntu) or `uucp` (Arch/RHEL).
4. ASCII `$M>` (response FROM FC), payload length = **`2` bytes (`0x02`)**.

### Worksheet Part A & C Key
- **Part A:** `TX -> RX`, `RX -> TX`, `5V`; `SDA` & `SCL`, `7`-bit hex IDs; `antenna`; `$M<`/`$M>`, `Length (N)`, `Command ID`, `XOR Checksum`; `ls -l /dev/ttyACM*` + `id -nG`.
- **Part C:**
  1. Loop starts at `i = 0`, folding header `$M<` (`0x24 ^ 0x4D ^ 0x3C`) into XOR! MSP checksum computes bytes `3..len-2` ONLY (`for (let i = 3; i < frame.length - 1; i++)`). Check: `0x00 ^ 0x6E = 0x6E`!
  2. (a) **Port conflict:** GPS + ELRS share `UART2` simultaneously at incompatible baud/protocols; (b) **Pin conflict:** `ELRS TX -> FC TX2` breaks communication; (c) **Overvoltage burn:** `VBAT (16–25V)` tied to `5V` receiver instantly destroys receiver MCU!

### Post-Lesson 21.2 Key
1. (a) Instantly destroys `5V` ELRS MCU/LDO; (b) Reflected RF waves overheat/burn out the VTX RF power amplifier.
2. (a) Response **from** FC (`$M>`), (b) payload length = **`2`**, (c) cmd ID = **`108`** (`MSP_ATTITUDE`), (d) `CS = 0x02 ^ 0x6C ^ 0x64 ^ 0x00 = 0x0A` (`10` decimal).
3. Crossing failure (`TX4 -> GPS TX`, swap to `TX4 -> GPS RX` & `RX4 -> GPS TX`) + duplicate `I2C` address `0x76` causing `SDA` collisions (shift one sensor address jumper to `0x77` or detach duplicate barometer).
4. Starts XOR loop at `i = 0` including `$M<` bytes; change `let i = 0` -> **`let i = 3`**.
5. **`FAILSAFE_RTH`** — prevents uncontrollable ballistic drops from altitude by autonomously stabilizing/returning instead of immediately cutting all motor power mid-flight.
