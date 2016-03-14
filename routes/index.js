module.exports = function(io) {
	var app = require('express');
	var router = app.Router();
	
	io.on('connection', function(socket) { 
		console.log( "A user connected" );
	});

	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('index', { title: 'Express' });
	});

	return router;
}