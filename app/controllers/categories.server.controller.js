'use strict';


var mongoose = require('mongoose'),
	Categorie = mongoose.model('Categorie');


	var getErrorMessage = function(err){
		if(err){
			for(var errName in err.errors)
				if(err.errors[errName].message)
					return err.errors[errName].message;
		}
	};


	exports.create = function(req, res){

		var categorie = new Categorie(req.body);

		categorie.save(function(err, categorie){
			if(!err)
				return res.json(categorie);
			else
				return res.status(400).send({message: getErrorMessage(err)});
		});

	};


	exports.list = function(req, res){
		Categorie.find().exec(function(err, categories){
			if(!err){
				return res.json(categories);
			}else
				return res.status(400).send({message : getErrorMessage(err)});
		});
	};


	exports.read = function(req, res){
		return res.json(req.categorie);
	};

	exports.categorieById = function(req, res , next, categorie_id){
		Categorie.findById(categorie_id).exec(function(err, categorie){

			if(err) return res.status(400).send({message: getErrorMessage(err)});
			if(!categorie) return res.status(400).send({message: "No categorie with id "+ categorie_id});

			req.categorie = categorie;

			next();

		});


	};

	exports.delete = function(req, res){
		var categorie = req.categorie;

		categorie.remove(function(err){
			if(err) return res.status(400).send({message: getErrorMessage(err)});
			res.json(categorie);
		});
	};