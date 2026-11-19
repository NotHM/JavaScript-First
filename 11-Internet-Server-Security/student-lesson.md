# Student Lesson 11.1: Cybersecurity, OWASP & Server Hardening (`Std 1.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Files:** [`../0-student_files/12-security-server/cryptoSanitizeLab.js`](../0-student_files/12-security-server/cryptoSanitizeLab.js) & [`../0-student_files/12-security-server/secureServer.js`](../0-student_files/12-security-server/secureServer.js)

## Part A: CIA Triad, Crypto & Access Control (`[L1 Remember]` & `[L2 Understand]`)
1. Assign each security defense to **Confidentiality**, **Integrity**, or **Availability** (`1.6`):
   - SHA-256 checksum & Digital Signature: `________________`
   - HTTPS/TLS Encryption & Least Privilege RBAC: `________________`
   - Rate limiting + multi-region load balancer: `________________`
2. Contrast reversible **AES Encryption** vs one-way **Salted `scrypt` Hashing** (`1.4`):  
   > `____________________________________________________`

## Part B: Applied Hashing, Escaping & Server Hardening (`[L3 Apply]`)
1. Complete `hashPassword`, `verifyPassword`, and `resolveSafeFile` inside [`cryptoSanitizeLab.js`](../0-student_files/12-security-server/cryptoSanitizeLab.js).
2. Complete `escapeHtml`, `nosniff` header, and CORS rules inside [`secureServer.js`](../0-student_files/12-security-server/secureServer.js).

## Part C: Vulnerability Audit (`[L4 Analyze]`)
Inspect this vulnerable Express/Node endpoint and diagnose ALL THREE severe OWASP defects (`1.2, 1.5`):
```javascript
app.get('/search', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sql = `SELECT * FROM items WHERE name = '${req.query.q}'`;
  res.send(`<p>Results for: ${req.query.q}</p>`);
});
```
1. Injection flaw (`SQLi`): `____________________________________`
2. XSS flaw: `____________________________________________________`
3. CORS/Header remediation: `________________________________________`

## Part D: Incident Remediation & Threat Triage (`[L5 Evaluate]`)
A coworker clicks a convincing **AI voice-cloning / phishing (`1.1`)** link and leaks their password, while `npm audit` reports a Critical CVE (`1.2`). Outline an incident response plan enforcing **MFA**, **Least Privilege rotation**, **SIEM alerting**, and **dependency patching (`1.7`)**:  
> *(Your incident response brief)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — verify every security guard with Node tests**):

- [ ] **SL-L11.1-1 (`[L1–L2 Remember/Understand]` | Std `1.4, 1.6` | `SG-U11-1`):** Map each Part A defense to the CIA Triad and contrast AES encryption vs. salted `scrypt` hashing with >= 80% accuracy by Day 82.
- [ ] **SL-L11.1-2 (`[L3 Apply]` | Std `1.4–1.5, 16.3` | `SG-U11-2`):** Implement and verify all security helpers in `cryptoSanitizeLab.js` and `secureServer.js` in Node.js by end of Day 84.
- [ ] **SL-L11.1-3 (`[L4 Analyze]` | Std `1.2, 1.5` | `SG-U11-3`):** Identify all 3 OWASP defects in the Part C snippet and specify exact header and query remediations before Day 85.
- [ ] **SL-L11.1-4 (`[L5–L6 Evaluate/Create]` | Std `1.1–1.3, 1.7` | `SG-U11-4`, `SG-U11-5`):** Draft your Part D incident response plan (MFA, Least Privilege, SIEM, CVE patching) and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by Day 85.
