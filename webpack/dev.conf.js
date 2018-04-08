/**
 * 开发环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConf = require('./base.conf');

const utils = require('./base/utils');
const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];
const webpackConfig = merge(webpackBaseConf,{
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新模块
    new webpack.NamedModulesPlugin() // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
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
              publicPath: conf.assets.publicPath,
              outputPath: conf.assets.outputPath
            }
          },
        ]
      }
    ]
  }
});
Object.keys(webpackConfig.entry).forEach(function(name){
  webpackConfig.entry[name] = ['webpack-hot-middleware/client?reload=true'].concat(webpackConfig.entry[name]);
});

module.exports = webpackConfig;