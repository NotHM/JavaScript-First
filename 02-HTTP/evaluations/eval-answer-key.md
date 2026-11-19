# Unit 2 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (13 pts)
1. **B** (`HTTPS`) | 2. IaaS = `EC2` / FaaS = `Lambda` | 3. `4xx` / `2xx` | 4. IPv4's 32-bit space (`~4.3B` addresses) exhausted; IPv6 (128-bit) supplies $3.4 \times 10^{38}$ addresses for IoT/cloud growth | 5. `BLE` (Bluetooth Low Energy) | 6. `Content-Type` | 7. Edge servers terminate TLS/serve content physically closer to users + skip origin trips/db work | 8. Clients treat error HTML as valid content, cache bad pages, and automated API callers miss error states | 9. `express.static(...)` | 10. Allows **XSS (Cross-Site Scripting)** if `name` contains `<script>` tags | 11. MAC framing = **Layer 2 (`Data Link`)**, IP routing = **Layer 3 (`Network`)**, Well-Known IANA Ports = **`0–1023`** | 12. Copper UTP hits a **`100 m`** run limit and suffers EMI/surge hazards outdoors whereas **`SMF` fiber** reaches `10+ km` with zero EMI; **`10.0.0.0/8`** is RFC 1918 private (`169.254.0.0/16` is APIPA failure fallback) | 13. **`169.254.21.9` = APIPA** indicating **DHCP failed** (`UDP 67/68`); Troubleshooting Step 1 = **Identify the problem** (gather scope, check physical link/changes) before editing rules.

## Post-Unit Key (18 pts)
1. `SSH`: encrypted remote shell; `SFTP`: encrypted SSH file transfer; `IMAP`: mail retrieval keeping server sync; `HTTPS`: TLS-encrypted HTTP.
2. **IaaS** controls OS/runtime (`max control, max ops`); **PaaS** pushes code while host manages OS/scaling; **FaaS** deploys single event functions billing per ms (`min ops, cold-start tradeoffs`).
3. `300 KB` crosses wire (`900 KB` saved); `900 / 200 = 4.5s saved`.
4. `res.writeHead(201, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) });`
5. `Wi-Fi` (and NFC/BLE) fail at 5 miles; **LTE Cellular** (or LPWAN/LoRa) reaches miles over carrier towers.
6. UTF-8 multi-byte characters (`🚀` = 4 bytes vs `length = 2` UTF-16 code units) truncate payload mid-stream!
7. `app.use('/public', express.static(path.join(dir, 'public')))` | `"type": "module"`.
8. Escaping blocks **XSS** script injection in HTML templates (`15.6`); `path.resolve()` prefix check blocks `../` **Path Traversal** reading server secrets like `.env` (`1.5`).
9. Network = **`192.168.50.64`** | Range = **`192.168.50.65–192.168.50.126`** | Broadcast = **`192.168.50.127`** | Wildcard = **`0.0.0.63`**.
10. `53` = **Well-Known** (`DNS`), `3306` = **Registered** (`MySQL`), `54010` = **Dynamic/Ephemeral**; **`10.10.4.0/24`** wins via **Longest-Prefix Match** (`/24 > /16 > /0`) despite metric 50.
11. **2 pts:** Startup -> **FaaS** (zero idle cost, auto-scales spikes cleanly); Bank -> **IaaS** (or hybrid bare-metal for OS/kernel/compliance isolation).
12. **2 pts:** Put Nginx/Cloudflare Reverse Proxy + CDN in front with `Cache-Control: public, max-age=31536000, immutable` so edge PoPs serve `2 MB` binary assets without waking Node workers; choose bare `node:http` SSR for ultra-low cold starts/zero npm CVEs vs. Express for rich middleware & rapid multi-route apps.
13. **2 pts:** Checks `if (req.method === 'GET' && req.url === '/api/health')` -> `200` `JSON.stringify({ ok: true })` with `application/json`; else `404` `JSON.stringify({ error: 'Not Found' })`.
14. **2 pts:** **VLSM (`10.90.0.0/24` largest-first):** `Students (100 -> /25)` = **`10.90.0.0/25`**, `Faculty (25 -> /27)` = **`10.90.0.128/27`**, `WAN-P2P (2 -> /30)` = **`10.90.0.160/30`**. Prescribe **`SMF` fiber** (`500 m` long-haul, zero EMI), **`STP/RSTP`** to block redundant switch loops while enabling automatic failover, **`WPA3`** (indoors) / **`5G CBRS`** (outdoors); integrate `ping` (L3), `traceroute` (L3 hops), `nslookup` (L7 DNS), and `ss` (L4 sockets) inside Step 3 (*Test the theory*) & Step 6 (*Verify & prevent*) of the 7-Step Troubleshooting sequence (`Identify -> Theory -> Test -> Plan -> Implement -> Verify/Prevent -> Document`).
