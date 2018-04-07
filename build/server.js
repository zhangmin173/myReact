const express = require('express');
const path = require('path');
const open = require('open');
const host = require('../config/host');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.conf');

/**
 * 热更新
 */
Object.keys(webpackConfig.entry).forEach(function(name){
  webpackConfig.entry[name] = ['webpack-hot-middleware/client?reload=true'].concat(webpackConfig.entry[name]);
})
// 给webpack带上配置
const compiler = webpack(webpackConfig);
// 自动更新编译代码中间件
const devMiddleWare = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300, // rebuild 延时, wait so long for more changes
    ignored: /node_modules/,
    poll: 1000, // 设置检测文件变化的间隔时间段，Check for changes every second
  },
  stats: {
    colors: true,
    chunks: false
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
// 自动刷新浏览器中间件
const hotMiddleWare = webpackHotMiddleware(compiler);
// 创建应用
const app = express();
// 设置静态资源目录
app.use(express.static(path.join(__dirname, '/')));
// 调用中间件
app.use(devMiddleWare);
app.use(hotMiddleWare);
// 调用路由
app.use(require('../build/rooter'));

/**
 * 启动服务
 */
const server = app.listen(host.port);

