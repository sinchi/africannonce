angular.module('annonceur').controller('AnnonceurController', ['Authentification', '$scope', 
	function(Authentification, $scope){
		
		if(Authentification.user)
			$scope.name = Authentification.user.nom;
		else
			$scope.name = "";
	/*	this.socket = io();

		this.socket.on('chatMessage', function(message){			
			console.log('reception de message depuis le serveur '+JSON.stringify(message));								
		});

		var commentaire = {
				titre: 'bghit nssowlek',
				texte: 'ch7al taman',
				annonce: '5627cca305c03f5830f8448d',
				createur: '562368c96f636ef10dc3f9ae'
			};

			this.socket.emit('commentaire', commentaire);
		

		this.socket.on('allComments', function(comments){
			console.log('allcomment by annonceID: 5627cca305c03f5830f8448d '+ JSON.stringify(comments));
		});



		this.socket.on('commentaireCreated', function(commentaire){
			console.log(JSON.stringify(commentaire));
		});

		this.socket.emit('annonceID', '5627cca305c03f5830f8448d');*/

	}

	]);