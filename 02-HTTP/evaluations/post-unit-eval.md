# Unit 2 Post-Unit Evaluation: Protocols, Cloud & Node HTTP (`Std 8.0, 11.3–11.7`)

**Name:** `______________________` **Date:** `__________` **Post-Score:** `____ / 12`

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

### Part B — Higher-Order Evaluation & Design (2 pts each)
7. **`[L5 | 8.1, 8.5]`** A 2-person startup launches a spike-heavy webhook listener that sits idle 22 hours/day, while a bank runs custom kernel-tuned financial databases. Recommend **IaaS vs. PaaS vs. FaaS** for each and defend!  
   > *(Your recommendation)*
8. **`[L5 | 8.3, 8.4]`** A Node server receives 5,000 requests/sec for a `2 MB` hero image. Design an architecture using **Reverse Proxy + CDN + HTTP Cache headers** rather than serving `fs.readFile` from Node per request.  
   > *(Your defense)*
9. **`[L6 | 11.4, 18.3]`** Write a complete `node:http` handler returning `200` JSON on `GET /api/health` and `404` JSON on any unknown URL:  
   ```javascript
   // Write handler(req, res):
   ```
