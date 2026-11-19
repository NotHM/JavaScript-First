# Lesson Plan 2.2: HTTP Request/Response Lifecycle & Node HTTP Server (`Std 11.3–11.7`)

**Unit:** Unit 2 | **Duration:** 3 Class Periods × 50 min | **Stds:** `11.3`–`11.7`, `18.3`

## Bloom's Objective Ladder
- **L1–L2:** State HTTP methods, status families (`2xx–5xx`), and MIME headers (`Content-Type`, `Buffer.byteLength`).
- **L3 Apply:** Build dynamic HTML + JSON multi-route Node HTTP servers (`templateServer.js`).
- **L4 Analyze:** Diagnose UTF-8 `Buffer.byteLength` clipping, missing `res.end()` hangs, and `404` vs `405` semantics.
- **L5 Evaluate:** Defend modular factory `createAppServer()` testability and zero-dependency `node:http` design.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 2.2 (4m), Slides (`../03-http.md` via `vscode-reveal`), HTTP Message Anatomy + Header demo (`25m`), Part A (`10m`).
- **Day 2–3:** Live walkthrough of `code/httpRouterDemo.js` + `0-student_files/03-http-server/templateServer.js` + Unit 2 Project launch, Post-Lesson 2.2 Exit Ticket.
- **Pre 2.2 Key:** 1) `201 Created`, `404 Not Found`, `500 Internal Server Error`; 2) `node:http` (`http`); 3) `Content-Type`; 4) Clients/monitoring falsely assume success & cache error pages.
- **Post 2.2 Key:** 1) `405`, `201`; 2) UTF-8 multi-byte chars exceed `.length` causing clipped bytes; 3) `if (req.method !== 'GET') return send(res, 405, ...);`; 4) Socket hangs indefinitely until browser/client timeout because response stream never closes; 5) Tests bind port `0` (`ephemeral`) and `server.close()` cleanly without port conflicts.
- **Worksheet Part A & C Key:** Create=`POST`, Read=`GET`, Partial=`PATCH`, Delete=`DELETE`; `2xx` Success, `3xx` Redirect, `4xx` Client Error, `5xx` Server Error; Part C Defect 1=`msg.length` cuts off 4-byte emoji `🚀`; Defect 2=Never calls `res.end(msg)`.
