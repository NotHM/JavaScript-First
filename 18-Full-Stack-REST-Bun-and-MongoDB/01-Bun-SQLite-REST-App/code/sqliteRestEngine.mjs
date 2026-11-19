/**
 * Lesson 18.1 Reference Engine:
 * Node 24 `node:sqlite` (DatabaseSync) + `node:http` Full-Stack REST API
 * Demonstrates parameterized SQL, Foreign Key integrity, search, pagination, and HTTP semantics.
 *
 * Run tests: node --test 18-Full-Stack-REST-Bun-and-MongoDB/01-Bun-SQLite-REST-App/code/sqliteRestApp.test.mjs
 */

import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';

function normalizeRow(row) {
  return row ? { ...row } : null;
}

export class SqliteCatalogRepository {
  constructor(dbPath = ':memory:') {
    this.db = new DatabaseSync(dbPath);
    this.initSchema();
  }

  initSchema() {
    this.db.exec(`
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
        customer_email TEXT NOT NULL,
        qty INTEGER NOT NULL CHECK (qty > 0),
        total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
  }

  close() {
    this.db.close();
  }

  createItem({ sku, name, category = 'general', price_cents, stock = 0 }) {
    if (typeof sku !== 'string' || !sku.trim() || typeof name !== 'string' || !name.trim()) {
      const err = new Error('sku and name must be non-empty strings');
      err.status = 400;
      throw err;
    }
    if (!Number.isInteger(price_cents) || price_cents < 0 || !Number.isInteger(stock) || stock < 0) {
      const err = new Error('price_cents and stock must be non-negative integers');
      err.status = 400;
      throw err;
    }
    try {
      const stmt = this.db.prepare(
        'INSERT INTO items (sku, name, category, price_cents, stock) VALUES (?, ?, ?, ?, ?)'
      );
      const info = stmt.run(sku.trim(), name.trim(), String(category).trim() || 'general', price_cents, stock);
      return this.getItemById(Number(info.lastInsertRowid));
    } catch (error) {
      if (String(error.message).includes('UNIQUE constraint')) {
        const conflict = new Error(`SKU "${sku.trim()}" already exists`);
        conflict.status = 409;
        throw conflict;
      }
      throw error;
    }
  }

  getItemById(id) {
    const row = this.db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    return normalizeRow(row);
  }

  listItems({ q = '', category = '', page = 1, limit = 10 } = {}) {
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    const safeLimit = Number.isInteger(limit) && limit > 0 ? Math.min(50, limit) : 10;
    const offset = (safePage - 1) * safeLimit;

    const conditions = [];
    const params = [];
    if (q.trim()) {
      conditions.push('(name LIKE ? OR sku LIKE ?)');
      const pattern = `%${q.trim()}%`;
      params.push(pattern, pattern);
    }
    if (category.trim()) {
      conditions.push('category = ?');
      params.push(category.trim());
    }
    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRow = this.db
      .prepare(`SELECT COUNT(*) AS total FROM items ${whereClause}`)
      .get(...params);
    const rows = this.db
      .prepare(`SELECT * FROM items ${whereClause} ORDER BY id ASC LIMIT ? OFFSET ?`)
      .all(...params, safeLimit, offset)
      .map(normalizeRow);

    return {
      page: safePage,
      limit: safeLimit,
      total: Number(countRow.total),
      items: rows,
    };
  }

  updateItem(id, patch) {
    const existing = this.getItemById(id);
    if (!existing) return null;

    const nextName = patch.name !== undefined ? String(patch.name).trim() : existing.name;
    const nextCategory = patch.category !== undefined ? String(patch.category).trim() : existing.category;
    const nextPrice = patch.price_cents !== undefined ? patch.price_cents : existing.price_cents;
    const nextStock = patch.stock !== undefined ? patch.stock : existing.stock;

    if (!nextName || !Number.isInteger(nextPrice) || nextPrice < 0 || !Number.isInteger(nextStock) || nextStock < 0) {
      const err = new Error('Invalid update payload');
      err.status = 400;
      throw err;
    }

    this.db
      .prepare('UPDATE items SET name = ?, category = ?, price_cents = ?, stock = ? WHERE id = ?')
      .run(nextName, nextCategory, nextPrice, nextStock, id);
    return this.getItemById(id);
  }

  deleteItem(id) {
    try {
      const info = this.db.prepare('DELETE FROM items WHERE id = ?').run(id);
      return info.changes > 0;
    } catch (error) {
      if (String(error.message).includes('FOREIGN KEY constraint')) {
        const conflict = new Error(`Cannot delete item ${id}: referenced by existing orders`);
        conflict.status = 409;
        throw conflict;
      }
      throw error;
    }
  }

  createOrder({ item_id, customer_email, qty }) {
    if (!Number.isInteger(item_id) || !Number.isInteger(qty) || qty <= 0 || typeof customer_email !== 'string' || !customer_email.includes('@')) {
      const err = new Error('Valid item_id, positive integer qty, and customer_email are required');
      err.status = 400;
      throw err;
    }
    const item = this.getItemById(item_id);
    if (!item) {
      const fkErr = new Error(`Foreign key violation: item ${item_id} does not exist`);
      fkErr.status = 404;
      throw fkErr;
    }
    if (item.stock < qty) {
      const conflict = new Error(`Insufficient stock for item ${item.sku}`);
      conflict.status = 409;
      throw conflict;
    }
    const totalCents = item.price_cents * qty;
    this.db.prepare('UPDATE items SET stock = stock - ? WHERE id = ?').run(qty, item_id);
    const info = this.db
      .prepare('INSERT INTO orders (item_id, customer_email, qty, total_cents) VALUES (?, ?, ?, ?)')
      .run(item_id, customer_email.trim(), qty, totalCents);

    return normalizeRow(
      this.db
        .prepare(
          `SELECT o.*, i.sku, i.name AS item_name
           FROM orders o
           JOIN items i ON o.item_id = i.id
           WHERE o.id = ?`
        )
        .get(Number(info.lastInsertRowid))
    );
  }
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const err = new Error('Malformed JSON request body');
    err.status = 400;
    throw err;
  }
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
}

export function createSqliteRestServer(repo = new SqliteCatalogRepository(':memory:')) {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://127.0.0.1');
      const itemMatch = url.pathname.match(/^\/api\/items\/(\d+)$/);

      if (req.method === 'GET' && url.pathname === '/api/health') {
        return sendJson(res, 200, { ok: true, engine: 'node:sqlite' });
      }

      if (req.method === 'GET' && url.pathname === '/api/items') {
        const page = Number(url.searchParams.get('page') ?? '1');
        const limit = Number(url.searchParams.get('limit') ?? '10');
        const data = repo.listItems({
          q: url.searchParams.get('q') ?? '',
          category: url.searchParams.get('category') ?? '',
          page: Number.isFinite(page) ? page : 1,
          limit: Number.isFinite(limit) ? limit : 10,
        });
        return sendJson(res, 200, data);
      }

      if (req.method === 'POST' && url.pathname === '/api/items') {
        const body = await readJsonBody(req);
        const created = repo.createItem(body);
        return sendJson(res, 201, created);
      }

      if (req.method === 'GET' && itemMatch) {
        const item = repo.getItemById(Number(itemMatch[1]));
        return item ? sendJson(res, 200, item) : sendJson(res, 404, { error: 'Item not found' });
      }

      if (req.method === 'PUT' && itemMatch) {
        const body = await readJsonBody(req);
        const updated = repo.updateItem(Number(itemMatch[1]), body);
        return updated ? sendJson(res, 200, updated) : sendJson(res, 404, { error: 'Item not found' });
      }

      if (req.method === 'DELETE' && itemMatch) {
        const deleted = repo.deleteItem(Number(itemMatch[1]));
        return deleted ? sendJson(res, 200, { deleted: true }) : sendJson(res, 404, { error: 'Item not found' });
      }

      if (req.method === 'POST' && url.pathname === '/api/orders') {
        const body = await readJsonBody(req);
        const order = repo.createOrder(body);
        return sendJson(res, 201, order);
      }

      return sendJson(res, 404, { error: 'Route not found' });
    } catch (error) {
      return sendJson(res, error.status ?? 500, { error: error.message });
    }
  });

  server.on('close', () => repo.close());
  return server;
}
