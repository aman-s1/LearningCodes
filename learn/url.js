const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url,true);
    const path = parsedUrl.pathname;

    res.writeHead(200,{'Content-Type' : 'text/plain'});

    if(path === '/home')
    {
        res.end('Welcome to Home');
    }
    else if(path === '/about')
    {
        res.end('Welcome to About us Page');
    }
    else if(path === '/node')
    {
        res.end('Welcome to my node.js project');
    }
    else
    {
        res.end('Welcome to my node.js project');
    }
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});