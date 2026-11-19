'use strict';

// 1. Block scope vs function scope
function scopeDemo() {
  if (true) {
    var functionScoped = 'visible outside if';
    let blockScoped = 'only inside if';
    console.log('Inside block:', blockScoped);
  }
  console.log('Outside block:', functionScoped);
}
scopeDemo();

// 2. const allows property mutation
const student = { name: 'Jordan', grade: 10 };
student.grade = 11;
console.log('Mutated const object:', student);

// 3. Object.freeze prevents shallow mutation
const config = Object.freeze({ env: 'production', port: 7000 });
console.log('Frozen config:', config);

// 4. Deep copy with structuredClone
const original = { user: 'Sam', scores: [90, 95] };
const copy = structuredClone(original);
copy.scores.push(100);
console.log('Original scores:', original.scores);
console.log('Cloned scores:', copy.scores);
