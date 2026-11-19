/**
 * Student Lesson 6.1 — Relational, Boolean Logic & Conditionals (Std 5.1–5.4)
 * Run: node 0-student_files/07-functions/booleanLogicLab.js
 */

function nor(a, b) {
  // TODO [L3 Apply | 5.2]: Return true ONLY if both a and b are falsy
}

function xor(a, b) {
  // TODO [L3 Apply | 5.2]: Return true ONLY if one is truthy and one is falsy
}

function getLetterGrade(score) {
  // TODO [L3 Apply | 5.4]: Use clean guard clauses returning 'INVALID', 'A', 'B', 'C', 'D', or 'F'
}

function handleCommand(cmd) {
  // TODO [L3 Apply | 5.4]: Implement switch for 'start', 'pause', 'stop', and default 'unknown'
}

console.log('NOR(false, false):', nor(false, false));
console.log('XOR(true, true):', xor(true, true));
console.log('Grade(88):', getLetterGrade(88));
console.log('Cmd(start):', handleCommand('start'));
