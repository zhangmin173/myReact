/**
 * 开发环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const path = require('path');
const webpackBaseConf = require('./webpack.base.conf');
// console.log('http://' + host.ip + ':' + host.port);

module.exports = merge(webpackBaseConf,{
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新模块
    new webpack.NamedModulesPlugin() // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
  ]
});