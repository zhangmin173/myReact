const express = require('express');
const path = require('path');
const app = express();
const open = require('open');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.conf');
const os = require('os');

// const indexPath = path.join(__dirname, './src/index.html');
// const publicPath = express.static(path.join(__dirname, './dist'));
// app.use('/dist', publicPath);
app.get('/activity/index', function(req, res, next) {
  //res.redirect('/src/activity/index'); // 重定向
  res.sendFile(path.join(__dirname, './html/index.html')); // 发送页面
});

Object.keys(webpackConfig.entry).forEach(function(name){
  webpackConfig.entry[name] = ['webpack-hot-middleware/client?reload=true'].concat(webpackConfig.entry[name]);
})
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300, // rebuild 延时, wait so long for more changes
    ignored: /node_modules/,
    poll: 1000, // 设置检测文件变化的间隔时间段，Check for changes every second
  },
  stats: {
    colors: true,
    assets: false,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    entrypoints: false
  }
}))
app.use(webpackHotMiddleware(compiler));

/**
 * 获取本地IP
 */
const getIP = function() {
  let ip = '';
  try {
    var network = os.networkInterfaces()
    ip = network[Object.keys(network)[0]][1].address
  } catch (e) {
    ip = 'localhost';
  }
  return ip;
}
const server = app.listen(3000, function() {
  let host = getIP();
  let port = server.address().port;
  open('http://' + host + ':' + port);
});

