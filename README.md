<p align="center">
   <a href="https://github.com/users/HansUXdev/sponsorship">
      <img src="./logo.svg" style="max-width:50%;" height="180px" alt="JavaScript First Logo"/>
   </a>
</p>

<h1 align="center">JavaScript First</h1>

<p align="center">
  <strong>An open-source coding book and interactive course</strong> teaching modern JavaScript from the ground up using the <strong>Node.js</strong> runtime environment—culminating in building your own servers and web applications.
</p>

<p align="center">
  <a href="https://gitpod.io/#https://github.com/HansUXdev/JavaScript-First">
    <img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in GitPod" height="40px"/>
  </a>
</p>

---

## How to Use This Repository

**JavaScript First** is designed to work both as a **self-paced coding book** and a **classroom/workshop course**:

- **As a Book:** Read the `readme.md` and lesson `.md` files inside each numbered chapter (`01-Reteaching-JavaScript/`, `02-HTTP/`, `03-AJAX/`), or compile the full PDF with `npm run build:student`.
- **As a Course (AZ CTE Software & App Design — CIP 11.0202.00):**
  - **Teacher's Manual & Lesson Plans:** Every unit includes a `unit-guide.md` and section `lesson-plan.md` aligned to Arizona CTE standards. Compile the full manual with `npm run build:teacher`.
  - **Slides (`vscode-reveal`):** Files inside `slides/` (and slide-formatted `.md` decks) are configured via [`.vscode/extensions.json`](./.vscode/extensions.json), [`.vscode/settings.json`](./.vscode/settings.json), and [`.gitpod.yml`](./.gitpod.yml) for [evilz.vscode-reveal](https://marketplace.visualstudio.com/items?itemName=evilz.vscode-reveal). Export all decks with `npm run build:slides` (or `npm run build:all`).
  - **Student Lessons & Blank Starters:** Each section has a `student-lesson.md` worksheet with step-by-step instructions and blank starter files inside [`0-student_files/`](./0-student_files/).
  - **Zero-Config Environment:** Launch the repository in [GitPod](https://gitpod.io/) to code from any browser (Windows, macOS, Linux, Chromebook, or tablet) with Node.js, `vscode-reveal`, and Markdown extensions preconfigured.

---

## Curriculum & Roadmap

The full curriculum is outlined in [`JavaScriptRoadmap.drawio.svg`](./JavaScriptRoadmap.drawio.svg):

<p align="center">
  <img src="./JavaScriptRoadmap.drawio.svg" alt="JavaScript First Curriculum Roadmap" style="max-width:100%;"/>
</p>

---

## Table of Contents

### Front Matter
- [Curriculum & AZ CTE Roadmap](./roadmap.md)
- [Standards & Repository Structure](./STANDARDS.md)
- [Documentation & Authoring Notes](./0-documentation/section-footer.md)
- [Student Exercise Workspace](./0-student_files/)

### Complete Roadmap Curriculum (Chapters 1–11)

1. **Chapter 1: Reteaching JavaScript & Node.js** ([Unit Guide](./01-Reteaching-JavaScript/unit-guide.md) | [Slides](./01-Reteaching-JavaScript/readme.md))
   - [1.1 History of JavaScript](./01-Reteaching-JavaScript/01-History-of-JS/readme.md) ([Lesson Plan](./01-Reteaching-JavaScript/01-History-of-JS/lesson-plan.md) | [Student Lab](./01-Reteaching-JavaScript/01-History-of-JS/student-lesson.md))
   - [1.2 Terminal Basics, NVM & Node.js](./01-Reteaching-JavaScript/02-Terminal-NVM/00-terminal-basics-and-installing-nvm-node-js.md) ([Node Overview](./01-Reteaching-JavaScript/02-Terminal-NVM/01-node-overview.md) | [Lesson Plan](./01-Reteaching-JavaScript/02-Terminal-NVM/lesson-plan.md) | [Student Lab](./01-Reteaching-JavaScript/02-Terminal-NVM/student-lesson.md))
   - [1.3 Logging & Data Types](./01-Reteaching-JavaScript/03-logging-datatypes/readme.md) ([Lesson Plan](./01-Reteaching-JavaScript/03-logging-datatypes/lesson-plan.md) | [Student Lab](./01-Reteaching-JavaScript/03-logging-datatypes/student-lesson.md))
2. **Chapter 2: Introduction to Web Development with HTTP** ([Book](./02-HTTP/readme.md) | [Unit Guide](./02-HTTP/unit-guide.md) | [Lesson Plan](./02-HTTP/lesson-plan.md) | [Student Lab](./02-HTTP/student-lesson.md) | [Slides](./02-HTTP/03-http.md))
3. **Chapter 3: Asynchronous JavaScript & AJAX** ([Book](./03-AJAX/readme.md) | [Unit Guide](./03-AJAX/unit-guide.md) | [Lesson Plan](./03-AJAX/lesson-plan.md) | [Student Lab](./03-AJAX/student-lesson.md))
4. **Chapter 4: Variables, Scope, Hoisting & Immutability** ([Book](./04-Variables-Scope-Immutability/readme.md) | [Unit Guide](./04-Variables-Scope-Immutability/unit-guide.md) | [Lesson Plan](./04-Variables-Scope-Immutability/lesson-plan.md) | [Student Lab](./04-Variables-Scope-Immutability/student-lesson.md) | [Slides](./04-Variables-Scope-Immutability/slides/slides.md))
5. **Chapter 5: Control Flow, Loops, JSON & Data Structures** ([Book](./05-DataStructures-and-Loops/readme.md) | [Unit Guide](./05-DataStructures-and-Loops/unit-guide.md) | [Lesson Plan](./05-DataStructures-and-Loops/lesson-plan.md) | [Student Lab](./05-DataStructures-and-Loops/student-lesson.md) | [Slides](./05-DataStructures-and-Loops/slides/slides.md))
6. **Chapter 6: Functions, Closures & Functional Programming** ([Book](./06-Functions/readme.md) | [Unit Guide](./06-Functions/unit-guide.md) | [Lesson Plan](./06-Functions/lesson-plan.md) | [Student Lab](./06-Functions/student-lesson.md) | [Slides](./06-Functions/slides/slides.md))
7. **Chapter 7: Asynchronous JavaScript, Promises & Concurrency** ([Book](./07-Async-JS/readme.md) | [Unit Guide](./07-Async-JS/unit-guide.md) | [Lesson Plan](./07-Async-JS/lesson-plan.md) | [Student Lab](./07-Async-JS/student-lesson.md) | [Slides](./07-Async-JS/slides/slides.md))
8. **Chapter 8: Object-Oriented JavaScript & Design Patterns** ([Book](./08-OOP-and-Design-Patterns/readme.md) | [Unit Guide](./08-OOP-and-Design-Patterns/unit-guide.md) | [Lesson Plan](./08-OOP-and-Design-Patterns/lesson-plan.md) | [Student Lab](./08-OOP-and-Design-Patterns/student-lesson.md) | [Slides](./08-OOP-and-Design-Patterns/slides/slides.md))
9. **Chapter 9: Debugging, TDD & Algorithms** ([Book](./09-Debugging-TDD-Algorithms/readme.md) | [Unit Guide](./09-Debugging-TDD-Algorithms/unit-guide.md) | [Lesson Plan](./09-Debugging-TDD-Algorithms/lesson-plan.md) | [Student Lab](./09-Debugging-TDD-Algorithms/student-lesson.md) | [Slides](./09-Debugging-TDD-Algorithms/slides/slides.md))
10. **Chapter 10: HTML, CSS, Accessibility, SEO & the DOM** ([Book](./10-HTML-CSS-DOM/readme.md) | [Unit Guide](./10-HTML-CSS-DOM/unit-guide.md) | [Lesson Plan](./10-HTML-CSS-DOM/lesson-plan.md) | [Student Lab](./10-HTML-CSS-DOM/student-lesson.md) | [Slides](./10-HTML-CSS-DOM/slides/slides.md))
11. **Chapter 11: Internet, Server Modules & Web Security** ([Book](./11-Internet-Server-Security/readme.md) | [Unit Guide](./11-Internet-Server-Security/unit-guide.md) | [Lesson Plan](./11-Internet-Server-Security/lesson-plan.md) | [Student Lab](./11-Internet-Server-Security/student-lesson.md) | [Slides](./11-Internet-Server-Security/slides/slides.md))

### Legacy Draft Notes
Original scratch notes and earlier Medium article drafts are preserved in [`00-Drafts/`](./00-Drafts/readme.md) for reference.

---

## Community & Support

This book is an open-source, living educational resource (originally developed from classroom instruction and notes in [OSS Books](https://github.com/HansUXdev/OSS-Books)). You can read it online for free.

<p>
  <a href="https://medium.com/@hansOnConsult">
    <img src="https://img.shields.io/badge/Medium-%2312100E.svg?&style=for-the-badge&logo=medium&logoColor=white" alt="Medium"/>
  </a>
  <a href="https://dev.to/hansuxdev">
    <img src="https://img.shields.io/badge/DEV.TO-%230A0A0A.svg?&style=for-the-badge&logo=dev-dot-to&logoColor=white" alt="DEV.TO"/>
  </a>
  <a href="https://www.youtube.com/channel/UCCGfELkPCJg1XHxQfFFz7pw/about">
    <img src="https://img.shields.io/badge/YouTube-%23FF0000.svg?&style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"/>
  </a>
  <a href="https://twitch.tv/hansoncoding">
    <img src="https://img.shields.io/twitch/status/hansoncoding?style=for-the-badge" alt="Twitch"/>
  </a>
</p>

If you'd like to support the author:
- Star the repository on GitHub
- Follow and share articles on [Medium](https://medium.com/@HansOnConsult)
- Become a [GitHub Sponsor](https://github.com/users/HansUXdev/sponsorship) or [Patreon](https://www.patreon.com/hansOnDevelopment) supporter

## License

See [LICENSE](./LICENSE) for details.