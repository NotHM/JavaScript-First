---
title: "Lesson 2.1 — Internet Protocols, Cloud Models & IoT (Std 8.0)"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 2.1: Internet Protocols, Cloud & IoT
**AZ CTE Standard 8.0 (`8.1`–`8.6`)**

---

### `[L1 Remember]` Essential Protocols (`Std 8.2`)

- **HTTP (80)** vs **HTTPS (443 TLS)**
- **SSH (22)** & **SFTP (22 TLS-free / SSH encrypted)**
- **IMAP (993)** — multi-device email inbox sync
- **IPv4 (32-bit)** → **IPv6 (128-bit)** solves address exhaustion

---

### `[L2 Understand -> L5 Evaluate]` Cloud Models (`Std 8.1, 8.5`)

| Tier | You Manage | Provider Manages |
|---|---|---|
| **IaaS** | OS + Runtime + App | Physical servers & network |
| **PaaS** | App Code & Config | OS, scaling & patching |
| **FaaS** | Single Event Function | Containers, idle scaling & OS |
| **SaaS** | User Settings & Data | Everything |

---

### `[L3 Apply -> L4 Analyze]` Web Performance Math (`Std 8.4`)

`Transfer Time = Compressed Size / Bandwidth + Round-Trip Latency`
- **Brotli/Gzip:** Shrinks 1 MB JS text to ~250 KB.
- **CDN Edge Cache:** Cuts ocean RTT from `180ms` down to `15ms`.

---

### `[L5 Evaluate]` IoT Radios (`Std 8.6`)

- **NFC:** ~4 cm contactless tap payments
- **BLE:** Coin-cell battery wearables
- **Wi-Fi:** High-throughput home cameras
- **LTE Cellular:** Off-grid rural fleet telemetry

> **Lab:** Run `node 02-HTTP/01-Internet-Protocols-and-Cloud/code/protocolInspectorDemo.js` & complete `protocolLab.js`!
