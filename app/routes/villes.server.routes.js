'use strict';

	module.exports = function(app){

		var ville = require('../controllers/villes.server.controller');

		app.route('/api/villes')
		.get(ville.list)
		.post(ville.create);


		app.route('/api/villes/:villeId')
		.get(ville.read)
		.delete(ville.delete);

		app.param('villeId', ville.villeByID);
	};