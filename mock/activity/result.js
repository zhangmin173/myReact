const path = require('path');
const fs = require('fs');

const reader = function(lottery) {
  const json = fs.readFileSync(path.join(__dirname, './result/lucky.json'));
  return JSON.parse(json);
};
module.exports = reader;