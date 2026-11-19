/**
 * Unit 4 Project Starter: Immutable Time-Travel Game State Store
 * Run: node 0-student_files/projects/unit-04-immutable-state-store/index.js
 */
const assert = require('node:assert/strict');

function deepFreeze(obj) {
  // TODO [L4 Analyze]: Recursively Object.freeze nested objects/arrays
  return Object.freeze(obj);
}

function createGameStore(initialState) {
  const history = [deepFreeze(structuredClone(initialState))];

  return {
    getState() {
      // TODO: Return current top frozen snapshot
      return history[history.length - 1];
    },
    dispatchUpdate(updaterFn) {
      // TODO [L6 Create]: Deep clone current state, pass clone to updaterFn(clone), deepFreeze, and push to history
    },
    undo() {
      // TODO [L3 Apply]: Pop snapshot only if history.length > 1; return current state
      return this.getState();
    },
  };
}

if (require.main === module) {
  const store = createGameStore({ hp: 100, inventory: ['map'] });
  console.log('Unit 4 Initial Snapshot:', store.getState());
}

void assert;
module.exports = { deepFreeze, createGameStore };
