'use strict';

var mongoose = require('mongoose'),
	Annonce = mongoose.model('Annonce'),
	Ville = mongoose.model('Ville'),
	Annonceur = mongoose.model('Annonceur'),
	Categorie = mongoose.model('Categorie');
	




	var getErrorMessage = function(err){
		if(err.errors){
			for(var errName in err.errors)
				if(err.errors[errName].message)
					return err.errors[errName].message;
		}
	};



	exports.create = function(req, res){
		
		var annonce = new Annonce();
		annonce.titre = req.body.titre;
		annonce.type_annonce = req.body.type_annonce;
		annonce.prix = req.body.prix;
		annonce.description = req.body.description;
		annonce.annonceur = req.user;	
		annonce.ville = req.body.ville;	
		annonce.categorie = req.body.categorie;
		//console.log("annonce "+ annonce);
		annonce.save(function(err){
			if(err){
				return res.status(400).send({message: getErrorMessage(err)});	
				} 
				else return res.json(annonce);
			});									
		};



	exports.annonceById = function(req, res, next, id){
		Annonce.findById(id).populate('ville annonceur').exec(function(err, annonce){
			if(err) return next(err);
			if(!annonce) return next(new Error('Failed to load annonce '+ id));
			req.session.annonce = annonce;

			next();
		});
	};

	exports.listByOffre = function(req, res, next, type){
		Annonce.find({type_annonce: type}).populate('ville').exec(function(err, annonces){
			if(err) return next(err);
			if(!annonces) return next(new Error('Failled to list by offre' + offre));

			 req.annonces = annonces;
			 next();
		});
	};

	exports.listByTitre = function(req, res, next, titre){
		Annonce.find({titre: titre}).populate('ville').exec(function(err, annonces){
			if(err) return next(err);
			if(!annonces) return next(new Error('Failed to load annonces by '+ titre));

			req.annonces = annonces;
			next();
		});
	};



	// list annonces by ville
	exports.listByVille = function(req, res, next, ville_id){	
			Annonce.find({ville: ville_id}).sort('-date_publication').populate('ville categorie annonceur').exec(function(err, annonces){
			if(err) return next(err);
			if(!annonces) return next(new Error('Failed to load annonces by '+ ville_id));
			req.annonces = annonces;
			
			next();
		});		
	};



	exports.readAll = function(req, res){
		res.json(req.annonces);
	};

	exports.read =  function(req, res){
		 res.json(req.session.annonce);
	};

	exports.list = function(req, res){
		Annonce.find().sort('-date_publication').populate('annonceur ville categorie').exec(function(err, annonces){
			if(err) return res.status(400).send({ message: getErrorMessage(err) });
			if(annonces) return res.json(annonces);

		});
	};

	exports.listAnnoncesByCritere = function(req, res){

			Annonce.find({titre: new RegExp(req.body.critere, "i"), ville: req.body.ville})
			.where('prix')
			.gt(Number(req.body.prixmin))
			.lt(Number(req.body.prixmax))
			.populate('ville categorie annonceur')
			.exec(function(err, annonces){

			if(err)
			 	return res.status(400).json({message : err});
			if(!annonces)
			 	return next(new Error('Failed to load annonces by '+ req.body.critere));

			return res.json(annonces);
			
		});
		

	};


	exports.listAnnoncesByCategorie = function(req, res, next, categorie_id){
		Annonce.find({categorie: categorie_id}).populate('categorie createur ville annonce').exec(function(err, annonces){
			if(err) return res.status(400).send({message: getErrorMessage(err)});
			if(!annonces) return res.status(400).send({message: "No annonces exist with categorie_id "+categorie_id});
			req.annonces = annonces;

			next();
		});
	}

	exports.listAnnoncesByAnnonceurId = function(req, res, next, annonceur_id){	
		Annonce.find({annonceur: annonceur_id})
		.populate('categorie annonceur ville')
		.exec(function(err, annonces){
			if(err)
				 return res.status(400).send({message: getErrorMessage(err)});
			if(!annonces)
				return res.status(400).send({message: "No annonces exist with annonceur_id "+annonceur_id});

			req.annonces = annonces;

			next();
		});

	};