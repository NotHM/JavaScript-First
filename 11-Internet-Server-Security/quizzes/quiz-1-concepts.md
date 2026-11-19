# Unit 11 Quiz 1: CIA Triad, Threats & Cryptography (Concepts)

**Bloom's:** `[L1]`–`[L2]` | **CSV:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv) | **Stds:** `1.1`–`1.7`, `CTE IT Security (11.1999.00) / CompTIA Security+`, `ADE 4.5–5.10, 9.1–9.10` | **Cert Alignment:** `12/13 (92%)` (`CompTIA-Sec+`, `CCNA`)

| # | Question | Correct Answer | Time | Bloom's | Alignment |
|---|---|---|---|---|---|
| 1 | What are the three core pillars of the **CIA Triad** (`1.6`)? | **Confidentiality, Integrity, Availability** | 20s | `[L1 \| 1.6]` | `Cert: CompTIA-Sec+` |
| 2 | Granting a web worker read-only SQL rather than Admin rights applies: | **Principle of Least Privilege** | 20s | `[L1 \| 1.3]` | `Cert: CompTIA-Sec+` |
| 3 | Proper Node algorithm for storing user password digests cleanly (`1.4`): | **Salted `crypto.scryptSync`** | 20s | `[L2 \| 1.4]` | `Cert: CompTIA-Sec+` |
| 4 | Preventing timing side-channel byte leakage on hash verify uses: | **`crypto.timingSafeEqual()`** | 20s | `[L2 \| 1.4]` | `Domain: CTE-Lab` |
| 5 | Attack tricking staff via cloned voice or fake reset link (`1.1`): | **Social Engineering / Phishing** | 20s | `[L1 \| 1.1]` | `Cert: CompTIA-Sec+` |
| 6 | Centralized database/tracker of known public software flaws (`1.2`): | **CVE (Common Vulnerabilities)** | 20s | `[L1 \| 1.2]` | `Cert: CompTIA-Sec+` |
| 7 | System aggregating host & API logs to detect intrusion spikes (`1.2`): | **SIEM** | 20s | `[L1 \| 1.2]` | `Cert: CompTIA-Sec+` |
| 8 | Separating user code inside an isolated OS VM/Container applies: | **Sandboxing** | 20s | `[L2 \| 1.4]` | `Cert: CompTIA-Sec+` |
| 9 | Which security header prevents browsers from guessing MIME types? | **`X-Content-Type-Options: nosniff`** | 20s | `[L1 \| 1.5]` | `Cert: CompTIA-Sec+` |
| 10 | Why is two-way AES encryption wrong for user password databases? | **Leaked key decrypts all passwords** | 20s | `[L2 \| 1.4]` | `Cert: CompTIA-Sec+` |
| 11 | Why does leaking biometric templates carry stricter privacy liability than passwords? | **Templates cannot be revoked once stolen** | 20s | `[L2 \| ADE 5.10]` | `Cert: CompTIA-Sec+` |
| 12 | Which segmented network zone isolates public web servers from internal DBs? | **DMZ (Screened Subnet)** | 20s | `[L1 \| NetSec]` | `Cert: CCNA` |
| 13 | Which DRP metric defines the maximum tolerable duration of downtime? | **`RTO` (Recovery Time Objective)** | 20s | `[L1 \| ADE 9.6]` | `Cert: CompTIA-Sec+` |
