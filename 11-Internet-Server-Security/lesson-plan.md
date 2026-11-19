# Lesson Plan 11.1: Cybersecurity, OWASP Top 10, Cryptography & Hardening (`Std 1.0`)

**Unit:** Unit 11 | **Duration:** 5 Class Periods × 50 min | **Stds:** `1.1`–`1.7`, `2.3`–`2.4`, `16.3`

## Bloom's Objective Ladder
- **L1–L2:** Define CIA Triad, threats (`phishing/AI/spoofing`), Least Privilege + MFA, CVE/SIEM, and Encryption vs Salted Hashing vs Digital Signatures.
- **L3 Apply:** Implement `crypto.scryptSync` + `timingSafeEqual`, HTML entity escaping (`escapeHtml`), and path-traversal jails.
- **L4 Analyze:** Spot SQL Injection (`OR '1'='1`), Reflected XSS, `..` traversal, and wildcard CORS `*` leaks.
- **L5 Evaluate:** Triage exposed secrets and CVEs using CIA severity and Least Privilege principles (`1.7`).

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 11.1 (4m), Slides + CIA Triad & Modern Threats (`1.1–1.3`), Part A (`15m`).
- **Day 2–3:** Walkthrough `code/cryptoSanitizationDemo.js` + `cryptoSanitizeLab.js` coding (`scrypt`, `timingSafeEqual`, `resolveSafeFile`).
- **Day 4–5:** Server hardening (`code/secureServer.js` + `secureServer.js` starter) + Unit 11 Audit Project + Post-Lesson 11.1 Exit Ticket.
- **Pre 11.1 Key:** 1) Confidentiality, Integrity, Availability; 2) Hashing prevents even breaches or rogue admins from decrypting real user passwords; 3) `res.end(\`<h1>Hello \${escapeHtml(name)}</h1>\`)`; 4) Directory / Path Traversal (`1.5`).
- **Post 11.1 Key:** 1) Grant minimum permissions needed; SIEM aggregates logs/alerts across hosts to flag intrusions; 2) XSS injects malicious `<script>` into victim browsers; SQLi alters backend database queries; 3) `if (!target.startsWith(base + path.sep)) throw new Error('Blocked');`; 4) `OR '1'='1'` evaluates true for EVERY row leaking the whole table; fix with **Parameterized Queries** (`$1`); 5) Public AWS key = critical confidentiality/availability crisis (revoke/rotate key immediately via IAM Least Privilege, scrub history); fix copyright later.
- **Worksheet Part A & C Key:** A: Integrity=`SHA-256`; Confidentiality=`TLS/Least Priv`; Availability=`Rate Limit/LB`. Part C: 1) Raw string SQL interpolation allows `' OR '1'='1`; 2) Unescaped `${req.query.q}` reflects arbitrary `<script>`; 3) Restrict CORS to trusted origins + set `X-Content-Type-Options: nosniff` + use `$1` query placeholders + `escapeHtml()`.
