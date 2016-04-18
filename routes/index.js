var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');

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

/*GET map page*/
router.get('/map', stormpath.loginRequired, function(req, res){
	Opp.find({}, function(err, opps){
		if(err){
			console.log(err);
			res.render('map.jade');
		}
		//Create opps list
		else{
			res.render('map.jade', {opps: opps});
		}
	})
});

router.get('/profile', stormpath.getUser,/*stormpath.groupsRequired(['citizens']),*/ function(req,res){
	console.log('Connected !')
	res.render('profile.jade');
});

router.get('/addopp', function(req, res){
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
})

module.exports = router;
