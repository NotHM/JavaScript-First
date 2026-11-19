#!/usr/bin/env node
/**
 * JavaScript First — Automated Test-Driven Grading Harness (node:test)
 *
 * Runs active RED -> GREEN student lab & unit capstone test suites inside
 * 0-student_files/ and reports per-unit completion, points, and next TODOs.
 *
 * Usage:
 *   node tools/grade.mjs                 # Grade all 20 units (report summary)
 *   node tools/grade.mjs --unit 01       # Grade Unit 01 only
 *   node tools/grade.mjs --unit 01 12    # Grade multiple specific units
 *   node tools/grade.mjs --strict        # Exit 1 unless 100% of selected tests pass
 *   node tools/grade.mjs --json          # Emit machine-readable JSON grade report
 *   node tools/grade.mjs --list          # List registered units and test suites
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

export const UNITS_MANIFEST = [
  {
    unit: '01',
    title: 'Dev Env, Legal/Ethics, Types, Modules & Linux Safety',
    year: 1,
    semester: 'CO101',
    standards: ['2.0', '3.0', '11.0', '13.1', '18.2', 'ITS 101–102'],
    points: 100,
    labs: [
      '0-student_files/01-legal-ethics/licenseAudit.test.js',
      '0-student_files/01-terminal-and-node/cliFormatter.test.js',
      '0-student_files/02-logging-datatypes/datatypes.test.js',
      '0-student_files/01-module-standards/brokenModuleLab.test.mjs',
      '0-student_files/01-linux-admin-safety/posixAuditLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-01-license-cli-auditor/index.test.js',
  },
  {
    unit: '02',
    title: 'Protocols, HTTP, Express SSR & Subnetting/OSI',
    year: 1,
    semester: 'CO102',
    standards: ['8.0', '11.3–11.7', 'ITS 102 / CCNA'],
    points: 100,
    labs: [
      '0-student_files/03-http-server/httpAndProtocolLab.test.js',
      '0-student_files/02-subnetting-routing/subnetCalculatorLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-02-http-router/index.test.js',
  },
  {
    unit: '03',
    title: 'Client-Side AJAX, Fetch & Containers',
    year: 1,
    semester: 'CO102',
    standards: ['9.0'],
    points: 100,
    labs: [
      '0-student_files/04-ajax/ajaxClientLab.test.js',
    ],
    project: '0-student_files/projects/unit-03-api-dashboard/index.test.js',
  },
  {
    unit: '04',
    title: 'Variables, Scope, Hoisting & Immutability',
    year: 1,
    semester: 'CO101',
    standards: ['3.3', '3.6', '18.2'],
    points: 100,
    labs: [
      '0-student_files/05-variables-scope/immutability.test.js',
    ],
    project: '0-student_files/projects/unit-04-immutable-state-store/index.test.js',
  },
  {
    unit: '05',
    title: 'Loops, Arrays, Matrices, Structures & AI Feature Vectors',
    year: 1,
    semester: 'CO101',
    standards: ['6.0', '7.0', 'AI101–AI201'],
    points: 100,
    labs: [
      '0-student_files/06-data-structures/loopsAndStructures.test.js',
      '0-student_files/05-ai-data-pipeline/dataPipelineLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-05-matrix-gradebook/index.test.js',
  },
  {
    unit: '06',
    title: 'Conditionals, Boolean Logic & Closures',
    year: 1,
    semester: 'CO101',
    standards: ['5.0', '11.10–11.12'],
    points: 100,
    labs: [
      '0-student_files/07-functions/functionsAndLogic.test.js',
    ],
    project: '0-student_files/projects/unit-06-rules-engine/index.test.js',
  },
  {
    unit: '07',
    title: 'Async JS, Queues & Drone RF Telemetry Fail-Safes',
    year: 2,
    semester: 'CO201',
    standards: ['18.0', 'DT101–DT102'],
    points: 100,
    labs: [
      '0-student_files/08-async-js/asyncLab.test.js',
      '0-student_files/07-drone-telemetry/telemetryWatchdogLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-07-resilient-pipeline/index.test.js',
  },
  {
    unit: '08',
    title: 'OOP, Classes, XML/JSON Adapter & SOLID Patterns',
    year: 2,
    semester: 'CO201',
    standards: ['17.0'],
    points: 100,
    labs: [
      '0-student_files/09-oop-patterns/oopAndPatterns.test.js',
    ],
    project: '0-student_files/projects/unit-08-oop-plugin-system/index.test.js',
  },
  {
    unit: '09',
    title: 'Testing, Debugging, Algorithms & ML Fairness Audits',
    year: 1,
    semester: 'CO102',
    standards: ['12.0', '6.4–6.7', 'AI101–AI201'],
    points: 100,
    labs: [
      '0-student_files/10-debugging-tdd/algorithms.test.js',
      '0-student_files/10-debugging-tdd/debuggingLab.test.js',
      '0-student_files/10-debugging-tdd/sortSearchLab.test.js',
      '0-student_files/09-ml-fairness/mlMetricsAndFairnessLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-09-algo-test-suite/index.test.js',
  },
  {
    unit: '10',
    title: 'UCD, Accessibility, Canvas, DOM & Computer Vision',
    year: 1,
    semester: 'CO102',
    standards: ['15.0', 'AI101–AI201'],
    points: 100,
    labs: [
      '0-student_files/11-html-css-dom/uiA11yCanvasLab.test.js',
      '0-student_files/10-computer-vision/cvKernelAndIouLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-10-accessible-canvas-app/index.test.js',
  },
  {
    unit: '11',
    title: 'Web Security, Cryptography, Zero Trust & SIEM',
    year: 2,
    semester: 'CO201',
    standards: ['1.0', 'ITS 201–202 / Sec+'],
    points: 100,
    labs: [
      '0-student_files/12-security-server/securityCryptoLab.test.js',
      '0-student_files/11-zero-trust-siem/firewallSiemLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-11-security-hardening-audit/index.test.js',
  },
  {
    unit: '12',
    title: 'Computer Math, Binary, Bitwise & Drone Flight Physics',
    year: 1,
    semester: 'CO101',
    standards: ['4.0', 'DT101'],
    points: 100,
    labs: [
      '0-student_files/12-computer-math/computerMathLab.test.js',
      '0-student_files/12-drone-flight-math/dronePhysicsLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-12-bitwise-permission-calc/index.test.js',
  },
  {
    unit: '13',
    title: 'Git Version Control, CI/CD & npm Ecosystem',
    year: 1,
    semester: 'CO102',
    standards: ['13.0', '14.0'],
    points: 100,
    labs: [
      '0-student_files/13-vcs-community/vcsAndPkgLab.test.js',
    ],
    project: '0-student_files/projects/unit-13-oss-toolkit/index.test.js',
  },
  {
    unit: '14',
    title: 'Program Analysis, SDLC & System Architecture',
    year: 1,
    semester: 'CO102',
    standards: ['10.0'],
    points: 100,
    labs: [
      '0-student_files/14-program-design/systemDesignLab.test.js',
    ],
    project: '0-student_files/projects/unit-14-system-spec/index.test.js',
  },
  {
    unit: '15',
    title: 'Storage Architecture, Atomic File I/O & Databases',
    year: 2,
    semester: 'CO201',
    standards: ['16.0'],
    points: 100,
    labs: [
      '0-student_files/15-storage-crud/storageAndCrudLab.test.js',
    ],
    project: '0-student_files/projects/unit-15-inventory-crud-db/index.test.js',
  },
  {
    unit: '16',
    title: 'Software Business, Agile Delivery & SaaS Economics',
    year: 2,
    semester: 'CO202',
    standards: ['19.0'],
    points: 100,
    labs: [
      '0-student_files/16-business-capstone/appLaunchPlanner.test.js',
    ],
    project: '0-student_files/projects/unit-16-semester-capstone/index.test.js',
  },
  {
    unit: '17',
    title: 'Deno Security Sandbox & WebAssembly (WASM)',
    year: 2,
    semester: 'CO201',
    standards: ['1.3–1.4', '4.0', '11.6–11.8', '13.1'],
    points: 100,
    labs: [
      '0-student_files/17-deno-wasm/permissionPolicyLab.test.mjs',
      '0-student_files/17-deno-wasm/wasmMemoryLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-17-deno-wasm-audit/index.test.mjs',
  },
  {
    unit: '18',
    title: 'Full-Stack Dual-Database REST: Bun SQLite & MongoDB',
    year: 2,
    semester: 'CO201',
    standards: ['8.3', '11.6–11.8', '16.3–16.6', '17.1–17.13'],
    points: 100,
    labs: [
      '0-student_files/18-dual-db-rest/sqliteCrudLab.test.mjs',
      '0-student_files/18-dual-db-rest/mongoResponderLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-18-dual-db-rest/index.test.mjs',
  },
  {
    unit: '19',
    title: 'Game Dev with Phaser 3, jsgamelauncher & Part 107 Drone Sim',
    year: 2,
    semester: 'CO202',
    standards: ['1.5', '4.3', '9.2', '15.5', '17.3', '19.8', 'DT102'],
    points: 100,
    labs: [
      '0-student_files/19-game-dev/gameLoopLab.test.mjs',
      '0-student_files/19-drone-part107-sim/part107AndMetarLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-19-phaser-jsgame/packaging.test.mjs',
  },
  {
    unit: '20',
    title: 'Final Capstone: Local Multimodal AI, NLP/Agentic & 3D Print',
    year: 2,
    semester: 'CO202',
    standards: ['1.0–19.0', 'AI101–AI202'],
    points: 100,
    labs: [
      '0-student_files/20-local-ai-3d/ragAndStreamLab.test.mjs',
      '0-student_files/20-local-ai-3d/multimodalAndCadLab.test.mjs',
      '0-student_files/20-agentic-nlp-governance/nlpAgenticLab.test.mjs',
    ],
    project: '0-student_files/projects/unit-20-local-ai-3d-capstone/capstone.test.mjs',
  },
];

function parseTapOutput(stdout, stderr, status) {
  const combined = `${stdout || ''}\n${stderr || ''}`;
  const testsMatch = combined.match(/^# tests (\d+)/m);
  const passMatch = combined.match(/^# pass (\d+)/m);
  const failMatch = combined.match(/^# fail (\d+)/m);

  const failingTests = [];
  for (const line of combined.split(/\r?\n/)) {
    const failLine = line.match(/^not ok \d+ - (.+)$/);
    if (failLine) {
      failingTests.push(failLine[1].trim());
    }
  }

  if (testsMatch && passMatch && failMatch) {
    const total = Number(testsMatch[1]);
    const passed = Number(passMatch[1]);
    const failed = Number(failMatch[1]);
    return { total, passed, failed, failingTests, crashed: false };
  }

  const okCount = (combined.match(/^ok \d+ - /gm) || []).length;
  const notOkCount = (combined.match(/^not ok \d+ - /gm) || []).length;
  if (okCount + notOkCount > 0) {
    return {
      total: okCount + notOkCount,
      passed: okCount,
      failed: notOkCount,
      failingTests,
      crashed: status !== 0 && notOkCount === 0,
    };
  }

  return {
    total: 1,
    passed: status === 0 ? 1 : 0,
    failed: status === 0 ? 0 : 1,
    failingTests: status === 0 ? [] : ['Suite failed or timed out before reporting TAP subtests'],
    crashed: status !== 0,
  };
}

function runSuite(relPath) {
  const absPath = path.join(ROOT, relPath);
  if (!fs.existsSync(absPath)) {
    return {
      file: relPath,
      missing: true,
      total: 1,
      passed: 0,
      failed: 1,
      failingTests: [`Missing test suite: ${relPath}`],
    };
  }

  const res = spawnSync(process.execPath, ['--test', '--test-reporter=tap', absPath], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: 15000,
    env: { ...process.env, NODE_NO_WARNINGS: '1' },
  });

  const parsed = parseTapOutput(res.stdout, res.stderr, res.status);
  return {
    file: relPath,
    missing: false,
    timedOut: res.error?.code === 'ETIMEDOUT',
    ...parsed,
  };
}

function gradeUnit(entry) {
  const labResults = entry.labs.map(runSuite);
  const projectResult = runSuite(entry.project);
  const all = [...labResults, projectResult];

  const totalTests = all.reduce((s, r) => s + r.total, 0);
  const passedTests = all.reduce((s, r) => s + r.passed, 0);
  const failedTests = all.reduce((s, r) => s + r.failed, 0);
  const pct = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  const earnedPoints = totalTests > 0 ? Math.round((passedTests / totalTests) * entry.points) : 0;

  const firstFailureSuite = all.find((r) => r.failed > 0);
  const nextTodo = firstFailureSuite
    ? `${path.basename(firstFailureSuite.file)}: ${firstFailureSuite.failingTests[0] ?? 'Complete TODOs'}`
    : 'GREEN (Ready for 50-Q Mastery Exam)';

  return {
    unit: entry.unit,
    title: entry.title,
    year: entry.year,
    semester: entry.semester,
    standards: entry.standards,
    points: entry.points,
    earnedPoints,
    totalTests,
    passedTests,
    failedTests,
    percent: pct,
    status: failedTests === 0 ? 'GREEN' : passedTests > 0 ? 'YELLOW' : 'RED',
    nextTodo,
    labs: labResults,
    project: projectResult,
  };
}

function parseArgs(argv) {
  const opts = { units: [], strict: false, json: false, list: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--strict') opts.strict = true;
    else if (arg === '--json') opts.json = true;
    else if (arg === '--list') opts.list = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg === '--unit' || arg === '-u') {
      while (argv[i + 1] && !argv[i + 1].startsWith('-')) {
        opts.units.push(argv[++i].padStart(2, '0'));
      }
    } else if (/^\d{1,2}$/.test(arg)) {
      opts.units.push(arg.padStart(2, '0'));
    }
  }
  return opts;
}

function formatTable(results, summary) {
  const useColor = process.stdout.isTTY;
  const c = useColor
    ? { reset: '\x1b[0m', bold: '\x1b[1m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', dim: '\x1b[2m' }
    : { reset: '', bold: '', red: '', green: '', yellow: '', cyan: '', dim: '' };

  console.log(`\n${c.bold}${c.cyan}JavaScript First — Automated TDD Gradebook (node:test)${c.reset}`);
  console.log(`${c.dim}Mode: Red -> Green Verification across 0-student_files/ (Labs + Capstone Projects)${c.reset}\n`);
  console.log('Unit | Sem   | Labs  | Proj  | Passed       | Score   | Status | Next Action / Hint');
  console.log('-----+-------+-------+-------+--------------+---------+--------+-------------------------------------------');

  for (const r of results) {
    const labPassed = r.labs.reduce((s, l) => s + l.passed, 0);
    const labTotal = r.labs.reduce((s, l) => s + l.total, 0);
    const labCol = `${labPassed}/${labTotal}`.padEnd(5);
    const projCol = `${r.project.passed}/${r.project.total}`.padEnd(5);
    const passCol = `${String(r.passedTests).padStart(2)}/${String(r.totalTests).padEnd(2)} (${String(r.percent).padStart(3)}%)`.padEnd(12);
    const scoreCol = `${String(r.earnedPoints).padStart(3)}/${r.points}`.padEnd(7);
    const stateColor = r.status === 'GREEN' ? c.green : r.status === 'YELLOW' ? c.yellow : c.red;
    const statusCol = `${stateColor}${r.status.padEnd(6)}${c.reset}`;
    const hint = r.nextTodo.length > 44 ? `${r.nextTodo.slice(0, 41)}...` : r.nextTodo;
    console.log(` ${r.unit}  | ${r.semester} | ${labCol} | ${projCol} | ${passCol} | ${scoreCol} | ${statusCol} | ${hint}`);
  }

  console.log('-----+-------+-------+-------+--------------+---------+--------+-------------------------------------------');
  console.log(
    `${c.bold}TOTAL${c.reset}: ${summary.passedTests}/${summary.totalTests} tests passing (${summary.percent}%) ` +
      `| ${summary.earnedPoints}/${summary.totalPoints} pts ` +
      `| ${summary.greenUnits}/${results.length} units GREEN\n`
  );
  console.log(`${c.dim}Tip: Run a single test directly for line-by-line diffs: node --test <path-to-file.test.js>${c.reset}`);
  console.log(`${c.dim}     Filter one unit: npm run grade -- --unit 01   | Strict CI mode: npm run grade:strict${c.reset}\n`);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log('Usage: node tools/grade.mjs [--unit 01 [12 ...]] [--strict] [--json] [--list]');
    process.exit(0);
  }

  const selected = opts.units.length
    ? UNITS_MANIFEST.filter((u) => opts.units.includes(u.unit))
    : UNITS_MANIFEST;

  if (selected.length === 0) {
    console.error(`No matching units found for filter: ${opts.units.join(', ')}`);
    process.exit(1);
  }

  if (opts.list) {
    for (const u of selected) {
      console.log(`Unit ${u.unit} (${u.semester}): ${u.title}`);
      for (const l of u.labs) console.log(`  [lab]     ${l}`);
      console.log(`  [project] ${u.project}`);
    }
    process.exit(0);
  }

  const results = selected.map(gradeUnit);
  const totalTests = results.reduce((s, r) => s + r.totalTests, 0);
  const passedTests = results.reduce((s, r) => s + r.passedTests, 0);
  const totalPoints = results.reduce((s, r) => s + r.points, 0);
  const earnedPoints = results.reduce((s, r) => s + r.earnedPoints, 0);
  const greenUnits = results.filter((r) => r.status === 'GREEN').length;
  const percent = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  const summary = {
    unitsGraded: results.length,
    greenUnits,
    totalTests,
    passedTests,
    failedTests: totalTests - passedTests,
    percent,
    earnedPoints,
    totalPoints,
  };

  if (opts.json) {
    console.log(JSON.stringify({ summary, units: results }, null, 2));
  } else {
    formatTable(results, summary);
  }

  if (opts.strict && summary.failedTests > 0) {
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
