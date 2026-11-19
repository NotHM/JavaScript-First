/**
 * Teacher Demo 2.3A: Modular SSR Pipeline & Zero-Dependency Express-Style Router
 * Standards: AZ CTE 8.3, 11.3-11.7, 15.6 (XSS Escaping), 1.5 (Path Traversal Guard)
 *
 * Ports concepts from upstream `02-ClientVServer/02-server-side-templating/`:
 *   - Route Manifest (`routes`)
 *   - Pure SSR Components (`renderNavLinks`, `renderNav`)
 *   - Composable Layout Wrapper (`renderLayout`)
 *   - Page Builders (`renderHomePage`, `renderCatalogPage`)
 *   - Express-style middleware + static file serving + `node:test` verification
 *
 * Run:
 *   node 02-HTTP/03-Express-and-SSR/code/expressVsNodeSsrDemo.mjs
 *   node --test 02-HTTP/03-Express-and-SSR/code/expressVsNodeSsrDemo.mjs
 */
import http from 'node:http';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

// 1. Route Manifest (adapted from routes.mjs)
export const SITE_ROUTES = Object.freeze([
  { name: 'Home', url: '/' },
  { name: 'Catalog', url: '/catalog' },
  { name: 'API Health', url: '/api/health' },
]);

// 2. Output Escaping Helper (prevents XSS inside SSR template literals)
export function escapeHtml(raw) {
  return String(raw)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// 3. Modular Components (adapted from components/nav.mjs)
export function renderNavLinks(routes, activeUrl) {
  return routes
    .map((route) => {
      const active = route.url === activeUrl ? ' aria-current="page" class="active"' : '';
      return `<li><a href="${escapeHtml(route.url)}"${active}>${escapeHtml(route.name)}</a></li>`;
    })
    .join('\n');
}

export function renderNav(routes, activeUrl) {
  return `<nav aria-label="Main navigation"><ul>${renderNavLinks(routes, activeUrl)}</ul></nav>`;
}

// 4. Layout Wrapper (adapted from layout/template.mjs)
export function renderLayout({ title, navHtml, bodyHtml, headExtra = '', footerExtra = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  ${headExtra}
</head>
<body>
  <header>${navHtml}</header>
  <main>${bodyHtml}</main>
  <footer><small>JavaScript First Modular SSR</small>${footerExtra}</footer>
</body>
</html>`;
}

// 5. Page Builders (adapted from pages/home.mjs & pages/about.mjs)
export function renderHomePage(routes) {
  return renderLayout({
    title: 'Home | Node SSR',
    navHtml: renderNav(routes, '/'),
    headExtra: '<link rel="stylesheet" href="/public/site.css">',
    bodyHtml: '<h1>Modular Server-Side Rendering</h1><p>Zero client bundle required for initial paint.</p>',
  });
}

export function renderCatalogPage(routes, items) {
  const cards = items
    .map(
      (item) =>
        `<article class="card"><h2>${escapeHtml(item.name)}</h2><p>Role: ${escapeHtml(item.role)}</p></article>`
    )
    .join('\n');
  return renderLayout({
    title: 'Catalog | Node SSR',
    navHtml: renderNav(routes, '/catalog'),
    headExtra: '<link rel="stylesheet" href="/public/site.css">',
    bodyHtml: `<h1>Course Modules</h1><section class="grid">${cards}</section>`,
  });
}

// 6. MIME Map & Safe Static File Middleware (simulating express.static)
const MIME_TYPES = Object.freeze({
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
});

export function createStaticMiddleware(mountPrefix, publicDir) {
  const rootDir = path.resolve(publicDir);

  return async function serveStatic(req, res) {
    const rawPath = (req.url || '/').split('?')[0];
    let reqPath;
    try {
      reqPath = decodeURIComponent(rawPath);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Malformed URL encoding' }));
      return true;
    }
    if (!reqPath.startsWith(`${mountPrefix}/`)) return false;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return true;
    }

    const relativeSubpath = reqPath.slice(mountPrefix.length + 1);
    const resolved = path.resolve(rootDir, relativeSubpath);
    if (!resolved.startsWith(rootDir + path.sep)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Forbidden path traversal' }));
      return true;
    }

    try {
      const content = await fs.readFile(resolved);
      const ext = path.extname(resolved).toLowerCase();
      const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': content.byteLength,
        'Cache-Control': 'public, max-age=300',
      });
      res.end(req.method === 'HEAD' ? undefined : content);
      return true;
    } catch (err) {
      if (err && err.code === 'ENOENT') return false;
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Static read error' }));
      return true;
    }
  };
}

// 7. Tiny Express-like App Factory using node:http
export function createSsrAppServer({ publicDir, items = [{ name: 'HTTP & Express', role: 'Unit 2' }] }) {
  const staticHandler = createStaticMiddleware('/public', publicDir);
  const routes = new Map([
    ['GET /', (req, res) => sendHtml(res, 200, renderHomePage(SITE_ROUTES))],
    ['GET /catalog', (req, res) => sendHtml(res, 200, renderCatalogPage(SITE_ROUTES, items))],
    [
      'GET /api/health',
      (req, res) =>
        sendJson(res, 200, { ok: true, mode: 'modular-ssr', routes: SITE_ROUTES.map((r) => r.url) }),
    ],
  ]);

  function sendHtml(res, status, html) {
    res.writeHead(status, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(html, 'utf8'),
    });
    res.end(html);
  }

  function sendJson(res, status, data) {
    const body = JSON.stringify(data);
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body, 'utf8'),
    });
    res.end(body);
  }

  return http.createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (await staticHandler(req, res)) return;

    const handler = routes.get(`${req.method} ${pathname}`);
    if (handler) return handler(req, res);

    // Check if path exists for a different HTTP verb -> 405
    const pathKnown = [...routes.keys()].some((k) => k.endsWith(` ${pathname}`));
    if (pathKnown) {
      return sendJson(res, 405, { error: 'Method Not Allowed' });
    }
    return sendJson(res, 404, { error: `Not Found: ${pathname}` });
  });
}

// 8. Node:test Verification Suite
test('Modular SSR escapes untrusted content and composes nav + layout', () => {
  const html = renderCatalogPage(SITE_ROUTES, [{ name: '<script>alert(1)</script>', role: 'XSS Test' }]);
  assert.match(html, /aria-current="page"/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
});

test('SSR server serves routes, static CSS, 405, 404, and blocks path traversal', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'js-first-ssr-'));
  await fs.writeFile(path.join(tmpDir, 'site.css'), 'body { font-family: system-ui; }', 'utf8');

  const server = createSsrAppServer({
    publicDir: tmpDir,
    items: [
      { name: 'Node HTTP', role: 'Core Server' },
      { name: 'Express Middleware', role: 'Framework Abstraction' },
    ],
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  try {
    const homeRes = await fetch(`${base}/`);
    assert.equal(homeRes.status, 200);
    assert.match(homeRes.headers.get('content-type'), /text\/html/);
    assert.match(await homeRes.text(), /Modular Server-Side Rendering/);

    const catalogRes = await fetch(`${base}/catalog`);
    assert.equal(catalogRes.status, 200);
    assert.match(await catalogRes.text(), /Express Middleware/);

    const cssRes = await fetch(`${base}/public/site.css`);
    assert.equal(cssRes.status, 200);
    assert.match(cssRes.headers.get('content-type'), /text\/css/);
    assert.match(await cssRes.text(), /font-family/);

    // Send raw unnormalized path via http.get options so server receives %2e%2e traversal attempt
    const traversalStatus = await new Promise((resolve, reject) => {
      http.get({ hostname: '127.0.0.1', port, path: '/public/%2e%2e/secret.txt' }, (r) => {
        r.resume();
        resolve(r.statusCode);
      }).on('error', reject);
    });
    assert.equal(traversalStatus, 403);

    const methodRes = await fetch(`${base}/api/health`, { method: 'POST' });
    assert.equal(methodRes.status, 405);

    const missRes = await fetch(`${base}/does-not-exist`);
    assert.equal(missRes.status, 404);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});
