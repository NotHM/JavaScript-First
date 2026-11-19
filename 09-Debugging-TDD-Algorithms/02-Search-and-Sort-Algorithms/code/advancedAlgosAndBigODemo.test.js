/**
 * Lesson 9.2B Teacher Demo: Big-O Static Analyzer & Classic Advanced Algorithms
 * Zero-dependency implementations of missing upstream `05-Algorithms/` modules:
 *   1. analyzeTimeComplexity (static loop-depth & recursion analyzer)
 *   2. Dijkstra's single-source shortest path
 *   3. Floyd-Warshall all-pairs shortest path
 *   4. Huffman coding lossless compression & decompression
 *   5. Newton-Raphson square root convergence
 *   6. Travelling Salesman (Nearest-Neighbor Greedy + Exact Held-Karp DP)
 *
 * Run:
 *   node --test 09-Debugging-TDD-Algorithms/02-Search-and-Sort-Algorithms/code/advancedAlgosAndBigODemo.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

// ---------------------------------------------------------------------------
// 1. Static Loop-Depth & Recursion Analyzer (Zero External Deps)
// ---------------------------------------------------------------------------
function stripStringsAndComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/.*$/gm, ' ')
    .replace(/(["'`])(?:\\.|(?!\1)[^\\])*\1/g, '""');
}

function analyzeTimeComplexity(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('analyzeTimeComplexity expects a function');
  }
  const clean = stripStringsAndComments(fn.toString());
  const fnName = fn.name || '';

  // Tokenize braces, parens, semicolons, and identifiers to compute true nested loop depth
  const tokens = clean.match(/\b(?:for|while|do)\b|[{}();]|[A-Za-z_$][\w$]*/g) || [];
  let braceDepth = 0;
  let maxLoopDepth = 0;
  let loopCount = 0;
  const loopEntryBraceDepths = [];
  let inLoopHeader = false;
  let awaitingLoopBody = false;
  let parenDepth = 0;
  let singleLineLoops = 0;

  for (let i = 0; i < tokens.length; i += 1) {
    const tok = tokens[i];
    if (inLoopHeader) {
      if (tok === '(') parenDepth += 1;
      else if (tok === ')') {
        parenDepth -= 1;
        if (parenDepth === 0) {
          inLoopHeader = false;
          awaitingLoopBody = true;
        }
      }
      continue;
    }
    if (awaitingLoopBody) {
      awaitingLoopBody = false;
      if (tok === '{') {
        braceDepth += 1;
        loopEntryBraceDepths.push(braceDepth);
        maxLoopDepth = Math.max(maxLoopDepth, loopEntryBraceDepths.length + singleLineLoops);
        continue;
      }
      singleLineLoops += 1;
      maxLoopDepth = Math.max(maxLoopDepth, loopEntryBraceDepths.length + singleLineLoops);
      if (tok !== 'for' && tok !== 'while' && tok !== 'do') {
        if (tok === ';') singleLineLoops = 0;
        continue;
      }
    }
    if (tok === 'for' || tok === 'while') {
      loopCount += 1;
      inLoopHeader = true;
      awaitingLoopBody = false;
      parenDepth = 0;
      continue;
    }
    if (tok === 'do') {
      loopCount += 1;
      awaitingLoopBody = true;
      continue;
    }
    if (tok === '{') {
      braceDepth += 1;
    } else if (tok === '}') {
      if (loopEntryBraceDepths.length > 0 && loopEntryBraceDepths.at(-1) === braceDepth) {
        loopEntryBraceDepths.pop();
      }
      braceDepth = Math.max(0, braceDepth - 1);
      if (singleLineLoops > 0) singleLineLoops = 0;
    } else if (tok === ';' && singleLineLoops > 0) {
      singleLineLoops = 0;
    }
  }

  // Count self-recursive calls outside the function declaration header
  let recursionCalls = 0;
  if (fnName) {
    const bodyStart = clean.indexOf('{');
    const body = bodyStart >= 0 ? clean.slice(bodyStart + 1) : clean;
    const callMatches = body.match(new RegExp(`\\b${fnName}\\s*\\(`, 'g')) || [];
    recursionCalls = callMatches.length;
  }

  let classification = 'Constant';
  let bigO = 'O(1)';
  if (recursionCalls >= 2) {
    classification = 'Exponential';
    bigO = 'O(2^n)';
  } else if (recursionCalls === 1 && maxLoopDepth === 0) {
    classification = 'Linear';
    bigO = 'O(n)';
  } else if (maxLoopDepth === 1) {
    classification = 'Linear';
    bigO = 'O(n)';
  } else if (maxLoopDepth === 2) {
    classification = 'Quadratic';
    bigO = 'O(n^2)';
  } else if (maxLoopDepth >= 3) {
    classification = 'Polynomial';
    bigO = `O(n^${maxLoopDepth})`;
  }

  return { classification, bigO, maxLoopDepth, loopCount, recursionCalls };
}

// ---------------------------------------------------------------------------
// 2. Dijkstra's Single-Source Shortest Path
// ---------------------------------------------------------------------------
function dijkstra(graph, start) {
  const distances = new Map();
  const previous = new Map();
  const unvisited = new Set(Object.keys(graph));

  for (const node of unvisited) {
    distances.set(node, node === start ? 0 : Infinity);
    previous.set(node, null);
  }

  while (unvisited.size > 0) {
    let current = null;
    let bestDist = Infinity;
    for (const node of unvisited) {
      const d = distances.get(node);
      if (d < bestDist) {
        bestDist = d;
        current = node;
      }
    }
    if (current === null || bestDist === Infinity) break;
    unvisited.delete(current);

    for (const [neighbor, weight] of Object.entries(graph[current] || {})) {
      if (weight < 0) throw new RangeError('Dijkstra requires non-negative edge weights');
      if (!unvisited.has(neighbor)) continue;
      const candidate = bestDist + weight;
      if (candidate < distances.get(neighbor)) {
        distances.set(neighbor, candidate);
        previous.set(neighbor, current);
      }
    }
  }

  function getPath(target) {
    if (distances.get(target) === Infinity) return [];
    const path = [];
    let step = target;
    while (step !== null) {
      path.unshift(step);
      step = previous.get(step);
    }
    return path;
  }

  return { distances: Object.fromEntries(distances), getPath };
}

// ---------------------------------------------------------------------------
// 3. Floyd-Warshall All-Pairs Shortest Path
// ---------------------------------------------------------------------------
function floydWarshall(matrix) {
  const n = matrix.length;
  const dist = matrix.map((row) => [...row]);

  for (let k = 0; k < n; k += 1) {
    for (let i = 0; i < n; i += 1) {
      if (dist[i][k] === Infinity) continue;
      for (let j = 0; j < n; j += 1) {
        if (dist[k][j] === Infinity) continue;
        const throughK = dist[i][k] + dist[k][j];
        if (throughK < dist[i][j]) {
          dist[i][j] = throughK;
        }
      }
    }
  }

  for (let i = 0; i < n; i += 1) {
    if (dist[i][i] < 0) {
      throw new Error('Negative weight cycle detected');
    }
  }
  return dist;
}

// ---------------------------------------------------------------------------
// 4. Huffman Coding Compression & Decompression
// ---------------------------------------------------------------------------
function buildHuffmanTree(text) {
  if (!text) return null;
  const freqs = new Map();
  for (const ch of text) {
    freqs.set(ch, (freqs.get(ch) || 0) + 1);
  }

  const nodes = [...freqs.entries()].map(([char, freq]) => ({
    char,
    freq,
    left: null,
    right: null,
  }));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift();
    const right = nodes.shift();
    nodes.push({ char: null, freq: left.freq + right.freq, left, right });
  }
  return nodes[0];
}

function buildCodeTable(node, prefix = '', table = {}) {
  if (!node) return table;
  if (node.char !== null) {
    table[node.char] = prefix || '0'; // single-unique-char fallback -> '0'
    return table;
  }
  buildCodeTable(node.left, `${prefix}0`, table);
  buildCodeTable(node.right, `${prefix}1`, table);
  return table;
}

function huffmanEncode(text) {
  if (text.length === 0) return { encoded: '', codes: {}, tree: null };
  const tree = buildHuffmanTree(text);
  const codes = buildCodeTable(tree);
  let encoded = '';
  for (const ch of text) {
    encoded += codes[ch];
  }
  return { encoded, codes, tree };
}

function huffmanDecode(encoded, tree) {
  if (!tree || encoded.length === 0) return '';
  if (tree.char !== null) {
    return tree.char.repeat(encoded.length);
  }
  let out = '';
  let curr = tree;
  for (const bit of encoded) {
    curr = bit === '0' ? curr.left : curr.right;
    if (curr.char !== null) {
      out += curr.char;
      curr = tree;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// 5. Newton-Raphson Square Root Convergence
// ---------------------------------------------------------------------------
function newtonRaphsonSqrt(target, tolerance = 1e-10, maxIterations = 50) {
  if (target < 0) throw new RangeError('Cannot compute real sqrt of negative number');
  if (target === 0) return { root: 0, iterations: 0, error: 0 };

  let guess = target >= 1 ? target / 2 : 1;
  let iterations = 0;

  while (iterations < maxIterations) {
    iterations += 1;
    const next = 0.5 * (guess + target / guess);
    const error = Math.abs(next * next - target);
    guess = next;
    if (error <= tolerance) {
      return { root: guess, iterations, error };
    }
  }
  return { root: guess, iterations, error: Math.abs(guess * guess - target) };
}

// ---------------------------------------------------------------------------
// 6. Travelling Salesman Problem: Nearest-Neighbor Greedy & Exact Held-Karp DP
// ---------------------------------------------------------------------------
function solveTspNearestNeighbor(distMatrix, start = 0) {
  const n = distMatrix.length;
  if (n === 0) return { tour: [], cost: 0 };
  const visited = new Set([start]);
  const tour = [start];
  let current = start;
  let cost = 0;

  while (visited.size < n) {
    let nextCity = -1;
    let bestEdge = Infinity;
    for (let city = 0; city < n; city += 1) {
      if (!visited.has(city) && distMatrix[current][city] < bestEdge) {
        bestEdge = distMatrix[current][city];
        nextCity = city;
      }
    }
    visited.add(nextCity);
    tour.push(nextCity);
    cost += bestEdge;
    current = nextCity;
  }

  cost += distMatrix[current][start];
  tour.push(start);
  return { tour, cost };
}

function solveTspExactDp(distMatrix) {
  const n = distMatrix.length;
  if (n <= 1) return { tour: n === 1 ? [0, 0] : [], cost: 0 };

  const fullMask = (1 << n) - 1;
  const memo = new Map();

  function dp(mask, pos) {
    if (mask === fullMask) {
      return { cost: distMatrix[pos][0], path: [0] };
    }
    const key = `${mask}:${pos}`;
    if (memo.has(key)) return memo.get(key);

    let best = { cost: Infinity, path: [] };
    for (let next = 0; next < n; next += 1) {
      if (mask & (1 << next)) continue;
      const sub = dp(mask | (1 << next), next);
      const total = distMatrix[pos][next] + sub.cost;
      if (total < best.cost) {
        best = { cost: total, path: [next, ...sub.path] };
      }
    }
    memo.set(key, best);
    return best;
  }

  const res = dp(1, 0);
  return { tour: [0, ...res.path], cost: res.cost };
}

// ---------------------------------------------------------------------------
// Node:test Verification Suite
// ---------------------------------------------------------------------------
test('analyzeTimeComplexity classifies constant, linear, quadratic, and branching recursion', () => {
  function constantFn(a, b) {
    return a + b;
  }
  function linearFn(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i += 1) sum += arr[i];
    return sum;
  }
  function quadraticFn(matrix) {
    let sum = 0;
    for (let r = 0; r < matrix.length; r += 1) {
      for (let c = 0; c < matrix[r].length; c += 1) sum += matrix[r][c];
    }
    return sum;
  }
  function fibBranch(n) {
    if (n <= 1) return n;
    return fibBranch(n - 1) + fibBranch(n - 2);
  }

  assert.equal(analyzeTimeComplexity(constantFn).bigO, 'O(1)');
  assert.equal(analyzeTimeComplexity(linearFn).bigO, 'O(n)');
  assert.equal(analyzeTimeComplexity(quadraticFn).bigO, 'O(n^2)');
  assert.equal(analyzeTimeComplexity(fibBranch).bigO, 'O(2^n)');
});

test('dijkstra finds lowest-cost shortest path and reconstructs route', () => {
  const graph = {
    A: { B: 4, C: 2 },
    B: { C: 5, D: 10 },
    C: { E: 3 },
    E: { D: 4 },
    D: {},
  };
  const { distances, getPath } = dijkstra(graph, 'A');
  assert.equal(distances.D, 9);
  assert.deepEqual(getPath('D'), ['A', 'C', 'E', 'D']);
});

test('floydWarshall computes all-pairs shortest distances accurately', () => {
  const INF = Infinity;
  const matrix = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0],
  ];
  const dist = floydWarshall(matrix);
  assert.deepEqual(dist[0], [0, 3, 5, 6]);
  assert.deepEqual(dist[1], [5, 0, 2, 3]);
});

test('huffmanEncode and huffmanDecode perform lossless compression including single-char edge case', () => {
  const msg = 'javascript first node server algorithms';
  const { encoded, codes, tree } = huffmanEncode(msg);
  assert.ok(encoded.length < msg.length * 8); // Beats fixed 8-bit ASCII
  assert.equal(huffmanDecode(encoded, tree), msg);
  assert.ok(codes.s.length <= codes.j.length); // Higher-freq char gets shorter or equal code

  const single = huffmanEncode('aaaa');
  assert.equal(huffmanDecode(single.encoded, single.tree), 'aaaa');
});

test('newtonRaphsonSqrt converges quadratically to Math.sqrt precision', () => {
  const res = newtonRaphsonSqrt(144);
  assert.ok(Math.abs(res.root - 12) < 1e-10);
  assert.ok(res.iterations < 15);
  assert.equal(newtonRaphsonSqrt(0).root, 0);
  assert.throws(() => newtonRaphsonSqrt(-9), RangeError);
});

test('Travelling Salesman exact DP finds optimal tour <= greedy nearest-neighbor tour', () => {
  const cities = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0],
  ];
  const greedy = solveTspNearestNeighbor(cities, 0);
  const exact = solveTspExactDp(cities);
  assert.equal(exact.cost, 80); // 0 -> 1 -> 3 -> 2 -> 0 = 10 + 25 + 30 + 15 = 80
  assert.ok(exact.cost <= greedy.cost);
  assert.equal(exact.tour[0], 0);
  assert.equal(exact.tour.at(-1), 0);
});

module.exports = {
  analyzeTimeComplexity,
  dijkstra,
  floydWarshall,
  huffmanEncode,
  huffmanDecode,
  newtonRaphsonSqrt,
  solveTspNearestNeighbor,
  solveTspExactDp,
};
