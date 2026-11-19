# Student Lesson 2.4: Subnetting, OSI Topologies, Protocols & Troubleshooting

**Standards:** West-MEC `ITS 102` (`Cisco CCNA 200-301`) | **ADE:** `3.0, 6.0, 7.0, 8.1–8.5, 10.1–10.6`  
**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter Lab:** [`../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs`](../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs)

> **Instructions:** Complete Parts A through D independently without consulting instructor answer keys.

---

## Lesson SMART Objectives Checklist
- [ ] **Goal 1 (`[L1–L2]`):** Map binary/hex addressing, OSI 7-layer vs. TCP/IP 4-layer PDUs, physical/wireless media, and IANA port ranges cleanly in Part A by the end of Day 1.
- [ ] **Goal 2 (`[L3–L4]`):** Implement all 7 networking utilities inside [`0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs`](../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs) so all verification assertions exit `0` during lab.
- [ ] **Goal 3 (`[L4–L5]`):** Solve VLSM allocation plans, longest-prefix routing lookups, and 7-step fault isolation diagnostics in Parts C–D and pass [`post-lesson-eval.md`](./post-lesson-eval.md) (`>= 4/5`).

---

## Part A: Number Systems, OSI Encapsulation & Media (`[L1 Remember]` & `[L2 Understand]`)

1. Convert IPv4 **`172.16.25.10`** into **8-bit binary octets** and **hexadecimal**:
   - Binary: `____________________________________` | Hex: `____________`
2. Match each OSI Layer / PDU / Device (`ADE 6.0`):
   - Layer handling **Frames, MAC addresses & STP**: Layer `____` (`________________`)
   - Layer handling **Segments / Datagrams & IANA Ports**: Layer `____` (`________________`)
   - Layer handling **Packets & IPv4/IPv6 Routing**: Layer `____` (`________________`)
3. Complete the physical/wireless & IANA reference items (`ADE 3.0, 7.0, 8.1`):
   - Maximum Ethernet **Cat6a UTP (`RJ45`)** reach is `________`, whereas **Single-Mode Fiber (`SMF`)** reaches `________` immune to `________`.
   - Secure enterprise Wi-Fi (`802.11`) uses **`____`** (SAE), while private LTE/5G campus networks run on **`________`** (`3.5 GHz`).
   - List the 3 **RFC 1918 Private IPv4 ranges**: `________________`, `________________`, `________________`.
   - Classify IANA port tiers: Well-Known = `________`, Registered = `________`, Dynamic/Ephemeral = `________`.

---

## Part B: CIDR/VLSM & Routing Lab (`[L3 Apply]` & `[L4 Analyze]`)

1. Open [`0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs`](../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs) and read [`0-student_files/02-subnetting-routing/README.md`](../../0-student_files/02-subnetting-routing/README.md).
2. Implement each `TODO` function cleanly using bitwise masks (`>>> 0`, `&`, `|`, `~`):
   - `ipToInt(ip)` & `intToIp(num)`
   - `computeSubnet(cidr)` — handle `/0–/32`, network, broadcast, usable host range, wildcard mask, and RFC 1918 detection.
   - `allocateVlsm(baseCidr, requirements)` — sort largest-demand-first and assign aligned non-overlapping subnets.
   - `lookupLongestPrefixRoute(destIp, routingTable)` — pick highest matching `/prefix` (lowest metric tie-break).
   - `classifyIanaPort(port, protocol)` & `evaluateTroubleshootingSequence(steps)`
3. Uncomment the assertion block at the bottom of `subnetCalculatorLab.mjs` and run:
   ```bash
   node 0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs
   ```

---

## Part C: Routing, STP & 7-Step Fault Isolation (`[L4 Analyze]`)

1. Given supernet **`192.168.40.0/24`**, manually allocate **VLSM subnets** (largest-first) for:
   - **Classrooms:** `110` hosts → CIDR `________________` | Range `________________________` | Broadcast `______________`
   - **Servers:** `25` hosts → CIDR `________________` | Range `________________________` | Broadcast `______________`
   - **Admin:** `10` hosts → CIDR `________________` | Range `________________________` | Broadcast `______________`
2. A router has three routes: `0.0.0.0/0` (`eth0`, metric `5`), `10.12.0.0/16` (`eth1`, metric `10`), and `10.12.8.0/24` (`eth2`, metric `40`). Which interface forwards a packet to **`10.12.8.99`**, and why?
   > *(Your routing trace)*
3. Users report an internal web portal `https://grades.campus.local:8443` suddenly stopped loading:
   - `ipconfig` shows `10.12.4.50/24`
   - `ping 10.12.4.1` succeeds (`1 ms`)
   - `ping 10.99.20.15` (the web server IP) succeeds (`4 ms`)
   - `nslookup grades.campus.local` times out (`DNS request timed out`)
   State the failing **OSI layer**, offending **IANA service & port**, and the exact **7-Step Troubleshooting order** you follow:
   > *(Your diagnosis & 7-step trace)*

---

## Part D: Resilient Campus Network Architecture (`[L5 Evaluate]`)

Your high school district is connecting **Building A (Server Closet)** and **Building B (`450 m` across campus)** plus an **outdoor robotics yard** and **two redundant core switches**:
1. Select the wired uplink medium connecting Building A and Building B (`Cat6 UTP`, `MMF`, or `SMF`) and justify distance/EMI constraints.
2. Explain how **Spanning Tree Protocol (`STP/RSTP`)** allows redundant dual uplinks between the switches without crashing the LAN.
3. Recommend wireless coverage (**`802.11 WPA3`**, **`802.15 BLE`**, or **`5G/CBRS`**) for the `300 m` outdoor telemetry field and assign IANA port/transport choices for secure telemetry ingestion (`HTTPS` vs. `NTP`).
> *(Your architecture defense)*
