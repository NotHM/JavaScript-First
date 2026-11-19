# Lesson Plan 1.1: History of JavaScript, Legal & Ethical IT (`Std 2.0`)

**Unit:** Unit 1 | **Duration:** 2 Class Periods (100 min total)  
**AZ CTE Standards:** `2.0` (`2.1`–`2.4`) | **Prof. Skills:** `1.0` Communication, `8.0` Legal & Ethical Practices

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1:** Walk 100% of students through `code/licenseComplianceDemo.js` and open-source/privacy case studies in Periods 1–2 so >= 85% distinguish `MIT`, `GPL-3.0`, and unlicensed repos on `post-lesson-eval.md`.
- [ ] **Student SMART Goal 1 (`[L1–L2]`):** Identify 5 privacy frameworks (`COPPA`, `FERPA`, `GDPR`, `HIPAA`, `PCI DSS`) and permissive vs. copyleft rules with >= 80% accuracy on Lesson 1.1 exit checks.
- [ ] **Student SMART Goal 2 (`[L3–L5]`):** Implement `evaluateLicense()` and `sanitizeRecord()` in `0-student_files/01-legal-ethics/licenseAudit.js` with zero PII leaks during Day 2 lab time.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | Identify JS history milestones (1995–2015+) and name COPPA, FERPA, GDPR, HIPAA, PCI DSS, DMCA. |
| **L2 Understand** | Contrast permissive (`MIT`/`Apache-2.0`) vs. copyleft (`GPL-3.0`) vs. proprietary vs. unlicensed code. |
| **L3 Apply** | Implement Node.js helpers that evaluate SPDX license compatibility and redact student PII. |
| **L4 Analyze** | Diagnose privacy, cookie-tracking, and AI confidentiality risks across real app telemetry records. |
| **L5 Evaluate** | Defend library procurement and consent-UI decisions for a commercial K–12 software release. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/licenseComplianceDemo.js`](./code/licenseComplianceDemo.js)
- **Student Worksheet & Starter:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/01-legal-ethics/licenseAudit.js`](../../0-student_files/01-legal-ethics/licenseAudit.js)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) → Slides & JS Evolution + IP/DMCA/Open-Source Licensing (`slides/slides.md`, 20 min) → Pairs complete Part A of `student-lesson.md` & Parts 1–2 of compliance scenarios (20 min) → Exit share-out (6 min).
- **Day 2 (50 min):** Review Privacy Laws (`2.3`) & Ethical AI/Cookies (`2.4`) via live walkthrough of `code/licenseComplianceDemo.js` (15 min) → Independent coding lab in `0-student_files/01-legal-ethics/licenseAudit.js` + Parts C–D (28 min) → `post-lesson-eval.md` (7 min).

---

## Instructor Answer Key (Pre/Post Checks & Worksheet)

### Pre-Lesson 1.1 Key
1. **False** — Without a license, US copyright defaults to **All Rights Reserved**.
2. School Records = **FERPA**; Medical = **HIPAA**; Under 13 = **COPPA**; Credit Cards = **PCI DSS**.
3. **Permissive (`MIT`)** allows reuse in proprietary software with attribution; **Copyleft (`GPL-3.0`)** requires redistributed derivatives to stay open under compatible copyleft terms.
4. Leaking proprietary IP into public training logs, violating NDAs, or receiving unvetted copyrighted/vulnerable code.

### Post-Lesson 1.1 Key
1. **Digital Millennium Copyright Act** — prohibits unauthorized copyright distribution and circumvention of DRM/access controls.
2. **Yes** (`MIT` is permissive; commercial distribution is permitted provided the copyright and MIT notice are preserved).
3. **COPPA** (age 12 < 13 without parental consent) & **FERPA** (`.edu` school student record). Redact `email` and `ssn` (`[REDACTED]`) prior to any log write.
4. Default tracking violates **GDPR opt-in** & **COPPA under-13 rules** (`2.3`) and manipulates users with a pre-checked **dark pattern** (`2.4`).
5. **Rank (Best → Riskiest):** `(C) Apache-2.0` (clear permissive + patent grant) → `(B) GPL-3.0` (legal if whole product becomes GPL; unsafe for closed commercial) → `(A) Unlicensed Gist` (no legal right to copy/ship at all).

### Student Code Solution Reference
See [`code/licenseComplianceDemo.js`](./code/licenseComplianceDemo.js).
