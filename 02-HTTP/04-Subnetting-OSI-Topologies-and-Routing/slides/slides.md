---
title: "Lesson 2.4 — Subnetting, OSI Topologies, Protocols & Troubleshooting"
theme: "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
---

# Lesson 2.4: Subnetting, OSI Topologies & Routing
**CTE IT Security (`11.1999.00`) / `Cisco CCNA 200-301` | ADE `3.0, 6.0, 7.0, 8.1–8.5, 10.1–10.6`**

*Binary/Hex, OSI vs. TCP/IP, CIDR/VLSM, IANA Ports, Longest-Prefix Routing & 7-Step Diagnostics*

---

### `[L1 Remember]` Addressing Formats, Topologies & Media

- **IPv4 (`32-bit`):** `192.168.10.25` = `11000000.10101000.00001010.00011001` = `C0:A8:0A:19`
- **MAC (`48-bit` hex):** `00:1A:2B:3C:4D:5E` | **IPv6 (`128-bit` hex):** `2001:db8::1`
- **Topologies:** **Star** (central switch), **Mesh** ($n(n-1)/2$ redundancy), **Spine-Leaf** (low-latency Clos DC fabric)
- **Physical & Wireless Media:**
  - `Cat6a UTP / RJ45`: `<= 100 m`, susceptible to EMI
  - `MMF Fiber` (`< 550 m` LED) vs. **`SMF Fiber`** (`10+ km` laser, EMI-immune)
  - `802.11` Wi-Fi (**`WPA3`** SAE), `802.15` (`BLE/Zigbee`), **`5G / CBRS`** private cellular

---

### `[L2 Understand]` OSI 7-Layer vs. TCP/IP 4-Layer & STP

| OSI Layer | TCP/IP Layer | PDU & Protocols |
|---|---|---|
| 7–5 App / Pres / Session | **Application** | Data (`HTTP/S`, `DNS`, `DHCP`, `SSH`) |
| 4 Transport | **Transport** | **Segment/Datagram** (`TCP` vs. `UDP`, Ports) |
| 3 Network | **Internet** | **Packet** (`IPv4/IPv6`, `ICMP`, Routers) |
| 2–1 Data Link / Physical | **Network Access** | **Frame / Bits** (MAC, Switches, **STP**) |

- **Spanning Tree (`STP` / `RSTP`):** Blocks redundant switch loops (`Blocking`) to prevent broadcast storms while preserving automatic failover.

---

### `[L3 Apply -> L4 Analyze]` CIDR, VLSM & RFC 1918 vs. IPv6

- **RFC 1918 Private IPv4:** `10.0.0.0/8` | `172.16.0.0/12` | `192.168.0.0/16` (APIPA fallback: `169.254.0.0/16`)
- **Example `192.168.10.99/26`:** Mask `255.255.255.192` (`64` total, `62` hosts)
  - Network `192.168.10.64` | Range `.65–.126` | Broadcast `.127`
- **VLSM Golden Rule:** Sort subnets **largest-host-demand first**, align to $2^{h}$, allocate sequentially!

> **Predict Before Running:** Why must `Staff-LAN (100 hosts -> /25)` be allocated BEFORE `DMZ (28 hosts -> /27)` inside `10.20.0.0/24`?

---

### `[L3 Apply -> L4 Analyze]` IANA Ports & Longest-Prefix Routing

- **IANA Port Ranges (`0–65535`):**
  - **`0–1023` Well-Known:** `22` SSH, `53` DNS, `80` HTTP, `123` NTP, `443` HTTPS
  - **`1024–49151` Registered:** `1433` MSSQL, `3306` MySQL, `5432` PostgreSQL, `8080` Alt-HTTP
  - **`49152–65535` Dynamic / Ephemeral:** Ephemeral outbound client sockets
- **Longest-Prefix Match:** Between `0.0.0.0/0`, `10.50.0.0/16`, and `10.50.12.0/24`, destination `10.50.12.77` ALWAYS routes via **`/24`** regardless of metric!

---

### `[L4 Analyze -> L5 Evaluate]` 7-Step Network Troubleshooting & CLI Tools

1. **Identify problem** -> 2. **Establish theory** -> 3. **Test theory** -> 4. **Plan & impact** -> 5. **Implement/escalate** -> 6. **Verify & prevent** -> 7. **Document**

| Symptom | CLI Probe | Failing OSI Layer |
|---|---|---|
| `169.254.x.x` APIPA | `ipconfig` / `dhclient` | L2/L7 DHCP failure |
| Gateway unreachable | `ping` / `arp -a` | L3 Local subnet / STP |
| Remote hop timeout | `traceroute` | L3 Upstream WAN route |
| IP works, domain fails | `nslookup` / `dig` | L7 DNS (`UDP/TCP 53`) |
| Port `443` refused | `ss -tulpn` / `tcpdump` | L4 Socket / Firewall |

> **Lab:** Run `node --test 02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/code/subnetAndRoutingDemo.test.mjs` & complete `0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs`!
