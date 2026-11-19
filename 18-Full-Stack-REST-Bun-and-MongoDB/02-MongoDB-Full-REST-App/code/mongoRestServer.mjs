/**
 * Lesson 18.2 Full MongoDB-Style REST Server with Content-Negotiated Responder Strategies
 * Supports JSend (application/json), JSON:API (application/vnd.api+json), and HAL+JSON (application/hal+json).
 */

import http from 'node:http';
import { StorefrontDomainService } from './mongoDriverService.mjs';
import { MqlDatabase } from './mqlStore.mjs';
import { negotiateResponder } from './responderStrategies.mjs';
import {
  BOOKSOMEPLACE_BOOKINGS,
  BOOKSOMEPLACE_PROPERTIES,
  SWEETSCOMPLETE_CUSTOMERS,
  SWEETSCOMPLETE_PRODUCTS,
  SWEETSCOMPLETE_PURCHASES,
} from './sweetsAndBookData.mjs';

export async function createSeededMongoContext() {
  const db = new MqlDatabase('sweetscomplete');
  const service = new StorefrontDomainService(db);
  await service.ensureIndexes();
  db.collection('products').insertMany(SWEETSCOMPLETE_PRODUCTS);
  db.collection('customers').insertMany(SWEETSCOMPLETE_CUSTOMERS);
  db.collection('purchases').insertMany(SWEETSCOMPLETE_PURCHASES);
  db.collection('properties').insertMany(BOOKSOMEPLACE_PROPERTIES);
  db.collection('bookings').insertMany(BOOKSOMEPLACE_BOOKINGS);
  return { db, service };
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const err = new Error('Malformed JSON payload');
    err.status = 400;
    throw err;
  }
}

export function createMongoRestServer(service, db) {
  return http.createServer(async (req, res) => {
    const responder = negotiateResponder(req.headers.accept ?? '');
    const url = new URL(req.url, 'http://127.0.0.1');

    const respond = (status, options) => {
      const rendered = responder.render({ status, link: url.pathname + url.search, ...options });
      const payload = JSON.stringify(rendered.body);
      res.writeHead(status, {
        'content-type': rendered.contentType,
        'content-length': Buffer.byteLength(payload),
      });
      res.end(payload);
    };

    try {
      const productMatch = url.pathname.match(/^\/api\/products\/([^/]+)$/);

      if (req.method === 'GET' && url.pathname === '/api/products') {
        const filter = {};
        const category = url.searchParams.get('category');
        const minPrice = url.searchParams.get('minPrice');
        const excludeCategory = url.searchParams.get('excludeCategory');
        if (category) filter.category = category;
        if (minPrice !== null) filter.price = { $gte: Number(minPrice) };
        if (excludeCategory) filter.category = { $nin: excludeCategory.split(',') };
        const products = await service.findProducts(filter);
        return respond(200, { data: products, resourceType: 'products', idField: 'productKey' });
      }

      if (req.method === 'POST' && url.pathname === '/api/products') {
        const body = await readJsonBody(req);
        const created = await service.createProduct(body);
        return respond(201, { data: created, resourceType: 'products', idField: 'productKey' });
      }

      if (req.method === 'GET' && productMatch) {
        const key = decodeURIComponent(productMatch[1]);
        const list = await service.findProducts({ productKey: key });
        if (!list[0]) return respond(404, { error: `Product '${key}' not found` });
        return respond(200, { data: list[0], resourceType: 'products', idField: 'productKey' });
      }

      if (req.method === 'PUT' && productMatch) {
        const key = decodeURIComponent(productMatch[1]);
        const body = await readJsonBody(req);
        const updated = await service.updateProductByKey(key, body);
        if (!updated) return respond(404, { error: `Product '${key}' not found` });
        return respond(200, { data: updated, resourceType: 'products', idField: 'productKey' });
      }

      if (req.method === 'DELETE' && productMatch) {
        const key = decodeURIComponent(productMatch[1]);
        const ok = await service.deleteProductByKey(key);
        if (!ok) return respond(404, { error: `Product '${key}' not found` });
        return respond(200, { data: { deleted: true, productKey: key }, resourceType: 'products' });
      }

      if (req.method === 'GET' && url.pathname === '/api/properties/near') {
        const lng = Number(url.searchParams.get('lng') ?? '-112.07');
        const lat = Number(url.searchParams.get('lat') ?? '33.51');
        const maxDistance = Number(url.searchParams.get('maxMeters') ?? '50000');
        const matches = await service.findNearbyProperties(lng, lat, maxDistance);
        return respond(200, { data: matches, resourceType: 'properties', idField: 'propertyKey' });
      }

      if (req.method === 'GET' && url.pathname === '/api/properties') {
        const country = url.searchParams.get('country');
        const filter = country ? { 'address.country': country } : {};
        const props = db.collection('properties').find(filter);
        return respond(200, { data: props, resourceType: 'properties', idField: 'propertyKey' });
      }

      if (req.method === 'GET' && url.pathname === '/api/analytics/revenue-by-country') {
        const report = await service.getConfirmedRevenueByCountry();
        return respond(200, { data: report, resourceType: 'revenue', idField: '_id' });
      }

      if (req.method === 'GET' && url.pathname === '/api/analytics/customer-purchases') {
        const report = await service.getCustomerPurchaseSummaries();
        return respond(200, { data: report, resourceType: 'customerPurchases', idField: 'customerKey' });
      }

      return respond(404, { error: `Route ${url.pathname} not found` });
    } catch (err) {
      return respond(err.status ?? 500, { error: err.message });
    }
  });
}
