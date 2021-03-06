"use strict";

var config = require('./config'),	
	http = require('http'),
	socketio = require('socket.io'),	
	express = require('express'),
	morgan = require('morgan'),
	compress =require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),
	passport = require('passport'),
	fs = require('fs'),
	path = require('path'),
	busboy = require('connect-busboy'),
	errorhandler = require('errorhandler'),
	helmet = require('helmet'),
	validator = require('express-validator'),
	expressDomain = require('express-domain-middleware'),
	
	// pour server les documents partagées
	serveIndex = require('serve-index');


	module.exports = function(db){
		var app = express();
		var server = http.createServer(app);
		var io = socketio.listen(server);


		app.use(helmet());
		app.use(expressDomain);

		if(process.env.NODE_ENV === 'development'){
			app.use(morgan('dev'));
			app.use(errorhandler());

		}else if(process.env.NODE_ENV === 'production'){
			app.use(compress());
		}

		app.use(bodyParser.urlencoded({
		extended: true
	}));
		
		
		app.use(bodyParser.json());
		app.use(methodOverride());
		app.use(validator());

		var mongoStore = new MongoStore({
			db: db.connection.db
		});

		app.use(session({
			saveUninitialized: true,
			resave: true,
			secret: config.sessionSecret,
			store: mongoStore
		}));


		app.set('views', './app/views');
		app.set('view engine', 'ejs');

		app.use(flash());
		app.use(passport.initialize());
		app.use(passport.session());


		require('../app/routes/index.server.routes.js')(app);
		require('../app/routes/villes.server.routes.js')(app);
		require('../app/routes/annonces.server.routes.js')(app);
		require('../app/routes/categories.server.routes.js')(app);
		require('../app/routes/annonceur.server.routes.js')(app);
		require('../app/routes/commentaires.server.routes.js')(app);


			app.use(express.static('public'));

			// ... Middleware 
		app.use('/shared', serveIndex(
			path.join('public','shared'),
			{'icons': true}
		));


		require('./socketio.js')(app,server, io, mongoStore);



		return server;
	};