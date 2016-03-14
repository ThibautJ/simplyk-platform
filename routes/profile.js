var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('profile.ejs', {lname : req.session.lname, fname : req.session.fname, age : req.session.age, mail : req.session.mail})
});

module.exports = router;
