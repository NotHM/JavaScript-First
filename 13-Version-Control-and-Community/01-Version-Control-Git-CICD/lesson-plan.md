# Lesson Plan 13.1: Version Control Systems, Git & CI/CD (`Std 14.0`)

**Unit:** Unit 13 | **Duration:** 3 Class Periods × 50 min | **Std:** `14.0` (`14.1`–`14.8`)

## Bloom's Objective Ladder
- **L1–L2:** Contrast Local/Centralized/Distributed VCS models and trace Staging vs. Local vs. Remote Git zones.
- **L3 Apply:** Branch cleanly, follow Conventional Commits, and validate staged files in Node.js.
- **L4 Analyze:** Resolve 3-way merge conflict markers cleanly and distinguish `revert` vs `reset --hard`.
- **L5 Evaluate:** Design DevSecOps automated PR checks and respond to exposed-secret incidents.

## Instructor Answer Key
- **Pre 13.1:** 1) Distributed; 2) `git add app.js`; 3) Keeps `main` deployable/green while iterating independently; 4) `.env`, private `.pem` keys, `node_modules/`.
- **Post 13.1:** 1) SVN stores full history strictly on central server; Git clones full history to every machine; 2) `revert` creates a new safe forward undo commit without rewriting shared teammate history; 3) e.g., `fix: guard divide-by-zero in tax helper`; 4) Merge conflict markers between current `HEAD` vs incoming branch—pick desired code, remove marker lines, `git add`, `git commit`; 5) Unit/integration tests pass, linter passes, dependency/secret CVE scan clean.
- **Worksheet Part D:** Old git commit history retains `.env` permanently even after later deletion—must immediately **revoke/rotate leaked credentials** AND add `.env` to `.gitignore` + enable secret-scanning hooks.
