/**
 * Unit 20 Capstone Starter Tests
 * Run: node --test 0-student_files/projects/unit-20-local-ai-3d-capstone/capstone.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createCapstoneServer } from './server.mjs';
import { generateMeshFromCadSpec, exportAsciiStl, exportBinaryStl, validateMeshForPrint } from './cadEngine.mjs';

test('TODO: Unit 20 capstone starter exports core & double-bonus hooks', () => {
  assert.equal(typeof createCapstoneServer, 'function');
  assert.equal(typeof generateMeshFromCadSpec, 'function');
  assert.equal(typeof exportAsciiStl, 'function');
  assert.equal(typeof exportBinaryStl, 'function');
  assert.equal(typeof validateMeshForPrint, 'function');
});
