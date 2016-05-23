var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var session = require('client-sessions');

var routes = require('./routes/index');
var users = require('./routes/users');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('../models/user_model.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//connect to mongo
mongoose.connect('mongodb://tjaurou:Oeuf2poule@ds021999.mlab.com:21999/heroku_ggjmn8rl?connectTimeOutMS=30000');


app.use(session({
	cookieName: 'session',
	secret: 'rcmscgsamfion81152627lolmamparohu,,loui',
	activeDuration: 1500 * 60 * 1000
}));

app.use(stormpath.init(app, {
	// WARNING: USING THIS ONLY DURING TEST PROCESS, DON'T PUT IT IN PRODUCTION IN HEROKU
	apiKey: {
		id: '6C0J0VMJN734THNPB33DACREI',
		secret: 'wERpdqEeaL6jMqfYHiNKr1rV3TecnxYbWnA5akFYYmw'
	},
	application: {
		href: `https://api.stormpath.com/v1/applications/7f5aOQIRSs7fuCcmo6aKS0`
	},
	//WARNING END
	web: {
		register: {
			form: {
				fields: {
					birth: {
						enabled: true,
						label: 'Birthdate',
						name:'birth',
						required: false,
						type: 'date'
					}
				}
			}
		},
		login: {
			enabled: true,
			nextUri: "/map"
		},
		logout: {
			enabled: true,
			nextUri: '/'
		}
	},
	expand: {
		customData: true,
	},
	preRegistrationHandler: function (formData, req, res, next) {
		var user = new User({
			fname: formData.givenName,
			lname: formData.surname,
			email: formData.email,
			birth: formData.birth
		});
		user.save(function(err){
			if(err){
				var error = 'Something bad happened! Try again! Click previous !';
				console.log('@ user.save : '+err);
				res.json({error: error});
			}
			else{
				User.findOne({'lname': formData.surname, 'email': formData.email}, 'id', function(err, user){
					if(err){
						var error = 'Something bad happened! Try again! Click previous !';
						console.log('@ user.findone : '+err);
						res.json({error: error + '    ' + err});
					}
					else{
						req.session.user_id = user._id;
						console.log('The formData has just been registered! and user.id = ' + user._id);
						next();
					}
				})
			}
		})
	},
	postRegistrationHandler: function(account, req, res, next){
		console.log('In postregistration, user.id = ' + req.session.user_id);
		account.customData.id = req.session.user_id;
		account.customData.save();
		next();
	}
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.on('stormpath.ready', function () {
	console.log('Stormpath Ready!');
});


module.exports = app;
