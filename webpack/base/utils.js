/**
 * 工具类
 */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * 获取ip
 */
function getIPAdress() {
  let ip = '';
  try {
    var network = os.networkInterfaces()
    ip = network[Object.keys(network)[0]][1].address
  } catch (e) {
    ip = 'localhost';
  }
  return ip;
}
exports.getIPAdress = getIPAdress;

/**
 * 获取url参数
 * @param {路径} path 
 */
function getUrlParameter(name,path = window.location.href) {
  const result = decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(path) || [undefined, ''])[1].replace(/\+/g, '%20')) || null;
  return result ? result.split('/')[0] : '';
}
exports.getUrlParameter = getUrlParameter;

/**
 * 入口js
 * @param {匹配规则} globPath 
 * @param {文件根目录} pathDir 
 */
function getEntry(globPath, pathDir) {
  let files = getFiles(globPath,pathDir);
  let entries = {}, pathname, extname;

  files.forEach(file => {
    extname = path.extname(file); //后缀名
    pathname = file.replace(new RegExp(extname), '');
    entries[pathname] = path.join(pathDir,file);
  });
  return entries;
}
exports.getEntry = getEntry;

/**
 * 读取文件
 * @param {匹配规则} globPath 
 * @param {文件根目录} pathDir 
 */
function getFiles(globPath, pathDir) {
  let files = glob.sync(globPath,{
    cwd: pathDir
  });
  return files;
}
exports.getFiles = getFiles;

/**
 * 入口html
 * @param {匹配规则} globPath 
 * @param {文件根目录} pathDir 
 */
function getPage(globPath, pathDir) {
  let files = getFiles(globPath,pathDir);
  let pages = [], conf = {}, chunk, extname;

  files.forEach(file => {
    extname = path.extname(file); //后缀名
    chunk = file.replace(new RegExp(extname), '');

    conf = {
      filename: file,
      template: path.join(pathDir,file),
      //inject: false,
      chunks: ['base',chunk],
      chunksSortMode: 'none'
    };

    pages.push(new HtmlWebpackPlugin(conf));
  });
  return pages;
}
exports.getPage = getPage;

/**
 * 构建css
 * @param {路径} path 
 */
function getCss(path) {
  let files = getFileArr(path,'html');
  let plugins = [],
    key,conf;
  files.forEach((filename) => {
    key = filename.substring(6, filename.length);
    conf = {
      filename: key,
      publicPath: filename
    };

    plugins.push(new ExtractTextPlugin(conf));
  })
  return plugins;
}
exports.getCss = getCss;

/**
 * 获取文件
 * @param {路径} path 
 * @param {文件类型} type 
 */
function getFileArr(path = 'src', type = 'js') {
  let files = glob.sync(path.join(__dirname, '../src/') + '**/*.' + type);
  let filesList = [];
  files.forEach((filename) => {
    if(filename.indexOf(path) >= -1) {
      filesList.push(filename);
    }
  })
  return filesList;
}
exports.getFileArr = getFileArr;

/**
 * 获取mock文件
 */
function getMockFiles() {
  let files = glob.sync(path.join(__dirname, '../mock/') + '**/index.js');
  let mockFiles = [],index = files[0].lastIndexOf('mock') + 4, fileObj = {};
  files.forEach((filename) => {
    filename = filename.substring(index,filename.length-9);
    mockFiles.push({
      path: '../mock/' + filename + '/index.js',
      api: filename
    });
  })
  return mockFiles;
}
exports.getMockFiles = getMockFiles;

/**
 * 获取当天年月日时分秒
 */
function getTodayFull() {
  const now = new Date(),
    year = now.getFullYear(),
    month = ("0" + (now.getMonth() + 1)).slice(-2),
    date = ('0' + now.getDate()).slice(-2),
    h = ('0' + now.getHours()).slice(-2),
    m = ('0' + now.getMinutes()).slice(-2),
    s = ('0' + now.getSeconds()).slice(-2);

  return `${year}${month}${date}${h}${m}${s}`;
}
exports.getTodayFull = getTodayFull;