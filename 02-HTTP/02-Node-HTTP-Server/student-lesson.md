# Student Lesson 2.2: HTTP Lifecycle & Node HTTP Server (`Std 11.3–11.7`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`../03-http.md`](../03-http.md)  
**Starter File:** [`../../0-student_files/03-http-server/templateServer.js`](../../0-student_files/03-http-server/templateServer.js)

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
