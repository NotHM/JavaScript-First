/**
 * Student Lesson 18.2 TDD Verification Suite (RED -> GREEN)
 * Run: node --test 0-student_files/18-dual-db-rest/mongoResponderLab.test.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  SAMPLE_BOOKINGS,
  SAMPLE_PRODUCTS,
  filterProducts,
  renderNegotiatedResponse,
  summarizeRevenueByCountry,
} from './mongoResponderLab.mjs';

test('filterProducts supports exact matches alongside $gte and $nin MQL operators', () => {
  const all = filterProducts(SAMPLE_PRODUCTS, {});
  assert.equal(all.length, SAMPLE_PRODUCTS.length);

  const filtered = filterProducts(SAMPLE_PRODUCTS, {
    price: { $gte: 5 },
    category: { $nin: ['chocolate'] },
  });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].productKey, 'birthday_cake');

  const pies = filterProducts(SAMPLE_PRODUCTS, { category: 'pie' });
  assert.equal(pies.length, 1);
  assert.equal(pies[0].skuNumber, 'PUMP555');
});

test('summarizeRevenueByCountry aggregates only confirmed bookings and sorts descending', () => {
  const summary = summarizeRevenueByCountry(SAMPLE_BOOKINGS);
  assert.deepEqual(summary, [
    { _id: 'US', totalRevenue: 645 },
    { _id: 'IN', totalRevenue: 285 },
  ]);
});

test('renderNegotiatedResponse selects JSend, JSON:API, and HAL+JSON cleanly via Accept header', () => {
  const sample = SAMPLE_PRODUCTS.slice(0, 1);

  const jsend = renderNegotiatedResponse('application/json', {
    data: sample,
    link: '/api/products',
    resourceType: 'products',
    idField: 'productKey',
  });
  assert.match(jsend.contentType, /application\/json/);
  assert.equal(jsend.body.status, 'success');
  assert.equal(jsend.body.data.products.length, 1);

  const jsonApi = renderNegotiatedResponse('application/vnd.api+json', {
    data: sample,
    link: '/api/products',
    resourceType: 'products',
    idField: 'productKey',
  });
  assert.match(jsonApi.contentType, /application\/vnd\.api\+json/);
  assert.equal(jsonApi.body.links.self, '/api/products');
  assert.equal(jsonApi.body.data[0].id, 'birthday_cake');
  assert.equal(jsonApi.body.data[0].attributes.skuNumber, 'BIRT104');

  const hal = renderNegotiatedResponse('application/hal+json', {
    data: sample,
    link: '/api/products',
    resourceType: 'products',
    idField: 'productKey',
  });
  assert.match(hal.contentType, /application\/hal\+json/);
  assert.equal(hal.body._links.self.href, '/api/products');
  assert.equal(hal.body._embedded.products.length, 1);
});
