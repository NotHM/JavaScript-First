/**
 * Student Lesson 4.1 TDD Suite: Variables, Scope, Object.freeze & structuredClone (AZ CTE Stds 3.3, 3.6, 18.2)
 * Run: node --test 0-student_files/05-variables-scope/immutability.test.js
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { updatePoints, createFrozenSettings, deepCloneGame } = require('./immutability.js');

test('updatePoints mutates property on existing object reference without replacing object', () => {
  const profile = { name: 'Alex', points: 10 };
  const updated = updatePoints(profile, 75);

  assert.equal(updated, profile, 'updatePoints should return the mutated profile reference');
  assert.equal(profile.points, 75);
});

test('createFrozenSettings returns a shallowly frozen Object.freeze object', () => {
  const settings = createFrozenSettings('dark');
  assert.equal(settings.theme, 'dark');
  assert.equal(Object.isFrozen(settings), true, 'Settings object must be frozen with Object.freeze()');
  assert.throws(() => {
    settings.theme = 'light';
  }, TypeError);
});

test('deepCloneGame creates an independent nested copy via structuredClone()', () => {
  const game = { player: 'Alex', scores: [10, 20], meta: { level: 1 } };
  const clone = deepCloneGame(game);

  assert.ok(clone && typeof clone === 'object');
  assert.notEqual(clone, game, 'Clone must be a new top-level reference');
  assert.notEqual(clone.scores, game.scores, 'Nested scores array must be deep-cloned');
  assert.notEqual(clone.meta, game.meta, 'Nested meta object must be deep-cloned');

  clone.scores.push(30);
  clone.meta.level = 99;
  assert.deepEqual(game.scores, [10, 20]);
  assert.equal(game.meta.level, 1);
});
