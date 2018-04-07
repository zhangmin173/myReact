const path = require('path');
const router = require('express').Router();
const utils = require('./utils');
const fs = require('fs');

router.all('/', (req, res) => {
  console.log(req.path);
});

router.all('*', (req, res) => {
  console.log(req.path);
  if (req.path.indexOf('.html') !== -1) {
    console.log(req.query);
  } else {
    let filepath = path.join(__dirname,'../mock/',`${req.path}.js`),
    file,
    data = {};
    if (fs.existsSync(filepath)) {
      data = require(filepath)();
    }
    res.json(data);
  }
});

module.exports = router;