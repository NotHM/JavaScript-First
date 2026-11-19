/**
 * Teacher Demo 8.2B: Structural Adapter Pattern (Legacy XML/CJS -> Modern JSON Contract)
 * Standards: AZ CTE 17.11, 17.13
 *
 * Run:
 *   node --test 08-OOP-and-Design-Patterns/02-DataFormats-SOLID-Patterns/code/adapterPatternDemo.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

// Adaptee: Legacy SOAP/XML + snake_case CJS vendor module we cannot rewrite directly
class LegacyXmlCourseFeed {
  fetchCourseXml() {
    return [
      '<catalog>',
      '  <course course_id="CTE/CIS 101" credit_hours="1.5">',
      '    <course_title>Node.js &amp; HTTP Foundations</course_title>',
      '    <tag_list>nodejs,http,tdd</tag_list>',
      '  </course>',
      '  <course course_id="CTE/CIS 201" credit_hours="1.5">',
      '    <course_title>OOP &amp; Security Hardening</course_title>',
      '    <tag_list>oop,owasp,crypto</tag_list>',
      '  </course>',
      '</catalog>',
    ].join('\n');
  }
}

function unescapeXml(raw) {
  return String(raw)
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

// Target Interface expected by modern REST/UI consumers:
//   getCourses(): Array<{ id: string, title: string, credits: number, tags: string[] }>
class XmlToJsonCatalogAdapter {
  #legacyFeed;

  constructor(legacyFeed) {
    if (!legacyFeed || typeof legacyFeed.fetchCourseXml !== 'function') {
      throw new TypeError('XmlToJsonCatalogAdapter requires fetchCourseXml()');
    }
    this.#legacyFeed = legacyFeed;
  }

  getCourses() {
    const xml = this.#legacyFeed.fetchCourseXml();
    const courseBlocks = [...xml.matchAll(/<course\s+course_id="([^"]+)"\s+credit_hours="([^"]+)">([\s\S]*?)<\/course>/g)];

    return courseBlocks.map(([, id, creditsRaw, inner]) => {
      const titleMatch = inner.match(/<course_title>([\s\S]*?)<\/course_title>/);
      const tagsMatch = inner.match(/<tag_list>([\s\S]*?)<\/tag_list>/);
      return {
        id,
        title: titleMatch ? unescapeXml(titleMatch[1].trim()) : '',
        credits: Number(creditsRaw),
        tags: tagsMatch ? tagsMatch[1].split(',').map((t) => t.trim()).filter(Boolean) : [],
      };
    });
  }
}

// Client consumer depends strictly on the target interface `.getCourses()` (Dependency Inversion)
function summarizeCatalog(catalogService) {
  return catalogService.getCourses().map((c) => `${c.id}: ${c.title} (${c.credits} cr)`);
}

test('XmlToJsonCatalogAdapter converts legacy XML feed into normalized JSON contract', () => {
  const legacyFeed = new LegacyXmlCourseFeed();
  const adapter = new XmlToJsonCatalogAdapter(legacyFeed);

  const courses = adapter.getCourses();
  assert.equal(courses.length, 2);
  assert.deepEqual(courses[0], {
    id: 'CTE/CIS 101',
    title: 'Node.js & HTTP Foundations',
    credits: 1.5,
    tags: ['nodejs', 'http', 'tdd'],
  });

  assert.deepEqual(summarizeCatalog(adapter), [
    'CTE/CIS 101: Node.js & HTTP Foundations (1.5 cr)',
    'CTE/CIS 201: OOP & Security Hardening (1.5 cr)',
  ]);
});

test('XmlToJsonCatalogAdapter rejects invalid adaptee lacking required contract', () => {
  assert.throws(() => new XmlToJsonCatalogAdapter({}), TypeError);
});

module.exports = { LegacyXmlCourseFeed, XmlToJsonCatalogAdapter, summarizeCatalog };
