'use strict';

var mongoose = require('mongoose'),
	Annonceur = mongoose.model('Annonceur'),
	Ville = mongoose.model('Ville');


	var getErrorMessage = function(err){
		var message = '';
		if(err.code){
			switch(err.code){
				case 11000:
				case 11001:
					message = "username is already exist";
					break;
				default:
					message = "Server error";
			}

		}else{
			for(var errName in err.erros){
				if(err.erros[errName].message)
					message = err.errors[errName].message;
			}
		}
		return message;
	};

exports.create = function(req, res, next){

	if(!req.user){
		console.log('body: '+req.body.username);
		var annonceur = new Annonceur();
		var messages = null;
		annonceur.nom = req.body.nom;
		annonceur.telephone = req.body.telephone;
		annonceur.email = req.body.email;
		annonceur.password = req.body.password;
		annonceur.type_annonceur = req.body.type_annonceur;
		annonceur.provider = 'local';
		annonceur.username = req.body.username;
		annonceur.role = 'User';
		annonceur.ville = req.body.ville
		console.log('annonceur: '+annonceur);

		//Ville.getVilleByName(req.body.ville, function(ville){
		//	annonceur.ville = ville._id;

			// Try saving the new user document
		annonceur.save(function(err) {
			// If an error occurs, use flash messages to report the error
			if (err) {
				// Use the error handling method to get the error message
				var messages = getErrorMessage(err);

				// Set the flash messages
				req.flash('error', messages);

				console.log('errors' + err);

				// Redirect the user back to the signup page
				return res.redirect('api/annonceurs/signup');
			}

			// If the user was created successfully use the Passport 'login' method to login
			req.login(annonceur, function(err) {
				// If a login error occurs move to the next middleware
				if (err) return next(err);

				// Redirect the user back to the main application page
				return res.redirect('/');
			});
		});

	//	});

	}else {
		return res.redirect('/');
	}
};

// Create a new controller method for signing out
exports.signout = function(req, res) {
	// Use the Passport 'logout' method to logout
	req.logout();

	// Redirect the user back to the main application page
	res.redirect('/');
};

exports.readAll = function(req,res){
	res.json(req.annonceurs);
};

exports.list = function(req, res){
	Annonceur.find().populate('ville').exec(function(err, annonceurs){
		if(err) return next(err);
		if(!annonceurs) return next(new Error('failed to load annonceurs'));

		
		
		console.log("isAuthenticated ?: " +req.isAuthenticated());
		console.log('annonceur : '+ req.user);


		return res.json(annonceurs);

	});
};

exports.delete = function(req, res){

	var annonceur = req.user;

	annonceur.remove(function(err){
		if(err)
			return res.status(400).send({message: getErrorMessage(err)});
		else
			 res.json(annonceur);
	});
};


exports.requireLogin = function(req, res, next){
	if(!req.isAuthenticated()){
		return res.status(400).send({message: "User is not log-in "})
	}

	console.log('yes he is login ');
	next();
};


exports.requireAdmin = function(req, res, next){
	if(req.user.role !== "Admin")
		return res.status(400).send({message: 'sorry the function is for Admin only '})
	next();
};


exports.update = function(req, res){
	var annonceur = req.user;

	annonceur.role = req.body.role;
	annonceur.save(function(err){
		if(err)
			return res.status(400).send({message : getErrorMessage(err)});

		res.json(annonceur);
	});
};


exports.renderSignin = function(req, res){

	if(!req.user){
		res.render('signin', {
		title: 'Sign-in',
		messages: req.flash('error') || req.flash('info')
		});
	}else{
		return res.redirect('/');
	}
};


exports.renderSignup = function(req, res){
	
	if(!req.user){

		Ville.find().exec(function(err, villes){
			if(err){
				return res.status(400).send({message: getErrorMessage(err)});
			}else{
				res.render('signup', {
				title: 'Sign-up',
				messages: req.flash('error') ,
				villes: villes
				});
	}
			}); 

		}else{
		return res.redirect('/');
	}		
};



// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.user) {
		// Create a new 'User' model instance
		var annonceur = new annonceur(req.body);
		var messages = null;

		// Set the user provider property
		annonceur.provider = 'local';

		// Try saving the new user document
		annonceur.save(function(err) {
			// If an error occurs, use flash messages to report the error
			if (err) {
				// Use the error handling method to get the error message
				var messages = getErrorMessage(err);

				// Set the flash messages
				req.flash('error', messages);

				// Redirect the user back to the signup page
				return res.redirect('/signup');
			}

			// If the user was created successfully use the Passport 'login' method to login
			req.login(annonceur, function(err) {
				// If a login error occurs move to the next middleware
				if (err) return next(err);

				// Redirect the user back to the main application page
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};


exports.uploadFile = function(req, res){
	console.log(req.body) // form fields
	console.log(req.file) // form files
	// res.status(204).end();		   
    return res.render('index',{
		user: JSON.stringify(req.user),
		title: 'upload Image',
		image: (typeof req.file == 'undefined' ) ? req.flash('error', "veuillez selectionner le fichier à uploader!") : req.file.filename ,
		messages: req.flash('error')
	});
};