# Lesson Plan 1.2: Terminal Basics, NVM, Node.js & Program Development (`Std 11.0`)

**Unit:** Unit 1 | **Duration:** 2 Class Periods (100 min total)  
**AZ CTE Standards:** `11.0` (`11.1`–`11.7`, `11.9`) | **Prof. Skills:** `4.0` Professionalism, `5.0` Initiative

---

## Lesson SMART Objectives (Teacher & Student Targets)
- [ ] **Teacher SMART Goal 1:** Verify 100% of student machines navigate directories and run `node -v`, `npm -v`, and `test.js` cleanly within the first 25 minutes of Day 1.
- [ ] **Student SMART Goal 1 (`[L1–L2]`):** Execute 6 core terminal commands (`pwd`, `ls`, `cd`, `mkdir`, `touch`, `rm`) and contrast AOT compiled vs. V8 JIT execution with >= 80% accuracy on `post-lesson-eval.md`.
- [ ] **Student SMART Goal 2 (`[L3–L4]`):** Build `sanitizeCliInput()` and `formatBanner()` in `cliFormatter.js` using camelCase and reset ANSI codes (`\x1b[0m`) with zero uncaught `TypeError`s by Day 2 wrap-up.

---

## Bloom's Taxonomy Objective Ladder
| Tier | Student Learning Objective |
|---|---|
| **L1 Remember** | Recall Bash commands (`pwd`, `ls`, `cd`, `mkdir`, `touch`, `rm`) and roles of Node.js, `npm`, NVM. |
| **L2 Understand** | Contrast compiled vs. interpreted/JIT execution and explain `package.json` scripts. |
| **L3 Apply** | Execute CLI navigation, complete `test.js` using camelCase, and format sanitized CLI banners with ANSI codes. |
| **L4 Analyze** | Diagnose runtime crashes from missing `process.argv` validation and un-reset ANSI escape codes. |
| **L5 Evaluate** | Critique non-portable OS paths and justify standardized `npm run` automation scripts. |

---

## Materials & Assessments
- **Readings:** [`00-terminal-basics...md`](./00-terminal-basics-and-installing-nvm-node-js.md), [`01-node-overview.md`](./01-node-overview.md)
- **Slides:** [`slides/slides.md`](./slides/slides.md) (and [`../readme.md`](../readme.md))
- **Teacher Demo:** [`code/cliFormatterDemo.js`](./code/cliFormatterDemo.js)
- **Student Files:** [`student-lesson.md`](./student-lesson.md), [`../../0-student_files/01-terminal-and-node/`](../../0-student_files/01-terminal-and-node/)
- **Growth Proof:** [`pre-lesson-eval.md`](./pre-lesson-eval.md) & [`post-lesson-eval.md`](./post-lesson-eval.md)

---

## 2-Day Pacing Plan
- **Day 1 (50 min):** `pre-lesson-eval.md` (4 min) → CLI Demo & Interpreted/Compiled comparison (`slides/slides.md`, 18 min) → Terminal navigation lab + `test.js` (22 min) → Quick verbal check on `../` vs `./` (6 min).
- **Day 2 (50 min):** NVM & `package.json` scripts (`11.7`) + Walkthrough of `code/cliFormatterDemo.js` (15 min) → Student lab completing `cliFormatter.js` & Parts C–D (28 min) → `post-lesson-eval.md` (7 min) + Unit **Kahoot Quiz 1**.

---

## Instructor Answer Key

### Pre-Lesson 1.2 Key
1. Moves up one parent directory.
2. Interpreted / JIT compiled inside V8.
3. Declares project metadata, dependencies, and automation `"scripts"` reproducibly across teammates.
4. `process.argv[2]` is `undefined` when omitted (throws `TypeError` on `.trim()`), or raw whitespace/control characters distort output.

### Post-Lesson 1.2 Key
1. `mkdir src && touch src/index.js`
2. **NVM** switches Node.js runtime versions per project; **npm** installs/manages project packages and runs `package.json` scripts.
3. Uses snake/Pascal naming (`Student_status` instead of `camelCase` `studentStatus`), and omits `\x1b[0m` reset code, leaving green styling stuck in the terminal.
4. Source `.js` stays platform-neutral text executed by the platform's installed V8/Node runtime.
5. Windows-only absolute path crashes on macOS/Linux/GitPod; `"start": "node index.js"` invokes the active `$PATH` runtime portably everywhere.
