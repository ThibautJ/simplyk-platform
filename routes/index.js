var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var stormpathGroupsRequired = require('../middlewares/stormpathGroupsRequired').stormpathGroupsRequired;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Opp = require('../models/opp_model.js');

var app = express();


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
			res.render('map.jade', {session: req.session, error: error});
		}
		//Create opps list
		else{			
			res.render('map.jade', {opps: opps, session: req.session, user: req.user});
		}
	});
});

router.get('/profile', stormpath.getUser, stormpath.loginRequired, function(req,res){
	console.log(req.user.customData.favopps);
res.render('profile.jade', {session: req.session/*, favs: req.user.customData.favopps*/});
});


router.post('/subscribe', stormpath.loginRequired, stormpath.getUser, function(req,res){
	//identifiant de l'opp sur laquelle on a cliqué
	var id_new_favorite=req.body.identifiant;
	//Search opp in DB
	Opp.findById(id_new_favorite, function(err, opp){
		if (err) return handleError(err);
		//Create opps list
		console.log('This opp will be added to favorite: '+ opp + ' with user_id ' + req.user.customData.id);
		//If the user has already subscribe to this opp
		if (opp.users !== req.user.customData.id){
			console.log('The user has already subscribed to this opp');
		}
		else{
			console.log('The user has not yet subscribed to this opp');
			opp.users.addToSet(req.user.customData.id);
			opp.save(function(err){
				if(err){
					console(err);
				}
				else{
				}
			});
		}
	});
	console.log('out addfavapp');
	res.end();
});



module.exports = router;