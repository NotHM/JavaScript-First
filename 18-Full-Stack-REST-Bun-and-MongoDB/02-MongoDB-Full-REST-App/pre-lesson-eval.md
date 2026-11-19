# Pre-Lesson 18.2 Evaluation: MongoDB REST Architecture (`Std 8.3, 16.5, 17.10`)

**Timing:** 4 minutes (Complete BEFORE reading or slides) | **Score:** `____ / 4`

1. **`[L1 Remember | Std 16.5]`** Write the MQL query to find `sweetscomplete` products where `price >= 5` AND `category` is NOT in `['chocolate']`:  
   > *(Your query object)*

2. **`[L2 Understand | Std 16.5]`** Why does storing `{ type: 'Point', coordinates: [33.51, -112.07] }` for Phoenix, AZ (`lat = 33.51, lng = -112.07`) break MongoDB `2dsphere` GeoJSON queries?  
   > *(Your explanation)*

3. **`[L2 Understand | Std 17.10]`** Match each HTTP `Accept` MIME type to its REST response style (`JSend`, `JSON:API`, `HAL+JSON`):  
   - `application/hal+json` -> `______________`  
   - `application/vnd.api+json` -> `______________`  
   - `application/json` -> `______________`

4. **`[L4 Analyze | Std 16.5]`** What error code does MongoDB throw when inserting two documents with the same `productKey` if `{ unique: true }` indexing is configured?  
   > *(Your answer)*
