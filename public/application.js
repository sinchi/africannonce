var mainApplicationModuleName = 'afrique_annonce';

var mainApplicationModule = angular.module(mainApplicationModuleName, []);



angular.element(document).ready(function(){
		
		var socket = io();
		var that = this;
		that.message = '';

		socket.on('chatMessage', function(message){			
			console.log('reception de message depuis le serveur '+JSON.stringify(message));								
		});

		var commentaire = {
				titre: 'bghit nssowlek',
				texte: 'ch7al taman',
				annonce: '5627cca305c03f5830f8448d',
				createur: '562368c96f636ef10dc3f9ae'
			};

			socket.emit('commentaire', commentaire);
		

		socket.on('allComments', function(comments){
			console.log('allcomment by annonceID: 5627cca305c03f5830f8448d '+ JSON.stringify(comments));
		});



		socket.on('commentaireCreated', function(commentaire){
			console.log(JSON.stringify(commentaire));
		});

		socket.emit('annonceID', '5627cca305c03f5830f8448d');





	angular.bootstrap(document, [mainApplicationModuleName]);


});


