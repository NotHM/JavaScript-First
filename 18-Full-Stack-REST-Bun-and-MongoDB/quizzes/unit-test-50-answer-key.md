# Unit 18 Mastery Exam — Teacher Answer Key & Certification Rationales (`Q1–Q50`)

**Assessment:** [`unit-test-50.md`](./unit-test-50.md) · **Kahoot Import:** [`unit-test-50-kahoot.csv`](./unit-test-50-kahoot.csv)  
**Certification Alignment Summary:** **`40 / 50` (`80.0% >= 75%`)** aligned across `CCNA` (11), `CompTIA-ITF+` (9), `CompTIA-Sec+` (9), `CIW-JS` (6), `ITS-JS` (5), plus 10 `Domain: CTE-Lab` specialist items across Bloom's `L1–L5` (`10` per tier).

---

## Part A — Core Recall (`[L1 Remember]`, Q1–Q10)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q1** | **B** | `[L1 Remember \| Std 16.5 \| Cert: CompTIA-ITF+]` | ON DELETE RESTRICT enforces referential integrity whenever child rows depend on a parent key. |
| **Q2** | **A** | `[L1 Remember \| Std 16.5 \| Cert: CompTIA-ITF+]` | SQL JOIN links normalized tables cleanly using primary and foreign keys. |
| **Q3** | **D** | `[L1 Remember \| Std 8.3 \| Cert: CCNA]` | Standard REST mapping assigns 201 created, 400 validation failure, 404 missing, 409 state conflict. |
| **Q4** | **C** | `[L1 Remember \| Std 8.3 \| Cert: CCNA]` | Content negotiation reads the client Accept header to pick matching JSON/HAL/JSON:API serializers. |
| **Q5** | **B** | `[L1 Remember \| Std 17.10 \| Cert: CCNA]` | JSON:API uses registered media type application/vnd.api+json. |
| **Q6** | **A** | `[L1 Remember \| Std 16.5 \| Cert: CCNA]` | GeoJSON strictly requires [longitude, latitude] so 2dsphere indexes calculate distances accurately. |
| **Q7** | **D** | `[L1 Remember \| Std 16.6 \| Cert: CompTIA-Sec+]` | Prepared ? bindings ensure user strings remain data literals rather than SQL commands. |
| **Q8** | **C** | `[L1 Remember \| Std 17.10 \| Cert: CIW-JS]` | Response.prototype.json() returns a Promise resolving the parsed JavaScript value. |
| **Q9** | **B** | `[L1 Remember \| Std 11.6 \| Domain: CTE-Lab]` | Node 24 includes DatabaseSync inside node:sqlite for zero-dependency offline SQL queries. |
| **Q10** | **A** | `[L1 Remember \| Std 16.5 \| Domain: CTE-Lab]` | SQLite disables FK enforcement per connection unless PRAGMA foreign_keys = ON executes. |

---

## Part B — Conceptual Understanding (`[L2 Understand]`, Q11–Q20)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q11** | **D** | `[L2 Understand \| Std 11.6 \| Cert: CCNA]` | In-process library calls bypass TCP sockets and wire protocol overhead. |
| **Q12** | **C** | `[L2 Understand \| Std 16.5 \| Cert: CompTIA-ITF+]` | Embedding small bounded subdocuments avoids extra joins on every parent read. |
| **Q13** | **B** | `[L2 Understand \| Std 16.5 \| Cert: CompTIA-ITF+]` | Atomic transactions guarantee either both inventory and order commit or neither mutates state. |
| **Q14** | **A** | `[L2 Understand \| Std 16.6 \| Cert: CompTIA-Sec+]` | Prepared statement drivers never re-parse bound parameters as SQL syntax tokens. |
| **Q15** | **D** | `[L2 Understand \| Std 17.1 \| Cert: ITS-JS]` | Pure Entity classes enforce invariants before Domain services touch storage handles. |
| **Q16** | **C** | `[L2 Understand \| Std 17.10 \| Cert: CIW-JS]` | Strategy polymorphism encapsulates format-specific serialization behind a uniform interface. |
| **Q17** | **B** | `[L2 Understand \| Std 16.5 \| Cert: CompTIA-ITF+]` | Filtering early avoids inflating revenue metrics with unpaid or voided records. |
| **Q18** | **A** | `[L2 Understand \| Std 8.3 \| Cert: CCNA]` | Accurate HTTP status codes guide clients cleanly between input validation fixes vs state/stock clashes. |
| **Q19** | **D** | `[L2 Understand \| Std 16.5 \| Domain: CTE-Lab]` | Atomic update operators like $set mutate targeted attributes safely without overwriting full docs. |
| **Q20** | **C** | `[L2 Understand \| Std 17.13 \| Domain: CTE-Lab]` | HAL+JSON relies on _links for navigational URIs and _embedded for nested sub-resources. |

---

## Part C — Practical Application (`[L3 Apply]`, Q21–Q30)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q21** | **B** | `[L3 Apply \| Std 16.6 \| Cert: CompTIA-Sec+]` | Binding wildcard patterns as a ? parameter prevents wildcard or quote characters from breaking SQL. |
| **Q22** | **A** | `[L3 Apply \| Std 16.5 \| Cert: CIW-JS]` | offset = (page - 1) * limit = (3 - 1) * 10 = 20 rows skipped. |
| **Q23** | **D** | `[L3 Apply \| Std 16.5 \| Cert: ITS-JS]` | Math.max and Math.min clamp numeric parameters deterministically against negative or oversized requests. |
| **Q24** | **C** | `[L3 Apply \| Std 8.3 \| Cert: CCNA]` | POST resource creation returns 201 Created paired with the negotiated JSON:API media header. |
| **Q25** | **B** | `[L3 Apply \| Std 8.3 \| Cert: CIW-JS]` | HTTP POST requests must specify method, Content-Type: application/json, and serialized string body. |
| **Q26** | **A** | `[L3 Apply \| Std 16.5 \| Cert: CompTIA-ITF+]` | Unique indexes enforce duplicate rejection atomically inside the storage engine. |
| **Q27** | **D** | `[L3 Apply \| Std 16.5 \| Cert: ITS-JS]` | Encapsulating pragma activation and table creation in setup ensures every instance starts consistent. |
| **Q28** | **C** | `[L3 Apply \| Std 16.6 \| Cert: CompTIA-Sec+]` | Mapping constraint codes to clean 409 messages hides internal schema paths from callers. |
| **Q29** | **B** | `[L3 Apply \| Std 16.5 \| Domain: CTE-Lab]` | MongoDB uses quoted dot-notation strings to filter nested document fields cleanly. |
| **Q30** | **A** | `[L3 Apply \| Std 16.5 \| Domain: CTE-Lab]` | Dot notation into an embedded array automatically matches documents containing a matching element. |

---

## Part D — Analysis & Debugging (`[L4 Analyze]`, Q31–Q40)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q31** | **D** | `[L4 Analyze \| Std 16.5 \| Cert: CompTIA-ITF+]` | SQLite parses FK DDL silently without enforcing rules unless enabled per connection. |
| **Q32** | **C** | `[L4 Analyze \| Std 16.6 \| Cert: CompTIA-Sec+]` | Interpolated quotes let attackers close strings early and inject always-true OR predicates. |
| **Q33** | **B** | `[L4 Analyze \| Std 8.3 \| Cert: CompTIA-Sec+]` | Servers must compute authoritative pricing from DB rows and verify/decrement stock atomically first. |
| **Q34** | **A** | `[L4 Analyze \| Std 17.10 \| Cert: CCNA]` | Strict content-negotiated clients verify the Content-Type media header matches application/vnd.api+json. |
| **Q35** | **D** | `[L4 Analyze \| Std 11.8 \| Cert: ITS-JS]` | Open server sockets or active handles keep Node event loop alive until closed inside after/finally. |
| **Q36** | **C** | `[L4 Analyze \| Std 16.5 \| Cert: CCNA]` | -112.06 exceeds latitude bounds [-90, 90]; swapping to [lng, lat] fixes spherical indexing. |
| **Q37** | **B** | `[L4 Analyze \| Std 8.3 \| Cert: CompTIA-Sec+]` | Catching known constraint errors maps collisions to 409 Conflict without leaking internal DB errors. |
| **Q38** | **A** | `[L4 Analyze \| Std 16.5 \| Cert: CIW-JS]` | Pre-filtering confirmed records before aggregation prevents unpaid drafts from skewing revenue. |
| **Q39** | **D** | `[L4 Analyze \| Std 16.5 \| Domain: CTE-Lab]` | MongoDB updateOne requires atomic operators such as $set rather than raw replacement objects. |
| **Q40** | **C** | `[L4 Analyze \| Std 16.5 \| Domain: CTE-Lab]` | Mapping Mongo E11000 duplicate key errors cleanly yields semantic 409 Conflict responses. |

---

## Part E — Evaluation & Architecture (`[L5 Evaluate]`, Q41–Q50)

| Q# | Key | Alignment, Standard & Bloom's | Rationale / Distractor Explanation |
|---|---|---|---|
| **Q41** | **B** | `[L5 Evaluate \| Std 16.5 \| Cert: CompTIA-ITF+]` | Relational ACID tables protect transactional inventory, while documents absorb evolving catalog attributes. |
| **Q42** | **A** | `[L5 Evaluate \| Std 11.6 \| Cert: CompTIA-ITF+]` | Multi-container horizontal scaling needs a shared client-server database supporting concurrent writes. |
| **Q43** | **D** | `[L5 Evaluate \| Std 16.6 \| Cert: CompTIA-Sec+]` | Transactional isolation stops interleaved requests from reading stale stock and creating negative qty. |
| **Q44** | **C** | `[L5 Evaluate \| Std 8.3 \| Cert: CompTIA-Sec+]` | Bounds checking prevents callers from triggering full-table multi-megabyte allocations per request. |
| **Q45** | **B** | `[L5 Evaluate \| Std 8.3 \| Cert: CCNA]` | Invalid input -> 400; missing parent resource -> 404; insufficient stock conflict -> 409. |
| **Q46** | **A** | `[L5 Evaluate \| Std 17.10 \| Cert: CCNA]` | REST decouples resource identity (URI) from representation format via Accept headers. |
| **Q47** | **D** | `[L5 Evaluate \| Std 17.1 \| Cert: ITS-JS]` | Pure entity validation enforces domain invariants fast without touching network or disk storage. |
| **Q48** | **C** | `[L5 Evaluate \| Std 11.8 \| Cert: CIW-JS]` | Dependency injection lets offline node:test suites verify exact production behavior without live containers. |
| **Q49** | **B** | `[L5 Evaluate \| Std 16.5 \| Domain: CTE-Lab]` | Snapshots protect historical receipts from future price edits while $lookup keeps live profile info fresh. |
| **Q50** | **A** | `[L5 Evaluate \| Std 11.7 \| Domain: CTE-Lab]` | Bun.serve mirrors Web Standards Request/Response ergonomics directly on top of JavaScriptCore. |
