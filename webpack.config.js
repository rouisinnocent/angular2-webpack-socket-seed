const webpack = require('webpack');
const path = require('path');

//Config
const config = require('./config.json');
const port = config.port;
const outputPath = path.resolve(__dirname, 'dist');
const serverPath = 'http://localhost:' + port;
const publicPath = serverPath + '/dist/';
const appPath = path.resolve(__dirname, 'src', 'app');
const indexPath = path.resolve(__dirname, 'src', 'index.html');

//Plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.ts'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'ts-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                exclude:appPath,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
            },
            {
                test: /\.css$/,
                include: appPath,
                loader: 'raw'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                'app',
                'vendor',
                'polyfills'
            ]
        }),
        new HtmlWebpackPlugin({
            template: indexPath
        }),
        new ExtractTextPlugin('[name].css'),
        new BrowserSyncPlugin({
            host:'localhost',
            proxy:serverPath
        })
    ],
    output: {
        path: outputPath,
        publicPath: publicPath,
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    }
}