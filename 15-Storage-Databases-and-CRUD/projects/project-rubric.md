# Unit 15 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **CRUD Semantics (`16.5–16.6`)** | L3 Apply | Full `insert`, `find`, `updateById`, `deleteById` preserving IDs and validating types. | Missing update or mutates objects directly. | Partial CRUD or broken IDs. |
| **Atomic File I/O (`16.3`)** | L4 Analyze | Writes `.tmp` file then atomically renames (`fs.rename`) cleaning test temps in `os.tmpdir()`. | Uses unsafe direct `writeFile` overwriting target mid-write. | No disk persistence. |
| **SHA-256 Verification (`16.4`)** | L5 Evaluate | Computes SHA-256 digest and explicitly throws/blocks corrupted snapshot loads. | Generates hash without verifying on read. | Zero integrity check. |
| **SQL vs NoSQL Justification (`16.5`)** | L6 Create | Compares ACID ledger transactions vs flexible schema docs coherently. | One-line generic note without tradeoffs. | Missing architectural brief. |
