/*
 * @Author: 周成
 * @Date: 2018-01-16 15:51:14
 * @Last Modified by: 周成
 * @Last Modified time: 2018-02-08 16:12:07
 */

const path = require('path');

exports.computeEntry = function(entry = []) {
  let result = {};

  for (let i = 0; i < entry.length; i++) {
    const item = entry[i];
    const name = item.name;
    result[name] = [path.join(__dirname, item.path)];
  }

  return result
}

exports.getIPAdress = function() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {

        return alias.address;
      }
    }
  }
}