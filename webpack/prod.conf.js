/**
 * 生产环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const utils = require('./base/utils');
const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];
const webpackBaseConf = require('./base.conf');
const webpackConfig = merge(webpackBaseConf,{
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname,'../dist'), {
      root: path.resolve(__dirname, '../'),
      verbose: false,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin() // 用在生产模式
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [require('autoprefixer')({
                  browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 7'],
                  remove: true,
                })]
              }
            },
            {
              loader: 'less-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: '[name].[ext]',
              publicPath: conf.assets.publicPath,
              outputPath: conf.assets.outputPath
            }
          },
        ]
      }
    ]
  }
});
console.log(webpackConfig.entry);
module.exports = webpackConfig;