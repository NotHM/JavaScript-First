/**
 * Unit 5 Project TDD Suite (RED -> GREEN)
 * Run: node --test 0-student_files/projects/unit-05-matrix-gradebook/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  students,
  gradeMatrix,
  courseGraph,
  computeStudentAverages,
  buildStudentMap,
  findReachableCourses,
} = require('./index.js');

test('computeStudentAverages computes per-student averages via nested loops without mutating inputs', () => {
  const snapshot = gradeMatrix.map((r) => [...r]);
  const averages = computeStudentAverages(students, gradeMatrix);

  assert.equal(averages.length, 3);
  assert.equal(averages[0].name, 'Ada');
  assert.ok(Math.abs(averages[0].average - (95 + 88 + 92) / 3) < 0.05);
  assert.equal(averages[1].name, 'Grace');
  assert.ok(Math.abs(averages[1].average - (78 + 84 + 80) / 3) < 0.05);
  assert.deepEqual(gradeMatrix, snapshot);
});

test('buildStudentMap maps student names to score arrays for O(1) lookup', () => {
  const directory = buildStudentMap(students, gradeMatrix);
  assert.equal(directory instanceof Map, true);
  assert.equal(directory.size, 3);
  assert.deepEqual(directory.get('Ada'), [95, 88, 92]);
  assert.deepEqual(directory.get('Grace'), [78, 84, 80]);
  assert.deepEqual(directory.get('Linus'), [65, 90, 86]);
});

test('findReachableCourses traverses prerequisite DAG and prevents infinite loops on cycles', () => {
  const reachable = findReachableCourses(courseGraph, 'JS201');
  assert.equal(reachable.includes('Web301'), true);
  assert.equal(reachable.includes('Sec302'), true);
  assert.equal(reachable.includes('Capstone400'), true);
  assert.equal(reachable.includes('JS101'), false);

  const cyclicGraph = {
    A: ['B'],
    B: ['A', 'C'],
    C: [],
  };
  const cyclicReachable = findReachableCourses(cyclicGraph, 'A');
  assert.equal(cyclicReachable.includes('B'), true);
  assert.equal(cyclicReachable.includes('C'), true);
});
