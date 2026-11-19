---
title: "Lesson 1.1 — JavaScript Ecosystem, Legal & Ethical Issues in IT (Std 2.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 1.1: History, Licensing & Tech Ethics
**AZ CTE Standard 2.0 (`2.1`–`2.4`)**

*From LiveScript (1995) to Open-Source Ecosystems, Privacy Law & Ethical Engineering*

---

### `[L1 Remember]` JavaScript Timeline Milestones

1. **1995:** Netscape creates **LiveScript** → renamed **JavaScript** (marketing tie to Java)
2. **1997:** Standardized as **ECMAScript (`ES1`)**
3. **2009:** **ES5** + **CommonJS** + **Ryan Dahl launches Node.js** (V8 outside browser)
4. **2015:** **ES6 (ES2015)** adds `let`/`const`, Classes, Promises, ESM `import`/`export`
5. **Today:** **TypeScript**, Node.js, Deno, Bun & millions of open-source **npm** packages

---

### `[L2 Understand]` Who Owns Public Code? (`Std 2.1`)

- Every original file is copyrighted the instant you save it.
- **Public ≠ Free to Copy:** A GitHub repository with **no `LICENSE` file** defaults to **All Rights Reserved**!
- **DMCA (Digital Millennium Copyright Act):** Governs copyright takedowns and bans bypassing software copy protection.
- **Trademarks:** Protect product identities (*Java* vs. *JavaScript* vs. *Node.js*).

---

### `[L2 Understand]` Open Source vs. Proprietary (`Std 2.2`)

| License Type | Examples | Commercial Closed-Source App? |
|---|---|---|
| **Permissive** | `MIT`, `ISC`, `Apache-2.0`, `BSD` | **Yes** — keep attribution notice |
| **Copyleft** | `GPL-3.0`, `AGPL-3.0` | **Risk / Share-Alike** — derivatives must open source |
| **Proprietary** | Commercial EULA | Must buy seats & follow contract |

> `[L5 Evaluate]` Why check every npm package's license *before* `npm install`?

---

### `[L3 Apply]` Global Data Privacy Laws (`Std 2.3`)

- **COPPA:** Children **< 13** (parental consent mandatory)
- **FERPA:** U.S. **student education records** (grades, rosters, discipline)
- **GDPR:** EU resident data (**consent**, **data minimization**, **right to delete**)
- **HIPAA:** U.S. **medical / health records** (PHI)
- **PCI DSS:** **Credit card** storage & encryption rules

---

### `[L4 Analyze]` Cookies, Tracking & Ethical AI (`Std 2.4`)

Inspect this analytics payload from a middle-school math game:

```javascript
const telemetry = {
  studentId: 404,
  age: 11,
  email: "sam@middle.edu",
  adTrackerCookie: true
};
```

1. Which **two privacy laws** apply here?
2. Which fields must be redacted before logging?
3. What ethical risk arises if an AI assistant suggests unattributed code?

---

### `[L3 Apply → L5 Evaluate]` Live Lab Activity

1. Open `0-student_files/01-legal-ethics/licenseAudit.js`.
2. Classify `MIT`, `GPL-3.0`, and `NONE` licenses cleanly.
3. Redact sensitive PII fields (`email`, `ssn`) and flag COPPA violations.
4. Complete the **Post-Lesson Evaluation** exit ticket!
