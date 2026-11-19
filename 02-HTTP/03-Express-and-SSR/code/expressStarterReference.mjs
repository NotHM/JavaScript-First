/**
 * Teacher Demo 2.3B: Express.js Reference Architecture & Static Middleware
 * Standards: AZ CTE 8.3, 11.4-11.7
 *
 * Canonical Express.js pattern (finalized from the early Express server draft):
 *
 *   import express from 'express';
 *   import path from 'node:path';
 *   const app = express();
 *   app.use('/public', express.static(path.join(import.meta.dirname, 'public')));
 *   app.use(express.json());
 *   app.get('/', (req, res) => res.send(renderHtml(...)));
 *   app.listen(3000);
 *
 * Notice how `createExpressApp(expressImpl)` separates app wiring from `.listen()` AND
 * runs offline in this repository using a zero-dependency Express-compatible adapter if
 * the `express` npm package is not installed locally.
 *
 * Run:
 *   node 02-HTTP/03-Express-and-SSR/code/expressStarterReference.mjs
 *   node --test 02-HTTP/03-Express-and-SSR/code/expressStarterReference.mjs
 */
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

export function htmlDocument({ title, stylesHref, heading, bodyText, scriptSrc = '' }) {
  const safe = (v) =>
    String(v)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');

  const scriptTag = scriptSrc ? `<script src="${safe(scriptSrc)}" defer></script>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safe(title)}</title>
  <link rel="stylesheet" href="${safe(stylesHref)}">
</head>
<body>
  <main>
    <h1>${safe(heading)}</h1>
    <p>${safe(bodyText)}</p>
  </main>
  ${scriptTag}
</body>
</html>`;
}

/**
 * Configures any Express-compatible factory (`app.use`, `app.get`, `app.post`, `express.static`).
 * Works identically with `import express from 'express'` OR the built-in offline adapter below.
 */
export function createExpressApp(expressFactory, publicDir) {
  const app = expressFactory();

  // Mount static middleware under '/public' -> serves CSS/JS/images safely
  app.use('/public', expressFactory.static(publicDir));
  app.use(expressFactory.json());

  app.get('/', (req, res) => {
    res.send(
      htmlDocument({
        title: 'Express SSR Home',
        stylesHref: '/public/style.css',
        heading: 'Express.js + Modular HTML Template',
        bodyText: 'Static CSS & client scripts mount cleanly via app.use("/public", express.static(...)).',
        scriptSrc: '/public/app.js',
      })
    );
  });

  app.get('/api/info', (req, res) => {
    res.status(200).json({ framework: 'Express-Compatible', portDefault: 3000 });
  });

  app.post('/api/echo', (req, res) => {
    if (!req.body || !req.body.message) {
      return res.status(400).json({ error: 'message field is required' });
    }
    return res.status(201).json({ received: req.body.message });
  });

  return app;
}

/**
 * Minimal Express-API-compatible adapter for zero-dependency classroom execution & testing.
 */
export function createOfflineExpressAdapter() {
  function express() {
    const middlewares = [];
    const routes = [];

    const app = async (req, res) => {
      const parsedUrl = new URL(req.url, 'http://localhost');
      req.path = parsedUrl.pathname;

      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      res.send = (payload) => {
        const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
        const type = typeof payload === 'string' ? 'text/html; charset=utf-8' : 'application/json; charset=utf-8';
        res.writeHead(res.statusCode || 200, {
          'Content-Type': type,
          'Content-Length': Buffer.byteLength(body, 'utf8'),
        });
        res.end(body);
      };
      res.json = (data) => {
        const body = JSON.stringify(data);
        res.writeHead(res.statusCode || 200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body, 'utf8'),
        });
        res.end(body);
      };

      const stack = [...middlewares];
      for (const route of routes) {
        if (route.method === req.method && route.path === req.path) {
          stack.push({ prefix: null, fn: route.handler });
        }
      }

      let idx = 0;
      const next = async () => {
        if (res.writableEnded) return;
        while (idx < stack.length) {
          const layer = stack[idx++];
          if (layer.prefix && !req.path.startsWith(layer.prefix)) continue;
          await layer.fn(req, res, next);
          return;
        }
        if (!res.writableEnded) {
          res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
        }
      };

      await next();
    };

    app.use = (prefixOrFn, maybeFn) => {
      if (typeof prefixOrFn === 'string') {
        middlewares.push({ prefix: prefixOrFn, fn: maybeFn });
      } else {
        middlewares.push({ prefix: null, fn: prefixOrFn });
      }
    };
    app.get = (routePath, handler) => routes.push({ method: 'GET', path: routePath, handler });
    app.post = (routePath, handler) => routes.push({ method: 'POST', path: routePath, handler });
    app.listen = (port, cb) => http.createServer(app).listen(port, '127.0.0.1', cb);
    return app;
  }

  express.static = (rootDir) => {
    const absRoot = path.resolve(rootDir);
    const mime = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.html': 'text/html; charset=utf-8' };
    return (req, res, next) => {
      const prefix = '/public';
      const rel = req.path.startsWith(`${prefix}/`) ? req.path.slice(prefix.length + 1) : req.path.replace(/^\/+/, '');
      const full = path.resolve(absRoot, rel);
      if (!full.startsWith(absRoot + path.sep) || !fs.existsSync(full)) return next();
      const buf = fs.readFileSync(full);
      const ext = path.extname(full).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mime[ext] || 'application/octet-stream',
        'Content-Length': buf.byteLength,
      });
      res.end(buf);
    };
  };

  express.json = () => async (req, res, next) => {
    if (req.method === 'GET' || req.method === 'HEAD') return next();
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    req.body = raw ? JSON.parse(raw) : {};
    return next();
  };

  return express;
}

test('createExpressApp serves SSR HTML, static CSS/JS, JSON POST echo, and 404 cleanly', async () => {
  const pubDir = fs.mkdtempSync(path.join(os.tmpdir(), 'js-first-express-'));
  fs.writeFileSync(path.join(pubDir, 'style.css'), 'h1 { color: #0f172a; }', 'utf8');
  fs.writeFileSync(path.join(pubDir, 'app.js'), 'console.log("loaded");', 'utf8');

  let expressFactory;
  try {
    ({ default: expressFactory } = await import('express'));
  } catch {
    expressFactory = createOfflineExpressAdapter();
  }

  const app = createExpressApp(expressFactory, pubDir);
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  try {
    const home = await fetch(`${base}/`);
    assert.equal(home.status, 200);
    assert.match(await home.text(), /Express\.js \+ Modular HTML Template/);

    const css = await fetch(`${base}/public/style.css`);
    assert.equal(css.status, 200);
    assert.match(css.headers.get('content-type'), /text\/css/);

    const postOk = await fetch(`${base}/api/echo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello Express' }),
    });
    assert.equal(postOk.status, 201);
    assert.deepEqual(await postOk.json(), { received: 'Hello Express' });

    const missing = await fetch(`${base}/unknown-route`);
    assert.equal(missing.status, 404);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(pubDir, { recursive: true, force: true });
  }
});
