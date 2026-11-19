---
title: "Lesson 11.2 — Zero Trust, Firewalls, SIEM Correlation & STRIDE"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 11.2: Zero Trust, Firewalls, SIEM & STRIDE
**CTE IT Security (`11.1999.00`) / CompTIA Security+ | ADE `1.0, 4.5–5.10, 9.1–11.6`**

*Data States, Physical & Biometric Controls, VLAN/DMZ, Ordered Firewalls, SIEM + AI, DRP & Compliance*

---

### `[L1 Remember -> L2 Understand]` Data States, Risk Matrix & STRIDE

- **3 Data States:** **At Rest** (`BitLocker`/LUKS + **Faraday cages**/locks) | **In Motion** (`TLS 1.3`/VPN) | **In Use** (RAM sandboxing/enclaves)
- **Risk Matrix:** $\text{Asset Value} \times \text{Likelihood} \times \text{Impact}$ (Mitigate, Transfer, Avoid, Accept)
- **STRIDE Threat Modeling:**
  - **S**poofing (`MFA`/`SAML`/`OIDC`) | **T**ampering (`GCM`/`HMAC`) | **R**epudiation (`SIEM` logs)
  - **I**nformation Disclosure (Encryption/`VLAN`) | **D**enial of Service (`NGFW`/`DRP`) | **E**levation of Privilege (`Zero Trust`/`RBAC`)

---

### `[L2 Understand]` AAA, SSO, Zero Trust & Biometric Liability

- **AAA + Zero Trust:** Authenticate (`MFA`), Authorize (**RBAC / Least Privilege**), Account (**SIEM**)—*"Never Trust, Always Verify"*
- **SSO:** `SAML 2.0` (enterprise XML assertions) & `OIDC` (`OAuth 2.0` + JSON JWTs)
- **Biometrics Legal & Privacy Trap (`BIPA` / `GDPR Art. 9`):**
  - Fingerprints and faceprints **cannot be rotated or revoked** if a central DB leaks!
  - Store biometric credentials strictly in local hardware **TPM/WebAuthn** enclaves with explicit consent.

---

### `[L3 Apply -> L4 Analyze]` Segmentation, Ordered Firewalls & `IDS/IPS`

- **Segmentation:** `VLANs` (`802.1Q` isolation) + **`DMZ`** (screened subnet shielding LAN DBs from public servers)
- **Firewall Evolution (`First-Match Wins -> Implicit Deny`):**
  1. **Packet-Filtering (Stateless):** Rules checked per packet (`must explicitly permit ephemeral reply!`)
  2. **Stateful Inspection:** Tracks `ESTABLISHED` flows automatically
  3. **NGFW / Application Firewall:** Deep L7 TLS/HTTP signature blocking (`IPS` inline drop vs. `IDS` passive alert)

> **Predict Before Running:** Why does rule order (`ALLOW` before `DENY` vs. `DENY` before `ALLOW`) flip an ACL's security outcome?

---

### `[L4 Analyze]` SIEM Correlation & AI Anomaly Detection

- Correlating multi-source firewall + SSH + `SAML/OIDC` logs exposes stealth attacks:
  - **Brute-Force + Success (`CREDENTIAL_COMPROMISE`):** Repeated `AUTH_FAIL` spikes immediately preceding `AUTH_SUCCESS`
  - **Impossible-Travel SSO:** Same user succeeding from Phoenix (`us-az`) and Frankfurt (`eu-de`) minutes apart
  - **AI Baseline Anomaly (`z >= 2.0`):** Flags `950 KB` egress spike vs. `400 B` statistical norm

---

### `[L5 Evaluate]` Disaster Recovery (`RPO`/`RTO`) & Compliance Governance

- **DRP Tiers:** **`Hot Site`** (`RTO <= 15m / RPO <= 5m`) vs. **`Warm Site`** (`<= 4 hr`) vs. **`Cold Site`** (`days/weeks`)
- **Governance Frameworks:**
  - `GDPR` (EU privacy/72h) | `HIPAA` (PHI) | `PCI-DSS` (payment cards) | `SOX` (financial audits) | `FERPA` (student records)
  - `FCC` (wireless/RF) | `DRM/DMCA` (digital copyright) | `EFF` (civil privacy/research) | `AUP` (acceptable use)

> **Lab:** Run `node --test 11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/code/zeroTrustSiemDemo.test.mjs` & finish `0-student_files/11-zero-trust-siem/firewallSiemLab.mjs`!
