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
	users: [{
		id: { type: Schema.Types.ObjectId, ref: 'Story' },
		status: String
	}]//mails des utilisateurs qui ont mis l'opportunité en favori
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
			res.render('map.jade', {opps: opps, session: req.session, user: req.user});
		}
	})
});

router.get('/profile', stormpath.getUser, stormpath.loginRequired, function(req,res){
	console.log(req.user.customData.favopps);
	res.render('profile.jade', {session: req.session/*, favs: req.user.customData.favopps*/});
});


router.post('/addfavopp', stormpath.loginRequired, stormpath.getUser, function(req,res){
	//On utilise des objets javascripts à la place d'un tableau pour stocker les favoris.
	//On peut alors utiliser l'identifiant de l'opp comme key de l'objet javascript.
	//Conversion d'un array en objet {}
	if(Array.isArray(req.user.customData.favopps)){
		req.user.customData.favopps = {};
	}

	//identifiant de l'opp sur laquelle on a cliqué
	var id_new_favorite=req.body.identifiant;
	//contenu de cette opp, aussi sous la forme d'un objet javascript
	//on lui rajoute l'identifiant. C'est pratique pour supprimer une opp depuis la page de favoris.
	//Mais il y a peut-être une meilleure façon de faire.
	var new_farovite={orgName:req.body.orgName, intitule:req.body.intitule, nbBenevoles:req.body.nbBenevoles, identifiant:id_new_favorite};

	/*Opp.findOne({'oName': req.body.orgName, 'intitule': req.body.intitule}, 'favs',function(err, opps){
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
	});*/
	if(req.user.customData.favopps){
		//On regarde si ce mandat est deja dans les favoris.
		//Si le mandat est déjà dans les favoris, on le supprime.
		if(req.user.customData.favopps[id_new_favorite]){
			console.log("le mandat est deja dans les favoris : on le supprime");
			delete req.user.customData.favopps[id_new_favorite];
		}
		else{
			console.log("le mandat n'est pas encore dans les favoris : on le rajoute");
			req.user.customData.favopps[id_new_favorite]=new_farovite;
		}
		
	}
	else{
		console.log("Il n'y avait pas encore de favoris");
		req.user.customData.favopps = {};
		req.user.customData.favopps[id_new_favorite]=new_farovite;
	}
	console.log(req.user.customData.favopps);
	req.user.customData.save(function (err) {
		if (err) {
			res.status(400).end('Oops!  There was an error: ' + err.userMessage);
		}else{
			console.log('Name was changed!');
		}
	});
	///console.log('before addfavapp');
	//console.log('out addfavapp');
	console.log('out addfavapp');
	res.end();
});



module.exports = router;