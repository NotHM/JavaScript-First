# Unit 18 Quiz 1: Bun, SQLite & MongoDB Architecture (Concepts)

**Bloom's Focus:** `[L1 Remember]` & `[L2 Understand]`  
**Kahoot Import File:** [`quiz-1-kahoot.csv`](./quiz-1-kahoot.csv)  
**AZ CTE Standards:** `8.3`, `11.6`, `16.5`, `17.10`

| # | Question | Choices (* = Correct) | Time | Bloom's & Rationale |
|---|---|---|---|---|
| 1 | Which JS engine does Bun use under the hood? | A) Chrome V8<br>**B) Apple JavaScriptCore***<br>C) SpiderMonkey<br>D) ChakraCore | 20s | `[L1 Remember \| 11.6]` Bun pairs Zig with Apple's JavaScriptCore engine. |
| 2 | Which native Bun API starts an HTTP server using Web `Request` and `Response`? | A) `http.createServer()`<br>**B) `Bun.serve()`***<br>C) `Deno.open()`<br>D) `express.run()` | 20s | `[L1 Remember \| 11.7]` `Bun.serve({ port, fetch(req) { ... } })` mirrors Web Standards. |
| 3 | Which built-in Node 24 module provides synchronous SQLite queries offline? | A) `node:mongo`<br>B) `node:fs`<br>**C) `node:sqlite` (`DatabaseSync`)***<br>D) `node:sqlserver` | 20s | `[L1 Remember \| 16.5]` Node 24 ships `DatabaseSync` inside `node:sqlite`. |
| 4 | Which SQLite statement enables foreign-key checking on a connection? | **A) `PRAGMA foreign_keys = ON;`***<br>B) `SET STRICT = TRUE;`<br>C) `ENABLE KEYS;`<br>D) `USE FOREIGN;` | 20s | `[L1 Remember \| 16.5]` Required per SQLite connection to enforce `REFERENCES`. |
| 5 | Which HTTP status code indicates a newly created resource after `POST /api/items`? | A) `200`<br>**B) `201`***<br>C) `404`<br>D) `409` | 10s | `[L1 Remember \| 8.3]` `201 Created` signals successful resource creation. |
| 6 | In MongoDB GeoJSON, how must `coordinates` be ordered? | A) `[latitude, longitude]`<br>**B) `[longitude, latitude]`***<br>C) `[city, state]`<br>D) `[x, y, z]` | 20s | `[L2 Understand \| 16.5]` GeoJSON RFC 7946 requires `[longitude, latitude]`. |
| 7 | Which MongoDB aggregation stage joins documents from another collection? | A) `$join`<br>**B) `$lookup`***<br>C) `$mergeRows`<br>D) `$union` | 20s | `[L1 Remember \| 16.5]` `$lookup` performs left outer joins using `localField`/`foreignField`. |
| 8 | What HTTP header selects `JSend` vs `JSON:API` vs `HAL+JSON`? | **A) `Accept`***<br>B) `Cookie`<br>C) `Host`<br>D) `Referer` | 20s | `[L2 Understand \| 8.3]` Servers negotiate representation format from `Accept`. |
| 9 | Which MIME type identifies the **JSON:API** specification? | A) `text/plain`<br>B) `application/hal+json`<br>**C) `application/vnd.api+json`***<br>D) `application/xml` | 20s | `[L1 Remember \| 17.10]` Official JSON:API media type is `application/vnd.api+json`. |
| 10 | Which design pattern lets one REST route emit JSend, JSON:API, or HAL+JSON cleanly? | A) Singleton<br>**B) Strategy Pattern***<br>C) Bubble Sort<br>D) Busy Wait | 20s | `[L2 Understand \| 17.10]` Strategy swaps response formatters behind one `.render()` API. |
