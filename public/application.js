var mainApplicationModuleName = 'afrique_annonce';

var mainApplicationModule = angular.module(mainApplicationModuleName, []);



angular.element(document).ready(function(){
		
		var socket = io();
		var that = this;
		that.message = '';
		socket.on('chatMessage', function(message){
			message.type ="message";
			console.log('reception de message depuis le serveur '+JSON.stringify(message));		
			
			var commentaire = {
				titre: 'bonne occasion',
				texte: 'hamza o achmen hamza hadi o bech7al ??',
				annonce: '5624e77b0771cb0b0a83a976',
				createur: '5624e4ef0771cb0b0a83a972'
			};

			socket.emit('commentaire', commentaire);

		});


		socket.on('commentaireCreated', function(commentaire){
			console.log(JSON.stringify(commentaire));
		});






	angular.bootstrap(document, [mainApplicationModuleName]);


});


