# Unit 11 Project: Hardened Auth, Sanitization & File Gateway Audit

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `1.1–1.7`  
**Starter:** [`../../0-student_files/projects/unit-11-security-hardening-audit/index.js`](../../0-student_files/projects/unit-11-security-hardening-audit/index.js)

Build and verify a zero-dependency Node **Security Gateway Suite** passing all attack vectors cleanly:
1. **Authentication (`1.3–1.4`):** Implement salted `scryptSync` + `timingSafeEqual` user password storage + simple in-memory per-IP rate limiter (`Availability 1.6`).
2. **Injection & Path Jails (`1.5`):** Escape XSS payloads (`escapeHtml`), generate parameterized SQL search wrappers (`{ text, params }`), and block `../` traversal escapes cleanly.
3. **Hardened Headers & Defect Report (`1.2, 1.7`):** Set strict `X-Content-Type-Options: nosniff` + specific CORS origin headers inside `node:http` factory AND author a brief remediation log mapping defects to the **CIA Triad (`1.6`)**.
