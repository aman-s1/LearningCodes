const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Determine the requested path
  const path = parsedUrl.pathname;

  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Handle different paths
  if (path === '/home') {
    res.end('Welcome home');
  } else if (path === '/about') {
    res.end('Welcome to About Us page');
  } else if (path === '/node') {
    res.end('Welcome to my Node Js project');
  } else {
    res.end('Welcome to my Node Js project'); // Default response for other paths
  }
});

// Listen on port 4000
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
