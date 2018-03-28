const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');

Object.keys(webpackBaseConfig.entry).forEach(function(name) {
  if (name !== 'verdors') {
    webpackBaseConfig.entry[name] = webpackBaseConfig.entry[name].concat('webpack-hot-middleware/client?reload=true')
  }
})

module.exports = merge(webpackBaseConfig, {
  devtool: config.dev.sourceMap ? '#eval-source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.dev.env
      }
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});