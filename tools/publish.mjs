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

const STUDENT_SOURCES = [
  'README.md',
  '01-Reteaching-JavaScript/01-History-of-JS/readme.md',
  '01-Reteaching-JavaScript/01-History-of-JS/student-lesson.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/00-terminal-basics-and-installing-nvm-node-js.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/01-node-overview.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/student-lesson.md',
  '01-Reteaching-JavaScript/03-logging-datatypes/readme.md',
  '01-Reteaching-JavaScript/03-logging-datatypes/student-lesson.md',
  '02-HTTP/readme.md',
  '02-HTTP/student-lesson.md',
  '03-AJAX/readme.md',
  '03-AJAX/00-fetch/readme.md',
  '03-AJAX/student-lesson.md',
  '04-Variables-Scope-Immutability/readme.md',
  '04-Variables-Scope-Immutability/student-lesson.md',
  '05-DataStructures-and-Loops/readme.md',
  '05-DataStructures-and-Loops/student-lesson.md',
  '06-Functions/readme.md',
  '06-Functions/student-lesson.md',
  '07-Async-JS/readme.md',
  '07-Async-JS/student-lesson.md',
  '08-OOP-and-Design-Patterns/readme.md',
  '08-OOP-and-Design-Patterns/student-lesson.md',
  '09-Debugging-TDD-Algorithms/readme.md',
  '09-Debugging-TDD-Algorithms/student-lesson.md',
  '10-HTML-CSS-DOM/readme.md',
  '10-HTML-CSS-DOM/student-lesson.md',
  '11-Internet-Server-Security/readme.md',
  '11-Internet-Server-Security/student-lesson.md',
];

const TEACHER_SOURCES = [
  'STANDARDS.md',
  '01-Reteaching-JavaScript/unit-guide.md',
  '01-Reteaching-JavaScript/01-History-of-JS/lesson-plan.md',
  '01-Reteaching-JavaScript/02-Terminal-NVM/lesson-plan.md',
  '01-Reteaching-JavaScript/03-logging-datatypes/lesson-plan.md',
  '02-HTTP/unit-guide.md',
  '02-HTTP/lesson-plan.md',
  '03-AJAX/unit-guide.md',
  '03-AJAX/lesson-plan.md',
  '04-Variables-Scope-Immutability/unit-guide.md',
  '04-Variables-Scope-Immutability/lesson-plan.md',
  '05-DataStructures-and-Loops/unit-guide.md',
  '05-DataStructures-and-Loops/lesson-plan.md',
  '06-Functions/unit-guide.md',
  '06-Functions/lesson-plan.md',
  '07-Async-JS/unit-guide.md',
  '07-Async-JS/lesson-plan.md',
  '08-OOP-and-Design-Patterns/unit-guide.md',
  '08-OOP-and-Design-Patterns/lesson-plan.md',
  '09-Debugging-TDD-Algorithms/unit-guide.md',
  '09-Debugging-TDD-Algorithms/lesson-plan.md',
  '10-HTML-CSS-DOM/unit-guide.md',
  '10-HTML-CSS-DOM/lesson-plan.md',
  '11-Internet-Server-Security/unit-guide.md',
  '11-Internet-Server-Security/lesson-plan.md',
];

const SLIDE_DECKS = [
  { src: '01-Reteaching-JavaScript/readme.md', out: '01-node-overview-slides.html', title: 'Chapter 1: Node.js, NPM & NVM' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/01-primitiveTypes.md', out: '01-3-primitive-types-slides.html', title: 'Primitive Data Types' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/02-objectTypes.md', out: '01-3-object-types-slides.html', title: 'Object Types' },
  { src: '01-Reteaching-JavaScript/03-logging-datatypes/slides/03-logging.md', out: '01-3-logging-slides.html', title: 'Logging Data Types' },
  { src: '02-HTTP/03-http.md', out: '02-http-slides.html', title: 'Chapter 2: HTTP with Node.js' },
  { src: '04-Variables-Scope-Immutability/slides/slides.md', out: '04-variables-scope-slides.html', title: 'Chapter 4: Variables, Scope & Immutability' },
  { src: '05-DataStructures-and-Loops/slides/slides.md', out: '05-data-structures-slides.html', title: 'Chapter 5: Loops, JSON & Array Methods' },
  { src: '06-Functions/slides/slides.md', out: '06-functions-slides.html', title: 'Chapter 6: Functions & Functional Programming' },
  { src: '07-Async-JS/slides/slides.md', out: '07-async-js-slides.html', title: 'Chapter 7: Async JS, Promises & Concurrency' },
  { src: '08-OOP-and-Design-Patterns/slides/slides.md', out: '08-oop-patterns-slides.html', title: 'Chapter 8: OOP & Design Patterns' },
  { src: '09-Debugging-TDD-Algorithms/slides/slides.md', out: '09-debugging-tdd-slides.html', title: 'Chapter 9: Debugging, TDD & Algorithms' },
  { src: '10-HTML-CSS-DOM/slides/slides.md', out: '10-html-css-dom-slides.html', title: 'Chapter 10: HTML, CSS, Accessibility & DOM' },
  { src: '11-Internet-Server-Security/slides/slides.md', out: '11-internet-security-slides.html', title: 'Chapter 11: Internet, Modules & Web Security' },
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

function rewriteRelativePaths(md, fileRelPath) {
  const dir = path.dirname(fileRelPath);
  if (dir === '.') return md;
  // Convert relative markdown image/src paths so they resolve from ROOT
  return md.replace(/(\!\[[^\]]*\]\()(\.[^)]+)(\))/g, (_, pre, rel, post) => {
    const resolved = path.posix.normalize(path.posix.join(dir, rel));
    return `${pre}${resolved}${post}`;
  });
}

function combineMarkdown(files, title, subtitle) {
  const sections = [
    `<div class="cover-page"><h1>${title}</h1><p class="subtitle">${subtitle}</p><p class="meta">JavaScript First — Coding Book &amp; AZ CTE Course</p></div>\n\n<div class="page-break"></div>\n`,
  ];

  for (const relPath of files) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) {
      console.warn(`[warn] Skipping missing file: ${relPath}`);
      continue;
    }
    const raw = fs.readFileSync(absPath, 'utf8');
    const cleaned = rewriteRelativePaths(stripFrontmatter(raw), relPath);
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
    const cleaned = stripFrontmatter(fs.readFileSync(absSrc, 'utf8'));
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
    title: 'JavaScript First — Student Book & Labs',
    subtitle: 'Learn JavaScript First with Node.js, HTTP, and Asynchronous APIs',
    files: STUDENT_SOURCES,
  });
}

if (runAll || args.has('--teacher')) {
  buildPdfBook({
    name: 'JavaScript-First-Teachers-Manual',
    title: "JavaScript First — Teacher's Manual",
    subtitle: 'AZ CTE Software & App Design (11.0202.00) Unit Guides, Lesson Plans & Answer Keys',
    files: TEACHER_SOURCES,
  });
}

if (runAll || args.has('--slides')) {
  buildSlides();
}
