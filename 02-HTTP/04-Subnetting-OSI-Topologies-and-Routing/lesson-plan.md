# Lesson Plan 2.4: Subnetting, OSI Topologies, Protocols & Network Troubleshooting

**Unit:** Unit 2 | **Duration:** 2 Class Periods (100 min total)  
**Standards:** CTE IT Security (`11.1999.00`) / `Cisco CCNA 200-301` | **ADE Network Security:** `3.0`, `6.0`, `7.0`, `8.1–8.5`, `10.1–10.6`

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1 (`TG-L2.4-1` | `[L1–L2]` | `ADE 3.0, 6.0, 7.0`):** Model binary/hex conversion, OSI vs. TCP/IP encapsulation, physical media (`UTP` vs. `SMF/MMF` vs. `WPA3`/`CBRS`), and STP loop prevention before lab so >= 85% of students pass Part A cleanly on Day 1.
- [ ] **Teacher SMART Goal 2 (`TG-L2.4-2` | `[L3–L5]` | `CCNA 200-301 / ADE 8.1–8.5, 10.1–10.6`):** Demonstrate `subnetAndRoutingDemo.mjs` (`node --test`) live and verify >= 85% of students complete `subnetCalculatorLab.mjs` (`exit 0`) and pass `post-lesson-eval.md` (`>= 4/5`) by Day 2 close.
- [ ] **Student SMART Goal 1 (`SG-L2.4-1` | `[L1–L2]`):** Accurately convert IPv4 to binary/hex, classify OSI/TCP-IP layers and IANA port ranges, and list RFC 1918 private blocks in Part A during Day 1.
- [ ] **Student SMART Goal 2 (`SG-L2.4-2` | `[L3–L5]`):** Implement bitwise CIDR/VLSM allocation, longest-prefix routing, and 7-step diagnostic checks cleanly in Node.js by Period 2 close.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | State decimal/binary/hex IPv4 & MAC representations, OSI 7 vs. TCP/IP 4 layers, IANA ranges (`0–1023`, `1024–49151`, `49152–65535`), and RFC 1918 blocks. |
| **L2 Understand** | Contrast Star, Mesh, and Spine-Leaf topologies; Cat6a UTP vs. SMF/MMF fiber vs. `802.11 WPA3` / `802.15` / `5G CBRS`; TCP vs. UDP; and STP failover. |
| **L3 Apply** | Compute CIDR network, broadcast, wildcard, and host bounds; execute largest-first VLSM packing; and classify IANA ports in JavaScript. |
| **L4 Analyze** | Trace longest-prefix routing decisions, isolate APIPA/DNS/routing/port faults via `ping`/`traceroute`/`nslookup`/`netstat`/`tcpdump`, and order the 7 troubleshooting steps. |
| **L5 Evaluate** | Architect campus fiber backbones, STP switch redundancy, private wireless (`CBRS`), and VLSM subnet plans under physical and scalability constraints. |

---

## Materials & Assessments
- **Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo & Tests:** [`code/subnetAndRoutingDemo.mjs`](./code/subnetAndRoutingDemo.mjs), [`code/subnetAndRoutingDemo.test.mjs`](./code/subnetAndRoutingDemo.test.mjs)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs`](../../0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) -> Slides on Binary/Hex, OSI/TCP-IP Encapsulation, Topologies, Wired/Wireless Media, CIDR & RFC 1918 vs. IPv6 (24 min) -> Live `subnetAndRoutingDemo.mjs` walkthrough + Part A worksheet (16 min) -> Quick CIDR check (6 min).
- **Day 2 (50 min):** VLSM packing, IANA ports, Longest-Prefix Routing, STP failover & 7-Step Troubleshooting (14 min) -> Lab coding in `0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs` + Parts C–D (28 min) -> `post-lesson-eval.md` (8 min).

---

## Instructor Answer Key (Pre/Post Checks & Worksheet)

### Pre-Lesson 2.4 Key
1. **OSI Layers (L7->L1):** 7 Application, 6 Presentation, 5 Session, 4 Transport, 3 Network, 2 Data Link, 1 Physical. **IP Routing:** Layer 3 (`Network`); **MAC Framing:** Layer 2 (`Data Link`).
2. **Cat6a UTP vs. SMF Fiber:** Copper UTP caps at `100 m` and is susceptible to electromagnetic interference (EMI); Single-Mode Fiber (`SMF`) uses precision lasers reaching `10+ km` with complete EMI immunity.
3. **`192.168.10.0/26`:** `6` host bits (`32 - 26`) -> **$2^{6} = 64$ total addresses**, **`62` usable hosts** (`64 - 2`).
4. **`169.254.44.12` APIPA:** Indicates **DHCP** (`UDP 67/68`) failed so the OS self-assigned an APIPA link-local IP. **Step 1 of Troubleshooting:** *Identify the problem* (check physical link, scope of affected devices, and recent VLAN/DHCP changes) before touching firewalls.

### Student Worksheet Key (`student-lesson.md`)
- **Part A.1:** `172.16.25.10` = Binary **`10101100.00010000.00011001.00001010`** | Hex **`AC:10:19:0A`**.
- **Part A.2:** Frames/MAC/STP = **Layer 2 (`Data Link`)**; Segments/Datagrams/Ports = **Layer 4 (`Transport`)**; Packets/IP Routing = **Layer 3 (`Network`)**.
- **Part A.3:** Cat6a reach = **`100 m`**, SMF reach = **`10+ km`** immune to **EMI**; Wi-Fi security = **`WPA3`** (SAE), private campus 5G = **`CBRS`**; RFC 1918 ranges = **`10.0.0.0/8`**, **`172.16.0.0/12`**, **`192.168.0.0/16`**; IANA ranges = Well-Known **`0–1023`**, Registered **`1024–49151`**, Dynamic/Ephemeral **`49152–65535`**.
- **Part C.1 (`192.168.40.0/24` VLSM):**
  - **Classrooms (`110` -> `/25` = 128):** `192.168.40.0/25` | Usable `.1–.126` | Broadcast `.127`
  - **Servers (`25` -> `/27` = 32):** `192.168.40.128/27` | Usable `.129–.158` | Broadcast `.159`
  - **Admin (`10` -> `/28` = 16):** `192.168.40.160/28` | Usable `.161–.174` | Broadcast `.175`
- **Part C.2:** **`eth2`** (`10.12.8.0/24`). Routers always select the **longest-prefix match** (`/24` > `/16` > `/0`) regardless of metric.
- **Part C.3:** Failing **Layer 7 (`Application` — DNS)** on **IANA port `53` (`UDP/TCP`)** (`grades.campus.local` fails resolution even though Layer 3 ICMP reaches `10.99.20.15`). Follow 7 steps: (1) Identify problem (DNS lookup fails, IP pings work), (2) Establish theory (DNS server unreachable/misconfigured or missing local zone record), (3) Test theory (`dig @dns-ip grades.campus.local`), (4) Plan change/impact, (5) Restore/fix DNS record or resolver IP, (6) Verify `nslookup` + browser HTTPS on `8443` (`Registered` port) + add DNS monitoring, (7) Document ticket.
- **Part D:** (1) Choose **`SMF`** (`450 m` approaches MMF optical loss limits depending on 10G grade and avoids outdoor copper lightning/ground-potential/EMI hazards over `100 m` UTP limit); (2) **`STP / RSTP`** elects a Root Bridge and puts redundant loop links in Blocking/Discarding state until primary path drops; (3) Use **`5G/CBRS`** (superior range and interference control across `300 m` outdoor yard over Wi-Fi/BLE), ingest sensor data over **`HTTPS` (`TCP 443`, Well-Known)** for reliable encrypted delivery, and synchronize clocks with **`NTP` (`UDP 123`, Well-Known)**.

### Post-Lesson 2.4 Key
1. Network ID = **`172.16.40.64`** | First = **`172.16.40.65`** | Last = **`172.16.40.94`** | Broadcast = **`172.16.40.95`** | Wildcard = **`0.0.0.31`** | RFC 1918 Private? **`Yes`** (`172.16.0.0/12`).
2. Sort largest first: `Sales (60 -> /26)` = **`10.40.0.0/26`**, `Ops (20 -> /27)` = **`10.40.0.64/27`**, `Point-to-Point (2 -> /30)` = **`10.40.0.96/30`**.
3. Route selected: **`10.88.5.0/25` (`eth3`)** because **`/25`** is a longer prefix match than `/24` or `/0`. Ports: `443` = **Well-Known** (`HTTPS`, **TCP**); `5432` = **Registered** (`PostgreSQL`, **TCP**); `58100` = **Dynamic/Ephemeral** (client source socket).
4. Layer 1/3 tools vs. Layer 7: **`ping`** (`ICMP L3`), **`traceroute`** (`L3 TTL hops`), **`nslookup`** (`L7 DNS port 53`), **`netstat` / `ss`** (`L4 sockets & ports`), **`tcpdump` / Wireshark** (`L2–L7 packet capture`).
5. Topology & Troubleshooting: (1) Replace `300 m` Cat6 UTP with **`MMF` or `SMF` fiber** (copper caps at `100 m`) and upgrade **`WPA2-PSK` -> `WPA3`** (or `5G/CBRS` outdoors); (2) Enable **`RSTP`** on switches so redundant fiber trunks fail over cleanly without broadcast storms; (3) Execute the 7 troubleshooting steps in order (`Identify -> Theory -> Test -> Plan -> Implement -> Verify/Prevent -> Document`).
