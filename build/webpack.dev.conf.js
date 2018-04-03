/**
 * 开发环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackBaseConf = require('./webpack.base.conf');

module.exports = merge(webpackBaseConf,{
  devServer: {
    publicPath: "",
    historyApiFallback: true, // 不弹404
    clientLogLevel: "none", // 控制台不输出信息
    inline: true,
    hot: true, // 允许热更新
    watchOptions: {
      aggregateTimeout: 300, // rebuild 延时, wait so long for more changes
      ignored: /node_modules/,
      poll: false, // 设置检测文件变化的间隔时间段，Check for changes every second
    } 
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新模块
    new webpack.NamedModulesPlugin(), // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
  ]
});