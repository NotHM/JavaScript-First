# Chapter 3: Asynchronous JavaScript & AJAX

## Student Learning Objectives
By the end of this chapter, you should be able to:
1. Explain **XHR** (`XMLHttpRequest`), **Fetch**, and **Axios**.
2. Compare and contrast XHR, Fetch, and Axios for making HTTP requests.
3. Write asynchronous functions using XHR and Fetch to retrieve and handle data.

---

## What is AJAX?
**AJAX** (Asynchronous JavaScript and XML) is the pattern of making HTTP requests from JavaScript without reloading the entire page, allowing applications to update data dynamically.

## What is XHR?
`XMLHttpRequest` (**XHR**) is the original browser API for sending asynchronous HTTP requests. While still supported, modern codebases generally prefer the Promise-based **Fetch API** or libraries like **Axios**.

## HTTP Request Methods
- **`GET`** — Retrieve data from a server.
- **`POST`** — Submit new data to a server.
- **`PUT` / `PATCH`** — Update existing data on a server.
- **`DELETE`** — Remove data from a server.

## Chapter Contents
- **Diagram:** [`AJAX.drawio.svg`](./AJAX.drawio.svg)
- **XHR Example:** [`00-XHR/xhr.js`](./00-XHR/xhr.js)
- **Fetch Guide & Examples:** [`00-fetch/readme.md`](./00-fetch/readme.md)

## External Resources
1. **Videos**
   - [Academind — Sending JavaScript HTTP Requests with XMLHttpRequest](https://www.youtube.com/watch?v=4K33w-0-p2c)
2. **Documentation**
   - [MDN — Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
   - [MDN — XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)