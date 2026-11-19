---
title: "Chapter 11 — Cybersecurity, OWASP Top 10 & Server Hardening (Std 1.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Chapter 11: Cybersecurity & Hardening
**AZ CTE Standard 1.0 (`1.1`–`1.7`)**

---

### `[L1 Remember]` CIA Triad & Threats (`Std 1.1, 1.6`)

- **Confidentiality:** Keep secrets private (HTTPS/TLS, Least Privilege)
- **Integrity:** Detect tampering (SHA-256, Digital Signatures)
- **Availability:** Stay online under load (Rate limiting, redundancy)
- **Threats (`1.1–1.3`):** Phishing, spoofing, AI impersonation → enforce **MFA** + **Least Privilege** + **SIEM / CVE patching**!

---

### `[L2 Understand -> L3 Apply]` Encryption vs. Hashing (`Std 1.4`)

- **Encryption (AES / TLS):** Two-way reversible with secret keys (protecting cards/files).
- **Password Hashing (`scrypt` + Salt):** One-way slow mathematical digest — use **`crypto.timingSafeEqual`** on verify!

---

### `[L3 Apply -> L4 Analyze]` Injection & Traversal Defenses (`Std 1.5`)

- **XSS:** Escape `& < > " '` cleanly and use `textContent` + `nosniff`.
- **SQL Injection:** NEVER write ``SELECT * FROM users WHERE name='${input}'`` — bind parameters (`$1`)!
- **Path Traversal:** Block `../../etc/passwd` with `path.resolve(baseDir, userFile)` boundary checks!

> **Labs:** Run `node 11-Internet-Server-Security/code/cryptoSanitizationDemo.js` and finish `0-student_files/12-security-server/`!
