/**
 * Unit 4 Project TDD Suite: Immutable Time-Travel Game State Store (AZ CTE Stds 3.3, 3.6, 18.2)
 * Run: node --test 0-student_files/projects/unit-04-immutable-state-store/index.test.js
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { deepFreeze, createGameStore } = require('./index.js');

test('deepFreeze recursively freezes nested objects and arrays', () => {
  const state = deepFreeze({
    hp: 100,
    player: { name: 'Ada', inventory: ['map', 'compass'] },
  });

  assert.equal(Object.isFrozen(state), true);
  assert.equal(Object.isFrozen(state.player), true);
  assert.equal(Object.isFrozen(state.player.inventory), true);

  assert.throws(() => {
    state.player.hp = 0;
  }, TypeError);
  assert.throws(() => {
    state.player.inventory.push('sword');
  }, TypeError);
});

test('createGameStore dispatches immutable updates without mutating prior snapshots or source input', () => {
  const seed = { hp: 100, inventory: ['map'] };
  const store = createGameStore(seed);
  seed.inventory.push('hack');

  assert.deepEqual(store.getState(), { hp: 100, inventory: ['map'] });

  const initialSnapshot = store.getState();
  store.dispatchUpdate((draft) => {
    draft.hp -= 25;
    draft.inventory.push('potion');
  });

  const nextSnapshot = store.getState();
  assert.deepEqual(nextSnapshot, { hp: 75, inventory: ['map', 'potion'] });
  assert.deepEqual(initialSnapshot, { hp: 100, inventory: ['map'] });
  assert.equal(Object.isFrozen(nextSnapshot), true);
  assert.equal(Object.isFrozen(nextSnapshot.inventory), true);
});

test('createGameStore undo restores previous snapshot and preserves base initial snapshot', () => {
  const store = createGameStore({ hp: 100, inventory: ['map'] });
  store.dispatchUpdate((draft) => {
    draft.hp = 60;
    draft.inventory.push('key');
  });
  assert.equal(store.getState().hp, 60);

  const rolledBack = store.undo();
  assert.deepEqual(rolledBack, { hp: 100, inventory: ['map'] });
  assert.deepEqual(store.getState(), { hp: 100, inventory: ['map'] });

  // Undo at initial history length 1 must remain safe
  const atRoot = store.undo();
  assert.deepEqual(atRoot, { hp: 100, inventory: ['map'] });
});
