# Unit 2 Mastery Exam: Protocols, Cloud, Node HTTP, Express SSR & Subnetting (50 Questions)

**Course:** JavaScript First — Software & App Design (`AZ CTE Stds 8.0, 11.3–11.7, 1.5, 15.6` | `West-MEC ITS 102 / CCNA 200-301`)  
**Reading & Setup:** [Chapter 2 Reading](../readme.md) · [Setup Guide](../setup-guide.md)  
**Directions:** Select the single best choice (`A`, `B`, `C`, or `D`) for items `1.` through `50.`.

---

## Part A: Foundations & Terminology (`[L1 Remember]` — Questions 1–10)

1. What are the standard well-known TCP ports for unencrypted `HTTP` and TLS-encrypted `HTTPS`?
   - A) `21` and `22`
   - B) `80` and `443`
   - C) `143` and `993`
   - D) `8080` and `3389`

2. Which well-known TCP port handles both encrypted remote `SSH` terminal sessions and `SFTP` file transfers?
   - A) Port `21`
   - B) Port `25`
   - C) Port `22`
   - D) Port `53`

3. Which cloud computing model runs stateless event-driven functions billed strictly per invocation and execution milliseconds?
   - A) IaaS
   - B) FaaS (Serverless)
   - C) SaaS
   - D) On-Premises Bare Metal

4. Which IoT wireless standard operates under `4 cm` at passive/ultra-low power for contactless transit cards and badge taps?
   - A) NFC
   - B) Wi-Fi (`802.11ax`)
   - C) 5G CBRS
   - D) Single-Mode Fiber

5. Which HTTP status code family signals a client-side request error such as `404 Not Found` or `405 Method Not Allowed`?
   - A) `2xx`
   - B) `3xx`
   - C) `4xx`
   - D) `5xx`

6. Which `package.json` setting instructs Node.js to parse `.js` files inside that package as ES Modules (`import`/`export`)?
   - A) `"module": true`
   - B) `"type": "module"`
   - C) `"esm": "strict"`
   - D) `"engines": "esm"`

7. Which two OSI layers handle MAC-based Ethernet frame switching (`STP`) versus IPv4/IPv6 packet routing (`Routers`)?
   - A) Layer 1 Physical and Layer 7 Application
   - B) Layer 2 Data Link and Layer 3 Network
   - C) Layer 4 Transport and Layer 5 Session
   - D) Layer 3 Network and Layer 6 Presentation

8. What is the maximum standardized cable segment length for `Cat6` / `Cat6a` UTP copper Ethernet (`RJ45`)?
   - A) `25 meters`
   - B) `50 meters`
   - C) `100 meters`
   - D) `550 meters`

9. Which three CIDR blocks comprise the private, non-publicly-routable `RFC 1918` IPv4 address spaces?
   - A) `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
   - B) `127.0.0.0/8`, `169.254.0.0/16`, `224.0.0.0/4`
   - C) `172.16.0.0/16`, `192.0.2.0/24`, `8.8.8.0/24`
   - D) `11.0.0.0/8`, `172.32.0.0/12`, `192.169.0.0/16`

10. Which IANA port range is reserved for **Dynamic / Ephemeral** outbound client source ports?
   - A) `0–1023`
   - B) `1024–4095`
   - C) `1024–49151`
   - D) `49152–65535`

---

## Part B: Concepts & Comparisons (`[L2 Understand]` — Questions 11–20)

11. Why was 128-bit `IPv6` engineered alongside 32-bit `IPv4`?
   - A) IPv4 packets cannot carry HTTPS or JSON payloads
   - B) To eliminate 32-bit public address exhaustion (~4.3B) and reduce mandatory NAT complexity
   - C) IPv6 runs exclusively over Cat6a copper without switches
   - D) IPv6 replaces TCP ports with MAC addresses

12. How do `SFTP` and `FTPS` differ at the transport/security layer?
   - A) `SFTP` runs securely over an `SSH` channel (port `22`), whereas `FTPS` wraps legacy FTP inside `TLS`
   - B) `SFTP` transmits passwords in plaintext, whereas `FTPS` encrypts via `UDP`
   - C) `SFTP` works only for email sync, whereas `FTPS` serves static HTML
   - D) Both are identical plaintext aliases for `HTTP/1.1`

13. How does a **Content Delivery Network (CDN)** speed up web page loads for geographically distant users?
   - A) By disabling TLS encryption to skip certificate handshakes
   - B) By caching static assets at edge servers close to users, cutting round-trip latency
   - C) By converting JavaScript files into synchronous blocking scripts
   - D) By forcing every static image through the database server

14. Why must Node HTTP modules export `createAppServer()` separately from calling `server.listen(7000)`?
   - A) Node crashes whenever `createServer` and `listen` appear in the same repo
   - B) `node:http` rejects requests on port `7000` unless Express is imported
   - C) Automated `node:test` suites can import the server and bind ephemeral port `0` without hanging or colliding (`EADDRINUSE`)
   - D) `Buffer.byteLength` only works when `listen()` is omitted

15. Why does `express.static()` provide stronger default safety than naive `fs.readFile('.' + req.url)` handlers?
   - A) It automatically encrypts every CSS file with AES-256
   - B) It handles MIME Content-Type headers, caching tags, and blocks `../` directory traversal escapes
   - C) It converts every JavaScript file into static HTML at runtime
   - D) It removes the need for TCP sockets

16. Why should engineers deploy **Single-Mode Fiber (`SMF`)** instead of `Cat6a UTP` for a `2 km` outdoor uplink near high-voltage conduits?
   - A) `Cat6a` stops at `10 m` and only carries UDP traffic
   - B) `SMF` transmits cheaper low-voltage DC power alongside Ethernet frames
   - C) `SMF` reaches `10+ km` via laser pulses with total immunity to electromagnetic interference (EMI)
   - D) `Cat6a` requires manual DNS lookups on every Ethernet frame

17. How does `WPA3` improve wireless security over legacy `WPA2-PSK` on `IEEE 802.11` networks?
   - A) It disables encryption on management frames so packets arrive faster
   - B) It uses Simultaneous Authentication of Equals (`SAE`) to prevent offline dictionary brute-force attacks
   - C) It shifts Wi-Fi traffic onto UDP port `22`
   - D) It binds every client permanently to `169.254.0.0/16`

18. Which contrast accurately compares `TCP` versus `UDP` at Layer 4 Transport?
   - A) `TCP` provides connection-oriented, ordered, lossless byte streams; `UDP` sends low-overhead connectionless datagrams suited for DNS/NTP/VoIP
   - B) `UDP` guarantees zero packet loss via a 3-way handshake; `TCP` drops packets intentionally
   - C) `TCP` only operates inside Layer 2 switches; `UDP` only runs on optical fiber
   - D) Neither `TCP` nor `UDP` uses source/destination port numbers

19. How does **Spanning Tree Protocol (`STP` / `RSTP`)** enable redundant dual switch uplinks without collapsing a LAN?
   - A) It doubles bandwidth by forcing broadcast frames to loop indefinitely across both uplinks
   - B) It elects a Root Bridge and places redundant links into Blocking/Discarding state until a primary link fails
   - C) It assigns RFC 1918 IPv4 addresses dynamically to switches
   - D) It turns Layer 2 switches into stateless FaaS workers

20. A workstation reports an IPv4 address of `169.254.42.19/16` (`APIPA`). What occurred?
   - A) A router assigned a high-speed public unicast address
   - B) IPv6 dual-stack mode successfully resolved an AAAA record
   - C) DHCP failed to respond, so the OS self-assigned a non-routable link-local address
   - D) An Express server misconfigured CORS headers

---

## Part C: Applied Calculation & Coding (`[L3 Apply]` — Questions 21–30)

21. A `1,000 KB` asset compresses `75%` via Gzip (`compressionRatio = 0.75`). Ignoring RTT, how long does transferring the compressed payload take over a `2,000 kbps` link (`1 KB = 8 kb`)?
   - A) `0.25 seconds`
   - B) `1.0 second`
   - C) `4.0 seconds`
   - D) `3.0 seconds`

22. Evaluate `'Hi 👋'.length` versus `Buffer.byteLength('Hi 👋', 'utf8')` in Node.js:
   - A) `5` code units and `5` bytes
   - B) `4` code units and `4` bytes
   - C) `5` UTF-16 code units versus `7` UTF-8 bytes
   - D) `7` UTF-16 code units versus `5` UTF-8 bytes

23. A REST endpoint handles `POST /api/students` and inserts a new student record into storage. Which HTTP status code is most appropriate?
   - A) `204 No Content`
   - B) `201 Created`
   - C) `304 Not Modified`
   - D) `405 Method Not Allowed`

24. Which response header ensures a browser or test client parses a serialized `JSON.stringify(payload)` body as JSON rather than plain text?
   - A) `'Content-Type': 'application/json; charset=utf-8'`
   - B) `'Content-Encoding': 'utf-16'`
   - C) `'Accept-Ranges': 'html'`
   - D) `'X-Frame-Options': 'json'`

25. Which modular SSR helper safely neutralizes `<script>alert(1)</script>` user input inside HTML template literals (`Std 15.6`)?
   - A) `JSON.stringify(input)`
   - B) `escapeHtml()` replacing `&`, `<`, `>`, `"`, `'` with HTML entities
   - C) `Buffer.byteLength(input)`
   - D) `decodeURIComponent(input)`

26. Convert IPv4 address `192.168.10.25` into colon-separated hexadecimal octets (`ITS 102`):
   - A) `C0:A8:10:25`
   - B) `C0:A8:0A:19`
   - C) `B0:A8:0A:19`
   - D) `C0:98:0A:15`

27. How many **usable host IPv4 addresses** are available inside a `/26` subnet (`255.255.255.192`)?
   - A) `30`
   - B) `64`
   - C) `62`
   - D) `126`

28. Compute the **Network Address** and **Broadcast Address** for host `10.20.4.77/27` (`block size = 32`):
   - A) Network `10.20.4.0`, Broadcast `10.20.4.127`
   - B) Network `10.20.4.64`, Broadcast `10.20.4.95`
   - C) Network `10.20.4.64`, Broadcast `10.20.4.127`
   - D) Network `10.20.4.32`, Broadcast `10.20.4.63`

29. Using largest-first **VLSM** inside `10.60.0.0/24` for `App-Servers (50 hosts)`, `Public-DMZ (25 hosts)`, and `Database (12 hosts)`, which subnet is assigned **first**?
   - A) `App-Servers` receives `10.60.0.0/26` (`62` usable hosts) first
   - B) `Database` receives `10.60.0.0/28` (`14` usable hosts) first
   - C) `Public-DMZ` receives `10.60.0.0/27` (`30` usable hosts) first
   - D) All three subnets receive `/24` overlapping blocks

30. Inside an ES Module (`.mjs` or `"type": "module"` `.js`) on Node 24 LTS, how should you build the path to `./public` cleanly?
   - A) `path.join(__dirname, 'public')`
   - B) `path.join(import.meta.dirname, 'public')` (or `fileURLToPath(import.meta.url)`)
   - C) `require.resolve('./public')`
   - D) `process.cwd() + '/../etc/public'`

---

## Part D: Debugging & Architecture Analysis (`[L4 Analyze]` — Questions 31–40)

31. A client issues `DELETE /api/health`, which only supports `GET /api/health`. Which HTTP status code should the server return?
   - A) `200 OK`
   - B) `404 Not Found`
   - C) `405 Method Not Allowed`
   - D) `502 Bad Gateway`

32. A Node HTTP server returns JSON containing `"status": "ready 🚀"`, yet clients throw `SyntaxError: Unexpected end of JSON input`. Inspecting the headers reveals `'Content-Length': payload.length`. What is the root cause?
   - A) `JSON.stringify` forbids emoji characters
   - B) `.length` counts UTF-16 code units instead of UTF-8 bytes, causing the socket to clip the final bytes (`}` truncated)
   - C) Browsers strip trailing braces on `application/json`
   - D) `req.method` changed mid-request

33. Running `node --test server.test.js` passes all assertions and then **hangs indefinitely** until killed. What bug most likely exists in `server.js`?
   - A) `server.listen(7000)` executes unconditionally at top level instead of inside `if (require.main === module)` (or tests fail to call `server.close()`)
   - B) `Buffer.byteLength` opens an infinite TCP socket
   - C) `escapeHtml()` blocks Node's event loop
   - D) ES modules disallow `node:test`

34. A custom static server guards paths with `if (req.url.includes('..')) return 403;`, yet an attacker downloads `.env` using `GET /public/%2e%2e/.env`. Why did the guard fail?
   - A) `%2e%2e` runs on Layer 2 UDP instead of TCP
   - B) Node automatically redirects `403` responses to `.env`
   - C) Percent-encoded `%2e%2e` bypassed the raw substring check; safe code decodes first and verifies `path.resolve(rootDir, sub).startsWith(rootDir + path.sep)`
   - D) Express disables `path.resolve` on Windows/Linux

35. A router table contains: `0.0.0.0/0` via `eth0` (`metric 5`), `10.12.0.0/16` via `eth1` (`metric 10`), and `10.12.8.0/24` via `eth2` (`metric 50`). Which interface forwards a packet destined for `10.12.8.99`?
   - A) `eth0` because `metric 5` is lowest
   - B) `eth2` because `/24` is the longest matching prefix (`longest-prefix match`)
   - C) `eth1` because `/16` precedes `/24` numerically
   - D) Dropped because two routes overlap

36. Suppose two routes in a routing table match a destination with **identical `/24` prefix lengths** (`eth1` metric `10`, `eth2` metric `40`). How does the router break the tie?
   - A) Selects `eth1` with the lower Metric / Administrative Distance (`10`)
   - B) Splits traffic across UDP port `53`
   - C) Always falls back to `0.0.0.0/0`
   - D) Triggers an APIPA broadcast

37. Users report `https://grades.campus.local` fails to load. `ping 10.99.20.15` (the portal's IP) succeeds in `4 ms`, while `nslookup grades.campus.local` times out. Which OSI layer and IANA service are failing?
   - A) Layer 1 Physical fiber link
   - B) Layer 3 IPv4 routing gateway
   - C) Layer 7 Application — `DNS` (`port 53`)
   - D) Layer 2 Ethernet MAC table

38. Starting a server throws `Error: listen EADDRINUSE: address already in use 127.0.0.1:7000`. Which diagnostic command identifies the existing listening process on Linux?
   - A) `ping 127.0.0.1:7000`
   - B) `ss -tulnp | grep 7000`
   - C) `chmod 700 7000`
   - D) `traceroute 7000`

39. Why does allocating **VLSM** blocks **smallest-first** (e.g., `/28` before `/26`) inside `10.60.0.0/24` often trigger overlap errors or wasted space?
   - A) Larger blocks (`/26`, block size `64`) require aligned network multiples (`0`, `64`, `128`, `192`); placing `/28` first fragments aligned boundaries
   - B) VLSM forbids `/28` blocks inside RFC 1918 networks
   - C) Small subnets lack broadcast addresses
   - D) Largest-first is required by IEEE `802.11`

40. In `expressVsNodeSsrDemo.mjs`, what vulnerability occurs if `renderCatalogPage` interpolates `${item.name}` directly into HTML without `escapeHtml()`?
   - A) Cross-Site Scripting (XSS) allowing attacker-controlled `<script>` execution in visitors' browsers
   - B) `EADDRINUSE` socket exhaustion
   - C) Longest-prefix routing loops
   - D) `TypeError: Assignment to constant variable`

---

## Part E: Engineering Evaluation & Design (`[L5 Evaluate]` — Questions 41–50)

41. A fintech platform requires compiling a custom Linux kernel module, controlling virtual NIC firewall tables, and attaching persistent NVMe volumes. Which cloud tier fits best?
   - A) **IaaS** (`AWS EC2` / `GCE`)
   - B) **SaaS** (`Figma`)
   - C) **FaaS** (`AWS Lambda`)
   - D) Pure static CDN

42. An automated invoice-PDF thumbnailer runs for only `3 minutes` per day when triggered by webhook events and stays idle `23+ hours`. Which cloud model minimizes cost and maintenance?
   - A) Dedicated bare-metal rack
   - B) Always-on multi-node `IaaS` VMs
   - C) **FaaS / Serverless** functions billed strictly per invocation
   - D) Local `localhost:7000` workstation

43. A robotics team deploys solar soil-moisture nodes across a `5 km` rural orchard with zero Wi-Fi coverage. Which IoT wireless technology fits best?
   - A) `NFC` (`< 4 cm`)
   - B) `BLE` (`10–100 m`)
   - C) `Cat6a UTP` (`100 m`)
   - D) `LTE / 5G Cellular`

44. You are designing a tiny security-critical authentication proxy (`/api/health` + token check) requiring minimal third-party CVE risk and instant serverless cold starts. Evaluate `node:http` vs. Express.js:
   - A) Install 40 Express/body-parser plugins regardless of endpoints
   - B) Choose **zero-dependency `node:http`** to eliminate external npm CVEs and minimize startup footprint
   - C) Replace HTTP entirely with plaintext Telnet
   - D) Embed HTML pages inside `/tmp` without permissions checks

45. When is choosing **Express.js** clearly justified over writing raw `node:http` callbacks?
   - A) When serving a single static health-check JSON endpoint with zero static files
   - B) When building a multi-route REST + SSR web app needing `express.static()`, `express.json()`, `/users/:id` params, and standardized middleware chains
   - C) When the app has no HTTP interface
   - D) When trying to bypass `Buffer.byteLength` in UDP packets

46. A district connects two campus MDF closets `450 meters` apart across outdoor electrical transformer conduits with redundant dual uplinks. Recommend the optimal media and Layer 2 loop guard:
   - A) `Cat6a UTP` copper + disabled STP
   - B) `BLE` wireless mesh + `APIPA`
   - C) **Single-Mode Fiber (`SMF`)** immune to EMI + **`RSTP` (`802.1w`)** failover
   - D) `NFC` tap bridge + hub repeater

47. A modern cloud data center needs uniform low-latency **east-west** server-to-server paths so every rack (`leaf`) sits the exact same hop distance from every `spine` switch. Which topology fits?
   - A) Linear Daisy-Chain Bus
   - B) **Spine-Leaf (Clos fabric)**
   - C) Unmanaged Token Ring
   - D) Single-link Star hub

48. An industrial warehouse needs private licensed-grade wireless coverage across a `300 m` yard with deterministic mobility for autonomous carts (`3.5 GHz`). Which wireless standard fits?
   - A) `NFC`
   - B) Classic `802.15 BLE`
   - C) **Private `5G / CBRS` (`3.5 GHz`)**
   - D) Infrared (`IrDA`)

49. Two core routers share a dedicated fiber point-to-point link requiring strictly **2 host IPs** without wasting 50% of a `/30` (`4` total IPs). Which CIDR prefix does RFC 3021 enable?
   - A) `/31` (`2` usable point-to-point addresses)
   - B) `/32` (`1` host address)
   - C) `/24` (`254` host addresses)
   - D) `/16` (`65,534` host addresses)

50. In Step 5 of the **7-Step Network Troubleshooting Methodology**, you fix a faulty DNS entry on the campus nameserver. What MUST be completed in Steps 6 and 7 before closing the incident ticket?
   - A) Immediately reboot every switch without testing
   - B) Skip verification and delete all `journalctl` logs
   - C) Replace `SMF` fiber with `Cat6` copper
   - D) **Step 6:** Verify full end-to-end functionality and implement preventive measures; **Step 7:** Document findings, actions, and outcomes
