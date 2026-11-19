# Terminal Basics, Installing NVM & Node.js

In this lesson, you will learn essential terminal commands, install **Git** and **NVM** (Node Version Manager), install **Node.js**, and create and run your first JavaScript file.

## Student Learning Objectives
By the end of this section, you should be able to:
1. Navigate directories and manage files using core terminal commands (`pwd`, `ls`, `cd`, `mkdir`, `touch`, `rm`).
2. Explain why **NVM** is used to manage multiple versions of Node.js.
3. Install Node.js via NVM and execute a JavaScript file from the terminal.

## Pre-Assessment
Before continuing, consider taking this quick [command-line pre-assessment](https://create.kahoot.it/share/command-line/69a5e0af-b335-405b-8dd9-fffee3191193) to check your familiarity with basic terminal commands. If you are already comfortable with the command line, feel free to skip ahead to **Installing NVM**.

---

## Command Line Basics

Below are a few common commands you will use regularly as a developer:

* [`ls`](https://linux.die.net/man/1/ls) / [`dir`](https://linux.die.net/man/1/dir), [`pwd`](https://linux.die.net/man/1/pwd), and [`cd`](https://en.wikipedia.org/wiki/Cd_(command)) are used for navigating directories. `pwd` prints the working directory (the full path you are currently in). `ls` (Linux/macOS) and `dir` (Windows) list directory contents. `cd` changes your current directory.
* [`mkdir`](https://linux.die.net/man/1/mkdir) & [`touch`](https://linux.die.net/man/1/touch) create directories and files. `mkdir` creates a new directory (folder), while `touch` creates an empty file (or updates a file's timestamp).
* [`rm`](https://linux.die.net/man/1/rm) removes files and directories. **Be very cautious** with `rm -rf`, as deleted files are not sent to a recycle bin.
* [`chmod`](https://linux.die.net/man/1/chmod) and [`chown`](https://linux.die.net/man/1/chown) manage file permissions and ownership (`chmod` changes read/write/execute permissions; `chown` changes the owner).
* [`curl`](https://linux.die.net/man/1/curl) transfers data from or to a server. We will use it to download the NVM install script.
* [`nano`](https://linux.die.net/man/1/nano) is a beginner-friendly terminal text editor (a simpler alternative to `vi`/`vim` for quick edits).

Install [Visual Studio Code](https://code.visualstudio.com/) and open its built-in terminal (`Ctrl+`` / `Cmd+``) so you can watch files and directories appear as you run commands.

---

## Terminal Basics Exercise

[![Terminal exercise: mkdir test, cd test, touch test.js, pwd, cd ../, pwd, ls, rm -rf test/](https://miro.medium.com/max/800/1*a0oGb11RDJDgaCvTcLy1jw.gif)](https://medium.com/swlh/terminal-basics-and-installing-nvm-node-js-631cf9476ac4)

### Steps
1. Create a new directory called `test`: `mkdir test`
2. Move inside the `test` directory: `cd test`
3. Create a file called `test.js`: `touch test.js`
4. Move back up one directory (`cd ../`), check your location (`pwd`), and verify `test` exists (`ls`).
5. Delete the `test` directory and its contents: `rm -rf test` (the `-rf` flags mean recursive and force).

---

## Installing Git

Before installing Node.js or NVM, make sure **Git** is installed. Git provides version control so you can track file changes, collaborate, and revert mistakes. We'll cover Git workflows later, so for now simply ensure it is installed on your system (or use the preconfigured GitPod environment).

---

## Installing Node Version Manager (NVM)

Instead of installing Node.js from a single static installer, we use **NVM** so we can install and switch between multiple versions of Node.js as needed—especially useful when maintaining legacy codebases.

> **Windows Users:** There is no official Unix `nvm` for Windows; use [nvm-windows](https://github.com/coreybutler/nvm-windows) (or WSL2 with Linux NVM).

### Installing NVM on Linux / macOS

1. Check whether you have a shell profile (`~/.bash_profile`, `~/.bashrc`, or `~/.zshrc` on newer macOS). If needed, create one:
   ```bash
   touch ~/.bash_profile
   ```
2. Download and run the NVM install script with `curl`:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```
3. Close and reopen your terminal, then verify NVM is available:
   ```bash
   nvm --version
   ```

![NVM installed verification](https://miro.medium.com/max/800/1*FLbgAM1NLGAVPale9-GwyQ.png)

### Troubleshooting NVM Setup

If `nvm` is not found after restarting your terminal, check `~/.bashrc`, `~/.bash_profile`, or `~/.zshrc` and ensure these lines are present:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

---

## Using NVM to Install Node.js

Install the latest **Long-Term Support (LTS)** version of Node.js:

```bash
nvm install --lts
nvm use --lts
node -v
```

### Switching Between Node.js Versions

If a legacy tool or project requires an older Node.js version, you can install and switch to it anytime:

```bash
nvm install 18
nvm use 18
```

---

## Creating Your First JavaScript File

Open VS Code (optionally install the [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) extension for quick one-click execution).

![Running JavaScript in VS Code](https://miro.medium.com/max/800/1*MKaPZLZWWGeOuET9kWk3xA.gif)

### Exercise
1. Inside [`0-student_files/`](../../0-student_files/), create a file named `test.js` (`touch test.js`).
2. Declare a few variables using `var`, `let`, and `const`, and print them with `console.log()`.
3. Run the file from your terminal:
   ```bash
   node test.js
   ```

---

## Additional Resources
- [freeCodeCamp: Basic JavaScript](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/)
- [Original Medium Article](https://medium.com/swlh/terminal-basics-and-installing-nvm-node-js-631cf9476ac4)