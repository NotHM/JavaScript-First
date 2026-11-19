/**
 * Student Lesson 3.1 — Part 2: XMLHttpRequest (Browser Exercise)
 *
 * Instructions:
 * 1. Create a new XMLHttpRequest instance: `const xhr = new XMLHttpRequest();`
 * 2. Configure a GET request to:
 *      https://jsonplaceholder.typicode.com/todos/1
 * 3. Set `xhr.onload` to check `xhr.status === 200`, parse `xhr.responseText`
 *    with `JSON.parse()`, and log the result.
 * 4. Set `xhr.onerror` to log a network error message.
 * 5. Call `xhr.send()`.
 */

function fetchTodoWithXHR() {
  // TODO: Implement the XMLHttpRequest GET request
}

module.exports = { fetchTodoWithXHR };
