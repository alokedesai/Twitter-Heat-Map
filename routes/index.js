var express = require('express');
var router = express.Router();

var host = '#{host}' // this comes from res.render(...)
var port = '#{port}' // this comes from res.render(...)

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express',
    port,
    host
  });
});

module.exports = router;
