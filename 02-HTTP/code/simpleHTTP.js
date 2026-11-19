const http = require('http');
const PORT = 7000;

const HtmlTemplateString = (header, body, footer) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${header}
  </head>
  <body>
    ${body}
    ${footer}
  </body>
  </html>`;
};

const page1 = HtmlTemplateString(
  `<title>Hello</title>`,
  `<h1>Hello World</h1>`,
  `<footer>By Hans</footer>`
);

http
  .createServer((request, res) => {
    if (request.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': Buffer.byteLength(page1),
        Expires: new Date().toUTCString(),
      });
      res.end(page1);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Invalid request');
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
