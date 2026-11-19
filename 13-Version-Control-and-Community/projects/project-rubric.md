# Unit 13 Project Rubric (Teacher Only)

| Criterion | Bloom's | Exemplary (25 pts) | Proficient (20 pts) | Needs Support (10 pts) |
|---|---|---|---|---|
| **Stdlib Architecture (`13.1`)** | L3 Apply | Zero external deps; clean `node:path` + `node:crypto` + `node:fs`. | Hardcoded slashes `/` instead of `path.join`. | Fails module imports. |
| **Conventional Commits & Release Notes (`14.8`)** | L3 Apply / L6 Create | Accurately groups `feat:`, `fix:`, flags non-conforming commits, computes SemVer bump (`minor` vs `patch`). | Groups commits without SemVer bump calculation. | Broken commit regex. |
| **DevSecOps Gate & Package Audit (`13.2, 14.7`)** | L4 Analyze / L5 Evaluate | Rejects `.env`/`.pem`, failing tests, and known CVEs cleanly with actionable blockers. | Checks tests only, misses secret/CVE gating. | Missing gate checks. |
| **Documentation Quality (`13.5`)** | L6 Create | `README.md` covers Prerequisites, Install, Runnable Usage, and License cleanly. | Missing Install or License section. | Unreadable or empty docs. |
