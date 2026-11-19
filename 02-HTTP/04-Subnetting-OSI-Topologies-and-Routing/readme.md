# Lesson 2.4: Subnetting, OSI Topologies, Protocols & Network Troubleshooting

**Standards Alignment:** CTE IT Security (`11.1999.00`) / `Cisco CCNA 200-301` & **ADE Network Security `3.0`, `6.0`, `7.0`, `8.1–8.5`, `10.1–10.6`**

## Student Learning Objectives (Bloom's Taxonomy & SMART)
- **`[L1 Remember]`** Recall binary/decimal/hex IPv4 and MAC representations, all 7 OSI vs. 4 TCP/IP layers, physical/wireless media limits (`UTP`, `SMF/MMF`, `802.11 WPA3`, `802.15 BLE`, `5G/CBRS`), and IANA port ranges (`CCNA 200-301`, `ADE 3.0, 6.0, 8.1`).
- **`[L2 Understand]`** Contrast Star, Mesh, and Spine-Leaf topologies; RFC 1918 private vs. public IPv4 vs. IPv6 addressing; TCP vs. UDP transport; and STP loop-prevention failover (`ADE 6.0, 7.0`).
- **`[L3 Apply]`** Compute IPv4 CIDR network, broadcast, wildcard, and usable host ranges; allocate **VLSM** blocks largest-first; and implement longest-prefix routing lookups in JavaScript (`CCNA 200-301`).
- **`[L4 Analyze]`** Trace OSI encapsulation faults, diagnose APIPA/DHCP/DNS/port defects using `ping`, `traceroute`, `nslookup`, `netstat`, and packet captures, and validate the 7-Step Network Troubleshooting sequence (`ADE 10.1–10.6`).
- **`[L5 Evaluate]`** Design enterprise campus subnets (`VLSM`), select copper/fiber/wireless links, and prescribe deterministic routing/STP failover topologies (`CCNA 200-301`).

### Lesson 2.4 SMART Objectives Checklist
- [ ] **S/M/A/R/T Goal 1 (`[L1–L2]` | `ADE 3.0, 6.0, 7.0`):** Map binary/hex addresses, OSI 7-layer vs. TCP/IP 4-layer PDUs, physical/wireless standards, and IANA port tiers with >= 85% accuracy on Day 1 (`student-lesson.md` Part A).
- [ ] **S/M/A/R/T Goal 2 (`[L3–L4]` | `CTE IT Security (11.1999.00) / CCNA 200-301`):** Implement all 7 `TODO` functions (`ipToInt`, `intToIp`, `computeSubnet`, `allocateVlsm`, `lookupLongestPrefixRoute`, `classifyIanaPort`, `evaluateTroubleshootingSequence`) in [`0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs`](../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs) so all checks exit `0` within one 50-minute lab period.
- [ ] **S/M/A/R/T Goal 3 (`[L4–L5]` | `ADE 8.1–8.5, 10.1–10.6`):** Solve multi-department VLSM allocations, longest-prefix routing ties, and 7-step OSI packet-to-port fault isolation on `post-lesson-eval.md` (`>= 4/5`).

---

## 1. Number Systems, OSI vs. TCP/IP & Network Topologies (`CCNA 200-301`, `ADE 3.0, 6.0, 7.0`)

### Binary, Decimal & Hexadecimal Addressing
Computers forward packets strictly as **bits**, whereas engineers configure IPv4 in dotted-decimal and MAC/IPv6 in hexadecimal:
- **IPv4 (`32`-bit / `4` octets):** `192.168.10.25` = `11000000.10101000.00001010.00011001` = `C0:A8:0A:19`
- **MAC Address (`48`-bit / `6` hex octets):** e.g., `00:1A:2B:3C:4D:5E` (first 24 bits = vendor OUI, last 24 bits = NIC serial)
- **IPv6 (`128`-bit / `8` colon-separated 16-bit hextets):** e.g., `2001:0db8:85a3::8a2e:0370:7334`

### OSI 7-Layer vs. TCP/IP 4-Layer Encapsulation
As application data travels down the sender stack (**Encapsulation**), each layer wraps its own **Protocol Data Unit (PDU)** header (and Data Link trailer/FCS); the receiver unwraps (**De-encapsulates**) upward:

| OSI Layer | TCP/IP Layer | PDU Unit | Key Protocols & Devices |
|---|---|---|---|
| **7. Application** | **Application** | Data | `HTTP/HTTPS`, `DNS`, `SSH`, `DHCP`, `NTP`, `SNMP` |
| **6. Presentation** | **Application** | Data | TLS encryption, UTF-8/JSON encoding, Gzip |
| **5. Session** | **Application** | Data | Session tokens, NetBIOS/RPC dialogs |
| **4. Transport** | **Transport** | **Segment** (TCP) / **Datagram** (UDP) | `TCP`, `UDP`, Source/Dest IANA Ports |
| **3. Network** | **Internet** | **Packet** | `IPv4`, `IPv6`, `ICMP`, **Routers** |
| **2. Data Link** | **Network Access** | **Frame** | `Ethernet (802.3)`, MAC, VLANs, **Switches**, `STP` |
| **1. Physical** | **Network Access** | **Bits** | Copper UTP, Fiber optics, RF signals, Repeaters |

### Topologies & Wired / Wireless Media
- **Topologies:** **Star** (central switch, easy fault isolation), **Mesh** (redundant multi-path links $n(n-1)/2$, high resilience), **Spine-Leaf** (modern two-tier Clos data-center fabric giving every leaf switch equal low-latency east-west hops through every spine).
- **Wired Media:** **`Cat6/Cat6a UTP` + `RJ45`** (`100 m` max copper run, vulnerable to crosstalk/EMI); **Multi-Mode Fiber (`MMF`)** (aqua/orange jacket, LED/VCSEL, `< 550 m` short campus/rack runs); **Single-Mode Fiber (`SMF`)** (yellow jacket, precision laser, `10+ km` WAN/ISP backbones, zero EMI).
- **Wireless Standards:** **`IEEE 802.11` Wi-Fi (`Wi-Fi 6/6E`)** secured with **`WPA3`** (Simultaneous Authentication of Equals / SAE stopping offline dictionary attacks), **`IEEE 802.15`** (`BLE` / `Zigbee` low-power PANs), and **`5G / CBRS`** (`3.5 GHz` Citizens Broadband Radio Service private cellular enterprise campuses).

---

## 2. IPv4 CIDR, VLSM Subnetting & RFC 1918 vs. IPv6 (`CCNA 200-301`, `ADE 6.0`)

A CIDR block such as **`192.168.10.99/26`** specifies `26` network bits and `32 - 26 = 6` host bits:
- **Block Size:** $2^{6} = 64$ addresses | **Usable Hosts:** $64 - 2 = 62$ (excluding network ID and broadcast)
- **Subnet Mask:** `255.255.255.192` | **Wildcard Mask (inverted):** `0.0.0.63`
- **Network Address (`ip & mask`):** `192.168.10.64`
- **First Usable Host:** `192.168.10.65` | **Last Usable Host:** `192.168.10.126`
- **Broadcast Address (`network | wildcard`):** `192.168.10.127`
- *(Edge note: **RFC 3021 `/31`** point-to-point router links allow `2` usable host IPs without wasting 50% of a `/30`!)*

### VLSM (Variable Length Subnet Mask) Allocation Algorithm
To avoid overlapping blocks and address waste inside a supernet like `10.20.0.0/24`:
1. **Sort subnet requirements descending** (largest usable host count first).
2. Round `hosts + 2` up to the smallest power of `2` block size ($2^{h}$), giving prefix `/32 - h`.
3. Align start address to a multiple of `blockSize` and advance sequentially!

### IPv4 Private (RFC 1918) vs. Special & IPv6 Ranges
- **RFC 1918 Private (Non-routable on public Internet; requires NAT):** `10.0.0.0/8`, `172.16.0.0/12` (`172.16.x`–`172.31.x`), `192.168.0.0/16`.
- **Special IPv4:** Loopback (`127.0.0.0/8`), **APIPA Link-Local** (`169.254.0.0/16` — self-assigned when DHCP fails!), Multicast (`224.0.0.0/4`).
- **IPv6 (`128`-bit):** `::1` (loopback), `fe80::/10` (link-local), `fc00::/7` (Unique Local Private), `2000::/3` (Global Unicast). Eliminates public IP exhaustion and removes mandatory NAT complexity.

---

## 3. IANA Ports, Transport Protocols, Longest-Prefix Routing & STP (`ADE 7.0, 8.1–8.5`)

- **IANA Port Ranges (`0–65535`):**
  - **`0–1023` Well-Known / System Ports:** `22` SSH/SFTP, `53` DNS (`UDP` queries / `TCP` zone transfers), `67/68` DHCP (`UDP`), `80` HTTP (`TCP`), `123` NTP (`UDP`), `161` SNMP (`UDP`), `443` HTTPS (`TCP`).
  - **`1024–49151` Registered Ports:** Application servers (`1433` MSSQL, `3306` MySQL, `3389` RDP, `5432` PostgreSQL, `8080` HTTP-alt).
  - **`49152–65535` Dynamic / Ephemeral Ports:** Temporary client source ports allocated per outbound connection.
- **TCP vs. UDP:** **TCP** guarantees ordered, lossless byte streams via `SYN → SYN-ACK → ACK` handshake, ACKs, and congestion control; **UDP** delivers low-overhead datagrams for time-sensitive `DNS`, `NTP`, `DHCP`, VoIP, and real-time video.
- **Longest-Prefix Match Routing:** Routers compare the destination IP against every route `(dest & mask) === network` and always choose the **most specific matching route (highest `/prefix`)**, falling back to `0.0.0.0/0` default gateway only when no specific prefix matches; ties break on lowest **Metric / Administrative Distance**.
- **STP (`IEEE 802.1D` / `802.1w RSTP`):** Elects a **Root Bridge** and places redundant switch uplinks into **Blocking/Discarding** state to prevent Layer 2 **broadcast storms**, automatically unblocking backup paths in milliseconds (RSTP) if the primary fiber link snaps.

---

## 4. 7-Step Network Troubleshooting Methodology & CLI Tools (`ADE 10.1–10.6`)

Follow the disciplined **7-Step Network Troubleshooting Methodology**:
1. **Identify the problem** — Gather symptoms, affected user scope, and recent topology/config changes.
2. **Establish a theory of probable cause** — Question the obvious (OSI bottom-up physical link check or top-down app test).
3. **Test the theory to determine cause** — Confirm root cause with probes (if disproven, establish a new theory).
4. **Establish a plan of action & identify potential effects** — Schedule window, verify change impact and rollback.
5. **Implement the solution or escalate** — Apply fix carefully (or escalate upstream to ISP/tier-3).
6. **Verify full system functionality & implement preventive measures** — Confirm end-to-end tests + alerts/docs.
7. **Document findings, actions, and outcomes** — Update runbooks and ticket post-mortem.

### Core Layer-Mapped Diagnostic Commands
- **`ping`** (`L3 ICMP`): Tests host reachability, packet loss, and round-trip latency (`ms`).
- **`traceroute` / `tracert`** (`L3 TTL` expiry): Reveals each router hop along a path to isolate where WAN packets drop.
- **`nslookup` / `dig`** (`L7 DNS`): Verifies domain-to-IP resolution (`A`/`AAAA` records) independently of browser caches.
- **`netstat -an` / `ss -tulpn`** (`L4 Sockets`): Inspects active listening IANA ports, TCP states (`LISTEN`/`ESTABLISHED`), and owning PIDs.
- **Packet Capture (`tcpdump` / Wireshark)** (`L2–L7`): Proves TLS handshakes, TCP `RST`/retransmissions, or cleartext protocol leaks on the wire.

Run the zero-dependency reference simulation and automated test suite:
```bash
node 02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/code/subnetAndRoutingDemo.mjs
node --test 02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/code/subnetAndRoutingDemo.test.mjs
```

---

## Lesson Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/subnetAndRoutingDemo.mjs`](./code/subnetAndRoutingDemo.mjs) | [`code/subnetAndRoutingDemo.test.mjs`](./code/subnetAndRoutingDemo.test.mjs)
- **Student Starter Lab:** [`../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs`](../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs)
