# Unit 2 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **HTTP Routes & Verbs (`11.4, 11.6`)** | L3 Apply | Distinguishes `GET /`, `/api/health`, `/api/protocols`, returns `404` & `405` cleanly. | Handles happy-path `GET` routes; misses `405`. | Single route only or crashes on unknown path. |
| **MIME & Byte Headers (`11.5`)** | L4 Analyze | Exact `Content-Type` (`text/html` vs `application/json`) + `Buffer.byteLength`. | Uses `string.length` instead of `Buffer.byteLength`. | Omits headers completely. |
| **Protocol & Cloud Justification (`8.2, 8.4–8.5`)** | L5 Evaluate | Accurate port/TLS table + sound `IaaS/PaaS/FaaS` & CDN/gzip defense. | Generic cloud choice lacking latency/cost evidence. | Inaccurate protocol definitions. |
| **Modular Clean Export (`11.12`)** | L6 Create | Exports `createRouterServer()` separately so tests run without hanging sockets. | Hardcodes `.listen(7000)` at top level blocking automated testing. | Unstructured spaghetti code. |
