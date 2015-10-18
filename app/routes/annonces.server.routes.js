'use strict';

module.exports = function(app){


	var annonce = require('../controllers/annonces.server.controller');
	var annonceur =  require('../controllers/annonceur.server.controller');


	app.route('/api/annonces')
	.get(annonce.list)
	.post(annonceur.requireLogin, annonce.create);
	

	// annonce by ID
	app.route('/api/annonces/:annonceId')
	.get(annonce.read);
	app.param('annonceId', annonce.annonceById);


	// annonce by Offre
	app.route('/api/annonces/offres/:offre')
	.get(annonce.readAll);
	app.param('offre', annonce.listByOffre);



	// annonces by ville
	app.route('/api/annonces/villes/:ville_id')
	.get(annonce.readAll);
	app.param('ville_id', annonce.listByVille);



	// annonce by titre
	app.route('/api/annonces/titres/:titre')
	.get(annonce.readAll);
	app.param('titre', annonce.listByTitre);


	//annonce by critere
	app.route('/api/annonces/recherche')
	.post(annonce.listAnnoncesByCritere);

	


	app.route('/api/annonces/categories/:categorie_id')
	.get(annonce.readAll);
	app.param('categorie_id', annonce.listAnnoncesByCategorie);


	app.route('/api/annonces/annonceurs/:annonceur_id')
	.get(annonce.readAll);

	app.param('annonceur_id', annonce.listAnnoncesByAnnonceurId);

};

