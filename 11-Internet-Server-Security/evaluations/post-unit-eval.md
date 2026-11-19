# Unit 11 Post-Unit Evaluation: Cybersecurity, Zero Trust, SIEM & STRIDE (`Std 1.0 | CTE IT Security / CompTIA Security+`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 16`

### Part A (1 pt each)
1. **`[L1 | 1.1–1.2]`** Match defense to threat cleanly: **Phishing / AI impersonation** (`________`), **Known third-party package flaw** (`________`), **Brute-force log spikes** (`________`).
2. **`[L2 | 1.4]`** Contrast **Digital Signatures** vs **Sandboxes/Containers** in defending code execution & distribution:  
   > *(Your contrast)*
3. **`[L3 | 1.4]`** Write the Node `crypto.scryptSync` + `randomBytes(16)` pattern hashing `password` cleanly with a random per-user salt (`1.4`).  
   > *(Code snippet)*
4. **`[L3 | 1.5]`** Complete `escapeHtml(s)` converting ALL FIVE dangerous XSS characters (`&`, `<`, `>`, `"`, `'`): `________________________________`
5. **`[L4 | 1.5]`** Spot why ``const file = `/app/uploads/${req.query.name}`;`` fails on `?name=../../.env` AND write the `path.resolve` prefix guard:  
   > *(Your fix)*
6. **`[L4 | 1.3, 1.6]`** A public read endpoint leaks internal admin stacks and sets `Access-Control-Allow-Origin: *` alongside credentials. Diagnose violated CIA pillars & Least Privilege breaches:  
   > *(Your diagnosis)*
7. **`[L2–L3 | ADE 4.5–5.10]`** Contrast **Data at Rest (`BitLocker`)** vs. **Data in Motion (`TLS 1.3`)**, distinguish **`VLAN`** vs. **`DMZ`**, and explain why central biometric storage violates **BIPA / GDPR** non-revocability principles:  
   > *(Your explanation)*
8. **`[L4 | CompTIA Security+ / ADE 9.1–9.10]`** Given ordered firewall ACL Rule 1 `ALLOW ANY -> DMZ:443` above Rule 2 `DENY IP_BAD -> DMZ:443`, explain why `IP_BAD` bypasses the deny rule, contrast passive **`IDS`** vs. inline **`IPS`**, and name what **NGFW L7** detects inside TLS/HTTP flows:  
   > *(Your diagnosis)*

### Part B — Higher-Order Evaluation & Hardening (2 pts each)
9. **`[L5 | 1.1–1.3, 1.7]`** Your company detects a leaked API token in `.git` commit history AND brute-force logins on SSH (`port 22`). Build a prioritized 4-step **Remediation Playbook** citing rotation, MFA, SSH keys, and SIEM auditing (`1.7`):  
   > *(Your playbook)*
10. **`[L5 | 1.4–1.6]`** A legacy app stored passwords hashed via unsalted fast **MD5**. Explain TWO distinct cracking vectors (**Rainbow Tables** & **GPU Brute Force**) and defend migrating to **Per-User Random Salt + `scrypt`** (`1.4`):  
    > *(Your defense)*
11. **`[L6 | 1.5, 1.7]`** Write a hardened `buildSafeQueryAndPath(baseDir, fileName, searchTerm)` returning `{ resolvedPath, escapedBanner, paramSql }` rejecting traversal attempts cleanly:  
    ```javascript
    // Write buildSafeQueryAndPath:
    ```
12. **`[L5 | CTE IT Security / CompTIA Security+ / ADE 1.0, 9.6–11.6]`** A SaaS fintech serving EU & US hospitals sees **4 failed SSH logins followed by success**, an **impossible-travel `SAML` login (`us-az -> eu-de`)**, and a **`1.2 MB` egress anomaly spike** (`RPO <= 5m, RTO <= 15m`). Compute Risk Severity (`Asset=5, Likelihood=4, Impact=5`), map the threats to **STRIDE**, choose **Hot vs. Warm vs. Cold DRP**, and list **3 applicable laws/policies** (`GDPR, HIPAA, PCI-DSS, SOX, FERPA, AUP`):  
    > *(Your SIEM/STRIDE/DRP/Compliance analysis)*
