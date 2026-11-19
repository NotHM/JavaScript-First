/**
 * Student Lesson 3.1 — Part 3: Fetch API in Node.js
 *
 * Instructions:
 * 1. Complete `getTodo(id)` as an `async` function.
 * 2. Inside a `try { ... } catch (error) { ... }` block:
 *    - Call `await fetch(\`https://jsonplaceholder.typicode.com/todos/\${id}\`)`
 *    - Check `if (!response.ok) throw new Error(\`HTTP \${response.status}\`);`
 *    - Parse JSON with `const data = await response.json();`
 *    - Log `data` to the console.
 * 3. Call `getTodo(1)`.
 * 4. Run with:
 *      node 0-student_files/04-ajax/fetch-node-exercise.js
 */

async function getTodo(id) {
  // TODO: Implement fetch with try/catch and response.ok check
}

if (require.main === module) {
  // TODO: Call getTodo(1)
}

module.exports = { getTodo };
