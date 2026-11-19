# Student Lesson 11.2: Zero Trust, Firewalls, SIEM Correlation & STRIDE

**Standards:** CTE IT Security (`11.1999.00`) / CompTIA Security+ | **ADE:** `1.0, 4.5–4.6, 5.1–5.10, 9.1–9.10, 10.7–10.8, 11.1–11.6`  
**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs`](../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs)

> **Instructions:** Complete Parts A through D independently without consulting instructor answer keys.

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Classify the 3 data states, STRIDE threat model, AAA/SSO/biometric privacy liabilities, segmentation (`VLAN`/`DMZ`), and 9 governance frameworks cleanly in Part A by Day 1 close.
- [ ] **Goal 2 (`[L3–L4]`):** Implement all 5 auditing/security engines inside [`0-student_files/11-zero-trust-siem/firewallSiemLab.mjs`](../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs) so all verification assertions exit `0` during lab.
- [ ] **Goal 3 (`[L4–L5]`):** Audit ordered firewall ACLs, SIEM + AI anomaly correlations, RPO/RTO site selection, and multi-law compliance scenarios in Parts C–D and pass [`post-lesson-eval.md`](./post-lesson-eval.md) (`>= 4/5`).

---

## Part A: Data States, STRIDE, Access Control & Governance (`[L1 Remember]` & `[L2 Understand]`)

1. Match physical & cryptographic safeguards to the **3 States of Data** (`ADE 4.5–4.6`):
   - **Data at Rest:** Disk control = `____________________` | RF signal containment = `____________________`
   - **Data in Motion:** Protocol = `____________________`
   - **Data in Use:** Defense = `________________________________________`
2. Expand all 6 letters of **STRIDE** and name one countermeasure for **Spoofing**, **Repudiation**, and **Elevation of Privilege**:
   - **S** `____________` | **T** `____________` | **R** `____________` | **I** `____________` | **D** `____________` | **E** `____________`
3. Explain **Biometrics Legal & Privacy Liability**: Why can central storage of raw facial/fingerprint templates trigger severe **BIPA / GDPR** penalties compared to leaked passwords?
   > *(Your explanation)*
4. Match each regulatory or policy acronym (`ADE 11.1–11.6`):
   - Credit card processing: `________` | US Healthcare PHI: `________` | US Student records: `________`
   - Public financial audits: `________` | EU Personal privacy (`72h` notice): `________` | Wireless spectrum: `________`
   - Workplace rules: `________` | Digital copy protection: `________` | Digital civil liberties advocacy: `________`

---

## Part B: Firewall ACL, SIEM + AI & STRIDE Lab (`[L3 Apply]` & `[L4 Analyze]`)

1. Open [`0-student_files/11-zero-trust-siem/firewallSiemLab.mjs`](../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs) and read [`0-student_files/11-zero-trust-siem/README.md`](../../0-student_files/11-zero-trust-siem/README.md).
2. Implement all 5 `TODO` functions:
   - `evaluateFirewallAcl(packet, rules, stateTable, { mode })` — handle `'packet-filter'`, `'stateful'` (`ESTABLISHED` return traffic), and `'ngfw'` (`L7` blocking) with first-match order and implicit deny.
   - `correlateSiemEvents(events, options)` — correlate `BRUTE_FORCE_BURST`, `CREDENTIAL_COMPROMISE`, `IMPOSSIBLE_TRAVEL_SSO`, and statistical `AI_EXFILTRATION_ANOMALY` Z-score spikes.
   - `calculateRiskAndStride(...)` — compute quantitative risk (`Asset × Likelihood × Impact`) and map STRIDE controls.
   - `recommendDrpSite(...)` — select `'Hot Site'`, `'Warm Site'`, or `'Cold Site'` from RPO/RTO thresholds.
   - `auditComplianceObligations(...)` — map regulatory standards and enforce biometric privacy warnings.
3. Uncomment the assertion block at the bottom of `firewallSiemLab.mjs` and run:
   ```bash
   node 0-student_files/11-zero-trust-siem/firewallSiemLab.mjs
   ```

---

## Part C: Firewall ACL Ordering & SIEM + AI Diagnostics (`[L4 Analyze]`)

1. Inspect this ordered **Stateless Packet-Filter Firewall** ACL chain (`top-to-bottom`):
   - **Rule 1:** `ALLOW TCP src=ANY dst=10.60.1.0/24 dstPort=443`
   - **Rule 2:** `DENY TCP src=198.51.100.44 dst=10.60.1.0/24 dstPort=443`
   - **Rule 3:** `IMPLICIT DENY ANY`
   - Will traffic from banned attacker **`198.51.100.44`** to DMZ port `443` be blocked or permitted? How must you reorder the rules, AND why would a **Stateless** firewall still break legitimate browser replies unless a return rule exists?
   > *(Your ACL diagnosis)*
2. Inspect this normalized **SIEM event feed**:
   - `14:01:02Z` `AUTH_FAIL` user=`admin` ip=`203.0.113.88` bytesOut=`390`
   - `14:01:04Z` `AUTH_FAIL` user=`admin` ip=`203.0.113.88` bytesOut=`410`
   - `14:01:06Z` `AUTH_FAIL` user=`admin` ip=`203.0.113.88` bytesOut=`405`
   - `14:01:09Z` `AUTH_SUCCESS` user=`admin` ip=`203.0.113.88` region=`us-az` bytesOut=`420`
   - `14:02:15Z` `AUTH_SUCCESS` user=`admin` ip=`185.220.101.9` region=`eu-de` bytesOut=`430`
   - `14:03:00Z` `EGRESS_TRANSFER` user=`admin` ip=`185.220.101.9` region=`eu-de` bytesOut=`1450000`
   Identify **3 distinct SIEM / AI anomaly alerts** and map the primary **STRIDE** threats involved:
   > *(Your correlation report)*

---

## Part D: Zero Trust, Segmentation & DRP Architecture (`[L5 Evaluate]`)

A medical clinic chain is building a cloud patient portal (`HIPAA` + `PCI-DSS` payments + `BitLocker` nurse tablets + fingerprint kiosk check-in):
1. Design network segmentation using **`VLANs`**, a **`DMZ`**, an **NGFW**, and **Zero Trust RBAC / `SAML`/`OIDC` + `MFA`** (specify where the reverse proxy vs. clinical database must sit).
2. Recommend a **DRP Site Tier (`Hot / Warm / Cold`)** given an **`RPO` of `5 minutes`** and **`RTO` of `10 minutes`**, plus one physical security upgrade for lost tablets (**BitLocker / Faraday**).
3. Address the **biometric fingerprint kiosk** legal/privacy liability under `BIPA/GDPR` before rollout.
> *(Your architecture defense)*
