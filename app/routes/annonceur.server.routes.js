'use strict';

var annonceur = require('../controllers/annonceur.server.controller.js'),	
 passport = require('passport'),
 multer  = require('multer'),
 storage = multer.diskStorage({
			  destination: function (req, file, cb) {
			    cb(null, 'public/shared')
			  },
			  filename: function (req, file, cb) {
			    cb(null, file.originalname)
			  }
	}),
	upload = multer({ storage: storage });

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
		
	   app.route('/api/annonceurs/notifications')
	   .get(annonceur.requireLogin, annonceur.listNotifications);
	   

	   app.route('/api/annonceurs/signout').
	  get(annonceur.signout);


	  // accept one file where the name of the form field is named photho
	app.post('/upload', annonceur.requireLogin , upload.single('sampleFile'), annonceur.uploadFile);


};