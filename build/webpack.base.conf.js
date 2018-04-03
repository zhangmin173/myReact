/**
 * webpack基础配置
 */
const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const conf = require('../config/index');
const cKey = process.env.NODE_ENV;

// {
//   test: /\.less$/,
//   use: ExtractTextPlugin.extract({
//     use: [
//       {
//         loader: 'css-loader',
//         options: {
//           minimize: true
//         }
//       },
//       {
//         loader: 'postcss-loader',
//         options: {
//           sourceMap: true,
//           plugins: [require('autoprefixer')({
//             browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 7'],
//             remove: true,
//           })]
//         }
//       },
//       {
//         loader: 'less-loader'
//       }
//     ],
//     fallback: 'style-loader'
//   })
// }

module.exports = {
  entry: {
    base: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: conf[cKey].filename,
    publicPath: conf[cKey].publicPath,
  },
  mode: conf[cKey].mode,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
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
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: '[name].[ext]',
              publicPath: conf[cKey].urlLoader.publicPath,
              outputPath: conf[cKey].urlLoader.outputPath
            }
          },
        ]
      }
    ]
  }
};
