# Unit 2 Guide: Internet Protocols, Cloud Architecture, Node HTTP & Express SSR

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 10 (Days 46–51 | 6 Class Periods × 50 Minutes)

## 1. Unit Overview
Unit 2 delivers full mastery of **AZ CTE Standard 8.0 (Internet Protocols, Cloud Service Models, Server Roles, Performance & IoT)** alongside **Standard 11.3–11.7 (Building HTTP Request/Response Servers, Static Middleware & Modular SSR in Node.js)**. Students analyze transport/application protocols (`HTTP`/`HTTPS`/`SSH`/`SFTP`/`IMAP`/`IPv4`/`IPv6`), evaluate `SaaS`/`PaaS`/`IaaS`/`FaaS`, compute bandwidth/latency budgets, engineer a multi-route `node:http` server with JSON/HTML `Content-Type` headers and `404`/`405` error handling, and refactor templates into modular ES-module SSR (`routes.mjs`, `components/`, `layout/`, `pages/`) compared cleanly against `Express.js`.

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 2 Lessons |
|---|---|---|
| **Standard 8.0** — Internet Protocols, Cloud & IoT | `8.1` Cloud benefits; `8.2` HTTP/HTTPS/SSH/SFTP/FTPS/IPv6/IMAP; `8.3` Web/API/proxy/serverless roles; `8.4` Bandwidth, CDN, compression & performance; `8.5` SaaS/PaaS/IaaS/FaaS; `8.6` IoT (BLE/NFC/Wi-Fi/LTE) | **Lesson 2.1:** [`01-Internet-Protocols-and-Cloud/`](./01-Internet-Protocols-and-Cloud/readme.md) |
| **Standard 11.0 & 18.0** — Node HTTP Servers & Routing | `11.3–11.7` HTTP verbs, status families, headers, `node:http` routing, `package.json` scripts & template HTML; `18.3` 404/500 responses | **Lesson 2.2:** [`02-Node-HTTP-Server/`](./02-Node-HTTP-Server/readme.md) |
| **Standard 8.3, 11.4–11.7, 1.5, 15.6** — Express & Modular SSR | `8.3` Static vs SSR vs framework roles; `11.6–11.7` Modular SSR layers & `"type": "module"`; `1.5` Path traversal jail; `15.6` HTML XSS escaping | **Lesson 2.3:** [`03-Express-and-SSR/`](./03-Express-and-SSR/readme.md) |
| **AZ CTE Prof. Skills** | `1.0` Complex Communication; `3.0` Thinking & Innovation | HTTP cycle diagrams, zero-framework routing & framework trade-off memos |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | State ports/roles for HTTP, HTTPS, SSH, SFTP, IMAP; list HTTP `2xx`–`5xx` status families, `SaaS`/`PaaS`/`IaaS`/`FaaS`, and modular SSR layers | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Contrast unencrypted HTTP vs. HTTPS/TLS, IPv4 vs. IPv6, IoT radios, and bare `node:http` vs. Express `express.static()` middleware | Slides, Lessons 2.1–2.3 |
| **L3 Apply** | Compute payload transfer times with gzip; code multi-route `node:http` handlers, `escapeHtml`, modular SSR layouts, and safe static MIME routers | `0-student_files/03-http-server/` |
| **L4 Analyze** | Inspect MIME mismatches, `Content-Length` UTF-8 byte bugs, missing `404`/`405` codes, template XSS, and `../` path traversal risks | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Select `IaaS`/`PaaS`/`FaaS`, CDN strategies, and raw `node:http` vs. Express.js given traffic spikes, cold-start latency, and CVE budgets | Post-Unit Eval Part B |
| **L6 Create** | Engineer a **Multi-Route Node HTTP Service & Protocol Profiler** serving HTML/JSON/API routes + health telemetry | **Unit 2 Project** (`0-student_files/projects/unit-02-http-router/`) |

## 4. Day-by-Day Pacing Calendar (Days 46–51)
| Day | Instructional Focus | Assessments & Deliverables |
|---|---|---|
| **Day 46 (Day 1)** | Unit Diagnostic & Lesson 2.1 (Protocols, Cloud Tiers, IoT Radios) | `pre-unit-eval.md`, `01-Internet-Protocols-and-Cloud/pre-lesson-eval.md` |
| **Day 47 (Day 2)** | Lesson 2.1 Lab (`protocolLab.js`, Gzip/RTT math) & Quiz 1 | `protocolLab.js`, `01-.../post-lesson-eval.md`, **Quiz 1** |
| **Day 48 (Day 3)** | Lesson 2.2 (HTTP Lifecycle, Headers, `Buffer.byteLength`, `node:http` Routing) | `02-.../pre-lesson-eval.md`, `templateServer.js` |
| **Day 49 (Day 4)** | Lesson 2.2 Debugging (`405`/`404`, socket close) & Lesson 2.3 Intro (Modular SSR) | `02-.../post-lesson-eval.md`, `03-.../pre-lesson-eval.md` |
| **Day 50 (Day 5)** | Lesson 2.3 Lab (`expressLab.js`, `express.static`, XSS/traversal checks) & Quiz 2 | `expressLab.js`, `03-.../post-lesson-eval.md`, **Quiz 2** |
| **Day 51 (Day 6)** | Unit 2 Project Build (`unit-02-http-router`) & Summative Evaluation | **Unit 2 Project Submission**, `post-unit-eval.md` |

## 5. Student SMART Goals (Trackable)
- [ ] **Goal 1 (`[L1–L2]` | `8.2, 8.5, 8.6`):** **Specific:** Master standard protocol ports (`HTTP 80`, `HTTPS 443`, `SSH/SFTP 22`, `IMAP 993`), cloud tiers (`IaaS/PaaS/SaaS/FaaS`), and IoT radios (`NFC/BLE/Wi-Fi/LTE`). **Measurable:** Score `>= 85%` on Quiz 1 (`10+/12`). **Achievable:** Study Lesson 2.1 tables and `protocolLab.js`. **Relevant:** Prerequisite for cloud deployment and security. **Time-bound:** Complete by end of Unit Day 2.
- [ ] **Goal 2 (`[L3]` | `8.4`):** **Specific:** Calculate compressed payload wire size and total transfer time (`payload / bandwidth + RTT`) across origin vs. CDN architectures. **Measurable:** Pass 100% of `calculateWireKb` tests and Part C math checks. **Achievable:** Practice with Lesson 2.1 formulas. **Relevant:** Quantifies real web performance bottlenecks. **Time-bound:** Complete during Day 2 lab block.
- [ ] **Goal 3 (`[L3–L4]` | `11.4–11.7`):** **Specific:** Build a multi-route `node:http` server serving HTML and JSON with UTF-8 `Buffer.byteLength`, `404`, and `405` handling. **Measurable:** Pass all `httpRouterDemo.js` / `templateServer.js` checks without hanging sockets. **Achievable:** Follow factory pattern `createAppServer()`. **Relevant:** Core Node backend mastery without framework magic. **Time-bound:** Complete by end of Day 4.
- [ ] **Goal 4 (`[L3–L4]` | `11.6–11.7, 1.5, 15.6`):** **Specific:** Implement modular SSR (`routes`, `nav`, `layout`, `pages`), `escapeHtml()`, MIME mapping, and `path.resolve()` traversal guards in `expressLab.js`. **Measurable:** Pass all 6 assertions in `expressLab.js` and score `>= 85%` on Quiz 2. **Achievable:** Model after `expressVsNodeSsrDemo.mjs`. **Relevant:** Prevents XSS and file-leak exploits in Express/Node apps. **Time-bound:** Complete by end of Day 5.
- [ ] **Goal 5 (`[L5–L6]` | `8.1–8.6, 11.3–11.7`):** **Specific:** Ship the Unit 2 Project (`unit-02-http-router`) and defend Cloud + `node:http` vs. Express choices on `post-unit-eval.md`. **Measurable:** Achieve `>= 80%` on Project Rubric and positive Hake's gain $g \ge 0.55$. **Achievable:** Reuse modular helpers built in Lessons 2.1–2.3. **Relevant:** Culminating backend server milestone. **Time-bound:** Submit before end of Unit Day 6.

## 6. Teacher SMART Goals (Trackable)
- [ ] **Goal 1 (`[L1–L4]` | `8.0, 11.0`):** **Specific:** Collect 100% baseline diagnostic data via `pre-unit-eval.md` and `pre-lesson-eval.md` before Lesson 2.1–2.3 direct instruction. **Measurable:** Record class pre-test percentages in the Hake's $g$ tracker spreadsheet. **Achievable:** Allocate first 4 minutes of Days 1, 3, and 4–5. **Relevant:** Pinpoints protocol and HTTP status misconceptions early. **Time-bound:** Completed prior to each lesson lecture.
- [ ] **Goal 2 (`[L2–L4]` | `11.4–11.6`):** **Specific:** Demonstrate live HTTP curl/fetch debugging showing `Buffer.byteLength` UTF-8 clipping and unclosed `res.end()` hangs. **Measurable:** Verify every student traces and resolves both bugs in Lesson 2.2 Part C. **Achievable:** Run `httpRouterDemo.js` live on projector. **Relevant:** Replaces guesswork with packet/header evidence. **Time-bound:** During Day 3–4 instructional blocks.
- [ ] **Goal 3 (`[L3–L4]` | `8.3, 1.5, 15.6`):** **Specific:** Guide students from monolithic `templateServer.js` to modular SSR (`expressVsNodeSsrDemo.mjs`) and `express.static` security checks. **Measurable:** Sign off 100% of student `expressLab.js` traversal/XSS tests in class. **Achievable:** Live demo + targeted pair checkpoints. **Relevant:** Bridges Lesson 2.2 raw `node:http` to industry Express patterns. **Time-bound:** Complete by end of Day 5.
- [ ] **Goal 4 (`[L1–L5]` | `8.0, 11.0`):** **Specific:** Run Quiz 1 and Quiz 2 Kahoot formative checkpoints and remediate any item scoring `< 70%` class accuracy within 24 hours. **Measurable:** Export Kahoot item reports and log 5-minute warm-up reteach topics. **Achievable:** Built into Days 2 and 5 pacing. **Relevant:** Closes conceptual gaps prior to summative assessment. **Time-bound:** Same or next class period.
- [ ] **Goal 5 (`[L1–L6]` | `8.0, 11.0`):** **Specific:** Grade Unit 2 Projects via `project-rubric.md` and compute final Unit 2 Hake's normalized gain $g$ using `eval-answer-key.md`. **Measurable:** Target class mean gain $g \ge 0.55$ across pre/post unit evaluations. **Achievable:** Paired evaluation items across Lessons 2.1–2.3. **Relevant:** Validates ADE CTE `11.0202.00` mastery before Unit 3 AJAX. **Time-bound:** Within 2 instructional days of Unit Day 6.
