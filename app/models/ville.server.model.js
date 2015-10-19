'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var VilleSchema = new Schema({
		nom:{
			type:String,
			unique:true,
			trim: true,
			required: "Nom est obligatoire"
		}
	});


	VilleSchema.statics.getVilleByName = function(nom,callback){
		var _this = this;
		var ville_nom = nom;
	 	_this.findOne({
	 		nom: ville_nom
	 	}, function(err, ville){
	 		if(!err){
	 			if(ville){
	 				
	 				return callback(ville);
	 			}
	 		}else{
	 			return callback(null);
	 		}
	 	});
	};


	

	mongoose.model('Ville', VilleSchema);