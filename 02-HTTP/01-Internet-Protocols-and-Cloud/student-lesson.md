# Student Lesson 2.1: Internet Protocols, Cloud Models & IoT (`Std 8.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/03-http-server/protocolLab.js`](../../0-student_files/03-http-server/protocolLab.js)

---

## Student SMART Goals (Trackable)
- [ ] **Goal 1 (`[L1 Remember]` | `8.2, 8.5`):** **Specific:** Recall default ports and encryption status for HTTP (`80`), HTTPS (`443`), SSH (`22`), SFTP (`22`), FTPS (`990`), and IMAP (`993`), plus Cloud tiers (`SaaS/PaaS/IaaS/FaaS`). **Measurable:** Complete Part A table with `>= 90%` accuracy. **Achievable:** Reference Lesson 2.1 protocol chart. **Relevant:** Foundation for server security and cloud ops. **Time-bound:** Within first 15 minutes of Day 1.
- [ ] **Goal 2 (`[L2 Understand]` | `8.1, 8.2`):** **Specific:** Explain why 128-bit IPv6 solves 32-bit IPv4 exhaustion and why Cloud elasticity replaces fixed on-prem CapEx. **Measurable:** Score full credit on Q2 of `post-lesson-eval.md`. **Achievable:** Trace `slides/slides.md` visual comparisons. **Relevant:** Core networking literacy (`8.1–8.2`). **Time-bound:** By end of Day 1.
- [ ] **Goal 3 (`[L3 Apply]` | `8.2, 8.4`):** **Specific:** Implement `inspectEndpoint`, `calculateWireKb`, and `pickIotProtocol` inside `protocolLab.js` using `node:url`. **Measurable:** All 3 uncommented assertions pass in Node.js with exit code `0`. **Achievable:** Model after `readme.md` examples. **Relevant:** Turns protocol specs into testable JS utilities. **Time-bound:** Within 25 minutes during Day 2 lab.
- [ ] **Goal 4 (`[L4 Analyze]` | `8.4`):** **Specific:** Separate bandwidth throughput savings (Gzip/Brotli) from round-trip latency (CDN RTT) in Part C download calculations. **Measurable:** Compute exact uncompressed vs. compressed CDN transfer times. **Achievable:** Apply `size / rate + rttSeconds` formula. **Relevant:** Diagnoses real frontend/API slowdowns. **Time-bound:** Within 10 minutes of Day 2 Part C.
- [ ] **Goal 5 (`[L5 Evaluate]` | `8.5, 8.6`):** **Specific:** Justify selecting **NFC**, **BLE**, **Wi-Fi**, or **LTE** and **IaaS/PaaS/FaaS** for concrete range, battery, and cost constraints. **Measurable:** Score `>= 4/5` on `post-lesson-eval.md` and pass Part D critique. **Achievable:** Apply Lesson 2.1 tradeoff matrices. **Relevant:** Architecture decision-making for CTE projects. **Time-bound:** Before end of Lesson 2.1 Day 2.

## Teacher SMART Goals (Trackable — Instructional Commitments)
- [ ] **Goal 1 (`[L1–L2]` | `8.0`):** **Specific:** Collect baseline readiness via `pre-lesson-eval.md` and clarify HTTP vs. HTTPS and PaaS vs. IaaS distinctions. **Measurable:** Review diagnostic results with class before direct instruction. **Achievable:** 4-minute bell-ringer + 5-minute protocol board recap. **Relevant:** Targets misconceptions before lab coding. **Time-bound:** First 10 minutes of Day 1.
- [ ] **Goal 2 (`[L2–L3]` | `8.2, 8.4`):** **Specific:** Conduct a live `node:url` code walkthrough and model compression + RTT latency math step by step. **Measurable:** Verify every table group checks intermediate units (`KB` vs `Kb`, `ms` vs `s`). **Achievable:** Projector live-coding + guided check. **Relevant:** Connects abstract networking metrics to code. **Time-bound:** Minutes 15–30 of Day 1–2.
- [ ] **Goal 3 (`[L3]` | `8.2, 8.6`):** **Specific:** Circulate during `protocolLab.js` coding to troubleshoot URL scheme parsing and port defaults. **Measurable:** Check off 100% of pairs running passing Node assertions. **Achievable:** 20-minute lab support window. **Relevant:** Builds confident CLI test habits. **Time-bound:** During Day 2 lab block.
- [ ] **Goal 4 (`[L4–L5]` | `8.5, 8.6`):** **Specific:** Facilitate peer critique of Part D IoT & Cloud scenarios emphasizing battery, distance, and compliance trade-offs. **Measurable:** Provide live rubric feedback to each group before exit ticket. **Achievable:** 8-minute structured share-out. **Relevant:** Develops AZ CTE Prof. Skills 1.0 & 3.0. **Time-bound:** Minutes 35–43 of Day 2.
- [ ] **Goal 5 (`[L1–L5]` | `8.0`):** **Specific:** Administer `post-lesson-eval.md` + Kahoot Quiz 1 and share immediate concept reinforcement. **Measurable:** Achieve class mean gain $g \ge 0.55$ across paired items. **Achievable:** 5-minute exit ticket + Quiz 1 debrief. **Relevant:** Confirms Standard 8.0 readiness for Lesson 2.2. **Time-bound:** Final 7 minutes of Day 2.

---

## Part A: Protocol & Cloud Reference Table (`[L1 Remember]` & `[L2 Understand]`)
Complete the blank fields:
| Protocol / Tier | Port / Example | Encrypted / Control Level | Primary Role |
|---|---|---|---|
| **HTTPS** | `___` | TLS Encrypted | `_____________________` |
| **SSH** | `22` | `___________` | Remote terminal shell |
| **SFTP** | `22` | SSH Encrypted | `_____________________` |
| **IMAP** | `993` | TLS | `_____________________` |
| **IaaS** | AWS EC2 | You manage OS + App | `_____________________` |
| **FaaS** | Lambda | Pay per event invocation | `_____________________` |

## Part B: Protocol Inspector & IoT Router Lab (`[L3 Apply]`)
Open [`0-student_files/03-http-server/protocolLab.js`](../../0-student_files/03-http-server/protocolLab.js), implement `inspectEndpoint`, `calculateWireKb`, and `pickIotProtocol`, and uncomment verification checks to run cleanly in Node.

## Part C: Performance & Bandwidth Diagnosis (`[L4 Analyze]`)
A `4.0 MB` unminified bundle loads over a `4,000 Kbps` (`500 KB/s`) connection with `120 ms` RTT:
1. Uncompressed download time: `________ seconds`
2. If minified + Gzipped (`75%` reduction → `1.0 MB`) and served via local CDN (`15 ms` RTT), new download time: `________ seconds`

## Part D: Architecture Defense (`[L5 Evaluate]`)
Choose between **NFC**, **BLE**, **Wi-Fi**, and **LTE** for (1) a wearable sleep tracker syncing once per hour to a phone and (2) highway traffic cameras streaming telemetry miles from residential routers. Defend power, range, and cost tradeoffs (`8.6`):  
> *(Your defense)*
