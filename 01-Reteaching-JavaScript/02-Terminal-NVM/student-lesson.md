# Student Lesson 1.2: Terminal Basics, NVM & Node.js

**Readings:**
- [`00-terminal-basics-and-installing-nvm-node-js.md`](./00-terminal-basics-and-installing-nvm-node-js.md)
- [`01-node-overview.md`](./01-node-overview.md)

**Starter File:** [`../../0-student_files/01-terminal-and-node/test.js`](../../0-student_files/01-terminal-and-node/test.js)

---

## Part 1: Terminal Navigation Lab
Open the VS Code integrated terminal (`Ctrl + \`` or `Cmd + \``) and run these commands in order. Record what each command does:

1. Run `pwd` → What was printed?  
   > *(Your answer)*
2. Create a temporary folder: `mkdir practice-cli`
3. Move into it: `cd practice-cli`
4. Create an empty file: `touch scratch.js`
5. List the contents: `ls`
6. Move back up one directory: `cd ..`
7. Safely remove your temporary folder: `rm -rf practice-cli`

---

## Part 2: Node.js & NVM Check
Run the following commands in your terminal and record the output:

1. `node -v` → Version: `_______`
2. `npm -v` → Version: `_______`
3. Why do developers use **NVM** instead of a single fixed Node.js installer?  
   > *(Your answer)*

---

## Part 3: Your First Node.js Script
1. Open [`0-student_files/01-terminal-and-node/test.js`](../../0-student_files/01-terminal-and-node/test.js).
2. Follow the `TODO` comments inside `test.js` to declare variables using `var`, `let`, and `const`, then log them with `console.log()`.
3. Run your script from the terminal:
   ```bash
   node 0-student_files/01-terminal-and-node/test.js
   ```
4. Verify your variables print without errors.
