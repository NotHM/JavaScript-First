# Student Lesson 21.3: FAA Laws Overview, External Cert Resources & Compliance CLI

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/21-drone-build/faaComplianceLab.mjs`](../../0-student_files/21-drone-build/faaComplianceLab.mjs)

## My Lesson SMART Objectives
- [ ] **SL-L21.3-1 (`[L1–L2]` | `FAA TRUST / Part 107` | `SG-U21-4`):** Summarize recreational vs. commercial rules (`TRUST` vs. `Part 107`, `> 250 g` registration/Remote ID, `< 55 lbs / <= 400 ft`, `LAANC`, `§107.9`) and bookmark official external FAA study portals in Part A.
- [ ] **SL-L21.3-2 (`[L3]` | `CIW-JS, ITS-JS` | `SG-U21-4`):** Implement every `TODO` compliance & resource lookup function in [`faaComplianceLab.mjs`](../../0-student_files/21-drone-build/faaComplianceLab.mjs) until [`faaComplianceLab.test.mjs`](../../0-student_files/21-drone-build/faaComplianceLab.test.mjs) turns 100% GREEN.
- [ ] **SL-L21.3-3 (`[L4–L5]` | Bench + Law Integration | `SG-U21-4`):** Fix off-by-one statutory inequalities in Part C, complete Part D launch readiness audit, and finish [`post-lesson-eval.md`](./post-lesson-eval.md).

---

## Part A: Top-Level Federal Rules & Official FAA Portals (`[L1 Remember]` & `[L2 Understand]`)

1. Fill in the bright-line FAA rules matrix:
   - Recreational hobby weight requiring `FAADroneZone` registration + Remote ID: **`> ______ g`** (`____ lbs`)
   - Commercial `Part 107` rules regardless of weight: Max weight **`< ____ lbs`**, max altitude **`<= ____ ft AGL`**, min visibility **`>= ___ SM`**, **`>= ____ ft`** below clouds, **`10`**-day report if non-UAS damage **`> $______`**.
2. Match each official external URL to your build/certification need (`faa.gov/uas/recreational_flyers`, `faadronezone.faa.gov`, `iacra.faa.gov`, `faa.gov/.../aviation`, `b4ufly`):
   - Earn free hobby `TRUST` certificate: `__________________________`
   - Register drone & Remote ID serial: `__________________________`
   - Study official `FAA-G-8082-22` handbook: `__________________________`
   - Submit commercial `Part 107` pilot application: `__________________________`
   - Check live airspace Class `B–G` & `LAANC`: `__________________________`

---

## Part B: Automated FAA Compliance & External Link CLI (`[L3 Apply]`)

1. Open [`0-student_files/21-drone-build/faaComplianceLab.mjs`](../../0-student_files/21-drone-build/faaComplianceLab.mjs).
2. Implement:
   - `listExternalCertResources(category)`
   - `evaluateFaaRegistrationAndRemoteId({ operationType, takeoffWeightGrams, hasRemoteId, registeredAtDroneZone, inFriaZone })`
   - `evaluatePreflightRuleset(flightSpec)`
   - `evaluateAccidentReporting107({ seriousInjury, lossOfConsciousness, propertyDamageUsd })`
3. Verify syntax and run tests:
   ```bash
   node --check 0-student_files/21-drone-build/faaComplianceLab.mjs
   node --test 0-student_files/21-drone-build/faaComplianceLab.test.mjs
   ```

---

## Part C: Off-By-One Statutory Bug Forensics (`[L4 Analyze]`)

Inspect these two buggy legal checks:
```javascript
const mustRegisterHobby = grams >= 250;
const tooHeavy107 = lbs > 55;
const reportRequired = propertyDamageUsd >= 500;
```
Why do **`250 g`** hobby quads, **`55.0 lb`** commercial quads, and **`$500`** fender-bender repairs produce the WRONG boolean result in all three lines? Write the corrected JavaScript expressions:  
> *(Your analysis + corrected expressions)*

---

## Part D: Launch Approval Synthesis (`[L5 Evaluate]` & `[L6 Create]`)

Your custom-soldered quadcopter weighs `340 g`, holds an active `Part 89` Remote ID module, and has passed bench continuity (`2.4 kΩ`) + smoke stopper + Props-Off test (`5/5` motor checks). A local construction firm offers `$150` for aerial roof photos tomorrow inside Class `C` airspace (`LAANC ceiling = 200 ft`, requested height `180 ft AGL`). The student pilot currently holds ONLY an FAA `TRUST` card and hasn't entered the aircraft into `FAADroneZone` yet. Issue an itemized **`NO-GO -> Remediation Roadmap`** naming every required external FAA portal:  
> *(Your dispatch roadmap)*
