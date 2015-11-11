var mainApplicationModuleName = 'afrique_annonce';

var mainApplicationModule = angular.module(mainApplicationModuleName, []);



angular.element(document).ready(function(){
		
	/*	var socket = io();
		var that = this;
		that.message = '';

		socket.on('chatMessage', function(message){			
			console.log('reception de message depuis le serveur '+JSON.stringify(message));								
		});

		var commentaire = {
				titre: 'reponde moi',
				texte: 'hadak s6',
				annonce: '5624e77b0771cb0b0a83a976',
				createur: '5624e4ef0771cb0b0a83a972'
			};

			socket.emit('commentaire', commentaire);
		

		socket.on('allComments', function(comments){
			console.log('allcomment by annonceID: 562a0bd997ed7adb10a014a2 '+ JSON.stringify(comments));
		});



		socket.on('commentaireCreated', function(commentaire){
			console.log(JSON.stringify(commentaire));
		});

		socket.emit('annonceID', '562a0bd997ed7adb10a014a2');
		*/




	angular.bootstrap(document, [mainApplicationModuleName]);


});


