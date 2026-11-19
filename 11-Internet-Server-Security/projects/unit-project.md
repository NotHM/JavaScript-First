# Unit 11 Project: Hardened Auth, Sanitization, Zero Trust ACL & SIEM Security Audit

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `1.1–1.7` | **IT Security:** `CTE IT Security (11.1999.00) / CompTIA Security+ / ADE NetSec 1.0, 4.5–5.10, 9.1–11.6`  
**Starter:** [`../../0-student_files/projects/unit-11-security-hardening-audit/index.js`](../../0-student_files/projects/unit-11-security-hardening-audit/index.js)  
**Zero Trust & SIEM Lab Integration:** [`../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs`](../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs)

Build and verify a zero-dependency Node **Security Gateway Suite** passing all attack vectors cleanly:
1. **Authentication (`1.3–1.4`):** Implement salted `scryptSync` + `timingSafeEqual` user password storage + simple in-memory per-IP rate limiter (`Availability 1.6`).
2. **Injection & Path Jails (`1.5`):** Escape XSS payloads (`escapeHtml`), generate parameterized SQL search wrappers (`{ text, params }`), and block `../` traversal escapes cleanly.
3. **Hardened Headers & Defect Report (`1.2, 1.7`):** Set strict `X-Content-Type-Options: nosniff` + specific CORS origin headers inside `node:http` factory AND author a brief remediation log mapping defects to the **CIA Triad (`1.6`)**.
4. **IT Security Domain Integration (`Lesson 11.2` — Zero Trust ACLs, SIEM + AI, STRIDE, DRP & Compliance Brief):**
   - Integrate [`firewallSiemLab.mjs`](../../0-student_files/11-zero-trust-siem/firewallSiemLab.mjs) checks or include a paired `securityArchitecture.md` briefing covering:
     1. **Perimeter & Segmentation (`DMZ`/`VLAN`/Ordered ACLs):** Define specific-before-general NGFW rules shielding backend DBs behind a `DMZ`, with implicit deny.
     2. **STRIDE, Risk Matrix & SIEM Correlation:** Score top gateway risks (`Asset × Likelihood × Impact`), map all 6 **STRIDE** threats, and verify SIEM rules catching brute-force bursts + AI egress anomalies.
     3. **Physical Security, Biometrics & DRP Compliance:** Specify **BitLocker/Faraday**, `SAML/OIDC` + `MFA`, **Hot/Warm/Cold DRP** tier (`RPO`/`RTO`), biometric privacy boundaries (**BIPA/GDPR**), and applicable compliance controls (`GDPR/HIPAA/PCI-DSS/SOX/FERPA/AUP`).
