var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io    = require( "socket.io" );

var users = require('./routes/users');
var profile = require('./routes/profile');
var connexioncitoyen = require('./routes/connexioncitoyen');
var creationcitoyen = require('./routes/creationcitoyen');
var map = require('./routes/map');
var accueil = require('./routes/accueil');

var app = express();

// Socket.io
var io = socket_io();
app.io = io;


var routes = require('./routes/index')(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({secret : 'simplyksession'}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'models')));

app.use('/', routes);
app.use('/users', users)
.use('/profile', profile)
.use('/creationcitoyen', creationcitoyen)
.use('/connexioncitoyen', connexioncitoyen)
.use('/map', map)
.use('/accueil', accueil)

.use(function(req, res, next){
    if (typeof(req.session.username) == 'undefined') {
        req.session.username = "default";
    }
    next();
})

// socket.io events
io.on( "connection", function( socket )
{
    console.log( "A user connected" );
});

io.on("connection", function(socket){
	socket.emit('misss', {content: ' eh oui gradur ! ', importance: '1'})
})



module.exports = app;
