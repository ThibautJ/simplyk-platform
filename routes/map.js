var express = require('express');
var router = express.Router();
var server = require("../models/create");

/* GET users listing. */
router.get('/:nombre', function(req, res, next) {
	var noms = ['Robert', 'Jacques', 'David'];
	res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
});

router.get('/', function(req, res, next) {
	console.log("On est dans /map/get ")
	res.render('map.ejs', {username: res.get('username')});
});

router.post('/', function(req, res, next) {
	console.log("On est dans /map/post ")
	req.session.lname = req.body.lname
	req.session.fname = req.body.fname
	req.session.age = req.body.age
	req.session.mail = req.body.mail
	server.create(req, res);
	res.render('map.ejs');
	console.log("username " + req.session.lname)
});

module.exports = router;