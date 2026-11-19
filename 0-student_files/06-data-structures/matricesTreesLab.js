/**
 * Student Lesson 5.2B — Hash Maps, 2D Matrices, Trees & Graphs (Std 6.0)
 * Run: node 0-student_files/06-data-structures/matricesTreesLab.js
 */

function indexById(records) {
  // TODO [L3 Apply | 6.2]: Return a Map mapping record.id -> record
  return new Map();
}

function sumMatrix(matrix) {
  // TODO [L3 Apply | 6.5]: Sum every cell in a 2D number array using nested loops
  return 0;
}

function collectTreeLabels(node, acc = []) {
  // TODO [L4 Analyze | 6.8]: Push node.label recursively for node and node.children
  return acc;
}

if (require.main === module) {
  console.log('Map:', indexById([{ id: 'u1', name: 'Sam' }]).get('u1'));
  console.log('Matrix sum:', sumMatrix([[1, 2], [3, 4]]));
  console.log(
    'Tree labels:',
    collectTreeLabels({ label: 'root', children: [{ label: 'a', children: [] }, { label: 'b', children: [] }] })
  );
}

module.exports = { indexById, sumMatrix, collectTreeLabels };
