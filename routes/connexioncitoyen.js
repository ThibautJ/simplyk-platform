var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('connexioncitoyen.ejs');
});

module.exports = router;