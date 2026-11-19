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

---

## Teacher & Student SMART Objectives Alignment

| Lesson Checkpoint | Aligned Unit Goal(s) | Bloom's & Standard | Measurable Target & Timing |
|---|---|---|---|
| **Pre-Lesson 11.1 & Part A CIA/Crypto** | `SG-U11-1`, `TG-U11-1` | `L1–L2` (`1.4, 1.6`) | Administer [`pre-lesson-eval.md`](./pre-lesson-eval.md) on Day 81; >= 80% accuracy mapping CIA Triad controls and contrasting AES vs. salted `scrypt` by Day 82. |
| **Crypto & Hardened Server Lab (Part B)** | `SG-U11-2`, `TG-U11-2` | `L3` (`1.4–1.5, 16.3`) | Live checkoffs of [`cryptoSanitizeLab.js`](../0-student_files/12-security-server/cryptoSanitizeLab.js) and [`secureServer.js`](../0-student_files/12-security-server/secureServer.js) verifying 100% passing checks by end of Day 84. |
| **OWASP Audit & Kahoot (Part C)** | `SG-U11-3`, `TG-U11-3` | `L4` (`1.2, 1.5`) | >= 80% accuracy diagnosing SQLi, XSS, and CORS flaws in Part C; run 10-min parameterized-query/escaping reteach if Kahoot Quiz 1/2 falls < 75%. |
| **Incident Triage, Exit Ticket & Project (Part D)** | `SG-U11-4`, `SG-U11-5`, `TG-U11-1`, `TG-U11-4`, `TG-U11-5` | `L5–L6` (`1.1–1.3, 1.7`) | Administer [`post-lesson-eval.md`](./post-lesson-eval.md) on Day 85 targeting Hake's $g \ge 0.55$; grade [`project-rubric.md`](./projects/project-rubric.md) within 72 hours and archive CTE evidence. |

- [ ] **Teacher Checkpoint (`TG-U11-1..5`):** Pre/Post Lesson 11.1 growth ($g \ge 0.55$) verified, 100% `12-security-server/` lab checkoffs completed, Kahoot < 75% gaps retaught, and Unit 11 rubrics returned within 3 school days.
- [ ] **Student Checkpoint (`SG-U11-1..5`):** Parts A–D verified without spoilers, both security labs passing cleanly, and Security Audit Project submitted on Day 85.
