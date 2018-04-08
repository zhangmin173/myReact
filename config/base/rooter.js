const path = require('path');
const router = require('express').Router();
const fs = require('fs');

const utils = require('./utils');
const pages =  utils.getPage('**/*.html',path.join(__dirname,'../../src/pages'));

pages.forEach(page => {
  // router.get(page.options.filename,(req, res, next) => {
  //   console.log(req);
  //   console.log(res);
  //   //res.send(res);
  // })
})
router.all('*', (req, res) => {
  if (req.path.indexOf('html') !== -1) {
    
  } else {
    console.log(req.path);
    res.json(require('../../mock' + req.path)());
  } 
});

module.exports = router;