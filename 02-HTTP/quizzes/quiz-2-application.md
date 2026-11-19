# Unit 2 Quiz 2: HTTP Servers, Headers, Express SSR & Cloud Tradeoffs (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds & Certs:** `8.3–8.6, 11.3–11.7, 1.5, 15.6`, `CCNA`, `CompTIA-A+`, `CompTIA-Sec+`, `CIW-JS`, `ITS-HTML-CSS`

| # | Question | Correct Answer | Time | Bloom's & Tag |
|---|---|---|---|---|
| 1 | A `POST /api/orders` creates a database record. Best HTTP status? | **`201 Created`** | 20s | `[L3 \| 11.4 \| Cert: CIW-JS]` |
| 2 | A client calls an undefined route `/ghost`. Server should reply: | **`404 Not Found`** | 20s | `[L3 \| 11.4 \| Cert: CIW-JS]` |
| 3 | Client requests `DELETE` on a `GET`-only route. Return status: | **`405 Method Not Allowed`** | 30s | `[L4 \| 11.4 \| Domain: CTE-Lab]` |
| 4 | Serving UTF-8 `"Hi 👋"` with `str.length` instead of `Buffer.byteLength` fails because: | **Multi-byte char counts differ** | 30s | `[L4 \| 11.5 \| Domain: CTE-Lab]` |
| 5 | Client receives JSON text rendered verbatim instead of parsed. Missing header? | **`Content-Type: application/json`** | 20s | `[L4 \| 11.5 \| Cert: CIW-JS]` |
| 6 | Best wireless tech for solar field sensors 4 km away from Wi-Fi? | **LTE Cellular / LPWAN** | 20s | `[L5 \| 8.6 \| Cert: CompTIA-A+]` |
| 7 | Which server role sits in front of Node apps terminating TLS & routing load? | **Reverse Proxy (Nginx)** | 20s | `[L3 \| 8.3 \| Cert: CompTIA-Sec+]` |
| 8 | Why deploy Single-Mode Fiber (`SMF`) + `RSTP` for 450m dual uplinks near high-voltage conduits? | **SMF is EMI-free (`10+ km`) & RSTP stops L2 loops** | 30s | `[L5 \| ADE 6.0 \| Cert: CCNA]` |
| 9 | Which HTML form setup sends credentials in the HTTP request body rather than the URL query string? | **`<form method="POST">`** | 20s | `[L3 \| 15.6 \| Cert: ITS-HTML-CSS]` |
| 10 | Why inspect `req.method` alongside `req.url` in `node:http`? | **Same URL serves GET vs POST** | 20s | `[L4 \| 11.6 \| Domain: CTE-Lab]` |
| 11 | Why wrap user names with `escapeHtml()` inside SSR template strings? | **Block script XSS injection** | 20s | `[L3 \| 15.6 \| Cert: CompTIA-Sec+]` |
| 12 | A static file handler must reject `../../.env` requests with what check? | **`path.resolve` prefix boundary check** | 30s | `[L4 \| 1.5 \| Cert: CompTIA-Sec+]` |
| 13 | How many usable host IPs does a `/26` IPv4 subnet (`255.255.255.192`) offer? | **`62 hosts`** (`64 - 2`) | 30s | `[L3 \| ADE 6.0 \| Cert: CCNA]` |
| 14 | Router holds `0.0.0.0/0` (`eth0`) and `10.50.12.0/24` (`eth2`, metric 50). How routes `10.50.12.77`? | **`eth2` longest-prefix `/24` wins** | 30s | `[L4 \| ADE 6.0 \| Cert: CCNA]` |
| 15 | Host has `169.254.18.9` and fails gateway ping. What failed and Step 1? | **DHCP failed (APIPA) / Identify problem** | 30s | `[L4 \| ADE 10.1 \| Cert: CompTIA-A+]` |
