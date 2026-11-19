# Repository Standards & Structure

This document defines how **JavaScript First** is organized so that every chapter works seamlessly as both a **coding book** and an **interactive course**.

## Directory Overview

```text
.
├── README.md                  # Book & course landing page and Table of Contents
├── STANDARDS.md               # Repository structure and authoring conventions
├── JavaScriptRoadmap.drawio.svg # Full curriculum roadmap
├── LICENSE
├── 0-documentation/           # Maintainer docs, slide templates, and media
├── 0-student_files/           # Workspace where readers and students write exercise code
├── 00-Drafts/                 # Work-in-progress chapters and notes
├── 01-Reteaching-JavaScript/  # Chapter 1: History, Terminal/NVM, Node.js, Logging & Types
├── 02-HTTP/                   # Chapter 2: HTTP, HTML & Node.js HTTP Server
├── 03-AJAX/                   # Chapter 3: XHR, Fetch & Asynchronous HTTP Requests
├── .gitpod.Dockerfile
├── .gitpod.yml
└── .github/
    └── FUNDING.yml
```

## Chapter & Section Structure

Each chapter (`01-...`, `02-...`, `03-...`) and each subsection should focus on **one or two closely related topics** and follow this layout:

```text
<NN-Section-Name>/
├── readme.md      # Book lesson: learning objectives, explanations, exercises, and resources
├── code/          # Runnable JavaScript / HTML examples referenced by the lesson
├── imgs/          # Diagrams, screenshots, and animations used in the lesson or slides
└── slides/        # Reveal.js (vscode-reveal) Markdown slide decks for course instruction
```

### Authoring Guidelines

1. **Book + Course Parity:** Every published section should have a clear `readme.md` for self-paced readers, runnable examples in `code/`, and (where applicable) presentation decks in `slides/`.
2. **Learning Objectives:** Start each section `readme.md` with measurable **Student Learning Objectives** ("Students should be able to...").
3. **Relative Links:** Always use relative paths (e.g., `./imgs/diagram.svg`, `./code/example.js`) so links work offline, in VS Code, and on GitHub.
4. **No Temp Files:** Keep editor scratch files (`tempCodeRunnerFile.*`, `.DS_Store`) out of version control.
5. **Roadmap Alignment:** New chapters should be promoted from `00-Drafts/` into numbered chapters following the progression in `JavaScriptRoadmap.drawio.svg`.
