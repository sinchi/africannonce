"user strict";

var config = require('./config'),
	cookieParser = require('cookie-parser'),
	passport = require('passport');

	module.exports = function(app, server, io, mongoStore){
		io.use(function(socket, next){
			cookieParser(config.sessionSecret)(socket.request, {}, function(err){
				var sessionId = socket.request.signedCookies['connect.sid'];

				mongoStore.get(sessionId, function(err, session){
					socket.request.session = session;
					passport.initialize()(socket.request, {}, function(){
						passport.session()(socket.request, {}, function(){
							if(socket.request.user){
								console.log('hiii');
								next(null, true);
							}else{
								next(new Error('User is not authenticated'), false);
							}
						});
					});
				});
			});
		});


		io.on('connection', function(socket){
			require('../app/sockets/chat.server.socket')(io, socket);
			require('../app/sockets/commentaires.server.socket')(io, socket, app);

		});


	};