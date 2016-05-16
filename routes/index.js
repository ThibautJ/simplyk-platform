var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var stormpathGroupsRequired = require('../middlewares/stormpathGroupsRequired').stormpathGroupsRequired;

var models = require('../model/models.js');

var app = express();

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

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
	models.Opp.find({}, function(err, opps){
		if(err){
			console.log(err);
			res.render('map.jade', {session: req.session});
		}
		//Create opps list
		else{			
            //Check if applied, if yes append status
            console.log(opps);
            for(var i in opps)
            {
                var opp = opps[i];
                console.log(opp);

                for(var j in opp.candidates)
                {
                    var candidate = opp.candidates[j];
                    if(candidate[req.user.email])
                    {
                        console.log('applied for this one');
                        opp.status = candidate[req.user.email].status;
                        console.log(opp.status);
                        break;
                    }
                }
                
                if(opp.status != "Pending") opp.status = "Not applied";
            }

			res.render('map.jade', {opps: opps, session: req.session});
		}
	})
});

router.get('/profile', stormpath.getUser, stormpath.loginRequired, function(req,res){
	console.log(req.user.customData.favopps);
	res.render('profile.jade', {session: req.session, favs: req.user.customData.favopps});
});

router.get('/addopp', function(req, res){
	res.render('addopp.jade');
});

router.post('/addopp', stormpath.getUser, function(req,res){
	var opp = new models.Opp({
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
	});
});

router.post('/addfavopp', stormpath.loginRequired, stormpath.getUser, function(req,res){
    console.log('Enter addfavopp');

	if(!Array.isArray(req.user.customData.favopps)){
		req.user.customData.favopps = [];
	}

	//identifiant de l'opp sur laquelle on a cliqué
	var id_favorite=req.body.identifiant;

    console.log(id_favorite);
    //console.log(req.user.customData.favopps);

    console.log('request');
    //On retrouve le contenu de l'opp via la bdd
	opp = models.Opp.findOne({id: ObjectId(id_favorite)}, {}, function(err, found_opp){
		if (err) return handleError(err);
            //Create opps list
            console.log('found_opp: '+ found_opp); 
            console.log('found_opp: ' + found_opp.candidates);
        
            console.log(req.user);
            var candidature = {};
            candidature[req.user.email] = {status: "Pending"};

            console.log(candidature);
            if(!Array.isArray(found_opp.candidates)){
                found_opp.candidates = [candidature];
            }
            else
            {
                found_opp.candidates.push(candidature);
            }

            found_opp.save(function(err){
                if(err){
                    console.log(err)
                }
            });
	});

    //Modified to comply (a bit) with https://docs.mongodb.com/v3.0/tutorial/model-referenced-one-to-many-relationships-between-documents/

    //On regarde si ce mandat est deja dans les favoris.
    //Si le mandat est déjà dans les favoris, on le supprime.
    if(req.user.customData.favopps.indexOf(opp._id)){
        console.log("le mandat est deja dans les favoris : on le supprime");
        //I read that delete is for sure a bad idea then what is the solution ?!?
        delete req.user.customData.favopps[req.user.customData.favopps.indexOf(opp._id)];
    }
    else{
        console.log("le mandat n'est pas encore dans les favoris : on le rajoute");
        req.user.customData.favopps.push(opp._id);
    }

	req.user.customData.save(function (err) {
		if (err) {
			res.status(400).end('Oops!  There was an error: ' + err.userMessage);
		}else{
			console.log('Name was changed!');
		}
	});

	console.log('out addfavapp');
	res.end();
});

router.post('/add', stormpath.loginRequired, stormpath.getUser, function(req,res){
	console.log('in post'+ req.orgName);
	res.end();
	console.log('out addfavapp');
})

module.exports = router;
