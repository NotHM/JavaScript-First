# Unit 2 Quiz 2: HTTP Servers, Headers & Cloud Tradeoffs (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `8.3–8.6, 11.3–11.7`

| # | Question | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | A `POST /api/orders` creates a database record. Best HTTP status? | **`201 Created`** | 20s | `[L3 \| 11.4]` |
| 2 | A client calls an undefined route `/ghost`. Server should reply: | **`404 Not Found`** | 20s | `[L3 \| 11.4]` |
| 3 | Client requests `DELETE` on a `GET`-only route. Return status: | **`405 Method Not Allowed`** | 30s | `[L4 \| 11.4]` |
| 4 | Serving UTF-8 `"Hi 👋"` with `str.length` instead of `Buffer.byteLength` fails because: | **Multi-byte char counts differ** | 30s | `[L4 \| 11.5]` |
| 5 | Client receives JSON text rendered verbatim instead of parsed. Missing header? | **`Content-Type: application/json`** | 20s | `[L4 \| 11.5]` |
| 6 | Best wireless tech for solar field sensors 4 km away from Wi-Fi? | **LTE Cellular / LPWAN** | 20s | `[L5 \| 8.6]` |
| 7 | Which server role sits in front of Node apps terminating TLS & routing load? | **Reverse Proxy (Nginx)** | 20s | `[L3 \| 8.3]` |
| 8 | A 100 KB script gzips by 80%. How many KB travel over the network? | **`20 KB`** | 20s | `[L3 \| 8.4]` |
| 9 | You need zero server admin for an image thumbnailer triggered twice/hr: | **FaaS (Serverless Function)** | 30s | `[L5 \| 8.5]` |
| 10 | Why inspect `req.method` alongside `req.url` in `node:http`? | **Same URL serves GET vs POST** | 20s | `[L4 \| 11.6]` |
