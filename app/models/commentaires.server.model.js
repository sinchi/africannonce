'use strict';


var mongoose= require('mongoose'),
	Schema = mongoose.Schema;


	var CommentaireSchema = new Schema({

		titre: {
			type:String			
		},
		texte: String,
		
		annonce:{
			type: Schema.ObjectId,
			ref: "Annonce",
			required: 'annonce is required'
		},
		createur:{
			type: Schema.ObjectId,
			ref: "Annonceur",
			required: 'Annonceur is required'

		},
		date:{
			type: Date,
			default: Date.now
		}


	});


	mongoose.model('Commentaire', CommentaireSchema);