const http = require('node:http');
const PORT = 7001;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const server = http.createServer((req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  const name = escapeHtml(new URL(req.url, `http://localhost:${PORT}`).searchParams.get('name') || 'Student');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html><html><body><h1>Hello, ${name}</h1></body></html>`);
});

if (require.main === module) {
  server.listen(PORT, () => console.log(`Secure server on http://localhost:${PORT}`));
}

module.exports = { escapeHtml, server };
