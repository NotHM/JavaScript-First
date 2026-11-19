# Lesson 11.2 Student Lab: Zero Trust, Firewalls, SIEM Correlation & STRIDE

**Standards:** West-MEC `ITS 201–202` (`CompTIA Security+`, `TestOut Security Pro`) | ADE Network Security `1.0`, `4.5–4.6`, `5.1–5.10`, `9.1–9.10`, `10.7–10.8`, `11.1–11.6`

Complete all `TODO` functions inside [`firewallSiemLab.mjs`](./firewallSiemLab.mjs) **without** looking at instructor solutions:

1. **`evaluateFirewallAcl()` (`[L3–L4]`):** Implement ordered first-match ACL evaluation with implicit deny, stateful session tracking, and NGFW Layer-7 IPS blocking.
2. **`correlateSiemEvents()` (`[L4]`):** Detect brute-force bursts, credential compromise, impossible-travel SSO logins, and statistical AI Z-score exfiltration anomalies.
3. **`calculateRiskAndStride()` (`[L3–L4]`):** Compute `Asset × Likelihood × Impact`, classify risk severity, and map STRIDE countermeasures.
4. **`recommendDrpSite()` & `auditComplianceObligations()` (`[L4–L5]`):** Select Hot/Warm/Cold DRP sites from RPO/RTO budgets and identify GDPR/HIPAA/PCI-DSS/SOX/FERPA + biometric privacy liabilities.

Run from the repository root:
```bash
node 0-student_files/11-zero-trust-siem/firewallSiemLab.mjs
```
