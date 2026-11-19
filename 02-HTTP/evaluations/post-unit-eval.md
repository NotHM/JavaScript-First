# Unit 2 Post-Unit Evaluation: Protocols, Subnetting, Routing, Cloud, HTTP & SSR (`Std 8.0, 11.3–11.7 | ITS 102`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 18`

### Part A (1 pt each)
1. **`[L1 | 8.2]`** State the primary purpose of each protocol: `SSH` (`____`), `SFTP` (`____`), `IMAP` (`____`), `HTTPS` (`____`).
2. **`[L2 | 8.5]`** Compare control vs. management overhead across **IaaS**, **PaaS**, and **FaaS**:  
   > *(Your comparison)*
3. **`[L3 | 8.4]`** A `1,200 KB` JS bundle compresses 75% via Gzip/Brotli. How many **KB** cross the wire now, and how much time is saved on a `200 KB/s` mobile link?  
   > `________ KB` | `____ s saved`
4. **`[L3 | 11.5]`** Write the Node `res.writeHead(...)` call returning status `201`, JSON MIME type, and UTF-8 `Content-Length` for variable `payload`.  
   > `____________________________________________________`
5. **`[L4 | 8.6]`** Compare **NFC**, **BLE**, **Wi-Fi**, and **LTE Cellular** for battery life, bandwidth, and range. Which fails for an off-grid agricultural sensor 5 miles from Wi-Fi? `________`
6. **`[L4 | 11.6]`** Spot why serving UTF-8 emoji `"🚀"` using `'Content-Length': body.length` instead of `Buffer.byteLength(body)` corrupts HTTP responses.  
   > *(Your diagnosis)*
7. **`[L3 | 11.7]`** Write the Express line that serves `./public` assets under URL prefix `/public`, and name the `package.json` key that enables ES `import` in `.js` files:  
   > `____________________________________________________` | `________________`
8. **`[L4 | 1.5, 15.6]`** Why must modular SSR escape template variables AND validate `path.resolve(rootDir, file).startsWith(rootDir + path.sep)` on static routes?  
   > *(Your diagnosis)*
9. **`[L3 | ITS 102 / ADE 6.0]`** For CIDR block **`192.168.50.70/26`**, compute the **Network ID**, **Broadcast Address**, **Usable Host Range**, and **Wildcard Mask**:  
   > Network: `______________` | Range: `________________________` | Broadcast: `______________` | Wildcard: `____________`
10. **`[L2–L4 | ADE 8.1–8.5]`** Classify IANA port tiers for **`53`**, **`3306`**, and **`54010`**, and state which route wins for destination `10.10.4.25` between `0.0.0.0/0` (metric 1), `10.10.0.0/16` (metric 5), and `10.10.4.0/24` (metric 50):  
    > *(Your classification & route winner)*

### Part B — Higher-Order Evaluation & Design (2 pts each)
11. **`[L5 | 8.1, 8.5]`** A 2-person startup launches a spike-heavy webhook listener that sits idle 22 hours/day, while a bank runs custom kernel-tuned financial databases. Recommend **IaaS vs. PaaS vs. FaaS** for each and defend!  
    > *(Your recommendation)*
12. **`[L5 | 8.3, 8.4]`** A Node server receives 5,000 requests/sec for a `2 MB` hero image. Design an architecture using **Reverse Proxy + CDN + HTTP Cache headers** rather than serving `fs.readFile` from Node per request, and note when **bare `node:http` SSR** beats **Express.js**.  
    > *(Your defense)*
13. **`[L6 | 11.4, 18.3]`** Write a complete `node:http` handler returning `200` JSON on `GET /api/health` and `404` JSON on any unknown URL:  
    ```javascript
    // Write handler(req, res):
    ```
14. **`[L5 | ITS 102 / ADE 3.0, 7.0, 10.1–10.6]`** Given **`10.90.0.0/24`**, compute non-overlapping **VLSM CIDRs** (largest-first) for `Students (100 hosts)` + `Faculty (25 hosts)` + `WAN-P2P (2 hosts)`, prescribe **SMF fiber + `STP/RSTP` + `WPA3`/`5G CBRS`** for a `500 m` campus deployment, and summarize how `ping`, `traceroute`, `nslookup`, and `ss` fit inside the **7-Step Troubleshooting Methodology**:  
    > *(Your VLSM plan & architecture triage defense)*
