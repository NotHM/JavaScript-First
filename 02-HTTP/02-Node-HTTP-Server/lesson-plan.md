# Lesson Plan 2.2: HTTP Request/Response Lifecycle & Node HTTP Server (`Std 11.3–11.7`)

**Unit:** Unit 2 | **Duration:** 2 Class Periods × 50 min | **Stds:** `11.3`–`11.7`, `18.3`

---

## Student SMART Goals (Trackable)
- [ ] **Goal 1 (`[L1 Remember]` | `11.4`):** **Specific:** Map CRUD actions to HTTP verbs (`POST/GET/PATCH/DELETE`) and label `2xx`, `3xx`, `4xx`, and `5xx` status families. **Measurable:** Achieve 100% accuracy on Part A of `student-lesson.md`. **Achievable:** Use the HTTP cats status guide in `03-http.md`. **Relevant:** Standard vocabulary for all REST/web APIs. **Time-bound:** Complete within 10 minutes of Day 1.
- [ ] **Goal 2 (`[L2 Understand]` | `11.5`):** **Specific:** Explain why `Buffer.byteLength(body, 'utf8')` prevents multi-byte UTF-8 truncation vs. `body.length`. **Measurable:** Correctly diagnose the `"Welcome 🚀"` defect in Part C & exit ticket Q2. **Achievable:** Inspect live byte counts in Node REPL. **Relevant:** Eliminates silent JSON/HTML corruption. **Time-bound:** By end of Day 1.
- [ ] **Goal 3 (`[L3 Apply]` | `11.6, 11.7`):** **Specific:** Build `HtmlTemplateString` and `/`, `/about`, and `404` handlers inside `templateServer.js`. **Measurable:** Server responds with `200 text/html` on valid routes and `404` on unknown paths. **Achievable:** Model after `httpRouterDemo.js`. **Relevant:** Core Node backend routing skill. **Time-bound:** Complete within 30 minutes of Day 2 lab.
- [ ] **Goal 4 (`[L4 Analyze]` | `11.4, 18.3`):** **Specific:** Spot missing `res.end()` hanging sockets and distinguish `404 Not Found` from `405 Method Not Allowed`. **Measurable:** Identify both handler bugs in Part C and write a `405` guard in `post-lesson-eval.md`. **Achievable:** Trace request/response stream lifecycles. **Relevant:** Essential production HTTP debugging skill. **Time-bound:** Within 15 minutes during Day 2 analysis.
- [ ] **Goal 5 (`[L5 Evaluate]` | `11.12`):** **Specific:** Defend exporting `createAppServer()` separately from `.listen()` and compare zero-dependency `node:http` vs. Express. **Measurable:** Score `>= 4/5` on `post-lesson-eval.md` and submit a complete Part D rationale. **Achievable:** Connect Lesson 2.2 testing to ephemeral port `0`. **Relevant:** Prepares clean transition to Lesson 2.3 Modular SSR. **Time-bound:** Before end of Lesson 2.2 Day 2.

## Teacher SMART Goals (Trackable)
- [ ] **Goal 1 (`[L1–L2]` | `11.4–11.5`):** **Specific:** Collect baseline diagnostic responses via `pre-lesson-eval.md` and present HTTP message anatomy (`03-http.md`). **Measurable:** Record 100% class baseline scores prior to live coding. **Achievable:** 4-minute bell-ringer + 20-minute interactive slides. **Relevant:** Reveals confusion between `200` error pages and `404` status codes. **Time-bound:** First 25 minutes of Day 1.
- [ ] **Goal 2 (`[L3–L4]` | `11.5, 18.3`):** **Specific:** Run `httpRouterDemo.js` live on projector to demonstrate ephemeral port `0` tests and UTF-8 `Buffer.byteLength`. **Measurable:** Students verify `200`, `405`, and `404` assertions executing cleanly with zero open handles. **Achievable:** Built-in `fetch()` + `node:assert/strict`. **Relevant:** Models repeatable automated HTTP testing. **Time-bound:** Minutes 25–40 of Day 1.
- [ ] **Goal 3 (`[L3]` | `11.6–11.7`):** **Specific:** Coach students through building `templateServer.js` without leaving sockets unclosed or headers missing. **Measurable:** Verify 100% of pairs test `/`, `/about`, and `/unknown` routes locally. **Achievable:** 25-minute guided + independent lab circulation. **Relevant:** Hands-on Node HTTP fluency. **Time-bound:** During Day 2 lab window.
- [ ] **Goal 4 (`[L4–L5]` | `11.4, 11.12`):** **Specific:** Facilitate Part C bug-hunt debrief and preview Lesson 2.3 Express trade-offs in Part D. **Measurable:** Collect written defect diagnoses and trade-off rationales from 100% of students. **Achievable:** 10-minute structured class debrief. **Relevant:** Links raw `node:http` mechanics to framework abstractions. **Time-bound:** Minutes 35–45 of Day 2.
- [ ] **Goal 5 (`[L1–L5]` | `11.3–11.7`):** **Specific:** Administer `post-lesson-eval.md` and analyze paired pre/post Hake's gain $g$. **Measurable:** Achieve class mean gain $g \ge 0.55$ before introducing Express in Lesson 2.3. **Achievable:** 5-minute exit ticket using Lesson 2.2 key. **Relevant:** Confirms HTTP server fundamentals. **Time-bound:** Final 5 minutes of Day 2.

---

## Bloom's Objective Ladder
- **L1–L2:** State HTTP methods, status families (`2xx–5xx`), and MIME headers (`Content-Type`, `Buffer.byteLength`).
- **L3 Apply:** Build dynamic HTML + JSON multi-route Node HTTP servers (`templateServer.js`).
- **L4 Analyze:** Diagnose UTF-8 `Buffer.byteLength` clipping, missing `res.end()` hangs, and `404` vs `405` semantics.
- **L5 Evaluate:** Defend modular factory `createAppServer()` testability and zero-dependency `node:http` design.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 2.2 (4m), Slides (`../03-http.md` via `vscode-reveal`), HTTP Message Anatomy + Header demo (`25m`), Part A (`10m`).
- **Day 2:** Live walkthrough of `code/httpRouterDemo.js` + `0-student_files/03-http-server/templateServer.js`, Part C/D debrief, Post-Lesson 2.2 Exit Ticket.
- **Pre 2.2 Key:** 1) `201 Created`, `404 Not Found`, `500 Internal Server Error`; 2) `node:http` (`http`); 3) `Content-Type`; 4) Clients/monitoring falsely assume success & cache error pages.
- **Post 2.2 Key:** 1) `405`, `201`; 2) UTF-8 multi-byte chars exceed `.length` causing clipped bytes; 3) `if (req.method !== 'GET') return send(res, 405, ...);`; 4) Socket hangs indefinitely until browser/client timeout because response stream never closes; 5) Tests bind port `0` (`ephemeral`) and `server.close()` cleanly without port conflicts.
- **Worksheet Part A & C Key:** Create=`POST`, Read=`GET`, Partial=`PATCH`, Delete=`DELETE`; `2xx` Success, `3xx` Redirect, `4xx` Client Error, `5xx` Server Error; Part C Defect 1=`msg.length` cuts off 4-byte emoji `🚀`; Defect 2=Never calls `res.end(msg)`.
