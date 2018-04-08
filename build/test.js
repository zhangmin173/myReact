const path = require('path');
const glob = require('glob');
const utils = require('./utils');

//const reg = path.join(__dirname,'../src/pages/**/*.js');
const reg = '**/*.html';
const pathDir = path.join(__dirname,'../src/pages');
const files = utils.getEntry(reg,pathDir);
console.log(files);
