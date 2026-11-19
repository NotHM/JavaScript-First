#!/usr/bin/env node
/**
 * JavaScript First — Book, Teacher's Manual & Reveal.js Slide Publisher
 *
 * Uses `pandoc` for Markdown -> HTML conversion and headless Chromium/Chrome
 * for print-ready PDF generation, plus Reveal.js HTML generation for slides.
 *
 * Usage:
 *   node tools/publish.mjs --student   (Units 01–20 complete Student Book PDF)
 *   node tools/publish.mjs --teacher   (Units 01–20 complete Teacher's Manual PDF)
 *   node tools/publish.mjs --slides    (All 49 Reveal.js slide decks -> dist/slides/)
 *   node tools/publish.mjs --year1     (West-MEC Year 1 CO101+CO102 Student & Teacher PDFs)
 *   node tools/publish.mjs --year2     (West-MEC Year 2 CO201+CO202 Student & Teacher PDFs)
 *   node tools/publish.mjs --all       (Default: Student Book, Teacher's Manual & Slides)
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const STUDENT_FRONT_MATTER = [
  'README.md',
  '0-documentation/west-mec-scope-and-sequence.md',
  '0-documentation/blooms-taxonomy-framework.md',
];

const TEACHER_FRONT_MATTER = [
  'STANDARDS.md',
  'roadmap.md',
  '0-documentation/west-mec-scope-and-sequence.md',
  '0-documentation/blooms-taxonomy-framework.md',
];

// Unit definitions ordered cleanly with West-MEC Year tagging + 18-Week Core progression
const UNITS = {
  U01: {
    year: 1,
    student: [
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
      '01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/readme.md',
      '01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/pre-lesson-eval.md',
      '01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/student-lesson.md',
      '01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/post-lesson-eval.md',
      '01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/readme.md',
      '01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/pre-lesson-eval.md',
      '01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/student-lesson.md',
      '01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/post-lesson-eval.md',
      '01-Reteaching-JavaScript/evaluations/post-unit-eval.md',
      '01-Reteaching-JavaScript/projects/unit-project.md',
    ],
    teacher: [
      '01-Reteaching-JavaScript/unit-guide.md',
      '01-Reteaching-JavaScript/01-History-of-JS/lesson-plan.md',
      '01-Reteaching-JavaScript/02-Terminal-NVM/lesson-plan.md',
      '01-Reteaching-JavaScript/03-logging-datatypes/lesson-plan.md',
      '01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/lesson-plan.md',
      '01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/lesson-plan.md',
      '01-Reteaching-JavaScript/evaluations/eval-answer-key.md',
      '01-Reteaching-JavaScript/quizzes/quiz-1-concepts.md',
      '01-Reteaching-JavaScript/quizzes/quiz-2-application.md',
      '01-Reteaching-JavaScript/projects/project-rubric.md',
    ],
  },
  U12: {
    year: 1,
    student: [
      '12-Computer-Math-and-Binary/evaluations/pre-unit-eval.md',
      '12-Computer-Math-and-Binary/readme.md',
      '12-Computer-Math-and-Binary/pre-lesson-eval.md',
      '12-Computer-Math-and-Binary/student-lesson.md',
      '12-Computer-Math-and-Binary/post-lesson-eval.md',
      '12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/readme.md',
      '12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/pre-lesson-eval.md',
      '12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/student-lesson.md',
      '12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/post-lesson-eval.md',
      '12-Computer-Math-and-Binary/evaluations/post-unit-eval.md',
      '12-Computer-Math-and-Binary/projects/unit-project.md',
    ],
    teacher: [
      '12-Computer-Math-and-Binary/unit-guide.md',
      '12-Computer-Math-and-Binary/lesson-plan.md',
      '12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/lesson-plan.md',
      '12-Computer-Math-and-Binary/evaluations/eval-answer-key.md',
      '12-Computer-Math-and-Binary/quizzes/quiz-1-concepts.md',
      '12-Computer-Math-and-Binary/quizzes/quiz-2-application.md',
      '12-Computer-Math-and-Binary/projects/project-rubric.md',
    ],
  },
  U04: {
    year: 1,
    student: [
      '04-Variables-Scope-Immutability/evaluations/pre-unit-eval.md',
      '04-Variables-Scope-Immutability/readme.md',
      '04-Variables-Scope-Immutability/pre-lesson-eval.md',
      '04-Variables-Scope-Immutability/student-lesson.md',
      '04-Variables-Scope-Immutability/post-lesson-eval.md',
      '04-Variables-Scope-Immutability/evaluations/post-unit-eval.md',
      '04-Variables-Scope-Immutability/projects/unit-project.md',
    ],
    teacher: [
      '04-Variables-Scope-Immutability/unit-guide.md',
      '04-Variables-Scope-Immutability/lesson-plan.md',
      '04-Variables-Scope-Immutability/evaluations/eval-answer-key.md',
      '04-Variables-Scope-Immutability/quizzes/quiz-1-concepts.md',
      '04-Variables-Scope-Immutability/quizzes/quiz-2-application.md',
      '04-Variables-Scope-Immutability/projects/project-rubric.md',
    ],
  },
  U05: {
    year: 1,
    student: [
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
      '05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/readme.md',
      '05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/pre-lesson-eval.md',
      '05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/student-lesson.md',
      '05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/post-lesson-eval.md',
      '05-DataStructures-and-Loops/evaluations/post-unit-eval.md',
      '05-DataStructures-and-Loops/projects/unit-project.md',
    ],
    teacher: [
      '05-DataStructures-and-Loops/unit-guide.md',
      '05-DataStructures-and-Loops/01-Iteration-and-Loops/lesson-plan.md',
      '05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/lesson-plan.md',
      '05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/lesson-plan.md',
      '05-DataStructures-and-Loops/evaluations/eval-answer-key.md',
      '05-DataStructures-and-Loops/quizzes/quiz-1-concepts.md',
      '05-DataStructures-and-Loops/quizzes/quiz-2-application.md',
      '05-DataStructures-and-Loops/projects/project-rubric.md',
    ],
  },
  U06: {
    year: 1,
    student: [
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
    ],
    teacher: [
      '06-Functions/unit-guide.md',
      '06-Functions/01-Conditionals-and-Boolean-Logic/lesson-plan.md',
      '06-Functions/02-Functions-and-Closures/lesson-plan.md',
      '06-Functions/evaluations/eval-answer-key.md',
      '06-Functions/quizzes/quiz-1-concepts.md',
      '06-Functions/quizzes/quiz-2-application.md',
      '06-Functions/projects/project-rubric.md',
    ],
  },
  U13: {
    year: 1,
    student: [
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
    ],
    teacher: [
      '13-Version-Control-and-Community/unit-guide.md',
      '13-Version-Control-and-Community/01-Version-Control-Git-CICD/lesson-plan.md',
      '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/lesson-plan.md',
      '13-Version-Control-and-Community/evaluations/eval-answer-key.md',
      '13-Version-Control-and-Community/quizzes/quiz-1-concepts.md',
      '13-Version-Control-and-Community/quizzes/quiz-2-application.md',
      '13-Version-Control-and-Community/projects/project-rubric.md',
    ],
  },
  U14: {
    year: 1,
    student: [
      '14-Program-Analysis-and-Design/evaluations/pre-unit-eval.md',
      '14-Program-Analysis-and-Design/readme.md',
      '14-Program-Analysis-and-Design/pre-lesson-eval.md',
      '14-Program-Analysis-and-Design/student-lesson.md',
      '14-Program-Analysis-and-Design/post-lesson-eval.md',
      '14-Program-Analysis-and-Design/evaluations/post-unit-eval.md',
      '14-Program-Analysis-and-Design/projects/unit-project.md',
    ],
    teacher: [
      '14-Program-Analysis-and-Design/unit-guide.md',
      '14-Program-Analysis-and-Design/lesson-plan.md',
      '14-Program-Analysis-and-Design/evaluations/eval-answer-key.md',
      '14-Program-Analysis-and-Design/quizzes/quiz-1-concepts.md',
      '14-Program-Analysis-and-Design/quizzes/quiz-2-application.md',
      '14-Program-Analysis-and-Design/projects/project-rubric.md',
    ],
  },
  U09: {
    year: 1,
    student: [
      '09-Debugging-TDD-Algorithms/readme.md',
      '09-Debugging-TDD-Algorithms/evaluations/pre-unit-eval.md',
      '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/readme.md',
      '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/pre-lesson-eval.md',
      '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/student-lesson.md',
      '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/post-lesson-eval.md',
      '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/readme.md',
      '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/BigO.md',
      '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/pre-lesson-eval.md',
      '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/student-lesson.md',
      '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/post-lesson-eval.md',
      '09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/readme.md',
      '09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/pre-lesson-eval.md',
      '09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/student-lesson.md',
      '09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/post-lesson-eval.md',
      '09-Debugging-TDD-Algorithms/evaluations/post-unit-eval.md',
      '09-Debugging-TDD-Algorithms/projects/unit-project.md',
    ],
    teacher: [
      '09-Debugging-TDD-Algorithms/unit-guide.md',
      '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/lesson-plan.md',
      '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/lesson-plan.md',
      '09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/lesson-plan.md',
      '09-Debugging-TDD-Algorithms/evaluations/eval-answer-key.md',
      '09-Debugging-TDD-Algorithms/quizzes/quiz-1-concepts.md',
      '09-Debugging-TDD-Algorithms/quizzes/quiz-2-application.md',
      '09-Debugging-TDD-Algorithms/projects/project-rubric.md',
    ],
  },
  U02: {
    year: 1,
    student: [
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
      '02-HTTP/03-Express-and-SSR/readme.md',
      '02-HTTP/03-Express-and-SSR/pre-lesson-eval.md',
      '02-HTTP/03-Express-and-SSR/student-lesson.md',
      '02-HTTP/03-Express-and-SSR/post-lesson-eval.md',
      '02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/readme.md',
      '02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/pre-lesson-eval.md',
      '02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/student-lesson.md',
      '02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/post-lesson-eval.md',
      '02-HTTP/evaluations/post-unit-eval.md',
      '02-HTTP/projects/unit-project.md',
    ],
    teacher: [
      '02-HTTP/unit-guide.md',
      '02-HTTP/01-Internet-Protocols-and-Cloud/lesson-plan.md',
      '02-HTTP/02-Node-HTTP-Server/lesson-plan.md',
      '02-HTTP/03-Express-and-SSR/lesson-plan.md',
      '02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/lesson-plan.md',
      '02-HTTP/evaluations/eval-answer-key.md',
      '02-HTTP/quizzes/quiz-1-concepts.md',
      '02-HTTP/quizzes/quiz-2-application.md',
      '02-HTTP/projects/project-rubric.md',
    ],
  },
  U03: {
    year: 1,
    student: [
      '03-AJAX/evaluations/pre-unit-eval.md',
      '03-AJAX/readme.md',
      '03-AJAX/00-fetch/readme.md',
      '03-AJAX/pre-lesson-eval.md',
      '03-AJAX/student-lesson.md',
      '03-AJAX/post-lesson-eval.md',
      '03-AJAX/evaluations/post-unit-eval.md',
      '03-AJAX/projects/unit-project.md',
    ],
    teacher: [
      '03-AJAX/unit-guide.md',
      '03-AJAX/lesson-plan.md',
      '03-AJAX/evaluations/eval-answer-key.md',
      '03-AJAX/quizzes/quiz-1-concepts.md',
      '03-AJAX/quizzes/quiz-2-application.md',
      '03-AJAX/projects/project-rubric.md',
    ],
  },
  U07: {
    year: 2,
    student: [
      '07-Async-JS/evaluations/pre-unit-eval.md',
      '07-Async-JS/readme.md',
      '07-Async-JS/pre-lesson-eval.md',
      '07-Async-JS/student-lesson.md',
      '07-Async-JS/post-lesson-eval.md',
      '07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/readme.md',
      '07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/pre-lesson-eval.md',
      '07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/student-lesson.md',
      '07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/post-lesson-eval.md',
      '07-Async-JS/evaluations/post-unit-eval.md',
      '07-Async-JS/projects/unit-project.md',
    ],
    teacher: [
      '07-Async-JS/unit-guide.md',
      '07-Async-JS/lesson-plan.md',
      '07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/lesson-plan.md',
      '07-Async-JS/evaluations/eval-answer-key.md',
      '07-Async-JS/quizzes/quiz-1-concepts.md',
      '07-Async-JS/quizzes/quiz-2-application.md',
      '07-Async-JS/projects/project-rubric.md',
    ],
  },
  U15: {
    year: 2,
    student: [
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
    ],
    teacher: [
      '15-Storage-Databases-and-CRUD/unit-guide.md',
      '15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/lesson-plan.md',
      '15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/lesson-plan.md',
      '15-Storage-Databases-and-CRUD/evaluations/eval-answer-key.md',
      '15-Storage-Databases-and-CRUD/quizzes/quiz-1-concepts.md',
      '15-Storage-Databases-and-CRUD/quizzes/quiz-2-application.md',
      '15-Storage-Databases-and-CRUD/projects/project-rubric.md',
    ],
  },
  U10: {
    year: 1,
    student: [
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
      '10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/readme.md',
      '10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/pre-lesson-eval.md',
      '10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/student-lesson.md',
      '10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/post-lesson-eval.md',
      '10-HTML-CSS-DOM/evaluations/post-unit-eval.md',
      '10-HTML-CSS-DOM/projects/unit-project.md',
    ],
    teacher: [
      '10-HTML-CSS-DOM/unit-guide.md',
      '10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/lesson-plan.md',
      '10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/lesson-plan.md',
      '10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/lesson-plan.md',
      '10-HTML-CSS-DOM/evaluations/eval-answer-key.md',
      '10-HTML-CSS-DOM/quizzes/quiz-1-concepts.md',
      '10-HTML-CSS-DOM/quizzes/quiz-2-application.md',
      '10-HTML-CSS-DOM/projects/project-rubric.md',
    ],
  },
  U08: {
    year: 2,
    student: [
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
    ],
    teacher: [
      '08-OOP-and-Design-Patterns/unit-guide.md',
      '08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/lesson-plan.md',
      '08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/lesson-plan.md',
      '08-OOP-and-Design-Patterns/evaluations/eval-answer-key.md',
      '08-OOP-and-Design-Patterns/quizzes/quiz-1-concepts.md',
      '08-OOP-and-Design-Patterns/quizzes/quiz-2-application.md',
      '08-OOP-and-Design-Patterns/projects/project-rubric.md',
    ],
  },
  U11: {
    year: 2,
    student: [
      '11-Internet-Server-Security/evaluations/pre-unit-eval.md',
      '11-Internet-Server-Security/readme.md',
      '11-Internet-Server-Security/pre-lesson-eval.md',
      '11-Internet-Server-Security/student-lesson.md',
      '11-Internet-Server-Security/post-lesson-eval.md',
      '11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/readme.md',
      '11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/pre-lesson-eval.md',
      '11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/student-lesson.md',
      '11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/post-lesson-eval.md',
      '11-Internet-Server-Security/evaluations/post-unit-eval.md',
      '11-Internet-Server-Security/projects/unit-project.md',
    ],
    teacher: [
      '11-Internet-Server-Security/unit-guide.md',
      '11-Internet-Server-Security/lesson-plan.md',
      '11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/lesson-plan.md',
      '11-Internet-Server-Security/evaluations/eval-answer-key.md',
      '11-Internet-Server-Security/quizzes/quiz-1-concepts.md',
      '11-Internet-Server-Security/quizzes/quiz-2-application.md',
      '11-Internet-Server-Security/projects/project-rubric.md',
    ],
  },
  U16: {
    year: 2,
    student: [
      '16-Software-Business-and-Capstone/evaluations/pre-unit-eval.md',
      '16-Software-Business-and-Capstone/readme.md',
      '16-Software-Business-and-Capstone/pre-lesson-eval.md',
      '16-Software-Business-and-Capstone/student-lesson.md',
      '16-Software-Business-and-Capstone/post-lesson-eval.md',
      '16-Software-Business-and-Capstone/evaluations/post-unit-eval.md',
      '16-Software-Business-and-Capstone/projects/unit-project.md',
    ],
    teacher: [
      '16-Software-Business-and-Capstone/unit-guide.md',
      '16-Software-Business-and-Capstone/lesson-plan.md',
      '16-Software-Business-and-Capstone/evaluations/eval-answer-key.md',
      '16-Software-Business-and-Capstone/quizzes/quiz-1-concepts.md',
      '16-Software-Business-and-Capstone/quizzes/quiz-2-application.md',
      '16-Software-Business-and-Capstone/projects/project-rubric.md',
    ],
  },
  U17: {
    year: 2,
    student: [
      '17-Deno-Security-and-WebAssembly/readme.md',
      '17-Deno-Security-and-WebAssembly/evaluations/pre-unit-eval.md',
      '17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/readme.md',
      '17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/pre-lesson-eval.md',
      '17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/student-lesson.md',
      '17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/post-lesson-eval.md',
      '17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/readme.md',
      '17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/pre-lesson-eval.md',
      '17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/student-lesson.md',
      '17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/post-lesson-eval.md',
      '17-Deno-Security-and-WebAssembly/evaluations/post-unit-eval.md',
      '17-Deno-Security-and-WebAssembly/projects/unit-project.md',
    ],
    teacher: [
      '17-Deno-Security-and-WebAssembly/unit-guide.md',
      '17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/lesson-plan.md',
      '17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/lesson-plan.md',
      '17-Deno-Security-and-WebAssembly/evaluations/eval-answer-key.md',
      '17-Deno-Security-and-WebAssembly/quizzes/quiz-1-concepts.md',
      '17-Deno-Security-and-WebAssembly/quizzes/quiz-2-application.md',
      '17-Deno-Security-and-WebAssembly/projects/project-rubric.md',
    ],
  },
  U18: {
    year: 2,
    student: [
      '18-Full-Stack-REST-Bun-and-MongoDB/readme.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/evaluations/pre-unit-eval.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/readme.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/pre-lesson-eval.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/student-lesson.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/post-lesson-eval.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/readme.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/pre-lesson-eval.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/student-lesson.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/post-lesson-eval.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/evaluations/post-unit-eval.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/projects/unit-project.md',
    ],
    teacher: [
      '18-Full-Stack-REST-Bun-and-MongoDB/unit-guide.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/lesson-plan.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/lesson-plan.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/evaluations/eval-answer-key.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/quizzes/quiz-1-concepts.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/quizzes/quiz-2-application.md',
      '18-Full-Stack-REST-Bun-and-MongoDB/projects/project-rubric.md',
    ],
  },
  U19: {
    year: 2,
    student: [
      '19-Game-Dev-Phaser-and-JSGameLauncher/readme.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/evaluations/pre-unit-eval.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/01-Game-Loops-Canvas-and-Gamepad/readme.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/01-Game-Loops-Canvas-and-Gamepad/pre-lesson-eval.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/01-Game-Loops-Canvas-and-Gamepad/student-lesson.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/01-Game-Loops-Canvas-and-Gamepad/post-lesson-eval.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/readme.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/pre-lesson-eval.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/student-lesson.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/post-lesson-eval.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/readme.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/pre-lesson-eval.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/student-lesson.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/post-lesson-eval.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/evaluations/post-unit-eval.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/projects/unit-project.md',
    ],
    teacher: [
      '19-Game-Dev-Phaser-and-JSGameLauncher/unit-guide.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/01-Game-Loops-Canvas-and-Gamepad/lesson-plan.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/lesson-plan.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/lesson-plan.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/evaluations/eval-answer-key.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/quizzes/quiz-1-concepts.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/quizzes/quiz-2-application.md',
      '19-Game-Dev-Phaser-and-JSGameLauncher/projects/project-rubric.md',
    ],
  },
  U20: {
    year: 2,
    student: [
      '20-Local-AI-Multimodal-and-3D-Capstone/readme.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/evaluations/pre-unit-eval.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/readme.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/pre-lesson-eval.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/student-lesson.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/post-lesson-eval.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/readme.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/pre-lesson-eval.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/student-lesson.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/post-lesson-eval.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/readme.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/pre-lesson-eval.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/student-lesson.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/post-lesson-eval.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/evaluations/post-unit-eval.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/projects/unit-project.md',
    ],
    teacher: [
      '20-Local-AI-Multimodal-and-3D-Capstone/unit-guide.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/lesson-plan.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/lesson-plan.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/lesson-plan.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/evaluations/eval-answer-key.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/quizzes/quiz-1-concepts.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/quizzes/quiz-2-application.md',
      '20-Local-AI-Multimodal-and-3D-Capstone/projects/project-rubric.md',
    ],
  },
};

// Default full order: 18-Week Core Units (01–16) followed by Year 2 Advanced & Capstone Units (17–20)
const FULL_ORDER = [
  'U01', 'U12', 'U04', 'U05', 'U06',
  'U13', 'U14', 'U09', 'U02', 'U03',
  'U07', 'U15', 'U10', 'U08', 'U11', 'U16',
  'U17', 'U18', 'U19', 'U20',
];

// West-MEC Year 1 (CO101 + CO102) & Year 2 (CO201 + CO202) exact semester order
const YEAR1_ORDER = ['U01', 'U12', 'U04', 'U05', 'U06', 'U13', 'U14', 'U09', 'U02', 'U03', 'U10'];
const YEAR2_ORDER = ['U07', 'U15', 'U08', 'U11', 'U17', 'U18', 'U19', 'U16', 'U20'];

const collectSources = (order, kind, frontMatter) => [
  ...frontMatter,
  ...order.flatMap((key) => UNITS[key][kind]),
];

const STUDENT_SOURCES = collectSources(FULL_ORDER, 'student', STUDENT_FRONT_MATTER);
const TEACHER_SOURCES = collectSources(FULL_ORDER, 'teacher', TEACHER_FRONT_MATTER);
const YEAR1_STUDENT_SOURCES = collectSources(YEAR1_ORDER, 'student', STUDENT_FRONT_MATTER);
const YEAR1_TEACHER_SOURCES = collectSources(YEAR1_ORDER, 'teacher', TEACHER_FRONT_MATTER);
const YEAR2_STUDENT_SOURCES = collectSources(YEAR2_ORDER, 'student', STUDENT_FRONT_MATTER);
const YEAR2_TEACHER_SOURCES = collectSources(YEAR2_ORDER, 'teacher', TEACHER_FRONT_MATTER);

const SLIDE_DECKS = [
  { src: '01-Reteaching-JavaScript/01-History-of-JS/slides/slides.md', out: '01-1-history-legal-ethics-slides.html', title: 'Lesson 1.1: History, Licensing & Tech Ethics' },
  { src: '01-Reteaching-JavaScript/02-Terminal-NVM/slides/slides.md', out: '01-2-terminal-nvm-node-slides.html', title: 'Lesson 1.2: CLI, NVM & Node.js Development' },
  { src: '01-Reteaching-JavaScript/readme.md', out: '01-2b-node-npm-overview-slides.html', title: 'Lesson 1.2b: Node.js, NPM & NVM Overview' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/01-primitiveTypes.md', out: '01-3a-primitive-types-slides.html', title: 'Lesson 1.3a: Primitive Data Types' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/02-objectTypes.md', out: '01-3b-object-types-slides.html', title: 'Lesson 1.3b: Object Types' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/03-logging.md', out: '01-3c-logging-slides.html', title: 'Lesson 1.3c: Logging Data Types' },
  { src: '01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/slides/slides.md', out: '01-4-module-standards-esm-cjs-slides.html', title: 'Lesson 1.4: Module Standards (ESM vs. CJS) & Import Errors' },
  { src: '01-Reteaching-JavaScript/05-Linux-Admin-Hardware-and-OS-Safety/slides/slides.md', out: '01-5-linux-admin-hardware-safety-slides.html', title: 'Lesson 1.5: Linux System Administration, Hardware & OS Safety' },
  { src: '12-Computer-Math-and-Binary/slides/slides.md', out: '12-computer-math-binary-slides.html', title: 'Lesson 12.1: Computer Math, Binary & Bitwise Logic' },
  { src: '12-Computer-Math-and-Binary/02-Drone-Flight-Physics-LiPo-and-Geodesic-Math/slides/slides.md', out: '12-2-drone-flight-physics-geodesic-slides.html', title: 'Lesson 12.2: Drone Flight Physics, LiPo Chemistry & Geodesic Math' },
  { src: '04-Variables-Scope-Immutability/slides/slides.md', out: '04-variables-scope-slides.html', title: 'Unit 4: Variables, Scope & Immutability' },
  { src: '05-DataStructures-and-Loops/01-Iteration-and-Loops/slides/slides.md', out: '05-1-iteration-loops-slides.html', title: 'Lesson 5.1: Iterative Structures, Trace Tables & Recursion' },
  { src: '05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/slides/slides.md', out: '05-2-arrays-matrices-trees-slides.html', title: 'Lesson 5.2: Arrays, Matrices, Trees & Classic Structures' },
  { src: '05-DataStructures-and-Loops/03-Data-Cleaning-Vectors-and-Feature-Engineering/slides/slides.md', out: '05-3-ai-data-cleaning-vectors-pii-slides.html', title: 'Lesson 5.3: Data Cleaning, Feature Vectors, Statistics & PII Anonymization' },
  { src: '06-Functions/01-Conditionals-and-Boolean-Logic/slides/slides.md', out: '06-1-conditionals-boolean-logic-slides.html', title: 'Lesson 6.1: Conditionals & Boolean Logic' },
  { src: '06-Functions/02-Functions-and-Closures/slides/slides.md', out: '06-2-functions-closures-slides.html', title: 'Lesson 6.2: Functions, Closures & Functional JS' },
  { src: '13-Version-Control-and-Community/01-Version-Control-Git-CICD/slides/slides.md', out: '13-1-vcs-git-cicd-slides.html', title: 'Lesson 13.1: Version Control, Git & CI/CD' },
  { src: '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/slides/slides.md', out: '13-2-community-npm-docs-slides.html', title: 'Lesson 13.2: Stdlib, npm, ESLint & Community Docs' },
  { src: '14-Program-Analysis-and-Design/slides/slides.md', out: '14-program-analysis-design-slides.html', title: 'Unit 14: Program Analysis, SDLC & System Design' },
  { src: '09-Debugging-TDD-Algorithms/01-Testing-and-Debugging/slides/slides.md', out: '09-1-testing-debugging-slides.html', title: 'Lesson 9.1: Error Categories, Debugging & TDD' },
  { src: '09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/slides/slides.md', out: '09-2-search-sort-algorithms-slides.html', title: 'Lesson 9.2: Searching, Sorting, Graphs & Big-O' },
  { src: '09-Debugging-TDD-Algorithms/03-Machine-Learning-Algorithms-Eval-and-Fairness/slides/slides.md', out: '09-3-ml-algorithms-eval-fairness-slides.html', title: 'Lesson 9.3: Machine Learning Algorithms, Evaluation Metrics & Fairness Audits' },
  { src: '02-HTTP/01-Internet-Protocols-and-Cloud/slides/slides.md', out: '02-1-protocols-cloud-iot-slides.html', title: 'Lesson 2.1: Internet Protocols, Cloud & IoT' },
  { src: '02-HTTP/03-http.md', out: '02-2-http-server-slides.html', title: 'Lesson 2.2: HTTP with Node.js' },
  { src: '02-HTTP/03-Express-and-SSR/slides/slides.md', out: '02-3-express-ssr-slides.html', title: 'Lesson 2.3: Express.js & Modular Server-Side Rendering' },
  { src: '02-HTTP/04-Subnetting-OSI-Topologies-and-Routing/slides/slides.md', out: '02-4-subnetting-osi-routing-slides.html', title: 'Lesson 2.4: Subnetting, OSI Topologies, Protocols & Troubleshooting' },
  { src: '03-AJAX/slides/slides.md', out: '03-ajax-client-slides.html', title: 'Unit 3: Client-Side Web, AJAX & Fetch' },
  { src: '07-Async-JS/slides/slides.md', out: '07-async-js-slides.html', title: 'Lesson 7.1: Async JS, Promises, Queues & Error Severity' },
  { src: '07-Async-JS/02-Telemetry-FailSafe-and-Sensor-Streams/slides/slides.md', out: '07-2-drone-telemetry-failsafe-pid-slides.html', title: 'Lesson 7.2: RF Telemetry, MAVLink/CRSF Framing & Async Fail-Safe' },
  { src: '15-Storage-Databases-and-CRUD/01-Storage-Architecture-File-IO/slides/slides.md', out: '15-1-storage-file-io-slides.html', title: 'Lesson 15.1: Storage Tiers, File I/O & Backups' },
  { src: '15-Storage-Databases-and-CRUD/02-Databases-SQL-Mongo-CRUD/slides/slides.md', out: '15-2-databases-sql-mongo-crud-slides.html', title: 'Lesson 15.2: SQL vs. MongoDB & CRUD' },
  { src: '10-HTML-CSS-DOM/01-UCD-W3C-Accessibility-SEO/slides/slides.md', out: '10-1-ucd-a11y-seo-slides.html', title: 'Lesson 10.1: UCD, Accessibility (ADA/ARIA) & SEO' },
  { src: '10-HTML-CSS-DOM/02-Responsive-CSS-Canvas-DOM/slides/slides.md', out: '10-2-responsive-css-canvas-dom-slides.html', title: 'Lesson 10.2: Responsive CSS, 2D Canvas & DOM' },
  { src: '10-HTML-CSS-DOM/03-Computer-Vision-Pixels-Convolutions-and-IoU/slides/slides.md', out: '10-3-computer-vision-convolutions-iou-slides.html', title: 'Lesson 10.3: Computer Vision Matrices, Convolutions, IoU & AI Compute Hardware' },
  { src: '08-OOP-and-Design-Patterns/01-OOP-Classes-and-Polymorphism/slides/slides.md', out: '08-1-oop-classes-polymorphism-slides.html', title: 'Lesson 8.1: OOP, Encapsulation & Polymorphism' },
  { src: '08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/slides/slides.md', out: '08-2-formats-solid-patterns-slides.html', title: 'Lesson 8.2: XML/JSON, SOLID, Adapter & Patterns' },
  { src: '11-Internet-Server-Security/slides/slides.md', out: '11-internet-security-slides.html', title: 'Lesson 11.1: Security, OWASP, OpenSSL TLS & Cryptography' },
  { src: '11-Internet-Server-Security/02-Zero-Trust-Firewalls-SIEM-and-STRIDE/slides/slides.md', out: '11-2-zero-trust-firewalls-siem-stride-slides.html', title: 'Lesson 11.2: Zero Trust, Firewalls, SIEM Correlation & STRIDE' },
  { src: '16-Software-Business-and-Capstone/slides/slides.md', out: '16-software-business-capstone-slides.html', title: 'Unit 16: Software Business, Agile & Unit Economics' },
  { src: '17-Deno-Security-and-WebAssembly/01-Deno-Secure-Runtime/slides/slides.md', out: '17-1-deno-secure-runtime-slides.html', title: 'Lesson 17.1: Deno Security Sandbox & Capability Flags' },
  { src: '17-Deno-Security-and-WebAssembly/02-WebAssembly-WASM/slides/slides.md', out: '17-2-webassembly-wasm-slides.html', title: 'Lesson 17.2: WebAssembly Binary Format & Linear Memory' },
  { src: '18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/slides/slides.md', out: '18-1-bun-sqlite-rest-slides.html', title: 'Lesson 18.1: Full-Stack REST with Bun & SQLite' },
  { src: '18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/slides/slides.md', out: '18-2-mongodb-full-rest-slides.html', title: 'Lesson 18.2: Full-Stack Document REST with MongoDB' },
  { src: '19-Game-Dev-Phaser-and-JSGameLauncher/01-Game-Loops-Canvas-and-Gamepad/slides/slides.md', out: '19-1-game-loops-canvas-gamepad-slides.html', title: 'Lesson 19.1: 4:3 Canvas Loops, Web Audio & Gamepad API' },
  { src: '19-Game-Dev-Phaser-and-JSGameLauncher/02-Phaser-JS-and-JSGameLauncher/slides/slides.md', out: '19-2-phaser-jsgamelauncher-slides.html', title: 'Lesson 19.2: Phaser 3 Scenes & jsgamelauncher Handheld Builds' },
  { src: '19-Game-Dev-Phaser-and-JSGameLauncher/03-Drone-Mission-Sim-Part107-and-METAR/slides/slides.md', out: '19-3-drone-part107-metar-mission-sim-slides.html', title: 'Lesson 19.3: FAA Part 107 Airspace, METAR Weather, Survey Grids & Mode-2 Sim' },
  { src: '20-Local-AI-Multimodal-and-3D-Capstone/01-Local-LLM-Architecture-and-Streaming/slides/slides.md', out: '20-1-local-llm-streaming-rag-slides.html', title: 'Lesson 20.1: Local LLM Hosting, Ollama SSE & RAG Safety' },
  { src: '20-Local-AI-Multimodal-and-3D-Capstone/02-Multimodal-Voice-Vision-and-3D-Print-Capstone/slides/slides.md', out: '20-2-multimodal-voice-vision-3d-print-slides.html', title: 'Lesson 20.2: Voice/Vision AI & Parametric 3D CAD/STL Capstone' },
  { src: '20-Local-AI-Multimodal-and-3D-Capstone/03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/slides/slides.md', out: '20-3-nlp-agentic-ai-governance-slides.html', title: 'Lesson 20.3: NLP Pipelines, Agentic AI & Responsible Governance' },
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

function assertAllSourcesExist(files, label) {
  const missing = files.filter((relPath) => !fs.existsSync(path.join(ROOT, relPath)));
  if (missing.length > 0) {
    throw new Error(`[error] Missing ${missing.length} file(s) in ${label}:\n  - ${missing.join('\n  - ')}`);
  }
}

function combineMarkdown(files, title, subtitle) {
  assertAllSourcesExist(files, title);

  const sections = [
    `<div class="cover-page"><h1>${title}</h1><p class="subtitle">${subtitle}</p><p class="meta">JavaScript First — Coding Book &amp; West-MEC AZ CTE Course (CIP 11.0202.00)</p></div>\n\n<div class="page-break"></div>\n`,
  ];

  for (const relPath of files) {
    const absPath = path.join(ROOT, relPath);
    const raw = fs.readFileSync(absPath, 'utf8');
    // Built HTML lives inside dist/, so relative image assets step up to ROOT cleanly
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
  assertAllSourcesExist(SLIDE_DECKS.map((d) => d.src), 'SLIDE_DECKS');

  for (const deck of SLIDE_DECKS) {
    const absSrc = path.join(ROOT, deck.src);
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
    title: 'JavaScript First — Complete Student Book, Evaluations & Labs (Units 1–20)',
    subtitle: '2-Year West-MEC Node-First Textbook: Software & App Design (11.0202.00) + AI, Drone & IT Security Pathways',
    files: STUDENT_SOURCES,
  });
}

if (runAll || args.has('--teacher')) {
  buildPdfBook({
    name: 'JavaScript-First-Teachers-Manual',
    title: "JavaScript First — Complete Teacher's Manual (Units 1–20)",
    subtitle: 'West-MEC & AZ CTE Software & App Design (11.0202.00) + AI, Drone & IT Security SMART Goals, Lesson Plans, Keys & Rubrics',
    files: TEACHER_SOURCES,
  });
}

if (args.has('--year1')) {
  buildPdfBook({
    name: 'JavaScript-First-Year1-Student-Book',
    title: 'JavaScript First — Year 1 Student Book (West-MEC CO101 + CO102)',
    subtitle: 'Linux Safety, Modules, Drone Math, AI Vectors, ML Fairness, Networking/HTTP & Computer Vision',
    files: YEAR1_STUDENT_SOURCES,
  });
  buildPdfBook({
    name: 'JavaScript-First-Year1-Teachers-Manual',
    title: "JavaScript First — Year 1 Teacher's Manual (West-MEC CO101 + CO102)",
    subtitle: 'Year 1 SMART Goals, Lesson Plans, Answer Keys & Rubrics (450 Hours)',
    files: YEAR1_TEACHER_SOURCES,
  });
}

if (args.has('--year2')) {
  buildPdfBook({
    name: 'JavaScript-First-Year2-Student-Book',
    title: 'JavaScript First — Year 2 Student Book (West-MEC CO201 + CO202)',
    subtitle: 'RF Telemetry, Zero-Trust SIEM, Deno/WASM, Bun/Mongo REST, Part 107 Drone Sim & Agentic Local AI Capstone',
    files: YEAR2_STUDENT_SOURCES,
  });
  buildPdfBook({
    name: 'JavaScript-First-Year2-Teachers-Manual',
    title: "JavaScript First — Year 2 Teacher's Manual (West-MEC CO201 + CO202)",
    subtitle: 'Year 2 SMART Goals, Lesson Plans, Answer Keys & Capstone Rubrics (450 Hours)',
    files: YEAR2_TEACHER_SOURCES,
  });
}

if (runAll || args.has('--slides')) {
  buildSlides();
}
