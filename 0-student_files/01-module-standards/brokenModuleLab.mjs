/**
 * Student Lesson 1.4 Bug-Hunt Lab: Module Standards & Import Diagnostics
 * AZ CTE Standards: 11.2, 11.7, 13.1, 18.2
 *
 * Run:
 *   node 0-student_files/01-module-standards/brokenModuleLab.mjs
 *
 * Instructions:
 * This ESM lab currently fails with multiple intentional module errors.
 * Keep "type": "module" in package.json and keep helper.cjs as CommonJS!
 * Diagnose and fix every error one by one until the script exits 0.
 */

import path from 'node:path';

// BUG 1 & BUG 2 [L4 Analyze]:
// Notice BOTH the missing relative extension AND named vs. default export mismatch with helper.cjs.
import { formatModuleBadge } from './helper';

// BUG 3 [L3 Apply]:
// Calling CommonJS require() directly inside an ES Module throws ReferenceError.
// Hint: Bridge helper.cjs cleanly using node:module's createRequire(import.meta.url) (or default ESM import).
const legacyHelper = require('./helper.cjs');

// BUG 4 [L3 Apply]:
// __dirname does not exist in ESM scope. Derive the current directory from import.meta.url.
const labDirectory = __dirname;

const reportLine = formatModuleBadge('Lesson 1.4', 'PASSED');
const pkgPath = path.join(labDirectory, 'package.json');

console.log(reportLine);
console.log('Legacy helper tag:', legacyHelper.CJS_TAG ?? 'verified');
console.log('Resolved package.json path:', pkgPath);
