# Post-Lesson 2.4 Evaluation: Exit Ticket (`West-MEC ITS 102` | `ADE 3.0, 6.0, 7.0, 8.1–8.5, 10.1–10.6`)

**Timing:** 6 minutes (Complete AFTER Lesson 2.4 instruction & `subnetCalculatorLab.mjs`) | **Score:** `____ / 5`

1. **`[L3 Apply | CCNA 200-301 / ADE 6.0]`** Given **`172.16.40.82/27`**, compute all values and identify RFC 1918 status:
   - Network ID: `______________` | Usable Range: `________________________`
   - Broadcast: `______________` | Wildcard Mask: `______________` | RFC 1918 Private? `____`

2. **`[L3 Apply / L4 Analyze | CCNA 200-301]`** Allocate **VLSM subnets** inside **`10.40.0.0/24`** (largest-first) for `Ops` (`20 hosts`), `Point-to-Point` (`2 hosts`), and `Sales` (`60 hosts`):
   - Order & CIDRs: 1) `________________` 2) `________________` 3) `________________`

3. **`[L3 Apply / L4 Analyze | ADE 8.1–8.5]`** A routing table holds `0.0.0.0/0` (`eth0`, metric 1), `10.88.5.0/24` (`eth1`, metric 5), and `10.88.5.0/25` (`eth3`, metric 20). Which interface wins for destination **`10.88.5.14`**? Then classify IANA port ranges for **`443`**, **`5432`**, and **`58100`**:
   > *(Your routing match & port classifications)*

4. **`[L2 Understand / L4 Analyze | ADE 10.1–10.6]`** Match each CLI tool to its diagnostic role (**`ping`**, **`traceroute`**, **`nslookup`**, **`netstat`/`ss`**, **`tcpdump`/Wireshark**), and explain why `169.254.x.x` points to DHCP rather than a firewall drop:
   > *(Your tool mapping & explanation)*

5. **`[L5 Evaluate | ADE 3.0, 7.0, 10.1–10.6]`** Audit this incident: *A warehouse wired a `300 m` Cat6 copper link between buildings, left guest/staff Wi-Fi on `WPA2-PSK`, bridged dual switches without STP causing broadcast storms, and skipped documenting the emergency fix.* Prescribe **3 concrete architectural/process remediations** citing the **7-Step Troubleshooting Methodology**:
   > *(Your remediations)*
