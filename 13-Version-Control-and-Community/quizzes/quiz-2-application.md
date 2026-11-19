# Unit 13 Quiz 2: Branching, Merge Conflicts & Package Audits (Application)

**Bloom's:** `[L3]`–`[L5]` | **CSV:** [`quiz-2-kahoot.csv`](./quiz-2-kahoot.csv) | **Stds:** `14.0, 13.0`

| # | Scenario | Correct Answer | Time | Bloom's |
|---|---|---|---|---|
| 1 | Which command creates AND switches onto `feat/auth` in one step? | **`git switch -c feat/auth`** | 20s | `[L3 \| 14.4]` |
| 2 | You see `<<<<<<< HEAD` in `app.js`. What is occurring? | **Merge conflict waiting for resolution** | 20s | `[L3 \| 14.4]` |
| 3 | `"express": "~4.18.1"` permits upgrade to `4.19.0`? | **No (only `4.18.x` patches)** | 30s | `[L4 \| 13.2]` |
| 4 | `"jest": "^29.0.0"` permits upgrade to `29.7.0`? | **Yes (`^` allows minor/patch)** | 20s | `[L3 \| 13.2]` |
| 5 | A developer commits `.env` then deletes it in Commit #2. Is the API key safe? | **No — Commit #1 remains in Git history** | 30s | `[L4 \| 14.7]` |
| 6 | What command scans `node_modules` for known security CVEs? | **`npm audit`** | 20s | `[L3 \| 14.7]` |
| 7 | What does CI/CD DevSecOps stand for? | **Integrating automated build/test/security checks continually** | 20s | `[L2 \| 14.6]` |
| 8 | Why use `path.join('a', 'b')` instead of `'a/' + 'b'`? | **Cross-platform OS separator compatibility** | 20s | `[L4 \| 13.1]` |
| 9 | A Stack Overflow answer from 2014 vs official MDN 2026 doc conflict. Pick which? | **Official MDN / Node Docs** | 20s | `[L5 \| 13.4]` |
| 10 | Which metric weighs heaviest when choosing an external npm library? | **Active maintenance, zero CVEs & permissive license** | 30s | `[L5 \| 13.2]` |
