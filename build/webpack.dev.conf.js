/**
 * 开发环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackBaseConf = require('./webpack.base.conf');
const host = require('../config/host');
console.log('http://' + host.ip + ':' + host.port);

module.exports = merge(webpackBaseConf,{
  devServer: {
    publicPath: webpackBaseConf.output.publicPath,
    noInfo: true, // 不输出信息
    open: true, // 自动打开浏览器
    host: host.ip,
    port: host.port,
    hot: true // 允许热更新
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新模块
    new webpack.NamedModulesPlugin() // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
  ]
});