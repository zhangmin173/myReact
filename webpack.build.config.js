const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    base: ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    publicPath: "http://localhost/myReact/dist/",
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin(), // 用在生产模式
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
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
              //publicPath: 'assets/',
              outputPath: 'images/'
            }
          }
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: '[name].[ext]',
          //     //publicPath: 'assets/',
          //     outputPath: 'images/'
          //   }
          // }
        ]
      }
    ]
  }
};
