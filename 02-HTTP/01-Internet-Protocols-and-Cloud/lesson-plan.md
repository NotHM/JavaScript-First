# Lesson Plan 2.1: Internet Protocols, Cloud Models & IoT (`Std 8.0`)

**Unit:** Unit 2 | **Duration:** 3 Class Periods × 50 min | **Stds:** `8.1`–`8.6`

## Bloom's Objective Ladder
- **L1–L2:** Classify transport/app protocols (HTTP/HTTPS/SSH/SFTP/IMAP/IPv6), Web server roles, Cloud tiers (SaaS/PaaS/IaaS/FaaS), and IoT wireless standards.
- **L3 Apply:** Inspect URLs cleanly via `node:url` and compute Gzip compression transfer time reductions.
- **L4 Analyze:** Separate bandwidth throughput effects from round-trip latency (RTT) across geographic origins vs CDNs.
- **L5 Evaluate:** Match cloud models (`FaaS` vs `PaaS` vs `IaaS`) and IoT radios (`NFC`/`BLE`/`Wi-Fi`/`LTE`) to real engineering budgets.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 2.1 Bell-Ringer (4m), Slides + Protocol/Port Board Activity (25m), Worksheet Part A (15m).
- **Day 2–3:** Performance & Cloud Tradeoff walkthrough + `protocolLab.js` coding (`protocolInspectorDemo.js` reference), Post-Lesson 2.1 Exit Ticket.
- **Pre 2.1 Key:** 1) `443` / `80`; 2) PaaS manages OS/scaling for app pushes whereas IaaS hands raw VMs/OS control to the developer; 3) `75%`; 4) `NFC`.
- **Post 2.1 Key:** 1) `SSH`, `IMAP`; 2) 32-bit IPv4 (`4.3B` addresses) ran out with global mobile/IoT growth; 128-bit IPv6 fixes depletion; 3) `120 KB`; 4) High RTT delays every handshake/TLS/packet ACK regardless of pipe width; 5) `FaaS` for intermittent 2s thumbnailing (zero idle bill); `IaaS` for custom compliance Linux VM control.
- **Worksheet Part A & C Key:** Part C: `4,000 KB / 500 KB/s = 8.0s + 0.12s = 8.12s`; Compressed+CDN: `1,000 KB / 500 KB/s = 2.0s + 0.015s = 2.015s`.
