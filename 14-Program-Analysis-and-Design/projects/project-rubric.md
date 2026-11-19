# Unit 14 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **User Stories & Diagrams (`10.2, 10.8`)** | L3 Apply / L6 Create | 3 clean user stories with verifiable Given/When/Then criteria + clear flowchart. | Stories miss Given/When/Then checks. | Vague requirements, no diagram. |
| **Stack & Compliance Justification (`10.3–10.6`)** | L5 Evaluate | Sound defense comparing SQL vs NoSQL and addressing HIPAA/PCI rules explicitly. | Mentions DB without HIPAA/PCI logic. | Missing architecture defense. |
| **Decomposition (`10.7`)** | L4 Analyze | Clean small single-responsibility helpers with zero tangled side effects. | One large helper doing multiple roles. | Monolithic unmodular script. |
| **Telemetry & Troubleshooting (`10.9–10.10`)** | L3 Apply | Emits anonymized `durationMs`/`ok` telemetry and gracefully logs structured errors without PII. | Missing latency tracking or leaks PII. | No telemetry or crash handling. |
