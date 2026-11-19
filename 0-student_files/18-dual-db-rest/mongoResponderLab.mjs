/**
 * Student Lesson 18.2 Lab: MQL Filtering, Aggregation & Content-Negotiated Responders
 * Modeled after HansUXdev/Learn-MongoDB-4.x
 * AZ CTE Standards: 8.3, 16.5, 17.10–17.13
 *
 * Run:
 *   node 0-student_files/18-dual-db-rest/mongoResponderLab.mjs
 */

import assert from 'node:assert/strict';

export const SAMPLE_PRODUCTS = [
  { productKey: 'birthday_cake', skuNumber: 'BIRT104', category: 'cake', title: 'Birthday Cake', price: 9.99 },
  { productKey: 'black_forest_fudge', skuNumber: 'BLAC207', category: 'chocolate', title: 'Black Forest Fudge', price: 6.5 },
  { productKey: 'pumpkin_pie', skuNumber: 'PUMP555', category: 'pie', title: 'Pumpkin Pie', price: 4.99 },
];

export const SAMPLE_BOOKINGS = [
  { bookingKey: 'B1', customer: { customerAddr: { country: 'US' } }, bookingInfo: { paymentStatus: 'confirmed' }, totalPrice: 645 },
  { bookingKey: 'B2', customer: { customerAddr: { country: 'IN' } }, bookingInfo: { paymentStatus: 'confirmed' }, totalPrice: 285 },
  { bookingKey: 'B3', customer: { customerAddr: { country: 'US' } }, bookingInfo: { paymentStatus: 'pending' }, totalPrice: 238 },
];

export function filterProducts(products, query = {}) {
  // TODO [L3 Apply]: Support exact field matches plus { $gte } and { $nin } operators
  void products;
  void query;
  return [];
}

export function summarizeRevenueByCountry(bookings) {
  // TODO [L3 Apply]: Match bookingInfo.paymentStatus === 'confirmed', group by customer.customerAddr.country,
  // sum totalPrice, and sort descending by totalRevenue -> [{ _id: 'US', totalRevenue: 645 }, ...]
  void bookings;
  return [];
}

export function renderNegotiatedResponse(acceptHeader, { data, link = '/', resourceType = 'products', idField = 'productKey' }) {
  // TODO [L5 Evaluate]:
  // - application/vnd.api+json -> JSON:API ({ links: { self }, data: [{ type, id, attributes }] })
  // - application/hal+json     -> HAL+JSON ({ _links: { self: { href } }, _embedded: { [resourceType]: [...] } })
  // - default / application/json -> JSend ({ status: 'success', link, data: { [resourceType]: data } })
  void acceptHeader;
  void data;
  void link;
  void resourceType;
  void idField;
  return { contentType: 'application/json', body: {} };
}

console.log('Complete mongoResponderLab.mjs TODOs, then uncomment verification assertions!');
/*
const filtered = filterProducts(SAMPLE_PRODUCTS, { price: { $gte: 5 }, category: { $nin: ['chocolate'] } });
assert.equal(filtered.length, 1);
assert.equal(filtered[0].productKey, 'birthday_cake');

const rev = summarizeRevenueByCountry(SAMPLE_BOOKINGS);
assert.deepEqual(rev, [
  { _id: 'US', totalRevenue: 645 },
  { _id: 'IN', totalRevenue: 285 },
]);

const jsonApi = renderNegotiatedResponse('application/vnd.api+json', {
  data: filtered,
  link: '/api/products',
  resourceType: 'products',
  idField: 'productKey',
});
assert.equal(jsonApi.contentType, 'application/vnd.api+json');
assert.equal(jsonApi.body.data[0].id, 'birthday_cake');
console.log('Lesson 18.2 Student Lab passed!');
*/
void assert;
