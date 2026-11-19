# Student Lesson 13.1: Version Control Systems, Git & CI/CD (`Std 14.0`)

**Reading:** [`readme.md`](./readme.md) | **Slides:** [`slides/slides.md`](./slides/slides.md)  
**Starter File:** [`../../0-student_files/13-vcs-community/changelogLab.js`](../../0-student_files/13-vcs-community/changelogLab.js)

## Part A: VCS Models & Workflows (`[L1 Remember]` & `[L2 Understand]`)
1. Compare **Local**, **Centralized (SVN)**, and **Distributed (Git)** VCS architectures (`14.1–14.2`):  
   > *(Your comparison)*
2. Put these commands in standard daily workflow order: `git commit`, `git push`, `git add`, `git switch -c`:  
   `1. ________ -> 2. ________ -> 3. ________ -> 4. ________`

## Part B: Applied CI/CD & Commit Lab (`[L3 Apply]`)
1. Complete `isConventionalCommit()` and `checkCiPullRequest()` inside [`0-student_files/13-vcs-community/changelogLab.js`](../../0-student_files/13-vcs-community/changelogLab.js).
2. Run in Node.js: `node 0-student_files/13-vcs-community/changelogLab.js`.

## Part C: Conflict & History Triage (`[L4 Analyze]`)
Inspect this merge conflict file:
```text
<<<<<<< HEAD
const PORT = 7000;
=======
const PORT = process.env.PORT || 8080;
>>>>>>> feat/cloud-port
```
Explain what each section means, which version keeps cloud configurability, and what 3 Git steps complete the resolution (`14.4`):  
> *(Your resolution plan)*

## Part D: DevSecOps Gate Design (`[L5 Evaluate]` & `[L6 Create]`)
A teammate accidentally committed `.env` containing an AWS API key and pushed it to GitHub. Describe BOTH (a) why `git rm .env && git commit` alone isn't enough security hygiene, and (b) the two-part incident response (`rotate key` + `.gitignore` / CI secret scan) (`14.7`):  
> *(Your defense)*

---

## Lesson SMART Objectives Tracker

Check off each milestone after completing and testing your own work (**zero solution spoilers — verify your commit linter and CI checks in Node.js**):

- [ ] **SL-L13.1-1 (`[L1–L2 Remember/Understand]` | Std `14.1–14.3` | `SG-U13-1`):** Compare Local, Centralized, and Distributed VCS architectures and order the 4 daily Git commands in Part A with >= 80% accuracy by Day 31.
- [ ] **SL-L13.1-2 (`[L3 Apply]` | Std `14.6–14.8` | `SG-U13-2`):** Implement `isConventionalCommit()` and `checkCiPullRequest()` in `changelogLab.js` and pass Node checks by end of Day 32.
- [ ] **SL-L13.1-3 (`[L4 Analyze]` | Std `14.4` | `SG-U13-3`):** Explain all conflict markers and list the 3 Git steps to resolve Part C cleanly before Kahoot Quiz 1 on Day 32.
- [ ] **SL-L13.1-4 (`[L5–L6 Evaluate/Create]` | Std `14.7` | `SG-U13-4`):** Outline your two-part `.env` incident response plan in Part D and complete [`post-lesson-eval.md`](./post-lesson-eval.md) by end of Day 32.
