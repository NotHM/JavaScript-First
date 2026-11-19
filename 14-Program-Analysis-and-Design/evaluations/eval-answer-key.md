# Unit 14 Evaluation Answer Key (Teacher Only)

## Pre-Unit Key (8 pts)
1. Planning, Requirements, Design, Implementation, Testing, Deployment, Maintenance | 2. GLBA | 3. SQL | 4. Full-stack event-driven web APIs vs Python ML/scripting | 5. role / feature / benefit | 6. Breaking large tasks into small modular helpers | 7. Reproduce consistently & capture error info | 8. Data-driven measurements locate real bottlenecks & regressions safely.

## Pre/Post Lesson 14.1 Key
- *Pre:* 1) Planning -> Design -> Implementation -> Testing; 2) True; 3) User Story; 4) Without reproduction you cannot confirm whether a code change actually fixed the bug.
- *Post:* 1) GLBA; 2) Python for ML/pandas vs Node for async Web/HTTP; 3) e.g. `fetchSalesData`, `computeMetrics`, `exportCsvReport`; 4) Removes unrelated variables so root cause appears immediately; 5) Guarantees ACID seat locks & zero double-booking across concurrent buyers.

## Post-Unit Key (12 pts)
1. RAD prototypes fast with lightweight iterations; RUP divides work into structured risk-mitigated phases (Inception, Elaboration, Construction, Transition).
2. HIPAA = Healthcare PHI; PCI DSS = Credit card data; GLBA = Financial/Banking customer privacy.
3. Heavy multi-threaded CPU workloads or large static enterprise codebases benefiting from strict compile-time contracts (`Java`/`C#`).
4. *Given* valid email/password, *When* student submits login form, *Then* redirect to `/dashboard` with HTTP `200`.
5. `parseArgs()`, `computeOrderTax()`, `saveOrderRecord()`, `sendReceiptEmail()`.
6. Halving 12 commits tests commit #6 first (`log2(12)` ≈ 4 steps vs scanning 12 commits sequentially).
7. **2 pts:** Core billing/patient records → **SQL** (strict HIPAA/PCI audit & ACID); unstructured high-frequency waveform streams → **NoSQL/Time-series**, honoring HIPAA encryption & PCI tokenization.
8. **2 pts:** Captures operational health (`p95 latency`, `500` error spikes) without risking PII privacy leaks under HIPAA/GDPR/FERPA.
9. **2 pts:** Clean branching flow diagram showing Pin Check decision and Sufficient Balance decision terminating safely in Receipt/Telemetry or Error Exit.
