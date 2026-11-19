# Unit 2 Project: Multi-Route Node HTTP Service & Cloud Architecture Brief

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `8.1–8.6, 11.3–11.7`  
**Starter:** [`../../0-student_files/projects/unit-02-http-router/index.js`](../../0-student_files/projects/unit-02-http-router/index.js)

Using ONLY Node's built-in `node:http` module:
1. Export `createRouterServer()` returning a configurable `http.Server` handling:
   - `GET /` → `200 text/html` welcome HTML5 template with `Buffer.byteLength`
   - `GET /api/health` → `200 application/json` (`{ status: 'ok', protocol: 'HTTP/1.1' }`)
   - `GET /api/protocols` → `200 application/json` comparing HTTP/HTTPS/SSH/SFTP/IMAP ports & encryption
   - Any unsupported method (`POST /api/health`) → `405 Method Not Allowed`; any unknown URL → `404 Not Found` (`application/json`).
2. Add a short written recommendation (`archNotes()`) choosing `IaaS` vs `PaaS` vs `FaaS` + CDN caching for your service (`8.4, 8.5`).
