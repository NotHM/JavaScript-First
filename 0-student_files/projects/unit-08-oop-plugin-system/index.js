/**
 * Unit 8 Project Starter: Pluggable OOP Exporter & Pattern System (AZ CTE Std 17.0)
 * Run: node 0-student_files/projects/unit-08-oop-plugin-system/index.js
 */
class Exporter {
  constructor() {
    if (new.target === Exporter) {
      throw new Error('Abstract class Exporter cannot be instantiated directly');
    }
  }
  serialize(record) {
    throw new Error('Subclasses must implement serialize(record)');
  }
}

class JsonExporter extends Exporter {
  // TODO [L3 Apply | 17.8, 17.11]: Return JSON.stringify(record)
}

class XmlExporter extends Exporter {
  // TODO [L3 Apply | 17.8, 17.11]: Return <record><key>val</key>...</record> escaping XML chars
}

function createExporter(format) {
  // TODO [L3 Apply | 17.13]: Factory returning JsonExporter or XmlExporter cleanly
  void format;
  return null;
}

class ExportHistory {
  #entries = [];
  add(payload) { this.#entries.push(payload); }
  *[Symbol.iterator]() { yield* this.#entries; }
}

module.exports = { Exporter, JsonExporter, XmlExporter, createExporter, ExportHistory };
