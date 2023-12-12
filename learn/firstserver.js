const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hi, I am Aman');
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
    console.log('Hi from Aman');
})