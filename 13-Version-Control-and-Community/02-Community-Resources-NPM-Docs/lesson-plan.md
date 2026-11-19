# Lesson Plan 13.2: Community Resources, Stdlib, `npm` & Docs (`Std 13.0`)

**Unit:** Unit 13 | **Duration:** 2 Class Periods × 50 min | **Std:** `13.0` (`13.1`–`13.5`)

## Bloom's Objective Ladder
- **L1–L2:** Identify Node built-ins (`node:path`, `node:crypto`), SemVer notation, and `package-lock.json`.
- **L3 Apply:** Parse SemVer strings cleanly and use `path.join()`.
- **L4 Analyze:** Spot obsolete/insecure Stack Overflow answers against current MDN/Node docs.
- **L5 Evaluate / L6 Create:** Vet third-party packages and author clean `README.md` documentation.

## Instructor Answer Key
- **Pre 13.2:** 1) Any of `node:fs`, `node:path`, `node:os`, `node:crypto`, `node:http`; 2) `3` (`MAJOR`); 3) Teaches newcomers how to install, configure, and run software rapidly; 4) Unmaintained dependencies introduce unpatched CVEs and supply-chain risks.
- **Post 13.2:** 1) `node:path`; 2) `^4.18.2` allows minor & patch bumps `<5.0.0`, while `~4.18.2` allows patch bumps only `<4.19.0`; 3) Title/Description, Installation steps, Usage Example, License; 4) Official docs track active releases & deprecations, whereas old Q&A solutions can introduce removed APIs or security holes; 5) Use built-in `crypto.randomUUID()`—zero external attack surface, maintained by core Node runtime.
