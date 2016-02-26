var express = require('express');
var router = express.Router();

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var port = appEnv.port;
var host = '0.0.0.0'

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express',
    port,
    host
  });
});

module.exports = router;
