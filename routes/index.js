var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var stormpathGroupsRequired = require('../middlewares/stormpathGroupsRequired').stormpathGroupsRequired;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var app = express();

//Opportunity schema creation
var Opp = mongoose.model('Opp', new Schema({
	id: ObjectId,
	intitule: String,
	oName: String,
	nbBenevoles: Number,
	date: Date,
	lat: Number,
	lon: Number,
	mail: String,
	favs: [String]//mails des utilisateurs qui ont mis l'opportunité en favori
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('accueil.jade');
});

/* GET home page. */
router.get('/user', stormpath.getUser, function(req, res, next) {
	res.json(req.user);
});

router.get('/customData', stormpath.getUser, stormpath.loginRequired, function(req, res, next) {
	var customData = req.user.getCustomData();
	res.json(customData);
});

/*GET map page*/
router.get('/map', stormpath.getUser, stormpath.loginRequired, function(req, res){
	Opp.find({}, function(err, opps){
		if(err){
			console.log(err);
			res.render('map.jade', {session: req.session});
		}
		//Create opps list
		else{
			res.render('map.jade', {opps: opps, session: req.session});
		}
	})
});

router.get('/profile', stormpath.getUser, stormpath.loginRequired, function(req,res){
	res.render('profile.jade', {session: req.session});
});

router.get('/addopp', /*stormpath.groupsRequired(['organism'], false),*/ function(req, res){
	res.render('addopp.jade');
});

router.post('/addopp', stormpath.getUser, function(req,res){
	var opp = new Opp({
		intitule: req.body.intitule,
		oName: req.user.fullName,
		nbBenevoles: req.body.nbBenevoles,
		date: req.body.date,
		lat: req.body.lat,
		lon: req.body.lon,
		mail: req.user.email
	});
	opp.save(function(err){
		if(err){
			var error = 'Something bad happened! Try again!';
			res.render('addopp.jade', {error: err})
		}
		else{
			res.redirect('/map');
		}
	})
});

router.post('/addfavopp', stormpath.getUser, function(req,res,next){
	console.log(req.user.mail);
	req.insert(req.user.mail);
	res.end();
	//user.customData.favopps.insert(req)
})

module.exports = router;