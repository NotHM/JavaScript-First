# Student Lesson 1.1: History of JavaScript, Licensing & Tech Ethics

**AZ CTE Standard:** `2.0` (`2.1`–`2.4`) | **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Code:** [`../../0-student_files/01-legal-ethics/licenseAudit.js`](../../0-student_files/01-legal-ethics/licenseAudit.js)

> **Instructions:** Do not read answer keys in advance. Complete Parts A through D in order to climb from foundational recall (`[L1]`) to evaluation (`[L5]`).

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Explain JS evolution (1995–2015+), default copyright rules, and permissive vs. copyleft licenses accurately by the end of Part A.
- [ ] **Goal 2 (`[L3–L4]`):** Implement `evaluateLicense()` and `sanitizeRecord()` in `licenseAudit.js` and flag all COPPA/FERPA/GDPR risks cleanly during Part B–C lab time.
- [ ] **Goal 3 (`[L5]`):** Write an evidence-based licensing & AI attribution policy memo in Part D.

---

## Part A: Foundations & Concepts (`[L1 Remember]` & `[L2 Understand]`)

1. Fill in the key JavaScript history milestones (`2.2`):
   - **1995:** Netscape creates `__________`, renamed to `__________`.
   - **1997:** First official ECMAScript specification (`ES1`).
   - **2009:** Ryan Dahl releases `__________`, bringing V8 and `CommonJS` outside the browser.
   - **2015:** `__________` adds `let`, `const`, `class`, and native ES Modules (`import`/`export`).
2. Why does a GitHub repository **without a `LICENSE` file** prohibit commercial reuse? (`2.1`)  
   > *(Your answer)*
3. Compare permissive (`MIT`, `Apache-2.0`) vs. copyleft (`GPL-3.0`) open-source licenses in one clear sentence: (`2.2`)  
   > *(Your answer)*

---

## Part B: Applied Coding Lab (`[L3 Apply]`)

1. Open [`0-student_files/01-legal-ethics/licenseAudit.js`](../../0-student_files/01-legal-ethics/licenseAudit.js).
2. Complete `evaluateLicense(license)` to classify `'MIT'`/`'Apache-2.0'` as `'APPROVED'`, `'GPL-3.0'` as `'REVIEW_REQUIRED'`, and `null`/`'NONE'` as `'BLOCKED'`.
3. Complete `sanitizeRecord(record)` to mask PII (`email`) and flag under-13 records lacking `parentalConsent`.
4. Run and verify in Node.js:
   ```bash
   node 0-student_files/01-legal-ethics/licenseAudit.js
   ```

---

## Part C: Compliance Analysis (`[L4 Analyze]`)

Inspect this bug report from a youth coding camp portal:
- Users aged **10–14** register with first name, birth date, school name, and home address.
- Google Analytics & third-party ad cookies activate immediately on page load.
- An error log records plaintext passwords when validation fails.

Identify **3 distinct compliance/ethical failures** mapped to **COPPA**, **FERPA**, and **GDPR**:  
1. `____________________________________________________________`  
2. `____________________________________________________________`  
3. `____________________________________________________________`

---

## Part D: Engineering Defense (`[L5 Evaluate]` & `[L6 Create]`)

A classmate copied a 40-line validation algorithm directly from a Stack Overflow answer posted under **CC BY-SA 4.0** and used an AI copilot to generate 100 lines of authentication logic without testing or attributing it. Write a **3–4 sentence policy recommendation** explaining what licensing, security, and academic/professional attribution steps must be taken before merging.  
> *(Your policy recommendation)*
