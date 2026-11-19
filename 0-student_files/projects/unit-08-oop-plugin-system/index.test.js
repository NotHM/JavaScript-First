/**
 * Unit 8 Project TDD Suite (RED -> GREEN)
 * Run: node --test 0-student_files/projects/unit-08-oop-plugin-system/index.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  Exporter,
  JsonExporter,
  XmlExporter,
  createExporter,
  ExportHistory,
} = require('./index.js');

test('Exporter enforces abstract contract against direct instantiation', () => {
  assert.throws(() => new Exporter(), /Abstract/);
});

test('JsonExporter and XmlExporter serialize polymorphically and escape XML characters', () => {
  const sample = { id: 101, title: 'JS & <Patterns>' };
  const jsonExp = new JsonExporter();
  const xmlExp = new XmlExporter();

  assert.equal(jsonExp instanceof Exporter, true);
  assert.equal(xmlExp instanceof Exporter, true);

  const jsonOut = jsonExp.serialize(sample);
  assert.deepEqual(JSON.parse(jsonOut), sample);

  const xmlOut = xmlExp.serialize(sample);
  assert.equal(typeof xmlOut, 'string');
  assert.match(xmlOut, /^<record>.*<\/record>$/s);
  assert.match(xmlOut, /<id>101<\/id>/);
  assert.match(xmlOut, /<title>JS &amp; &lt;Patterns&gt;<\/title>/);
});

test('createExporter factory instantiates JsonExporter or XmlExporter and rejects unsupported formats', () => {
  assert.equal(createExporter('json') instanceof JsonExporter, true);
  assert.equal(createExporter('xml') instanceof XmlExporter, true);
  assert.throws(() => createExporter('yaml'), Error);
});

test('ExportHistory iterates recorded payloads via Symbol.iterator', () => {
  const history = new ExportHistory();
  history.add('{"id":1}');
  history.add('<record><id>2</id></record>');
  assert.deepEqual([...history], ['{"id":1}', '<record><id>2</id></record>']);
});
