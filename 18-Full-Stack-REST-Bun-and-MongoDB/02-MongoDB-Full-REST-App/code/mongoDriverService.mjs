/**
 * Lesson 18.2 Domain Service (Compatible with Official `mongodb` MongoClient AND Offline MqlDatabase)
 * Modeled on Learn-MongoDB-4.x `sweetscomplete.domain.product` & `booksomeplace` services.
 */

import { ProductEntity } from './mqlStore.mjs';

export class StorefrontDomainService {
  constructor(db) {
    this.db = db;
  }

  async ensureIndexes() {
    await this.db.collection('products').createIndex({ productKey: 1 }, { unique: true });
    await this.db.collection('products').createIndex({ skuNumber: 1 }, { unique: true });
    await this.db.collection('customers').createIndex({ customerKey: 1 }, { unique: true });
    await this.db.collection('properties').createIndex({ propertyKey: 1 }, { unique: true });
  }

  async createProduct(payload) {
    const cleanEntity = ProductEntity.validate(payload);
    const res = await this.db.collection('products').insertOne(cleanEntity);
    return res.document ?? this.db.collection('products').findOne({ _id: res.insertedId });
  }

  async findProducts(filter = {}, projection = null) {
    return this.db.collection('products').find(filter, projection);
  }

  async updateProductByKey(productKey, patch) {
    const res = await this.db.collection('products').updateOne({ productKey }, { $set: patch });
    if (res.modifiedCount === 0 && res.matchedCount === 0) return null;
    return this.db.collection('products').findOne({ productKey });
  }

  async deleteProductByKey(productKey) {
    const res = await this.db.collection('products').deleteOne({ productKey });
    return res.deletedCount > 0;
  }

  /**
   * Learn-MongoDB-4.x Chapter 09 Revenue by Country Aggregation Pipeline:
   * $match confirmed bookings -> $group by customer.customerAddr.country -> $sort
   */
  async getConfirmedRevenueByCountry() {
    return this.db.collection('bookings').aggregate([
      { $match: { 'bookingInfo.paymentStatus': 'confirmed' } },
      {
        $group: {
          _id: '$customer.customerAddr.country',
          totalRevenue: { $sum: '$totalPrice' },
          bookingCount: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);
  }

  /**
   * Learn-MongoDB-4.x Chapter 10 $lookup Aggregation Pipeline:
   * Joins customers with purchases by customerKey and computes total spent.
   */
  async getCustomerPurchaseSummaries() {
    return this.db.collection('customers').aggregate([
      {
        $lookup: {
          from: 'purchases',
          localField: 'customerKey',
          foreignField: 'customerKey',
          as: 'orders',
        },
      },
      {
        $project: {
          _id: 0,
          customerKey: 1,
          firstName: 1,
          lastName: 1,
          orders: 1,
        },
      },
      { $sort: { customerKey: 1 } },
    ]);
  }

  /**
   * Learn-MongoDB-4.x Chapter 09 GeoJSON 2dsphere $near query
   */
  async findNearbyProperties(longitude, latitude, maxDistanceMeters = 50000) {
    return this.db.collection('properties').find({
      'address.geo_spatial': {
        $near: {
          $geometry: { type: 'Point', coordinates: [Number(longitude), Number(latitude)] },
          $maxDistance: Number(maxDistanceMeters),
        },
      },
    });
  }
}

/**
 * Optional helper showing real MongoClient connection URI wiring when `mongodb` driver is installed.
 */
export async function connectRealMongoIfAvailable(uri = 'mongodb://127.0.0.1:27017', dbName = 'sweetscomplete') {
  const { MongoClient } = await import('mongodb');
  const client = new MongoClient(uri);
  await client.connect();
  return { client, db: client.db(dbName) };
}
