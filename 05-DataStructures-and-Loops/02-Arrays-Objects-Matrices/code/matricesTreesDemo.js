/**
 * Lesson 5.2 Teacher Reference Demo (AZ CTE Standard 6.0)
 * Demonstrates Hash Map lookups, 2D matrix traversal, Tree traversal, and cycle-safe Graph BFS.
 *
 * Run: node 05-DataStructures-and-Loops/02-Arrays-Objects-Matrices/code/matricesTreesDemo.js
 */

// 6.2 User-defined records indexed via Map
const roster = [
  { id: 'S01', name: 'Ada', track: 'Web' },
  { id: 'S02', name: 'Grace', track: 'Security' },
];
const rosterMap = new Map(roster.map((s) => [s.id, s]));
console.log('Map lookup S02:', rosterMap.get('S02'));

// 6.5 2D Matrix transpose/column sum
const grid = [
  [80, 90, 100],
  [70, 85, 95],
];
const rowAverages = grid.map((row) => row.reduce((a, b) => a + b, 0) / row.length);
console.log('Row averages:', rowAverages);

// 6.8 Tree depth traversal (File folder tree)
const folderTree = {
  name: 'src',
  children: [
    { name: 'utils', children: [{ name: 'math.js', children: [] }] },
    { name: 'index.js', children: [] },
  ],
};
function listTreeNames(node, out = []) {
  out.push(node.name);
  for (const child of node.children) listTreeNames(child, out);
  return out;
}
console.log('Tree nodes:', listTreeNames(folderTree));

// 6.8 Cycle-safe Graph BFS
const network = {
  A: ['B', 'C'],
  B: ['A', 'D'], // cycle A <-> B!
  C: ['D'],
  D: [],
};
function bfsShortestOrder(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
console.log('BFS order from A:', bfsShortestOrder(network, 'A'));
