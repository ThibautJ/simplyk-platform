var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var stormpathGroupsRequired = require('../middlewares/stormpathGroupsRequired').stormpathGroupsRequired;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Opp = require('../models/opp_model.js');

var subscribe = require('../middlewares/subscribe.js');
var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
	Opp.find({}, function(err, opps){
		if(err){
			console.log(err);
			res.render('accueil.jade', {session: req.session, error: err});
		}
		//Create opps list
		else{			
			res.render('accueil.jade', {opps: opps, session: req.session, user: req.user});
		}
	});
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
			res.render('map.jade', {session: req.session, error: err});
		}
		//Create opps list
		else{			
			res.render('map.jade', {opps: opps, session: req.session, user: req.user});
		}
	});
});

router.post('/subscribe', stormpath.loginRequired, stormpath.getUser, function(req,res){
	//identifiant de l'opp sur laquelle on a cliqué
	var id_new_favorite=req.body.identifiant;
	//Search opp in DB
	Opp.findById(id_new_favorite, function(err, opp){
		if (err) return handleError(err);
		//If the user has already subscribed to this opp, end, if not, subscription and go to profile
		subscribe.findApplicants(opp, function(applicantsList){
			console.log('applicantsList: '+applicantsList);
			if (applicantsList.indexOf(req.user.customData.id) !== -1){
				var error = 'Tu es déjà inscrit à cet évènement ! :)';
				console.log(error);
				res.send({error: error});
			}
			else{
				console.log('The user has not yet subscribed to this opp');
				opp.applications.addToSet({"applicant": req.user.customData.id, "status": "Pending", "story": null});
				opp.save(function(err){
					if(err){
						console(err);
					}
					else{
						console.log('redirect to profile')
						res.send({redirect: 'profile'});
					}
				});
			}
		});
		
	});
});

module.exports = router;