"use strict";

var config = require('./config'),
	mongoose = require('mongoose');

	module.exports = function(){
		var db = mongoose.connect(config.db);

		require('../app/models/users.server.model.js');	
		require('../app/models/photos.server.model.js');
		require('../app/models/annonces.server.model.js');
		require('../app/models/annonceur.server.model.js');
		require('../app/models/ville.server.model.js');
		require('../app/models/categories.server.model.js');
		require('../app/models/commentaires.server.model.js');
		require('../app/models/notifications.server.model.js');
		

		return db;
	};