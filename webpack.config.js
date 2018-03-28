const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    base: ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    publicPath: "/",
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新模块
    new webpack.NamedModulesPlugin(), // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
    // new webpack.HashedModuleIdsPlugin(), // 用在生产模式
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
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     sourceMap: true,
          //     plugins: [require('autoprefixer')({
          //       browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 7'],
          //       remove: true,
          //     })]
          //   }
          // },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              //publicPath: 'assets/',
              //outputPath: 'images/'
            }
          }
        ]
      }
    ]
  }
};
