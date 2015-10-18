'use strict';

var mongoose = require('mongoose'),
	Categorie = mongoose.model('Categorie');

	var categorie = require('../controllers/categories.server.controller.js');

module.exports = function(app){

	app.route('/api/categories')
	.get(categorie.list)
	.post(categorie.create);


	app.route('/api/categories/:id_categorie')
	.get(categorie.read)
	.delete(categorie.delete);

	app.param('id_categorie', categorie.categorieById);

};