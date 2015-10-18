'use strict';


var mongoose= require('mongoose'),
	Schema = mongoose.Schema;


	var CommentaireSchema = new Schema({

		titre: String,
		texte: String,
		
		annonce:{
			type: Schema.ObjectId,
			ref: "Annonce"
		},
		createur:{
			type: Schema.ObjectId,
			ref: "Annonceur"
		}


	});


	mongoose.model('Commentaire', CommentaireSchema);