'use strict';

var annonceur = require('../controllers/annonceur.server.controller.js');
var commentaire = require('../controllers/commentaires.server.controller.js');



module.exports =function(app){

	app.route('/api/annonces/:annonceId/commentaires')
	.get(commentaire.list)
	.post(annonceur.requireLogin , commentaire.create);


	// Commenataires by annonces

	app.route('/api/commentaires/annonces/:id_annonce')
	.get(commentaire.readAll);
	app.param('id_annonce', commentaire.listByAnnonce);


	//Commentaires by createur
	app.route('/api/commentaires/createurs/:id_createur')
	.get(commentaire.readAll);
	app.param('id_createur', commentaire.listByCreateur);


	app.route('/api/commentaires/:id_commentaire')
	.get(commentaire.read)
	.delete(annonceur.requireLogin,commentaire.hasAuthorization,commentaire.delete);

	app.param('id_commentaire', commentaire.getCommentaireById);
	
};
	