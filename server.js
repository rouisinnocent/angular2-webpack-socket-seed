const express = require('express');
const app = express();

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

app.listen(port, () => {
    console.log('angular2-webpack-seed: booted on port ' + port);
});