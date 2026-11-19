#!/usr/bin/env node
/**
 * JavaScript First — Book, Teacher's Manual & Reveal.js Slide Publisher
 *
 * Uses `pandoc` for Markdown -> HTML conversion and headless Chromium/Chrome
 * for print-ready PDF generation, plus Reveal.js HTML generation for slides.
 *
 * Usage:
 *   node tools/publish.mjs --student
 *   node tools/publish.mjs --teacher
 *   node tools/publish.mjs --slides
 *   node tools/publish.mjs --all
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// 18-Week (90-Day) Semester Sequence across Units 01-16 (Zero Solution Leaks)
const STUDENT_SOURCES = [
  'README.md',
  '0-documentation/blooms-taxonomy-framework.md',

  // Unit 1 (Weeks 1-2 | Stds 2.0, 11.0, 3.0)
  '01-Reteaching-JavaScript/evaluations/pre-unit-eval.md',
  '01-Reteaching-JavaScript/01-History-of-JS/readme.md',
  '01-Reteaching-JavaScript/01-History-of-JS/pre-lesson-eval.md',
  '01-Reteaching-JavaScript/01-History-of-JS/student-lesson.md',
  '01-Reteaching-JavaScript/01-History-of-JS/post-lesson-eval.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/00-terminal-basics-and-installing-nvm-node-js.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/01-node-overview.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/pre-lesson-eval.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/student-lesson.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/post-lesson-eval.md',
  '01-Reteaching-JavaScript/03-logging-datatypes/readme.md',
  '01-Reteaching-JavaScript/03-logging-datatypes/pre-lesson-eval.md',
  '01-Reteaching-JavaScript/03-logging-datatypes/student-lesson.md',
  '01-Reteaching-JavaScript/03-logging-datatypes/post-lesson-eval.md',
  '01-Reteaching-JavaScript/evaluations/post-unit-eval.md',
  '01-Reteaching-JavaScript/projects/unit-project.md',

  // Unit 12 (Weeks 2-3 | Std 4.0)
  '12-Computer-Math-and-Binary/evaluations/pre-unit-eval.md',
  '12-Computer-Math-and-Binary/readme.md',
  '12-Computer-Math-and-Binary/pre-lesson-eval.md',
  '12-Computer-Math-and-Binary/student-lesson.md',
  '12-Computer-Math-and-Binary/post-lesson-eval.md',
  '12-Computer-Math-and-Binary/evaluations/post-unit-eval.md',
  '12-Computer-Math-and-Binary/projects/unit-project.md',

  // Unit 4 (Weeks 3-4 | Stds 3.3, 3.6, 18.2)
  '04-Variables-Scope-Immutability/evaluations/pre-unit-eval.md',
  '04-Variables-Scope-Immutability/readme.md',
  '04-Variables-Scope-Immutability/pre-lesson-eval.md',
  '04-Variables-Scope-Immutability/student-lesson.md',
  '04-Variables-Scope-Immutability/post-lesson-eval.md',
  '04-Variables-Scope-Immutability/evaluations/post-unit-eval.md',
  '04-Variables-Scope-Immutability/projects/unit-project.md',

  // Unit 5 (Weeks 4-5 | Stds 7.0, 6.0)
  '05-DataStructures-and-Loops/readme.md',
  '05-DataStructures-and-Loops/evaluations/pre-unit-eval.md',
  '05-DataStructures-and-Loops/01-Iteration-and-Loops/readme.md',
  '05-DataStructures-and-Loops/01-Iteration-and-Loops/pre-lesson-eval.md',
  '05-DataStructures-and-Loops/01-Iteration-and-Loops/student-lesson.md',
  '05-DataStructures-and-Loops/01-Iteration-and-Loops/post-lesson-eval.md',
  '05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/readme.md',
  '05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/pre-lesson-eval.md',
  '05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/student-lesson.md',
  '05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/post-lesson-eval.md',
  '05-DataStructures-and-Loops/evaluations/post-unit-eval.md',
  '05-DataStructures-and-Loops/projects/unit-project.md',

  // Unit 6 (Week 6 | Stds 5.0, 11.10-11.12)
  '06-Functions/readme.md',
  '06-Functions/evaluations/pre-unit-eval.md',
  '06-Functions/01-Conditionals-and-Boolean-Logic/readme.md',
  '06-Functions/01-Conditionals-and-Boolean-Logic/pre-lesson-eval.md',
  '06-Functions/01-Conditionals-and-Boolean-Logic/student-lesson.md',
  '06-Functions/01-Conditionals-and-Boolean-Logic/post-lesson-eval.md',
  '06-Functions/02-Functions-and-Closures/readme.md',
  '06-Functions/02-Functions-and-Closures/pre-lesson-eval.md',
  '06-Functions/02-Functions-and-Closures/student-lesson.md',
  '06-Functions/02-Functions-and-Closures/post-lesson-eval.md',
  '06-Functions/evaluations/post-unit-eval.md',
  '06-Functions/projects/unit-project.md',

  // Unit 13 (Week 7 | Stds 14.0, 13.0)
  '13-Version-Control-and-Community/readme.md',
  '13-Version-Control-and-Community/evaluations/pre-unit-eval.md',
  '13-Version-Control-and-Community/01-Version-Control-Git-CICD/readme.md',
  '13-Version-Control-and-Community/01-Version-Control-Git-CICD/pre-lesson-eval.md',
  '13-Version-Control-and-Community/01-Version-Control-Git-CICD/student-lesson.md',
  '13-Version-Control-and-Community/01-Version-Control-Git-CICD/post-lesson-eval.md',
  '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/readme.md',
  '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/pre-lesson-eval.md',
  '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/student-lesson.md',
  '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/post-lesson-eval.md',
  '13-Version-Control-and-Community/evaluations/post-unit-eval.md',
  '13-Version-Control-and-Community/projects/unit-project.md',

  // Unit 14 (Week 8 | Std 10.0)
  '14-Program-Analysis-and-Design/evaluations/pre-unit-eval.md',
  '14-Program-Analysis-and-Design/readme.md',
  '14-Program-Analysis-and-Design/pre-lesson-eval.md',
  '14-Program-Analysis-and-Design/student-lesson.md',
  '14-Program-Analysis-and-Design/post-lesson-eval.md',
  '14-Program-Analysis-and-Design/evaluations/post-unit-eval.md',
  '14-Program-Analysis-and-Design/projects/unit-project.md',

  // Unit 9 (Week 9 | Stds 12.0, 6.4-6.7)
  '09-Debugging-TDD-Algorithms/readme.md',
  '09-Debugging-TDD-Algorithms/evaluations/pre-unit-eval.md',
  '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/readme.md',
  '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/pre-lesson-eval.md',
  '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/student-lesson.md',
  '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/post-lesson-eval.md',
  '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/readme.md',
  '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/pre-lesson-eval.md',
  '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/student-lesson.md',
  '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/post-lesson-eval.md',
  '09-Debugging-TDD-Algorithms/evaluations/post-unit-eval.md',
  '09-Debugging-TDD-Algorithms/projects/unit-project.md',

  // Unit 2 (Week 10 | Stds 8.0, 11.3-11.7)
  '02-HTTP/readme.md',
  '02-HTTP/evaluations/pre-unit-eval.md',
  '02-HTTP/01-Internet-Protocols-and-Cloud/readme.md',
  '02-HTTP/01-Internet-Protocols-and-Cloud/pre-lesson-eval.md',
  '02-HTTP/01-Internet-Protocols-and-Cloud/student-lesson.md',
  '02-HTTP/01-Internet-Protocols-and-Cloud/post-lesson-eval.md',
  '02-HTTP/02-Node-HTTP-Server/readme.md',
  '02-HTTP/02-Node-HTTP-Server/pre-lesson-eval.md',
  '02-HTTP/02-Node-HTTP-Server/student-lesson.md',
  '02-HTTP/02-Node-HTTP-Server/post-lesson-eval.md',
  '02-HTTP/evaluations/post-unit-eval.md',
  '02-HTTP/projects/unit-project.md',

  // Unit 3 (Week 11 | Std 9.0)
  '03-AJAX/evaluations/pre-unit-eval.md',
  '03-AJAX/readme.md',
  '03-AJAX/00-fetch/readme.md',
  '03-AJAX/pre-lesson-eval.md',
  '03-AJAX/student-lesson.md',
  '03-AJAX/post-lesson-eval.md',
  '03-AJAX/evaluations/post-unit-eval.md',
  '03-AJAX/projects/unit-project.md',

  // Unit 7 (Week 12 | Std 18.0)
  '07-Async-JS/evaluations/pre-unit-eval.md',
  '07-Async-JS/readme.md',
  '07-Async-JS/pre-lesson-eval.md',
  '07-Async-JS/student-lesson.md',
  '07-Async-JS/post-lesson-eval.md',
  '07-Async-JS/evaluations/post-unit-eval.md',
  '07-Async-JS/projects/unit-project.md',

  // Unit 15 (Week 13 | Std 16.0)
  '15-Storage-Databases-and-CRUD/readme.md',
  '15-Storage-Databases-and-CRUD/evaluations/pre-unit-eval.md',
  '15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/readme.md',
  '15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/pre-lesson-eval.md',
  '15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/student-lesson.md',
  '15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/post-lesson-eval.md',
  '15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/readme.md',
  '15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/pre-lesson-eval.md',
  '15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/student-lesson.md',
  '15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/post-lesson-eval.md',
  '15-Storage-Databases-and-CRUD/evaluations/post-unit-eval.md',
  '15-Storage-Databases-and-CRUD/projects/unit-project.md',

  // Unit 10 (Weeks 14-15 | Std 15.0)
  '10-HTML-CSS-DOM/readme.md',
  '10-HTML-CSS-DOM/evaluations/pre-unit-eval.md',
  '10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/readme.md',
  '10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/pre-lesson-eval.md',
  '10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/student-lesson.md',
  '10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/post-lesson-eval.md',
  '10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/readme.md',
  '10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/pre-lesson-eval.md',
  '10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/student-lesson.md',
  '10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/post-lesson-eval.md',
  '10-HTML-CSS-DOM/evaluations/post-unit-eval.md',
  '10-HTML-CSS-DOM/projects/unit-project.md',

  // Unit 8 (Weeks 15-16 | Std 17.0)
  '08-OOP-and-Design-Patterns/readme.md',
  '08-OOP-and-Design-Patterns/evaluations/pre-unit-eval.md',
  '08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/readme.md',
  '08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/pre-lesson-eval.md',
  '08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/student-lesson.md',
  '08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/post-lesson-eval.md',
  '08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/readme.md',
  '08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/pre-lesson-eval.md',
  '08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/student-lesson.md',
  '08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/post-lesson-eval.md',
  '08-OOP-and-Design-Patterns/evaluations/post-unit-eval.md',
  '08-OOP-and-Design-Patterns/projects/unit-project.md',

  // Unit 11 (Week 17 | Std 1.0)
  '11-Internet-Server-Security/evaluations/pre-unit-eval.md',
  '11-Internet-Server-Security/readme.md',
  '11-Internet-Server-Security/pre-lesson-eval.md',
  '11-Internet-Server-Security/student-lesson.md',
  '11-Internet-Server-Security/post-lesson-eval.md',
  '11-Internet-Server-Security/evaluations/post-unit-eval.md',
  '11-Internet-Server-Security/projects/unit-project.md',

  // Unit 16 (Week 18 | Std 19.0 & Semester Capstone)
  '16-Software-Business-and-Capstone/evaluations/pre-unit-eval.md',
  '16-Software-Business-and-Capstone/readme.md',
  '16-Software-Business-and-Capstone/pre-lesson-eval.md',
  '16-Software-Business-and-Capstone/student-lesson.md',
  '16-Software-Business-and-Capstone/post-lesson-eval.md',
  '16-Software-Business-and-Capstone/evaluations/post-unit-eval.md',
  '16-Software-Business-and-Capstone/projects/unit-project.md',
];

const TEACHER_SOURCES = [
  'STANDARDS.md',
  'roadmap.md',
  '0-documentation/blooms-taxonomy-framework.md',

  // Unit 1
  '01-Reteaching-JavaScript/unit-guide.md',
  '01-Reteaching-JavaScript/01-History-of-JS/lesson-plan.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/lesson-plan.md',
  '01-Reteaching-JavaScript/03-logging-datatypes/lesson-plan.md',
  '01-Reteaching-JavaScript/evaluations/eval-answer-key.md',
  '01-Reteaching-JavaScript/quizzes/quiz-1-concepts.md',
  '01-Reteaching-JavaScript/quizzes/quiz-2-application.md',
  '01-Reteaching-JavaScript/projects/project-rubric.md',

  // Unit 12
  '12-Computer-Math-and-Binary/unit-guide.md',
  '12-Computer-Math-and-Binary/lesson-plan.md',
  '12-Computer-Math-and-Binary/evaluations/eval-answer-key.md',
  '12-Computer-Math-and-Binary/quizzes/quiz-1-concepts.md',
  '12-Computer-Math-and-Binary/quizzes/quiz-2-application.md',
  '12-Computer-Math-and-Binary/projects/project-rubric.md',

  // Unit 4
  '04-Variables-Scope-Immutability/unit-guide.md',
  '04-Variables-Scope-Immutability/lesson-plan.md',
  '04-Variables-Scope-Immutability/evaluations/eval-answer-key.md',
  '04-Variables-Scope-Immutability/quizzes/quiz-1-concepts.md',
  '04-Variables-Scope-Immutability/quizzes/quiz-2-application.md',
  '04-Variables-Scope-Immutability/projects/project-rubric.md',

  // Unit 5
  '05-DataStructures-and-Loops/unit-guide.md',
  '05-DataStructures-and-Loops/01-Iteration-and-Loops/lesson-plan.md',
  '05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/lesson-plan.md',
  '05-DataStructures-and-Loops/evaluations/eval-answer-key.md',
  '05-DataStructures-and-Loops/quizzes/quiz-1-concepts.md',
  '05-DataStructures-and-Loops/quizzes/quiz-2-application.md',
  '05-DataStructures-and-Loops/projects/project-rubric.md',

  // Unit 6
  '06-Functions/unit-guide.md',
  '06-Functions/01-Conditionals-and-Boolean-Logic/lesson-plan.md',
  '06-Functions/02-Functions-and-Closures/lesson-plan.md',
  '06-Functions/evaluations/eval-answer-key.md',
  '06-Functions/quizzes/quiz-1-concepts.md',
  '06-Functions/quizzes/quiz-2-application.md',
  '06-Functions/projects/project-rubric.md',

  // Unit 13
  '13-Version-Control-and-Community/unit-guide.md',
  '13-Version-Control-and-Community/01-Version-Control-Git-CICD/lesson-plan.md',
  '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/lesson-plan.md',
  '13-Version-Control-and-Community/evaluations/eval-answer-key.md',
  '13-Version-Control-and-Community/quizzes/quiz-1-concepts.md',
  '13-Version-Control-and-Community/quizzes/quiz-2-application.md',
  '13-Version-Control-and-Community/projects/project-rubric.md',

  // Unit 14
  '14-Program-Analysis-and-Design/unit-guide.md',
  '14-Program-Analysis-and-Design/lesson-plan.md',
  '14-Program-Analysis-and-Design/evaluations/eval-answer-key.md',
  '14-Program-Analysis-and-Design/quizzes/quiz-1-concepts.md',
  '14-Program-Analysis-and-Design/quizzes/quiz-2-application.md',
  '14-Program-Analysis-and-Design/projects/project-rubric.md',

  // Unit 9
  '09-Debugging-TDD-Algorithms/unit-guide.md',
  '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/lesson-plan.md',
  '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/lesson-plan.md',
  '09-Debugging-TDD-Algorithms/evaluations/eval-answer-key.md',
  '09-Debugging-TDD-Algorithms/quizzes/quiz-1-concepts.md',
  '09-Debugging-TDD-Algorithms/quizzes/quiz-2-application.md',
  '09-Debugging-TDD-Algorithms/projects/project-rubric.md',

  // Unit 2
  '02-HTTP/unit-guide.md',
  '02-HTTP/01-Internet-Protocols-and-Cloud/lesson-plan.md',
  '02-HTTP/02-Node-HTTP-Server/lesson-plan.md',
  '02-HTTP/evaluations/eval-answer-key.md',
  '02-HTTP/quizzes/quiz-1-concepts.md',
  '02-HTTP/quizzes/quiz-2-application.md',
  '02-HTTP/projects/project-rubric.md',

  // Unit 3
  '03-AJAX/unit-guide.md',
  '03-AJAX/lesson-plan.md',
  '03-AJAX/evaluations/eval-answer-key.md',
  '03-AJAX/quizzes/quiz-1-concepts.md',
  '03-AJAX/quizzes/quiz-2-application.md',
  '03-AJAX/projects/project-rubric.md',

  // Unit 7
  '07-Async-JS/unit-guide.md',
  '07-Async-JS/lesson-plan.md',
  '07-Async-JS/evaluations/eval-answer-key.md',
  '07-Async-JS/quizzes/quiz-1-concepts.md',
  '07-Async-JS/quizzes/quiz-2-application.md',
  '07-Async-JS/projects/project-rubric.md',

  // Unit 15
  '15-Storage-Databases-and-CRUD/unit-guide.md',
  '15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/lesson-plan.md',
  '15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/lesson-plan.md',
  '15-Storage-Databases-and-CRUD/evaluations/eval-answer-key.md',
  '15-Storage-Databases-and-CRUD/quizzes/quiz-1-concepts.md',
  '15-Storage-Databases-and-CRUD/quizzes/quiz-2-application.md',
  '15-Storage-Databases-and-CRUD/projects/project-rubric.md',

  // Unit 10
  '10-HTML-CSS-DOM/unit-guide.md',
  '10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/lesson-plan.md',
  '10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/lesson-plan.md',
  '10-HTML-CSS-DOM/evaluations/eval-answer-key.md',
  '10-HTML-CSS-DOM/quizzes/quiz-1-concepts.md',
  '10-HTML-CSS-DOM/quizzes/quiz-2-application.md',
  '10-HTML-CSS-DOM/projects/project-rubric.md',

  // Unit 8
  '08-OOP-and-Design-Patterns/unit-guide.md',
  '08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/lesson-plan.md',
  '08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/lesson-plan.md',
  '08-OOP-and-Design-Patterns/evaluations/eval-answer-key.md',
  '08-OOP-and-Design-Patterns/quizzes/quiz-1-concepts.md',
  '08-OOP-and-Design-Patterns/quizzes/quiz-2-application.md',
  '08-OOP-and-Design-Patterns/projects/project-rubric.md',

  // Unit 11
  '11-Internet-Server-Security/unit-guide.md',
  '11-Internet-Server-Security/lesson-plan.md',
  '11-Internet-Server-Security/evaluations/eval-answer-key.md',
  '11-Internet-Server-Security/quizzes/quiz-1-concepts.md',
  '11-Internet-Server-Security/quizzes/quiz-2-application.md',
  '11-Internet-Server-Security/projects/project-rubric.md',

  // Unit 16
  '16-Software-Business-and-Capstone/unit-guide.md',
  '16-Software-Business-and-Capstone/lesson-plan.md',
  '16-Software-Business-and-Capstone/evaluations/eval-answer-key.md',
  '16-Software-Business-and-Capstone/quizzes/quiz-1-concepts.md',
  '16-Software-Business-and-Capstone/quizzes/quiz-2-application.md',
  '16-Software-Business-and-Capstone/projects/project-rubric.md',
];

const SLIDE_DECKS = [
  { src: '01-Reteaching-JavaScript/01-History-of-JS/slides/slides.md', out: '01-1-history-legal-ethics-slides.html', title: 'Lesson 1.1: History, Licensing & Tech Ethics' },
  { src: '01-Reteaching-JavaScript/02-Terminal-NVM/slides/slides.md', out: '01-2-terminal-nvm-node-slides.html', title: 'Lesson 1.2: CLI, NVM & Node.js Development' },
  { src: '01-Reteaching-JavaScript/readme.md', out: '01-2b-node-npm-overview-slides.html', title: 'Lesson 1.2b: Node.js, NPM & NVM Overview' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/01-primitiveTypes.md', out: '01-3a-primitive-types-slides.html', title: 'Lesson 1.3a: Primitive Data Types' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/02-objectTypes.md', out: '01-3b-object-types-slides.html', title: 'Lesson 1.3b: Object Types' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/03-logging.md', out: '01-3c-logging-slides.html', title: 'Lesson 1.3c: Logging Data Types' },
  { src: '12-Computer-Math-and-Binary/slides/slides.md', out: '12-computer-math-binary-slides.html', title: 'Unit 12: Computer Math, Binary & Bitwise Logic' },
  { src: '04-Variables-Scope-Immutability/slides/slides.md', out: '04-variables-scope-slides.html', title: 'Unit 4: Variables, Scope & Immutability' },
  { src: '05-DataStructures-and-Loops/01-Iteration-and-Loops/slides/slides.md', out: '05-1-iteration-loops-slides.html', title: 'Lesson 5.1: Iterative Structures, Trace Tables & Recursion' },
  { src: '05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/slides/slides.md', out: '05-2-arrays-matrices-trees-slides.html', title: 'Lesson 5.2: Arrays, Matrices, Trees & JSON' },
  { src: '06-Functions/01-Conditionals-and-Boolean-Logic/slides/slides.md', out: '06-1-conditionals-boolean-logic-slides.html', title: 'Lesson 6.1: Conditionals & Boolean Logic' },
  { src: '06-Functions/02-Functions-and-Closures/slides/slides.md', out: '06-2-functions-closures-slides.html', title: 'Lesson 6.2: Functions, Closures & Functional JS' },
  { src: '13-Version-Control-and-Community/01-Version-Control-Git-CICD/slides/slides.md', out: '13-1-vcs-git-cicd-slides.html', title: 'Lesson 13.1: Version Control, Git & CI/CD' },
  { src: '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/slides/slides.md', out: '13-2-community-npm-docs-slides.html', title: 'Lesson 13.2: Stdlib, npm & Community Docs' },
  { src: '14-Program-Analysis-and-Design/slides/slides.md', out: '14-program-analysis-design-slides.html', title: 'Unit 14: Program Analysis, SDLC & System Design' },
  { src: '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/slides/slides.md', out: '09-1-testing-debugging-slides.html', title: 'Lesson 9.1: Error Categories, Debugging & TDD' },
  { src: '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/slides/slides.md', out: '09-2-search-sort-algorithms-slides.html', title: 'Lesson 9.2: Searching & Sorting Algorithms' },
  { src: '02-HTTP/01-Internet-Protocols-and-Cloud/slides/slides.md', out: '02-1-protocols-cloud-iot-slides.html', title: 'Lesson 2.1: Internet Protocols, Cloud & IoT' },
  { src: '02-HTTP/03-http.md', out: '02-2-http-server-slides.html', title: 'Lesson 2.2: HTTP with Node.js' },
  { src: '03-AJAX/slides/slides.md', out: '03-ajax-client-slides.html', title: 'Unit 3: Client-Side Web, AJAX & Fetch' },
  { src: '07-Async-JS/slides/slides.md', out: '07-async-js-slides.html', title: 'Unit 7: Async JS, Promises & Error Severity' },
  { src: '15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/slides/slides.md', out: '15-1-storage-file-io-slides.html', title: 'Lesson 15.1: Storage Tiers, File I/O & Backups' },
  { src: '15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/slides/slides.md', out: '15-2-databases-sql-mongo-crud-slides.html', title: 'Lesson 15.2: SQL vs. MongoDB & CRUD' },
  { src: '10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/slides/slides.md', out: '10-1-ucd-a11y-seo-slides.html', title: 'Lesson 10.1: UCD, Accessibility (ADA/ARIA) & SEO' },
  { src: '10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/slides/slides.md', out: '10-2-responsive-css-canvas-dom-slides.html', title: 'Lesson 10.2: Responsive CSS, 2D Canvas & DOM' },
  { src: '08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/slides/slides.md', out: '08-1-oop-classes-polymorphism-slides.html', title: 'Lesson 8.1: OOP, Encapsulation & Polymorphism' },
  { src: '08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/slides/slides.md', out: '08-2-formats-solid-patterns-slides.html', title: 'Lesson 8.2: XML/JSON, SOLID & Design Patterns' },
  { src: '11-Internet-Server-Security/slides/slides.md', out: '11-internet-security-slides.html', title: 'Unit 11: Security, OWASP, TLS & Cryptography' },
  { src: '16-Software-Business-and-Capstone/slides/slides.md', out: '16-software-business-capstone-slides.html', title: 'Unit 16: Software Business, Agile & Capstone' },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function findBrowser() {
  for (const bin of ['chromium', 'google-chrome', 'chromium-browser']) {
    try {
      const resolved = execFileSync('which', [bin], { encoding: 'utf8' }).trim();
      if (resolved) return resolved;
    } catch {
      // try next
    }
  }
  return null;
}

function stripFrontmatter(md) {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

function rewriteAssetPaths(md, fileRelPath, outputDirRel) {
  const srcDir = path.posix.dirname(fileRelPath);
  const toTargetRel = (rel) => {
    if (!rel || /^(https?:|data:|#|\/|mailto:|file:)/i.test(rel)) return rel;
    const targetFromRoot = path.posix.normalize(path.posix.join(srcDir, rel));
    return outputDirRel ? path.posix.relative(outputDirRel, targetFromRoot) : targetFromRoot;
  };

  let inFence = false;
  return md
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;

      let out = line.replace(/(!\[[^\]]*\]\()([^)\s]+)(\))/g, (m, pre, rel, post) => `${pre}${toTargetRel(rel)}${post}`);
      out = out.replace(/(<img\b[^>]*?\bsrc=["'])([^"']+)(["'])/gi, (m, pre, rel, post) => `${pre}${toTargetRel(rel)}${post}`);
      return out;
    })
    .join('\n');
}

function combineMarkdown(files, title, subtitle) {
  const sections = [
    `<div class="cover-page"><h1>${title}</h1><p class="subtitle">${subtitle}</p><p class="meta">JavaScript First — Coding Book &amp; AZ CTE Course (CIP 11.0202.00)</p></div>\n\n<div class="page-break"></div>\n`,
  ];

  for (const relPath of files) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) {
      console.warn(`[warn] Skipping missing file: ${relPath}`);
      continue;
    }
    const raw = fs.readFileSync(absPath, 'utf8');
    // Built HTML lives inside dist/, so relative image assets should step up one level to ROOT or resolve via ROOT
    const cleaned = rewriteAssetPaths(stripFrontmatter(raw), relPath, 'dist');
    sections.push(`\n<!-- Source: ${relPath} -->\n\n${cleaned}\n\n<div class="page-break"></div>\n`);
  }

  return sections.join('\n');
}

const PRINT_CSS = `
  @page { margin: 0.75in; size: letter; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.55; color: #1f2937; max-width: 820px; margin: 0 auto; padding: 1.5rem; }
  h1, h2, h3, h4 { color: #111827; page-break-after: avoid; }
  h1 { border-bottom: 2px solid #f59e0b; padding-bottom: 0.3rem; margin-top: 1.5rem; }
  pre, code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.88em; }
  pre { background: #1e293b; color: #f8fafc; padding: 0.85rem 1rem; border-radius: 6px; overflow-x: auto; page-break-inside: avoid; }
  code { background: #f3f4f6; padding: 0.12rem 0.3rem; border-radius: 4px; }
  pre code { background: transparent; padding: 0; color: inherit; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; page-break-inside: avoid; }
  th, td { border: 1px solid #d1d5db; padding: 0.5rem 0.75rem; text-align: left; }
  th { background: #f9fafb; font-weight: 600; }
  blockquote { border-left: 4px solid #f59e0b; margin: 1rem 0; padding: 0.25rem 1rem; color: #4b5563; background: #fffbeb; }
  img { max-width: 100%; height: auto; }
  .cover-page { text-align: center; padding: 4rem 1rem; }
  .cover-page h1 { border: none; font-size: 2.6rem; }
  .cover-page .subtitle { font-size: 1.25rem; color: #4b5563; }
  .page-break { page-break-after: always; }
`;

function buildPdfBook({ name, title, subtitle, files }) {
  ensureDir(DIST);
  const combinedMdPath = path.join(DIST, `${name}.md`);
  const htmlPath = path.join(DIST, `${name}.html`);
  const pdfPath = path.join(DIST, `${name}.pdf`);
  const cssPath = path.join(DIST, 'print.css');

  fs.writeFileSync(cssPath, PRINT_CSS, 'utf8');
  fs.writeFileSync(combinedMdPath, combineMarkdown(files, title, subtitle), 'utf8');

  execFileSync(
    'pandoc',
    [
      combinedMdPath,
      '-f', 'gfm+raw_html',
      '-t', 'html5',
      '--standalone',
      '--toc',
      '--toc-depth=2',
      '--metadata', `title=${title}`,
      '--css', 'print.css',
      '-o', htmlPath,
    ],
    { cwd: ROOT, stdio: 'inherit' }
  );

  const browser = findBrowser();
  if (!browser) {
    console.warn(`[warn] Chromium/Chrome not found; generated HTML at ${htmlPath} without PDF.`);
    return;
  }

  execFileSync(
    browser,
    [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      `--print-to-pdf=${pdfPath}`,
      '--no-pdf-header-footer',
      `file://${htmlPath}`,
    ],
    { cwd: ROOT, stdio: 'inherit' }
  );

  console.log(`[ok] Built ${pdfPath}`);
}

function buildSlides() {
  const slidesDist = path.join(DIST, 'slides');
  ensureDir(slidesDist);

  for (const deck of SLIDE_DECKS) {
    const absSrc = path.join(ROOT, deck.src);
    if (!fs.existsSync(absSrc)) {
      console.warn(`[warn] Missing slide deck: ${deck.src}`);
      continue;
    }
    const outPath = path.join(slidesDist, deck.out);
    const cleaned = rewriteAssetPaths(stripFrontmatter(fs.readFileSync(absSrc, 'utf8')), deck.src, 'dist/slides');
    const tmpMd = path.join(slidesDist, `${deck.out}.tmp.md`);
    fs.writeFileSync(tmpMd, cleaned, 'utf8');

    execFileSync(
      'pandoc',
      [
        tmpMd,
        '-f', 'gfm+raw_html',
        '-t', 'revealjs',
        '--standalone',
        '-V', 'theme=night',
        '-V', 'transition=slide',
        '-V', 'revealjs-url=https://unpkg.com/reveal.js@5',
        '--metadata', `title=${deck.title}`,
        '-o', outPath,
      ],
      { cwd: ROOT, stdio: 'inherit' }
    );
    fs.unlinkSync(tmpMd);
    console.log(`[ok] Built slide deck ${outPath} (append ?print-pdf to export PDF)`);
  }
}

const args = new Set(process.argv.slice(2));
const runAll = args.size === 0 || args.has('--all');

if (runAll || args.has('--student')) {
  buildPdfBook({
    name: 'JavaScript-First-Student-Book',
    title: 'JavaScript First — Student Book, Evaluations & Labs',
    subtitle: 'Full-Semester Node.js & Full-Stack Engineering Textbook (Units 1–16)',
    files: STUDENT_SOURCES,
  });
}

if (runAll || args.has('--teacher')) {
  buildPdfBook({
    name: 'JavaScript-First-Teachers-Manual',
    title: "JavaScript First — Teacher's Manual",
    subtitle: 'AZ CTE Software & App Design (11.0202.00) Pacing, Lesson Plans, Answer Keys & Rubrics',
    files: TEACHER_SOURCES,
  });
}

if (runAll || args.has('--slides')) {
  buildSlides();
}
