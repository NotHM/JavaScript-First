# Unit 11 Quiz 2: OWASP Auditing, Sanitization & Triage (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `1.2`–`1.7`, `ITS 201–202`, `ADE 9.1–11.6`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | `SELECT * FROM users WHERE id = '${req.query.id}'` enables: | **SQL Injection (SQLi)** | 20s | `[L4 \| 1.5]` |
| 2 | Primary permanent code cure preventing SQL Injection (`1.5`): | **Parameterized Queries (`$1` / `?`)** | 20s | `[L3 \| 1.5]` |
| 3 | Request asks `/download?file=../../.env`. Blocked by validating: | **`resolved.startsWith(base + sep)`** | 30s | `[L3 \| 1.5]` |
| 4 | App renders `?q=<img src=x onerror=alert(1)>` into HTML verbatim: | **Reflected XSS (use `escapeHtml`)** | 20s | `[L4 \| 1.5]` |
| 5 | Attacker uses precomputed MD5 hash dictionary against stolen DB. Cure? | **Per-user random Salts + `scrypt`** | 30s | `[L5 \| 1.4]` |
| 6 | Secret DB password accidentally pushed in public GitHub commit (`1.7`). First step? | **Revoke & rotate secret immediately!** | 30s | `[L5 \| 1.7]` |
| 7 | Password-only login leaked via phishing (`1.1, 1.3`). Best architectural upgrade? | **Enforce MFA + hardware/OTP tokens** | 20s | `[L5 \| 1.3]` |
| 8 | Why verify upload buffer length (`buf.length <= MAX_BYTES`) before copy (`1.5`)? | **Prevent overflow & DoS exhaustion** | 20s | `[L4 \| 1.5]` |
| 9 | Setting `Access-Control-Allow-Origin: https://app.school.edu` instead of `*`: | **Restricts API reads to trusted origins** | 20s | `[L3 \| 1.2]` |
| 10 | Attacker floods `/login` with 10,000 guesses/sec knocking app offline hits: | **CIA Availability pillar (fix: Rate Limit)** | 20s | `[L4 \| 1.6]` |
| 11 | Stateless Rule 1 `ALLOW port 443` sits above Rule 2 `DENY IP X`. Result for `IP X`? | **Permitted (`first-match wins`)** | 30s | `[L4 \| ITS 202]` |
| 12 | SIEM sees 5 failed logins then success + `950 KB` egress spike. Alerts triggered? | **Credential compromise + AI exfil anomaly** | 30s | `[L4 \| ADE 10.7]` |
| 13 | Hospital portal needs `RPO <= 5m`, `RTO <= 15m` for PHI & payment cards. Select DRP + laws: | **Hot Site + `HIPAA` & `PCI-DSS`** | 30s | `[L5 \| ADE 9.6, 11.1]` |
