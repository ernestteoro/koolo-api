const http = require('http');
const app = require('./app');

const port = process.env.port || 8180;
const server = http.createServer(app);

server.listen(port,()=>{
    console.log('App is running');
});