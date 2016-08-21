const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
const indexPath = path.resolve(__dirname, 'dist', 'index.html');
const distPath = path.resolve(__dirname, 'dist');

const config = require('./config.json');
const port = config.port;

app.use(
    '/dist',
    express.static(distPath)
)

app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

io.on('connection',socket=>{
    console.log('[SOCKET-SERVER]: Socket connected.');
    socket.emit('server-init','hi');
    socket.on('app-component-connect',msg=>{
        console.log('[SOCKET-SERVER]: Socket says:',msg);
    });
});

http.listen(port, () => {
    console.log('[SERVER]: booted on port ' + port);
});