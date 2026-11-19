/**
 * Lesson 18.2 Offline MQL Engine + Entity/Domain Layers:
 * Faithful pure-JS implementation of MongoDB CRUD, dot-notation nested field queries,
 * unique indexes (E11000), GeoJSON 2dsphere $near distance queries, and
 * aggregation pipelines ($match, $lookup, $group, $sort, $project, $limit).
 */

export function getNestedPath(obj, dotPath) {
  if (!obj || typeof obj !== 'object') return undefined;
  if (Object.hasOwn(obj, dotPath)) return obj[dotPath];
  const parts = dotPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      // MongoDB traverses arrays of subdocuments transparently (e.g. 'rooms.type')
      const values = current.map((el) => el?.[part]).filter((v) => v !== undefined);
      return values;
    }
    current = current[part];
  }
  return current;
}

export function haversineMeters([lon1, lat1], [lon2, lat2]) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function matchesCondition(docValue, condition) {
  if (condition && typeof condition === 'object' && !Array.isArray(condition) && !(condition instanceof RegExp)) {
    const ops = Object.entries(condition);
    return ops.every(([op, target]) => {
      if (op === '$gte') return typeof docValue === 'number' && docValue >= target;
      if (op === '$gt') return typeof docValue === 'number' && docValue > target;
      if (op === '$lte') return typeof docValue === 'number' && docValue <= target;
      if (op === '$lt') return typeof docValue === 'number' && docValue < target;
      if (op === '$ne') return docValue !== target;
      if (op === '$in') {
        return Array.isArray(docValue)
          ? docValue.some((v) => target.includes(v))
          : target.includes(docValue);
      }
      if (op === '$nin') {
        return Array.isArray(docValue)
          ? !docValue.some((v) => target.includes(v))
          : !target.includes(docValue);
      }
      if (op === '$near') {
        const coords = docValue?.coordinates;
        const targetCoords = target?.$geometry?.coordinates;
        if (!Array.isArray(coords) || !Array.isArray(targetCoords)) return false;
        const dist = haversineMeters(coords, targetCoords);
        return target.$maxDistance !== undefined ? dist <= target.$maxDistance : true;
      }
      return JSON.stringify(docValue) === JSON.stringify(condition);
    });
  }

  if (condition instanceof RegExp) {
    return typeof docValue === 'string' && condition.test(docValue);
  }
  if (Array.isArray(docValue)) {
    return docValue.includes(condition);
  }
  return docValue === condition;
}

export function matchesFilter(doc, filter = {}) {
  for (const [key, val] of Object.entries(filter)) {
    if (key === '$and') {
      if (!Array.isArray(val) || !val.every((sub) => matchesFilter(doc, sub))) return false;
      continue;
    }
    if (key === '$or') {
      if (!Array.isArray(val) || !val.some((sub) => matchesFilter(doc, sub))) return false;
      continue;
    }
    const docVal = getNestedPath(doc, key);
    if (!matchesCondition(docVal, val)) return false;
  }
  return true;
}

function setNestedPath(target, dotPath, value) {
  const parts = dotPath.split('.');
  let cur = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = structuredClone(value);
}

export class MqlCollection {
  constructor(name, db) {
    this.name = name;
    this.db = db;
    this.docs = [];
    this.seq = 1;
    this.uniqueIndexes = [];
  }

  createIndex(keySpec, options = {}) {
    const keys = Object.keys(keySpec);
    if (options.unique) {
      // Check existing documents for duplicate values before registering unique index
      const seen = new Set();
      for (const doc of this.docs) {
        const composite = JSON.stringify(keys.map((k) => getNestedPath(doc, k)));
        if (seen.has(composite)) {
          const err = new Error(`E11000 duplicate key error index: ${this.name}.${keys.join('_')}`);
          err.code = 11000;
          throw err;
        }
        seen.add(composite);
      }
      this.uniqueIndexes.push(keys);
    }
    return `${keys.join('_')}_1`;
  }

  #assertUnique(candidate, ignoreId = null) {
    for (const keys of this.uniqueIndexes) {
      const candidateKey = JSON.stringify(keys.map((k) => getNestedPath(candidate, k)));
      const duplicate = this.docs.find(
        (d) => d._id !== ignoreId && JSON.stringify(keys.map((k) => getNestedPath(d, k))) === candidateKey
      );
      if (duplicate) {
        const err = new Error(`E11000 duplicate key error collection: ${this.name} index: ${keys.join('_')}`);
        err.code = 11000;
        err.status = 409;
        throw err;
      }
    }
  }

  insertOne(doc) {
    const saved = structuredClone({ _id: doc._id ?? `mql_${this.seq++}`, ...doc });
    this.#assertUnique(saved);
    this.docs.push(saved);
    return { acknowledged: true, insertedId: saved._id, document: structuredClone(saved) };
  }

  insertMany(docs) {
    const insertedIds = [];
    for (const d of docs) {
      insertedIds.push(this.insertOne(d).insertedId);
    }
    return { acknowledged: true, insertedCount: insertedIds.length, insertedIds };
  }

  find(filter = {}, projection = null) {
    let matched = this.docs.filter((d) => matchesFilter(d, filter));
    // If $near query is present, sort closest first (MongoDB 2dsphere semantics)
    const nearEntry = Object.entries(filter).find(([, cond]) => cond && typeof cond === 'object' && cond.$near);
    if (nearEntry) {
      const [field, cond] = nearEntry;
      const origin = cond.$near.$geometry.coordinates;
      matched = [...matched].sort((a, b) => {
        const da = haversineMeters(getNestedPath(a, field).coordinates, origin);
        const db = haversineMeters(getNestedPath(b, field).coordinates, origin);
        return da - db;
      });
    }
    return matched.map((d) => this.#applyProjection(d, projection));
  }

  findOne(filter = {}, projection = null) {
    const results = this.find(filter, projection);
    return results[0] ?? null;
  }

  #applyProjection(doc, projection) {
    const cloned = structuredClone(doc);
    if (!projection || Object.keys(projection).length === 0) return cloned;
    const entries = Object.entries(projection);
    const inclusions = entries.filter(([k, v]) => k !== '_id' && v === 1);
    if (inclusions.length > 0) {
      const out = projection._id === 0 ? {} : { _id: cloned._id };
      for (const [k] of inclusions) {
        const val = getNestedPath(cloned, k);
        if (val !== undefined) setNestedPath(out, k, val);
      }
      return out;
    }
    for (const [k, v] of entries) {
      if (v === 0) delete cloned[k];
    }
    return cloned;
  }

  updateOne(filter, updateDoc) {
    const idx = this.docs.findIndex((d) => matchesFilter(d, filter));
    if (idx === -1) return { matchedCount: 0, modifiedCount: 0 };

    const candidate = structuredClone(this.docs[idx]);
    if (updateDoc.$set) {
      for (const [k, v] of Object.entries(updateDoc.$set)) {
        setNestedPath(candidate, k, v);
      }
    }
    if (updateDoc.$mul) {
      for (const [k, factor] of Object.entries(updateDoc.$mul)) {
        const prev = getNestedPath(candidate, k);
        if (typeof prev === 'number') setNestedPath(candidate, k, Number((prev * factor).toFixed(4)));
      }
    }
    if (updateDoc.$push) {
      for (const [k, item] of Object.entries(updateDoc.$push)) {
        const arr = getNestedPath(candidate, k);
        if (Array.isArray(arr)) arr.push(structuredClone(item));
      }
    }
    this.#assertUnique(candidate, candidate._id);
    this.docs[idx] = candidate;
    return { matchedCount: 1, modifiedCount: 1 };
  }

  deleteOne(filter) {
    const idx = this.docs.findIndex((d) => matchesFilter(d, filter));
    if (idx === -1) return { deletedCount: 0 };
    this.docs.splice(idx, 1);
    return { deletedCount: 1 };
  }

  aggregate(pipeline = []) {
    let stream = this.docs.map((d) => structuredClone(d));

    for (const stage of pipeline) {
      if (stage.$match) {
        stream = stream.filter((doc) => matchesFilter(doc, stage.$match));
      } else if (stage.$lookup) {
        const { from, localField, foreignField, as } = stage.$lookup;
        const targetCol = this.db.collection(from);
        stream = stream.map((doc) => {
          const localVal = getNestedPath(doc, localField);
          const matches = targetCol.docs
            .filter((foreignDoc) => getNestedPath(foreignDoc, foreignField) === localVal)
            .map((m) => structuredClone(m));
          return { ...doc, [as]: matches };
        });
      } else if (stage.$group) {
        const { _id: groupExpr, ...accumulators } = stage.$group;
        const groups = new Map();
        for (const doc of stream) {
          const keyVal = typeof groupExpr === 'string' && groupExpr.startsWith('$')
            ? getNestedPath(doc, groupExpr.slice(1))
            : groupExpr;
          const mapKey = JSON.stringify(keyVal);
          if (!groups.has(mapKey)) groups.set(mapKey, { _id: keyVal, docs: [] });
          groups.get(mapKey).docs.push(doc);
        }
        stream = [...groups.values()].map(({ _id, docs }) => {
          const row = { _id };
          for (const [outField, expr] of Object.entries(accumulators)) {
            if (expr.$sum !== undefined) {
              if (expr.$sum === 1) {
                row[outField] = docs.length;
              } else if (typeof expr.$sum === 'string' && expr.$sum.startsWith('$')) {
                const pathName = expr.$sum.slice(1);
                row[outField] = Number(
                  docs.reduce((acc, d) => acc + Number(getNestedPath(d, pathName) ?? 0), 0).toFixed(2)
                );
              }
            } else if (expr.$avg !== undefined && typeof expr.$avg === 'string' && expr.$avg.startsWith('$')) {
              const pathName = expr.$avg.slice(1);
              const total = docs.reduce((acc, d) => acc + Number(getNestedPath(d, pathName) ?? 0), 0);
              row[outField] = docs.length ? Number((total / docs.length).toFixed(2)) : 0;
            }
          }
          return row;
        });
      } else if (stage.$project) {
        stream = stream.map((doc) => {
          const projected = {};
          for (const [field, spec] of Object.entries(stage.$project)) {
            if (spec === 1) {
              const val = getNestedPath(doc, field);
              if (val !== undefined) setNestedPath(projected, field, val);
            } else if (typeof spec === 'string' && spec.startsWith('$')) {
              projected[field] = getNestedPath(doc, spec.slice(1));
            }
          }
          if (stage.$project._id !== 0 && doc._id !== undefined) projected._id = doc._id;
          return projected;
        });
      } else if (stage.$sort) {
        const sortEntries = Object.entries(stage.$sort);
        stream = [...stream].sort((a, b) => {
          for (const [field, dir] of sortEntries) {
            const va = getNestedPath(a, field);
            const vb = getNestedPath(b, field);
            if (va < vb) return dir >= 0 ? -1 : 1;
            if (va > vb) return dir >= 0 ? 1 : -1;
          }
          return 0;
        });
      } else if (stage.$limit) {
        stream = stream.slice(0, stage.$limit);
      }
    }

    return stream;
  }
}

export class MqlDatabase {
  constructor(name = 'sweetscomplete') {
    this.name = name;
    this.collections = new Map();
  }

  collection(colName) {
    if (!this.collections.has(colName)) {
      this.collections.set(colName, new MqlCollection(colName, this));
    }
    return this.collections.get(colName);
  }
}

/**
 * Entity & Domain Layers (modeled on Learn-MongoDB-4.x chapters/04-06)
 */
export class ProductEntity {
  static validate(input) {
    if (!input || typeof input !== 'object') {
      const err = new Error('Product payload must be an object');
      err.status = 400;
      throw err;
    }
    const required = ['productKey', 'skuNumber', 'category', 'title'];
    for (const field of required) {
      if (typeof input[field] !== 'string' || !input[field].trim()) {
        const err = new Error(`ProductEntity validation failed: '${field}' is required`);
        err.status = 400;
        throw err;
      }
    }
    if (typeof input.price !== 'number' || Number.isNaN(input.price) || input.price < 0) {
      const err = new Error("ProductEntity validation failed: 'price' must be a non-negative number");
      err.status = 400;
      throw err;
    }
    return {
      productKey: input.productKey.trim(),
      skuNumber: input.skuNumber.trim(),
      category: input.category.trim(),
      title: input.title.trim(),
      description: String(input.description ?? '').trim(),
      price: Number(input.price),
      unit: String(input.unit ?? 'unit').trim(),
      costPerUnit: Number(input.costPerUnit ?? 0),
      unitsOnHand: Number(input.unitsOnHand ?? 0),
    };
  }
}
