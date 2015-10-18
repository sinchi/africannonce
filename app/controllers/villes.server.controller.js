"use strict";

var mongoose = require('mongoose'),
	Ville = mongoose.model('Ville');


	var getErrorMessage =  function(err){
		if(err){
			for(var errName in err.errors){
				if(err.errors[errName].message)
					return err.errors[errName].message;
			}
		}
	}


	exports.create = function(req, res){
		var ville = new Ville({
			nom: req.body.nom
		});

		ville.save(function(err){
			if(err){
				return res.status(400).send({message: getErrorMessage(err)});
			}else
				return res.json(ville);
		});
	};

	exports.list = function(req, res){
		Ville.find().exec(function(err, villes){
			if(err){
				return res.status(400).send({message: getErrorMessage(err)});
			}else{
				return res.json(villes);
			}
		});
	};

	exports.villeByID = function(req, res, next, id){
		Ville.findOne({ _id: id }, function(err, ville){
			if(err) return next(err);
			if(!ville) return next(new Error('Failed to load ville '+ id));

			req.ville =  ville;
			next();

		});
	};

	exports.read = function(req, res){
		res.json(req.ville);
	};


	exports.delete = function(req, res, next){
		var ville = req.ville;
		ville.remove(function(err){
			if(err) return res.status(401).send({message: getErrorMessage(err)});
			else
				res.json(ville);

			
		});
	}

	