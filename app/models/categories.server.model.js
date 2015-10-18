'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


	var CategorieSchema = new Schema({
		nom: String
	});


	CategorieSchema.statics.getCategorieByName = function(categorie_name, callback){
		var _this = this;
		var v_nom = categorie_name;
		_this.findOne({nom: v_nom}, function(err, categorie){
			if(!err){
				if(categorie){
					return callback(categorie);
				}else{
					return callback(null);
				}
			}else return callback(err);
				
		});
	};

	mongoose.model('Categorie', CategorieSchema);