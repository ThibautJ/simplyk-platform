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
	lon: Number
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('accueil.jade');
});

/* GET home page. */
router.get('/user', stormpath.getUser, function(req, res, next) {
	res.json(req.user);
});

router.get('/customData', stormpath.getUser, function(req, res, next) {
	var customData = req.user.getCustomData();
	res.json(customData);
});

/*GET map page*/
router.get('/map', stormpath.loginRequired, stormpathGroupsRequired(['citizens','organism'], false), function(req, res){
	console.log('debut get.map() and citizens :' + req.session.citizens)
	Opp.find({}, function(err, opps){
		if(err){
			console.log(err);
			res.locals.session = req.session;
			res.render('map.jade');
		}
		//Create opps list
		else{
			res.locals.session = req.session;
			res.render('map.jade', {opps: opps});
		}
	})
});

router.get('/profile', stormpath.getUser, stormpathGroupsRequired(['citizens','organism'], false), function(req,res){
	console.log('Connected with the group: ' + req.user.group + ' !')
	res.render('profile.jade', {session: req.session});
});

router.get('/addopp', stormpath.groupsRequired(['organism'], false), function(req, res){
	res.render('addopp.jade');
});

router.post('/addopp', stormpath.getUser, function(req,res){
	var opp = new Opp({
		intitule: req.body.intitule,
		oName: req.user.fullName,
		nbBenevoles: req.body.nbBenevoles,
		date: req.body.date,
		lat: req.body.lat,
		lon: req.body.lon
	});
	opp.save(function(err){
		if(err){
			var err = 'Something bad happened! Try again!';
			res.render('addopp.jade', {error: error})
		}
		else{
			res.redirect('/map');
		}
	})
});

//Complete your profile the first time you log in
router.get('/completeprofile', stormpath.getUser, stormpathGroupsRequired(['todefine']), function(req,res){
	res.render('completeprofile.jade');
});

router.post('/completeprofile', stormpath.getUser, function(req,res){
	// /!\ Alse, we need to remove the user from the 'todefine' group !
	var user = req.user;
	//If user = organism
	if(req.body.phone){
		user.addToGroup('https://api.stormpath.com/v1/groups/3H99evnnjjLQZUfHL7Ib9B', function(err, membership){
			if(err){
				var err = 'Something bad happened! Try again!';
				res.render('accueil.jade');// /!\ A COMPLETER
			}
			else{
				console.log('The user has been added to group: ' + membership);
			}
		});
		user.customData.contactName = req.body.contactName;
		user.customData.oName = req.body.oName;
		user.customData.phone = req.body.phone;
		res.redirect('/map');
	}
	//If user = organism
	else if (req.body.age){
		user.addToGroup('https://api.stormpath.com/v1/groups/1eqq5FO4Ljea2dnq3mndeg', function(err, membership){
			if(err){
				var err = 'Something bad happened! Try again!';
				res.render('accueil.jade');// /!\ A COMPLETER
			}
			else{
				console.log('The user has been added to group: ' + membership);
			}
		});
		user.givenName = req.body.givenName;
		user.surname = req.body.surname;
		user.customData.age = req.body.age;
		res.redirect('/map');
	}
	else {
		res.json(req.body);
	}
});

router.post('/logout', function(req, res){
	req.session.destroy();
	res.redirect('/');
})

module.exports = router;