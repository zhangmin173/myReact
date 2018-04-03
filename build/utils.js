const path = require('path');
const os = require('os');

exports.getIPAdress = function() {
  let ip = '';
  try {
    var network = os.networkInterfaces()
    ip = network[Object.keys(network)[0]][1].address
  } catch (e) {
    ip = 'localhost';
  }
  return ip;
}