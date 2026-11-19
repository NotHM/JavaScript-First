# Chapter 11: Cybersecurity, OWASP Top 10, Cryptography & Server Hardening (`Std 1.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Recall DNS/TLS hosting flow, CommonJS vs. ESM modules, modern threats (`phishing`, `spoofing`, `AI deepfakes`, `malware` `1.1`), **CVE/SIEM (`1.2`)**, and the **CIA Triad** (`Confidentiality`, `Integrity`, `Availability` `1.6`).
- **`[L2 Understand]`** Contrast **MFA + Principle of Least Privilege (`1.3`)**, **Encryption vs Salted One-Way Hashing vs Digital Signatures (`1.4`)**, and **Sandboxes/VMs**.
- **`[L3 Apply]`** Implement salted `crypto.scryptSync` password verification (`timingSafeEqual`), HTML XSS escaping, parameterized queries, and path-traversal jails (`1.4–1.5`).
- **`[L4 Analyze]`** Audit insecure HTTP/Node handlers detecting Reflected XSS, SQL Injection (`" OR "1"="1`), permissive CORS (`*`), and secret leakage (`1.2, 1.5`).
- **`[L5 Evaluate]`** Triage discovered defects against CIA impact and prescribe concrete code & header remediations (`1.6–1.7`).

---

## 1. CIA Triad, Threats, Least Privilege & SIEM (`Std 1.1–1.3, 1.6`)
- **CIA Triad (`1.6`):**
  - **Confidentiality:** Only authorized entities read secret data (`TLS/HTTPS`, encryption, Least Privilege).
  - **Integrity:** Prevent unauthorized tampering (`SHA-256`, HMAC, Digital Signatures).
  - **Availability:** Systems remain responsive under surge/DoS (`Rate limiting`, replicas, backups).
- **Human & AI Threats (`1.1`) & Access Hygiene (`1.3`):** Defend against phishing, SMS/email spoofing, and AI voice cloning via **MFA (Multi-Factor Auth)**, password managers, & **Least Privilege** (never grant admin scopes by default!).
- **OWASP Top 10, CVE & SIEM (`1.2`):** Monitor `npm audit` / CVE vulnerability advisories and aggregate security logs into **SIEM** alerts for brute-force spikes.

---

## 2. Cryptography, Sandboxing & Input Sanitization (`Std 1.4–1.5, 1.7`)
- **Encryption (`Ciphertext <-> Plaintext`):** Reversible with secret key (**AES-GCM**, **TLS** in transit).
- **Password Hashing (`scrypt` / `Argon2`):** Deliberately slow + unique per-user **salt**, **one-way irreversible**! Never store passwords encrypted or hashed with fast unsalted MD5/SHA-1; compare using `crypto.timingSafeEqual()` to block timing side-channels (`1.4`).
- **Digital Signatures & Sandboxes (`1.4`):** Private keys sign releases proving publisher authenticity; Containers/VMs/Browsers sandbox untrusted code from host disks.
- **Injection & Overflow Defenses (`1.5`):**
  - **XSS:** Output-encode `& < > " '` via `escapeHtml()` or render safely with `textContent` + strict `Content-Security-Policy`.
  - **SQL Injection (SQLi):** NEVER concatenate user input into SQL strings—always use `?` / `$1` **Parameterized Queries**!
  - **Path Traversal & Buffer Bounds:** Reject filenames containing `..` outside base directory using `path.resolve()` prefix checks; enforce explicit length/size limits (`1.5`).

## Chapter Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demos:** [`code/cryptoSanitizationDemo.js`](./code/cryptoSanitizationDemo.js) & [`code/secureServer.js`](./code/secureServer.js)
- **Student Starters:** [`../0-student_files/12-security-server/cryptoSanitizeLab.js`](../0-student_files/12-security-server/cryptoSanitizeLab.js) & [`../0-student_files/12-security-server/secureServer.js`](../0-student_files/12-security-server/secureServer.js)
