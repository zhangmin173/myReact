/**
 * 测试环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackBaseConf = require('./webpack.base.conf');

module.exports = merge(webpackBaseConf,{
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin(), // 用在生产模式
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ]
});