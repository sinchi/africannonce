"use strict";

var config = require('./config'),	
	http = require('http'),
	socketio = require('socket.io'),
	fs = require('fs'),
	path = require('path'),
	express = require('express'),
	morgan = require('morgan'),
	compress =require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),
	passport = require('passport'),
	busboy = require('connect-busboy');




	module.exports = function(db){
		var app = express();
		var server = http.createServer(app);
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
		});

		app.use(session({
			saveUninitialized: true,
			resave: true,
			secret: config.sessionSecret,
			store: mongoStore
		}));

		app.use(flash());
		app.use(passport.initialize());
		app.use(passport.session());

		app.use(express.static('public'));

		
		//app.use(express.limit('5mb'));

	

		app.set('views', './app/views');
		app.set('view engine', 'ejs');


		 app.use(busboy({
		  highWaterMark: 2 * 1024 * 1024,
		  limits: {
		    fileSize: 10 * 1024 * 1024
		  }
		}));

		app.use('/upload', function(req, res) {

		  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

				file.on('data', function(data){
					

					var saveTo = path.join('public/images', filename);
				      console.log('Uploading: ' + saveTo);
				      file.pipe(fs.createWriteStream(saveTo));	

				   		fs.writeFile(saveTo, data);
				});

				 file.on('end', function(){
				     console.log('File ' + filename + ' is ended');

				     return res.render('index',{
				     	user: JSON.stringify(req.user),
				     	title: 'upload Image',
				     	image: filename
				     });
				  });

 			 });

		  return req.pipe(req.busboy);
	});		

		require('../app/routes/index.server.routes.js')(app);
		require('../app/routes/villes.server.routes.js')(app);
		require('../app/routes/annonces.server.routes.js')(app);
		require('../app/routes/categories.server.routes.js')(app);
		require('../app/routes/annonceur.server.routes.js')(app);
		require('../app/routes/commentaires.server.routes.js')(app);

		require('./socketio.js')(server, io, mongoStore);


		return server;
	};