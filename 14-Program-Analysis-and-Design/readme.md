# Chapter 14: Program Analysis, SDLC & Software Design (`AZ CTE Std 10.0`)

## Student Learning Objectives (Bloom's Taxonomy)
- **`[L1 Remember]`** Name the 7 stages of the **SDLC** (`10.1`), user story templates (`10.2`), and industry frameworks (RAD, RUP, HIPAA, PCI DSS, GLBA) (`10.4`–`10.5`).
- **`[L2 Understand]`** Contrast JavaScript, Python, Java, and C# (`10.3`) and Relational SQL vs. NoSQL Document databases during system design (`10.6`).
- **`[L3 Apply]`** Decompose complex software specs into modular helpers (`10.7`), acceptance test plans (`10.2`), flowcharts/UML diagrams (`10.8`), and structured telemetry events (`10.10`).
- **`[L4 Analyze]`** Troubleshoot failing systems systematically (`reproduce → isolate → bisect → fix`) (`10.9`) and spot missing compliance constraints before coding (`10.5`).
- **`[L5 Evaluate]`**–**`[L6 Create]`** Select languages, database families, and SDLC models for real client scenarios and author an end-to-end Architecture Specification.

---

## 1. Software Development Lifecycle (SDLC) & Methodologies (`Std 10.1, 10.4`)
1. **Planning & Feasibility** → 2. **Requirements & User Stories** → 3. **Architecture & Design** → 4. **Implementation** → 5. **Verification & Testing** → 6. **Deployment** → 7. **Maintenance & Telemetry**.
- **RAD (Rapid Application Development):** Emphasizes rapid prototypes and user feedback over rigid upfront specs.
- **RUP (Rational Unified Process):** Risk-driven iterative phases (Inception, Elaboration, Construction, Transition).

## 2. User Stories & Acceptance Test Plans (`Std 10.2`)
- **User Story Format:** *"As a `<role>`, I want `<capability>`, so that `<measurable outcome>`."*
- **Acceptance Criteria (Given / When / Then):** Defines exact pass/fail checks *before* coding begins.

## 3. Comparing Languages & Data Stores (`Std 10.3, 10.6`)
| Criterion | JavaScript / Node.js | Python | Java / C# |
|---|---|---|---|
| **Typing** | Dynamic (+ TypeScript static) | Dynamic (+ type hints) | Static compiled |
| **Sweet Spot** | Full-stack Web/APIs, CLI, Evented I/O | Data science, AI/ML, scripting | Large enterprise microservices, Android/Unity |

- **SQL vs. NoSQL (`10.6`):** Pick **Relational SQL** for strict transactions, foreign keys, and ACID billing; pick **NoSQL Document stores** when item schemas evolve rapidly across unstructured attributes.

## 4. Compliance, Decomposition, Troubleshooting & Telemetry (`Std 10.5, 10.7–10.10`)
- **Regulatory Architecture (`10.5`):** **HIPAA** (health/encryption/BAA), **PCI DSS** (tokenized payments), **GLBA** (financial institutions safeguard consumer nonpublic data).
- **Problem Decomposition (`10.7`):** Split monolithic tasks (`processOrder`) into clean single-purpose units (`validateCart`, `computeTax`, `chargeToken`, `emitTelemetry`).
- **Telemetry & Feedback (`10.10`):** Record latency `ms`, error counts, and anonymized usage metrics to guide iterative fixes cleanly.

## Chapter Resources
- **Slides:** [`slides/slides.md`](./slides/slides.md)
- **Teacher Demo:** [`code/sdlcDesignDemo.js`](./code/sdlcDesignDemo.js)
- **Student Starter:** [`../0-student_files/14-program-design/systemDesignLab.js`](../0-student_files/14-program-design/systemDesignLab.js)
