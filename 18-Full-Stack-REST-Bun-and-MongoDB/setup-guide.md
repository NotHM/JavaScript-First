# Unit 18 Setup Guide: Bun (`bun:sqlite`), Node 24 (`node:sqlite`) & MongoDB REST

**Unit Focus:** Dual-Database Full-Stack REST (`bun:sqlite` / `node:sqlite`, MongoDB MQL, `JSend` / `JSON:API` / `HAL+JSON`)  
**Zero-Daemon Guarantee:** Every lab and grading test executes **100% offline using Node 24's built-in `node:sqlite` + in-process `MqlDatabase`**—no live MongoDB server or Bun binary is required to pass `npm run grade -- --unit 18`.

---

## 1. Verify Node 24 Built-In `node:sqlite` (Required Baseline)

Confirm Node.js `v24+` and verify built-in `node:sqlite` (`DatabaseSync`) loads cleanly with zero third-party packages:

```bash
node -v
node -e "import('node:sqlite').then(({ DatabaseSync }) => { const db = new DatabaseSync(':memory:'); db.exec('PRAGMA foreign_keys = ON;'); console.log('node:sqlite ready!'); db.close(); })"
```

Run both Unit 18 instructor reference test suites:

```bash
node --test 18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/code/sqliteRestApp.test.mjs
node --test 18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/code/mongoRestApp.test.mjs
```

Expected output: **5/5 passing tests** covering ephemeral `node:http` REST CRUD, SQLi safety, FK `409` checks, MQL aggregations, GeoJSON `$near`, and `Accept` format switching.

---

## 2. Installing & Verifying Bun (`bun:sqlite` & `Bun.serve`) — Recommended

Install **Bun** to run [`bunRestApp.js`](./01-Bun-SQLite-REST-App/code/bunRestApp.js) natively:

- **Linux / macOS:**
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- **Windows (PowerShell):**
  ```powershell
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```

Verify Bun installation and boot the native Bun + SQLite API on port `3000`:

```bash
bun --version
PORT=3000 DB_PATH=:memory: bun run 18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/code/bunRestApp.js
```

Test creating and fetching an item from a second terminal:

```bash
curl -s -X POST http://127.0.0.1:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"sku":"KB-101","name":"Mechanical Keyboard","category":"gear","price_cents":7999,"stock":12}'
curl -s "http://127.0.0.1:3000/api/items?q=Keyboard&page=1&limit=10"
```

---

## 3. Local MongoDB via Docker Compose & `mongosh` (`Learn-MongoDB-4.x`)

When Docker Engine / Docker Desktop is available, start the `mongo:7` container defined in [`docker-compose.yml`](./02-MongoDB-Full-REST-App/code/docker-compose.yml) (preconfigured with `MONGO_INITDB_DATABASE: sweetscomplete`):

```bash
docker compose -f 18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/code/docker-compose.yml up -d
```

Verify container health and inspect the database via `mongosh`:

```bash
docker exec -it jsfirst-learn-mongodb mongosh --eval "db.adminCommand('ping')"
docker exec -it jsfirst-learn-mongodb mongosh sweetscomplete --eval "
  db.products.createIndex({ productKey: 1 }, { unique: true });
  db.products.getIndexes();
"
```

Standard connection URI for Node scripts (`MongoClient` in [`mongoDriverService.mjs`](./02-MongoDB-Full-REST-App/code/mongoDriverService.mjs)):

```bash
export MONGODB_URI="mongodb://127.0.0.1:27017/sweetscomplete"
```

Tear down cleanly when finished (keeping persistent volume, or add `-v` to wipe):

```bash
docker compose -f 18-Full-Stack-REST-Bun-and-MongoDB/02-MongoDB-Full-REST-App/code/docker-compose.yml down
```

---

## 4. Testing HTTP Content Negotiation (`curl` Verification)

When running your REST server (or [`mongoRestServer.mjs`](./02-MongoDB-Full-REST-App/code/mongoRestServer.mjs)) locally, verify all three responder formats with `curl -i`:

```bash
# 1. Default JSend (application/json)
curl -i -H "Accept: application/json" http://127.0.0.1:3000/api/products

# 2. JSON:API (application/vnd.api+json)
curl -i -H "Accept: application/vnd.api+json" http://127.0.0.1:3000/api/products

# 3. HAL+JSON (application/hal+json)
curl -i -H "Accept: application/hal+json" http://127.0.0.1:3000/api/analytics/revenue-by-country
```

---

## 5. Student TDD Verification & Automated Grader

Validate syntax across every Unit 18 student file and run the automated TDD suite:

```bash
node --check 0-student_files/18-dual-db-rest/sqliteCrudLab.mjs
node --check 0-student_files/18-dual-db-rest/mongoResponderLab.mjs
node --check 0-student_files/projects/unit-18-dual-db-rest/index.mjs

npm run grade -- --unit 18
```

---

## 6. Common Setup Error Triage Table

| Symptom / Error | Root Cause | Fix |
|---|---|---|
| `Cannot find module 'node:sqlite'` | Running Node `< 22.5` (older runtime lacks built-in SQLite) | Switch to Node `v24 LTS` via `nvm install 24 && nvm use 24` |
| `bun: command not found` | `~/.bun/bin` missing from shell `PATH` after install | Export `PATH="$HOME/.bun/bin:$PATH"` or restart shell; Node 24 parity still runs cleanly |
| `SQLITE_CONSTRAINT_FOREIGNKEY` | Tried inserting an order for nonexistent `item_id` or deleting referenced item | Verify target item exists (`404`) or return `409 Conflict` when orders depend on it |
| `MongoServerSelectionError: ECONNREFUSED 127.0.0.1:27017` | Docker `mongo` daemon is not started | Run `docker compose -f .../docker-compose.yml up -d` or use offline `MqlDatabase` tests |
| `E11000 duplicate key error collection` | Re-inserting existing unique `productKey` (`sweetscomplete`) | Catch `err.code === 11000` and return HTTP `409 Conflict` |
| `Test process hangs after node --test` | Forgot to call `catalog.close()` or `server.close()` in `finally` | Always close `DatabaseSync` and HTTP servers inside `finally` blocks |
