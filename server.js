const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.removeHeader('X-Frame-Options');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Automatic on-demand scene generator for storybook pages
      const storyMatch = reqPath.match(/^\/web_images\/stories\/([^\/]+)\/page-(\d+)\.svg$/);
      if (storyMatch) {
        const bookId = storyMatch[1];
        const pageNum = parseInt(storyMatch[2], 10);
        try {
          const { STORYBOOK_LIBRARY } = require('./storybook-data.js');
          const { renderCanonicalScene } = require('./story_renderer.js');
          if (STORYBOOK_LIBRARY && STORYBOOK_LIBRARY[bookId]) {
            const book = STORYBOOK_LIBRARY[bookId];
            const totalPages = book.pages ? book.pages.length : 12;
            const pageObj = (book.pages && book.pages[pageNum - 1]) ? book.pages[pageNum - 1] : {};
            const stageTitle = pageObj.stage || pageObj.title || `Plate ${pageNum}`;
            const svgCode = renderCanonicalScene(bookId, book.category, pageNum, totalPages, stageTitle);
            
            try {
              fs.mkdirSync(path.dirname(filePath), { recursive: true });
              fs.writeFileSync(filePath, svgCode, 'utf8');
            } catch (wErr) {
              // ignore write error, still serve
            }
            
            res.writeHead(200, {
              'Content-Type': 'image/svg+xml; charset=utf-8',
              'Content-Length': Buffer.byteLength(svgCode),
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Access-Control-Allow-Origin': '*'
            });
            res.end(svgCode);
            return;
          }
        } catch (genErr) {
          console.error('[SVG Generator Error]:', genErr);
        }
      }

      if (filePath.endsWith('.webp')) {
        const jpgPath = filePath.replace(/\.webp$/, '.jpg');
        if (fs.existsSync(jpgPath)) {
          console.log(`[FALLBACK] Serving JPG for: ${req.url}`);
          serveFile(jpgPath, '.jpg', res);
          return;
        }
      }
      console.warn(`[404] Not Found: ${req.url}`);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      fs.stat(filePath, (err2, stats2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        serveFile(filePath, '.html', res, stats2.size);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    serveFile(filePath, ext, res, stats.size);
  });
});

function serveFile(filePath, ext, res, size) {
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': mime,
    'Content-Length': size !== undefined ? size : fs.statSync(filePath).size,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Access-Control-Allow-Origin': '*'
  });

  const stream = fs.createReadStream(filePath);
  stream.on('error', (err) => {
    console.error(`Stream error on ${filePath}:`, err.message);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Error');
    }
  });
  stream.pipe(res);
}

server.on('clientError', (err, socket) => {
  if (err.code === 'ECONNRESET' || !socket.writable) return;
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, HOST, () => {
  console.log(`Storybook server listening on http://${HOST}:${PORT}`);
});
