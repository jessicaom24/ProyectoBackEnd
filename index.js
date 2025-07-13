/*const http = require('http');
const server = http.createServer((req,res)=>{
    if (req.url === '/' && req.method === 'GET'){
        res.writeHead(200,{ 'content-type': 'text/plain'});
        res.end("Hola, desde el servidor");
    }else{
        res.writeHead(404,{'content-type': 'text/plain'});
        res.end("404 not found!")
    }
});

server.listen(3000, ()=>{
    console.log('Servidor escuchando en: http://localhost:3000');
})*/