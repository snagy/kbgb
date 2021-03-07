// const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    mode: 'production',
    entry: './src/base.js',
    // devtool: 'source-map',
    //devtool: 'eval-source-map',
    optimization: {
        usedExports: true,
      },
    output: {
        filename: 'pack.js',
        path: path.resolve(__dirname, 'static/src')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
    ],
};