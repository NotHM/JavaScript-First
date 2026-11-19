# Unit 14 Mastery Exam — Teacher Answer Key & Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Coverage:** AZ CTE Stds `10.1–10.10` across Bloom's `L1–L5` (10 items per tier) · **Cert Alignment:** `45/50 (90%)` (`CompTIA-ITF+`, `CompTIA-Sec+`, `CIW-JS`, `CompTIA-A+`)

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| 10.1]` | `Cert: CompTIA-ITF+` | Planning & Feasibility initiates the 7-phase SDLC before Requirements, Design, Implementation, Testing, Deployment, and Maintenance. |
| **Q2** | **A** | `[L1 Remember \| 10.1]` | `Cert: CompTIA-ITF+` | Maintenance monitors production telemetry, resolves bugs, and feeds improvements into future iterations. |
| **Q3** | **C** | `[L1 Remember \| 10.2]` | `Cert: CompTIA-ITF+` | User stories follow "As a [role], I want [capability], so that [business value]". |
| **Q4** | **D** | `[L1 Remember \| 10.2]` | `Domain: CTE-Lab` | Given/When/Then specifies initial context, trigger action, and verifiable expected outcome cleanly. |
| **Q5** | **A** | `[L1 Remember \| 10.4]` | `Cert: CompTIA-ITF+` | RUP organizes delivery into Inception, Elaboration, Construction, and Transition to mitigate technical risks early. |
| **Q6** | **B** | `[L1 Remember \| 10.5]` | `Cert: CompTIA-Sec+` | HIPAA governs healthcare privacy and security; PCI DSS protects credit cards and GLBA protects banking data. |
| **Q7** | **C** | `[L1 Remember \| 10.5]` | `Cert: CompTIA-Sec+` | PCI DSS mandates strict encryption, tokenization, and access controls for any payment card workflow. |
| **Q8** | **D** | `[L1 Remember \| 10.5]` | `Cert: CompTIA-Sec+` | The Gramm-Leach-Bliley Act (GLBA) Safeguards Rule regulates financial institutions protecting consumer records. |
| **Q9** | **B** | `[L1 Remember \| 10.7]` | `Cert: CIW-JS` | Problem Decomposition divides big problems into cohesive, reusable, independently testable helpers. |
| **Q10** | **A** | `[L1 Remember \| 10.10]` | `Cert: CIW-JS` | performance.now() returns high-resolution monotonic milliseconds ideal for accurate telemetry. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q11** | **C** | `[L2 Understand \| 10.1]` | `Cert: CompTIA-ITF+` | Fixing foundational schema or compliance flaws after live customer data exists forces costly migrations and rewrites. |
| **Q12** | **B** | `[L2 Understand \| 10.4]` | `Cert: CompTIA-ITF+` | RAD iterates rapidly around clickable prototypes and continuous stakeholder feedback rather than rigid stage gates. |
| **Q13** | **D** | `[L2 Understand \| 10.3]` | `Cert: CIW-JS` | Node enables unified full-stack JavaScript/TypeScript and excels at high-concurrency non-blocking network I/O. |
| **Q14** | **A** | `[L2 Understand \| 10.3]` | `Cert: CompTIA-ITF+` | Java and C# deliver mature static type systems and true multi-threaded CPU parallelism for heavy enterprise cores. |
| **Q15** | **C** | `[L2 Understand \| 10.8]` | `Cert: CompTIA-ITF+` | ERDs expose entity relationships, foreign keys, and composite uniqueness rules before table migrations ship. |
| **Q16** | **B** | `[L2 Understand \| 10.8]` | `Cert: CompTIA-ITF+` | Control-flow diagrams show execution branches/decisions while UML Class diagrams specify fields, methods, and object relations. |
| **Q17** | **D** | `[L2 Understand \| 10.6]` | `Cert: CompTIA-ITF+` | SQL schemas validate data types and enforce referential integrity across normalized joined tables. |
| **Q18** | **A** | `[L2 Understand \| 10.10]` | `Cert: CompTIA-Sec+` | Privacy-by-design anonymized operational fields track latency and failure rates empirically without creating HIPAA/GDPR/PII leaks. |
| **Q19** | **C** | `[L2 Understand \| 10.9]` | `Cert: CompTIA-A+` | Without deterministic reproduction, you cannot isolate the root cause or verify your patch truly resolved the defect. |
| **Q20** | **B** | `[L2 Understand \| 10.9]` | `Domain: CTE-Lab` | Binary search cuts remaining candidate commits in half every test (`log2 N`), finding bugs in ~6 steps across 64 commits. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q21** | **B** | `[L3 Apply \| 10.2]` | `Domain: CTE-Lab` | Option B states a concrete testable Given/When/Then assertion matching observable API output. |
| **Q22** | **A** | `[L3 Apply \| 10.5]` | `Cert: CompTIA-Sec+` | Telehealth patient records invoke HIPAA while credit card billing requires PCI DSS tokenization. |
| **Q23** | **D** | `[L3 Apply \| 10.6]` | `Cert: CompTIA-ITF+` | Document DBs store polymorphic, nested JSON payloads cleanly without brittle migrations or sparse null columns. |
| **Q24** | **C** | `[L3 Apply \| 10.7]` | `Cert: CIW-JS` | Splitting input validation, availability check, persistence, and telemetry yields clean single-responsibility functions. |
| **Q25** | **A** | `[L3 Apply \| 10.10]` | `Cert: CompTIA-Sec+` | Only Option A omits PII/PHI/PAN while recording action, timing, and boolean status. |
| **Q26** | **B** | `[L3 Apply \| 10.8]` | `Cert: CompTIA-ITF+` | Foreign key patient_id referencing patients.id enforces referential integrity between appointments and patients. |
| **Q27** | **B** | `[L3 Apply \| 10.8]` | `Cert: CompTIA-ITF+` | Standard ANSI flowcharts use Ovals for Start/End terminators, Rectangles for processing operations, and Diamonds for conditional branches. |
| **Q28** | **C** | `[L3 Apply \| 10.3]` | `Cert: CompTIA-ITF+` | Python leads ML/data workflows thanks to native PyTorch, NumPy, and pandas C/GPU ecosystems. |
| **Q29** | **B** | `[L3 Apply \| 10.2]` | `Domain: CTE-Lab` | Structured @param and @returns JSDoc tags specify parameter types and expected return contracts explicitly. |
| **Q30** | **A** | `[L3 Apply \| 10.8]` | `Cert: CompTIA-ITF+` | A composite unique index on (clinician_id, slot_utc) guarantees at DB level no two bookings claim one doctor slot. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q31** | **C** | `[L4 Analyze \| 10.7]` | `Cert: CIW-JS` | Tightly coupling UI, business math, and persistence prevents isolated unit testing and forces risky rewrites. |
| **Q32** | **B** | `[L4 Analyze \| 10.5]` | `Cert: CompTIA-Sec+` | Dumping req.body into centralized logs exposes regulated patient PII/PHI to unauthorized log viewers. |
| **Q33** | **D** | `[L4 Analyze \| 10.6]` | `Cert: CompTIA-ITF+` | Checking availability in JS before saving allows a race condition unless wrapped inside an atomic SQL transaction/constraint. |
| **Q34** | **B** | `[L4 Analyze \| 10.9]` | `Cert: CompTIA-A+` | Step 5 verifies whole-system health/regression tests + preventive safeguards, and Step 6 documents findings, outcomes, and actions taken. |
| **Q35** | **C** | `[L4 Analyze \| 10.10]` | `Cert: CompTIA-A+` | High durationMs (~4.8s) paired with ETIMEDOUT signals downstream network or database latency saturation. |
| **Q36** | **B** | `[L4 Analyze \| 10.2]` | `Cert: CompTIA-ITF+` | Without shared Given/When/Then acceptance criteria agreed upfront, developer and QA test different definitions of done. |
| **Q37** | **D** | `[L4 Analyze \| 10.5]` | `Cert: CompTIA-Sec+` | PCI DSS strictly forbids storing unencrypted raw PANs/CVVs in browser storage or un-tokenized DB tables. |
| **Q38** | **A** | `[L4 Analyze \| 10.10]` | `Cert: CIW-JS` | Fast synchronous steps complete under 1ms, so Date.now() returns 0ms; performance.now() captures fractional microseconds. |
| **Q39** | **B** | `[L4 Analyze \| 10.9]` | `Cert: CompTIA-A+` | Mutating multiple subsystems without isolating the failing variable masks the root cause and introduces new defects. |
| **Q40** | **C** | `[L4 Analyze \| 10.1]` | `Cert: CompTIA-ITF+` | Investing in UI build before validating stakeholder requirements forces costly Phase 7 rework. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Standard & Bloom's | Alignment | Rationale / Distractor Explanation |
|---|---|---|---|---|
| **Q41** | **A** | `[L5 Evaluate \| 10.6]` | `Cert: CompTIA-ITF+` | Pairing SQL for transactional financial integrity with Document/JSON storage for nested clinical records matches each workload. |
| **Q42** | **B** | `[L5 Evaluate \| 10.4]` | `Cert: CompTIA-ITF+` | Fast UI feedback thrives under RAD/Agile prototypes, whereas safety-critical hardware requires strict Waterfall verification. |
| **Q43** | **D** | `[L5 Evaluate \| 10.3]` | `Cert: CIW-JS` | Node/TS excels at concurrent WebSockets/web UI while delegating heavy ML inference to a specialized Python service. |
| **Q44** | **C** | `[L5 Evaluate \| 10.5]` | `Cert: CompTIA-Sec+` | Using tokenized checkout gateways (like Stripe Elements) keeps raw PAN/CVV off your servers entirely, shrinking PCI scope. |
| **Q45** | **A** | `[L5 Evaluate \| 10.2]` | `Domain: CTE-Lab` | Clear User Stories and Given/When/Then criteria align engineering, design, and QA before implementation begins. |
| **Q46** | **B** | `[L5 Evaluate \| 10.10]` | `Cert: CompTIA-Sec+` | Emitting anonymized action/duration/status/errorCode counters gives observability while preventing PII compliance breaches. |
| **Q47** | **D** | `[L5 Evaluate \| 10.7]` | `Cert: CIW-JS` | Pure validation helpers take input, throw/return deterministically without I/O side effects, making unit testing trivial. |
| **Q48** | **C** | `[L5 Evaluate \| 10.4]` | `Cert: CompTIA-ITF+` | RUP enforces early Inception/Elaboration risk validation and baseline architecture verification before full Construction. |
| **Q49** | **A** | `[L5 Evaluate \| 10.9]` | `Cert: CompTIA-A+` | Locking a failing-then-passing preventive regression test into CI ensures the exact defect cannot re-enter production. |
| **Q50** | **B** | `[L5 Evaluate \| 10.8]` | `Cert: CompTIA-ITF+` | Combining a normalized ERD with a request/error control-flow diagram eliminates both schema and routing ambiguity upfront. |
