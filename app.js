//Requires
var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = mongoose.model('User', new Schema({
	id: ObjectId,
	fname: String,
	lname: String,
	mail: {type: 	String, unique: true },
	age: String,
}));

var app = express();

//Connect to mongo
mongoose.connect('mongodb://localhost/newauth');

//middlewares
app.use(express.static('C:/Users/Thibaut/Documents/Code/Node.js/simplyk/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
	cookieName: 'session',
	secret: 'nopeacasvf51355fe4a6«sc4fesv43«s1cd35f86rg45f',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

app.set('view engine', 'jade');
app.locals.pretty = true;

//router
app.get('/', function(req, res){
	res.render('accueil.jade');
});

app.get('/connexioncitoyen', function(req, res){
	res.render('connexioncitoyen.jade');
});

app.post('/connexioncitoyen', function(req, res){
	if(req.session){
		console.log ('req.body.mail : ' + req.body.mail);
		console.log ('req.body.lname : ' + req.body.lname);
		User.findOne({ mail: req.body.mail}, function(err, user){
			if(!user){
				var error = "Wrong mail";
				console.log (error + '1');
				res.render('connexioncitoyen.jade', {error: error});
			} else {
				if(req.body.lname === user.lname){
					req.session.user = user; //set-cookie...
					res.redirect('/map');
				} else {
					var error = "Wrong mail";
					console.log (error + '2');
					res.render('connexioncitoyen.jade', {error: error});
				}
			}
		});
	} else {
		res.redirect('/connexioncitoyen');
	}
})

app.get('/creationcitoyen', function(req, res){
	res.render('creationcitoyen.jade');
});

app.post('/creationcitoyen', function(req, res){
	var user = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		age: req.body.age,
		mail: req.body.mail,
	});
	user.save(function(err){
		if(err){
			var error = 'Something bad happened !'
			if(err.code === 11000){
				var error = 'This email is already used !'
			}
			res.render('creationcitoyen.jade', {error: error})
		} else{
			res.redirect('/map');
		}
	})
})

app.get('/map', function(req, res){
	if(req.session && req.session.user){
		User.findOne({ email: req.session.email }, function(err, user){
			if(!user){
				req.session.reset();
				res.redirect('/');
			} else {
				res.locals.user = user;
				res.render('map.jade');
			}
		})
	} else {
		res.redirect('/');
	}
});

app.post('/map', function(req, res){

});

app.get('/profile', function(req, res){
	if(req.session && req.session.user){
		res.locals.user = req.session.user;
		res.render('profile.jade');
	} else {
		res.redirect('/');
	}
});

app.get('/logout', function(req, res){
	req.session.reset();
	res.redirect('/');
});


app.listen(3000);