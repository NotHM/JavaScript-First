# Unit 21 Student TDD Labs: Hands-On Drone Build, Wiring, MSP Code & FAA Compliance

> **BENCH RULE #1 (`PROPS-OFF`):** Remove ALL propellers from every quadcopter motor shaft before soldering, multimeter continuity probing, smoke-stopper testing, or plugging a USB cable into an STM32 flight controller!

This folder holds the **three automated `node:test` labs** paired with Unit 21 ([Setup Guide](../../21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/setup-guide.md)):

1. **`solderAndPowerLab.mjs`** ([`solderAndPowerLab.test.mjs`](./solderAndPowerLab.test.mjs)) — Thermal alloy profiling (`SAC305` vs `63/37_SnPb`), copper wire $I^2R$ loss (`AWG 10–30`), `1000 µF` capacitor voltage/polarity audit, and continuity/smoke-stopper gating.
2. **`wiringAndMspLab.mjs`** ([`wiringAndMspLab.test.mjs`](./wiringAndMspLab.test.mjs)) — STM32 flight controller bus auditor (`UART TX ↔ RX`, `I2C` 7-bit address collisions, `5V` overvoltage vs. `VBAT`, VTX antenna check), binary MultiWii Serial Protocol (`$M<` / `$M>`) `Buffer` codec + XOR checksum, `DShot` 16-bit encoder, and pre-arm state machine.
3. **`faaComplianceLab.mjs`** ([`faaComplianceLab.test.mjs`](./faaComplianceLab.test.mjs)) — Curated external FAA resource portal index (`TRUST`, `FAADroneZone`, `FAA-G-8082-22`, `IACRA`, `B4UFLY`, `eCFR`), `250 g` hobby vs. commercial Remote ID gate, preflight ruleset validator, and `14 CFR §107.9` 10-day accident reporting audit.

## Quick Commands

```bash
node --test 0-student_files/21-drone-build/solderAndPowerLab.test.mjs
node --test 0-student_files/21-drone-build/wiringAndMspLab.test.mjs
node --test 0-student_files/21-drone-build/faaComplianceLab.test.mjs

# Run all Unit 21 labs + Capstone together:
npm run grade -- --unit 21
```

## Curated External FAA & Hardware Reference Links
- **FAA TRUST (Free Hobby Knowledge Card):** <https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates>
- **FAADroneZone (Registration & Remote ID):** <https://faadronezone.faa.gov/>
- **FAA Part 107 Study Guide (`FAA-G-8082-22`):** <https://www.faa.gov/regulations_policies/handbooks_manuals/aviation>
- **IACRA Remote Pilot Certificate Portal:** <https://iacra.faa.gov/>
- **eCFR `14 CFR Part 107` & `Part 89`:** <https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107>
- **B4UFLY & LAANC Airspace Grids:** <https://www.faa.gov/uas/getting_started/b4ufly>
