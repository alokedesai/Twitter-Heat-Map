var express = require('express');
var router = express.Router();

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var port = appEnv.port;
var host = appEnv.bind
var server = appEnv.url

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express',
    server
  });
});

module.exports = router;
