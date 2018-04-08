const path = require('path');
const router = require('express').Router();
const fs = require('fs');

const utils = require('./utils');
const pages =  utils.getPage('**/*.html',path.join(__dirname,'../../src/pages'));

// pages.forEach(page => {
//   console.log('/' + page.options.filename);
//   router.get('/' + page.options.filename,(req, res, next) => {
//     console.log(req);
//     console.log(res);
//     res.send(res);
//   })
// })
router.get('/about/index.html',(req, res) => {
  console.log(req);
  console.log(res);
  //res.render('/about/index.html');
})
// router.all('*', (req, res) => {
//   console.log(req.path);
// });

module.exports = router;