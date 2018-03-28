const path = require('path');
const webpack = require('webpack');

const utils = require('./utils');
const config = require('../config');
const entryConfig = require('../config/entry')

const isProd = process.env.NODE_ENV === 'production';
const isBuildProd = process.env.BUILD_TYPE === 'production';
const isHash = isProd && isBuildProd;

module.exports = {
  entry: Object.assign(utils.computeEntry(entryConfig), {
    vendors: ['react', 'react-dom', 'react-router', 'antd', 'classnames', 'formsy-react', 'history', 'immutability-helper', 'moment', 'pubsub-js', 'whatwg-fetch']
  }),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: isHash ? '[hash:8].[name].js' : '[name].js',
    publicPath: isProd ? config[isHash ? 'build' : 'dev'].assetsPublicPath : `http://${utils.getIPAdress()}:${config.dev.port}/dist/`,
    chunkFilename: isHash ? '[chunkhash].[name].js' : '[name].js'
  },
  resolve: {
    alias: {
      'formsy': path.join(__dirname, '../src/formsy'),
      'lib': path.join(__dirname, '../src/lib'),
      'components': path.join(__dirname, '../src/components'),
      'containers': path.join(__dirname, '../src/containers')
    }
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [{
      test: /\.css$/,
      loaders: ['style-loader/useable', 'css-loader']
    }, {
      test: /\.js[x]?$/,
      loaders: (isProd ? [] : ['react-hot-loader']).concat(['babel-loader?cacheDirectory=true']),
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loaders: ['style-loader/useable', 'css-loader', 'less-loader']
    }, {
      test: /\.(svg|png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10240
      }
    }]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: isHash ? '[hash:8].vendors.js' : 'vendors.js'
    })
  ]
};
