# Unit 21 Guide: Hands-On Drone Build — Soldering, Wiring, Flight Programming & FAA Resources

**Course:** JavaScript First — High School CTE (Grades 11–12) & Community College Dual-Enrollment (`CTE/CIS 202` · Year 2 Semester 4)  
**Pacing & Weight:** Culminating Semester 4 Hardware & Telemetry Capstone (**85 Hours** / **12 Class Days × 50 min** in 18-Week compression, or extended 6-week physical build lab sprint)  
**Primary External References:** [FAA TRUST](https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates) · [FAADroneZone](https://faadronezone.faa.gov/) · [FAA Part 107 Study Guide (`FAA-G-8082-22`)](https://www.faa.gov/regulations_policies/handbooks_manuals/aviation) · [`14 CFR Part 107 / Part 89` (`eCFR`)](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107) · [Betaflight Docs](https://betaflight.com/docs/) · [ExpressLRS Docs](https://www.expresslrs.org/)  
**Setup Checklist & Grader:** [`setup-guide.md`](./setup-guide.md) · **50-Q Mastery Exam (`>= 75%` Cert-Aligned):** [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) ([Answer Key](./quizzes/unit-test-50-answer-key.md) · [Kahoot CSV](./quizzes/unit-test-50-kahoot.csv)) · **Grader:** `npm run grade -- --unit 21`

---

## 1. Unit Overview

Unit 21 serves as the **culminating hands-on engineering centerpiece of the final semester (`CTE/CIS 202`)**, uniting physical electronics fabrication, embedded bus wiring, JavaScript Ground Control Station (`GCS`) protocol programming, and focused FAA certification readiness:

- **~75%–80% Build & Programming Focus:** Safe bench ergonomics (`ESD`, fume extraction, **Props-OFF mandate**), alloy thermal profiling (`315–400°C`), XT60 + `1000 µF` capacitor power distribution soldering, wire gauge ampacity ($I^2 R$), multimeter short-circuit auditing, inline **smoke-stopper verification**, flight stack wiring (`4-in-1 ESC`, `STM32 FC`, crossed **UART `TX ↔ RX`**, shared **I2C hex bus**, **`DShot300/600`**, `5V`/`9V` BEC isolation, VTX antenna rules), **Node.js `Buffer` MSP binary frame encoding/decoding** (`$M<`/`$M>`, XOR checksums), and a **software pre-arm safety state machine** (`DISARMED → PREARM_CHECK → ARMED / FAILSAFE`). Pair directly with custom **3D-printed TPU/PETG canopy and mount parts engineered in Unit 20!**
- **~20%–25% Concise Legal & FAA Cert Readiness:** High-level statutory rules (`FAA TRUST` recreational vs. `Part 107 UAG` commercial, `>= 250 g` registration, `14 CFR Part 89` Remote ID, `< 55 lbs`, `<= 400 ft AGL`, `B/C/D/E` LAANC airspace, `3 SM / 500 ft` VFR, `§107.9` 10-day reporting) backed by curated **external FAA registration, study guide, `IACRA`, and `B4UFLY` portals** so students transition smoothly to official FAA credential testing.

---

## 2. CTE Standards, Industry Certifications & External FAA Resource Alignment

| Standard / Certification Exam | Official Indicators & Objectives Covered | Unit 21 Artifacts |
|---|---|---|
| **ADE/CTE Software & App Design (`11.0202.00`)** (`Stds 1.0, 4.0, 8.0, 12.0, 18.0, 19.0`) | Hardware-software interfaces, binary framing math, defensive boundary checks, async telemetry, automated `node:test` QA | All 3 lesson `code/` demos + `0-student_files/21-drone-build/` labs |
| **CTE Drone / sUAS Technology (`49.0199.00`)** + **`FAA Part 107 / TRUST / Part 89`** | Props-off safety, soldering/PDB/ESC wiring, LiPo & Ohm's Law, UART/CRSF/DShot, `<55 lb / 400 ft`, `>250 g` Remote ID, `§107.9`, `LAANC`, external FAA portals | Lessons `21.1–21.3`, `faaComplianceLab.mjs`, Unit 21 Drone Build Project |
| **CompTIA `A+` (`220-1101/1102`) & `ITF+` (`FC0-U61`)** | ESD safety, chemical/Li-ion disposal, multimeters, DC rails/PSU wattage, binary/hex bytes, serial USB troubleshooting | Lesson `21.1`, `solderAndPowerLab.mjs`, Quizzes (`>= 75%` cert pool) |
| **`RHCSA` (`EX200`) & `CCNA` (`200-301`)** | Linux `/dev/ttyACM*`, `dialout` POSIX groups, `lsusb`/`chmod`, serial UART baud/parity/XOR integrity, `2.4/5.8 GHz / 900 MHz` RF bands | Lesson `21.2`, `setup-guide.md`, Mastery Exam |
| **`CIW-JS`, `ITS-JS` & `CompTIA Security+`** | Node `Buffer`, bitwise `& \| ^ << >>`, async state machine transitions, failsafe input validation, firmware/RF safety controls | `wiringAndMspLab.mjs`, `unit-21-hands-on-drone-gcs/`, Mastery Exam |

---

## 3. Trackable Student SMART Goals (Unit 21)

Check off each objective (`[x]`) once verified by bench multimeter checkoff, automated `node --test` pass, or live GCS/props-off demonstration:

- [ ] **S-Goal 1 (`SG-U21-1` | `[L2–L3]` | `CompTIA A+, CTE 4.0, Drone`):** **S** — Complete a solder & power bus audit verifying thermal profiles (`315–400°C`), `12–14 AWG` XT60 wire ampacity ($I^2R$ loss), `>= 10 Ω` continuity check, `1000 µF` capacitor polarity, and inline smoke-stopper clearance in [`solderAndPowerLab.mjs`](../0-student_files/21-drone-build/solderAndPowerLab.mjs); **M** — Pass 100% of `solderAndPowerLab.test.mjs` assertions plus zero physical continuity shorts on bench inspection; **A** — Guided by `droneHardwareSafetyDemo.mjs` and [`setup-guide.md`](./setup-guide.md); **R** — Prevents blown ESC MOSFETs and LiPo shorts during physical assembly; **T** — Completed by end of Lesson `21.1` (Day 4).
- [ ] **S-Goal 2 (`SG-U21-2` | `[L3 Apply -> L4 Analyze]` | `CompTIA A+, RHCSA, CCNA`):** **S** — Design and audit a collision-free STM32 Flight Controller wiring map (crossed UART `TX ↔ RX`, shared I2C address table, `5V/9V` BEC isolation, VTX antenna gate, DShot motors) inside [`wiringAndMspLab.mjs`](../0-student_files/21-drone-build/wiringAndMspLab.mjs); **M** — Detect 100% of injected `TX-TX`, duplicate UART, `I2C` hex collision, and over-voltage `VBAT` faults in `wiringAndMspLab.test.mjs`; **A** — Using Lesson `21.2` schematics and wiring harness templates; **R** — Eliminates silent telemetry failures and fried receivers; **T** — Verified by Day 6.
- [ ] **S-Goal 3 (`SG-U21-3` | `[L3 Apply -> L4 Analyze]` | `CIW-JS, ITS-JS`):** **S** — Encode and decode binary MultiWii Serial Protocol (`$M<` / `$M>`) telemetry frames using Node `Buffer` and bitwise XOR (`^`) checksums, plus implement the 4-state `DISARMED → PREARM_CHECK → ARMED / FAILSAFE` controller; **M** — Achieve `100%` passing assertions across valid/corrupt/oversized MSP packets in `wiringAndMspLab.test.mjs`; **A** — Building from [`fcWiringAndMspDemo.mjs`](./02-Flight-Controller-Wiring-UART-Protocols-and-JS-Telemetry/code/fcWiringAndMspDemo.mjs); **R** — Demonstrates low-level binary serial programming identical to production Betaflight/MAVLink tools; **T** — Completed by end of Lesson `21.2` (Day 8).
- [ ] **S-Goal 4 (`SG-U21-4` | `[L1–L5]` | `FAA TRUST / Part 107 / Part 89`):** **S** — Synthesize top-level federal UAS rules (`TRUST` vs. `Part 107 UAG`, `> 250 g` registration & Remote ID, `< 55 lbs`, `<= 400 ft AGL`, `LAANC`, `§107.9`) and navigate official external FAA study/registration portals in [`faaComplianceLab.mjs`](../0-student_files/21-drone-build/faaComplianceLab.mjs); **M** — Pass 100% of `faaComplianceLab.test.mjs` dispatch tests and earn `>= 80%` on Lesson `21.3` exit check (or print optional FAA `TRUST` certificate); **A** — Using `faaCertResourcesAndCheckDemo.mjs` and the [`setup-guide.md`](./setup-guide.md) FAA portal directory; **R** — Keeps every student programmer legally compliant on test fields and launch-ready for `Part 107` certification; **T** — Completed by Day 10.
- [ ] **S-Goal 5 (`SG-U21-5` | `[L6 Create]` | Capstone Hardware & GCS Integration):** **S** — Integrate a Unit 20 3D-printed mount/canopy (or lab frame), soldered power stack, props-off Betaflight/ELRS bench configuration, and working JavaScript Ground Control Station (`0-student_files/projects/unit-21-hands-on-drone-gcs/`) passing smoke-stopper + `capstone.test.mjs`; **M** — Earn `100%` pass on `npm run grade -- --unit 21` and `>= 80/100` on [`projects/project-rubric.md`](./projects/project-rubric.md); **A** — Supported by team pair-soldering stations and offline serial mock adapters; **R** — Delivers a portfolio-ready full-stack hardware+JS aerospace project for college dual-credit & employer interviews; **T** — Demonstrated live on Showcase Day 12.
- [ ] **S-Goal 6 (`SG-U21-6` | `[L1–L5]` | Industry Certification Readiness):** **S** — Achieve `>= 75%` on the summative [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md) exam covering `CompTIA A+/ITF+/Sec+`, `RHCSA`, `CCNA`, `CIW-JS`, `ITS-JS`, and Drone Hardware/FAA essentials; **M** — Score `>= 38/50` independently without answer keys; **A** — Reinforced through Quiz 1, Quiz 2, and hands-on CLI/bench labs; **R** — Translates capstone hands-on engineering directly into stackable industry credentials; **T** — Completed on Day 12.

---

## 4. Trackable Teacher SMART Goals (Unit 21)

- [ ] **T-Goal 1 (`TG-U21-1` | Baseline & Normalized Gain — Hake's $g$):** **S** — Administer [`pre-unit-eval.md`](./evaluations/pre-unit-eval.md) on Day 1 and [`post-unit-eval.md`](./evaluations/post-unit-eval.md) on Day 12 measuring hardware safety, UART/MSP coding, and FAA knowledge gains; **M** — Document class normalized gain $g \ge 0.60$ using [`eval-answer-key.md`](./evaluations/eval-answer-key.md); **A** — Scored cleanly via standardized answer keys; **R** — Quantifies instructional effectiveness across High School CTE & Community College outcomes; **T** — Recorded within 48 hours of Unit 21 completion.
- [ ] **T-Goal 2 (`TG-U21-2` | 100% Smoke-Stopper & Props-Off Bench Gate Enforcement):** **S** — Personally sign off every student bench build on continuity resistance (`>= 10 Ω`), XT60/cap polarity, and inline smoke-stopper boot before direct battery power or USB telemetry testing; **M** — `0` electrical/MOSFET shorts from skipped safety gates and `100%` documented bench sign-off across all build teams; **A** — Using printed bench safety checklists and instructor DMM spot checks; **R** — Protects students, school equipment, and LiPo facility safety per CompTIA A+ & OSHA standards; **T** — Enforced continuously Days 2–12.
- [ ] **T-Goal 3 (`TG-U21-3` | Soldering Skill Differentiation & Coaching):** **S** — Model dual-temperature solder technique (`385°C` XT60/ESC vs. `325°C` FC UART pads) on practice perfboards before touching live STM32 hardware; **M** — `100%` of students demonstrate shiny concave fillet wetting on practice pads with zero lifted pads prior to stack soldering; **A** — Using inexpensive $2 practice solder boards and flux pens; **R** — Eliminates hardware attrition and student anxiety during high-stakes soldering; **T** — Completed by close of Day 3.
- [ ] **T-Goal 4 (`TG-U21-4` | Zero-Hardware CI Parity for Coding & Grading):** **S** — Maintain deterministic Node 24 serial/MSP simulators (`node:test`) alongside optional physical USB `/dev/ttyACM0` hooks so coding assessments run regardless of hardware kit sharing; **M** — `100%` of students execute `npm run grade -- --unit 21` cleanly on lab laptops in `< 2 s`; **A** — Via clean dependency-injected test suites in `0-student_files/21-drone-build/`; **R** — Ensures lab hardware ratio (`2–4` students per drone kit) never stalls programming proficiency; **T** — Verified on Day 1 before instruction begins.
- [ ] **T-Goal 5 (`TG-U21-5` | Formative Quiz Triage & 75%+ Cert Alignment Check):** **S** — Run Kahoot Quiz 1 (`Day 5`) and Quiz 2 (`Day 9`) highlighting overlapped `CompTIA A+/Sec+`, `RHCSA`, `CCNA`, and `CIW-JS`/`ITS-JS` objectives; **M** — Reteach any item under `75%` class accuracy (typically UART `TX↔RX` crossing, MSP checksum index bounds, `dialout` POSIX groups, or `> 250 g` Remote ID vs. Part 107 rules); **A** — Using 5-minute whiteboard packet/pinout traces; **R** — Directly prepares learners for both capstone showcase and external IT/FAA exams; **T** — Executed same period as each quiz.
- [ ] **T-Goal 6 (`TG-U21-6` | External FAA & College Portfolio Articulation Showcase):** **S** — Guide students to bookmark official FAA portals (`TRUST`, `FAADroneZone`, `FAA-G-8082-22`, `IACRA`, `B4UFLY`) and bundle Unit 20 `.stl` CAD mounts + Unit 21 wiring schematic + GCS code into their college/employer capstone repository; **M** — `100%` of teams complete Unit 21 Showcase Demo + verified Git portfolio artifact (`capstone.test.mjs` GREEN); **A** — Structured into Day 11–12 showcase checklist; **R** — Bridges Grades 11–12 CTE directly to Community College CIS transfer credit and UAV/embedded technician careers; **T** — Logged on Day 12 Showcase.

---

## 5. Bloom's Taxonomy Progression Matrix (`L1 → L6`)

| Bloom's Tier | Focus in Unit 21 | Evidence & Assessments |
|---|---|---|
| **L1 — Remember** | Recall ESD/props-off rules, eutectic `63/37` vs `SAC305`, `UART TX↔RX`, `I2C SDA/SCL`, `DShot`, MSP header `$M<`, `> 250 g` registration, `< 55 lbs / 400 ft AGL`, `§107.9` | [`pre-unit-eval.md`](./evaluations/pre-unit-eval.md), Quiz 1 |
| **L2 — Understand** | Contrast wire ampacity (`12 AWG` vs `28 AWG`), why `TX↔RX` crosses while `I2C` shares hex IDs, inline smoke stopper behavior, `TRUST` vs `Part 107 UAG` | Lesson worksheets Part A, Slides `21.1–21.3` |
| **L3 — Apply** | Solder XT60/cap/UART joints safely; compute $I^2R$ drops; wire FC stack; encode/decode binary MSP frames (`Buffer`, XOR `^`); evaluate FAA preflight rules | `0-student_files/21-drone-build/*.mjs` |
| **L4 — Analyze** | Diagnose continuity shorts, cold/bridged joints, `TX-TX` hangs, duplicate `I2C` addresses, inverted capacitor polarity, corrupted MSP checksums, `/dev/ttyACM0` permissions | Lab Part C Forensics, Quiz 2 |
| **L5 — Evaluate** | Justify wire gauge & BEC selection under burst loads; adjudicate Part 107 GO/NO-GO + Remote ID compliance; critique `DISARM → PREARM → ARM` failsafes | Lesson Part D Critiques, [`post-unit-eval.md`](./evaluations/post-unit-eval.md) |
| **L6 — Create** | Assemble, smoke-test, wire, and configure a physical/3D-mounted drone stack paired with an end-to-end tested **Node.js Ground Control Station & Compliance CLI** | **Unit 21 Capstone** (`unit-21-hands-on-drone-gcs/`) |

---

## 6. Day-by-Day Pacing Calendar (12 Days × 50 Minutes)

| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 1** | Unit Diagnostic + Lab Safety (`ESD`, Props-OFF, LiPo chemistry) + Practice Perfboard Tinnning | **Pre-Unit Eval**, **Pre-Lesson 21.1**, Practice Solder Pads |
| **Day 2** | Thermal Profiling (`315–400°C`), Alloy Wetting, Flux & Desoldering Braid + Lesson 21.1 Slides | Practice XT60 + Pad Continuity Drills |
| **Day 3** | Physical Power Distribution Soldering: XT60 `12 AWG`, `1000 µF` Low-ESR Cap, 4-in-1 ESC Pads | **Multimeter Continuity Sign-Off + Smoke-Stopper Gate** |
| **Day 4** | Ohm's Law Wire Drop & `solderAndPowerLab.mjs` Automation (`node --test`) | `solderAndPowerLab.test.mjs`, **Post-Lesson 21.1** |
| **Day 5** | Kahoot Quiz 1 + Lesson 21.2 Hardware Stack Wiring (`UART TX↔RX`, `I2C`, `DShot`, BEC, VTX antenna) | **Kahoot Quiz 1**, **Pre-Lesson 21.2**, Live Wiring Map |
| **Day 6** | Physical FC Stack Assembly (with Unit 20 3D-printed TPU/PETG canopy) + Linux `/dev/ttyACM*` (`dialout`) | **FC Stack Wiring Checkoff**, Configurator Props-Off Spin |
| **Day 7** | Binary **MSP (`$M<` / `$M>`)** `Buffer` Framing, XOR Checksums & `fcWiringAndMspDemo.test.mjs` | `wiringAndMspLab.mjs` Frame Codec |
| **Day 8** | Ground Control State Machine (`DISARMED → PREARM → ARMED / FAILSAFE`) & Debugging Bugs | `wiringAndMspLab.test.mjs`, **Post-Lesson 21.2** |
| **Day 9** | Kahoot Quiz 2 + Lesson 21.3 Top-Level FAA Regs (`TRUST` vs `Part 107`, `>250g` Remote ID, `B–G`/LAANC) | **Kahoot Quiz 2**, **Pre-Lesson 21.3**, External FAA Bookmarks |
| **Day 10** | Practical Compliance Coding (`faaComplianceLab.mjs`) + Optional FAA `TRUST` Exam Completion | `faaComplianceLab.test.mjs`, **Post-Lesson 21.3** |
| **Day 11** | Unit 21 Capstone Integration (`0-student_files/projects/unit-21-hands-on-drone-gcs/`) & Props-Off Telemetry Demo | Capstone `capstone.test.mjs` GREEN + Bench Rehearsal |
| **Day 12** | **Hands-On Drone Hardware + GCS Live Showcase**, Summative Proof & Certification Readiness | **Unit 21 Capstone Defense**, **Post-Unit Eval**, **50-Q Exam** |
