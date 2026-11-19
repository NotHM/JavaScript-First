# Unit 11 Project Rubric (Teacher Only — 100 Points Total)

| Criterion | Bloom's | Exemplary (20 pts) | Proficient (16 pts) | Needs Support (8 pts) |
|---|---|---|---|---|
| **Salted Crypto & Timing Safety (`1.4`)** | L3 Apply | Unique random salt per password, `scryptSync`, verified via `timingSafeEqual`. | Fixed salt or naive `===` comparison. | Plaintext or unsalted MD5/SHA256. |
| **XSS, SQLi & Traversal Guards (`1.5`)** | L4 Analyze | Neutralizes `<script>`, `$1` SQL params, and `../../.env` path escapes cleanly. | Blocks `<script>` only; skips quotes or traversal check. | Raw unescaped string concatenation. |
| **Headers & Rate Limiting (`1.3, 1.6`)** | L5 Evaluate | Sets `nosniff`, explicit trusted origin CORS, and enforces login throttling (`429`). | Wildcard `*` CORS or misses throttling. | Zero security headers. |
| **Zero Trust ACL, SIEM/STRIDE & DRP Compliance (`ITS 201–202 / ADE 1.0–11.6`)** | L5 Evaluate | Ordered NGFW ACLs (`DMZ`/`VLAN`), SIEM + AI exfil rules, full STRIDE Risk scoring, Hot/Warm/Cold `RPO/RTO`, and biometric/regulatory (`BIPA`/`GDPR`/`HIPAA`/`PCI-DSS`) defenses. | Partial ACL ordering or omits biometric/DRP/compliance reasoning. | Missing perimeter, SIEM, or regulatory coverage. |
| **CIA Remediation Report (`1.2, 1.7`)** | L6 Create | Clearly maps each repaired vulnerability cleanly to Confidentiality, Integrity, and Availability. | Partial threat list lacking fixes. | Missing documentation. |
