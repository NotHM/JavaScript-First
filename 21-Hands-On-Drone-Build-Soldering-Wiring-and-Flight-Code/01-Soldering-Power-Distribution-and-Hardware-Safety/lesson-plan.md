# Lesson Plan 21.1: Drone Bench Soldering, Power Distribution & Hardware Safety

**Unit:** Unit 21 | **Duration:** 3 Class Periods × 50 min (Day 2–4)  
**Standards:** ADE CTE `1.0, 4.0, 11.0, 12.0` · CTE Drone Hardware Safety · **`CompTIA A+` (`220-1101/1102`) & `CompTIA ITF+`**

---

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`SG-U21-1` | `[L2–L4]` | `CompTIA A+, CTE 4.0`):** **S** — Tin and solder XT60 + `1000 µF` capacitor + practice UART pads cleanly under Props-OFF ESD/PPE protocols AND complete [`solderAndPowerLab.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.mjs); **M** — Pass 100% of `solderAndPowerLab.test.mjs` + instructor DMM continuity (`>= 10 Ω`) & smoke-stopper checkoff; **A** — Guided by `droneHardwareSafetyDemo.mjs` and practice perfboards; **R** — Prevents shorted ESC MOSFETs and brownouts; **T** — Verified by Day 4.
- [ ] **Teacher Objective (`TG-U21-2`, `TG-U21-3` | `[L1–L5]` | Lab Safety & Skill Gate):** **S** — Model dual-temperature solder profiles (`385°C` XT60 vs `325°C` UART) on perfboards first and enforce 100% DMM continuity + inline smoke-stopper gates before live battery power; **M** — `0` blown ESCs/FCs across build teams and `>= 85%` passing [`post-lesson-eval.md`](./post-lesson-eval.md); **A** — With shared smoke stoppers and practice boards; **R** — Ensures OSHA/CompTIA A+ electronics safety; **T** — Signed off prior to Day 5 wiring.

---

## Bloom's Objective Ladder
- **L1 Remember:** Recall Props-OFF, ESD strap, ANSI Z87.1 glasses, fume extractor, capacitor `-` GND stripe, and `>= 10 Ω` continuity threshold.
- **L2 Understand:** Explain thermal mass differences (`12 AWG` XT60 vs `28 AWG` UART), cold joints vs bridges vs lifted pads, and why `1000 µF` low-ESR caps damp ESC active-braking spikes.
- **L3 Apply:** Solder clean concave shiny joints on perfboards & ESCs; compute $V_{\text{drop}} = I R$ and $P_{\text{loss}} = I^2 R$; implement `solderAndPowerLab.mjs`.
- **L4 Analyze:** Diagnose continuity shorts, solder bridges, matte cold joints, under-rated capacitor voltages, and wire gauge overheating.
- **L5 Evaluate:** Defend team bench sign-off decisions blocking unsafe builds (`GO/NO-GO` pre-power audit).

---

## 50-Minute Pacing & Teacher Answer Keys

- **Period 1 (Day 2):** Pre-Lesson 21.1 (4m), Props-OFF/ESD/Safety briefing + dual-temp thermal mass demo + practice perfboard tinning (`20m`), Perfboard wetting drills (`26m`).
- **Period 2 (Day 3):** Worksheet Part A & $I^2 R$ wire math (`12m`), Physical XT60 `12 AWG` + `1000 µF` low-ESR capacitor soldering (`25m`), DMM Continuity & Smoke-Stopper instructor sign-off (`13m`).
- **Period 3 (Day 4):** `droneHardwareSafetyDemo.mjs` walkthrough & [`solderAndPowerLab.mjs`](../../0-student_files/21-drone-build/solderAndPowerLab.mjs) coding (`30m`), Part C/D forensics (`15m`), Post-Lesson 21.1 Exit Ticket (`5m`).

### Pre-Lesson 21.1 Key
1. **All four propellers (`Props-OFF`)**.
2. **`12 AWG` XT60 lead** requires `375–400°C` + wide chisel tip because thick copper sinks heat rapidly; holding excess heat on tiny `28 AWG` FC pads delaminates the FR4 PCB copper trace.
3. **`GND` (`-` negative terminal)**.
4. **Dead short circuit (`VBAT` tied to `GND`)** — **STOP**, do NOT connect battery/smoke stopper; inspect under magnification and clear bridges with flux + copper desoldering braid.

### Worksheet Part A & C Key
- **Part A Wire Math (`0.4 m` round-trip @ `50 A`):**
  - `18 AWG`: $R = 0.4 \times 0.02095 = \mathbf{0.00838\ \Omega}$; $V_{\text{drop}} = \mathbf{0.419\text{ V}}$; $P_{\text{loss}} = 50^2 \times 0.00838 = \mathbf{20.95\text{ W}}$.
  - `12 AWG`: $R = 0.4 \times 0.00521 = \mathbf{0.002084\ \Omega}$; $V_{\text{drop}} = \mathbf{0.104\text{ V}}$; $P_{\text{loss}} = \mathbf{5.21\text{ W}}$.
- **Part C Forensics:**
  1. Solder bridge across `VBAT`/`GND` -> connecting a LiPo discharges massive fault current melting traces/MOSFETs -> clear with **rosin flux + copper desoldering wick braid**.
  2. **Cold joint** = insufficient heat / oxidized tip / moved wire (fix: add flux + reflow until mirror shiny). **Lifted pad** = excessive dwell time/temp melting PCB epoxy (prevent w/ `<= 340°C` & `< 3 s` + strain relief; recover via alternate UART pad).
  3. `99% IPA` removes conductive/corrosive flux residues; a `6S` LiPo hits `25.2 V` charged (`+30V` inductive spikes), blowing an under-rated `25V` capacitor -> requires `35V–50V` (`1.4x–2x` margin).

### Post-Lesson 21.1 Key
1. **Cold joint:** matte/cracked (flux + reflow); **Solder bridge:** unintended pin short (flux + copper wick braid); **Lifted pad:** torn copper foil (`<= 340°C` / short dwell + strain relief).
2. `0.5 m @ 40 A`: **`18 AWG`:** $R = 0.010475\ \Omega$, $V_{\text{drop}} = \mathbf{0.419\text{ V}}$, $P_{\text{loss}} = \mathbf{16.76\text{ W}}$. **`12 AWG`:** $R = 0.002605\ \Omega$, $V_{\text{drop}} = \mathbf{0.104\text{ V}}$, $P_{\text{loss}} = \mathbf{4.17\text{ W}}$.
3. Absorbs active-braking regenerative ESC voltage spikes protecting `5V` BEC; `16V` capacitor ruptures/vents explosively on `25.2V` `6S` packs!
4. **Without smoke stopper:** dead short dumps dozens/hundreds of Amps directly from LiPo, exploding ESC FETs/traces. **With smoke stopper (`<= 1 A`):** current limiter trips immediately, alerting the builder harmlessly with zero toasted silicone/MOSFETs.
5. **`NO-GO`!** Even though resistance >= 10 Ω, a matte cold joint fails mechanically under flight vibration and creates intermittent resistance spikes; reflow with fresh flux first!
