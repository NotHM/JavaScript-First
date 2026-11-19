# Lesson 2.4 Student Lab: Subnetting, OSI Topologies, Routing & Troubleshooting

**Standards:** CTE IT Security (`11.1999.00`) / `Cisco CCNA 200-301` | ADE Network Security `3.0`, `6.0`, `7.0`, `8.1–8.5`, `10.1–10.6`

Complete all `TODO` functions inside [`subnetCalculatorLab.mjs`](./subnetCalculatorLab.mjs) **without** looking at instructor solutions:

1. **`ipToInt()` & `intToIp()` (`[L3]`):** Convert dotted-decimal IPv4 strings to/from unsigned 32-bit integers using bitwise masks.
2. **`computeSubnet()` (`[L3]`):** Calculate CIDR subnet mask, wildcard mask, network/broadcast addresses, usable host ranges, and RFC 1918 private flag.
3. **`allocateVlsm()` (`[L4]`):** Pack subnets largest-host-demand-first inside a base CIDR block without overlapping ranges.
4. **`lookupLongestPrefixRoute()` (`[L4]`):** Match a destination IP against a routing table picking the longest `/prefix` match.
5. **`classifyIanaPort()` & `evaluateTroubleshootingSequence()` (`[L1–L3]`):** Classify IANA Well-Known (`0–1023`), Registered (`1024–49151`), and Dynamic/Ephemeral (`49152–65535`) ports and validate the 7-Step Network Troubleshooting order.

Run from the repository root:
```bash
node 0-student_files/02-subnetting-routing/subnetCalculatorLab.mjs
```
