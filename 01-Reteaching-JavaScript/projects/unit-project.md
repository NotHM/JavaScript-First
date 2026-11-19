# Unit 1 Project: CLI Open-Source License & Privacy Compliance Auditor

**Bloom's Target:** `[L5 Evaluate]` & `[L6 Create]`  
**AZ CTE Standards:** `2.0` (`2.1`–`2.4`), `3.0` (`3.1`–`3.4`), `11.0` (`11.3`–`11.9`)  
**Starter Workspace:** [`../../0-student_files/projects/unit-01-license-cli-auditor/index.js`](../../0-student_files/projects/unit-01-license-cli-auditor/index.js)

---

## Scenario

You are a junior platform engineer onboarding to a school-district edtech startup building a **commercial (proprietary)** web platform for **12-year-old K–12 students**. Before shipping your first release, your lead engineer asks you to build a zero-dependency **CLI Compliance & Data-Type Auditor** in Node.js that checks third-party dependencies for license compatibility AND scans sample user records for unsafe primitive types or leaked PII (**FERPA / COPPA**).

---

## Project Requirements

1. **Inspect & Classify Data Records (`Std 3.1, 3.4`):**
   - Implement `classifyType(value)` that handles all primitive types accurately (including `null` and arrays via `Array.isArray`).
   - Redact string fields matching sensitive PII keys (`email`, `ssn`, `dob`, `address`) before output (`[REDACTED]` or masked domain).
2. **Evaluate Software Licenses (`Std 2.1, 2.2` — Bloom's L5):**
   - Given a manifest array of dependencies `{ name, license }`, categorize each dependency as:
     - **`APPROVED`:** Permissive licenses (`MIT`, `ISC`, `BSD-3-Clause`, `Apache-2.0`)
     - **`REVIEW_COPYLEFT`:** Strong copyleft (`GPL-3.0`, `AGPL-3.0`) requiring legal review for proprietary distribution
     - **`BLOCKED_UNLICENSED`:** Missing or `"NONE"` license (default copyright infringement hazard)
3. **Evaluate Student Privacy Risk (`Std 2.3, 2.4` — Bloom's L5):**
   - Flag any user record where `age < 13` AND `parentalConsent !== true` as a **COPPA Violation**, or where `trackingCookiesEnabled === true` without explicit opt-in.
4. **Create ANSI-Formatted CLI Report (`Std 11.3–11.5, 11.9` — Bloom's L6):**
   - Output clean camelCase-structured audit results using ANSI color codes (green for `APPROVED`, yellow for `REVIEW_COPYLEFT`, red for `BLOCKED` / violations, ending cleanly with `\x1b[0m` reset).
   - Provide an npm script in `package.json` (`"audit": "node index.js"`) to execute the tool cleanly.

---

## Milestone Checklist

- [ ] **Milestone 1 (`[L3 Apply]`):** Type classifier handles `null`, `undefined`, primitives, and arrays without falsy bugs.
- [ ] **Milestone 2 (`[L4 Analyze]`):** PII redaction helper scrubs student fields without mutating the source input (`structuredClone` or new object).
- [ ] **Milestone 3 (`[L5 Evaluate]`):** License policy engine & COPPA/FERPA risk detector produce accurate written risk rationales.
- [ ] **Milestone 4 (`[L6 Create]`):** Full ANSI-formatted terminal CLI report runs cleanly via `node 0-student_files/projects/unit-01-license-cli-auditor/index.js` and `npm run`.
