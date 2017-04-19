// Load the http module to create an http server.
import http from 'http';
import config from './config';

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
});

server.listen(config.port);

// Put a friendly message on the terminal
console.log("Server running at " + config.port);