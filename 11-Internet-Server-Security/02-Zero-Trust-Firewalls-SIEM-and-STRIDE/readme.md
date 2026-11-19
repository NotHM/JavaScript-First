# Lesson 11.2: Zero Trust, Firewalls, SIEM Correlation & STRIDE Threat Modeling

**Standards Alignment:** West-MEC `ITS 201–202` (`CompTIA Security+`, `TestOut Security Pro`) & **ADE Network Security `1.0`, `4.5–4.6`, `5.1–5.10`, `9.1–9.10`, `10.7–10.8`, `11.1–11.6`**

## Student Learning Objectives (Bloom's Taxonomy & SMART)
- **`[L1 Remember]`** Recall the 3 data states (At Rest, In Motion, In Use), quantitative Risk Matrix (`Asset × Likelihood × Impact`), **STRIDE** categories, AAA/MFA/SSO (`SAML`/`OIDC`), physical security controls (`BitLocker`, Faraday, locks), and regulatory frameworks (`GDPR, HIPAA, PCI-DSS, SOX, FERPA, FCC, DRM, EFF, AUP`) (`ADE 1.0, 4.5, 11.1`).
- **`[L2 Understand]`** Contrast Packet-Filtering vs. Stateful vs. Application/NGFW firewalls, passive IDS vs. inline IPS, forward/reverse proxies, `VLAN`/`DMZ` segmentation, Hot/Warm/Cold DRP sites (`RPO`/`RTO`), and **biometrics privacy liability** (`ADE 5.1–5.10, 9.1–9.10`).
- **`[L3 Apply]`** Evaluate ordered first-match firewall ACLs (`Packet vs. Stateful vs. NGFW`), calculate quantitative Risk & STRIDE controls, and map `RPO/RTO` requirements to DRP site tiers in JavaScript (`ITS 201–202`).
- **`[L4 Analyze]`** Correlate SIEM event streams to detect brute-force bursts, credential compromise, impossible-travel SSO logins, unapproved RBAC escalation, and **AI/statistical log anomaly spikes** (`ADE 10.7–10.8`).
- **`[L5 Evaluate]`** Architect Zero Trust segmented enterprise networks balancing physical security, biometric privacy law, compliance mandates, and disaster recovery SLAs (`Security+`).

### Lesson 11.2 SMART Objectives Checklist
- [ ] **S/M/A/R/T Goal 1 (`[L1–L2]` | `ADE 1.0, 4.5–4.6, 5.1–5.10, 11.1–11.6`):** Classify the 3 data states, STRIDE threat categories, physical/AAA/SSO/biometric privacy controls, and 9 compliance frameworks with >= 85% accuracy on Day 1 (`student-lesson.md` Part A).
- [ ] **S/M/A/R/T Goal 2 (`[L3–L4]` | `ITS 201–202 / ADE 9.1–10.8`):** Complete all 5 `TODO` security engines (`evaluateFirewallAcl`, `correlateSiemEvents`, `calculateRiskAndStride`, `recommendDrpSite`, `auditComplianceObligations`) in [`0-student_files/11-zero-trust-siem/firewallSiemLab.mjs`](../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs) so all checks exit `0` during lab.
- [ ] **S/M/A/R/T Goal 3 (`[L4–L5]` | `Security+`):** Diagnose ordered ACL ordering traps, SIEM + AI anomaly correlations, RPO/RTO Hot/Warm/Cold trade-offs, and compliance audits cleanly on `post-lesson-eval.md` (`>= 4/5`).

---

## 1. Data States, Risk Matrix, STRIDE & Physical Security (`ADE 1.0, 4.5–4.6, 5.1–5.10`)

### Three Data States & Physical Protection
1. **Data at Rest:** Stored on SSDs/HDDs/backups -> protect with full-disk AES-256 encryption (**BitLocker + TPM** on Windows, **LUKS** on Linux), locked server racks, tamper seals, and **Faraday bags/cages** blocking unauthorized RF/cellular remote tampering.
2. **Data in Motion:** Crossing LAN/WAN wires or Wi-Fi -> protect with **TLS 1.3**, **SSH**, and **IPsec/WireGuard VPNs**.
3. **Data in Use:** Loaded inside active CPU registers and RAM -> protect via OS process sandboxing, secure enclaves, Least Privilege permissions, and zeroing sensitive buffers promptly.

### Quantitative Risk Matrix & STRIDE Threat Modeling
- **Risk Formula:** $\text{Risk Score} = \text{Asset Value} \times \text{Likelihood} \times \text{Impact}$ -> choose **Mitigate** (patch/control), **Transfer** (cyber insurance), **Avoid** (retire risky feature), or **Accept** (documented low risk).

| Letter | Threat | Core Mitigation |
|---|---|---|
| **S**poofing | Pretending to be another user or host | Hardware **MFA (`FIDO2`)**, signed **`SAML/OIDC`** tokens, mutual TLS |
| **T**ampering | Modifying payloads, logs, or configs | `AES-256-GCM` auth tags, `HMAC/SHA-256`, read-only containers |
| **R**epudiation | Denying an unauthorized action occurred | NTP-synced tamper-evident **SIEM logs**, digital signatures |
| **I**nformation Disclosure | Exposing secrets or PII | Encryption at rest/in motion, `VLAN`/`DMZ` isolation, **RBAC** |
| **D**enial of Service | Knocking systems offline | **NGFW** rate limiting, CDN DDoS scrubbing, Hot/Warm failover |
| **E**levation of Privilege | Normal user gains admin/root rights | **Zero Trust**, **Least Privilege**, RBAC JIT elevation, SELinux |

---

## 2. AAA, MFA, SSO (`SAML`/`OIDC`), Biometric Liability & Zero Trust (`ADE 5.1–5.10`)

- **AAA:** **Authentication** *(who are you?)*, **Authorization** *(RBAC + Least Privilege: what can you touch?)*, **Accounting** *(SIEM audit log of what you did)*.
- **MFA & SSO:** Pair passwords with hardware/authenticator tokens (`MFA`). **SSO (`SAML 2.0` XML assertions / `OIDC` JSON JWTs)** centralizes login once through a hardened Identity Provider (`IdP`), shrinking password sprawl.
- **Biometrics Legal & Privacy Liability:** Passwords and API tokens can be **rotated** after a breach; fingerprints, faceprints, and iris scans are **biologically permanent and non-revocable**! Laws such as **Illinois BIPA** and **GDPR Article 9** impose heavy statutory fines for capturing or leaking biometric templates without explicit informed consent. Keep biometrics inside **local hardware TPM/WebAuthn enclaves** rather than central databases.
- **Zero Trust Architecture ("Never Trust, Always Verify"):** Treat the internal corporate LAN as untrusted by default—authenticate and authorize every packet/API request continuously using identity, MFA status, device health, and **RBAC** micro-segmentation.

---

## 3. Segmentation (`VLAN`/`DMZ`), Firewalls, Proxies, `IDS/IPS` & SIEM + AI (`ITS 202`, `ADE 9.1–10.8`)

### Network Segmentation & Perimeter Controls
- **`VLANs` (`802.1Q`):** Partition L2 broadcast domains (`Guest`, `Corp`, `CDE/Payment`, `Prod-DB`) so compromised guest devices cannot sniff internal database traffic.
- **`DMZ` (Screened Subnet):** Dual-firewall buffer zone hosting public web servers/reverse proxies—even if attackers pop the DMZ web box, an internal firewall still guards LAN databases!
- **Firewall Evolution & Ordered ACLs (`First-Match Wins -> Implicit Deny All`):**
  1. **Packet-Filtering (Stateless L3/L4):** Checks IP/port headers per packet independently (needs manual rules for both inbound and outbound ephemeral return ports).
  2. **Stateful Inspection:** Tracks active session tuples (`SYN -> ESTABLISHED`) in a state table, automatically allowing valid return replies while blocking unsolicited probes.
  3. **Application / Next-Gen Firewall (`NGFW` L7):** Deep-inspects HTTP/TLS/App-ID signatures and integrated IPS rules to drop SQLi/C2 hiding over allowed port `443`!
- **Proxy & `IDS` vs. `IPS`:** **Proxies** broker/inspect web egress (`Forward`) or shield backends (`Reverse`); **IDS** passively mirrors traffic to alert on attacks, whereas inline **IPS** actively drops malicious packets in real time.

### SIEM Correlation & AI Log Anomaly Detection
- **SIEM** collects logs across firewalls, `sshd`, `systemd`, and `SAML/OIDC` IdPs to catch attacks invisible in isolated logs:
  - **Brute-Force Burst + Credential Compromise:** `>= N` `AUTH_FAIL` events followed immediately by `AUTH_SUCCESS` from the same external IP.
  - **Impossible-Travel SSO:** One account authenticating in Phoenix and Frankfurt within 5 minutes.
  - **AI / Statistical Log Anomaly Detection:** Baselines normal user/service egress (`mean` and `stdDev`) and flags high **Z-score spikes** (e.g., `950 KB` sudden dump vs. `400 B` baseline) signaling automated data exfiltration!

---

## 4. Disaster Recovery (`RPO/RTO`) & Compliance Governance (`ADE 9.6–9.10, 11.1–11.6`)

- **Recovery Objectives:**
  - **`RPO` (Recovery Point Objective):** Maximum tolerable **data loss window** (e.g., `5 min` -> continuous replication; `24 hr` -> nightly backup).
  - **`RTO` (Recovery Time Objective):** Maximum tolerable **downtime** until service restoration.
- **DRP Site Tiers:** **Hot Site** (live synchronized mirror, `< 15m` RTO, highest cost) | **Warm Site** (pre-racked servers + periodic snapshots, hours RTO) | **Cold Site** (empty facility with power/cooling, days/weeks RTO, lowest cost).
- **Legal, Regulatory & Policy Landscape (`ADE 1.0, 11.1–11.6`):**
  - **GDPR** *(EU personal privacy, consent, 72h breach notice)* | **HIPAA** *(US medical PHI)* | **PCI-DSS** *(payment card CDE segmentation/encryption)* | **SOX** *(public company financial auditability)* | **FERPA** *(student education records)* | **FCC** *(wireless RF spectrum compliance)* | **DRM / DMCA** *(digital copyright & anti-circumvention)* | **EFF** *(Electronic Frontier Foundation digital civil liberties & researcher defense)* | **AUP** *(Acceptable Use Policy defining authorized behavior on organization systems)*.

Run the runnable reference simulation and automated test suite:
```bash
node 11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/code/zeroTrustSiemDemo.mjs
node --test 11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/code/zeroTrustSiemDemo.test.mjs
```

---

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/zeroTrustSiemDemo.mjs`](./code/zeroTrustSiemDemo.mjs) | [`code/zeroTrustSiemDemo.test.mjs`](./code/zeroTrustSiemDemo.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs`](../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs)
