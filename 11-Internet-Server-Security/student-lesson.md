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
