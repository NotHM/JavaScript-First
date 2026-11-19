/**
 * Unit 18 Project Starter: Dual-Database Full-Stack REST API (SQLite + MQL + Content Negotiation)
 * AZ CTE Standards: 8.3, 11.6–11.8, 16.5–16.6, 17.1–17.13
 *
 * Run tests: node --test 0-student_files/projects/unit-18-dual-db-rest/index.test.mjs
 */

import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';

export class DualDbEngine {
  constructor(sqlitePath = ':memory:') {
    this.sqlDb = new DatabaseSync(sqlitePath);
    this.mongoDocs = new Map([
      ['products', []],
      ['bookings', []],
    ]);
    // TODO [L3 Apply]: Initialize SQLite products & orders tables with PRAGMA foreign_keys = ON
  }

  insertSqlProduct({ sku, title, price_cents, stock }) {
    // TODO [L3 Apply]: Parameterized INSERT with 400 validation & 409 UNIQUE SKU handling
    void sku;
    void title;
    void price_cents;
    void stock;
    return null;
  }

  queryMongoProducts(filter = {}) {
    // TODO [L3 Apply]: Support $gte, $nin, $and, and exact equality over mongoDocs.get('products')
    void filter;
    return [];
  }

  summarizeConfirmedBookings() {
    // TODO [L4 Analyze]: Aggregate confirmed booking revenue per country sorted descending
    return [];
  }

  close() {
    this.sqlDb.close();
  }
}

export function formatRestPayload(acceptHeader, { data = null, error = null, status = 200, link = '/', resourceType = 'products' }) {
  // TODO [L5 Evaluate]: Implement JSend, JSON:API (application/vnd.api+json), and HAL+JSON (application/hal+json)
  void acceptHeader;
  void data;
  void error;
  void status;
  void link;
  void resourceType;
  return { contentType: 'application/json', body: {} };
}

export function createDualDbServer(engine = new DualDbEngine(':memory:')) {
  // TODO [L6 Create]: Wire HTTP routes (/api/sql/products, /api/mongo/products, /api/analytics/revenue)
  const server = http.createServer((_req, res) => {
    res.writeHead(501, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'TODO: implement routes' }));
  });
  server.on('close', () => engine.close());
  return server;
}
