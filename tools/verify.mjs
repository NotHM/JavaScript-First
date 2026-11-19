#!/usr/bin/env node
/**
 * JavaScript First — Repository & Curriculum Verification Harness
 *
 * Usage:
 *   node tools/verify.mjs --tests   (Syntax checks + all instructor node:test suites)
 *   node tools/verify.mjs --full    (Full QA: syntax, node:test, HTML scripts, 40 Kahoot CSVs,
 *                                    >=5 Student/Teacher SMART Goals x 20 units, link integrity,
 *                                    00-Drafts removal check, and spoiler scan)
 */

import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git' || entry.name === '.vscode') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, results);
    } else {
      results.push(full);
    }
  }
  return results;
}

const ALL_FILES = walk(ROOT).sort();
const rel = (abs) => path.relative(ROOT, abs).replaceAll(path.sep, '/');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((c) => c.length > 0)) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((c) => c.length > 0)) rows.push(row);
  }
  return rows;
}

function checkSyntax() {
  const jsFiles = ALL_FILES.filter((f) => /\.(js|mjs|cjs)$/.test(f));
  const failures = [];
  for (const file of jsFiles) {
    const res = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (res.status !== 0) {
      failures.push(`${rel(file)}: ${res.stderr.trim()}`);
    }
  }
  console.log(`[syntax] Checked ${jsFiles.length} JS/MJS/CJS files -> ${failures.length} failure(s)`);
  if (failures.length) {
    throw new Error(`Syntax failures:\n${failures.join('\n')}`);
  }
  return jsFiles.length;
}

function runInstructorTests() {
  // Run all instructor test suites & test-enabled reference modules (excluding student TODO labs)
  const testFiles = ALL_FILES.filter((f) => {
    const r = rel(f);
    if (r.startsWith('0-student_files/')) return false;
    return (
      /\.test\.(js|mjs)$/.test(r) ||
      r === '02-HTTP/03-Express-and-SSR/code/expressStarterReference.mjs' ||
      r === '13-Version-Control-and-Community/02-Community-Resources-NPM-Docs/code/eslintPresetReference.mjs'
    );
  });

  for (const file of testFiles) {
    console.log(`[test] Running node --test ${rel(file)}`);
    execFileSync(process.execPath, ['--test', file], { cwd: ROOT, stdio: 'inherit' });
  }
  console.log(`[test] Passed all ${testFiles.length} instructor test suites!`);
  return testFiles.length;
}

function checkHtmlScripts() {
  const htmlFiles = ALL_FILES.filter((f) => f.endsWith('.html'));
  const failures = [];
  let scriptCount = 0;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const regex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
    let match;
    let idx = 0;
    while ((match = regex.exec(html)) !== null) {
      const attrs = match[1];
      const code = match[2].trim();
      if (!code || /\bsrc\s*=/.test(attrs)) continue;
      idx++;
      scriptCount++;
      const isModule = /\btype\s*=\s*["']?module["']?/i.test(attrs);
      const args = isModule ? ['--input-type=module', '--check'] : ['--check'];
      const res = spawnSync(process.execPath, args, { input: code, encoding: 'utf8' });
      if (res.status !== 0) {
        failures.push(`${rel(file)} (<script> #${idx}): ${res.stderr.trim()}`);
      }
    }
  }
  console.log(`[html] Checked ${scriptCount} inline <script> block(s) across ${htmlFiles.length} HTML files -> ${failures.length} failure(s)`);
  if (failures.length) {
    throw new Error(`HTML inline script errors:\n${failures.join('\n')}`);
  }
  return scriptCount;
}

function checkKahootCsvs() {
  const csvFiles = ALL_FILES.filter((f) => /-kahoot\.csv$/.test(f));
  const validTimes = new Set(['5', '10', '20', '30', '60', '90', '120', '240']);
  const validAnswers = new Set(['1', '2', '3', '4']);
  const expectedHeader = 'Question,Answer 1,Answer 2,Answer 3,Answer 4,Time limit,Correct answer';
  const failures = [];
  let totalQuestions = 0;

  if (csvFiles.length !== 40) {
    failures.push(`Expected 40 Kahoot CSV files across 20 units, found ${csvFiles.length}`);
  }

  for (const file of csvFiles) {
    const rows = parseCsv(fs.readFileSync(file, 'utf8'));
    if (rows.length < 2) {
      failures.push(`${rel(file)}: missing rows`);
      continue;
    }
    const header = rows[0].join(',');
    if (header !== expectedHeader) {
      failures.push(`${rel(file)}: invalid header '${header}'`);
    }
    if (rows.length - 1 < 10) {
      failures.push(`${rel(file)}: expected >= 10 questions, got ${rows.length - 1}`);
    }
    for (let i = 1; i < rows.length; i++) {
      totalQuestions++;
      const cols = rows[i];
      if (cols.length !== 7) {
        failures.push(`${rel(file)} row ${i + 1}: expected 7 columns, got ${cols.length}`);
        continue;
      }
      const [q, a1, a2, a3, a4, time, ans] = cols;
      if (!q || q.length > 120) failures.push(`${rel(file)} row ${i + 1}: question length ${q.length} > 120`);
      for (const [idx, choice] of [a1, a2, a3, a4].entries()) {
        if (!choice || choice.length > 75) {
          failures.push(`${rel(file)} row ${i + 1}: answer ${idx + 1} length ${choice.length} invalid`);
        }
      }
      if (!validTimes.has(time)) failures.push(`${rel(file)} row ${i + 1}: invalid time '${time}'`);
      if (!validAnswers.has(ans)) failures.push(`${rel(file)} row ${i + 1}: invalid answer '${ans}'`);
    }
  }
  console.log(`[kahoot] Validated ${csvFiles.length} CSV files (${totalQuestions} questions) -> ${failures.length} failure(s)`);
  if (failures.length) {
    throw new Error(`Kahoot CSV errors:\n${failures.join('\n')}`);
  }
}

function checkSmartGoals() {
  const unitDirs = fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^(0[1-9]|1[0-9]|20)-/.test(d.name))
    .map((d) => d.name)
    .sort();

  const failures = [];
  if (unitDirs.length !== 20) {
    failures.push(`Expected 20 unit directories (01–20), found ${unitDirs.length}`);
  }

  for (const unit of unitDirs) {
    const guidePath = path.join(ROOT, unit, 'unit-guide.md');
    if (!fs.existsSync(guidePath)) {
      failures.push(`${unit}/unit-guide.md missing`);
      continue;
    }
    const content = fs.readFileSync(guidePath, 'utf8');
    // Split into Student section and Teacher section
    const teacherIdx = content.search(/###?\s+.*Teacher SMART Goals/i);
    const studentIdx = content.search(/###?\s+.*Student SMART Goals/i);
    if (studentIdx === -1 || teacherIdx === -1 || teacherIdx <= studentIdx) {
      failures.push(`${unit}/unit-guide.md missing Student/Teacher SMART Goals sections`);
      continue;
    }
    const studentSection = content.slice(studentIdx, teacherIdx);
    const restAfterTeacher = content.slice(teacherIdx);
    const nextH2 = restAfterTeacher.slice(3).search(/\n##\s+/);
    const teacherSection = nextH2 === -1 ? restAfterTeacher : restAfterTeacher.slice(0, nextH2 + 3);

    const studentBoxes = (studentSection.match(/^\s*-\s+\[[ xX]\]/gm) || []).length;
    const teacherBoxes = (teacherSection.match(/^\s*-\s+\[[ xX]\]/gm) || []).length;
    if (studentBoxes < 5) failures.push(`${unit}/unit-guide.md has only ${studentBoxes} Student SMART checkboxes (< 5)`);
    if (teacherBoxes < 5) failures.push(`${unit}/unit-guide.md has only ${teacherBoxes} Teacher SMART checkboxes (< 5)`);
  }

  const lessonFiles = ALL_FILES.filter((f) => /\/(student-lesson|lesson-plan)\.md$/.test(rel(f)));
  for (const file of lessonFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const boxes = (content.match(/^\s*-\s+\[[ xX]\]/gm) || []).length;
    if (boxes < 1) {
      failures.push(`${rel(file)} missing trackable SMART checkboxes (- [ ])`);
    }
  }

  console.log(`[smart] Verified ${unitDirs.length} unit guides (>=5 Student & >=5 Teacher SMART goals each) + ${lessonFiles.length} lesson docs -> ${failures.length} failure(s)`);
  if (failures.length) {
    throw new Error(`SMART Goal validation errors:\n${failures.join('\n')}`);
  }
}

function checkLinksAndDrafts() {
  const mdFiles = ALL_FILES.filter((f) => f.endsWith('.md'));
  const draftCheckFiles = ALL_FILES.filter((f) => /\.(md|js|mjs|cjs|html|ts|json|yml)$/.test(f) && rel(f) !== 'tools/verify.mjs');
  const draftHits = [];
  for (const file of draftCheckFiles) {
    const text = fs.readFileSync(file, 'utf8');
    if (/00-Drafts/.test(text)) {
      draftHits.push(rel(file));
    }
  }

  const brokenLinks = [];
  let linkCount = 0;

  for (const file of mdFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const dir = path.dirname(file);
    const lines = raw.split(/\r?\n/);
    let inFence = false;
    for (let ln = 0; ln < lines.length; ln++) {
      const line = lines[ln];
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;

      // Strip inline code spans so template literals or regex backticks aren't parsed as links
      const stripped = line.replace(/`[^`]*`/g, '');
      const mdLinkRe = /!?\[[^\]]*\]\(([^)]+)\)/g;
      let m;
      while ((m = mdLinkRe.exec(stripped)) !== null) {
        let target = m[1].trim().split(/\s+/)[0];
        if (!target || /^(https?:|mailto:|data:|#|file:)/i.test(target)) continue;
        target = target.split('#')[0];
        if (!target) continue;
        linkCount++;
        const resolved = path.resolve(dir, decodeURIComponent(target));
        if (!fs.existsSync(resolved)) {
          brokenLinks.push(`${rel(file)}:${ln + 1} -> ${target}`);
        }
      }

      const imgRe = /<img\b[^>]*?\bsrc=["']([^"']+)["']/gi;
      while ((m = imgRe.exec(stripped)) !== null) {
        const target = m[1].trim();
        if (!target || /^(https?:|data:|#|\/|file:)/i.test(target)) continue;
        linkCount++;
        const resolved = path.resolve(dir, decodeURIComponent(target));
        if (!fs.existsSync(resolved)) {
          brokenLinks.push(`${rel(file)}:${ln + 1} <img src> -> ${target}`);
        }
      }
    }
  }

  console.log(`[links] Checked ${linkCount} relative links across ${mdFiles.length} markdown files -> ${brokenLinks.length} broken, ${draftHits.length} 00-Drafts ref(s)`);
  if (draftHits.length) {
    throw new Error(`Remaining 00-Drafts references:\n${draftHits.join('\n')}`);
  }
  if (brokenLinks.length) {
    throw new Error(`Broken relative links:\n${brokenLinks.slice(0, 40).join('\n')}`);
  }
}

function checkSpoilers() {
  const studentDocs = ALL_FILES.filter((f) => {
    const r = rel(f);
    return (
      r.endsWith('/student-lesson.md') ||
      r.endsWith('/pre-lesson-eval.md') ||
      r.endsWith('/post-lesson-eval.md') ||
      r.endsWith('/pre-unit-eval.md') ||
      r.endsWith('/post-unit-eval.md') ||
      r.endsWith('/unit-project.md')
    );
  });

  const hits = [];
  for (const file of studentDocs) {
    const text = fs.readFileSync(file, 'utf8');
    if (/^\s*#{1,4}\s*.*(Answer Key|Instructor Solution|Teacher Key)/im.test(text) || /\*\*Correct Answer:\*\*/i.test(text)) {
      hits.push(rel(file));
    }
  }
  console.log(`[spoilers] Audited ${studentDocs.length} student assessment/worksheet files -> ${hits.length} spoiler warning(s)`);
  if (hits.length) {
    throw new Error(`Possible answer spoiler headings in student files:\n${hits.join('\n')}`);
  }
}

const args = new Set(process.argv.slice(2));
const runFull = args.has('--full') || args.size === 0;
const runTestsOnly = args.has('--tests');

checkSyntax();
runInstructorTests();

if (runFull && !runTestsOnly) {
  checkHtmlScripts();
  checkKahootCsvs();
  checkSmartGoals();
  checkLinksAndDrafts();
  checkSpoilers();
  console.log('\nALL VERIFICATION CHECKS PASSED CLEANLY!');
}
