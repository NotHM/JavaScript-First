# Unit 2 Project: Multi-Route Node HTTP Service, Cloud & VLSM Network Brief

**Bloom's:** `[L5 Evaluate]` & `[L6 Create]` | **Stds:** `8.1–8.6, 11.3–11.7` | **IT Security:** `CTE IT Security (11.1999.00) / CCNA 200-301 / ADE 3.0, 6.0, 7.0, 8.1–8.5, 10.1–10.6`  
**Starter:** [`../../0-student_files/projects/unit-02-http-router/index.js`](../../0-student_files/projects/unit-02-http-router/index.js)  
**Optional Network Helper Module:** [`../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs`](../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs)

Using ONLY Node's built-in `node:http` module:
1. Export `createRouterServer()` returning a configurable `http.Server` handling:
   - `GET /` → `200 text/html` welcome HTML5 template with `Buffer.byteLength`
   - `GET /api/health` → `200 application/json` (`{ status: 'ok', protocol: 'HTTP/1.1' }`)
   - `GET /api/protocols` → `200 application/json` comparing HTTP/HTTPS/SSH/SFTP/IMAP ports & encryption
   - Any unsupported method (`POST /api/health`) → `405 Method Not Allowed`; any unknown URL → `404 Not Found` (`application/json`).
2. Add a short written recommendation (`archNotes()`) choosing `IaaS` vs `PaaS` vs `FaaS` + CDN caching for your service (`8.4, 8.5`).
3. **IT Security Domain Integration (`Lesson 2.4` — Network Architecture & Triage Runbook):**
   - Add an optional `GET /api/network-plan` JSON endpoint OR attach a `networkPlan.md` deployment runbook alongside `unit-02-http-router/index.js` specifying:
     1. A non-overlapping **VLSM allocation** inside RFC 1918 `10.60.0.0/24` for `Public-Edge/DMZ (25 hosts)`, `App-Servers (50 hosts)`, and `Database-Backend (12 hosts)`.
     2. **Physical media & IANA port policy:** Select UTP vs. SMF/MMF fiber + `STP/RSTP` switch uplinks and classify listening port tiers (`443` HTTPS, `5432` PostgreSQL, ephemeral client range `49152–65535`).
     3. A concise **7-Step Network Troubleshooting Runbook** referencing `ping`, `traceroute`, `nslookup`, and `ss`/`netstat` for HTTP gateway outages.
