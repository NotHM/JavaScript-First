// Loops & Recursion
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log('5! =', factorial(5));

// Array methods: filter, map, reduce
const scores = [72, 88, 95, 60, 84];
const passing = scores.filter((s) => s >= 70);
const curved = passing.map((s) => s + 5);
const total = curved.reduce((sum, s) => sum + s, 0);
console.log({ passing, curved, average: total / curved.length });

// JSON & Built-ins (Math, Date, RegExp)
const record = { id: 1, date: new Date().toISOString(), hypotenuse: Math.hypot(3, 4) };
const json = JSON.stringify(record);
console.log('JSON:', json);
console.log('Valid email:', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test('student@example.edu'));
