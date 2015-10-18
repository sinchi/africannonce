'use strict';

var annonceur = require('../controllers/annonceur.server.controller.js');
var passport = require('passport');

module.exports = function(app){


	app.route('/api/annonceurs')
	.get(annonceur.requireLogin, annonceur.list)
	.put(annonceur.update)
	.delete(annonceur.requireAdmin ,annonceur.delete);
	

		app.route('/api/annonceurs/signup')
		.get(annonceur.renderSignup)
		.post(annonceur.create);

		app.route('/api/annonceurs/signin')
		.get(annonceur.renderSignin)
		.post(passport.authenticate('local', {
				successRedirect: '/',
				failureRedirect: '/api/annonceurs/signin',
				failureFlash: true
		   }));
	   
	   

	   app.route('/api/annonceurs/signout').
	  get(annonceur.signout);


};