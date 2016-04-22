var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//connect to mongo
mongoose.connect('mongodb://tjaurou:Oeuf2poule@ds021999.mlab.com:21999/heroku_ggjmn8rl');


app.use(stormpath.init(app, {
	web: {
		register: {
			form: {
				fieldOrder: ['email', 'password' ]
			}
		},
		login: {
			nextUri: "/map",
			form: {
				fields: {
					login: {
						label: 'Your Username or Mail',
						placeholder: 'email@trustyapp.com'
					},
					password: {
						label: 'Your password'
					}
				}
			}
		},
		logout: {
			enabled: true,
			uri: '/logout',
			nextUri: '/'
		}
	},
	postRegistrationHandler: function (account, req, res, next) {
		account.addToGroup('https://api.stormpath.com/v1/groups/7TRKTb2bhnKW4ljtviA4c7', function(err, membership) {
			console.log(membership);
		});
		console.log('The account\'s group is:', account.groups, ' and has just been registered!');
		next();
	},
	postLoginHandler: function (account, req, res, next) {
		console.log('Truc');
		console.log('User:', account.email, 'just logged in!');
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
