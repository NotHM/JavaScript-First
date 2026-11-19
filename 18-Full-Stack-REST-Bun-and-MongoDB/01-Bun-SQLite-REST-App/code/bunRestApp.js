/**
 * Lesson 18.1 Native Bun + bun:sqlite Full-Stack REST API Reference
 *
 * Run natively when Bun is installed:
 *   bun run 18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/code/bunRestApp.js
 *
 * For offline Node 24 execution & automated tests without Bun installed,
 * see sqliteRestEngine.mjs and sqliteRestApp.test.mjs (powered by built-in node:sqlite).
 */

import { Database } from 'bun:sqlite';

const db = new Database(process.env.DB_PATH ?? ':memory:', { create: true });

db.exec(`
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE RESTRICT,
    qty INTEGER NOT NULL CHECK (qty > 0),
    total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const idMatch = url.pathname.match(/^\/api\/items\/(\d+)$/);

    if (req.method === 'GET' && url.pathname === '/api/items') {
      const q = (url.searchParams.get('q') ?? '').trim();
      const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
      const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') ?? '10')));
      const offset = (page - 1) * limit;

      const rows = q
        ? db
            .query('SELECT * FROM items WHERE name LIKE ? OR category LIKE ? ORDER BY id ASC LIMIT ? OFFSET ?')
            .all(`%${q}%`, `%${q}%`, limit, offset)
        : db.query('SELECT * FROM items ORDER BY id ASC LIMIT ? OFFSET ?').all(limit, offset);

      return Response.json({ page, limit, items: rows }, { status: 200 });
    }

    if (req.method === 'POST' && url.pathname === '/api/items') {
      const body = await req.json();
      if (!body.sku || !body.name || !Number.isInteger(body.price_cents)) {
        return Response.json({ error: 'Invalid payload' }, { status: 400 });
      }
      const res = db
        .query('INSERT INTO items (sku, name, category, price_cents, stock) VALUES (?, ?, ?, ?, ?)')
        .run(body.sku, body.name, body.category ?? 'general', body.price_cents, body.stock ?? 0);
      const created = db.query('SELECT * FROM items WHERE id = ?').get(res.lastInsertRowid);
      return Response.json(created, { status: 201 });
    }

    if (req.method === 'GET' && idMatch) {
      const item = db.query('SELECT * FROM items WHERE id = ?').get(Number(idMatch[1]));
      return item
        ? Response.json(item, { status: 200 })
        : Response.json({ error: 'Item not found' }, { status: 404 });
    }

    if (req.method === 'DELETE' && idMatch) {
      const info = db.query('DELETE FROM items WHERE id = ?').run(Number(idMatch[1]));
      return info.changes > 0
        ? Response.json({ deleted: true }, { status: 200 })
        : Response.json({ error: 'Item not found' }, { status: 404 });
    }

    return Response.json({ error: 'Not Found' }, { status: 404 });
  },
});

console.log(`Bun SQLite REST server listening on http://127.0.0.1:${port}`);
