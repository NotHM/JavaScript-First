# Post-Lesson 2.2 Evaluation: Exit Ticket (`Std 11.3–11.7`)

**Timing:** 5 min | **Score:** `____ / 5`

1. **`[L1 Remember]`** State HTTP status codes for: a) wrong HTTP verb on valid endpoint (`____`), b) successful record creation (`____`).
2. **`[L2 Understand]`** Why use `Buffer.byteLength(html)` instead of `html.length` inside `Content-Length`? `________________________________`
3. **`[L3 Apply]`** Write a guard returning HTTP `405` JSON when `req.method !== 'GET'` on `/api/status`: `________________________________`
4. **`[L4 Analyze]`** A Node route forgets `res.end()` after `res.writeHead(200)`. What happens in the browser/fetch client?  
   > *(Your diagnosis)*
5. **`[L5 Evaluate]`** Explain why exporting `createAppServer()` separately from `server.listen(7000)` makes automated integration testing cleanly repeatable (`12.3`):  
   > *(Your defense)*
