# Unit 2 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. **B** (`HTTPS`) | 2. IaaS = `EC2` / FaaS = `Lambda` | 3. `4xx` / `2xx` | 4. IPv4's 32-bit space (`~4.3B` addresses) exhausted; IPv6 (128-bit) supplies $3.4 \times 10^{38}$ addresses for IoT/cloud growth | 5. `BLE` (Bluetooth Low Energy) | 6. `Content-Type` | 7. Edge servers terminate TLS/serve content physically closer to users + skip origin trips/db work | 8. Clients treat error HTML as valid content, cache bad pages, and automated API callers miss error states.

## Post-Unit Key (12 pts)
1. `SSH`: encrypted remote shell; `SFTP`: encrypted SSH file transfer; `IMAP`: mail retrieval keeping server sync; `HTTPS`: TLS-encrypted HTTP.
2. **IaaS** controls OS/runtime (`max control, max ops`); **PaaS** pushes code while host manages OS/scaling; **FaaS** deploys single event functions billing per ms (`min ops, cold-start tradeoffs`).
3. `300 KB` crosses wire (`900 KB` saved); `900 / 200 = 4.5s saved`.
4. `res.writeHead(201, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) });`
5. `Wi-Fi` (and NFC/BLE) fail at 5 miles; **LTE Cellular** (or LPWAN/LoRa) reaches miles over carrier towers.
6. UTF-8 multi-byte characters (`🚀` = 4 bytes vs `length = 2` UTF-16 code units) truncate payload mid-stream!
7. **2 pts:** Startup -> **FaaS** (zero idle cost, auto-scales spikes cleanly); Bank -> **IaaS** (or hybrid bare-metal for OS/kernel/compliance isolation).
8. **2 pts:** Put Nginx/Cloudflare Reverse Proxy + CDN in front with `Cache-Control: public, max-age=31536000, immutable` so edge PoPs serve `2 MB` binary assets without waking Node workers.
9. **2 pts:** Checks `if (req.method === 'GET' && req.url === '/api/health')` -> `200` `JSON.stringify({ ok: true })` with `application/json`; else `404` `JSON.stringify({ error: 'Not Found' })`.
