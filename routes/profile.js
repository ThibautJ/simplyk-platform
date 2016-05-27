var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');


var Opp = require('../models/opp_model.js');


router.get('/', stormpath.getUser, stormpath.loginRequired, function(req,res){
	console.log('Begin get /profile')
	Opp.find({applications: {$elemMatch: { applicant: req.user.customData.id}}}, function(err, opps){
		if(err){
			console.log(err);
			res.render('profile.jade', {session: req.session, error: err});
		}
		//Create opps list
		else{
			res.render('profile.jade', {opps: opps, session: req.session, user: req.user});
		}
	});
});

module.exports = router;