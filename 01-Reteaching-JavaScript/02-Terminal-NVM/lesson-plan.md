# Lesson Plan 1.2: Terminal Basics, NVM & Node.js

**Unit:** Unit 1 — Reteaching JavaScript & Node.js  
**Duration:** 2 Class Periods (50 minutes each)  
**AZ CTE Standards:** Software & App Design 11.0202.00 — Standard 14.0 (Developer workflows & CLI), Standard 18.0 (Runtime troubleshooting); AZ CTE Professional Skills 4.0 (Professionalism), 5.0 (Initiative & Self-Direction)

---

## Learning Objectives
Students will be able to:
1. Navigate directories and create/remove files using `pwd`, `ls`, `cd`, `mkdir`, `touch`, and `rm`.
2. Explain the purpose of NVM and `npm` in managing Node.js versions and project dependencies.
3. Write and execute a Node.js script from the terminal (`node test.js`).

## Materials & Resources
- Readings: [`00-terminal-basics-and-installing-nvm-node-js.md`](./00-terminal-basics-and-installing-nvm-node-js.md), [`01-node-overview.md`](./01-node-overview.md)
- Slides: [`../readme.md`](../readme.md)
- Student Lesson: [`student-lesson.md`](./student-lesson.md)
- Student Starter File: [`../../0-student_files/01-terminal-and-node/test.js`](../../0-student_files/01-terminal-and-node/test.js)

## Lesson Pacing (2 Days)
### Day 1: Command Line Navigation
1. **Pre-Assessment (5 min):** Quick Kahoot/bell-ringer on `pwd`, `ls`, `cd`, `mkdir`.
2. **Direct Instruction (15 min):** Demonstrate terminal navigation in VS Code integrated terminal, highlighting safety with `rm -rf`.
3. **Guided Practice (20 min):** Students complete Part 1 of [`student-lesson.md`](./student-lesson.md) (`mkdir`, `cd`, `touch`, `pwd`, `ls`, `rm -rf`).
4. **Closure (10 min):** Verify every student can explain `../` vs `./` and `pwd`.

### Day 2: NVM, Node.js & First Script
1. **Bell Ringer (5 min):** *"Why might a developer need two different versions of Node.js on the same computer?"*
2. **Direct Instruction (15 min):** Present [`../readme.md`](../readme.md) slides on Node.js, `npm`, `package.json`, and NVM.
3. **Lab / Independent Practice (25 min):** Students verify `node -v` and `npm -v`, then complete [`../../0-student_files/01-terminal-and-node/test.js`](../../0-student_files/01-terminal-and-node/test.js) and run it with `node`.
4. **Closure (5 min):** Exit ticket: Check terminal output from `node test.js`.

## Differentiation
- **Support:** Provide a printable CLI cheat-sheet (`pwd`, `ls`, `cd`, `mkdir`, `touch`, `rm`) and pair students in GitPod.
- **Extension:** Have early finishers initialize a `package.json` (`npm init -y`) in a scratch folder and add an `"start": "node test.js"` script.
