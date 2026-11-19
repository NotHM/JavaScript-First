# Unit 2 Setup & Standards Guide: Node HTTP Ports, `curl`, Express ESM & Network CLI Triage

**Unit:** 02 — Internet Protocols, Cloud Models, Node.js HTTP, Express SSR & Subnetting/Routing  
**Navigation:** [Chapter 2 Reading](./readme.md) · [Unit 2 Guide](./unit-guide.md) · [50-Question Exam](./quizzes/unit-test-50.md)

Complete this setup checklist before building your Node HTTP routers and subnet calculators across [`../0-student_files/03-http-server/`](../0-student_files/03-http-server/), [`../0-student_files/02-subnetting-routing/`](../0-student_files/02-subnetting-routing/), and [`../0-student_files/projects/unit-02-http-router/`](../0-student_files/projects/unit-02-http-router/).

---

## 1. Required Toolchain & Network Utilities

| Tool | Target / Flag | Purpose in Unit 2 |
|---|---|---|
| **Node.js 24 LTS** | `node -v` (`>= v22.12`) | `node:http`, built-in `fetch()`, `Buffer.byteLength`, `node:test` |
| **curl** | `curl -i` / `curl -X POST` | Inspect raw HTTP status lines, `Content-Type`, and `Content-Length` headers |
| **Socket Inspector (`ss` / `netstat`)** | `ss -tulnp` / `netstat -an` | Spot active listening ports (`7000`, `443`, `5432`) and fix `EADDRINUSE` |
| **IP & DNS CLI** | `ip addr`, `dig` / `nslookup`, `ping`, `traceroute` | Inspect local subnet CIDRs, DNS resolution (`L7`), ICMP reachability (`L3`) |
| **Express (Optional Sandbox)** | `express@^4` or `^5` | Compare `express.static()` + `app.get()` against zero-dep `node:http` |

---

## 2. HTTP Server & Port Isolation Standards

### A. Bind `127.0.0.1` Safely & Isolate Tests with Ephemeral Port `0`
Hardcoding `.listen(7000)` at top-level module scope causes **two catastrophic issues**:
1. Importing the file from `node --test` immediately binds port `7000`, hangs the event loop forever, and breaks CI grading.
2. Two parallel tests collide with `Error: listen EADDRINUSE: address already in use 127.0.0.1:7000`.

Always follow the **Exportable Server Factory + Guarded Listen** standard across all Unit 2 CJS and ESM servers:
```js
// CommonJS (.js)
if (require.main === module) {
  createAppServer().listen(7000, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:7000');
  });
}

// ES Module (.mjs)
import { pathToFileURL } from 'node:url';
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  createSsrAppServer({ publicDir: './public' }).listen(0, '127.0.0.1');
}
```
Inside tests, pass `server.listen(0, '127.0.0.1', resolve)` so the OS kernel assigns an unused ephemeral port (`49152–65535`), read `const { port } = server.address()`, send `fetch()` requests, and always close in `finally { server.closeAllConnections?.(); await new Promise(r => server.close(r)); }`.

### B. Inspecting Live Endpoints with `curl -i`
When manually running your server on port `7000`, test every status code (`200`, `404`, `405`) and byte header in a second terminal:
```bash
curl -i http://127.0.0.1:7000/                  # Expect 200 OK + text/html; charset=utf-8
curl -i http://127.0.0.1:7000/api/health        # Expect 200 OK + application/json
curl -i -X POST http://127.0.0.1:7000/api/health # Expect 405 Method Not Allowed
curl -i --path-as-is http://127.0.0.1:7000/public/../../.env # Expect 403/404 traversal block!
```

### C. Express ESM & Modular SSR Configuration
When working with modular SSR projects (`Lesson 2.3`):
1. Set `"type": "module"` in `package.json` or name files explicitly `.mjs`.
2. Derive static paths cleanly with `path.join(import.meta.dirname, 'public')` (Node `>= 20.11` / `24 LTS`) or `path.dirname(fileURLToPath(import.meta.url))`.
3. Never install `express` inside shared student directories that expect zero-dependency `node:http`—compare patterns against [`expressVsNodeSsrDemo.mjs`](./03-Express-and-SSR/code/expressVsNodeSsrDemo.mjs).

### D. Network Interface, Socket & VLSM Verification (`Lesson 2.4`)
Inspect active sockets, local routing prefixes, and DNS resolution using Linux/WSL networking tools:
```bash
ip addr show                      # Confirm local IPv4/IPv6 CIDR masks (verify no 169.254.x.x APIPA)
ip route                          # View longest-prefix routes and default gateway (0.0.0.0/0)
ss -tulnp                         # Show listening TCP/UDP sockets, ports, and owning processes
dig +short example.org            # Query DNS A records (fallback: nslookup example.org)
```

---

## 3. Setup Verification Commands

Run these commands from the repository root to verify your Unit 2 demos and reference suites cleanly:

```bash
node -v && curl --version | head -n 1
node 02-HTTP/01-Internet-Protocols-and-Cloud/code/protocolInspectorDemo.js
node 02-HTTP/02-Node-HTTP-Server/code/httpRouterDemo.js
node --test 02-HTTP/03-Express-and-SSR/code/expressVsNodeSsrDemo.mjs
node 02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/code/subnetAndRoutingDemo.mjs
node --test 02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/code/subnetAndRoutingDemo.test.mjs
```

---

## 4. Red → Green `node --test` TDD Workflow for Unit 2

Run the automated Unit 2 test suites to verify your starter labs and capstone router:

```bash
# Check overall Unit 2 progress (starts RED before implementing TODOs)
npm run grade -- --unit 02

# Run individual Unit 2 TDD test suites for fast debugging
node --test 0-student_files/03-http-server/httpAndProtocolLab.test.js
node --test 0-student_files/02-subnetting-routing/subnetCalculatorLab.test.mjs
node --test 0-student_files/projects/unit-02-http-router/index.test.js

# Strict grading gate (must exit 0 before project submission)
node tools/grade.mjs --unit 02 --strict
```

---

## 5. Common Setup Error Triage Table

| Symptom | Root Cause | Exact Command / Fix |
|---|---|---|
| `Error: listen EADDRINUSE :::7000` | Another terminal or stray background Node process holds port `7000` | Check PID with `ss -tulnp \| grep 7000` and stop old server (`kill <PID>`), or use `listen(0)` in tests |
| `node --test` hangs forever and times out | `server.listen()` called unconditionally at top level without `require.main === module` guard | Wrap `.listen()` inside `if (require.main === module)` and call `server.closeAllConnections?.()` |
| Truncated JSON / HTML body (`Parse Error: Expected chunk`) | Used `body.length` (UTF-16 units) instead of `Buffer.byteLength(body, 'utf8')` with emojis/accents | Replace `body.length` with `Buffer.byteLength(body, 'utf8')` in `Content-Length` |
| `curl` downloads HTML instead of rendering, or JSON displays raw text | Missing or wrong `Content-Type` header | Explicitly send `'Content-Type': 'text/html; charset=utf-8'` or `'application/json'` |
| Host receives `169.254.x.x` and cannot reach `0.0.0.0/0` gateway | DHCP server unreachable; OS fell back to APIPA link-local IP | Verify VLAN/link status, `ip addr`, and renew DHCP lease (`dhclient -r && dhclient`) |
| `VLSM allocation overlaps existing subnet` error | Sorted department host demands smallest-first instead of largest-first | Sort demands descending by required host count (`hosts + 2`) before allocating blocks |
