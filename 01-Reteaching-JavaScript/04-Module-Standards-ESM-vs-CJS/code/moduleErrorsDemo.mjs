/**
 * Lesson 1.4 Teacher Reference Demo:
 * Module Standards (ESM vs. CommonJS) & 6 Real Import/Require Error Diagnostics
 * AZ CTE Standards: 11.2, 11.7, 13.1, 18.2
 *
 * Run demo:  node 01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/code/moduleErrorsDemo.mjs
 * Run tests: node --test 01-Reteaching-JavaScript/04-Module-Standards-ESM-vs-CJS/code/moduleErrorsDemo.test.mjs
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function runNodeScript(cwd, args) {
  const result = spawnSync(process.execPath, args, {
    cwd,
    encoding: 'utf8',
    timeout: 10000,
  });
  return {
    status: result.status,
    stdout: (result.stdout ?? '').trim(),
    stderr: (result.stderr ?? '').trim(),
  };
}

/**
 * Runs a single isolated scenario inside a fresh os.tmpdir() workspace and
 * deletes the temporary directory in a finally block so zero artifacts linger.
 */
export function runIsolatedScenario(name, setupFn, runBrokenArgs, runFixedArgs, fixFn) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `jsfirst-mod-${name}-`));
  try {
    setupFn(tmpDir);
    const broken = runNodeScript(tmpDir, runBrokenArgs);
    fixFn(tmpDir);
    const fixed = runNodeScript(tmpDir, runFixedArgs);
    return { name, tmpDirCleaned: true, broken, fixed };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

export function runAllModuleDiagnostics() {
  const results = [];

  // 1. SyntaxError: Cannot use import statement outside a module
  results.push(
    runIsolatedScenario(
      '1-import-outside-module',
      (dir) => {
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 'cjs-pkg', type: 'commonjs' }, null, 2));
        fs.writeFileSync(path.join(dir, 'math.js'), 'export const add = (a, b) => a + b;\n');
        fs.writeFileSync(path.join(dir, 'index.js'), "import { add } from './math.js';\nconsole.log('sum:', add(2, 3));\n");
      },
      ['index.js'],
      ['index.js'],
      (dir) => {
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 'esm-pkg', type: 'module' }, null, 2));
      }
    )
  );

  // 2. ReferenceError: require is not defined in ES module scope
  results.push(
    runIsolatedScenario(
      '2-require-in-esm',
      (dir) => {
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 'esm-pkg', type: 'module' }, null, 2));
        fs.writeFileSync(path.join(dir, 'legacy.cjs'), "module.exports = { tag: 'CJS-HELPER' };\n");
        fs.writeFileSync(path.join(dir, 'app.mjs'), "const helper = require('./legacy.cjs');\nconsole.log(helper.tag);\n");
      },
      ['app.mjs'],
      ['app.mjs'],
      (dir) => {
        fs.writeFileSync(
          path.join(dir, 'app.mjs'),
          "import { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);\nconst helper = require('./legacy.cjs');\nconsole.log('fixed:', helper.tag);\n"
        );
      }
    )
  );

  // 3. Error [ERR_MODULE_NOT_FOUND] due to omitted extension in ESM relative import
  results.push(
    runIsolatedScenario(
      '3-missing-extension',
      (dir) => {
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ type: 'module' }, null, 2));
        fs.writeFileSync(path.join(dir, 'greeter.mjs'), "export const greet = (n) => `Hello, ${n}`;\n");
        fs.writeFileSync(path.join(dir, 'main.mjs'), "import { greet } from './greeter';\nconsole.log(greet('Ada'));\n");
      },
      ['main.mjs'],
      ['main.mjs'],
      (dir) => {
        fs.writeFileSync(path.join(dir, 'main.mjs'), "import { greet } from './greeter.mjs';\nconsole.log(greet('Ada'));\n");
      }
    )
  );

  // 4. TypeError [ERR_UNKNOWN_FILE_EXTENSION] importing unsupported file extension
  results.push(
    runIsolatedScenario(
      '4-unknown-file-extension',
      (dir) => {
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ type: 'module' }, null, 2));
        fs.writeFileSync(path.join(dir, 'config.data'), 'export const port = 3000;\n');
        fs.writeFileSync(path.join(dir, 'server.mjs'), "import { port } from './config.data';\nconsole.log(port);\n");
      },
      ['server.mjs'],
      ['server.mjs'],
      (dir) => {
        fs.writeFileSync(path.join(dir, 'config.mjs'), 'export const port = 3000;\n');
        fs.writeFileSync(path.join(dir, 'server.mjs'), "import { port } from './config.mjs';\nconsole.log('port:', port);\n");
      }
    )
  );

  // 5. SyntaxError: The requested module ... does not provide an export named ... (default vs named mismatch)
  results.push(
    runIsolatedScenario(
      '5-default-vs-named-mismatch',
      (dir) => {
        fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ type: 'module' }, null, 2));
        fs.writeFileSync(path.join(dir, 'formatter.mjs'), "export default function formatBadge(name) { return `[${name}]`; }\n");
        fs.writeFileSync(path.join(dir, 'caller.mjs'), "import { formatBadge } from './formatter.mjs';\nconsole.log(formatBadge('ESM'));\n");
      },
      ['caller.mjs'],
      ['caller.mjs'],
      (dir) => {
        // Align both default import and an explicit named export cleanly
        fs.writeFileSync(
          path.join(dir, 'formatter.mjs'),
          "export function formatBadge(name) { return `[${name}]`; }\nexport default formatBadge;\n"
        );
        fs.writeFileSync(
          path.join(dir, 'caller.mjs'),
          "import defaultBadge, { formatBadge } from './formatter.mjs';\nconsole.log(defaultBadge('DEF'), formatBadge('NAMED'));\n"
        );
      }
    )
  );

  // 6. CJS <-> ESM Bridging (require() on async ESM throws ERR_REQUIRE_ASYNC_MODULE; fix with dynamic import() + createRequire + import.meta.url)
  results.push(
    runIsolatedScenario(
      '6-cjs-esm-bridging',
      (dir) => {
        fs.writeFileSync(path.join(dir, 'asyncConfig.mjs'), "await Promise.resolve();\nexport const mode = 'async-esm-ready';\n");
        fs.writeFileSync(path.join(dir, 'legacyRunner.cjs'), "const cfg = require('./asyncConfig.mjs');\nconsole.log(cfg.mode);\n");
        fs.writeFileSync(path.join(dir, 'cjsMath.cjs'), 'exports.double = (n) => n * 2;\n');
        fs.writeFileSync(
          path.join(dir, 'esmBridge.mjs'),
          "import { createRequire } from 'node:module';\nimport path from 'node:path';\nimport { fileURLToPath } from 'node:url';\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);\nconst require = createRequire(import.meta.url);\nconst { double } = require('./cjsMath.cjs');\nconsole.log(path.basename(__dirname).length > 0, double(21));\n"
        );
      },
      ['legacyRunner.cjs'],
      ['legacyRunner.cjs'],
      (dir) => {
        // Fix 1: CJS safely bridges async ESM via dynamic import()
        fs.writeFileSync(
          path.join(dir, 'legacyRunner.cjs'),
          "(async () => {\n  const { mode } = await import('./asyncConfig.mjs');\n  console.log('cjs-bridged:', mode);\n})();\n"
        );
      }
    )
  );

  return results;
}

/**
 * Demonstrates live bindings in ESM vs static snapshot copies in CommonJS,
 * plus ESM -> CJS bridging using createRequire(import.meta.url) and __dirname derivation.
 */
export function runBridgingAndBindingComparison() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsfirst-binding-'));
  try {
    fs.writeFileSync(
      path.join(tmpDir, 'counter.mjs'),
      'export let count = 0;\nexport function increment() { count += 1; }\n'
    );
    fs.writeFileSync(
      path.join(tmpDir, 'esmCheck.mjs'),
      "import { count, increment } from './counter.mjs';\nconst before = count;\nincrement();\nconsole.log(JSON.stringify({ before, after: count }));\n"
    );

    fs.writeFileSync(
      path.join(tmpDir, 'counter.cjs'),
      'let count = 0;\nmodule.exports = { count, increment() { count += 1; } };\n'
    );
    fs.writeFileSync(
      path.join(tmpDir, 'cjsCheck.cjs'),
      "const { count, increment } = require('./counter.cjs');\nincrement();\nconsole.log(JSON.stringify({ destructuredCopy: count }));\n"
    );

    fs.writeFileSync(
      path.join(tmpDir, 'esmToCjs.mjs'),
      "import { createRequire } from 'node:module';\nimport { fileURLToPath } from 'node:url';\nimport path from 'node:path';\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);\nconst require = createRequire(import.meta.url);\nconst cjs = require('./counter.cjs');\ncjs.increment();\nconsole.log(JSON.stringify({ hasDir: __dirname.length > 0, hasFile: path.basename(__filename) === 'esmToCjs.mjs', copyVal: cjs.count }));\n"
    );

    const esmLive = JSON.parse(runNodeScript(tmpDir, ['esmCheck.mjs']).stdout);
    const cjsCopy = JSON.parse(runNodeScript(tmpDir, ['cjsCheck.cjs']).stdout);
    const esmToCjs = JSON.parse(runNodeScript(tmpDir, ['esmToCjs.mjs']).stdout);
    return { esmLive, cjsCopy, esmToCjs };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  console.log('=== Lesson 1.4: 6 Real Module Error & Fix Diagnostics ===\n');
  for (const item of runAllModuleDiagnostics()) {
    const firstErrLine = item.broken.stderr.split('\n').find((l) => /Error|ERR_/.test(l)) ?? item.broken.stderr.split('\n')[0];
    console.log(`[${item.name}]`);
    console.log(`  Broken exit=${item.broken.status}: ${firstErrLine}`);
    console.log(`  Fixed  exit=${item.fixed.status}: ${item.fixed.stdout}`);
  }
  console.log('\n=== Live ESM Binding vs. CJS Copy + Bridge Check ===');
  console.log(runBridgingAndBindingComparison());
}
