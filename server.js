"user strict";

 process.env.NODE_ENV = process.env.NODE_ENV || 'development';



var	express = require('./config/express'),
	mongoose =require('./config/mongoose'),
	passport = require('./config/passport');

	
		
		var db = mongoose();
		var app = express(db);
		var passport = passport();

		app.listen(3000);

		console.log('server is started at http://localhost:3000');

		module.exports = app;
	
