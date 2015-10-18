"use strict";

var config = require('./config'),
	socketio = require('socket.io'),
	http = require('http'),
	express = require('express'),
	morgan = require('morgan'),
	compress =require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),
	passport = require('passport');



	module.exports = function(db){
		var app = express();
		var server = require('http').createServer(app);
		var io = socketio.listen(server);


		if(process.env.NODE_ENV === 'developement'){
			app.use(morgan('dev'));
		}else if(process.env.NODE_ENV === 'production'){
			app.use(compress());
		}

		app.use(bodyParser.urlencoded({
		extended: true
	}));

		app.use(bodyParser.json());
		app.use(methodOverride());

		var mongoStore = new MongoStore({
			db: db.connection.db
		})

		app.use(session({
			saveUninitialized: true,
			resave: true,
			secret: config.sessionSecret,
			store: mongoStore
		}));

		app.use(flash());
		app.use(passport.initialize());
		app.use(passport.session());

		app.use(express.static('./public'));

		app.set('views', './app/views');
		app.set('view engine', 'ejs');

		require('../app/routes/index.server.routes.js')(app);
		require('../app/routes/villes.server.routes.js')(app);
		require('../app/routes/annonces.server.routes.js')(app);
		require('../app/routes/categories.server.routes.js')(app);
		require('../app/routes/annonceur.server.routes.js')(app);
		require('../app/routes/commentaires.server.routes.js')(app);

		require('./socketio.js')(server, io, mongoStore);


		return server;
	};