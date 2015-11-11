'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var PhotoSchema = new Schema({
		src:{
			type:String,
			unique:true,
			trim: true			
		},
		alt: {
			type: String,
			unique: true,
			trim: true
		}
	});

mongoose.model('Photo', PhotoSchema);