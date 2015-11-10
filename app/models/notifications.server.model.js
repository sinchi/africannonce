'use strict';


var mongoose= require('mongoose'),
	Schema = mongoose.Schema;


	var NotificationSchema = new Schema({

		commentaire:{
			type: Schema.ObjectId,
			ref: "Commentaire",
			required: 'comment is required'
		},
		annonceur:{
			type: Schema.ObjectId,
			ref: "Annonceur",
			required: 'Annonceur is required'

		},
		date:{
			type: Date,
			default: Date.now
		},
		vue:{
			type: Boolean,
			default: false
		}


	});


	mongoose.model('Notification', NotificationSchema);