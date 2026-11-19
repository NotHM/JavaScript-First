/**
 * Student Unit 2 Labs TDD Suite: Protocols, Express SSR & Node HTTP Template Server
 * AZ CTE Standards: 8.0, 11.3-11.7, 1.5, 15.6
 * Run: node --test 0-student_files/03-http-server/httpAndProtocolLab.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { inspectEndpoint, calculateWireKb, pickIotProtocol } = require('./protocolLab.js');
const {
  escapeHtml,
  renderNavLinks,
  renderLayout,
  resolveMimeType,
  isPathInsidePublic,
} = require('./expressLab.js');
const { HtmlTemplateString, createTemplateServer } = require('./templateServer.js');

test('protocolLab.js inspects URLs, calculates gzip wire size, and selects IoT protocols', () => {
  const httpsInfo = inspectEndpoint('https://api.example.com/v1');
  assert.ok(httpsInfo && typeof httpsInfo === 'object');
  assert.equal(String(httpsInfo.scheme).toLowerCase(), 'https');
  assert.equal(httpsInfo.host, 'api.example.com');
  assert.equal(httpsInfo.port, 443);
  assert.equal(httpsInfo.encrypted, true);

  const httpInfo = inspectEndpoint('http://localhost:8080');
  assert.equal(httpInfo.port, 8080);
  assert.equal(httpInfo.encrypted, false);

  assert.equal(calculateWireKb(1000, 0.75), 250);
  assert.equal(pickIotProtocol({ rangeMeters: 0.03, coinCellBattery: true }), 'NFC');
  assert.equal(pickIotProtocol({ rangeMeters: 20, coinCellBattery: true }), 'BLE');
  assert.equal(pickIotProtocol({ rangeMeters: 50, coinCellBattery: false }), 'Wi-Fi');
  assert.equal(pickIotProtocol({ rangeMeters: 5000, coinCellBattery: false }), 'LTE Cellular');
});

test('expressLab.js escapes XSS, renders modular nav/layout, maps MIME types, and blocks ../ traversal', () => {
  assert.equal(escapeHtml('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
  assert.equal(escapeHtml("A & 'B'"), 'A &amp; &#39;B&#39;');

  const nav = renderNavLinks(
    [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ],
    '/about'
  );
  assert.match(nav, /href="\/about"[^>]*aria-current="page"/);

  const doc = renderLayout({ title: 'Lab <1>', navHtml: nav, bodyHtml: '<h1>Hi</h1>' });
  assert.match(doc, /<!DOCTYPE html>/i);
  assert.match(doc, /Lab &lt;1&gt;/);
  assert.match(doc, /<h1>Hi<\/h1>/);

  assert.equal(resolveMimeType('styles/site.css'), 'text/css; charset=utf-8');
  assert.equal(resolveMimeType('data.json'), 'application/json; charset=utf-8');
  assert.equal(resolveMimeType('archive.bin'), 'application/octet-stream');

  assert.equal(isPathInsidePublic('/srv/public', 'css/site.css'), true);
  assert.equal(isPathInsidePublic('/srv/public', '../../etc/passwd'), false);
});

test('templateServer.js renders HTML5 template strings and serves /, /about, and 404 on ephemeral port', async () => {
  const html = HtmlTemplateString('<title>Demo</title>', '<h1>Welcome</h1>', '<footer>Footer</footer>');
  assert.equal(typeof html, 'string');
  assert.match(html, /<!DOCTYPE html>/i);
  assert.match(html, /<title>Demo<\/title>/);
  assert.match(html, /<h1>Welcome<\/h1>/);
  assert.match(html, /<footer>Footer<\/footer>/);

  const server = createTemplateServer();
  assert.ok(server && typeof server.listen === 'function', 'createTemplateServer() must return an http.Server');

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  try {
    const home = await fetch(`${base}/`, { signal: AbortSignal.timeout(500) });
    assert.equal(home.status, 200);
    assert.match(home.headers.get('content-type') || '', /text\/html/);

    const about = await fetch(`${base}/about`, { signal: AbortSignal.timeout(500) });
    assert.equal(about.status, 200);
    assert.match(about.headers.get('content-type') || '', /text\/html/);

    const missing = await fetch(`${base}/missing`, { signal: AbortSignal.timeout(500) });
    assert.equal(missing.status, 404);
  } finally {
    server.closeAllConnections?.();
    await new Promise((resolve) => server.close(resolve));
  }
});
