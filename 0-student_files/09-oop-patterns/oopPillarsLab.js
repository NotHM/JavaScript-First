/**
 * Student Lesson 8.1 Lab: Encapsulation, Abstract Class & Polymorphism (Std 17.2–17.9)
 * Run: node 0-student_files/09-oop-patterns/oopPillarsLab.js
 */
const assert = require('node:assert/strict');

class Shape {
  constructor() {
    // TODO [L3 Apply | 17.7]: Throw Error if new.target === Shape
  }
  area() {
    throw new Error('Must override area()');
  }
}

class Rectangle extends Shape {
  #width;
  #height;
  constructor(width, height) {
    super();
    // TODO [L3 Apply | 17.4–17.5]: Validate width & height > 0, assign #width / #height
    void width;
    void height;
  }
  // TODO [L3 Apply | 17.8]: Implement area() returning #width * #height
}

function addScoreSafe(player, pts) {
  // TODO [L4 Analyze | 17.9]: Return a NEW object with score incremented cleanly WITHOUT mutating player
  return player;
}

console.log('Complete oopPillarsLab.js TODOs, then uncomment verification tests!');
/*
assert.throws(() => new Shape(), Error);
const rect = new Rectangle(4, 5);
assert.equal(rect.area(), 20);
const p1 = { name: 'Kai', score: 10 };
const p2 = addScoreSafe(p1, 5);
assert.equal(p1.score, 10);
assert.equal(p2.score, 15);
console.log('Lesson 8.1 Lab passed!');
*/
