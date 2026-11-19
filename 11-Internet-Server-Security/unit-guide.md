# Unit 11 Guide: Cybersecurity, OWASP Top 10, Cryptography & Hardened Servers

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 17 (Days 81–85 | 5 Class Periods × 50 Minutes)

## 1. Unit Overview
Unit 11 delivers comprehensive mastery of **AZ CTE Standard 1.0 (`1.1–1.7`)** alongside **DNS, ESM vs CommonJS Modules, and Hardened HTTP Server Engineering**. Students analyze modern social engineering & AI spoofing threats, apply the **CIA Triad** and **Least Privilege / MFA**, contrast reversible **Encryption (`AES`)** with one-way salted **Password Hashing (`scrypt`)**, remediate **OWASP Top 10** injection/XSS flaws via input validation & escaping, and harden a Node HTTP API.

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 11 Deliverable |
|---|---|---|
| **Standard 1.0** — Cybersecurity & Hardening | `1.1` Phishing/spoofing/AI threats; `1.2` OWASP Top 10, CVE & SIEM; `1.3` Passwords, MFA & Least Privilege; `1.4` AES Encryption vs Hashing, Digital Signatures, Sandboxes/VMs; `1.5` XSS/SQLi/Path-Traversal/Buffer-Overflow defenses; `1.6` CIA Triad; `1.7` Defect remediation | [`readme.md`](./readme.md), [`slides/slides.md`](./slides/slides.md), [`code/cryptoSanitizationDemo.js`](./code/cryptoSanitizationDemo.js), [`code/secureServer.js`](./code/secureServer.js) |
| **Standard 2.0 & 16.0** — Privacy & Secure Storage | `2.3–2.4` Protecting credentials/PII at rest & in transit; `16.3` Safe file-path canonicalization | `0-student_files/12-security-server/` |
| **AZ CTE Prof. Skills** | `8.0` Legal & Ethical Practices | Responsible disclosure & zero hardcoded secrets |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | Define the **CIA Triad**, distinguish Authentication vs Authorization (`Least Privilege` & `MFA`), & list OWASP risks | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Contrast reversible symmetric/asymmetric **Encryption** vs one-way salted **Hashing (`scrypt`)** & CommonJS vs ESM | Slides, `readme.md` |
| **L3 Apply** | Implement HTML entity escaping (`escapeHtml`), SQLi parameter binding, path-traversal guards, & salted password checks | `0-student_files/12-security-server/` |
| **L4 Analyze** | Audit vulnerable login/search snippets catching raw SQL concatenation, reflected XSS, `Access-Control-Allow-Origin: *` leaks, & unsalted MD5 | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Prioritize remediation across CVE severity reports using CIA impact & Principle of Least Privilege (`1.2–1.3, 1.7`) | Post-Unit Eval Q7–Q8 |
| **L6 Create** | Harden an **Auth & File Gateway Security Suite** integrating salted `scrypt` tokens, `timingSafeEqual`, path jails, & CSP/CORS headers | **Unit 11 Project** (`0-student_files/projects/unit-11-security-hardening-audit/`) |
