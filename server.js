const express = require('express');
const app = express();

const path = require('path');
const indexPath = path.resolve(__dirname, 'dist', 'index.html');

const config = require('./config/config.json');
const port = config.port;

app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log('angular2-webpack-seed: booted on port ' + port);
});