# Post-Lesson 18.2 Evaluation: Exit Ticket (`Std 8.3, 16.5, 17.1–17.13`)

**Timing:** 5 minutes (Complete AFTER Lesson 18.2 instruction & lab) | **Score:** `____ / 5`

1. **`[L2 Understand | Std 17.2]`** Contrast the responsibility of **`ProductEntity`** vs. **`StorefrontDomainService`** in a `Learn-MongoDB-4.x`-style application:  
   > *(Your answer)*

2. **`[L3 Apply | Std 16.5]`** Write the MQL filter using dot notation to find `booksomeplace` properties in `'US'` that have at least one embedded room with `view: 'lake'`:  
   > *(Your query)*

3. **`[L3 Apply | Std 16.5]`** Describe what each stage in this pipeline outputs:  
   `[ { $match: { 'bookingInfo.paymentStatus': 'confirmed' } }, { $group: { _id: '$customer.customerAddr.country', totalRevenue: { $sum: '$totalPrice' } } }, { $sort: { totalRevenue: -1 } } ]`  
   > *(Your walkthrough)*

4. **`[L3 Apply | Std 17.10]`** Which `ResponderStrategy` subclass and `Content-Type` header should respond to:  
   - `Accept: application/vnd.api+json` -> `____________________________________`  
   - `Accept: application/hal+json` -> `____________________________________`

5. **`[L4 Analyze | Std 16.5]`** A developer stores London coordinates (`lat = 51.5072, lng = -0.1276`) as `{ type: 'Point', coordinates: [51.5072, -0.1276] }`. Why do `$near` searches near London return zero matches, and how do you fix it?  
   > *(Your diagnosis & fix)*
