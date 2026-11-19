# Lesson 21.3: Top-Level Drone Laws, FAA Certification Resources & Bench Compliance CLI

**CTE & Industry Alignment:** ADE `Stds 2.0, 4.0, 12.0, 19.0` · **FAA `TRUST` / `14 CFR Part 107 & Part 89`** · **`CIW-JS` · `ITS-JS`**  
**Code Demo:** [`code/faaCertResourcesAndCheckDemo.mjs`](./code/faaCertResourcesAndCheckDemo.mjs) · **Tests:** [`code/faaCertResourcesAndCheckDemo.test.mjs`](./code/faaCertResourcesAndCheckDemo.test.mjs) · **Student Lab:** [`../../0-student_files/21-drone-build/faaComplianceLab.mjs`](../../0-student_files/21-drone-build/faaComplianceLab.mjs)

---

## 1. Focused Regulatory Essentials for Drone Builders & Programmers

Notice the curriculum philosophy in Unit 21: **physical soldering, flight controller wiring, and JS telemetry programming stay front and center (`~75–80%`), while legal training stays crisp, actionable, and connected directly to external FAA certification portals (`~20–25%`).** Nobody needs a 200-page aviation textbook just to verify whether their student-built quadcopter can legally power up outdoors—yet every programmer MUST automate five bright-line federal rules accurately:

| Decision Gate | Recreational Hobby (`49 U.S.C. §44809`) | Commercial / Work (`14 CFR Part 107`) |
|---|---|---|
| **Pilot Credential** | Free **FAA `TRUST`** exam certificate | Paid proctored **Part 107 `UAG` Remote Pilot Certificate** (24-month recurrent test) |
| **FAADroneZone Registration** | Mandatory strictly above **`> 250 g`** (`0.55 lb`, single hobby number) | Mandatory for **ALL drones** regardless of weight (`$5` / 3 years per aircraft) |
| **Remote ID (`14 CFR Part 89`)** | Required if **`> 250 g`** (unless flying inside an approved `FRIA` club field) | Mandatory for **every Part 107 aircraft** (`Standard` built-in or Broadcast Module) |
| **Aircraft & Flight Limits** | `<= 400 ft AGL`, strict **VLOS**, obey TFRs & controlled airspace **LAANC** | Strictly **`< 55 lbs`**, `<= 400 ft AGL`, `<= 87 kt` (`100 mph`), `>= 3 SM` visibility, `>= 500 ft` below clouds |
| **Accident Report (`§107.9`)** | Local property/FAA safety follow-up | Written FAA report within **`10` calendar days** if serious injury, LOC, or non-UAS damage **`> $500`** |

> **Why Does `249 g` Sub-250 Matters So Much for High School & College Builds?** A cinewhoop or tiny trainer built cleanly at `242 g` (`<= 250 g`) skips registration & Remote ID for **recreational** hobby flights, whereas adding a `50 g` LiPo pushing it to `292 g` immediately triggers `FAADroneZone` + `Part 89` Remote ID! And the second a student accepts payment or shoots commercial media, **Part 107 requires individual registration AND Remote ID at ANY weight.**

---

## 2. Official External FAA Certification & Hardware Resource Hub

Rather than burying external study links in random footnotes, [`setup-guide.md`](../setup-guide.md) and [`faaCertResourcesAndCheckDemo.mjs`](./code/faaCertResourcesAndCheckDemo.mjs) index every verified official FAA certification and hardware engineering resource programmatically:

- **FAA `TRUST` (Free Recreational Certificate — Complete Today in ~20 Min):** `https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates`
- **FAA `Part 107` Remote Pilot Study Guide (`FAA-G-8082-22` PDF):** `https://www.faa.gov/regulations_policies/handbooks_manuals/aviation`
- **FAA `Part 107` Airman Certification Standards (`FAA-S-ACS-10B`):** `https://www.faa.gov/training_testing/testing/acs`
- **`FAADroneZone` Portal (Registration, Waivers & `Part 89` Remote ID):** `https://faadronezone.faa.gov/`
- **`IACRA` Portal (FTN Registration & Official UAG Application):** `https://iacra.faa.gov/`
- **eCFR Statutory Text (`14 CFR Part 107` & `Part 89`):** `https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107`
- **FAA `B4UFLY` & `LAANC` Airspace Apps:** `https://www.faa.gov/uas/getting_started/b4ufly`
- **NOAA Aviation Weather (`METAR` / `TAF`) & VFR Charts:** `https://aviationweather.gov/` & `https://skyvector.com/`
- **Hands-On Stack References:** [Betaflight Docs](https://betaflight.com/docs/) · [ExpressLRS](https://www.expresslrs.org/) · [Oscar Liang Build & Solder Guides](https://oscarliang.com/soldering-guide/)

---

## 3. Coding Automated Compliance Dispatch (`faaCertResourcesAndCheckDemo.mjs`)

Inspect and run our Lesson `21.3` automated compliance reference:

```bash
node --test 21-Hands-On-Drone-Build-Soldering-Wiring-and-Flight-Code/03-FAA-Regulations-Overview-External-Cert-Resources-and-Bench-Test/code/faaCertResourcesAndCheckDemo.test.mjs
```

Look closely at how we avoid subjective guesswork inside `evaluateFaaRegistrationAndRemoteId()` and `evaluatePreflightRuleset()`:
1. Boundary inequalities are encoded explicitly (`takeoffWeightGrams > 250` vs `takeoffWeightLbs < 55` vs `plannedAltFtAgl <= 400`).
2. Controlled airspace (`B`, `C`, `D`, `E`) verifies `laancApprovedCeilingFt !== null && plannedAltFtAgl <= laancApprovedCeilingFt`, whereas Class `G` permits uncontrolled operations up to `400 ft AGL`.
3. `listExternalCertResources(category)` returns curated study/registration URLs so the Ground Control CLI prints exact clickable FAA links whenever a flight check flags missing credentials!

> **Next:** Finish [`student-lesson.md`](./student-lesson.md), turn [`../../0-student_files/21-drone-build/faaComplianceLab.test.mjs`](../../0-student_files/21-drone-build/faaComplianceLab.test.mjs) GREEN, and integrate all three labs into your culminating **Unit 21 Drone Build & GCS Capstone (`unit-21-hands-on-drone-gcs`)**!
