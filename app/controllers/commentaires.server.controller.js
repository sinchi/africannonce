'use strict';

var mongoose = require('mongoose'),
	Annonceur = mongoose.model('Annonceur'),
	Annonce = mongoose.model('Annonce'),
	Commentaire = mongoose.model('Commentaire'),
	Notification = mongoose.model('Notification'),
	async = require('async');


	var getErrorMessage = function(err){
		if(err.errors){
			for(var errName in err.errors)
				if(err.errors[errName].message)
					return err.errors[errName].message;
		}
	}

	exports.readAll = function(req, res){
		res.json(req.commentaires);		
	};

	exports.read = function(req, res){
		res.json(req.commentaire);
	};


	exports.list = function(req, res, next){

		Commentaire.find({annonce: req.annonce._id}).populate('annonce createur').exec(function(err, commentaires){

			if(err) return res.status(400).send({message: getErrorMessage(err)});

			return res.json(commentaires);
			

		});

	};


	exports.create = function(req, res){

		var commentaire = new Commentaire();
		commentaire.titre = req.body.titre;
		commentaire.texte = req.body.texte;
		commentaire.annonce = req.annonce._id;
		commentaire.createur = req.user;

		commentaire.save(function(err){
			if(err) return res.status(400).send({message: getErrorMessage(err)});			
						
		// selectionner tous les  annonceurs qui sont commentés sur cette annonce (req.annonce_id)
		Commentaire.getCommentairesByAnnonceId(req.annonce._id, function(commentaires){
			console.log('taille de commentaires '+ commentaires.length);
			
			async.each(commentaires, function(commentaire, callback){
				console.log('commentaire = '+ commentaire);
				var notification = new Notification();
				notification.annonceur = commentaire.createur._id;
				notification.commentaire = commentaire._id;			
				notification.save(function(err){
					console.log('notification: '+ notification);
					notification = null;					
					callback();
				});
			});

			
		});
	



			return res.json(commentaire);
		});

	};

	exports.listByAnnonce = function(req, res, next, annonce_id){
		Commentaire.find({annonce: annonce_id}).populate('annonce createur categorie').exec(function(err, commentaires){
			if(err) return res.status(400).send({message: getErrorMessage(err)});
			if(!commentaires) return res.status(400).send({message: 'There is no annonce with id' + annonce_id});

			req.commentaires = commentaires;
			next();
		});
	};

	exports.listByCreateur = function(req, res, next, createur_id){
		Commentaire.find({createur: createur_id}).populate('annonce createur categorie').exec(function(err, commentaires){
			if(err) return res.status(400).send({message: getErrorMessage(err)});
			if(!commentaires) return res.status(400).send({message: 'There is no annonce with id' + annonce_id});

			req.commentaires = commentaires;
			next();
		});
	};

	exports.delete = function(req, res){
		var commentaire = req.commentaire;
		commentaire.remove(function(err){
			if(err) return res.status(400).send({message : getErrorMessage(err)});
			return res.json(commentaire);
		});
	};


	exports.hasAuthorization = function(req, res, next){
		console.log("user id "+req.user.id);
		console.log("createur id "+req.commentaire.createur.id);
		if(req.commentaire.createur.id !== req.user.id){
			return res.status(401).send({message: 'Vous navez pas lauthorisation de modifier ou supprime ce commentaire'});			
		}
		next();
	};


	exports.getCommentaireById = function(req, res, next, id){
		Commentaire.findById(id).populate('createur').exec(function(err, commentaire){
			if(err) return res.status(400).send({message: getErrorMessage(err)});
			if(!commentaire) return res.status(400).send({message: 'no comment with id '+ id});

			req.commentaire = commentaire;
			next();
		});
	};