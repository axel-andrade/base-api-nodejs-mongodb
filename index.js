'use strict';

const app = require('./src/app.js');
const http = require('http');
const conf = require('config');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || conf.port);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//Normalizando a porta
function normalizePort(value) {
    let port = parseInt(value, 10);
    if (isNaN(port)) return value;
    if (port >= 0) return port;
    return false;
}

//gerenciando erros
function onError(error) {
    if (error.syscall !== 'listen') throw error;
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;

    }
}

//pegando informações do servidor e chamando o debug
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

console.log("Running on port " + port);