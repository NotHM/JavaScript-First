# Unit 21 Project Rubric: Hands-On Drone Build, Wiring & Ground Control Capstone

**Course:** JavaScript First (`CTE/CIS 202` — High School Grades 11–12 CTE & Community College)  
**Assessment File:** [`unit-project.md`](./unit-project.md) · **Grader Command:** `npm run grade -- --unit 21`

---

## Grading Breakdown (`100` Total Points — Hands-On + Code)

| Domain | Exemplary (`90–100%`) | Proficient (`80–89%`) | Developing (`65–79%`) | Incomplete (`< 65%`) | Weight |
|---|---|---|---|---|---|
| **Soldering Quality & Bench Safety (`L3–L4`)** *(Props-Off, XT60/Cap, DMM, Smoke Stopper)* | Shiny concave fillets across XT60, capacitor (`GND` stripe verified) & UART pads; IPA-cleaned; DMM `>=10 Ω` + smoke stopper signed off cleanly with props OFF | Solid conductive joints with minor cosmetic flux residue; DMM & smoke stopper passed cleanly before direct power | Matte/cold joints requiring reflow OR missed flux clean; zero shorts before power-on | Lifted PCB pads, reversed cap polarity, active bridge/short, or unsafe `Props-ON` bench power | **25 pts** |
| **Stack Wiring & Bus Integrity (`L3–L4`)** *(UART `TX↔RX`, I2C, BEC, VTX)* | Clean strain-relieved harness; verified UART `TX↔RX` crossings, non-conflicting I2C addresses, `5V` BEC protection & VTX antenna pre-mounted | Functional stack wiring with minor cable routing clutter; passes all Configurator port/sensor checks | Initial wiring swap (`TX→TX`) diagnosed and corrected during troubleshooting | Overvolted `VBAT` into `5V` rail, VTX powered un-terminated, or unverified pinouts | **20 pts** |
| **Node.js `MSP` Codec & Lab TDD (`L3–L5`)** *(`npm run grade -- --unit 21`)* | `100%` passing automated tests across all `21-drone-build` labs + `capstone.test.mjs`; zero `Buffer` off-by-one/XOR faults | Passes `>= 90%` of Unit 21 tests cleanly; clean handling of corrupt/short MSP frames | Passes `75–89%` of automated tests; struggles on checksum slicing or negative voltage drop cases | `< 75%` passing tests, syntax errors, or crashes on malformed serial frames | **30 pts** |
| **GCS Pre-Arm State Machine & FAA Gate (`L5–L6`)** | Full `DISARMED → PREARM_CHECK → ARMED / FAILSAFE_RTH` transitions + accurate `>250 g` Remote ID, `TRUST` vs `Part 107`, & `LAANC` checks | Valid pre-arm gating and FAA rules; minor edge bug on RSSI brownout or commercial ceiling transition | Incomplete failsafe transition logic or conflates hobby `TRUST` vs commercial `Part 107` | Missing safety state guards allowing unsafe launch under low battery or dead radio link | **15 pts** |
| **Documentation, Pinout & Showcase (`Prof. Skills 1.0–9.0`)** | Clear FC wiring table, clean Git history, concise live telemetry/props-off motor checkoff demo, & complete external FAA credential plan | Clear README pinout & successful live showcase demo | Partial pinout table or rushed explanation of wiring choices | Missing schematic docs or unprepared for team defense | **10 pts** |

---

## Mastery Threshold & CTE Sign-Off
- **Proficient Mastery:** `>= 80 / 100` AND **100% Props-Off / Continuity / Smoke-Stopper Gate Pass**.
- **Instructor Verification Notes:** Teams sharing physical hardware kits rotate soldering pads (`XT60` vs `ESC` vs `UART` pads) so every student demonstrates physical solder & continuity competence independently alongside their personal Git/Node TDD submission.
