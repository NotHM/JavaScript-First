/**
 * Unit 5 Project Starter: 2D Matrix Gradebook & Prerequisite Graph Engine
 * Run: node 0-student_files/projects/unit-05-matrix-gradebook/index.js
 */

const students = ['Ada', 'Grace', 'Linus'];
// Rows = students, Cols = [Lab1, Lab2, Midterm]
const gradeMatrix = [
  [95, 88, 92],
  [78, 84, 80],
  [65, 90, 86],
];

const courseGraph = {
  JS101: ['JS201'],
  JS201: ['Web301', 'Sec302'],
  Web301: ['Capstone400'],
  Sec302: ['Capstone400'],
  Capstone400: [],
};

function computeStudentAverages(names, matrix) {
  // TODO [L3 Apply | 7.3, 6.5]: Nested loops returning [{ name, average }]
  return [];
}

function buildStudentMap(names, matrix) {
  // TODO [L5 Evaluate | 6.2]: Return a Map mapping name -> score array for O(1) lookup
  return new Map();
}

function findReachableCourses(graph, startCourse, visited = new Set()) {
  // TODO [L6 Create | 6.8, 7.1]: Traverse graph cleanly with base case preventing cycles
  return [...visited];
}

console.log('Unit 5 Project Starter Ready');
console.log(computeStudentAverages(students, gradeMatrix));
