/**
 * Lesson 18.2 Seed Datasets:
 * Modeled faithfully after HansUXdev/Learn-MongoDB-4.x:
 *   - sweetscomplete: products, customers, purchases
 *   - booksomeplace:  properties (with GeoJSON Point + embedded rooms), bookings
 */

export const SWEETSCOMPLETE_PRODUCTS = [
  {
    productKey: 'birthday_cake',
    skuNumber: 'BIRT104',
    category: 'cake',
    title: 'Birthday Cake',
    description: 'Layered vanilla sponge cake with buttercream frosting.',
    price: 9.99,
    unit: 'box',
    costPerUnit: 8.99,
    unitsOnHand: 144,
  },
  {
    productKey: 'black_forest_fudge',
    skuNumber: 'BLAC207',
    category: 'chocolate',
    title: 'Black Forest Fudge',
    description: 'Dark chocolate fudge swirled with tart cherry pieces.',
    price: 6.5,
    unit: 'box',
    costPerUnit: 4.1,
    unitsOnHand: 85,
  },
  {
    productKey: 'pumpkin_pie',
    skuNumber: 'PUMP555',
    category: 'pie',
    title: 'Pumpkin Pie',
    description: 'Spiced autumn pumpkin custard in flaky pastry crust.',
    price: 4.99,
    unit: 'pie',
    costPerUnit: 3.1,
    unitsOnHand: 60,
  },
  {
    productKey: 'apple_pie',
    skuNumber: 'APPL501',
    category: 'pie',
    title: 'Apple Pie',
    description: 'Cinnamon orchard apple pie baked golden brown.',
    price: 4.99,
    unit: 'pie',
    costPerUnit: 2.95,
    unitsOnHand: 112,
  },
];

export const SWEETSCOMPLETE_CUSTOMERS = [
  {
    customerKey: 'PATRYODE9823',
    firstName: 'Patrina',
    lastName: 'Yoder',
    email: 'pyoder100@cci.example',
    city: 'Washington',
    stateProvince: 'DC',
    country: 'US',
    postalCode: '20228',
    secondaryEmailAddresses: ['pyoder@orstom.example'],
  },
  {
    customerKey: 'KIRSJACO3439',
    firstName: 'Kirsten',
    lastName: 'Jacobs',
    email: 'kjacobs197@glasnet.example',
    city: 'Phoenix',
    stateProvince: 'AZ',
    country: 'US',
    postalCode: '85004',
    secondaryEmailAddresses: [],
  },
];

export const SWEETSCOMPLETE_PURCHASES = [
  {
    transactionId: '20191220KJ5597',
    dateOfPurchase: '2019-12-20 11:48:07',
    extendedPrice: 149.7,
    customerKey: 'KIRSJACO3439',
    country: 'US',
    productsPurchased: {
      pumpkin_pie: { productKey: 'pumpkin_pie', qtyPurchased: 10, price: 4.99 },
      apple_pie: { productKey: 'apple_pie', qtyPurchased: 20, price: 4.99 },
    },
  },
  {
    transactionId: '20200214PY1022',
    dateOfPurchase: '2020-02-14 09:15:00',
    extendedPrice: 99.9,
    customerKey: 'PATRYODE9823',
    country: 'US',
    productsPurchased: {
      birthday_cake: { productKey: 'birthday_cake', qtyPurchased: 10, price: 9.99 },
    },
  },
];

export const BOOKSOMEPLACE_PROPERTIES = [
  {
    propertyKey: 'PASS6323',
    partnerKey: 'LAZYJCUM9702',
    propName: 'Lakeside Stay',
    propInfo: {
      type: 'inn',
      chain: 'Hospitality International',
      rating: 4,
      facilities: ['WiFi', 'free parking', 'business center'],
      currency: 'USD',
      taxFee: 0.12,
    },
    address: {
      streetAddress: '3659 Little Woods Street',
      city: 'Edmond',
      stateProvince: 'OK',
      country: 'US',
      postalCode: '73012',
      latitude: 35.6215,
      longitude: -97.4733,
      // GeoJSON coordinates strictly follow [longitude, latitude] order!
      geo_spatial: { type: 'Point', coordinates: [-97.4733, 35.6215] },
    },
    rooms: [
      { roomTypeKey: 'aa60', type: 'standard', view: 'lake', numAvailable: 5, price: 119.0 },
      { roomTypeKey: 'bb12', type: 'premium', view: 'lake', numAvailable: 2, price: 189.0 },
    ],
    totalBooked: 14,
  },
  {
    propertyKey: 'DESE8810',
    partnerKey: 'SONORAN100',
    propName: 'Sonoran Desert Lodge',
    propInfo: {
      type: 'resort',
      chain: 'Southwest Retreats',
      rating: 5,
      facilities: ['outdoor pool', 'WiFi', 'free parking'],
      currency: 'USD',
      taxFee: 0.14,
    },
    address: {
      streetAddress: '410 Camelback Rd',
      city: 'Phoenix',
      stateProvince: 'AZ',
      country: 'US',
      postalCode: '85016',
      latitude: 33.5092,
      longitude: -112.0676,
      geo_spatial: { type: 'Point', coordinates: [-112.0676, 33.5092] },
    },
    rooms: [
      { roomTypeKey: 'sd01', type: 'poolside', view: 'canyon', numAvailable: 8, price: 215.0 },
    ],
    totalBooked: 27,
  },
  {
    propertyKey: 'GANG4401',
    partnerKey: 'INDOHOST22',
    propName: 'Howrah Riverfront Suites',
    propInfo: {
      type: 'hotel',
      chain: 'Bengal Heritage',
      rating: 4,
      facilities: ['WiFi', 'indoor pool'],
      currency: 'INR',
      taxFee: 0.18,
    },
    address: {
      streetAddress: '2184 Riverfront Lane',
      city: 'Howrah',
      stateProvince: 'WB',
      country: 'IN',
      postalCode: '711310',
      latitude: 22.5244,
      longitude: 88.1669,
      geo_spatial: { type: 'Point', coordinates: [88.1669, 22.5244] },
    },
    rooms: [
      { roomTypeKey: 'hr10', type: 'standard', view: 'river', numAvailable: 12, price: 95.0 },
    ],
    totalBooked: 19,
  },
];

export const BOOKSOMEPLACE_BOOKINGS = [
  {
    bookingKey: '20190710SCOT',
    customer: {
      customerKey: 'ROSSSCOT7408',
      customerName: { first: 'Rossie', last: 'Scott' },
      customerAddr: { city: 'Sahapur', country: 'IN' },
      custParty: [{ name: { first: 'Kyle', last: 'Zuniga' } }],
    },
    property: { propertyKey: 'GANG4401', propertyName: 'Howrah Riverfront Suites' },
    bookingInfo: {
      arrivalDate: '2025-07-10 15:00',
      departureDate: '2025-07-13 11:00',
      reservationStatus: 'confirmed',
      paymentStatus: 'confirmed',
    },
    totalPrice: 285.0,
  },
  {
    bookingKey: '20250401JACO',
    customer: {
      customerKey: 'KIRSJACO3439',
      customerName: { first: 'Kirsten', last: 'Jacobs' },
      customerAddr: { city: 'Phoenix', country: 'US' },
      custParty: [],
    },
    property: { propertyKey: 'DESE8810', propertyName: 'Sonoran Desert Lodge' },
    bookingInfo: {
      arrivalDate: '2025-04-01 15:00',
      departureDate: '2025-04-04 11:00',
      reservationStatus: 'confirmed',
      paymentStatus: 'confirmed',
    },
    totalPrice: 645.0,
  },
  {
    bookingKey: '20250512YODE',
    customer: {
      customerKey: 'PATRYODE9823',
      customerName: { first: 'Patrina', last: 'Yoder' },
      customerAddr: { city: 'Washington', country: 'US' },
      custParty: [],
    },
    property: { propertyKey: 'PASS6323', propertyName: 'Lakeside Stay' },
    bookingInfo: {
      arrivalDate: '2025-05-12 15:00',
      departureDate: '2025-05-14 11:00',
      reservationStatus: 'pending',
      paymentStatus: 'pending',
    },
    totalPrice: 238.0,
  },
];
