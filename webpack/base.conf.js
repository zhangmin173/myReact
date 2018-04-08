/**
 * webpack基础配置
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const utils = require('./base/utils');
const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];


const entries = utils.getEntry('**/*.js',path.join(__dirname,'../src/pages'));
entries.base = path.join(__dirname,'../src/common/js/base.js');
const modules = require('./base/module.conf')[ENV];
module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: conf.filename,
    publicPath: conf.publicPath,
  },
  stats: "errors-only",
  mode: conf.mode,
  plugins: utils.getPage('**/*.html',path.join(__dirname,'../src/pages'))
};