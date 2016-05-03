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
	console.log(req.user.customData);
	res.render('profile.jade', {session: req.session, favs: req.user.customData.favopps});
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

router.post('/addfavopp', stormpath.loginRequired, stormpath.getUser, function(req,res){
	console.log('orgName: ' + req.body.orgName + ' and intitule: ' + req.body.intitule);
	Opp.findOne({'oName': req.body.orgName, 'intitule': req.body.intitule}, 'favs',function(err, opps){
		if (err) return handleError(err);
		//Create opps list
		console.log('opps: '+opps + 'and opps.fav: ' + opps.favs);
		opps.favs.addToSet(req.user.email);
		opps.save(function(err){
			if(err){
				console(err);
			}
			else{
			}
		});
	});
	if(req.user.customData.favopps){
		req.user.customData.favopps.push(req.body.orgName + ' ' + req.body.intitule);
	}
	else{
		req.user.customData.favopps = [];
		req.user.customData.favopps.push(req.body.orgName + ' ' + req.body.intitule);
	}
	req.user.customData.save(function (err) {
		if (err) {
			res.status(400).end('Oops!  There was an error: ' + err.userMessage);
		}else{
			console.log('Name was changed!');
		}
	});
	console.log('before addfavapp');
	console.log('out addfavapp');
	console.log('out addfavapp');
	res.end();
});

router.post('/add', stormpath.loginRequired, stormpath.getUser, function(req,res){
	console.log('in post'+ req.orgName);
	res.end();
	console.log('out addfavapp');
})

module.exports = router;