# Student Lesson 3.1: Asynchronous JavaScript & AJAX

**Readings:** [`readme.md`](./readme.md) | [`00-fetch/readme.md`](./00-fetch/readme.md)  
**Starter Files:** [`../0-student_files/04-ajax/`](../0-student_files/04-ajax/)

---

## Part 1: Compare XHR, Fetch & Axios
Complete the table below after reading [`readme.md`](./readme.md):

| Feature | XHR (`XMLHttpRequest`) | Fetch (`fetch()`) | Axios |
|---|---|---|---|
| Built into modern browsers? | *(Yes / No)* | *(Yes / No)* | *(Yes / No)* |
| Uses Promises (`async`/`await`)? | *(Yes / No)* | *(Yes / No)* | *(Yes / No)* |
| Auto-parses JSON? | *(Yes / No)* | *(Yes / No)* | *(Yes / No)* |

---

## Part 2: `XMLHttpRequest` Reading & Trace (`xhr-exercise.js`)
1. Open [`0-student_files/04-ajax/xhr-exercise.js`](../0-student_files/04-ajax/xhr-exercise.js).
2. Complete the `TODO` comments to configure an `XMLHttpRequest` `GET` request, handle `onload` and `onerror`, and parse `JSON.parse(xhr.responseText)`.

---

## Part 3: Fetch API in Node.js (`fetch-node-exercise.js`)
1. Open [`0-student_files/04-ajax/fetch-node-exercise.js`](../0-student_files/04-ajax/fetch-node-exercise.js).
2. Complete the `async function getTodo(id)` using `fetch()`, `if (!response.ok)`, `await response.json()`, and `try`/`catch`.
3. Run your script:
   ```bash
   node 0-student_files/04-ajax/fetch-node-exercise.js
   ```

---

## Part 4: Fetch API in the Browser (`fetch-exercise.html`)
1. Open [`0-student_files/04-ajax/fetch-exercise.html`](../0-student_files/04-ajax/fetch-exercise.html).
2. Complete the `<script>` `TODO`s to fetch a list of posts or users when the button is clicked and render their titles into the `<ul id="results">`.
3. Open the HTML file in your browser (or via VS Code Live Server) and test the button.
