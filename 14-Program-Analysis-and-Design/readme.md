# Chapter 14: Program Analysis, SDLC & System Design (`AZ CTE Std 10.0`)

> **Here is a secret that separates junior coders from senior engineers:** senior engineers spend *less* time deleting code because they spend an hour designing boundaries *before* they type `function`.

I learned this the expensive way early in my career. A stakeholder asked for a "simple clinic check-in app." Excited to prove how fast I could ship, I opened `index.js`, skipped requirements, jammed database writes, validation, tax math, and HTML templates into one 500-line file, and demoed it on Friday. On Monday morning, the stakeholder said, *"Awesome—now we need HIPAA audit logging, SMS reminders, and a relational report of missed slots."*

Nothing in my mega-function was reusable. Validation was tangled inside SQL strings. Logging printed raw patient emails to stdout. Fixing it wasn't refactoring—it was a full rewrite.

**Jumping straight to code feels fast on Day 1 and becomes twice as slow by Week 3.** Chapter 14 teaches **AZ CTE Standard 10.0 (`10.1–10.10`)**: how engineers translate messy human ideas into resilient, compliant, observable software architectures before writing production code.

---

## Chapter Map, Environment Setup & Assessments

- **Slides:** [`slides/slides.md`](./slides/slides.md) | **Student Worksheet:** [`student-lesson.md`](./student-lesson.md)
- **Instructor Demo:** [`code/sdlcDesignDemo.js`](./code/sdlcDesignDemo.js)
- **Student Starters:** [`systemDesignLab.js`](../0-student_files/14-program-design/systemDesignLab.js) | [`unit-14-system-spec/index.js`](../0-student_files/projects/unit-14-system-spec/index.js)
- **Environment & Tooling Checklist:** [`setup-guide.md`](./setup-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Quizzes & 50-Q Mastery Exam:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md) | [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md)
- **Unit Project:** [`projects/unit-project.md`](./projects/unit-project.md)
- **Automated TDD Check:** Run `npm run grade -- --unit 14`

---

## 1. The 7 Phases of the SDLC & Process Models (`Std 10.1, 10.4`)

Software doesn't teleport from a coffee-stained napkin into production. Every healthy engineering lifecycle moves through seven core **SDLC** phases (`Std 10.1`), whether you iterate weekly or release quarterly:

1. **Planning & Feasibility:** Define business goals, budget, timeline, and legal/technical constraints.
2. **Requirements & Analysis:** Interview stakeholders, write user stories, and lock testable acceptance criteria.
3. **System Architecture & Design:** Choose languages, databases, compliance controls, API contracts, and ERDs/flowcharts.
4. **Implementation:** Build decomposed, documented modules behind automated tests.
5. **Verification & Testing:** Prove behavior against acceptance criteria (`node:test`, integration, security scans).
6. **Deployment:** Ship via repeatable CI/CD pipelines with rollback plans.
7. **Maintenance & Telemetry:** Monitor latency, error rates, and real usage to guide the next iteration.

> **War Story:** Skipping Phase 2 (Requirements) and Phase 3 (Design) doesn't eliminate those phases—it just pushes them into Phase 7 (Maintenance), where changing a database schema costs **10x to 50x more** because live customer data already exists.

### Methodologies in Practice: Waterfall vs. RAD vs. RUP vs. Agile (`Std 10.4`)

| Methodology | Core Philosophy | Where It Shines | Where It Hurts |
|---|---|---|---|
| **Waterfall** | Linear phase gates completed sequentially | Aerospace firmware, regulated medical hardware | Late requirement changes trigger costly rework |
| **RAD (Rapid App Dev)** | Rapid prototypes + continuous user feedback | Startups validating UI flows quickly | Skipping architectural rigor creates tech debt |
| **RUP (Rational Unified Process)** | Risk-driven phases: *Inception → Elaboration → Construction → Transition* | Complex enterprise platforms needing risk mitigation | Heavier ceremony for tiny teams |
| **Agile / Scrum** | Short `2-week` sprints delivering tested increments | Evolving web/mobile SaaS products | Fails if stakeholders never attend reviews |

---

## 2. User Stories & Acceptance Criteria (`Std 10.2`)

> **Myth:** *"Requirements documents are useless bureaucracy—just ask the client what buttons they want."*  
> **Reality:** Vague prompts like *"Build a search bar"* mean three different things to a designer, a backend engineer, and a QA tester. **User Stories + Given/When/Then criteria remove ambiguity before a single line of JS is written.**

Every crisp User Story pairs a **user role**, a **capability**, and a **measurable outcome**:

> *"As a **clinic patient**, I want **to filter available telehealth slots by date**, so that **I can book an appointment in under 60 seconds**."*

Then immediately attach **Given / When / Then** Acceptance Criteria so QA (and your `node:test` file!) knows the exact definition of "done":

- **Given** a clinic schedule with 3 open slots on `2026-10-05` and 2 booked slots,
- **When** the patient selects `2026-10-05` and submits a valid `patientId`,
- **Then** the API returns HTTP `201` with `confirmed: true`, decrements availability by 1, and records anonymized latency telemetry.

> **Try this right now:** Pick one feature in your next project and write 1 User Story + 2 Given/When/Then scenarios *before* writing code. Notice how those scenarios turn directly into `test(...)` assertions!

---

## 3. Language & Stack Tradeoffs Without Fanboy Wars (`Std 10.3, 10.6`)

Students love asking, *"Which language is objectively best?"* That's like asking whether a screwdriver is better than a torque wrench. Strong architects match the stack to the workload (`Std 10.3`):

| Criterion | JavaScript / TypeScript (Node.js) | Python | Java / C# |
|---|---|---|---|
| **Type System** | Dynamic JS (opt-in static via TypeScript / JSDoc) | Dynamic (optional type hints) | Strictly static compiled |
| **Execution Model** | V8 JIT + non-blocking Event Loop | CPython interpreter (+ C extensions) | JVM / .NET CLR bytecode + JIT |
| **Concurrency Strength** | High-throughput async I/O (APIs, WebSockets) | Great glue for C/GPU ML kernels | True multi-threaded CPU parallelism |
| **Ecosystem Sweet Spot** | Full-stack web, unified browser/server code, CLIs | AI/ML (`PyTorch`, `pandas`), data science | Banking core systems, Android, Unity games |

### UI Flows, Control-Flow Diagrams & Data ERDs (`Std 10.8`)

Before writing database migrations or HTTP handlers, sketch two diagrams so teammates align visually:

```text
[Patient Submits Slot] ──▶ [Valid patientId & Date?] ──(No)──▶ [HTTP 400 + Error Telemetry]
                                    │
                                  (Yes)
                                    ▼
                        [SQL Transaction: Slot Free?] ──(No)──▶ [HTTP 409 Conflict]
                                    │
                                  (Yes)
                                    ▼
                     [Confirm Booking + Emit Ok Telemetry]
```

And draw an **Entity-Relationship Diagram (ERD)** to reveal primary keys, foreign keys, and uniqueness rules before writing a single `CREATE TABLE` statement:

```text
+------------------+          +----------------------+          +------------------+
|     patients     |          |     appointments     |          |    clinicians    |
+------------------+          +----------------------+          +------------------+
| PK id            | 1      * | PK id                | *      1 | PK id            |
|    full_name     |──────────| FK patient_id        |──────────|    full_name     |
|    dob           |          | FK clinician_id      |          |    specialty     |
|    created_at    |          |    slot_utc (UNIQUE) |          |    active        |
+------------------+          |    status            |          +------------------+
                              +----------------------+
```

Notice how drawing those 12 lines of ASCII immediately exposes a critical rule: `(clinician_id, slot_utc)` must have a **composite unique constraint** so two patients cannot book the same clinician at the same timestamp!

### Choosing Relational SQL vs. NoSQL Document Databases (`Std 10.6`)

- **Choose Relational SQL (PostgreSQL / SQLite)** when data is strongly relational, requires **ACID multi-table transactions** (e.g., transferring money or reserving the last clinic slot without double-booking), and benefits from strict foreign-key integrity.
- **Choose NoSQL Document (MongoDB)** when payloads are polymorphic or rapidly evolving (e.g., IoT telemetry packets from 20 sensor firmware versions) and flexible document nesting matters more than cross-table joins.

```javascript
// Runnable pedagogical stack & compliance advisor (run directly with node)
function designSystemBlueprint({ domain, needsStrictAcid, highThroughputIo, mlHeavy }) {
  const complianceMap = {
    healthcare: ['HIPAA', 'Encryption at Rest/TLS', 'Immutable Audit Log'],
    ecommerce: ['PCI DSS', 'Tokenized Checkout'],
    banking: ['GLBA', 'Safeguards Rule', 'RBAC'],
  };
  const runtime = mlHeavy ? 'Python (FastAPI + PyTorch)' : highThroughputIo ? 'Node.js (TypeScript)' : 'Java / C#';
  const database = needsStrictAcid ? 'Relational SQL (PostgreSQL)' : 'Document NoSQL (MongoDB)';
  return { domain, runtime, database, controls: complianceMap[domain] || ['Baseline OWASP TLS'] };
}

console.log(designSystemBlueprint({ domain: 'healthcare', needsStrictAcid: true, highThroughputIo: true, mlHeavy: false }));
console.log(designSystemBlueprint({ domain: 'ecommerce', needsStrictAcid: true, highThroughputIo: false, mlHeavy: true }));
```

---

## 4. Compliance by Design: HIPAA, PCI DSS & GLBA (`Std 10.5`)

Compliance is **not** a sticker you slap onto an app the night before launch. If your architecture stores raw credit card numbers in plain JSON logs, no CSS redesign will pass an audit.

| Regulation | Domain Protected | Architectural Mandate | Classic Violation to Avoid |
|---|---|---|---|
| **HIPAA** | US Healthcare / Protected Health Information (PHI) | Encryption at rest & in transit, RBAC access controls, immutable audit logs, BAA with cloud host | Printing `diagnosis` or `patientName` inside server logs or telemetry JSON |
| **PCI DSS** | Credit & Debit Card Processing | Never store raw PAN/CVV; delegate card entry to tokenized gateways (e.g., Stripe); segment networks | Saving card numbers in `localStorage` or database `orders` rows |
| **GLBA** | Financial & Banking Institutions | Safeguards Rule: encrypt consumer nonpublic financial data and monitor unauthorized access | Exposing unauthenticated `/api/accounts/:id` endpoints (IDOR) |

---

## 5. Problem Decomposition, Systematic Debugging & Telemetry (`Std 10.7, 10.9–10.10`)

Look at how decomposing a checkout workflow turns a tangled script into testable, observable building blocks (`Std 10.7, 10.10`):

```javascript
// Runnable pedagogical decomposition & anonymized telemetry pattern
function validateCart(cart) {
  if (!Array.isArray(cart?.items) || cart.items.length === 0) {
    throw new RangeError('Cart must contain at least one item');
  }
  return true;
}

function computeSubtotalCents(items) {
  return items.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
}

function buildTelemetry(action, startMs, status, errorCode = null) {
  return {
    timestamp: new Date().toISOString(),
    action,
    durationMs: Number((performance.now() - startMs).toFixed(3)),
    status,
    errorCode,
  };
}

function runCheckoutPipeline(cart) {
  const start = performance.now();
  try {
    validateCart(cart);
    const subtotalCents = computeSubtotalCents(cart.items);
    return { ok: true, subtotalCents, telemetry: buildTelemetry('checkout', start, 'ok') };
  } catch (err) {
    return { ok: false, error: err.message, telemetry: buildTelemetry('checkout', start, 'error', err.name) };
  }
}

console.log(runCheckoutPipeline({ items: [{ sku: 'BK-1', priceCents: 1500, qty: 2 }] }));
console.log(runCheckoutPipeline({ items: [] }));
```

Notice what is **missing** from `buildTelemetry`? Customer names, emails, diagnoses, and card numbers. Operational observability answers *how fast* (`durationMs`) and *whether it succeeded* (`status: 'ok' | 'error'`) without creating a privacy liability!

> **Try this right now:** Execute the chapter's reference architecture & telemetry engine:
> ```bash
> node 14-Program-Analysis-and-Design/code/sdlcDesignDemo.js
> ```

### Systematic Troubleshooting (`Std 10.9`) vs. Random Guessing

When latency triples at 2:00 AM, guessing random edits destroys evidence. Follow the 4-step root-cause protocol:
1. **Reproduce reliably:** Create a deterministic test case or curl request that triggers the bug 100% of the time.
2. **Isolate variables:** Strip unrelated middleware or inspect structured telemetry (`durationMs`, `status`, error stack) to narrow the failing module.
3. **Bisect history (`git bisect`):** Binary-search commits (`log2(64)` = just 6 steps!) to pinpoint the exact commit that introduced the regression.
4. **Fix & guard:** Patch the root cause and lock a regression test into `node:test` so the bug never returns.

```bash
# Binary-search the exact commit that broke checkout latency across 64 commits (~6 steps!)
git bisect start
git bisect bad HEAD
git bisect good v1.4.0
```

---

## 6. Chapter 14 Core Terminology & Error Triage

| Term | Definition |
|---|---|
| **SDLC** | Seven structured phases guiding software from Planning through Maintenance & Telemetry |
| **Acceptance Criteria** | Binary *Given / When / Then* checks proving a user story works before coding ends |
| **RAD vs. RUP** | RAD optimizes rapid user prototypes; RUP structures work into 4 risk-mitigated phases |
| **Problem Decomposition** | Splitting complex workflows into small, single-responsibility, independently testable helpers |
| **Telemetry Observability** | Measuring anonymized `durationMs`, status codes, and error rates empirically in production |

| Failure Pattern | Architectural Root Cause | Remediation |
|---|---|---|
| Two patients book the exact same last clinic slot | Non-atomic read-then-write without DB lock/constraint | Move slot reservation into a **SQL ACID transaction** with unique constraint `(clinician_id, slot_time)` |
| Patient email/diagnosis leaks into CloudWatch/Datadog | Raw `req.body` passed straight to `console.log()` | Allowlist telemetry fields strictly (`{ timestamp, action, durationMs, status }`) |
| 500-line controller breaks whenever tax logic changes | Zero problem decomposition (`Std 10.7`) | Split into pure functions (`validateInput`, `computePricing`, `persistRecord`, `emitTelemetry`) |
| Feature passes dev demo but fails client QA | Missing Given/When/Then acceptance criteria (`Std 10.2`) | Lock testable acceptance criteria with stakeholders during Requirements phase |
| Bug exists somewhere in last 100 commits | Ad-hoc manual blame guessing | Run `git bisect start`, mark `bad` and `good`, isolate culprit in ~7 binary checks |

---

## Ready to Architect & Verify?
1. Review diagramming, JSDoc, and structured JSON logging standards in [`setup-guide.md`](./setup-guide.md).
2. Complete [`systemDesignLab.js`](../0-student_files/14-program-design/systemDesignLab.js) and the Telehealth Blueprint in [`unit-14-system-spec/index.js`](../0-student_files/projects/unit-14-system-spec/index.js) until `npm run grade -- --unit 14` reports **GREEN**.
3. Prove mastery across all 5 Bloom's tiers on [`quizzes/unit-test-50.md`](./quizzes/unit-test-50.md).
