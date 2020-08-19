const http = require('http');
const url = require('url');
const fs = require('fs');

const port = process.env.PORT || 8000;
const lookup = require('mime-types').lookup;
const server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);
    let path = parsedUrl.path.replace(/^\/+|\/+$/g, '');
    if (path === '')
        path = 'index.html';
    console.log(`Requested path ${path}`);
    let file = __dirname + '/public/' + path;
    fs.readFile(file, function(err, content) {
        if (err) {
            console.log(`File not found ${file}`);
            res.writeHead(404);
            res.end();
        } else {
            console.log(`Returning ${path}`);
            res.setHeader('X-Content-Type-Options', 'nosniff');
            let mime = lookup(path);
            res.writeHead(200, { 'Content-type': mime });
            res.end(content);
        }
    });
});

server.listen(port, 'localhost', () => console.log(`Listening on host: http://localhost:${port}`));