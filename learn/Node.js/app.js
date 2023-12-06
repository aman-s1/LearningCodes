const http = require('http');

const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Log your name to the console
  console.log('My name is Aman');

  // Send a response to the browser
  res.end('Hello from the server! Check the console for my name.');
});

// Listen on port 4000
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
