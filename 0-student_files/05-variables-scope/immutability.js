/**
 * Student Lesson 4.1 — Variables, Scope & Immutability
 *
 * Instructions:
 * 1. Create a `const` object `profile` with `name` and `points` properties,
 *    then update `profile.points` to a new number and log it.
 * 2. Create a frozen object `settings` using `Object.freeze({ theme: 'dark' })`.
 * 3. Create a nested object `game = { player: 'Alex', scores: [10, 20] }`,
 *    clone it with `structuredClone(game)`, push `30` to `clone.scores`,
 *    and log both `game.scores` and `clone.scores` to verify independence.
 * 4. Run with:
 *      node 0-student_files/05-variables-scope/immutability.js
 */

// TODO: Step 1 — const object mutation
function updatePoints(profile, newPoints) {
  // TODO [L3 Apply | 3.6]: Update `profile.points = newPoints` on the existing object without reassigning `profile`, and return `profile`
  void profile;
  void newPoints;
  return null;
}

// TODO: Step 2 — Object.freeze()
function createFrozenSettings(theme = 'dark') {
  // TODO [L3 Apply | 3.6]: Return `Object.freeze({ theme })`
  void theme;
  return {};
}

// TODO: Step 3 — structuredClone() deep copy
function deepCloneGame(game) {
  // TODO [L3 Apply | 3.6]: Return an independent deep clone using `structuredClone(game)`
  void game;
  return game;
}

if (require.main === module) {
  const profile = { name: 'Alex', points: 10 };
  console.log('Step 1 updatePoints ->', updatePoints(profile, 25));

  const settings = createFrozenSettings('dark');
  console.log('Step 2 createFrozenSettings ->', settings, 'frozen?', Object.isFrozen(settings));

  const game = { player: 'Alex', scores: [10, 20] };
  const clone = deepCloneGame(game);
  if (clone && clone !== game && Array.isArray(clone.scores)) {
    clone.scores.push(30);
  }
  console.log('Step 3 original scores ->', game.scores, 'clone scores ->', clone?.scores);
}

module.exports = { updatePoints, createFrozenSettings, deepCloneGame };
