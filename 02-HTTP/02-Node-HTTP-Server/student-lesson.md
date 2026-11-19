# Student Lesson 2.2: HTTP Lifecycle & Node HTTP Server (`Std 11.3–11.7`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`../03-http.md`](../03-http.md)  
**Starter File:** [`../../0-student_files/03-http-server/templateServer.js`](../../0-student_files/03-http-server/templateServer.js)

---

## Student SMART Goals (Trackable)
- [ ] **Goal 1 (`[L1 Remember]` | `11.4`):** **Specific:** Map CRUD actions to HTTP verbs (`POST/GET/PATCH/DELETE`) and label `2xx`, `3xx`, `4xx`, and `5xx` status families. **Measurable:** Achieve 100% accuracy on Part A. **Achievable:** Use the HTTP status guide in `03-http.md`. **Relevant:** Standard vocabulary for all REST/web APIs. **Time-bound:** Complete within 10 minutes of Day 1.
- [ ] **Goal 2 (`[L2 Understand]` | `11.5`):** **Specific:** Explain why `Buffer.byteLength(body, 'utf8')` prevents multi-byte UTF-8 truncation vs. `body.length`. **Measurable:** Correctly diagnose the `"Welcome 🚀"` defect in Part C & exit ticket Q2. **Achievable:** Inspect byte counts in Node REPL. **Relevant:** Eliminates silent JSON/HTML clipping. **Time-bound:** By end of Day 1.
- [ ] **Goal 3 (`[L3 Apply]` | `11.6, 11.7`):** **Specific:** Build `HtmlTemplateString` and `/`, `/about`, and `404` handlers inside `templateServer.js`. **Measurable:** Server responds with `200 text/html` on valid routes and `404` on unknown paths. **Achievable:** Follow `readme.md` routing checklist. **Relevant:** Core Node backend routing skill. **Time-bound:** Complete within 30 minutes of Day 2 lab.
- [ ] **Goal 4 (`[L4 Analyze]` | `11.4, 18.3`):** **Specific:** Spot missing `res.end()` hanging sockets and distinguish `404 Not Found` from `405 Method Not Allowed`. **Measurable:** Identify both handler bugs in Part C and write a `405` guard in `post-lesson-eval.md`. **Achievable:** Trace request/response stream lifecycles. **Relevant:** Essential production HTTP debugging skill. **Time-bound:** Within 15 minutes during Day 2 analysis.
- [ ] **Goal 5 (`[L5 Evaluate]` | `11.12`):** **Specific:** Defend exporting `createAppServer()` separately from `.listen()` and compare zero-dependency `node:http` vs. Express. **Measurable:** Score `>= 4/5` on `post-lesson-eval.md` and submit a complete Part D rationale. **Achievable:** Connect Lesson 2.2 testing to ephemeral port `0`. **Relevant:** Prepares clean transition to Lesson 2.3 Modular SSR. **Time-bound:** Before end of Lesson 2.2 Day 2.

## Teacher SMART Goals (Trackable — Instructional Commitments)
- [ ] **Goal 1 (`[L1–L2]` | `11.4–11.5`):** **Specific:** Collect baseline diagnostic responses via `pre-lesson-eval.md` and present HTTP message anatomy (`03-http.md`). **Measurable:** Review diagnostic trends with students prior to coding. **Achievable:** 4-minute bell-ringer + 20-minute interactive slides. **Relevant:** Uncovers status-code and header misconceptions early. **Time-bound:** First 25 minutes of Day 1.
- [ ] **Goal 2 (`[L3–L4]` | `11.5, 18.3`):** **Specific:** Demonstrate ephemeral port `0` integration checks and UTF-8 `Buffer.byteLength` live on projector. **Measurable:** Show automated assertions verifying `200`, `405`, and `404` cleanly. **Achievable:** Built-in `fetch()` + `node:assert/strict`. **Relevant:** Models repeatable automated HTTP testing. **Time-bound:** Minutes 25–40 of Day 1.
- [ ] **Goal 3 (`[L3]` | `11.6–11.7`):** **Specific:** Circulate during `templateServer.js` lab coaching on MIME headers and proper stream termination. **Measurable:** Verify 100% of pairs test `/`, `/about`, and `/unknown` routes locally. **Achievable:** 25-minute lab support window. **Relevant:** Builds hands-on Node HTTP confidence. **Time-bound:** During Day 2 lab window.
- [ ] **Goal 4 (`[L4–L5]` | `11.4, 11.12`):** **Specific:** Lead Part C bug-hunt debrief and preview Lesson 2.3 Express trade-offs in Part D. **Measurable:** Provide targeted feedback on every group's Part D justification. **Achievable:** 10-minute structured class debrief. **Relevant:** Bridges raw `node:http` to Express middleware. **Time-bound:** Minutes 35–45 of Day 2.
- [ ] **Goal 5 (`[L1–L5]` | `11.3–11.7`):** **Specific:** Administer `post-lesson-eval.md` and identify any students needing brief reteach before Lesson 2.3. **Measurable:** Achieve class mean gain $g \ge 0.55$ on paired items. **Achievable:** 5-minute exit ticket. **Relevant:** Confirms HTTP fundamentals before SSR/Express. **Time-bound:** Final 5 minutes of Day 2.

---

## Part A: HTTP Verbs & Status Families (`[L1 Remember]` & `[L2 Understand]`)
1. Complete the CRUD-to-HTTP mapping: Create = `______`, Read = `______`, Partial Update = `______`, Delete = `______`.
2. Label each status family: `2xx` = `________`, `3xx` = `________`, `4xx` = `________`, `5xx` = `________`.

## Part B: Multi-Route Template Server Lab (`[L3 Apply]`)
Open [`0-student_files/03-http-server/templateServer.js`](../../0-student_files/03-http-server/templateServer.js) and build `HtmlTemplateString` plus `/`, `/about`, and `404` routes listening on `7000`.

## Part C: Header & Hanging-Socket Bug Hunt (`[L4 Analyze]`)
Inspect this broken handler and list ALL TWO defects:
```javascript
http.createServer((req, res) => {
  const msg = "Welcome 🚀";
  res.writeHead(200, { "Content-Type": "text/html", "Content-Length": msg.length });
});
```
1. Defect 1: `____________________________________`
2. Defect 2: `____________________________________`

## Part D: Architecture Reflection (`[L5 Evaluate]`)
Compare writing routing cleanly in raw `node:http` vs. installing `Express.js`. State TWO cases where zero-dependency `node:http` wins (e.g., microservices / cold starts / security footprint):  
> *(Your evaluation)*
