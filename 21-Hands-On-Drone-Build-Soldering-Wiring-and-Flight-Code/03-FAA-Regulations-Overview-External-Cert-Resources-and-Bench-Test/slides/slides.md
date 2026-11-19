---
title: "Lesson 21.3 — Top-Level Drone Laws, External FAA Cert Portals & Compliance CLI"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 21.3: FAA Laws, Cert Portals & Compliance
**CTE sUAS & JavaScript Capstone (`TRUST` · `14 CFR Part 107 & Part 89`)**

---

### `[L1 Remember]` Recreational Hobby vs. Commercial Part 107 Cheat Sheet

| Rule | Recreational (`§44809`) | Commercial (`14 CFR Part 107`) |
|---|---|---|
| **Credential** | Free **FAA `TRUST`** card | Proctored **`Part 107 UAG`** license |
| **Registration & Remote ID** | Strictly **`> 250 g`** (`0.55 lb`) | **ALL aircraft** regardless of weight |
| **Altitude & Airspace** | `<= 400 ft AGL` + **LAANC (`B–E`)** | `< 55 lbs` · `<= 400 ft` · `>= 3 SM` / `500 ft` clouds |
| **Accident Report (`§107.9`)** | N/A | **`10` days** if injury / LOC / damage **`> $500`** |

---

### `[L2 Understand]` Official External FAA Cert & Hardware Resource Directory

- **Free Hobby Cert (`TRUST`):** `faa.gov/uas/recreational_flyers/knowledge_test_updates`
- **Register & Remote ID:** `faadronezone.faa.gov` (`$5 / 3 yrs`)
- **Official Part 107 Study Guide (`FAA-G-8082-22`):** `faa.gov/regulations_policies/handbooks_manuals/aviation`
- **Pilot License Application (`IACRA`):** `iacra.faa.gov`
- **Airspace & Weather:** `B4UFLY` (`LAANC`) · `aviationweather.gov` (`METAR/TAF`)
- **Hands-On Stack Guides:** `betaflight.com/docs` · `expresslrs.org` · `oscarliang.com`

---

### `[L3 Apply -> L4 Analyze]` Encode Strict Statutory Boundaries in Node.js

```javascript
// Watch strict bounds cleanly:
//   Recreational reg/RID -> takeoffWeightGrams > 250  (250 g exact = exempt!)
//   Part 107 Max Weight  -> takeoffWeightLbs < 55     (55.0 lbs = INVALID!)
//   10-Day FAA Report    -> propertyDamageUsd > 500   ($500 exact = NOT required!)
```

> **Lab:** Run `faaCertResourcesAndCheckDemo.test.mjs`, finish `0-student_files/21-drone-build/faaComplianceLab.mjs`, and combine ALL 3 labs in `unit-21-hands-on-drone-gcs`!
