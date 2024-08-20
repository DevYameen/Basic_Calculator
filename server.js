const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((request, response) => {
  const filePath = request.url === '/' ? '/index.html' : request.url;
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.readFile(__dirname + filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile(__dirname + '/404.html', (error, content) => {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end(content, 'utf-8');
        });
      } else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        response.end();
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });

}).listen(8080, () => {
  console.log('Server running on port 8080');
});
