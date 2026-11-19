# Lesson Plan 21.3: FAA Laws Overview, External Cert Resources & Compliance CLI

**Unit:** Unit 21 | **Duration:** 2 Class Periods × 50 min (Day 9–10)  
**Standards:** ADE `2.0, 4.0, 12.0, 19.0` · **FAA `TRUST` / `14 CFR Part 107 & Part 89`** · **`CIW-JS` · `ITS-JS`**

---

## Lesson SMART Objectives (Trackable)
- [ ] **Student Objective (`SG-U21-4` | `[L1–L5]` | `FAA TRUST / Part 107 / CIW-JS`):** **S** — Distinguish hobby vs. commercial FAA rules, index official external FAA portals, and pass [`faaComplianceLab.mjs`](../../0-student_files/21-drone-build/faaComplianceLab.mjs); **M** — Pass 100% of `faaComplianceLab.test.mjs` and score `>= 80%` on [`post-lesson-eval.md`](./post-lesson-eval.md) (or complete free online `TRUST`); **A** — Using `faaCertResourcesAndCheckDemo.mjs`; **R** — Prevents illegal flights while launching students toward external FAA credentials; **T** — Completed by close of Day 10.
- [ ] **Teacher Objective (`TG-U21-5`, `TG-U21-6` | `[L2–L5]` | Concise Legal Framing & External Portals):** **S** — Keep legal review high-signal (`<= 25%` of Unit 21 time) while distributing verified links for `TRUST`, `FAADroneZone`, `FAA-G-8082-22`, `IACRA`, and `B4UFLY`; **M** — `100%` of teams bookmark official FAA portals and validate `0` off-by-one boundary bugs (`> 250 g`, `< 55 lbs`, `> $500`); **A** — With printed portal checklist and Node test suite; **R** — Preserves maximum semester lab hours for physical drone soldering, wiring, and JS code; **T** — Audited by Day 10.

---

## Bloom's Objective Ladder
- **L1 Remember:** State `TRUST` vs `Part 107`, `> 250 g` registration/Remote ID threshold, `< 55 lb / <= 400 ft AGL`, `§107.9` 10-day `> $500` rule, and official FAA portals.
- **L2 Understand:** Contrast hobby sub-250 exemptions vs. mandatory commercial Part 107 Remote ID/individual registration and `FRIA` rules.
- **L3 Apply:** Implement `faaComplianceLab.mjs` registration, preflight airspace/VFR, and external FAA resource functions.
- **L4 Analyze:** Fix strict boundary inequalities (`250 g`, `55 lbs`, `$500`) and decode `LAANC` ceiling violations.
- **L5 Evaluate:** Synthesize physical bench sign-off with statutory launch readiness into a clear remediation plan.

---

## 50-Minute Pacing & Teacher Answer Keys

- **Period 1 (Day 9):** Kahoot Quiz 2 (`12m`), Pre-Lesson 21.3 (`4m`), Concise FAA hobby vs commercial overview + external portal walkthrough (`20m`), Optional live `TRUST` card start / Part A worksheet (`14m`).
- **Period 2 (Day 10):** `faaCertResourcesAndCheckDemo.mjs` trace + [`faaComplianceLab.mjs`](../../0-student_files/21-drone-build/faaComplianceLab.mjs) coding (`28m`), Part C/D boundary bug & dispatch critique (`17m`), Post-Lesson 21.3 Exit Ticket (`5m`).

### Pre-Lesson 21.3 Key
1. **Strictly `> 250 g` (`0.55 lb`)**.
2. **`TRUST`** = free 20-min online recreational test (`49 U.S.C. §44809`); **`Part 107 UAG`** = proctored commercial Remote Pilot license required for paid/business flights.
3. Registration/Waivers -> **`faadronezone.faa.gov`** (`iacra.faa.gov` is pilot certification application); Airspace/LAANC -> **`B4UFLY`**.
4. **`10` calendar days**.

### Worksheet Part A & C Key
- **Part A:** `> 250 g` (`0.55 lb`); `< 55 lbs`, `<= 400 ft AGL`, `>= 3 SM`, `>= 500 ft` below clouds, `10`-day `> $500`. Portals: `TRUST` (`faa.gov/uas/recreational_flyers`), Drone/RID (`faadronezone.faa.gov`), Study Guide (`faa.gov/.../aviation`), UAG Cert (`iacra.faa.gov`), Airspace (`B4UFLY`).
- **Part C Inequality Fixes:**
  1. `250 g` exact does NOT trigger recreational registration (rule is strictly **`grams > 250`**).
  2. `55.0 lbs` exact is NOT legal under Part 107 (rule is strictly **`lbs < 55`**, so `lbs >= 55` is illegal!).
  3. `$500` exact does NOT trigger `§107.9` reporting (rule is strictly **`propertyDamageUsd > 500`**).

### Post-Lesson 21.3 Key
1. Hobby `245 g`: needs **`TRUST` only** (zero DroneZone registration or Remote ID needed!). Same `245 g` shot for paid real-estate media: **MUST hold Part 107 UAG**, individually register aircraft on `FAADroneZone`, AND broadcast **`Part 89` Remote ID**!
2. Violation 1: Planned `300 ft AGL > 250 ft` Class `D` **LAANC ceiling**. Violation 2: `700 ft ceiling - 300 ft alt = 400 ft` below clouds (**violates `>= 500 ft` below clouds VFR minimum!**).
3. `TRUST`: `faa.gov/uas/recreational_flyers`; Study Guide: `faa.gov/regulations_policies/handbooks_manuals/aviation` (`FAA-G-8082-22`); Registration: `faadronezone.faa.gov`.
4. Fix: `grams > 250` (not `>= 250`) and `damageUsd > 500` (not `>= 500`).
5. Combines hardware health (`xt60Ohms >= 10`, smoke stopper OK, UART crossed, `VBat >= 3.5V/cell`, `RSSI >= -95`) with statutory approval (`valid cert`, registration/RID, `LAANC`, `<= 400 ft`, `>= 3 SM`) so unsafe hardware OR unlawful flights stay `DISARMED`.
