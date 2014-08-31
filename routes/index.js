var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res) {
  res.render('views/home', { title: 'Home' });
});

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
