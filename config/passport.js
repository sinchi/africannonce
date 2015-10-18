"use strict";


var passport = require("passport"),
	mongoose = require('mongoose');


	module.exports = function(){
		var Annonceur  = mongoose.model('Annonceur');

		passport.serializeUser(function(annonceur, done){
			done(null, annonceur.id);
		});

		passport.deserializeUser(function(id, done){
			Annonceur.findOne({
				_id: id
			}, '-password -salt', function(err, annonceur){
				done(err, annonceur);
			});
		});


		require('./strategies/local.js')();
	};

	