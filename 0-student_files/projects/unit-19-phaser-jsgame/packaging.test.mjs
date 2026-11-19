/**
 * Unit 19 Project Starter Tests
 * Run: node --test 0-student_files/projects/unit-19-phaser-jsgame/packaging.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getInput, stepArcadeBody, auditPackageForHandheld } from './src/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('TODO: Unit 19 project starter files & helper signatures exist', () => {
  assert.equal(fs.existsSync(path.join(__dirname, 'arcade-quest.jsg')), true);
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  assert.equal(pkg.type, 'module');
  assert.equal(typeof getInput, 'function');
  assert.equal(typeof stepArcadeBody, 'function');
  assert.equal(typeof auditPackageForHandheld, 'function');
});
