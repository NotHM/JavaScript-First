# Lesson Plan 2.1: Internet Protocols, Cloud Models & IoT (`Std 8.0`)

**Unit:** Unit 2 | **Duration:** 2 Class Periods × 50 min | **Stds:** `8.1`–`8.6`

---

## Student SMART Goals (Trackable)
- [ ] **Goal 1 (`[L1 Remember]` | `8.2, 8.5`):** **Specific:** Recall default ports and encryption status for HTTP (`80`), HTTPS (`443`), SSH (`22`), SFTP (`22`), FTPS (`990`), and IMAP (`993`), plus Cloud tiers (`SaaS/PaaS/IaaS/FaaS`). **Measurable:** Complete Part A table with `>= 90%` accuracy. **Achievable:** Reference Lesson 2.1 protocol chart. **Relevant:** Foundation for server security and cloud ops. **Time-bound:** Within first 15 minutes of Day 1.
- [ ] **Goal 2 (`[L2 Understand]` | `8.1, 8.2`):** **Specific:** Explain why 128-bit IPv6 solves 32-bit IPv4 exhaustion and why Cloud elasticity replaces fixed on-prem CapEx. **Measurable:** Score full credit on Q2 of `post-lesson-eval.md`. **Achievable:** Trace `slides/slides.md` visual comparisons. **Relevant:** Core networking literacy (`8.1–8.2`). **Time-bound:** By end of Day 1.
- [ ] **Goal 3 (`[L3 Apply]` | `8.2, 8.4`):** **Specific:** Implement `inspectEndpoint`, `calculateWireKb`, and `pickIotProtocol` inside `protocolLab.js` using `node:url`. **Measurable:** All 3 uncommented assertions pass in Node.js with exit code `0`. **Achievable:** Model after `protocolInspectorDemo.js`. **Relevant:** Turns protocol specs into testable JS utilities. **Time-bound:** Within 25 minutes during Day 2 lab.
- [ ] **Goal 4 (`[L4 Analyze]` | `8.4`):** **Specific:** Separate bandwidth throughput savings (Gzip/Brotli) from round-trip latency (CDN RTT) in Part C download calculations. **Measurable:** Compute exact uncompressed (`8.12s`) vs. compressed CDN (`2.015s`) times. **Achievable:** Apply `size / rate + rttSeconds` formula. **Relevant:** Diagnoses real frontend/API slowdowns. **Time-bound:** Within 10 minutes of Day 2 Part C.
- [ ] **Goal 5 (`[L5 Evaluate]` | `8.5, 8.6`):** **Specific:** Justify selecting **NFC**, **BLE**, **Wi-Fi**, or **LTE** and **IaaS/PaaS/FaaS** for concrete range, battery, and cost constraints. **Measurable:** Score `>= 4/5` on `post-lesson-eval.md` and pass Part D critique. **Achievable:** Apply Lesson 2.1 tradeoff matrices. **Relevant:** Architecture decision-making for CTE projects. **Time-bound:** Before end of Lesson 2.1 Day 2.

## Teacher SMART Goals (Trackable)
- [ ] **Goal 1 (`[L1–L2]` | `8.0`):** **Specific:** Collect baseline readiness via `pre-lesson-eval.md` and address common HTTP vs. HTTPS and PaaS vs. IaaS confusions. **Measurable:** Log 100% student pre-scores prior to direct instruction. **Achievable:** 4-minute bell-ringer + 5-minute protocol board review. **Relevant:** Targets misconceptions before lab work. **Time-bound:** First 10 minutes of Day 1.
- [ ] **Goal 2 (`[L2–L3]` | `8.2, 8.4`):** **Specific:** Conduct a live `node:url` walkthrough using `protocolInspectorDemo.js` and verify compression math step by step. **Measurable:** Confirm students correctly differentiate `800 KB` Gzipped vs. `RTT` ms. **Achievable:** Projector live-coding + think-aloud check. **Relevant:** Connects abstract networking numbers to JS code. **Time-bound:** Minutes 15–30 of Day 1–2.
- [ ] **Goal 3 (`[L3]` | `8.2, 8.6`):** **Specific:** Monitor student progress on `protocolLab.js` and unblock edge-case parsing errors (`ssh://` vs `https://`). **Measurable:** Verify 100% of lab pairs run passing assertions before transition. **Achievable:** 20-minute circulation rubric check. **Relevant:** Builds self-sufficient CLI testing habits. **Time-bound:** During Day 2 lab block.
- [ ] **Goal 4 (`[L4–L5]` | `8.5, 8.6`):** **Specific:** Lead structured critique of Part D IoT & Cloud scenarios emphasizing battery, distance, and compliance trade-offs. **Measurable:** Elicit justified oral/written defenses from every table group. **Achievable:** 8-minute peer share-out using Lesson 2.1 rubric. **Relevant:** Cultivates AZ CTE Prof. Skill 1.0 & 3.0. **Time-bound:** Minutes 35–43 of Day 2.
- [ ] **Goal 5 (`[L1–L5]` | `8.0`):** **Specific:** Administer `post-lesson-eval.md` + Kahoot Quiz 1 and compute Lesson 2.1 Hake's gain $g$. **Measurable:** Achieve class mean gain $g \ge 0.55$ on paired items. **Achievable:** 5-minute exit ticket + automated Quiz 1 item review. **Relevant:** Verifies Standard 8.0 readiness prior to Lesson 2.2. **Time-bound:** Final 7 minutes of Day 2.

---

## Bloom's Objective Ladder
- **L1–L2:** Classify transport/app protocols (HTTP/HTTPS/SSH/SFTP/IMAP/IPv6), Web server roles, Cloud tiers (SaaS/PaaS/IaaS/FaaS), and IoT wireless standards.
- **L3 Apply:** Inspect URLs cleanly via `node:url` and compute Gzip compression transfer time reductions.
- **L4 Analyze:** Separate bandwidth throughput effects from round-trip latency (RTT) across geographic origins vs CDNs.
- **L5 Evaluate:** Match cloud models (`FaaS` vs `PaaS` vs `IaaS`) and IoT radios (`NFC`/`BLE`/`Wi-Fi`/`LTE`) to real engineering budgets.

## Pacing & Teacher Answer Keys
- **Day 1:** Pre-Lesson 2.1 Bell-Ringer (4m), Slides + Protocol/Port Board Activity (25m), Worksheet Part A (15m).
- **Day 2:** Performance & Cloud Tradeoff walkthrough + `protocolLab.js` coding (`protocolInspectorDemo.js` reference), Post-Lesson 2.1 Exit Ticket.
- **Pre 2.1 Key:** 1) `443` / `80`; 2) PaaS manages OS/scaling for app pushes whereas IaaS hands raw VMs/OS control to the developer; 3) `75%`; 4) `NFC`.
- **Post 2.1 Key:** 1) `SSH`, `IMAP`; 2) 32-bit IPv4 (`4.3B` addresses) ran out with global mobile/IoT growth; 128-bit IPv6 fixes depletion; 3) `120 KB`; 4) High RTT delays every handshake/TLS/packet ACK regardless of pipe width; 5) `FaaS` for intermittent 2s thumbnailing (zero idle bill); `IaaS` for custom compliance Linux VM control.
- **Worksheet Part A & C Key:** Part C: `4,000 KB / 500 KB/s = 8.0s + 0.12s = 8.12s`; Compressed+CDN: `1,000 KB / 500 KB/s = 2.0s + 0.015s = 2.015s`.
