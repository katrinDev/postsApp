const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;


const server = http.createServer((req, res) => {
    console.log('Server request'); 
    console.log("Let's do it");

    res.setHeader('Content-Type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);
    
    switch(req.url){
        case '/':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts');
            res.end();
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;//client error
    }
    fs.readFile(basePath, (err, data) => {
        if(err){
            console.log(err.message);
            res.statusCode = 500;//ошибка при парсинге, значит внуренняя серверная
        }
        else {res.write(data);}
        res.end();
    }); 
 });

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error.message) : console.log(`listening port ${PORT}`);
}); 

