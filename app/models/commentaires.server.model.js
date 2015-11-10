'use strict';


var mongoose= require('mongoose'),
	Schema = mongoose.Schema;


	var CommentaireSchema = new Schema({

		titre: String,
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


	CommentaireSchema.statics.getCommentairesByAnnonceId = function(annonce_id, callback){

		var _this = this;

		_this.find({
			annonce: annonce_id
		}).populate('annonce createur').exec(function(err, commentaires){
			//console.log('in CommentaireSchema.statics:commentaires' + commentaires);
			if(!err)
				return callback(commentaires);
			else
				return callback({message: err});
		});
	};


	mongoose.model('Commentaire', CommentaireSchema);