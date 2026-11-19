# Lesson Plan 11.2: Zero Trust, Firewalls, SIEM Correlation & STRIDE Threat Modeling

**Unit:** Unit 11 | **Duration:** 2 Class Periods (100 min total)  
**Standards:** West-MEC `ITS 201–202` (`CompTIA Security+`, `TestOut Security Pro`) | **ADE Network Security:** `1.0`, `4.5–4.6`, `5.1–5.10`, `9.1–9.10`, `10.7–10.8`, `11.1–11.6`

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1 (`TG-L11.2-1` | `[L1–L2]` | `ADE 1.0, 4.5–5.10, 11.1–11.6`):** Teach the 3 data states, STRIDE threat model, Risk Matrix, AAA/SSO/Biometric privacy liability, and 9 compliance mandates before lab so >= 85% of students score cleanly on Part A during Day 1.
- [ ] **Teacher SMART Goal 2 (`TG-L11.2-2` | `[L3–L5]` | `ITS 201–202 / ADE 9.1–10.8`):** Walk through `zeroTrustSiemDemo.mjs` (`node --test`) live and verify >= 85% of students pass all checks in `firewallSiemLab.mjs` (`exit 0`) and `post-lesson-eval.md` (`>= 4/5`) by Day 2 close.
- [ ] **Student SMART Goal 1 (`SG-L11.2-1` | `[L1–L2]`):** Classify Data at Rest/In Motion/In Use, STRIDE threats, physical/biometric protections, and GDPR/HIPAA/PCI-DSS/SOX/FERPA/FCC/DRM/EFF/AUP mandates accurately in Part A on Day 1.
- [ ] **Student SMART Goal 2 (`SG-L11.2-2` | `[L3–L5]`):** Implement first-match Packet/Stateful/NGFW firewall evaluation, SIEM + AI Z-score anomaly correlation, STRIDE Risk scoring, and RPO/RTO DRP selection cleanly in Node.js by Period 2 close.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | State the 3 states of data, STRIDE letters, AAA/MFA/SSO protocols (`SAML`/`OIDC`), physical security tools (`BitLocker`/Faraday), RPO/RTO terms, and 9 compliance/legal acronyms. |
| **L2 Understand** | Contrast Packet-Filtering vs. Stateful vs. NGFW firewalls, IDS vs. IPS, VLAN vs. DMZ segmentation, Hot/Warm/Cold DRP sites, and non-revocable biometric privacy liability. |
| **L3 Apply** | Compute Risk scores (`Asset × Likelihood × Impact`), evaluate ordered firewall ACLs, classify DRP site tiers, and map compliance obligations in JavaScript. |
| **L4 Analyze** | Debug ACL rule-order shadow bugs, correlate SIEM brute-force + impossible-travel + statistical AI exfiltration anomalies, and map attacks to STRIDE. |
| **L5 Evaluate** | Architect Zero Trust clinical/enterprise deployments integrating DMZ/VLAN segmentation, FIDO2/OIDC auth, Hot Site DRP, and BIPA/HIPAA/PCI-DSS safeguards. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/zeroTrustSiemDemo.mjs`](./code/zeroTrustSiemDemo.mjs), [`code/zeroTrustSiemDemo.test.mjs`](./code/zeroTrustSiemDemo.test.mjs)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs`](../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) -> Slides on 3 Data States, Risk Matrix, STRIDE, Physical Security, AAA/MFA/SSO (`SAML`/`OIDC`), Biometric Liability & Regulatory Frameworks (24 min) -> Guided `zeroTrustSiemDemo.mjs` Risk/Compliance demo + Part A (16 min) -> Quick STRIDE check (6 min).
- **Day 2 (50 min):** Segmentation (`VLAN`/`DMZ`), Ordered Firewalls (Stateless/Stateful/NGFW), Proxies, `IDS/IPS`, SIEM + AI Anomaly Detection & DRP (`RPO`/`RTO` Hot/Warm/Cold) (14 min) -> Independent lab in `0-student_files/11-zero-trust-siem/firewallSiemLab.mjs` + Parts C–D (28 min) -> `post-lesson-eval.md` (8 min).

---

## Instructor Answer Key (Pre/Post Checks & Worksheet)

### Pre-Lesson 11.2 Key
1. **3 States:** **At Rest**, **In Motion**, **In Use**. Lost laptop protection: full-disk encryption (**BitLocker + TPM** or **LUKS**) + remote-wipe protection (or **Faraday bag** for forensic preservation).
2. **Biometric Liability:** Unlike passwords or keys, biometric traits (fingerprints, faces) are **biologically permanent and cannot be revoked or changed** if stolen, exposing organizations to severe privacy litigation (**BIPA**, **GDPR Art. 9**).
3. **Firewalls & IDS/IPS:** **Stateless Packet-Filtering** evaluates L3/L4 headers packet-by-packet with zero session memory; **Stateful Inspection** maintains an active connection state table allowing established return flows; **IDS** passively monitors traffic and alerts, whereas inline **IPS** actively drops/blocks exploits.
4. **DRP & Compliance:** **`Hot Site`** (`RTO <= 15m` / `RPO <= 5m` requires live synchronous failover) governed by **`HIPAA`** (medical PHI) and **`PCI-DSS`** (credit card transactions).

### Student Worksheet Key (`student-lesson.md`)
- **Part A.1:** At Rest = **`BitLocker` / `LUKS`** + **`Faraday` bag/cage**; In Motion = **`TLS 1.3` / `VPN` / `SSH`**; In Use = **OS sandboxing / secure enclaves / zeroed buffers**.
- **Part A.2:** **S**poofing, **T**ampering, **R**epudiation, **I**nformation Disclosure, **D**enial of Service, **E**levation of Privilege.
- **Part A.3:** Biometric traits cannot be rotated/revoked once compromised, causing permanent identity theft and statutory penalties under **Illinois BIPA** / **GDPR Art. 9** without explicit informed consent and hardware-enclave storage.
- **Part A.4:** Card = **`PCI-DSS`** | Healthcare = **`HIPAA`** | Student = **`FERPA`** | Financials = **`SOX`** | EU = **`GDPR`** | Wireless RF = **`FCC`** | Workplace = **`AUP`** | Digital Copy = **`DRM/DMCA`** | Digital Civil Liberties = **`EFF`**.
- **Part C.1:** Attacker `198.51.100.44` is **PERMITTED!** Because ACLs evaluate **top-to-bottom (`first-match wins`)**, Rule 1 (`ALLOW src=ANY dstPort=443`) matches before Rule 2 is reached. **Fix:** Place the specific `DENY` rule *above* the broader `ALLOW` rule (`Specific before General`). Also, a stateless packet-filter drops valid `ESTABLISHED` outbound server replies (`srcPort=443 -> dstPort=ephemeral`) unless an explicit reverse rule exists (unlike stateful inspection).
- **Part C.2:** Alerts: (1) **`CREDENTIAL_COMPROMISE`** (3 `AUTH_FAIL` bursts then `AUTH_SUCCESS` from `203.0.113.88` — STRIDE **Spoofing**); (2) **`IMPOSSIBLE_TRAVEL_SSO`** (`admin` logging in from `us-az` then `eu-de` 66s later — STRIDE **Spoofing**); (3) **`AI_EXFILTRATION_ANOMALY`** (`1,450,000 bytes` egress vs. `~410 B` baseline — STRIDE **Information Disclosure**).
- **Part D:** (1) Isolate public web/reverse proxies inside a **`DMZ`**, place clinical/payment backends on separate **`PCI-DSS` / `HIPAA` `VLANs`**, filter TLS traffic with an **`NGFW` + `IPS`**, and enforce **Zero Trust RBAC + `SAML/OIDC` SSO + hardware `MFA`**; (2) **`Hot Site`** (`RPO 5m`, `RTO 10m`) + **`BitLocker + TPM`** on nurse tablets (and Faraday sleeves for forensic transit); (3) Obtain explicit written consent under `BIPA/GDPR`, keep templates hardware-bound (`WebAuthn`/local enclave) rather than central databases, or offer FIDO2 badge MFA alternatives.

### Post-Lesson 11.2 Key
1. Score = `5 * 4 * 5 = 100` (**CRITICAL**). STRIDE category = **Information Disclosure** (plus Tampering/Spoofing risks); fix via **Data at Rest (`BitLocker`/`AES-256`)**, **Data in Motion (`TLS 1.3`)**, **VLAN/DMZ segmentation**, and **RBAC Least Privilege**.
2. **`IMPLICIT-DENY`** (or `NGFW-L7-IPS` if payload threat triggers first — `Rule 1` only matches `10.10.1.5`, so `203.0.113.99` matches neither Rule 1 nor Rule 2 and hits implicit deny; placing `DENY` *after* `ALLOW ANY` is shadowed). Stateful tracks active session tuples (`ESTABLISHED` return traffic), whereas Stateless checks each packet blindly; **NGFW** adds L7 App-ID & inline **IPS** deep inspection.
3. Three SIEM alerts: **`BRUTE_FORCE_BURST` / `CREDENTIAL_COMPROMISE`** (`AUTH_FAIL` -> `AUTH_SUCCESS`), **`IMPOSSIBLE_TRAVEL_SSO`** (`us -> eu`), and **`AI_EXFILTRATION_ANOMALY`** (statistical Z-score byte spike). Prevents **Repudiation** via NTP-synced immutable SIEM logs.
4. `RTO <= 15m` / `RPO <= 5m` mandates a **`Hot Site`** (live mirrored DB/compute); contrast: **Warm Site** (pre-installed racks, periodic backups, hours RTO) vs. **Cold Site** (empty space/power, days/weeks RTO). Compliance: **`HIPAA`**, **`PCI-DSS`**, **`GDPR`**, and **`FERPA`**.
5. **1) Access/Biometrics:** Replace shared admin accounts + raw fingerprint DB with **`OIDC/SAML` SSO + hardware `FIDO2 MFA` + RBAC**, moving biometrics only to opt-in local TPM/WebAuthn with explicit BIPA/GDPR notice; **2) Perimeter:** Insert **`VLAN` + `DMZ` + `NGFW` (`first-match deny-then-allow`)** in front of databases; **3) Physical/Policy:** Mandate **BitLocker + TPM**, **Faraday** forensic isolation, **AUP** signing, and **SOX/HIPAA** immutable SIEM logging.
