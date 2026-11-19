# Unit 1 Project Rubric: CLI License & Privacy Compliance Auditor (Teacher Only)

**Total Points:** 100 pts | **Standards:** AZ CTE `2.0`, `3.0`, `11.0` & Prof. Skills `1.0`, `4.0`, `8.0`

| Criterion | Bloom's Tier | Exemplary (25 pts) | Proficient (20 pts) | Developing (14 pts) | Needs Support (8 pts) |
|---|---|---|---|---|---|
| **Data Type & String Handling (`Std 3.1, 3.4`)** | L3 Apply | Accurately distinguishes `null`, `undefined`, primitives, and arrays; clean immutable string redaction with no falsy (`0`/`""`) bugs. | Handles `null` and arrays; minor edge case on empty strings or mutation. | Fails on `typeof null` or array checks. | Incomplete type helper or syntax errors. |
| **License Compatibility Engine (`Std 2.1–2.2`)** | L5 Evaluate | Correctly flags permissive vs. copyleft vs. unlicensed packages and documents legal rationale for proprietary apps. | Correctly classifies 2 of 3 license tiers. | Hardcodes package names instead of inspecting `.license`. | Missing license evaluation. |
| **Privacy & COPPA/FERPA Audit (`Std 2.3–2.4`)** | L4 Analyze / L5 Evaluate | Flags under-13 missing parental consent + unconsented tracking + redacts `ssn`/`email`/`dob` before console logging. | Flags COPPA age rule; partial PII redaction. | Logs raw PII directly to console. | Missing privacy rules. |
| **CLI Formatting, `npm` & Code Craft (`Std 11.3–11.9`)** | L6 Create | Clean `camelCase`, validated CLI inputs, ANSI colors cleanly reset with `\x1b[0m`, runnable via `npm run audit`. | Readable terminal output and camelCase variables; minor formatting flaw. | Messy logs, un-reset ANSI codes, or snake/inconsistent naming. | Script fails to execute in Node.js. |
