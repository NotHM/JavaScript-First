# Unit 2 Guide: Internet Protocols, Cloud Architecture & HTTP Servers

**Course:** JavaScript First — Software & App Design (AZ CTE CIP **11.0202.00**)  
**Semester Schedule:** Week 10 (Days 46–51 | 6 Class Periods × 50 Minutes)

## 1. Unit Overview
Unit 2 delivers full mastery of **AZ CTE Standard 8.0 (Internet Protocols, Cloud Service Models, Server Roles, Performance & IoT)** alongside **Standard 11.3–11.7 (Building HTTP Request/Response Servers in Node.js)**. Students analyze transport/application protocols (`HTTP`/`HTTPS`/`SSH`/`SFTP`/`IMAP`/`IPv4`/`IPv6`), evaluate `SaaS`/`PaaS`/`IaaS`/`FaaS`, compute bandwidth/latency budgets, and engineer a multi-route `node:http` server with JSON/HTML `Content-Type` headers and `404`/`405` error handling.

## 2. Arizona CTE Standards Alignment
| Standard | Official Indicators | Unit 2 Lessons |
|---|---|---|
| **Standard 8.0** — Internet Protocols, Cloud & IoT | `8.1` Cloud benefits; `8.2` HTTP/HTTPS/SSH/SFTP/FTPS/IPv6/IMAP; `8.3` Web/API/proxy/serverless roles; `8.4` Bandwidth, CDN, compression & performance; `8.5` SaaS/PaaS/IaaS/FaaS; `8.6` IoT (BLE/NFC/Wi-Fi/LTE) | **Lesson 2.1:** [`01-Internet-Protocols-and-Cloud/`](./01-Internet-Protocols-and-Cloud/readme.md) |
| **Standard 11.0 & 18.0** — Node HTTP Servers & Routing | `11.3–11.7` HTTP verbs, status families, headers, `node:http` routing & template HTML; `18.3` 404/500 responses | **Lesson 2.2:** [`02-Node-HTTP-Server/`](./02-Node-HTTP-Server/readme.md) |
| **AZ CTE Prof. Skills** | `1.0` Complex Communication; `3.0` Thinking & Innovation | HTTP cycle diagrams & zero-framework server routing |

## 3. Bloom's Taxonomy Progression Matrix (L1 → L6)
| Tier | Focus | Evidence |
|---|---|---|
| **L1 Remember** | State ports/roles for HTTP, HTTPS, SSH, SFTP, IMAP; list HTTP `2xx`/`3xx`/`4xx`/`5xx` status families & SaaS/PaaS/IaaS/FaaS | `pre-unit-eval.md`, Quiz 1 |
| **L2 Understand** | Contrast unencrypted HTTP vs. HTTPS/TLS, IPv4 vs. IPv6 address space, and IoT BLE vs. NFC vs. Wi-Fi tradeoffs | Slides, Lesson 2.1–2.2 |
| **L3 Apply** | Compute payload transfer times with gzip compression; code multi-route `node:http` handlers with correct headers | `0-student_files/03-http-server/` |
| **L4 Analyze** | Inspect MIME mismatches, `Content-Length` byte bugs, and missing `404`/`405` status codes in live server logs | Quiz 2, Post-Unit Eval |
| **L5 Evaluate** | Select IaaS vs. PaaS vs. FaaS and Edge/CDN strategies given traffic spikes, team size, and latency budgets | Post-Unit Eval Q8–Q9 |
| **L6 Create** | Engineer a **Multi-Route Node HTTP Service & Protocol Profiler** serving HTML/JSON/API routes + health telemetry | **Unit 2 Project** (`0-student_files/projects/unit-02-http-router/`) |
