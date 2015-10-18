"use strict";

var mongoose= require('mongoose'),
	Schema = mongoose.Schema;


	var AnnonceSchema = new Schema({
		titre:String,
		type_annonce:{
			type: String,
			enum:['offre', 'demande', 'enchere']
		},
		prix:{
			type: Number
		},
		date_publication:{
			type: Date,
			default: Date.now
		},
		nombre_vue:{
			type: Number,
			default: 0
		},
		ville:{
			type: Schema.ObjectId,
			ref: 'Ville',
			required: "Ville is required"
		},
		vendue:{
			type: Boolean,
			default: false
		},
		description:{
			type: String,
			default: ''
		},
		annonceur:{
			type: Schema.ObjectId,
			ref: 'Annonceur',
			required: 'Annonceur is required'
		},
		categorie:{
			type: Schema.ObjectId,
			ref: 'Categorie',
			required: 'Categorie is required'
		}
	});

	



	AnnonceSchema.statics.getAnnoncesByVille = function(ville, callback){
		var _this = this;

		_this.find({
			ville: ville._id
		}).populate('ville').exec(function(err, annonces){
			if(!err)
				return callback(annonces);
			else
				return callback(null);
		});
	};


	mongoose.model('Annonce', AnnonceSchema);